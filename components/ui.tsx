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
    <div className={`mx-auto w-full max-w-6xl px-4 ${className ?? ''}`}>
      {children}
    </div>
  )
}

export function Section({
  children,
  className,
  fond = 'blanc',
  id,
}: {
  children: ReactNode
  className?: string
  fond?: 'blanc' | 'gris' | 'sombre'
  id?: string
}) {
  const fonds = {
    blanc: 'bg-white',
    gris: 'bg-gris',
    sombre: 'bg-marque-800 text-clair',
  } as const
  return (
    <section id={id} className={`${fonds[fond]} py-20 sm:py-24 ${className ?? ''}`}>
      <Conteneur>{children}</Conteneur>
    </section>
  )
}

/** Surtitre + titre. Le surtitre porte le mot-clé, le titre porte la promesse. */
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
      {surtitre && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            surSombre ? 'text-accent-300' : 'text-accent-700'
          }`}
        >
          {surtitre}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{titre}</h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            surSombre ? 'text-clair/75' : 'text-texte-doux'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

type BoutonProps = {
  href: string
  children: ReactNode
  variante?: 'plein' | 'contour' | 'contourSombre' | 'accent'
  className?: string
}

export function Bouton({
  href,
  children,
  variante = 'plein',
  className,
}: BoutonProps) {
  const styles = {
    plein: 'bg-marque-800 text-clair hover:bg-marque-700',
    contour:
      'border border-marque-800/25 text-marque-800 hover:border-marque-800 hover:bg-marque-800/5',
    // Variante à part entière plutôt qu'un override de `contour` : deux
    // utilitaires de couleur sur le même élément se départagent par l'ordre
    // de la feuille de style, pas par l'ordre de la chaîne — l'override
    // rendait le bouton en encre sur fond encre, donc invisible.
    contourSombre:
      'border border-clair/30 text-clair hover:border-clair hover:bg-clair/10',
    accent: 'bg-accent-500 text-marque-800 hover:bg-accent-300',
  } as const

  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles[variante]} ${className ?? ''}`

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
