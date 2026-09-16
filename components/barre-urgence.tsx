import { site, telHref } from '@/content/site'

/**
 * Bandeau permanent au-dessus de l'en-tête.
 *
 * Le dépannage d'urgence est la moitié du chiffre d'affaires d'un
 * électricien : quelqu'un qui arrive ici à 2 h du matin avec un panneau qui
 * fume ne doit pas avoir à chercher le numéro.
 */
export function BarreUrgence() {
  if (!site.urgence.actif) return null

  return (
    <div className="bg-marque-900 text-clair">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-sm sm:justify-between">
        <p className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent-500"
          />
          <span className="font-medium">{site.urgence.libelle}</span>
          <span className="hidden text-clair/70 sm:inline">
            — {site.urgence.promesse}
          </span>
        </p>
        <a
          href={telHref}
          className="font-semibold text-accent-300 underline-offset-4 hover:underline"
        >
          {site.contact.telephoneAffiche}
        </a>
      </div>
    </div>
  )
}
