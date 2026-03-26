import Link from 'next/link'
import { SESSION_ORDER, getSessionMeta, SessionId } from '@/data/sessions'

interface PrevNextNavProps {
  locale: string
  currentSession: string
}

const NAV_LABEL: Record<string, { prev: string; next: string }> = {
  en: { prev: '← Previous', next: 'Next →' },
  ja: { prev: '← 前のセッション', next: '次のセッション →' },
}

export default function PrevNextNav({ locale, currentSession }: PrevNextNavProps) {
  const currentIndex = SESSION_ORDER.indexOf(currentSession as SessionId)
  const prevId = currentIndex > 0 ? SESSION_ORDER[currentIndex - 1] : null
  const nextId = currentIndex < SESSION_ORDER.length - 1 ? SESSION_ORDER[currentIndex + 1] : null
  const sessionMeta = getSessionMeta(locale)
  const label = NAV_LABEL[locale] ?? NAV_LABEL.en

  return (
    <div
      className="flex justify-between gap-4 mt-12 pt-6"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="flex-1">
        {prevId && (
          <Link
            href={`/${locale}/${prevId}`}
            className="group flex flex-col gap-1 p-4 rounded-xl transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {label.prev}
            </span>
            <span
              className="text-sm font-semibold leading-snug"
              style={{ color: 'var(--color-text)' }}
            >
              <span
                className="font-mono text-xs mr-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {prevId}
              </span>
              {sessionMeta[prevId].title}
            </span>
          </Link>
        )}
      </div>
      <div className="flex-1">
        {nextId && (
          <Link
            href={`/${locale}/${nextId}`}
            className="group flex flex-col gap-1 p-4 rounded-xl transition-colors text-right"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {label.next}
            </span>
            <span
              className="text-sm font-semibold leading-snug"
              style={{ color: 'var(--color-text)' }}
            >
              {sessionMeta[nextId].title}
              <span
                className="font-mono text-xs ml-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {nextId}
              </span>
            </span>
          </Link>
        )}
      </div>
    </div>
  )
}
