import { site } from '@/content/site'

/**
 * Logo Lussier Électrique — piste A « L'accent éclair ».
 *
 * Le « I » de LUSSIER est remplacé par un éclair : le mot se lit encore, mais
 * porte le métier dans son propre nom.
 *
 * Le verrouillage est composé en HTML (texte réel) plutôt qu'en `<text>` SVG :
 * le nom reste sélectionnable, lisible par un lecteur d'écran, et suit la
 * police chargée par `next/font` sans dépendre d'un second chargement.
 * La version vectorielle, pour l'impression, vit dans `design/logos/`.
 */

type Ton = 'clair' | 'fonce'

/**
 * L'éclair de marque. Tracé de référence de `design/build-logos.mjs`,
 * dans sa boîte d'origine 56 × 100.
 */
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
        fill="var(--marque-800)"
      />
    </svg>
  )
}

/** Verrouillage complet : le mot, puis « ÉLECTRIQUE » en pied. */
export function Logo({ ton = 'clair', className }: { ton?: Ton; className?: string }) {
  const nom = ton === 'clair' ? 'text-marque-800' : 'text-clair'
  const sous = ton === 'clair' ? 'text-accent-700' : 'text-accent-300'

  return (
    <span className={`inline-flex flex-col leading-none ${className ?? ''}`}>
      <span
        className={`inline-flex items-center text-[1.5rem] font-black tracking-[-0.035em] ${nom}`}
        aria-hidden="true"
      >
        LUSS
        {/* L'éclair tient la chasse du « I » : sans gouttière il touche le S
            et le E, et le mot se lit « LUSSER ». */}
        <Eclair className="mx-[0.07em] h-[1em] w-[0.34em] shrink-0 translate-y-[0.03em] text-accent-500" />
        ER
      </span>
      <span
        className={`mt-[0.42em] text-[0.6rem] font-semibold tracking-[0.34em] ${sous}`}
        aria-hidden="true"
      >
        ÉLECTRIQUE
      </span>
      <span className="sr-only">{site.nom}</span>
    </span>
  )
}
