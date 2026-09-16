/**
 * Déclinaisons de la série photo.
 *
 * Dépose les originaux dans outils/sources/ (n'importe quel format lisible
 * par sharp), nommés comme les fichiers attendus par la page :
 * hero-salon, atelier, eclairage, panneau, borne, facade.
 *
 *   npm run images
 *
 * Écrit site/images/<nom>.webp et .jpg. Le WebP sert, le JPEG est le repli.
 */
import sharp from 'sharp'
import { readdirSync, mkdirSync, statSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCES = path.join(RACINE, 'outils/sources')
const CIBLE = path.join(RACINE, 'site/images')

// Le héro et la façade sont pleine largeur ; les autres tiennent une colonne.
const LARGEURS = { 'hero-salon': 2400, facade: 2400, atelier: 1800 }
const DEFAUT = 1400

if (!existsSync(SOURCES)) {
  console.error(`Aucun dossier ${path.relative(RACINE, SOURCES)}.\nDéposez-y les originaux, nommés comme les fichiers de site/images/.`)
  process.exit(1)
}
mkdirSync(CIBLE, { recursive: true })

const ko = f => (statSync(f).size / 1024).toFixed(0)
for (const fichier of readdirSync(SOURCES).filter(f => !f.startsWith('.'))) {
  const nom = path.parse(fichier).name
  const largeur = LARGEURS[nom] || DEFAUT
  const base = sharp(path.join(SOURCES, fichier)).resize({ width: largeur, withoutEnlargement: true })
  const webp = path.join(CIBLE, `${nom}.webp`)
  const jpg = path.join(CIBLE, `${nom}.jpg`)
  await base.clone().webp({ quality: 82 }).toFile(webp)
  await base.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(jpg)
  console.log(`${nom.padEnd(12)} ${String(largeur).padStart(4)} px → ${ko(webp).padStart(4)} ko webp · ${ko(jpg).padStart(4)} ko jpg`)
}
