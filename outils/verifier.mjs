/**
 * Rend le site dans un vrai navigateur et relève ce qui ne se voit pas dans
 * le code : débordement horizontal, images manquantes, blocs restés cachés,
 * erreurs JavaScript. Écrit aussi des captures bureau et mobile.
 *
 *   npm run dev        # dans un autre terminal
 *   npm run verifier
 *
 * Les captures atterrissent dans outils/captures/.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SORTIE = path.join(RACINE, 'outils/captures')
const URL_SITE = process.argv[2] || 'http://127.0.0.1:8000/index.html'
mkdirSync(SORTIE, { recursive: true })

// CHROMIUM permet de pointer un binaire déjà présent, quand le navigateur de
// Playwright n'est pas installé (conteneurs, intégration continue).
const navigateur = await chromium.launch(
  process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {})
const soucis = []

for (const [nom, vp] of [['bureau', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const ctx = await navigateur.newContext({ viewport: vp, reducedMotion: 'no-preference' })
  const page = await ctx.newPage()
  page.on('pageerror', e => soucis.push(`${nom} — erreur JS : ${e.message}`))
  page.on('console', m => m.type() === 'error' && soucis.push(`${nom} — console : ${m.text()}`))
  await page.goto(URL_SITE, { waitUntil: 'load' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: path.join(SORTIE, `${nom}-hero.png`) })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(SORTIE, `${nom}-complet.png`), fullPage: true })

  const bilan = await page.evaluate(() => {
    const L = document.documentElement.clientWidth
    const deborde = [...document.querySelectorAll('*')]
      .filter(e => { const r = e.getBoundingClientRect(); return r.right > L + 1 || r.left < -1 })
      .slice(0, 5)
      .map(e => e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ')[0] : ''))
    return {
      titre: getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],
      caches: [...document.querySelectorAll('.lever, .cadre')].filter(e => !e.classList.contains('vu')).length,
      imagesManquantes: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src.split('/').pop()),
      deborde,
      hauteur: document.body.scrollHeight,
    }
  })
  if (bilan.caches) soucis.push(`${nom} — ${bilan.caches} bloc(s) jamais révélé(s)`)
  if (bilan.imagesManquantes.length) soucis.push(`${nom} — images manquantes : ${bilan.imagesManquantes.join(', ')}`)
  if (bilan.deborde.length) soucis.push(`${nom} — débordement horizontal : ${bilan.deborde.join(', ')}`)
  console.log(`${nom.padEnd(7)} titres ${bilan.titre} · ${bilan.hauteur} px de haut`)
  await ctx.close()
}

await navigateur.close()
console.log(soucis.length ? '\n' + soucis.join('\n') : '\nRien à signaler.')
process.exit(soucis.length ? 1 : 0)
