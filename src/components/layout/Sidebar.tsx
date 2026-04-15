'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLayers, getSessionMeta, SessionId } from '@/data/sessions'

interface SidebarProps {
  locale: string
}

const LAYER_COLOR: Record<string, string> = {
  foundations: '#0070C0',
  platform: '#0891B2',
  developer: '#7C3AED',
}

const LAYER_BG: Record<string, string> = {
  foundations: 'rgba(0,112,192,0.08)',
  platform: 'rgba(8,145,178,0.08)',
  developer: 'rgba(124,58,237,0.08)',
}

const LEVEL_LABEL: Record<string, Record<string, string>> = {
  en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  ja: { beginner: '初級', intermediate: '中級', advanced: '上級' },
}

export default function Sidebar({ locale }: SidebarProps) {
  const pathname = usePathname()
  const currentSession = pathname?.split('/')[2] ?? null
  const layers = getLayers(locale)
  const sessionMeta = getSessionMeta(locale)
  const levelLabel = LEVEL_LABEL[locale] ?? LEVEL_LABEL.en

  return (
    <aside
      className="w-60 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      <nav className="p-3 space-y-5">
        {layers.map((layer) => {
          const color = LAYER_COLOR[layer.id]
          const bg = LAYER_BG[layer.id]
          return (
            <div key={layer.id}>
              <div
                className="flex items-center gap-1.5 px-2 mb-1.5"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <h3
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {layer.label}
                </h3>
              </div>
              <ul className="space-y-0.5">
                {layer.sessions.map((sessionId) => {
                  const session = sessionMeta[sessionId as SessionId]
                  const isActive = currentSession === sessionId
                  return (
                    <li key={sessionId}>
                      <Link
                        href={`/${locale}/${sessionId}`}
                        className="flex items-start gap-2 px-2 py-1.5 rounded-md text-sm transition-colors"
                        style={
                          isActive
                            ? { backgroundColor: bg, color: color, fontWeight: 600 }
                            : { color: 'var(--color-text-secondary)' }
                        }
                      >
                        <span
                          className="font-mono text-xs shrink-0 mt-0.5 w-7"
                          style={{ color: isActive ? color : 'var(--color-text-secondary)', opacity: isActive ? 1 : 0.6 }}
                        >
                          {sessionId}
                        </span>
                        <span className="flex-1 leading-snug">{session.title}</span>
                        <span
                          className="shrink-0 text-xs px-1.5 py-0.5 rounded-full mt-0.5"
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
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        <div
          className="pt-4 mt-1 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-1.5 px-2 mb-1.5">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {locale === 'ja' ? 'リファレンス' : 'Reference'}
            </span>
          </div>
          <ul className="space-y-0.5">
            <li>
              <Link
                href={`/${locale}/architecture`}
                className="flex items-start gap-2 px-2 py-1.5 rounded-md text-sm transition-colors"
                style={
                  currentSession === 'architecture'
                    ? {
                        backgroundColor: 'rgba(0,112,192,0.08)',
                        color: '#0070C0',
                        fontWeight: 600,
                      }
                    : { color: 'var(--color-text-secondary)' }
                }
              >
                <span className="font-mono text-xs shrink-0 mt-0.5 w-7 opacity-60">ref</span>
                <span className="flex-1 leading-snug">
                  {locale === 'ja' ? 'オブジェクト構造' : 'Object model'}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
