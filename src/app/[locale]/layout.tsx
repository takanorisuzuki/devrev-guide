import Link from 'next/link'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700', '900'], display: 'swap', variable: '--font-noto-sans-jp' })

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const isJa = locale === 'ja'
  return (
    <html lang={locale} className="h-full">
      <body className={`min-h-full ${notoSansJP.className}`} style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex flex-col min-h-screen">
          <Header locale={locale} />
          <div className="flex flex-1">
            {/* Sidebar: hidden on mobile, visible on md+ */}
            <div className="hidden md:block">
              <Sidebar locale={locale} />
            </div>
            {/* 全幅のまま内側だけ max-width（中央寄せ）— ワイド画面で右側だけ真っ白にならない */}
            <main className="flex flex-1 min-w-0 justify-center">
              <div className="w-full max-w-7xl px-6 py-8">{children}</div>
            </main>
          </div>
          <footer className="text-center py-4 text-xs" style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)' }}>
            <Link href={`/${locale}/privacy`} className="underline hover:opacity-80">
              {isJa ? 'プライバシーポリシー' : 'Privacy Policy'}
            </Link>
          </footer>
        </div>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
