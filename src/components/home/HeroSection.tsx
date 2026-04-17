import Link from 'next/link'
import { SESSION_ORDER, SESSION_BASE } from '@/data/sessions'

const SESSION_COUNT = SESSION_ORDER.length
const TOTAL_MINUTES = SESSION_ORDER.reduce((sum, id) => sum + SESSION_BASE[id].duration, 0)
const TOTAL_HOURS = Math.round(TOTAL_MINUTES / 60 * 2) / 2 // 0.5h単位で四捨五入

const HERO_TEXT = {
  en: {
    badge: 'DevRev Learning Guide',
    heading: <>One platform for Dev, Rev, and AI.<br />Learn DevRev from the ground up.</>,
    description: `A ${SESSION_COUNT}-session course from foundations through platform use and developer extensions. Based on official sources, you learn how to layer memory, search, and controls while keeping existing systems of record — and how combining LLMs (e.g. Claude) with DevRev delivers faster, more accurate, and cost-efficient business results compared to using an LLM alone.`,
    memoryCostLink: 'Details: Memory & cost',
    cta: 'Start with Session 1',
    stats: [
      { label: 'Sessions', value: String(SESSION_COUNT) },
      { label: 'Learning time', value: `~${TOTAL_HOURS}h` },
      { label: 'Official sources', value: 'Based on' },
    ],
  },
  ja: {
    badge: 'DevRev学習ガイド',
    heading: <>作り手と使い手を、AIでひとつに。<br />DevRevを基礎から学ぶ。</>,
    description: `DevRevの基礎からプラットフォーム活用、開発者向け拡張まで、${SESSION_COUNT}セッションで体系的に学ぶ実践コース。公式情報をもとに、既存のSoRと運用を保ちながらMemory・検索・統制の積み上げ方を押さえ、Claude等LLM単体で使うよりも、DevRevと組み合わせることで、より速く正確に、低コストで業務に活用する方法も学べる。`,
    memoryCostLink: '詳しく: Memoryとコスト',
    cta: 'セッション1から始める',
    stats: [
      { label: 'セッション', value: String(SESSION_COUNT) },
      { label: '学習時間', value: `約${TOTAL_HOURS}h` },
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

        <div className="flex flex-wrap items-center gap-3">
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
          <Link
            href={`/${locale}/memory-vs-fetch-ai-accuracy-and-cost`}
            className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-90"
            style={{ color: '#E0F2FE' }}
          >
            {t.memoryCostLink}
          </Link>
        </div>
      </div>
    </div>
  )
}
