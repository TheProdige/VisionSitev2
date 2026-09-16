import { site } from '@/content/site'

/**
 * Logo Lussier Électrique — le « I » de LUSSIER est un éclair.
 *
 * Le verrouillage est composé en HTML (texte réel) plutôt qu'en `<text>` SVG :
 * le nom reste sélectionnable et lisible par un lecteur d'écran, et suit la
 * police chargée par `next/font`. La version vectorielle, pour l'impression,
 * vit dans `design/logos/`.
 *
 * C'est le seul élément de la page en graisse noire. Tout le reste — titres en
 * sérif, texte en graisse normale — se tient en retrait pour le laisser sortir.
 */

type Ton = 'clair' | 'fonce'

/** L'éclair de marque. Tracé de référence de `design/build-logos.mjs`. */
export function Eclair({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 36 0 L 2 58 L 24 58 L 18 100 L 56 38 L 32 38 Z" fill="currentColor" />
    </svg>
  )
}

/** La marque seule, en jeton — favicon, icône d'app, portière de camion. */
export function Marque({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <rect width="96" height="96" rx="22" fill="var(--accent-500)" />
      <path
        d="M 52.29 17 L 34.07 52.96 L 45.86 52.96 L 42.64 79 L 63 40.56 L 50.14 40.56 Z"
        fill="var(--encre-900)"
      />
    </svg>
  )
}

export function Logo({ ton = 'clair', className }: { ton?: Ton; className?: string }) {
  const nom = ton === 'clair' ? 'text-encre-800' : 'text-blanc'
  const sous = ton === 'clair' ? 'text-accent-700' : 'text-accent-300'

  return (
    <span className={`inline-flex flex-col leading-none ${className ?? ''}`}>
      <span
        className={`inline-flex items-center text-[1.42rem] font-black tracking-[-0.035em] ${nom}`}
        aria-hidden="true"
      >
        LUSS
        {/* L'éclair tient la chasse du « I » : sans gouttière il touche le S et
            le E, et le mot se lit « LUSSER ». */}
        <Eclair className="mx-[0.07em] h-[1em] w-[0.34em] shrink-0 translate-y-[0.03em] text-accent-500" />
        ER
      </span>
      <span
        className={`mt-[0.46em] text-[0.57rem] font-semibold tracking-[0.36em] ${sous}`}
        aria-hidden="true"
      >
        ÉLECTRIQUE
      </span>
      <span className="sr-only">{site.nom}</span>
    </span>
  )
}
