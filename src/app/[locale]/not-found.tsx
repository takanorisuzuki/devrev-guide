'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname?.split('/').filter(Boolean)[0] === 'ja' ? 'ja' : 'en'
  const label = locale === 'ja'
    ? { heading: 'ページが見つかりません', desc: '指定されたセッションまたはページは存在しません。', back: 'コース一覧に戻る' }
    : { heading: 'Page not found', desc: 'The session or page you are looking for does not exist.', back: 'Back to course' }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <p className="font-mono text-4xl font-bold" style={{ color: 'var(--color-text-secondary)' }}>404</p>
      <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
        {label.heading}
      </h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {label.desc}
      </p>
      <Link
        href={`/${locale}`}
        className="text-sm px-4 py-2 rounded-lg transition-colors"
        style={{ backgroundColor: '#3B82F618', color: '#3B82F6', border: '1px solid #3B82F630' }}
      >
        {label.back}
      </Link>
    </div>
  )
}
