import Link from 'next/link'
import type { Metadata } from 'next'
import { preuves, site, telHref } from '@/content/site'
import { services } from '@/content/services'
import { Eclair } from '@/components/logo'
import { Bouton, Conteneur, Section, TitreSection } from '@/components/ui'

export const metadata: Metadata = {
  title: `${site.nom} — Maître électricien`,
  description: site.description,
  alternates: { canonical: '/' },
}

export default function Accueil() {
  return (
    <>
      <Hero />
      <Services />
      <Pourquoi />
      <Territoire />
      <AppelFinal />
      <DonneesStructurees />
    </>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden bg-marque-800 text-clair">
      {/* Le sceau, agrandi et discret, sert de texture de fond : le site n'a
          pas encore de photos de chantier, l'identité doit porter seule. */}
      <Eclair className="pointer-events-none absolute -right-20 -top-24 h-[42rem] w-auto text-clair opacity-[0.055] sm:-right-4" />

      <Conteneur className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-clair/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
            Maître électricien · RBQ {site.licences.rbq}
          </p>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.1] sm:text-6xl">
            Le courant, fait dans les règles.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-clair/75">
            Installation, rénovation, mise aux normes et bornes de recharge, à
            Drummondville et dans le Centre-du-Québec — pour la maison comme
            pour le commerce. Et quand ça lâche à 3 h du matin, quelqu’un
            décroche.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Bouton href="/soumission" variante="accent">
              Demander une soumission
            </Bouton>
            <Bouton
              href={telHref}
              variante="contourSombre"
            >
              Appeler {site.contact.telephoneAffiche}
            </Bouton>
          </div>

          <dl className="mt-14 flex max-w-lg flex-wrap gap-x-12 gap-y-6 border-t border-clair/15 pt-8">
            {preuves.map((p) => (
              <div key={p.libelle}>
                <dt className="sr-only">{p.libelle}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-accent-300 sm:text-3xl">
                    {p.valeur}
                  </span>
                  <span className="mt-1 block text-sm text-clair/65">
                    {p.libelle}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Conteneur>
    </div>
  )
}

function Services() {
  return (
    <Section id="services">
      <TitreSection
        surtitre="Ce qu’on fait"
        titre="Un seul électricien, du panneau à la borne."
        intro="Résidentiel et commercial. Chaque intervention est déclarée, garantie et faite selon le Code de construction du Québec."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-bordure bg-white p-7 transition hover:border-accent-500 hover:shadow-[0_2px_24px_-8px_rgba(16,35,59,0.25)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold">{s.titre}</h3>
                {s.urgence && (
                  <span className="mt-1 shrink-0 rounded-full bg-accent-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-accent-700">
                    24/7
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-texte-doux">
                {s.resume}
              </p>
              <span className="mt-6 text-sm font-semibold text-accent-700 group-hover:underline">
                En savoir plus →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const ARGUMENTS = [
  {
    titre: 'Licencié et assuré',
    texte:
      'Licence RBQ en règle et membre de la CMEQ. Les travaux sont déclarés : votre assureur et le prochain acheteur de la maison y trouveront leur compte.',
  },
  {
    titre: 'Le prix annoncé est le prix payé',
    texte:
      'Soumission écrite et détaillée avant de commencer. Si un imprévu sort du mur, on vous appelle avant de continuer — jamais après.',
  },
  {
    titre: 'Un seul interlocuteur',
    texte:
      'C’est la même personne qui prend l’appel, fait la soumission et pose les fils. Rien ne se perd entre le vendeur et l’installateur.',
  },
  {
    titre: 'Le chantier repart propre',
    texte:
      'Toiles au sol, trous rebouchés, retailles ramassées. On laisse la place dans l’état où on aimerait la trouver.',
  },
]

function Pourquoi() {
  return (
    <Section fond="gris">
      <TitreSection
        surtitre="Pourquoi nous"
        titre="Ce qui change quand c’est bien fait."
      />
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {ARGUMENTS.map((a, i) => (
          <div key={a.titre} className="flex gap-5">
            <span
              aria-hidden="true"
              className="mt-1 font-display text-2xl font-bold text-accent-500/45"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-lg font-semibold">{a.titre}</h3>
              <p className="mt-2.5 leading-relaxed text-texte-doux">{a.texte}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Territoire() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <TitreSection
          surtitre="Territoire desservi"
          titre="On se déplace chez vous."
          intro={`Basé à ${site.contact.adresse.ville}, ${site.contact.adresse.province}. Si votre ville n’est pas dans la liste, appelez quand même — c’est souvent possible.`}
        />
        <ul className="flex flex-wrap gap-2.5">
          {site.zones.map((z) => (
            <li
              key={z}
              className="rounded-full border border-bordure bg-gris px-4 py-2 text-sm font-medium"
            >
              {z}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function AppelFinal() {
  return (
    <Section fond="sombre">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <TitreSection
          surSombre
          titre="Un projet, ou juste une question ?"
          intro="La soumission est gratuite et sans engagement. Répondez à quelques questions et on vous revient rapidement."
        />
        <div className="flex shrink-0 flex-wrap gap-3">
          <Bouton href="/soumission" variante="accent">
            Demander une soumission
          </Bouton>
          <Bouton
            href={telHref}
            variante="contourSombre"
          >
            {site.contact.telephoneAffiche}
          </Bouton>
        </div>
      </div>
    </Section>
  )
}

/**
 * Données structurées `Electrician` : ce sont elles qui alimentent la fiche
 * locale dans les résultats de recherche.
 */
function DonneesStructurees() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: site.nom,
    description: site.description,
    url: site.url,
    telephone: site.contact.telephone,
    email: site.contact.courriel,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.adresse.ville,
      addressRegion: site.contact.adresse.province,
      addressCountry: 'CA',
    },
    areaServed: site.zones.map((z) => ({ '@type': 'City', name: z })),
    availableLanguage: 'fr-CA',
  }

  return (
    <script
      type="application/ld+json"
      // Contenu statique issu de `content/site.ts`, aucune saisie utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
