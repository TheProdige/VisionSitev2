/**
 * Déclinaisons optimisées de l'image du héro.
 *
 * Le LCP du site, c'est cette image : elle est rendue en `<img>` statique,
 * assombrie en CSS pour tenir lieu d'état éteint, et le canvas WebGL prend le
 * relais une fois chargé. Elle doit donc être légère à toutes les largeurs.
 *
 *   node scripts/optimize-hero.mjs
 *
 * Écrit house-lit-{960,1600,2560}.{avif,webp} à côté de la source.
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(RACINE, 'public/images/hero/source/house-lit.png')
const DOSSIER = path.join(RACINE, 'public/images/hero')
const LARGEURS = [2560, 1600, 960]

if (!existsSync(SOURCE)) {
  console.error(`Image introuvable : ${SOURCE}\nDéposez la photo du héro à cet emplacement.`)
  process.exit(1)
}

await mkdir(DOSSIER, { recursive: true })
const meta = await sharp(SOURCE).metadata()
console.log(`Source : ${meta.width}×${meta.height}`)

for (const largeur of LARGEURS) {
  if (largeur > meta.width) {
    console.log(`  ${largeur} px ignoré — la source ne fait que ${meta.width} px de large.`)
    continue
  }
  const base = sharp(SOURCE).resize({ width: largeur, withoutEnlargement: true })
  for (const [ext, options] of [['avif', { quality: 58, effort: 6 }], ['webp', { quality: 76 }]]) {
    const cible = path.join(DOSSIER, `house-lit-${largeur}.${ext}`)
    await base.clone().toFormat(ext, options).toFile(cible)
    const { size } = await stat(cible)
    console.log(`  ${path.basename(cible).padEnd(24)} ${(size / 1024).toFixed(0)} ko`)
  }
}
