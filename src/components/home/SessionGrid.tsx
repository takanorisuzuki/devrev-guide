import Link from 'next/link'
import { getLayers, getSessionMeta, LAYER_COLOR } from '@/data/sessions'
import LevelBadge from '@/components/shared/LevelBadge'

interface SessionGridProps {
  locale: string
}

const SESSIONS_SUFFIX: Record<string, string> = {
  en: ' sessions',
  ja: 'セッション',
}

const MIN_SUFFIX: Record<string, string> = {
  en: 'min',
  ja: '分',
}

export default function SessionGrid({ locale }: SessionGridProps) {
  const layers = getLayers(locale)
  const sessionMeta = getSessionMeta(locale)
  const sessionsSuffix = SESSIONS_SUFFIX[locale] ?? SESSIONS_SUFFIX.en
  const minSuffix = MIN_SUFFIX[locale] ?? MIN_SUFFIX.en

  return (
    <div className="space-y-10">
      {layers.map((layer) => {
        const color = LAYER_COLOR[layer.id]
        return (
          <section key={layer.id}>
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid var(--color-border)` }}>
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <h2
                className="text-lg font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {layer.label}
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${color}18`, color: color }}
              >
                {layer.sessions.length}{sessionsSuffix}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {layer.sessions.map((sessionId) => {
                const session = sessionMeta[sessionId]
                return (
                  <Link
                    key={sessionId}
                    href={`/${locale}/${sessionId}`}
                    className="hover-card group block p-4 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      '--card-border': `${color}4d`,
                      '--card-hover-border': `${color}a6`,
                      '--card-hover-shadow': `0 4px 16px ${color}18`,
                    } as React.CSSProperties}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${color}18`, color: color }}
                      >
                        {sessionId}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <LevelBadge level={session.level} locale={locale} />
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
                        stroke={color}
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
