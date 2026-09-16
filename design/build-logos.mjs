/**
 * Génère les SVG des pistes de logo Lussier Électrique.
 *
 * Les tracés typographiques ont besoin des largeurs réelles des glyphes
 * (piste A remplace le « I » de LUSSIER par un éclair : il faut savoir où
 * couper le mot). On mesure donc dans Chromium, polices Google chargées,
 * puis on écrit des SVG aux coordonnées figées.
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, 'logos')
mkdirSync(OUT, { recursive: true })

const FONTS_HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=Archivo:wght@400;600;700;800;900' +
  '&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700' +
  '&family=Space+Grotesk:wght@400;500;700' +
  '&display=block'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><head>
<link rel="stylesheet" href="${FONTS_HREF}"></head><body></body></html>`)
await page.waitForLoadState('networkidle')
await page.evaluate(() => document.fonts.ready)

/** Largeur d'avance d'une chaîne, en unités SVG, pour une police donnée. */
async function measure(text, { family, weight, size, tracking = 0 }) {
  return page.evaluate(
    ([text, family, weight, size, tracking]) => {
      const el = document.createElement('span')
      el.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font-family:${family};font-weight:${weight};font-size:${size}px;letter-spacing:${tracking}px`
      el.textContent = text
      document.body.appendChild(el)
      const w = el.getBoundingClientRect().width
      el.remove()
      return w
    },
    [text, family, weight, size, tracking]
  )
}

const write = (name, svg) => {
  writeFileSync(join(OUT, name), svg.trim() + '\n')
  return name
}

/* ---------------------------------------------------------------- éclair */

// Éclair de référence, dessiné dans une boîte 56 × 100 (pointe en bas).
const BOLT = [
  [36, 0], [2, 58], [24, 58], [18, 100], [56, 38], [32, 38],
]
const BOLT_W = 56
const BOLT_H = 100

/** Projette l'éclair de référence dans la boîte (x, y, w, h) demandée. */
function bolt(x, y, w, h) {
  const pts = BOLT.map(([bx, by]) => {
    const px = x + (bx / BOLT_W) * w
    const py = y + (by / BOLT_H) * h
    return `${round(px)} ${round(py)}`
  })
  return `M ${pts.join(' L ')} Z`
}

const round = (n) => Math.round(n * 100) / 100

/* -------------------------------------------------- A · « L'accent éclair »
 * Le « I » de LUSSIER est remplacé par un éclair : le mot se lit encore
 * LUSSIER, mais porte le métier dans son propre nom.
 * Encre + ambre électrique, typo Archivo Black.
 */
const A_INK = '#0B0E14'
const A_AMBER = '#FFB524'

{
  const FAM = 'Archivo'
  const SIZE = 76
  const TRACK = -1.5
  const opts = { family: FAM, weight: 900, size: SIZE, tracking: TRACK }

  const wLuss = await measure('LUSS', opts)
  const wEr = await measure('ER', opts)
  const wI = await measure('I', opts)

  // L'éclair remplace le « I ». Il lui faut plus d'air que la lettre : sans
  // gouttière, la diagonale vient toucher le S et le E et le mot se brouille.
  const boltW = wI * 1.04
  const gutter = wI * 0.3
  const boltX = wLuss + gutter
  const erX = boltX + boltW + gutter

  const capTop = 27 // hauteur de capitale d'Archivo Black à 76px
  const baseline = 82
  const boltY = capTop - 4
  const boltH = baseline - capTop + 8

  const subSize = 21
  const subTrack = 9.6
  const wSub = await measure('ÉLECTRIQUE', {
    family: FAM, weight: 600, size: subSize, tracking: subTrack,
  })

  const W = Math.ceil(Math.max(erX + wEr, wSub)) + 4
  const H = 128

  write(
    'piste-a-lockup.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Lussier Électrique">
  <g font-family="Archivo, 'Archivo Black', sans-serif" fill="${A_INK}">
    <text x="0" y="${baseline}" font-size="${SIZE}" font-weight="900" letter-spacing="${TRACK}">LUSS</text>
    <text x="${round(erX)}" y="${baseline}" font-size="${SIZE}" font-weight="900" letter-spacing="${TRACK}">ER</text>
    <text x="1" y="116" font-size="${subSize}" font-weight="600" letter-spacing="${subTrack}">ÉLECTRIQUE</text>
  </g>
  <path d="${bolt(round(boltX), boltY, round(boltW), boltH)}" fill="${A_AMBER}"/>
</svg>`
  )

  write(
    'piste-a-mark.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-label="Lussier Électrique">
  <rect width="96" height="96" rx="22" fill="${A_AMBER}"/>
  <path d="${bolt(33, 17, 30, 62)}" fill="${A_INK}"/>
</svg>`
  )
}

/* --------------------------------------------------------- B · « Le sceau »
 * Emblème d'artisan : symbole d'alimentation (⏻) dont la barre verticale est
 * un éclair, serti dans un jeton. Bleu nuit + cuivre — le cuivre est la
 * matière même du métier, et personne dans le secteur ne l'utilise.
 * Typo Fraunces, sérif à caractère.
 */
const B_NIGHT = '#10233B'
const B_COPPER = '#C0763F'
const B_CREAM = '#F3EDE4'

/** Symbole d'alimentation : arc ouvert en haut + éclair dans l'ouverture. */
function powerSeal({ cx, cy, r, gapDeg, stroke, boltFill, arcStroke }) {
  const rad = (gapDeg * Math.PI) / 180
  const dx = r * Math.sin(rad)
  const dy = r * Math.cos(rad)
  const x1 = round(cx - dx)
  const x2 = round(cx + dx)
  const y = round(cy - dy)
  const boltW = r * 1.02
  const boltH = r * 2.3
  return `
  <path d="M ${x1} ${y} A ${r} ${r} 0 1 0 ${x2} ${y}" fill="none" stroke="${arcStroke}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path d="${bolt(round(cx - boltW / 2), round(cy - r * 1.42), round(boltW), round(boltH))}" fill="${boltFill}"/>`
}

{
  const FAM = "Fraunces, 'Times New Roman', serif"
  const SIZE = 46
  const SUB_SIZE = 16
  const SUB_TRACK = 6.4

  const wName = await measure('LUSSIER', {
    family: 'Fraunces', weight: 700, size: SIZE, tracking: 0,
  })
  const wSub = await measure('ÉLECTRIQUE', {
    family: 'Fraunces', weight: 400, size: SUB_SIZE, tracking: SUB_TRACK,
  })

  const sealSize = 96
  const textX = sealSize + 26
  const W = Math.ceil(textX + Math.max(wName, wSub)) + 4
  const H = 96

  const seal = (cx, cy, r) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${B_NIGHT}"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 5.5}" fill="none" stroke="${B_COPPER}" stroke-width="2.2"/>
  ${powerSeal({ cx, cy: cy + 2, r: r * 0.38, gapDeg: 38, stroke: r * 0.175, boltFill: B_CREAM, arcStroke: B_CREAM })}`

  write(
    'piste-b-lockup.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Lussier Électrique">
  ${seal(48, 48, 47)}
  <g font-family="${FAM}" fill="${B_NIGHT}">
    <text x="${textX}" y="52" font-size="${SIZE}" font-weight="700">LUSSIER</text>
    <text x="${textX + 1}" y="76" font-size="${SUB_SIZE}" font-weight="400" letter-spacing="${SUB_TRACK}" fill="${B_COPPER}">ÉLECTRIQUE</text>
  </g>
</svg>`
  )

  write(
    'piste-b-mark.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-label="Lussier Électrique">
  ${seal(48, 48, 47)}
</svg>`
  )
}

/* ---------------------------------------------------- C · « Le monogramme »
 * Un L massif et un éclair logé dans son angle rentrant : deux formes
 * simples, lisibles à 16 px comme sur une portière de camion.
 * Graphite + cyan électrique, typo Space Grotesk.
 */
const C_GRAPHITE = '#16181D'
const C_CYAN = '#22D3EE'

{
  const FAM = "'Space Grotesk', sans-serif"
  const SIZE = 42
  const SUB_SIZE = 14
  const SUB_TRACK = 7

  const wName = await measure('LUSSIER', {
    family: "'Space Grotesk'", weight: 700, size: SIZE, tracking: 0.5,
  })
  const wSub = await measure('ÉLECTRIQUE', {
    family: "'Space Grotesk'", weight: 500, size: SUB_SIZE, tracking: SUB_TRACK,
  })

  const badgeSize = 96
  const textX = badgeSize + 24
  const W = Math.ceil(textX + Math.max(wName, wSub)) + 4
  const H = 96

  const badge = `
  <rect width="96" height="96" rx="24" fill="${C_GRAPHITE}"/>
  <!-- Un seul tracé : le fût du L est lui-même l'éclair (décrochement à
       mi-hauteur), le pied reste horizontal. La lettre et le symbole sont
       la même forme, pas deux objets posés l'un à côté de l'autre. -->
  <path d="M 30.5 18 L 48.5 18 L 39.5 44 L 49.5 44 L 42.5 60 L 75.5 60 L 75.5 78 L 22.5 78 L 30.5 44 L 20.5 44 Z" fill="${C_CYAN}"/>`

  write(
    'piste-c-lockup.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Lussier Électrique">
  ${badge}
  <g font-family="${FAM}" fill="${C_GRAPHITE}">
    <text x="${textX}" y="52" font-size="${SIZE}" font-weight="700" letter-spacing="0.5">LUSSIER</text>
    <text x="${textX + 1}" y="76" font-size="${SUB_SIZE}" font-weight="500" letter-spacing="${SUB_TRACK}">ÉLECTRIQUE</text>
  </g>
</svg>`
  )

  write(
    'piste-c-mark.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-label="Lussier Électrique">
  ${badge}
</svg>`
  )
}

await browser.close()
console.log('SVG générés dans', OUT)
