/** Planche contact des pistes de logo : lockup, marque, et test 24 px. */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const LOGOS = join(HERE, 'logos')
const svg = (n) => readFileSync(join(LOGOS, n), 'utf8')

const PISTES = [
  { id: 'a', nom: "A · L'accent éclair", note: 'Encre + ambre · Archivo Black' },
  { id: 'b', nom: 'B · Le sceau cuivre', note: 'Bleu nuit + cuivre · Fraunces' },
  { id: 'c', nom: 'C · Le monogramme', note: 'Graphite + cyan · Space Grotesk' },
]

const rows = PISTES.map(
  (p) => `
<section>
  <h2>${p.nom}<small>${p.note}</small></h2>
  <div class="row">
    <div class="cell"><span>lockup</span><div class="lock">${svg(`piste-${p.id}-lockup.svg`)}</div></div>
  </div>
  <div class="row">
    <div class="cell"><span>marque 96</span>${svg(`piste-${p.id}-mark.svg`)}</div>
    <div class="cell"><span>48</span><div class="s48">${svg(`piste-${p.id}-mark.svg`)}</div></div>
    <div class="cell"><span>24 (favicon)</span><div class="s24">${svg(`piste-${p.id}-mark.svg`)}</div></div>
    <div class="cell dark"><span>sur foncé</span><div class="s64">${svg(`piste-${p.id}-mark.svg`)}</div></div>
  </div>
</section>`
).join('')

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Space+Grotesk:wght@400;500;700&display=block">
<style>
  body{margin:0;padding:40px;background:#fff;font:14px/1.4 system-ui,sans-serif;color:#111}
  section{margin-bottom:44px;padding-bottom:28px;border-bottom:1px solid #e5e5e5}
  h2{font-size:15px;margin:0 0 18px;letter-spacing:.02em}
  h2 small{font-weight:400;color:#888;margin-left:12px}
  .row{display:flex;align-items:flex-end;gap:34px;margin-bottom:18px}
  .cell{display:flex;flex-direction:column;gap:8px;align-items:flex-start}
  .cell span{font-size:10px;text-transform:uppercase;letter-spacing:.09em;color:#999}
  .cell.dark{background:#111;padding:12px;border-radius:8px}
  .cell.dark span{color:#666}
  .lock svg{height:80px;width:auto}
  .s64 svg{width:64px;height:64px}
  .s48 svg{width:48px;height:48px}
  .s24 svg{width:24px;height:24px}
</style></head><body>${rows}</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2 })
await page.setContent(html)
await page.waitForLoadState('networkidle')
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: join(HERE, 'planche-logos.png'), fullPage: true })
await browser.close()
console.log('planche-logos.png')
