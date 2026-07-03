import { notFound } from 'next/navigation'
import SessionContent from '@/components/session/SessionContent'
import { getDocContent } from '@/lib/content'
import { REFERENCE_SLUGS } from '@/data/references'
import { toOgLocale, LOCALES } from '@/lib/locale'

interface ReferencePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) => REFERENCE_SLUGS.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: ReferencePageProps) {
  const { locale, slug } = await params
  if (!REFERENCE_SLUGS.includes(slug)) return {}
  const { frontmatter } = await getDocContent(locale, slug)
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
  const { content } = await getDocContent(locale, slug)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}
