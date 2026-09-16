/**
 * Compose un aperçu autonome du site, en un seul fichier HTML.
 *
 *   EXPORT_STATIQUE=1 npx next build
 *   node design/apercu-artefact.mjs
 *
 * Le HTML de chaque page vient de l'export réel (`out/`), pas d'une
 * reconstruction à la main : ce qu'on regarde est bien le site. Les feuilles de
 * style et les polices sont inlinées, les liens internes deviennent une
 * navigation locale, et le formulaire — qui n'a pas de serveur ici — le dit.
 */
import { chromium } from 'playwright'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const RACINE = resolve(import.meta.dirname, '..')
const OUT = join(RACINE, 'out')

const ROUTES = [
  ['/', 'index.html', 'Accueil'],
  ['/services', 'services.html', 'Services'],
  ['/services/depannage-urgence', 'services/depannage-urgence.html', 'Dépannage d’urgence'],
  ['/services/panneau-electrique', 'services/panneau-electrique.html', 'Panneau électrique'],
  ['/services/borne-recharge', 'services/borne-recharge.html', 'Borne de recharge'],
  ['/services/renovation-residentielle', 'services/renovation-residentielle.html', 'Rénovation'],
  ['/services/commercial', 'services/commercial.html', 'Commercial'],
  ['/services/mise-aux-normes', 'services/mise-aux-normes.html', 'Mise aux normes'],
  ['/soumission', 'soumission.html', 'Soumission'],
  ['/a-propos', 'a-propos.html', 'À propos'],
  ['/contact', 'contact.html', 'Contact'],
]

/* ------------------------------------------------- feuille de style + polices */

// Le nom des fichiers CSS est haché sur le contenu : il change à chaque build.
// On les découvre plutôt que de les figer, et on les concatène — il peut y en
// avoir plusieurs.
const dossierChunks = join(OUT, '_next/static/chunks')
const feuilles = readdirSync(dossierChunks).filter((f) => f.endsWith('.css'))
if (feuilles.length === 0) throw new Error(`aucune feuille de style dans ${dossierChunks}`)
console.log(`feuilles de style : ${feuilles.join(', ')}`)
const cssSrc = feuilles
  .map((f) => readFileSync(join(dossierChunks, f), 'utf8'))
  .join('\n')

// Les polices sont référencées en chemin absolu, qui ne résoudra pas depuis
// une URL d'artefact : on les embarque.
// Le CSS exporté les référence en relatif (`../media/…`) depuis
// `_next/static/chunks/`, ce qui ne résoudra pas une fois le style inliné.
let inlinees = 0
const css = cssSrc.replace(
  /(?:\.\.\/media\/|\/_next\/static\/media\/)([\w.\-]+\.woff2)/g,
  (_, fichier) => {
    const b64 = readFileSync(join(OUT, '_next/static/media', fichier)).toString('base64')
    inlinees += 1
    return `data:font/woff2;base64,${b64}`
  }
)
if (inlinees === 0) throw new Error('aucune police inlinée : le motif ne correspond plus au CSS exporté')
console.log(`polices inlinées : ${inlinees}`)

/* ------------------------------------------- extraction du corps de chaque page */

const navigateur = await chromium.launch()
const page = await navigateur.newPage()
const pages = []

