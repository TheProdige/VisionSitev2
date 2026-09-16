import Link from 'next/link'
import { Logo } from '@/components/logo'
import { site, telHref } from '@/content/site'
import { services } from '@/content/services'

export function PiedDePage() {
  return (
    <footer className="border-t border-trait bg-ivoire">
      <div className="mx-auto max-w-[74rem] px-6 py-20 sm:px-8">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mesure mt-6 text-[0.95rem] leading-[1.7] text-texte-doux">
              {site.slogan}
            </p>
            <a
              href={telHref}
              className="mt-7 inline-block font-titre text-[1.75rem] text-encre-800 underline-offset-[6px] hover:underline"
            >
              {site.contact.telephoneAffiche}
            </a>
          </div>

          <Colonne titre="Services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-accent-700">
                  {s.titre}
                </Link>
              </li>
            ))}
          </Colonne>

          <Colonne titre="Nous joindre">
            <li>
              <a href={`mailto:${site.contact.courriel}`} className="break-all hover:text-accent-700">
                {site.contact.courriel}
              </a>
            </li>
            <li className="pt-2">{site.horaires.semaine}</li>
            <li className="text-accent-700">{site.horaires.urgence}</li>
          </Colonne>

          <Colonne titre="Territoire">
            <li className="leading-[1.8]">{site.zones.join(' · ')}</li>
          </Colonne>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-trait pt-8 text-[0.8rem] text-texte-doux sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nom}. Licence RBQ {site.licences.rbq}.
            {site.licences.cmeq && ' Membre de la CMEQ.'}
          </p>
          <p>
            {site.contact.adresse.ville}, {site.contact.adresse.province}
          </p>
        </div>
      </div>
    </footer>
  )
}

function Colonne({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-texte-doux">
        {titre}
      </h2>
      <ul className="mt-6 space-y-3 text-[0.92rem] leading-[1.6] text-texte">
        {children}
      </ul>
    </div>
  )
}
