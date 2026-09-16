import Link from 'next/link'
import { Logo } from '@/components/logo'
import { site, telHref } from '@/content/site'
import { services } from '@/content/services'

export function PiedDePage() {
  return (
    <footer className="mt-24 bg-marque-900 text-clair">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo ton="fonce" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-clair/70">
            {site.slogan}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-accent-300">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-clair/80 underline-offset-4 hover:text-clair hover:underline"
                >
                  {s.titre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-accent-300">
            Nous joindre
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-clair/80">
            <li>
              <a href={telHref} className="hover:text-clair">
                {site.contact.telephoneAffiche}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.courriel}`}
                className="break-all hover:text-clair"
              >
                {site.contact.courriel}
              </a>
            </li>
            <li className="pt-2">{site.horaires.semaine}</li>
            <li className="text-accent-300">{site.horaires.urgence}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-accent-300">
            Territoire
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-clair/80">
            {site.zones.join(' · ')}
          </p>
        </div>
      </div>

      <div className="border-t border-clair/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-clair/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nom}. Licence RBQ{' '}
            {site.licences.rbq}.
            {site.licences.cmeq && ' Membre de la CMEQ.'}
          </p>
          <p>{site.contact.adresse.ville}, {site.contact.adresse.province}</p>
        </div>
      </div>
    </footer>
  )
}
