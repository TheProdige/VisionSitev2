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
    <header className="sticky top-0 z-40 border-b border-trait bg-blanc/85 backdrop-blur-md">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-full focus:bg-encre-800 focus:px-5 focus:py-2.5 focus:text-blanc"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex max-w-[74rem] items-center justify-between gap-6 px-6 py-5 sm:px-8">
        <Link href="/" aria-label={`${site.nom} — accueil`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principale">
          {LIENS.map((l) => {
            const actif = chemin === l.href || chemin.startsWith(`${l.href}/`)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={actif ? 'page' : undefined}
                className={`relative text-[0.92rem] transition-colors hover:text-accent-700 ${
                  actif ? 'text-encre-800' : 'text-texte-doux'
                }`}
              >
                {l.libelle}
                {actif && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-accent-500"
                  />
                )}
              </Link>
            )
          })}
          <Link
            href="/soumission"
            className="rounded-full border border-trait-fort px-6 py-2.5 text-[0.88rem] font-medium transition-colors hover:border-encre-800 hover:bg-ivoire"
          >
            Soumission
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          className="inline-flex items-center gap-2.5 rounded-full border border-trait-fort px-5 py-2.5 text-[0.85rem] font-medium md:hidden"
        >
          <span aria-hidden="true" className="flex h-3 w-3.5 flex-col justify-between">
            <span className="block h-px w-full bg-encre-800" />
            <span className="block h-px w-full bg-encre-800" />
            <span className="block h-px w-full bg-encre-800" />
          </span>
          Menu
        </button>
      </div>

      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label="Principale, mobile"
          className="border-t border-trait bg-blanc px-6 py-5 md:hidden"
        >
          <ul className="flex flex-col">
            {LIENS.map((l) => (
              <li key={l.href} className="border-b border-trait last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setOuvert(false)}
                  className="block py-4 text-[1.05rem]"
                >
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/soumission"
            onClick={() => setOuvert(false)}
            className="mt-5 block rounded-full bg-encre-800 px-6 py-3.5 text-center text-[0.9rem] font-medium text-blanc"
          >
            Demander une soumission
          </Link>
          <a
            href={telHref}
            className="mt-2.5 block rounded-full border border-trait-fort px-6 py-3.5 text-center text-[0.9rem] font-medium"
          >
            {site.contact.telephoneAffiche}
          </a>
        </nav>
      )}
    </header>
  )
}
