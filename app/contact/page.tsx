import type { Metadata } from 'next'
import { site, telHref } from '@/content/site'
import { Bouton, Conteneur, Section, TitreSection } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Joindre ${site.nom} : téléphone, courriel, heures d’ouverture et territoire desservi au Québec.`,
  alternates: { canonical: '/contact' },
}

export default function PageContact() {
  return (
    <>
      <Conteneur className="py-16 sm:py-20">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
          Nous joindre
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-texte-doux">
          Le téléphone reste le plus rapide. Pour un projet qui n’est pas
          pressé, le formulaire de soumission donne de meilleurs résultats : on
          arrive préparés.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Carte titre="Téléphone" principal>
            <a
              href={telHref}
              className="text-2xl font-extrabold text-marque-800 underline-offset-4 hover:underline"
            >
              {site.contact.telephoneAffiche}
            </a>
            <p className="mt-3 text-sm text-texte-doux">
              {site.horaires.semaine}
              <br />
              <span className="font-semibold text-accent-700">
                {site.horaires.urgence}
              </span>
            </p>
          </Carte>

          <Carte titre="Courriel">
            <a
              href={`mailto:${site.contact.courriel}`}
              className="break-all font-semibold text-marque-800 underline-offset-4 hover:underline"
            >
              {site.contact.courriel}
            </a>
            <p className="mt-3 text-sm text-texte-doux">
              Réponse sous un jour ouvrable.
            </p>
          </Carte>

          <Carte titre="Soumission">
            <p className="text-sm leading-relaxed text-texte-doux">
              Quelques questions, et on vous revient avec un chiffre juste.
            </p>
            <div className="mt-5">
              <Bouton href="/soumission">Remplir le formulaire</Bouton>
            </div>
          </Carte>
        </div>
      </Conteneur>

      <Section fond="gris">
        <TitreSection
          surtitre="Territoire desservi"
          titre="Où on se déplace."
          intro={`Base à ${site.contact.adresse.ville}, ${site.contact.adresse.province}. Hors territoire, appelez : c’est souvent possible, on vous le dira franchement.`}
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {site.zones.map((z) => (
            <li
              key={z}
              className="rounded-full border border-bordure bg-white px-4 py-2 text-sm font-medium"
            >
              {z}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

function Carte({
  titre,
  children,
  principal,
}: {
  titre: string
  children: React.ReactNode
  principal?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-7 ${
        principal ? 'border-accent-500 bg-accent-100' : 'border-bordure'
      }`}
    >
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-texte-doux">
        {titre}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}
