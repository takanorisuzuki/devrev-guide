import HeroSection from '@/components/home/HeroSection'
import SessionGrid from '@/components/home/SessionGrid'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isJa = locale === 'ja'
  return {
    title: isJa ? 'DevRev Guide - DevRev公式情報をもとにした学習サイト' : 'DevRev Guide - Learn DevRev from Official Sources',
    description: isJa
      ? 'DevRevを14セッションで体系的に学ぶ学習サイト。公式情報ベースで、Memory・検索・統制の考え方から積み上げる。'
      : 'Learn DevRev in 14 sessions from official sources — foundations through extensions, starting from how memory, search, and controls fit together.',
    openGraph: {
      title: isJa ? 'DevRev Guide - 学習サイト' : 'DevRev Guide - Learning Site',
      description: isJa
        ? '公式情報をもとに、Memoryと権限・根拠の視点からDevRevを学ぶ14セッション'
        : '14-session course from official DevRev sources: memory, permissions, and evidence-minded foundations',
      siteName: 'DevRev Guide',
      locale: locale === 'en' ? 'en_US' : 'ja_JP',
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  return (
    <div>
      <HeroSection locale={locale} />
      <SessionGrid locale={locale} />
    </div>
  )
}
