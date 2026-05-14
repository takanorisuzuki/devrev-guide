import HeroSection from '@/components/home/HeroSection'
import SessionGrid from '@/components/home/SessionGrid'
import { toOgLocale } from '@/lib/locale'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isJa = locale === 'ja'
  return {
    title: isJa ? 'DevRev Guide - DevRev公式情報をもとにした学習サイト' : 'DevRev Guide - Learn DevRev from Official Sources',
    description: isJa
      ? '公式情報ベースでDevRevを14セッションで学ぶ。既存システムを保ちながらMemory・検索・統制を積み上げる視点と、Claude等LLM単体で使うよりも、DevRevと組み合わせることで、より速く正確で低コストな活用方法を扱う。'
      : 'Learn DevRev in 14 sessions from official sources. Compared to using LLMs (e.g. Claude) alone, combining them with DevRev delivers faster, more accurate, lower-cost results.',
    openGraph: {
      title: isJa ? 'DevRev Guide - 学習サイト' : 'DevRev Guide - Learning Site',
      description: isJa
        ? '公式情報をもとにDevRevを14セッションで学ぶ。Memory・権限・根拠の基盤に加え、Claude等LLM単体で使うよりも、DevRevと組み合わせることで、より速く正確で低コストな業務活用方法も扱う。'
        : 'Learn DevRev foundations and extensions from official sources. Compared to using LLMs (e.g. Claude) alone, combining them with DevRev delivers faster, more accurate, lower-cost results.',
      siteName: 'DevRev Guide',
      locale: toOgLocale(locale),
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
