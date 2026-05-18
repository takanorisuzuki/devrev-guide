import Link from 'next/link'
import { SessionId, LEVEL_LABEL } from '@/data/sessions'


interface SessionLocalized {
  id: SessionId
  title: string
  subtitle: string
  keyInsight: string
  level: string
  layer: string
  duration: number
}

interface PersonaSessionListProps {
  locale: string
  personaId: string
  coreSessions: SessionId[]
  recommendedSessions: SessionId[]
  sessionMeta: Record<SessionId, SessionLocalized>
}

export default function PersonaSessionList({
  locale,
  personaId,
  coreSessions,
  recommendedSessions,
  sessionMeta,
}: PersonaSessionListProps) {
  const isJa = locale === 'ja'
  const levelLabel = LEVEL_LABEL[locale] ?? LEVEL_LABEL.en

  return (
    <div className="space-y-8">
      {/* Core sessions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(0,112,192,0.12)', color: '#0070C0' }}
          >
            {isJa ? '必修' : 'Core'}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {isJa ? 'この順番で進めると最も効率的' : 'Most efficient in this order'}
          </span>
        </div>
        <div className="space-y-2">
          {coreSessions.map((sessionId, index) => {
            const session = sessionMeta[sessionId]
            return (
              <Link
                key={sessionId}
                href={`/${locale}/${sessionId}?path=${personaId}`}
                className="group flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0"
                  style={{ backgroundColor: 'rgba(0,112,192,0.12)', color: '#0070C0' }}
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {sessionId}
                    </span>
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
                      {session.duration}{isJa ? '分' : 'min'}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-0.5 truncate" style={{ color: 'var(--color-text)' }}>
                    {session.title}
                  </p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recommended sessions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(124,58,237,0.10)', color: '#7C3AED' }}
          >
            {isJa ? '発展' : 'Recommended'}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {isJa ? '必修を終えた後の次のステップ' : 'Next steps after completing the core'}
          </span>
        </div>
        <div className="space-y-2">
          {recommendedSessions.map((sessionId) => {
            const session = sessionMeta[sessionId]
            return (
              <Link
                key={sessionId}
                href={`/${locale}/${sessionId}?path=${personaId}`}
                className="group flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px dashed var(--color-border)',
                }}
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-xs shrink-0"
                  style={{ backgroundColor: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}
                >
                  +
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {sessionId}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {session.duration}{isJa ? '分' : 'min'}
                    </span>
                  </div>
                  <p className="text-sm mt-0.5 truncate" style={{ color: 'var(--color-text)' }}>
                    {session.title}
                  </p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
