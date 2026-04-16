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
      ? '公式情報ベースでDevRevを14セッションで学ぶ。既存システムを保ちながらMemory・検索・統制を積み上げる視点と、Claude単体で使うよりも、DevRevと組み合わせることで、より速く正確で低コストな活用方法を扱う。'
      : '14-session DevRev course from official sources: layer memory, search, and controls while preserving existing systems — and learn how combining Claude with DevRev delivers faster, more accurate, lower-cost results compared to using it alone.',
    openGraph: {
      title: isJa ? 'DevRev Guide - 学習サイト' : 'DevRev Guide - Learning Site',
      description: isJa
        ? '公式情報をもとにDevRevを14セッションで学ぶ。Memory・権限・根拠の基盤に加え、Claude単体で使うよりも、DevRevと組み合わせることで、より速く正確で低コストな業務活用方法も扱う。'
        : 'Official-source DevRev learning: foundations through extensions, memory and permissions — plus how combining Claude with DevRev delivers faster, more accurate, lower-cost results compared to using it alone.',
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
