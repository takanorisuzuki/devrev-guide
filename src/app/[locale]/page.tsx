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
      ? 'DevRevの基礎から開発者向け拡張まで、13セッションで体系的に学ぶ。公式情報をもとにした実践的な学習コース。'
      : 'Learn DevRev systematically in 13 sessions, from foundations to developer extensions. A practical learning course based on official sources.',
    openGraph: {
      title: isJa ? 'DevRev Guide - 学習サイト' : 'DevRev Guide - Learning Site',
      description: isJa ? 'DevRev公式情報をもとにした13セッション学習コース' : '13-session learning course based on official DevRev sources',
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
