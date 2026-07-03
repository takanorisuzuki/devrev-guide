import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getDocContent, getSessionIds } from '@/lib/content'
import { toOgLocale, LOCALES } from '@/lib/locale'
import { getSessionMeta, getLayers, SessionId, LAYER_COLOR } from '@/data/sessions'
import SessionContent from '@/components/session/SessionContent'
import PrevNextNav from '@/components/session/PrevNextNav'
import PersonaPathNav from '@/components/session/PersonaPathNav'
import PersonaPathBottom from '@/components/session/PersonaPathBottom'
import SessionCompleteTracker from '@/components/session/SessionCompleteTracker'
import LevelBadge from '@/components/shared/LevelBadge'

interface SessionPageProps {
  params: Promise<{ locale: string; session: string }>
  searchParams: Promise<{ path?: string }>
}

export async function generateMetadata({ params }: SessionPageProps) {
  const { locale, session } = await params
  const sessionMeta = getSessionMeta(locale)
  const meta = sessionMeta[session as SessionId]
  if (!meta) return {}
  const siteName = 'DevRev Guide'
  const descriptionPlain = meta.keyInsight.replace(/\s*\n\s*/g, ' ').trim()
  return {
    title: `${meta.title} — ${siteName}`,
    description: descriptionPlain,
    openGraph: {
      title: meta.title,
      description: descriptionPlain,
      siteName,
      locale: toOgLocale(locale),
    },
  }
}

export async function generateStaticParams() {
  const sessionIds = getSessionIds()
  return LOCALES.flatMap((locale) =>
    sessionIds.map((id) => ({
      locale,
      session: id,
    }))
  )
}

export default async function SessionPage({ params, searchParams }: SessionPageProps) {
  const { locale, session } = await params
  const { path: personaPath } = await searchParams
  const validIds = getSessionIds()

  if (!validIds.includes(session)) {
    notFound()
  }

  const sessionMeta = getSessionMeta(locale)
  const meta = sessionMeta[session as SessionId]
  const { content } = await getDocContent(locale, session)
  const layerColor = LAYER_COLOR[meta.layer]
  const layerLabel = getLayers(locale).find((l) => l.id === meta.layer)?.label
  const isJa = locale === 'ja'

  return (
    <article className="w-full max-w-4xl">
      <Suspense fallback={null}>
        <PersonaPathNav locale={locale} currentSession={session} />
      </Suspense>
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: `${layerColor}18`, color: layerColor }}
          >
            {session}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
          >
            {layerLabel}
          </span>
          <LevelBadge level={meta.level} locale={locale} />
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {meta.duration}{isJa ? '分' : ' min'}
          </span>
        </div>

        <div
          className="relative p-4 rounded-xl overflow-hidden"
          style={{
            backgroundColor: `${layerColor}0d`,
            border: `1px solid ${layerColor}30`,
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
            style={{ backgroundColor: layerColor }}
          />
          <div className="pl-3">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: layerColor }}>
              {isJa ? 'このセッションで実現できること' : 'What you will be able to do'}
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {meta.keyInsight}
            </p>
          </div>
        </div>
      </div>

      <SessionContent content={content} />
      {!personaPath && (
        <PrevNextNav locale={locale} currentSession={session} />
      )}
      <Suspense fallback={null}>
        <PersonaPathBottom locale={locale} currentSession={session} />
      </Suspense>
      <SessionCompleteTracker sessionId={session} locale={locale} />
    </article>
  )
}
