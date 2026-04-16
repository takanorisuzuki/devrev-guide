import { notFound } from 'next/navigation'
import { getSessionContent, getSessionIds } from '@/lib/content'
import { getSessionMeta, SessionId } from '@/data/sessions'
import SessionContent from '@/components/session/SessionContent'
import PrevNextNav from '@/components/session/PrevNextNav'
import SessionCompleteTracker from '@/components/session/SessionCompleteTracker'

interface SessionPageProps {
  params: Promise<{ locale: string; session: string }>
}

const LEVEL_LABEL: Record<string, Record<string, string>> = {
  ja: {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級',
  },
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
}

const LAYER_LABEL: Record<string, Record<string, string>> = {
  ja: {
    foundations: 'DevRev基礎',
    platform: 'プラットフォーム活用',
    developer: '開発者・拡張',
  },
  en: {
    foundations: 'DevRev Foundations',
    platform: 'Platform in Action',
    developer: 'Extend & Automate',
  },
}

const LAYER_COLOR: Record<string, string> = {
  foundations: '#0070C0',
  platform: '#0891B2',
  developer: '#7C3AED',
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
      locale: locale === 'en' ? 'en_US' : 'ja_JP',
    },
  }
}

export async function generateStaticParams() {
  const sessionIds = getSessionIds()
  const locales = ['ja', 'en']
  return locales.flatMap((locale) =>
    sessionIds.map((id) => ({
      locale,
      session: id,
    }))
  )
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { locale, session } = await params
  const validIds = getSessionIds()

  if (!validIds.includes(session)) {
    notFound()
  }

  const sessionMeta = getSessionMeta(locale)
  const meta = sessionMeta[session as SessionId]
  const { content } = await getSessionContent(locale, session)
  const layerColor = LAYER_COLOR[meta.layer]
  const lang = locale === 'en' ? 'en' : 'ja'

  return (
    <article className="w-full max-w-4xl">
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
            {LAYER_LABEL[lang][meta.layer]}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={
              meta.level === 'beginner'
                ? { backgroundColor: 'var(--color-level-beginner-bg)', color: 'var(--color-level-beginner)' }
                : meta.level === 'advanced'
                ? { backgroundColor: 'var(--color-level-advanced-bg)', color: 'var(--color-level-advanced)' }
                : { backgroundColor: 'var(--color-level-intermediate-bg)', color: 'var(--color-level-intermediate)' }
            }
          >
            {LEVEL_LABEL[lang][meta.level]}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {meta.duration}{lang === 'en' ? ' min' : '分'}
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
              Key Insight
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {meta.keyInsight}
            </p>
          </div>
        </div>
      </div>

      <SessionContent content={content} />
      <PrevNextNav locale={locale} currentSession={session} />
      <SessionCompleteTracker sessionId={session} locale={locale} />
    </article>
  )
}
