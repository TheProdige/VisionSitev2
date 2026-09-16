import Link from 'next/link'
import type { Metadata } from 'next'
import { preuves, site, telHref } from '@/content/site'
import { services } from '@/content/services'
import { Eclair } from '@/components/logo'
import {
  Bouton,
  Conteneur,
  LienDiscret,
  Section,
  Surtitre,
  TitreSection,
} from '@/components/ui'

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
      <Methode />
      <Territoire />
      <AppelFinal />
      <DonneesStructurees />
    </>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden bg-blanc">
      {/* L'éclair, très pâle et très grand : une texture, pas un logo posé.
          Le site n'a pas encore de photos de chantier — l'identité porte seule,
          mais elle ne doit pas crier. */}
      <Eclair className="pointer-events-none absolute -right-28 -top-24 h-[46rem] w-auto text-accent-500 opacity-[0.07] sm:-right-16" />

      <Conteneur className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl">
          <Surtitre>Maître électricien · RBQ {site.licences.rbq}</Surtitre>

          <h1 className="mt-8 text-[2.9rem] leading-[1.04] sm:text-[4.3rem]" style={{ textWrap: 'balance' }}>
            Le courant, fait dans les règles.
          </h1>

          <p className="mesure mt-8 text-[1.13rem] leading-[1.75] text-texte-doux">
            Installation, rénovation, mise aux normes et bornes de recharge, à
            Drummondville et dans le Centre-du-Québec — pour la maison comme
            pour le commerce. Et quand ça lâche à 3 h du matin, quelqu’un
            décroche.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Bouton href="/soumission">Demander une soumission</Bouton>
            <a
              href={telHref}
              className="font-titre text-[1.6rem] text-encre-800 underline-offset-[7px] hover:underline"
            >
              {site.contact.telephoneAffiche}
            </a>
          </div>
        </div>

        <dl className="mt-20 grid gap-px border-t border-trait bg-trait sm:grid-cols-3">
          {preuves.map((p) => (
            <div key={p.libelle} className="bg-blanc pt-7">
              <dt className="sr-only">{p.libelle}</dt>
              <dd>
                <span className="block font-titre text-[2.3rem] leading-none text-encre-800">
                  {p.valeur}
                </span>
                <span className="mt-3 block text-[0.9rem] text-texte-doux">
                  {p.libelle}
                </span>
              </dd>
            </div>
          ))}
          <div className="bg-blanc pt-7">
            <dt className="sr-only">Territoire</dt>
            <dd>
              <span className="block font-titre text-[2.3rem] leading-none text-encre-800">
                {site.contact.adresse.ville}
              </span>
              <span className="mt-3 block text-[0.9rem] text-texte-doux">
                et le Centre-du-Québec
              </span>
            </dd>
          </div>
        </dl>
      </Conteneur>
    </div>
  )
}

function Services() {
  return (
    <Section id="services" fond="ivoire">
      <TitreSection
        surtitre="Ce qu’on fait"
        titre="Un seul électricien, du panneau à la borne."
        intro="Résidentiel et commercial. Chaque intervention est déclarée, garantie et faite selon le Code de construction du Québec."
      />

      <ul className="mt-16 grid gap-px border border-trait bg-trait sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug} className="bg-blanc">
            <Link
              href={`/services/${s.slug}`}
              className="group relative flex h-full flex-col p-9 transition-colors hover:bg-ivoire"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[1.12rem] font-medium leading-snug">{s.titre}</h3>
                {s.urgence && (
                  <span className="mt-0.5 shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-700">
                    24/7
                  </span>
                )}
              </div>
              <p className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-texte-doux">
                {s.resume}
              </p>
              <span className="mt-8 text-[0.85rem] font-medium text-accent-700 underline-offset-4 group-hover:underline">
                En savoir plus →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const ENGAGEMENTS = [
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

function Methode() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-24">
        <TitreSection
          surtitre="Notre façon de faire"
          titre="Ce qui change quand c’est bien fait."
        />
        <ul className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {ENGAGEMENTS.map((e) => (
            <li key={e.titre} className="border-t border-trait pt-6">
              <h3 className="text-[1.05rem] font-medium">{e.titre}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-texte-doux">
                {e.texte}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Territoire() {
  return (
    <Section fond="ivoire">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-24">
        <TitreSection
          surtitre="Territoire desservi"
          titre="On se déplace chez vous."
          intro={`Basé à ${site.contact.adresse.ville}. Si votre ville n’est pas dans la liste, appelez quand même — c’est souvent possible.`}
        />
        <ul className="grid grid-cols-2 gap-x-10 text-[1.02rem] sm:grid-cols-3">
          {site.zones.map((z) => (
            <li key={z} className="border-b border-trait py-4 text-texte">
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
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[2.1rem] leading-[1.1] sm:text-[2.9rem]" style={{ textWrap: 'balance' }}>
          Un projet, ou juste une question ?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[1.06rem] leading-[1.75] text-texte-doux">
          La soumission est gratuite et sans engagement. Répondez à quelques
          questions et on vous revient rapidement.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Bouton href="/soumission">Demander une soumission</Bouton>
          <LienDiscret href="/contact">Voir toutes les façons de nous joindre</LienDiscret>
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
