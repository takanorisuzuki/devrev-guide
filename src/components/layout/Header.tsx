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
  const togglePath = pathname.replace(/^\/(en|ja)/, `/${toggleLocale}`)

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
          </div>

          {/* Language switcher */}
          <div
            className="flex items-center text-xs font-medium border rounded-full overflow-hidden"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <Link
              href={locale === 'en' ? pathname : togglePath}
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
              href={locale === 'ja' ? pathname : togglePath}
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

          <a
            href="https://github.com/takanorisuzuki/devrev-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}
