import type { Metadata } from 'next'

interface TimelinePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: TimelinePageProps): Promise<Metadata> {
  const { locale } = await params
  const isJa = locale === 'ja'
  return {
    title: isJa ? 'タイムライン — DevRev Guide' : 'Timeline — DevRev Guide',
    description: isJa
      ? 'タイムライン表示などのコンテンツを準備中です。'
      : 'Timeline view and related content — coming soon.',
  }
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { locale } = await params
  const isJa = locale === 'ja'
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        {isJa ? 'タイムライン' : 'Timeline'}
      </h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {isJa ? 'コンテンツは追って追加予定です。' : 'Content coming soon.'}
      </p>
    </div>
  )
}
