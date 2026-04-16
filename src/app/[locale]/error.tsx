'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Error({ reset }: { reset: () => void }) {
  const pathname = usePathname()
  const isJa = pathname?.split('/').filter(Boolean)[0] === 'ja'
  const locale = isJa ? 'ja' : 'en'
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-5xl font-bold mb-4" style={{ color: 'var(--color-text-secondary)' }}>Error</p>
      <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        {isJa ? 'ページの読み込みに失敗しました。' : 'Something went wrong.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
        >
          {isJa ? '再試行' : 'Try again'}
        </button>
        <Link
          href={`/${locale}`}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}
        >
          {isJa ? 'ホームへ' : 'Go home'}
        </Link>
      </div>
    </div>
  )
}
