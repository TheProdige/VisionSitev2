import type { Metadata } from 'next'
import { Formulaire } from './formulaire'
import { site, telHref } from '@/content/site'
import { Conteneur } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Demander une soumission',
  description:
    'Demandez une soumission gratuite et sans engagement à Lussier Électrique. Réponse sous un jour ouvrable.',
  alternates: { canonical: '/soumission' },
}

export default function PageSoumission() {
  return (
    <Conteneur className="py-16 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Demander une soumission
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-texte-doux">
            Gratuite, sans engagement. Plus votre description est précise, plus
            le chiffre qu’on vous donnera sera juste.
          </p>

          <div className="mt-10">
            <Formulaire />
          </div>
        </div>

        <aside className="lg:pt-24">
          <div className="rounded-2xl bg-marque-800 p-8 text-clair">
            <h2 className="text-xl font-bold">Plus pressé ?</h2>
            <p className="mt-3 leading-relaxed text-clair/75">
              Le téléphone reste le moyen le plus rapide. On répond aux urgences
              24 heures sur 24.
            </p>
            <a
              href={telHref}
              className="mt-6 inline-flex rounded-full bg-accent-500 px-6 py-3 font-bold text-marque-800 transition hover:bg-accent-300"
            >
              {site.contact.telephoneAffiche}
            </a>
          </div>

          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="font-bold">Délai de réponse</dt>
              <dd className="mt-1.5 text-texte-doux">
                Un jour ouvrable pour les demandes de soumission. Immédiat pour
                les urgences, par téléphone.
              </dd>
            </div>
            <div>
              <dt className="font-bold">Heures d’ouverture</dt>
              <dd className="mt-1.5 text-texte-doux">
                {site.horaires.semaine}
                <br />
                {site.horaires.urgence}
              </dd>
            </div>
            <div>
              <dt className="font-bold">Territoire</dt>
              <dd className="mt-1.5 text-texte-doux">{site.zones.join(', ')}.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Conteneur>
  )
}
