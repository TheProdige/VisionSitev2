import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { site } from '@/content/site'
import { EnTete } from '@/components/en-tete'
import { PiedDePage } from '@/components/pied-de-page'
import { BarreUrgence } from '@/components/barre-urgence'

// Une seule famille, de 400 à 900 : le logo est composé en Archivo Black,
// les titres reprennent la même graisse, le corps de texte la même voix.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
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
      className={`${archivo.variable} h-full antialiased`}
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
