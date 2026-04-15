import type { Metadata } from 'next'

interface ComparePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { locale } = await params
  const isJa = locale === 'ja'
  return {
    title: isJa ? '比較 — DevRev Guide' : 'Compare — DevRev Guide',
    description: isJa
      ? 'ツール比較などのコンテンツを準備中です。'
      : 'Tool comparison and related content — coming soon.',
  }
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale } = await params
  const isJa = locale === 'ja'
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        {isJa ? '比較' : 'Compare'}
      </h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {isJa ? 'コンテンツは追って追加予定です。' : 'Content coming soon.'}
      </p>
    </div>
  )
}
