/**
 * Compression des plans du héro.
 *
 * Les rushes sortent du générateur à 15 Mo pièce : inutilisable pour une
 * page d'accueil. On vise ~1,5 Mo par plan, ce qui tient dans le budget
 * d'un héro vidéo sans tuer la qualité à l'écran.
 *
 *   node scripts/encode-hero-video.mjs [dossier-source] [dossier-sortie]
 *
 * Deux formats sont produits pour chaque plan :
 *   - VP9 en WebM, sensiblement plus léger à qualité égale ;
 *   - H.264 en MP4, le repli universel, avec `faststart` pour que la lecture
 *     commence sans attendre le fichier entier.
 * La piste audio est retirée : le héro est muet, un flux audio ne sert qu'à
 * alourdir et à faire refuser la lecture automatique.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.resolve(process.argv[2] || path.join(RACINE, 'prototypes/videos/source'))
const SORTIE = path.resolve(process.argv[3] || path.join(RACINE, 'prototypes/videos'))
const LARGEUR = 1280

mkdirSync(SORTIE, { recursive: true })
const rushes = readdirSync(SOURCE).filter(f => f.endsWith('.mp4')).sort()
if (!rushes.length) { console.error(`Aucun .mp4 dans ${SOURCE}`); process.exit(1) }

const ko = f => (statSync(f).size / 1024).toFixed(0)
const passer = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args])

for (const nom of rushes) {
  const entree = path.join(SOURCE, nom)
  const base = nom.replace(/\.mp4$/, '')
  const echelle = `scale=${LARGEUR}:-2:flags=lanczos`

  const mp4 = path.join(SORTIE, `${base}.mp4`)
  passer([...['-i', entree], '-an', '-vf', echelle, '-c:v', 'libx264', '-preset', 'slow',
          '-crf', '30', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
          '-movflags', '+faststart', mp4])

  const webm = path.join(SORTIE, `${base}.webm`)
  // AV1 serait plus léger encore, mais ffmpeg-static n'embarque pas SVT-AV1
  // et libaom met des minutes par plan. VP9 donne le même ordre de gain.
  passer([...['-i', entree], '-an', '-vf', echelle, '-c:v', 'libvpx-vp9',
          '-crf', '40', '-b:v', '0', '-deadline', 'good', '-cpu-used', '4',
          '-row-mt', '1', '-pix_fmt', 'yuv420p', webm])

  console.log(`${base.padEnd(18)} ${ko(entree).padStart(6)} ko → mp4 ${ko(mp4).padStart(5)} ko · webm ${ko(webm).padStart(5)} ko`)
}
