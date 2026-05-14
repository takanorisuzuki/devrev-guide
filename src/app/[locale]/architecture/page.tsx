import SessionContent from '@/components/session/SessionContent'
import { getArchitectureContent } from '@/lib/content'
import { toOgLocale } from '@/lib/locale'

interface ArchitecturePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ArchitecturePageProps) {
  const { locale } = await params
  const { frontmatter } = await getArchitectureContent(locale)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : 'Architecture'
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

export default async function ArchitecturePage({ params }: ArchitecturePageProps) {
  const { locale } = await params
  const { content } = await getArchitectureContent(locale)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}
