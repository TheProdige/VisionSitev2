import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getService, services } from '@/content/services'
import { site, telHref } from '@/content/site'
import { Bouton, Conteneur, Section } from '@/components/ui'

/** Les six services sont connus au build : on prérend tout. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(
  props: PageProps<'/services/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: service.titre,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function PageService(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) notFound()

  const autres = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <div className="border-b border-bordure bg-gris">
        <Conteneur className="py-14 sm:py-20">
          <nav aria-label="Fil d’Ariane" className="text-sm text-texte-doux">
            <Link href="/services" className="underline-offset-4 hover:underline">
              Services
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span className="text-texte">{service.titre}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-bordure bg-white px-3 py-1 text-xs font-semibold text-texte-doux">
              {service.clientele}
            </span>
            {service.urgence && (
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {site.urgence.libelle}
              </span>
            )}
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {service.titre}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-texte-doux">
            {service.resume}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Bouton href="/soumission">Demander une soumission</Bouton>
            <Bouton href={telHref} variante="contour">
              {site.contact.telephoneAffiche}
            </Bouton>
          </div>
        </Conteneur>
      </div>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">Ce que ça comprend</h2>
            <ul className="mt-7 space-y-4">
              {service.prestations.map((p) => (
                <li key={p} className="flex gap-4 border-b border-bordure pb-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                  />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Questions fréquentes</h2>
            <dl className="mt-7 space-y-7">
              {service.faq.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold">{f.question}</dt>
                  <dd className="mt-2.5 leading-relaxed text-texte-doux">
                    {f.reponse}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section fond="gris">
        <h2 className="text-2xl font-semibold">Autres services</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {autres.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="flex h-full flex-col rounded-2xl border border-bordure bg-white p-6 transition hover:border-accent-500"
              >
                <h3 className="font-semibold">{s.titre}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-texte-doux">
                  {s.resume}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
