import { notFound } from 'next/navigation'
import SessionContent from '@/components/session/SessionContent'
import { getReferenceContent } from '@/lib/content'
import { REFERENCE_SLUGS } from '@/data/references'
import { toOgLocale } from '@/lib/locale'

interface ReferencePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['ja', 'en']
  return locales.flatMap((locale) => REFERENCE_SLUGS.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: ReferencePageProps) {
  const { locale, slug } = await params
  if (!REFERENCE_SLUGS.includes(slug)) return {}
  const { frontmatter } = await getReferenceContent(locale, slug)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : slug
  const description = typeof frontmatter.description === 'string' ? frontmatter.description : undefined
  const siteName = 'DevRev Guide'
  return {
    title: `${title} — ${siteName}`,
    description,
    openGraph: { title, description, siteName, locale: toOgLocale(locale) },
  }
}

export default async function ReferencePage({ params }: ReferencePageProps) {
  const { locale, slug } = await params
  if (!REFERENCE_SLUGS.includes(slug)) notFound()
  const { content } = await getReferenceContent(locale, slug)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}
