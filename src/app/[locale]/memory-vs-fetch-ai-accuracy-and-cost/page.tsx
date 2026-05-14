import SessionContent from '@/components/session/SessionContent'
import { getMemoryVsFetchAiContent } from '@/lib/content'
import { toOgLocale } from '@/lib/locale'

interface MemoryVsFetchAiPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: MemoryVsFetchAiPageProps) {
  const { locale } = await params
  const { frontmatter } = await getMemoryVsFetchAiContent(locale)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : 'Reference'
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

export default async function MemoryVsFetchAiPage({ params }: MemoryVsFetchAiPageProps) {
  const { locale } = await params
  const { content } = await getMemoryVsFetchAiContent(locale)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}

