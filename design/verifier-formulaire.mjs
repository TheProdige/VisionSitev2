/**
 * Vérifie le formulaire de soumission de bout en bout, dans un vrai
 * navigateur, contre le site déjà démarré.
 *
 *   npx next build && npx next start -p 3210
 *   node design/verifier-formulaire.mjs
 *
 * Les cinq chemins couverts correspondent chacun à une façon concrète de
 * perdre un client : validation muette, saisie effacée entre deux essais,
 * faux succès quand rien n'est envoyé, et pourriel.
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:3210'
const MESSAGE = 'Je veux faire installer une borne de recharge au garage.'

const navigateur = await chromium.launch()
const page = await navigateur.newPage({ viewport: { width: 1280, height: 1000 } })

const erreurs = []
page.on('pageerror', (e) => erreurs.push(`pageerror: ${e.message}`))
page.on('console', (m) => m.type() === 'error' && erreurs.push(`console: ${m.text()}`))

// Next installe un annonceur de route qui porte aussi `role="alert"` : viser
// l'alerte DANS le formulaire, sinon l'attente se résout instantanément, avant
// même la réponse du serveur, et le test passe à tort.
const alerte = page.locator('form p[role="alert"]')
const champsRouges = page.locator('form p.text-red-700')
const succes = page.locator('[role="status"]')
const envoyer = () => page.getByRole('button', { name: 'Envoyer ma demande' }).click()

const echec = (m) => {
  console.error('✗', m)
  process.exitCode = 1
  throw new Error(m)
}

await page.goto(`${BASE}/soumission`, { waitUntil: 'networkidle' })

// 1. Un envoi vide doit être refusé par le serveur, champ par champ.
await envoyer()
await alerte.waitFor({ timeout: 10_000 })
const vide = await champsRouges.allTextContents()
if (vide.length < 4) echec(`validation incomplète : ${vide.length} erreurs`)
console.log('1. envoi vide →', vide.length, 'erreurs de champ')

// 2. Un seul champ fautif ne doit signaler que celui-là.
await page.fill('#nom', 'Jean Tremblay')
await page.fill('#telephone', '123')
await page.fill('#ville', 'Beloeil')
await page.fill('#message', MESSAGE)
await envoyer()
await page.waitForTimeout(1800)
const tel = await champsRouges.allTextContents()
if (tel.length !== 1 || !tel[0].includes('10 chiffres')) echec(`téléphone mal validé : ${tel}`)
console.log('2. téléphone « 123 » → une seule erreur, la bonne')

// 3. La saisie doit survivre au refus. React réinitialise les champs non
//    contrôlés après chaque action : sans renvoi des valeurs, une faute de
//    frappe effacerait la description que le visiteur vient d'écrire.
if ((await page.inputValue('#message')) !== MESSAGE) echec('la description est perdue')
if ((await page.inputValue('#nom')) !== 'Jean Tremblay') echec('le nom est perdu')
console.log('3. saisie conservée après refus')

// 4. Sans fournisseur d'envoi configuré, le site doit le dire au visiteur
//    plutôt que d'afficher un succès et de perdre la demande.
await page.fill('#telephone', '819 555-1234')
await envoyer()
await page.waitForTimeout(2500)
const texte = await alerte.textContent().catch(() => null)
if (process.env.RESEND_API_KEY) {
  if ((await succes.count()) === 0) echec(`envoi configuré mais échoué : ${texte}`)
  console.log('4. fournisseur configuré → demande envoyée')
} else {
  if ((await succes.count()) > 0) echec('succès annoncé alors que rien n’a été envoyé')
  if (!texte?.includes('Appelez-nous')) echec(`message de repli absent : ${texte}`)
  if ((await page.inputValue('#message')) !== MESSAGE) echec('saisie perdue sur échec d’envoi')
  console.log('4. sans fournisseur → le site le dit et garde la saisie')
}

// 5. Le pot de miel absorbe les robots sans leur signaler qu'ils sont repérés.
await page.goto(`${BASE}/soumission`, { waitUntil: 'networkidle' })
await page.fill('#site_web', 'http://pourriel.example')
await envoyer()
await succes.waitFor({ timeout: 10_000 })
console.log('5. pot de miel → demande absorbée, robot non alerté')

await navigateur.close()

if (erreurs.length) {
  console.error('\n⚠ erreurs dans la console du navigateur :')
  erreurs.forEach((e) => console.error('   ', e))
  process.exit(1)
}
console.log('\n✓ formulaire conforme sur les cinq chemins')
