import type { MetadataRoute } from 'next'

const BASE_URL = 'https://devrev-guide.vercel.app'
const LOCALES = ['en', 'ja']
const SESSION_IDS = ['s01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13']

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

  return [...homePages, ...sessionPages, ...privacyPages]
}
