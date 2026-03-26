import Link from 'next/link'

const HERO_TEXT = {
  en: {
    badge: 'DevRev Learning Guide',
    heading: <>One platform for Dev, Rev, and AI.<br />Learn DevRev from the ground up.</>,
    description: 'A 13-session practical course to master DevRev. From foundations and platform usage to developer extensions, learn systematically based on official sources.',
    cta: 'Start with Session 1',
    stats: [
      { label: 'Sessions', value: '13' },
      { label: 'Learning time', value: '~11h' },
      { label: 'Official sources', value: 'Based on' },
    ],
  },
  ja: {
    badge: 'DevRev学習ガイド',
    heading: <>Dev、Rev、AIを1つに。<br />DevRevを基礎から学ぶ。</>,
    description: 'DevRevの基礎からプラットフォーム活用、開発者向け拡張まで、13セッションで体系的に学ぶ実践コース。公式情報をもとに構成。',
    cta: 'セッション1から始める',
    stats: [
      { label: 'セッション', value: '13' },
      { label: '学習時間', value: '約11h' },
      { label: '公式情報ベース', value: 'DevRev' },
    ],
  },
}

export default function HeroSection({ locale }: { locale: string }) {
  const t = HERO_TEXT[locale as keyof typeof HERO_TEXT] ?? HERO_TEXT.en

  return (
    <div className="relative rounded-2xl overflow-hidden mb-10 px-8 py-12"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0070C0 60%, #0891B2 100%)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #3B9EFF 0%, transparent 50%), radial-gradient(circle at 70% 20%, #0891B2 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(59,158,255,0.25)', color: '#BAE6FD' }}
          >
            {t.badge}
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight"
          style={{ color: '#FFFFFF' }}
        >
          {t.heading}
        </h1>

        <p className="text-base mb-8" style={{ color: '#BAE6FD' }}>
          {t.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <span className="text-xl font-bold" style={{ color: '#FFFFFF' }}>{stat.value}</span>
              <span className="text-sm" style={{ color: '#94A3B8' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/s01`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #005A9E, #0070C0)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {t.cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
