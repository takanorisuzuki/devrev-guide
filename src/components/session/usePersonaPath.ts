'use client'

import { useSearchParams } from 'next/navigation'
import { SessionId, getSessionMeta, SessionLocalized } from '@/data/sessions'
import { PersonaId, PersonaLocalized, getPersonaMeta, getPersonaSessionOrder, PERSONA_ORDER } from '@/data/personas'

export type PersonaPathState = {
  personaId: PersonaId
  persona: PersonaLocalized
  sessionMeta: Record<SessionId, SessionLocalized>
  currentIndex: number
  total: number
  prevId: SessionId | null
  nextId: SessionId | null
  isCore: boolean
}

// `?path=<persona>` 付きでセッションを閲覧中のときのみ状態を返す
export function usePersonaPath(locale: string, currentSession: string): PersonaPathState | null {
  const searchParams = useSearchParams()
  const pathParam = searchParams.get('path') as PersonaId | null

  if (!pathParam || !PERSONA_ORDER.includes(pathParam)) return null

  const personaId = pathParam
  const persona = getPersonaMeta(locale)[personaId]
  const personaSessions = getPersonaSessionOrder(personaId)
  const currentIndex = personaSessions.indexOf(currentSession as SessionId)

  if (currentIndex === -1) return null

  return {
    personaId,
    persona,
    sessionMeta: getSessionMeta(locale),
    currentIndex,
    total: personaSessions.length,
    prevId: currentIndex > 0 ? personaSessions[currentIndex - 1] : null,
    nextId: currentIndex < personaSessions.length - 1 ? personaSessions[currentIndex + 1] : null,
    isCore: persona.coreSessions.includes(currentSession as SessionId),
  }
}
