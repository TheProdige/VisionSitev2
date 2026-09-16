import { site, telHref } from '@/content/site'

/**
 * Bandeau permanent au-dessus de l'en-tête.
 *
 * Il reste discret — un filet ivoire, pas un bloc noir : c'est la page entière
 * qui doit rester claire. Mais il reste présent sur toutes les pages, parce
 * que quelqu'un qui arrive ici à 2 h du matin avec un panneau qui fume ne doit
 * pas avoir à chercher le numéro.
 */
export function BarreUrgence() {
  if (!site.urgence.actif) return null

  return (
    <div className="border-b border-trait bg-ivoire">
      <div className="mx-auto flex max-w-[74rem] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5 text-[0.82rem] sm:justify-between sm:px-8">
        <p className="flex items-center gap-2.5 text-texte-doux">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
          />
          <span className="font-medium text-texte">{site.urgence.libelle}</span>
          <span className="hidden sm:inline">— {site.urgence.promesse}</span>
        </p>
        <a
          href={telHref}
          className="font-medium text-texte underline-offset-4 hover:text-accent-700 hover:underline"
        >
          {site.contact.telephoneAffiche}
        </a>
      </div>
    </div>
  )
}
