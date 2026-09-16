/** Captures du site rendu, pour relecture visuelle. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, 'captures')
mkdirSync(OUT, { recursive: true })

const BASE = process.env.BASE ?? 'http://localhost:3210'
const PAGES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/', '/services', '/services/borne-recharge', '/soumission', '/a-propos', '/contact']

const browser = await chromium.launch()

for (const [nom, viewport] of [
  ['bureau', { width: 1440, height: 1000 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 })
  for (const chemin of PAGES) {
    const reponse = await page.goto(BASE + chemin, { waitUntil: 'networkidle' })
    if (!reponse?.ok()) throw new Error(`${chemin} → ${reponse?.status()}`)
    await page.evaluate(() => document.fonts.ready)
    const fichier = (chemin === '/' ? 'accueil' : chemin.slice(1).replace(/\//g, '-'))
    await page.screenshot({
      path: join(OUT, `${nom}-${fichier}.png`),
      fullPage: true,
    })
  }
  await page.close()
}

await browser.close()
console.log('captures →', OUT)
