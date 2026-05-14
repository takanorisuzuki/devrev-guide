import SessionContent from '@/components/session/SessionContent'
import { getPerspectivesContent } from '@/lib/content'
import { toOgLocale } from '@/lib/locale'

interface PerspectivesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PerspectivesPageProps) {
  const { locale } = await params
  const { frontmatter } = await getPerspectivesContent(locale)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : 'Perspectives'
  const description =
    typeof frontmatter.description === 'string' ? frontmatter.description : undefined
  const siteName = 'DevRev Guide'
  return {
    title: `${title} — ${siteName}`,
    description,
    openGraph: {
      title,
      description,
      siteName,
      locale: toOgLocale(locale),
    },
  }
}

export default async function PerspectivesPage({ params }: PerspectivesPageProps) {
  const { locale } = await params
  const { content } = await getPerspectivesContent(locale)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}