for (const [route, fichier, titre] of ROUTES) {
  await page.goto(`file://${join(OUT, fichier)}`, { waitUntil: 'domcontentloaded' })

  const extrait = await page.evaluate((route) => {
    // Le routeur React et la charge RSC ne servent à rien ici, et les liens
    // absolus qu'ils portent casseraient la navigation.
    document.querySelectorAll('script, template, link[rel="stylesheet"]').forEach((n) => n.remove())

    // `#contenu` est dans la mise en page commune : sans préfixe, l'identifiant
    // se retrouverait onze fois dans le document final.
    const cle = route === '/' ? 'accueil' : route.slice(1).replace(/\//g, '-')
    document.querySelectorAll('[id]').forEach((n) => {
      const ancien = n.id
      n.id = `${cle}--${ancien}`
      document
        .querySelectorAll(`[href="#${ancien}"]`)
        .forEach((a) => a.setAttribute('href', `#${cle}--${ancien}`))
    })

    return {
      corps: document.body.innerHTML,
      // `next/font` pose la variable `--font-archivo` via une classe sur
      // <html>, et la mise en page ses utilitaires sur <body>. Extraire le
      // seul innerHTML les perdait : le logo retombait sur une police système.
      classes:
        document.documentElement.className + ' ' + document.body.className,
    }
  }, route)

  const { corps, classes } = extrait
  pages.push({ route, titre, corps, classes })
  console.log(`  ${route.padEnd(36)} ${(corps.length / 1024).toFixed(0)} Ko`)
}

await navigateur.close()

/* -------------------------------------------------------- assemblage du fichier */

const sections = pages
  .map(
    (p, i) =>
      `<div class="route ${p.classes.trim()}" data-route="${p.route}" data-titre="${p.titre}"${i ? ' hidden' : ''}>${p.corps}</div>`
  )
  .join('\n')

const html = `<title>Site Lussier Électrique</title>

<style>
${css}

/* --- Ajouts propres à l'aperçu, hors feuille de style du site ------------- */

html, body { background: #fff; }
body { margin: 0; }
.route > body, .route { display: block; }

/* Le site est en thème clair : on neutralise un éventuel thème sombre de
   l'hôte pour que l'aperçu montre le site tel qu'il est. */
:root { color-scheme: light; }

#apercu-note {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 100;
  max-width: calc(100% - 32px);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(11, 14, 20, 0.92);
  backdrop-filter: blur(8px);
  color: #fff;
  font-family: var(--font-archivo), Archivo, system-ui, sans-serif;
  font-size: 12.5px;
  line-height: 1.35;
  box-shadow: 0 6px 30px -10px rgba(0, 0, 0, 0.6);
}
#apercu-note b { color: #ffd180; font-weight: 600; }
#apercu-note button {
  flex: none;
  border: 0;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  border-radius: 999px;
  width: 22px;
  height: 22px;
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
#apercu-note button:hover { background: rgba(255, 255, 255, 0.26); }
@media (max-width: 520px) { #apercu-note { font-size: 11.5px; padding: 8px 12px; } }
</style>

<div id="site">
${sections}
</div>

<div id="apercu-note" role="status">
  <span><b>Aperçu</b> — le site complet, cliquable. Le formulaire n’envoie rien ici.</span>
  <button type="button" aria-label="Masquer">×</button>
</div>

<script>
(function () {
  var site = document.getElementById('site')
  var routes = Array.prototype.slice.call(site.querySelectorAll('.route'))

  function montrer(route, pousser) {
    var cible = routes.filter(function (r) { return r.dataset.route === route })[0]
    if (!cible) return false
    routes.forEach(function (r) { r.hidden = r !== cible })
    document.title = cible.dataset.titre === 'Accueil'
      ? 'Site Lussier Électrique'
      : cible.dataset.titre + ' — Lussier Électrique'
    window.scrollTo(0, 0)
    if (pousser) {
      try { history.replaceState(null, '', '#' + route) } catch (e) {}
    }
    fermerMenus()
    return true
  }

  // Navigation interne : les liens du site pointent en chemin absolu, qui
  // sortirait de l'artefact. On les rattrape ici.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null
    if (!a) return
    var href = a.getAttribute('href') || ''
    if (href.charAt(0) !== '/' || href.charAt(1) === '/') return
    if (montrer(href, true)) e.preventDefault()
  })

  // Le menu mobile est rendu par React dans le vrai site : il n'existe pas
  // dans le HTML statique. On le reconstruit à partir des liens du bureau,
  // pour que l'aperçu reste utilisable au téléphone.
  routes.forEach(function (r) {
    var entete = r.querySelector('header')
    if (!entete) return
    var bouton = entete.querySelector('button[aria-controls]')
    var navBureau = entete.querySelector('nav')
    if (!bouton || !navBureau) return

    var panneau = document.createElement('nav')
    panneau.className = 'border-t border-bordure bg-white px-4 py-4 md:hidden'
    panneau.hidden = true
    panneau.setAttribute('aria-label', 'Principale, mobile')
    panneau.innerHTML =
      '<ul class="flex flex-col gap-1">' +
      Array.prototype.slice.call(navBureau.querySelectorAll('a'))
        .map(function (a) {
          return '<li><a href="' + a.getAttribute('href') + '" class="block rounded-lg px-3 py-3 text-base font-medium hover:bg-gris">' +
            a.textContent + '</a></li>'
        })
        .join('') +
      '</ul>'
    entete.appendChild(panneau)

    bouton.addEventListener('click', function () {
      var ouvert = panneau.hidden
      panneau.hidden = !ouvert
      bouton.setAttribute('aria-expanded', String(ouvert))
    })
  })

  function fermerMenus() {
    site.querySelectorAll('nav[aria-label="Principale, mobile"]').forEach(function (n) {
      n.hidden = true
    })
    site.querySelectorAll('button[aria-controls]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false')
    })
  }

  // Sans serveur, le formulaire ne peut rien envoyer : le dire plutôt que de
  // laisser le navigateur recharger la page sur une soumission vide.
  document.addEventListener('submit', function (e) {
    e.preventDefault()
    var form = e.target
    var avis = form.querySelector('.avis-apercu')
    if (!avis) {
      avis = document.createElement('p')
      avis.className = 'avis-apercu rounded-xl border border-accent-500 bg-accent-100 px-4 py-3 text-sm font-medium text-marque-800'
      avis.setAttribute('role', 'alert')
      form.insertBefore(avis, form.firstChild)
    }
    avis.textContent = 'Cet aperçu n’envoie pas les demandes. Sur le site en ligne, elles arrivent par courriel — ici, appelez au 819 817-9526.'
    avis.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })

  document.querySelector('#apercu-note button').addEventListener('click', function () {
    document.getElementById('apercu-note').remove()
  })

  if (location.hash.length > 1) montrer(decodeURIComponent(location.hash.slice(1)), false)
})()
</script>
`

const sortie = join(RACINE, 'design/apercu-site.html')
writeFileSync(sortie, html)
console.log(`\n→ ${sortie} (${(html.length / 1024).toFixed(0)} Ko)`)
