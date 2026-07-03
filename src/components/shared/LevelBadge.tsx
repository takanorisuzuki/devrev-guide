import { LEVEL_LABEL, SessionLevel } from '@/data/sessions'

interface LevelBadgeProps {
  level: SessionLevel
  locale: string
}

const LEVEL_STYLE: Record<SessionLevel, React.CSSProperties> = {
  beginner: { backgroundColor: 'var(--color-level-beginner-bg)', color: 'var(--color-level-beginner)' },
  intermediate: { backgroundColor: 'var(--color-level-intermediate-bg)', color: 'var(--color-level-intermediate)' },
  advanced: { backgroundColor: 'var(--color-level-advanced-bg)', color: 'var(--color-level-advanced)' },
}

export default function LevelBadge({ level, locale }: LevelBadgeProps) {
  const levelLabel = LEVEL_LABEL[locale] ?? LEVEL_LABEL.en
  return (
    <span className="text-xs px-1.5 py-0.5 rounded-full shrink-0" style={LEVEL_STYLE[level]}>
      {levelLabel[level]}
    </span>
  )
}
