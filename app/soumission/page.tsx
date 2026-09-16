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
          <h1 className="text-[2.6rem] leading-[1.06] sm:text-[3.4rem]">
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
          <div className="border-t-2 border-encre-800 bg-ivoire p-9">
            <h2 className="text-[1.6rem]">Plus pressé ?</h2>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-texte-doux">
              Le téléphone reste le moyen le plus rapide. On répond aux urgences
              24 heures sur 24.
            </p>
            <a
              href={telHref}
              className="mt-7 inline-block font-titre text-[2rem] leading-none text-encre-800 underline-offset-[7px] hover:underline"
            >
              {site.contact.telephoneAffiche}
            </a>
          </div>

          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="font-medium">Délai de réponse</dt>
              <dd className="mt-1.5 text-texte-doux">
                Un jour ouvrable pour les demandes de soumission. Immédiat pour
                les urgences, par téléphone.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Heures d’ouverture</dt>
              <dd className="mt-1.5 text-texte-doux">
                {site.horaires.semaine}
                <br />
                {site.horaires.urgence}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Territoire</dt>
              <dd className="mt-1.5 text-texte-doux">{site.zones.join(', ')}.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Conteneur>
  )
}
