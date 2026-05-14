import SessionContent from '@/components/session/SessionContent'
import { getArticleAccessControlContent } from '@/lib/content'
import { toOgLocale } from '@/lib/locale'

interface ArticleAccessControlPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ArticleAccessControlPageProps) {
  const { locale } = await params
  const { frontmatter } = await getArticleAccessControlContent(locale)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : 'Article Access Control'
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

export default async function ArticleAccessControlPage({ params }: ArticleAccessControlPageProps) {
  const { locale } = await params
  const { content } = await getArticleAccessControlContent(locale)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}
