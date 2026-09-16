export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { services } from '@/content/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date()
  const pages = ['', '/services', '/soumission', '/a-propos', '/contact']

  return [
    ...pages.map((chemin) => ({
      url: `${site.url}${chemin}`,
      lastModified: maintenant,
      changeFrequency: 'monthly' as const,
      priority: chemin === '' ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: maintenant,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
