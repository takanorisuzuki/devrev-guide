'use client'

import Link from 'next/link'
import { getLayers, getSessionMeta, SessionId } from '@/data/sessions'

interface SessionGridProps {
  locale: string
}

const LEVEL_LABEL: Record<string, Record<string, string>> = {
  en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  ja: { beginner: '初級', intermediate: '中級', advanced: '上級' },
}

const SESSIONS_SUFFIX: Record<string, string> = {
  en: ' sessions',
  ja: 'セッション',
}

const MIN_SUFFIX: Record<string, string> = {
  en: 'min',
  ja: '分',
}

const LAYER_CONFIG: Record<string, { color: string; bg: string; border: string; hoverBorder: string }> = {
  foundations: {
    color: '#0070C0',
    bg: 'var(--color-bg-secondary)',
    border: 'rgba(0,112,192,0.30)',
    hoverBorder: 'rgba(0,112,192,0.65)',
  },
  platform: {
    color: '#0891B2',
    bg: 'var(--color-bg-secondary)',
    border: 'rgba(8,145,178,0.30)',
    hoverBorder: 'rgba(8,145,178,0.65)',
  },
  developer: {
    color: '#7C3AED',
    bg: 'var(--color-bg-secondary)',
    border: 'rgba(124,58,237,0.30)',
    hoverBorder: 'rgba(124,58,237,0.65)',
  },
}

export default function SessionGrid({ locale }: SessionGridProps) {
  const layers = getLayers(locale)
  const sessionMeta = getSessionMeta(locale)
  const levelLabel = LEVEL_LABEL[locale] ?? LEVEL_LABEL.en
  const sessionsSuffix = SESSIONS_SUFFIX[locale] ?? SESSIONS_SUFFIX.en
  const minSuffix = MIN_SUFFIX[locale] ?? MIN_SUFFIX.en

  return (
    <div className="space-y-10">
      {layers.map((layer) => {
        const config = LAYER_CONFIG[layer.id]
        return (
          <section key={layer.id}>
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid var(--color-border)` }}>
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: config.color }}
              />
              <h2
                className="text-lg font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {layer.label}
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${config.color}18`, color: config.color }}
              >
                {layer.sessions.length}{sessionsSuffix}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {layer.sessions.map((sessionId) => {
                const session = sessionMeta[sessionId as SessionId]
                return (
                  <Link
                    key={sessionId}
                    href={`/${locale}/${sessionId}`}
                    className="group block p-4 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: config.bg,
                      border: `1px solid ${config.border}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = config.hoverBorder
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${config.color}18`
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = config.border
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${config.color}18`, color: config.color }}
                      >
                        {sessionId}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={
                            session.level === 'beginner'
                              ? { backgroundColor: 'var(--color-level-beginner-bg)', color: 'var(--color-level-beginner)' }
                              : session.level === 'advanced'
                              ? { backgroundColor: 'var(--color-level-advanced-bg)', color: 'var(--color-level-advanced)' }
                              : { backgroundColor: 'var(--color-level-intermediate-bg)', color: 'var(--color-level-intermediate)' }
                          }
                        >
                          {levelLabel[session.level]}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {session.duration}{minSuffix}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-semibold text-sm mb-1 leading-snug"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {session.title}
                    </h3>
                    <p
                      className="text-xs mb-2.5"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {session.subtitle}
                    </p>

                    <div
                      className="flex items-start gap-1.5 p-2 rounded-lg"
                      style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={config.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <p className="whitespace-pre-line text-xs leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                        {session.keyInsight}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
