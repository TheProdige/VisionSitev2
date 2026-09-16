'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { site, telHref } from '@/content/site'

const LIENS = [
  { href: '/services', libelle: 'Services' },
  { href: '/a-propos', libelle: 'À propos' },
  { href: '/contact', libelle: 'Contact' },
] as const

export function EnTete() {
  const [ouvert, setOuvert] = useState(false)
  const chemin = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-white/95 backdrop-blur">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-marque-800 focus:px-4 focus:py-2 focus:text-clair"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label={`${site.nom} — accueil`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principale">
          {LIENS.map((l) => {
            const actif = chemin === l.href || chemin.startsWith(`${l.href}/`)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={actif ? 'page' : undefined}
                className={`text-sm font-medium underline-offset-8 transition hover:text-accent-700 ${
                  actif ? 'text-accent-700 underline' : 'text-texte'
                }`}
              >
                {l.libelle}
              </Link>
            )
          })}
          <Link
            href="/soumission"
            className="rounded-full bg-marque-800 px-5 py-2.5 text-sm font-semibold text-clair transition hover:bg-marque-700"
          >
            Demander une soumission
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          className="inline-flex items-center gap-2 rounded-full border border-bordure px-4 py-2 text-sm font-medium md:hidden"
        >
          <span
            aria-hidden="true"
            className="flex h-3.5 w-4 flex-col justify-between"
          >
            <span className="block h-0.5 w-full bg-texte" />
            <span className="block h-0.5 w-full bg-texte" />
            <span className="block h-0.5 w-full bg-texte" />
          </span>
          Menu
        </button>
      </div>

      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label="Principale, mobile"
          className="border-t border-bordure bg-white px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LIENS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOuvert(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-gris"
                >
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/soumission"
            onClick={() => setOuvert(false)}
            className="mt-3 block rounded-full bg-marque-800 px-5 py-3 text-center text-sm font-semibold text-clair"
          >
            Demander une soumission
          </Link>
          <a
            href={telHref}
            className="mt-2 block rounded-full border border-accent-500 px-5 py-3 text-center text-sm font-semibold text-accent-700"
          >
            Appeler {site.contact.telephoneAffiche}
          </a>
        </nav>
      )}
    </header>
  )
}
