import SessionContent from '@/components/session/SessionContent'
import { getAdaasReferenceContent } from '@/lib/content'
import { toOgLocale } from '@/lib/locale'

interface AdaasReferencePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AdaasReferencePageProps) {
  const { locale } = await params
  const { frontmatter } = await getAdaasReferenceContent(locale)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : 'ADaaS Reference'
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

export default async function AdaasReferencePage({ params }: AdaasReferencePageProps) {
  const { locale } = await params
  const { content } = await getAdaasReferenceContent(locale)
  return (
    <article className="w-full max-w-full">
      <SessionContent content={content} />
    </article>
  )
}
