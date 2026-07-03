'use client'

import Link from 'next/link'
import { usePersonaPath } from './usePersonaPath'

interface PersonaPathBottomProps {
  locale: string
  currentSession: string
}

export default function PersonaPathBottom({ locale, currentSession }: PersonaPathBottomProps) {
  const path = usePersonaPath(locale, currentSession)
  const isJa = locale === 'ja'

  if (!path) return null

  const { personaId, persona: p, sessionMeta, prevId, nextId } = path

  return (
    <div
      className="flex justify-between gap-4 mt-12 pt-6"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="flex-1">
        {prevId && (
          <Link
            href={`/${locale}/${prevId}?path=${personaId}`}
            className="group flex flex-col gap-1 p-4 rounded-xl transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {isJa ? `← ${p.label}パス：前` : `← ${p.label} path: prev`}
            </span>
            <span
              className="text-sm font-semibold leading-snug"
              style={{ color: 'var(--color-text)' }}
            >
              <span className="font-mono text-xs mr-1" style={{ color: 'var(--color-text-secondary)' }}>
                {prevId}
              </span>
              {sessionMeta[prevId].title}
            </span>
          </Link>
        )}
      </div>
      <div className="flex-1">
        {nextId ? (
          <Link
            href={`/${locale}/${nextId}?path=${personaId}`}
            className="group flex flex-col gap-1 p-4 rounded-xl transition-colors text-right"
            style={{ border: '1px solid #0070C0', backgroundColor: 'rgba(0,112,192,0.04)' }}
          >
            <span className="text-xs" style={{ color: '#0070C0' }}>
              {isJa ? `${p.label}パス：次 →` : `${p.label} path: next →`}
            </span>
            <span
              className="text-sm font-semibold leading-snug"
              style={{ color: 'var(--color-text)' }}
            >
              {sessionMeta[nextId].title}
              <span className="font-mono text-xs ml-1" style={{ color: 'var(--color-text-secondary)' }}>
                {nextId}
              </span>
            </span>
          </Link>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl text-center"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <span className="text-lg">🎉</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {isJa ? `${p.label}パス完了！` : `${p.label} path complete!`}
            </span>
            <Link
              href={`/${locale}/path/${personaId}`}
              className="text-xs underline mt-1"
              style={{ color: '#0070C0' }}
            >
              {isJa ? 'パスの概要に戻る' : 'Back to path overview'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
