import Link from 'next/link'
import type { ReactNode } from 'react'

export function Conteneur({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[74rem] px-6 sm:px-8 ${className ?? ''}`}>
      {children}
    </div>
  )
}

/**
 * Les sections respirent : c'est l'espace, plus que les couleurs, qui porte le
 * registre haut de gamme. L'ivoire sert à séparer sans poser de bloc gris.
 */
export function Section({
  children,
  className,
  fond = 'blanc',
  id,
}: {
  children: ReactNode
  className?: string
  fond?: 'blanc' | 'ivoire' | 'encre'
  id?: string
}) {
  const fonds = {
    blanc: 'bg-blanc',
    ivoire: 'bg-ivoire',
    encre: 'bg-encre-900 text-blanc',
  } as const

  return (
    <section
      id={id}
      className={`${fonds[fond]} py-24 sm:py-32 ${className ?? ''}`}
    >
      <Conteneur>{children}</Conteneur>
    </section>
  )
}

/** Surtitre : un filet ambre court, puis le mot-clé en petites capitales. */
export function Surtitre({
  children,
  surSombre = false,
}: {
  children: ReactNode
  surSombre?: boolean
}) {
  return (
    <p className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-7 shrink-0 bg-accent-500" />
      <span
        className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${
          surSombre ? 'text-accent-300' : 'text-accent-700'
        }`}
      >
        {children}
      </span>
    </p>
  )
}

export function TitreSection({
  surtitre,
  titre,
  intro,
  surSombre = false,
}: {
  surtitre?: string
  titre: string
  intro?: string
  surSombre?: boolean
}) {
  return (
    <div className="max-w-2xl">
      {surtitre && <Surtitre surSombre={surSombre}>{surtitre}</Surtitre>}
      <h2
        className={`mt-6 text-[2.1rem] leading-[1.1] sm:text-[2.9rem] ${
          surSombre ? 'text-blanc' : ''
        }`}
        style={{ textWrap: 'balance' }}
      >
        {titre}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-[1.06rem] leading-[1.75] ${
            surSombre ? 'text-blanc/65' : 'text-texte-doux'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

type Variante = 'principal' | 'contour' | 'contourSombre' | 'accent'

const STYLES: Record<Variante, string> = {
  principal: 'bg-encre-800 text-blanc hover:bg-encre-700',
  contour:
    'border border-trait-fort text-encre-800 hover:border-encre-800 hover:bg-ivoire',
  // Variante à part entière, pas un override de `contour` : deux utilitaires de
  // couleur sur le même élément se départagent par l'ordre de la feuille de
  // style, pas par celui de la chaîne — l'override sortait en encre sur encre.
  contourSombre: 'border border-blanc/25 text-blanc hover:border-blanc hover:bg-blanc/10',
  // L'ambre ne porte jamais de blanc : l'encre s'y pose à 10,93:1.
  accent: 'bg-accent-500 text-encre-900 hover:bg-accent-300',
}

export function Bouton({
  href,
  children,
  variante = 'principal',
  className,
}: {
  href: string
  children: ReactNode
  variante?: Variante
  className?: string
}) {
  const classes = `inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.9rem] font-medium transition-colors duration-200 ${STYLES[variante]} ${className ?? ''}`

  // Les liens `tel:` et `mailto:` ne passent pas par le routeur.
  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/** Lien discret souligné — la troisième action, celle qu'on ne met pas en bouton. */
export function LienDiscret({
  href,
  children,
  surSombre = false,
}: {
  href: string
  children: ReactNode
  surSombre?: boolean
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-[0.9rem] font-medium underline-offset-[6px] hover:underline ${
        surSombre ? 'text-accent-300' : 'text-accent-700'
      }`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  )
}
