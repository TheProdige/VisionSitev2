import Link from 'next/link'
import type { Metadata } from 'next'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { Bouton, Conteneur, Section, TitreSection } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Services d’électricité résidentielle et commerciale : panneau, borne de recharge, rénovation, mise aux normes et dépannage d’urgence 24/7.',
  alternates: { canonical: '/services' },
}

export default function PageServices() {
  return (
    <>
      <div className="border-b border-bordure bg-gris">
        <Conteneur className="py-16 sm:py-20">
          <TitreSection
            surtitre="Services"
            titre="Tout ce qui passe par un fil."
            intro={`${site.nom} intervient en résidentiel et en commercial, du simple ajout de prise au remplacement complet de l’entrée de service.`}
          />
        </Conteneur>
      </div>

      <Section>
        <ul className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <li
              key={s.slug}
              className="flex flex-col rounded-2xl border border-bordure p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-semibold">{s.titre}</h2>
                <span className="mt-1.5 shrink-0 rounded-full bg-gris px-3 py-1 text-xs font-semibold text-texte-doux">
                  {s.clientele}
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-texte-doux">{s.resume}</p>

              <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem]">
                {s.prestations.slice(0, 4).map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${s.slug}`}
                className="mt-7 text-sm font-semibold text-accent-700 underline-offset-4 hover:underline"
              >
                Voir le détail de ce service →
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section fond="sombre" className="!py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-lg text-lg text-clair/80">
            Vous ne trouvez pas votre besoin dans la liste ? Décrivez-le, on
            vous dira honnêtement si c’est dans nos cordes.
          </p>
          <Bouton href="/soumission" variante="accent">
            Décrire mon projet
          </Bouton>
        </div>
      </Section>
    </>
  )
}
