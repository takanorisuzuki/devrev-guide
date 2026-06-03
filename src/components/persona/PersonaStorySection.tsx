'use client'

import { useState } from 'react'
import { PersonaStory } from '@/data/persona-stories'

interface PersonaStorySectionProps {
  story: PersonaStory
  locale: string
}

type StoryPhase = 'before' | 'turning' | 'after'

export default function PersonaStorySection({ story, locale }: PersonaStorySectionProps) {
  const [activePhase, setActivePhase] = useState<StoryPhase>('before')
  const isJa = locale === 'ja'

  const phases: { id: StoryPhase; label: string; color: string; bgColor: string }[] = [
    {
      id: 'before',
      label: isJa ? 'Before — 今の1日' : 'Before — A typical day',
      color: '#EF4444',
      bgColor: 'rgba(239,68,68,0.08)',
    },
    {
      id: 'turning',
      label: isJa ? '転換点 — DevRevで変わる' : 'Turning point — with DevRev',
      color: '#0070C0',
      bgColor: 'rgba(0,112,192,0.08)',
    },
    {
      id: 'after',
      label: isJa ? 'After — 変わった後' : 'After — The new normal',
      color: '#10B981',
      bgColor: 'rgba(16,185,129,0.08)',
    },
  ]

  const currentPhase = phases.find((p) => p.id === activePhase)!
  const content = story[activePhase]

  return (
    <section>
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        {isJa ? 'DevRevで変わる1日' : 'How your day changes with DevRev'}
      </h2>

      {/* Phase tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={
              activePhase === phase.id
                ? { backgroundColor: phase.bgColor, color: phase.color, border: `1px solid ${phase.color}30` }
                : { color: 'var(--color-text-secondary)', border: '1px solid transparent' }
            }
          >
            {phase.label}
          </button>
        ))}
      </div>

      {/* Story content */}
      <div
        className="rounded-xl p-5 transition-all"
        style={{ backgroundColor: currentPhase.bgColor, border: `1px solid ${currentPhase.color}20` }}
      >
        <div
          className="w-2 h-2 rounded-full mb-3"
          style={{ backgroundColor: currentPhase.color }}
        />
        <div
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: 'var(--color-text)' }}
        >
          {content}
        </div>
      </div>
    </section>
  )
}
