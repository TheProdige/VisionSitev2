import type { Metadata } from 'next'
import { Archivo, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { site } from '@/content/site'
import { EnTete } from '@/components/en-tete'
import { PiedDePage } from '@/components/pied-de-page'
import { BarreUrgence } from '@/components/barre-urgence'

// Archivo porte le logo, l'interface et le corps de texte.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Les titres passent en sérif : c'est l'écart de registre avec le logo, seul
// élément en graisse noire, qui donne le ton haut de gamme.
const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} — Maître électricien`,
    template: `%s — ${site.nom}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    siteName: site.nom,
    title: `${site.nom} — Maître électricien`,
    description: site.description,
  },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="fr-CA"
      className={`${archivo.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="font-sans flex min-h-full flex-col">
        <BarreUrgence />
        <EnTete />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <PiedDePage />
      </body>
    </html>
  )
}
