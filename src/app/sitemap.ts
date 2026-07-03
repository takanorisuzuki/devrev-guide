import type { MetadataRoute } from 'next'
import { SESSION_ORDER } from '@/data/sessions'
import { REFERENCE_SLUGS } from '@/data/references'
import { LOCALES } from '@/lib/locale'

const BASE_URL = 'https://devrev-guide.vercel.app'
const SESSION_IDS = [...SESSION_ORDER]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const homePages = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  const sessionPages = LOCALES.flatMap((locale) =>
    SESSION_IDS.map((id) => ({
      url: `${BASE_URL}/${locale}/${id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const privacyPages = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/privacy`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  const referencePages = LOCALES.flatMap((locale) =>
    REFERENCE_SLUGS.map((slug) => ({
      url: `${BASE_URL}/${locale}/reference/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }))
  )

  return [...homePages, ...sessionPages, ...referencePages, ...privacyPages]
}
