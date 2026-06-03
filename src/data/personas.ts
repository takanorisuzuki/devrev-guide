import { SessionId } from './sessions';

export type PersonaId = 'support' | 'sales' | 'developer' | 'executive';

export type PersonaImportance = 'core' | 'recommended' | 'optional';

export type PersonaRelevance = {
  persona: PersonaId;
  importance: PersonaImportance;
  order: number;
};

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

// --- Session relevance mapping ---

export const SESSION_PERSONAS: Record<SessionId, PersonaRelevance[]> = {
  s01: [
    { persona: 'support', importance: 'core', order: 1 },
    { persona: 'sales', importance: 'core', order: 1 },
    { persona: 'developer', importance: 'core', order: 1 },
    { persona: 'executive', importance: 'core', order: 1 },
  ],
  s02: [
    { persona: 'support', importance: 'core', order: 2 },
    { persona: 'sales', importance: 'core', order: 2 },
    { persona: 'developer', importance: 'core', order: 2 },
    { persona: 'executive', importance: 'core', order: 2 },
  ],
  s03: [
    { persona: 'sales', importance: 'core', order: 3 },
    { persona: 'developer', importance: 'core', order: 3 },
    { persona: 'executive', importance: 'core', order: 3 },
  ],
  s04: [
    { persona: 'support', importance: 'core', order: 3 },
    { persona: 'sales', importance: 'recommended', order: 6 },
    { persona: 'executive', importance: 'recommended', order: 6 },
  ],
  s05: [
    { persona: 'support', importance: 'core', order: 4 },
  ],
  s06: [
    { persona: 'support', importance: 'recommended', order: 6 },
  ],
  s07: [
    { persona: 'sales', importance: 'core', order: 4 },
    { persona: 'developer', importance: 'core', order: 4 },
    { persona: 'executive', importance: 'recommended', order: 7 },
  ],
  s08: [
    { persona: 'executive', importance: 'core', order: 4 },
    { persona: 'sales', importance: 'recommended', order: 7 },
  ],
  s09: [
    { persona: 'sales', importance: 'core', order: 5 },
    { persona: 'executive', importance: 'core', order: 5 },
  ],
  s10: [
    { persona: 'support', importance: 'core', order: 5 },
    { persona: 'developer', importance: 'recommended', order: 7 },
    { persona: 'executive', importance: 'recommended', order: 8 },
  ],
  s11: [
    { persona: 'developer', importance: 'core', order: 5 },
  ],
  s12: [
    { persona: 'developer', importance: 'core', order: 6 },
  ],
  s13: [
    { persona: 'developer', importance: 'recommended', order: 8 },
  ],
  s14: [
    { persona: 'support', importance: 'recommended', order: 7 },
    { persona: 'developer', importance: 'recommended', order: 9 },
  ],
  s15: [
    { persona: 'developer', importance: 'recommended', order: 10 },
  ],
};

// --- Persona metadata ---

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

import { SESSION_BASE } from './sessions';

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

export function getPersonaForSession(sessionId: SessionId): PersonaRelevance[] {
  return SESSION_PERSONAS[sessionId] ?? [];
}
