import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PERSONA_ORDER, getPersonaMeta, PersonaId } from '@/data/personas'
import { getPersonaStory } from '@/data/persona-stories'
import { getSessionMeta, SESSION_BASE, SessionId } from '@/data/sessions'
import PersonaStorySection from '@/components/persona/PersonaStorySection'
import PersonaSessionList from '@/components/persona/PersonaSessionList'

interface PersonaPageProps {
  params: Promise<{ locale: string; persona: string }>
}

export async function generateStaticParams() {
  const locales = ['ja', 'en']
  return locales.flatMap((locale) =>
    PERSONA_ORDER.map((persona) => ({ locale, persona }))
  )
}

export async function generateMetadata({ params }: PersonaPageProps) {
  const { locale, persona } = await params
  if (!PERSONA_ORDER.includes(persona as PersonaId)) return {}
  const personaMeta = getPersonaMeta(locale)
  const p = personaMeta[persona as PersonaId]
  const isJa = locale === 'ja'
  return {
    title: isJa
      ? `${p.label}向け学習パス - DevRev Guide`
      : `${p.label} Learning Path - DevRev Guide`,
    description: p.description,
  }
}

export default async function PersonaPage({ params }: PersonaPageProps) {
  const { locale, persona } = await params

  if (!PERSONA_ORDER.includes(persona as PersonaId)) {
    notFound()
  }

  const personaId = persona as PersonaId
  const personaMeta = getPersonaMeta(locale)
  const p = personaMeta[personaId]
  const story = getPersonaStory(locale, personaId)
  const sessionMeta = getSessionMeta(locale)
  const isJa = locale === 'ja'

  const coreHours = Math.round(p.totalCoreMinutes / 60 * 2) / 2

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/${locale}`}
          className="text-sm mb-4 inline-flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {isJa ? '全セッション一覧へ' : 'All sessions'}
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{p.icon}</span>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              {isJa ? `${p.label}向け学習パス` : `${p.label} Learning Path`}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              {p.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
              {p.coreSessions.length}
            </span>
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {isJa ? '必修セッション' : 'core sessions'}
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
              {isJa ? `約${coreHours}h` : `~${coreHours}h`}
            </span>
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {isJa ? '学習時間' : 'learning time'}
            </span>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <PersonaStorySection story={story} locale={locale} />

      {/* Learning Path */}
      <section className="mt-12">
        <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          {isJa ? '推奨学習パス' : 'Recommended learning path'}
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          {isJa
            ? 'このストーリーを自分で構築するためのセッション順。必修パスだけで基本が身につきます。'
            : 'Sessions to build this experience yourself. The core path covers the essentials.'}
        </p>

        <PersonaSessionList
          locale={locale}
          coreSessions={p.coreSessions}
          recommendedSessions={p.recommendedSessions}
          sessionMeta={sessionMeta}
        />
      </section>

      {/* CTA */}
      <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link
          href={`/${locale}/${p.coreSessions[0]}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #005A9E, #0070C0)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {isJa ? `${p.coreSessions[0].toUpperCase()} から始める` : `Start with ${p.coreSessions[0].toUpperCase()}`}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  )
}
