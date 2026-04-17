'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackLanguageSwitch } from '@/lib/analytics'

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()

  // /en/... -> /ja/... or /ja/... -> /en/...
  const toggleLocale = locale === 'en' ? 'ja' : 'en'
  const safePathname = typeof pathname === 'string' && pathname.length > 0 ? pathname : `/${locale}`
  const togglePath = safePathname.replace(/^\/(en|ja)/, `/${toggleLocale}`)

  return (
    <header
      className="sticky top-0 z-50 border-b px-6 py-3"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #0070C0, #0891B2)' }}
          >
            DR
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            DevRev Guide
          </span>
          <span
            className="hidden sm:inline text-xs px-2 py-0.5 rounded-full border"
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            {locale === 'ja' ? 'DevRev公式情報をもとにした学習サイト' : 'Learn DevRev from Official Sources'}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Mobile: sessions list + reference (sidebar is hidden on mobile) */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href={`/${locale}`}
              className="text-xs px-2 py-1 rounded-md transition-colors"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
            >
              {locale === 'ja' ? 'セッション一覧' : 'All sessions'}
            </Link>
            <Link
              href={`/${locale}/architecture`}
              className="text-xs px-2 py-1 rounded-md transition-colors"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
            >
              {locale === 'ja' ? 'オブジェクト構造' : 'Object model'}
            </Link>
            <Link
              href={`/${locale}/perspectives`}
              className="text-xs px-2 py-1 rounded-md transition-colors"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
            >
              {locale === 'ja' ? '視点' : 'Perspectives'}
            </Link>
            <Link
              href={`/${locale}/memory-vs-fetch-ai-accuracy-and-cost`}
              className="text-xs px-2 py-1 rounded-md transition-colors"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
            >
              {locale === 'ja' ? 'Memoryとコスト' : 'Memory & cost'}
            </Link>
          </div>

          {/* Language switcher */}
          <div
            className="flex items-center text-xs font-medium border rounded-full overflow-hidden"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <Link
              href={locale === 'en' ? safePathname : togglePath}
              className="px-3 py-1 transition-colors"
              style={{
                backgroundColor: locale === 'en' ? 'var(--color-text)' : 'var(--color-bg)',
                color: locale === 'en' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
              }}
              onClick={() => { if (locale !== 'en') trackLanguageSwitch(locale, 'en') }}
            >
              EN
            </Link>
            <Link
              href={locale === 'ja' ? safePathname : togglePath}
              className="px-3 py-1 transition-colors"
              style={{
                backgroundColor: locale === 'ja' ? 'var(--color-text)' : 'var(--color-bg)',
                color: locale === 'ja' ? 'var(--color-bg)' : 'var(--color-text-secondary)',
              }}
              onClick={() => { if (locale !== 'ja') trackLanguageSwitch(locale, 'ja') }}
            >
              JA
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
