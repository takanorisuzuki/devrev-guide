'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SessionId, getSessionMeta } from '@/data/sessions'
import { PersonaId, getPersonaMeta, PERSONA_ORDER } from '@/data/personas'

interface PersonaPathNavProps {
  locale: string
  currentSession: string
}

// Get the ordered session list for a persona (core then recommended)
function getPersonaSessionOrder(personaId: PersonaId): SessionId[] {
  const meta = getPersonaMeta('en')
  const p = meta[personaId]
  return [...p.coreSessions, ...p.recommendedSessions]
}

export default function PersonaPathNav({ locale, currentSession }: PersonaPathNavProps) {
  const searchParams = useSearchParams()
  const pathParam = searchParams.get('path') as PersonaId | null

  // Only show if user is following a persona path
  if (!pathParam || !PERSONA_ORDER.includes(pathParam)) return null

  const personaId = pathParam
  const personaMeta = getPersonaMeta(locale)
  const p = personaMeta[personaId]
  const sessionMeta = getSessionMeta(locale)
  const personaSessions = getPersonaSessionOrder(personaId)
  const currentIndex = personaSessions.indexOf(currentSession as SessionId)
  const isJa = locale === 'ja'

  if (currentIndex === -1) return null

  const prevId = currentIndex > 0 ? personaSessions[currentIndex - 1] : null
  const nextId = currentIndex < personaSessions.length - 1 ? personaSessions[currentIndex + 1] : null
  const isCore = p.coreSessions.includes(currentSession as SessionId)
  const progress = currentIndex + 1
  const total = personaSessions.length

  return (
    <div
      className="mb-6 rounded-xl p-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
    >
      {/* Path indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">{p.icon}</span>
          <Link
            href={`/${locale}/path/${personaId}`}
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {isJa ? `${p.label}パス` : `${p.label} path`}
          </Link>
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={
              isCore
                ? { backgroundColor: 'rgba(0,112,192,0.10)', color: '#0070C0' }
                : { backgroundColor: 'rgba(124,58,237,0.10)', color: '#7C3AED' }
            }
          >
            {isCore
              ? (isJa ? '必修' : 'Core')
              : (isJa ? '発展' : 'Recommended')}
          </span>
        </div>
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {progress} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${(progress / total) * 100}%`,
            backgroundColor: '#0070C0',
          }}
        />
      </div>

      {/* Prev / Next in persona order */}
      <div className="flex justify-between gap-3">
        <div className="flex-1">
          {prevId && (
            <Link
              href={`/${locale}/${prevId}?path=${personaId}`}
              className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="truncate">
                <span className="font-mono">{prevId}</span> {sessionMeta[prevId].title}
              </span>
            </Link>
          )}
        </div>
        <div className="flex-1 text-right">
          {nextId ? (
            <Link
              href={`/${locale}/${nextId}?path=${personaId}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: '#0070C0' }}
            >
              <span className="truncate">
                {isJa ? '次：' : 'Next: '}<span className="font-mono">{nextId}</span> {sessionMeta[nextId].title}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          ) : (
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {isJa ? '🎉 パス完了！' : '🎉 Path complete!'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
