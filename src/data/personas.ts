import { SessionId, SESSION_BASE } from './sessions';

export type PersonaId = 'support' | 'sales' | 'developer' | 'executive';

export type PersonaMeta = {
  id: PersonaId;
  icon: string;
  coreSessions: SessionId[];
  recommendedSessions: SessionId[];
  totalCoreMinutes: number;
  coreHours: number;
};

export type PersonaLocalized = PersonaMeta & {
  label: string;
  shortLabel: string;
  description: string;
};

const PERSONA_BASE: Record<PersonaId, Omit<PersonaMeta, 'totalCoreMinutes' | 'coreHours'>> = {
  support: {
    id: 'support',
    icon: '🎧',
    coreSessions: ['s01', 's02', 's04', 's05', 's10'],
    recommendedSessions: ['s06', 's14'],
  },
  sales: {
    id: 'sales',
    icon: '💼',
    coreSessions: ['s01', 's02', 's03', 's07', 's09'],
    recommendedSessions: ['s04', 's08'],
  },
  developer: {
    id: 'developer',
    icon: '💻',
    coreSessions: ['s01', 's02', 's03', 's07', 's11', 's12'],
    recommendedSessions: ['s10', 's13', 's14', 's15'],
  },
  executive: {
    id: 'executive',
    icon: '📊',
    coreSessions: ['s01', 's02', 's03', 's08', 's09'],
    recommendedSessions: ['s04', 's07', 's10'],
  },
};

const PERSONA_TEXT_JA: Record<PersonaId, { label: string; shortLabel: string; description: string }> = {
  support: {
    label: 'サポート担当',
    shortLabel: 'サポート',
    description: 'チケットの山を、AIが整理・提案・通知する世界へ',
  },
  sales: {
    label: '営業 / CS',
    shortLabel: '営業/CS',
    description: '顧客の声から開発進捗まで、1画面で即答できる世界へ',
  },
  developer: {
    label: '開発者',
    shortLabel: '開発者',
    description: '顧客文脈付きのIssueで、根拠ある優先度判断ができる世界へ',
  },
  executive: {
    label: '経営層',
    shortLabel: '経営層',
    description: '各部門に聞かずとも全社のKPIと現場の実態を即座に把握する世界へ',
  },
};

const PERSONA_TEXT_EN: Record<PersonaId, { label: string; shortLabel: string; description: string }> = {
  support: {
    label: 'Support Agent',
    shortLabel: 'Support',
    description: 'From ticket overload to AI-sorted, AI-suggested, auto-notified',
  },
  sales: {
    label: 'Sales / CS',
    shortLabel: 'Sales/CS',
    description: 'From customer voice to dev progress - answer instantly in one view',
  },
  developer: {
    label: 'Developer',
    shortLabel: 'Developer',
    description: 'Issues with customer context - prioritize with evidence, not guesses',
  },
  executive: {
    label: 'Executive',
    shortLabel: 'Executive',
    description: 'Company-wide KPIs and ground truth without asking each department head',
  },
};

function buildPersonaMeta(base: typeof PERSONA_BASE): Record<PersonaId, PersonaMeta> {
  const result = {} as Record<PersonaId, PersonaMeta>;
  for (const [id, meta] of Object.entries(base) as [PersonaId, Omit<PersonaMeta, 'totalCoreMinutes' | 'coreHours'>][]) {
    const totalCoreMinutes = meta.coreSessions.reduce(
      (sum, sid) => sum + SESSION_BASE[sid].duration,
      0
    );
    const coreHours = Math.round(totalCoreMinutes / 60 * 2) / 2;
    result[id] = { ...meta, totalCoreMinutes, coreHours };
  }
  return result;
}

const PERSONA_METAS = buildPersonaMeta(PERSONA_BASE);

export const PERSONA_ORDER: PersonaId[] = ['support', 'sales', 'developer', 'executive'];

export function getPersonaMeta(locale: string): Record<PersonaId, PersonaLocalized> {
  const text = locale === 'ja' ? PERSONA_TEXT_JA : PERSONA_TEXT_EN;
  const result = {} as Record<PersonaId, PersonaLocalized>;
  for (const id of PERSONA_ORDER) {
    result[id] = { ...PERSONA_METAS[id], ...text[id] };
  }
  return result;
}

// ペルソナパスの学習順（必修 → 発展）。ロケール非依存
export function getPersonaSessionOrder(personaId: PersonaId): SessionId[] {
  const p = PERSONA_BASE[personaId];
  return [...p.coreSessions, ...p.recommendedSessions];
}
