'use client'

import Link from 'next/link'
import { PERSONA_ORDER, getPersonaMeta, PersonaId } from '@/data/personas'

interface PersonaPickerProps {
  locale: string
}

const PERSONA_COLORS: Record<PersonaId, { border: string; hoverBorder: string; bg: string }> = {
  support: {
    border: 'rgba(239,68,68,0.20)',
    hoverBorder: 'rgba(239,68,68,0.50)',
    bg: 'rgba(239,68,68,0.04)',
  },
  sales: {
    border: 'rgba(245,158,11,0.20)',
    hoverBorder: 'rgba(245,158,11,0.50)',
    bg: 'rgba(245,158,11,0.04)',
  },
  developer: {
    border: 'rgba(0,112,192,0.20)',
    hoverBorder: 'rgba(0,112,192,0.50)',
    bg: 'rgba(0,112,192,0.04)',
  },
  executive: {
    border: 'rgba(124,58,237,0.20)',
    hoverBorder: 'rgba(124,58,237,0.50)',
    bg: 'rgba(124,58,237,0.04)',
  },
}

export default function PersonaPicker({ locale }: PersonaPickerProps) {
  const personaMeta = getPersonaMeta(locale)
  const isJa = locale === 'ja'

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
          {isJa ? 'あなたの役割に近いのは？' : "What's your role?"}
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0,112,192,0.10)', color: '#0070C0' }}>
          {isJa ? 'おすすめパス' : 'Guided path'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PERSONA_ORDER.map((personaId) => {
          const p = personaMeta[personaId]
          const colors = PERSONA_COLORS[personaId]
          const coreHours = Math.round(p.totalCoreMinutes / 60 * 2) / 2

          return (
            <Link
              key={personaId}
              href={`/${locale}/path/${personaId}`}
              className="group block p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = colors.hoverBorder
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = colors.border
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{p.icon}</span>
                <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                  {p.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {p.description}
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>{p.coreSessions.length}{isJa ? 'セッション' : ' sessions'}</span>
                <span>·</span>
                <span>{isJa ? `約${coreHours}h` : `~${coreHours}h`}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <p className="text-xs mt-3" style={{ color: 'var(--color-text-secondary)' }}>
        {isJa
          ? '※ 役割を選ばず全14セッションを順番に学ぶこともできます（下記一覧）'
          : '※ You can also follow all 14 sessions in order (listed below)'}
      </p>
    </section>
  )
}
