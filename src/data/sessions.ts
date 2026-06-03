export const SESSION_ORDER = [
  "s01", "s02", "s03", "s04", "s05", "s06",
  "s07", "s08", "s09", "s10", "s11", "s12", "s13", "s14", "s15"
] as const;

export type SessionId = typeof SESSION_ORDER[number];

type SessionBase = {
  id: SessionId;
  level: "beginner" | "intermediate" | "advanced";
  layer: "foundations" | "platform" | "developer";
  duration: number;
};

type SessionLocalized = SessionBase & {
  title: string;
  subtitle: string;
  keyInsight: string;
};

export const SESSION_BASE: Record<SessionId, SessionBase> = {
  s01: { id: "s01", level: "beginner", layer: "foundations", duration: 30 },
  s02: { id: "s02", level: "beginner", layer: "foundations", duration: 40 },
  s03: { id: "s03", level: "beginner", layer: "foundations", duration: 60 },
  s04: { id: "s04", level: "beginner", layer: "platform", duration: 60 },
  s05: { id: "s05", level: "intermediate", layer: "platform", duration: 50 },
  s06: { id: "s06", level: "intermediate", layer: "platform", duration: 60 },
  s07: { id: "s07", level: "intermediate", layer: "platform", duration: 60 },
  s08: { id: "s08", level: "intermediate", layer: "platform", duration: 45 },
  s09: { id: "s09", level: "intermediate", layer: "platform", duration: 45 },
  s10: { id: "s10", level: "intermediate", layer: "developer", duration: 60 },
  s11: { id: "s11", level: "intermediate", layer: "developer", duration: 75 },
  s12: { id: "s12", level: "intermediate", layer: "developer", duration: 60 },
  s13: { id: "s13", level: "advanced", layer: "developer", duration: 60 },
  s14: { id: "s14", level: "advanced", layer: "developer", duration: 60 },
  s15: { id: "s15", level: "advanced", layer: "developer", duration: 90 },
};

const SESSION_TEXT_JA: Record<SessionId, { title: string; subtitle: string; keyInsight: string }> = {
  s01: {
    title: "DevRevとは何か：AIネイティブな作業基盤",
    subtitle: "データモデル、Memory、Computer の土台",
    keyInsight:
      "LLM単体より速く・正確に・低コストで業務回答を得られる理由がわかります。\n文脈・権限・根拠を同一データモデルで束ねる4基盤の仕組みを説明できるようになります。",
  },
  s02: {
    title: "はじめてのDevRev：セットアップと基本操作",
    subtitle: "Navigate DevRev from Day One",
    keyInsight: "ワークスペースを作成し、基本ナビゲーションにアクセスできるようになります。最初の30分でDevRevの全体像を把握できます。",
  },
  s03: {
    title: "DevRevのデータモデルを理解する",
    subtitle: "Identity, Parts, Work — 公式の3本柱",
    keyInsight: "Identity・Parts・Workの3本柱を使ってデータを整理できるようになります。チケット・Issue・顧客情報を1つのデータモデルで結びつける設計ができます。",
  },
  s04: {
    title: "カスタマーサポートを設計する",
    subtitle: "Ticket Management & SLA",
    keyInsight: "チケット管理・SLAポリシー・自動振り分けを設定できるようになります。この設定が完了するとチームの優先度判断が自動化されます。",
  },
  s05: {
    title: "ナレッジベースとサポートポータルを構築する",
    subtitle: "Knowledge Base, Collections, and Support Portal",
    keyInsight: "Articleを作成してCollectionに整理し、サポートポータルとして顧客に公開できるようになります。3つの設定を正しく連動させて初めて顧客に届きます。",
  },
  s06: {
    title: "Computer for Your CustomersとComputer for User Insightsで顧客を理解する",
    subtitle: "Live Chat, Session Replay, and Funnels",
    keyInsight: "Computer for Your Customersでライブチャットを設置し、Computer for User Insightsで行動を録画・分析できるようになります。2つを組み合わせて顧客理解を深められます。",
  },
  s07: {
    title: "開発サイクルを管理する",
    subtitle: "From Issue to Release",
    keyInsight: "課題からリリースまでをDevRevで完結できるようになります。サポートチームとエンジニアリングを同一ツールでつないで管理できます。",
  },
  s08: {
    title: "管理者設定とアクセス制御",
    subtitle: "Admin, Roles, and Permissions",
    keyInsight: "組織全体のロール設計と権限制御を設定できるようになります。正しく設定することで、チームの運用負荷を大きく下げられます。",
  },
  s09: {
    title: "分析ダッシュボードを活用する",
    subtitle: "Metrics and Dashboards",
    keyInsight: "サポート・開発・運営の全チームのKPIを1つのダッシュボードで可視化できるようになります。部門横断のデータをリアルタイムで確認できます。",
  },
  s10: {
    title: "ワークフローと自動化を設計する",
    subtitle: "Automations and Workflows",
    keyInsight: "ルール自動化・AI条件ノード・並列パスを組み合わせた業務フローを自動化できるようになります。Agent Studioに進むための前提知識が身につきます。",
  },
  s11: {
    title: "Snap-inとマーケットプレイスを活用する",
    subtitle: "Snap-ins, Marketplace, and Computer AirSync",
    keyInsight: "Snap-inをFeatured/All/Installedの3タブで管理できるようになります。JiraをComputer AirSyncでAPIトークン取得→Keyring Connection→フィールドマッピングの3ステップで接続できます。",
  },
  s12: {
    title: "DevRev APIを使ってみる",
    subtitle: "Authenticate and Call the DevRev API",
    keyInsight: "Personal Access Tokenを取得してcurlでAPIを呼び出せるようになります。公開APIとベータAPIの違いを理解して使い分けられます。",
  },
  s13: {
    title: "Snap-inを自作する",
    subtitle: "Build Your First Snap-in",
    keyInsight: "Snap-inをnpmパッケージのように公開・配布できるようになります。ローカルテストから本番デプロイまでを一気通貫で実践できます。",
  },
  s14: {
    title: "Agent Studioで自律エージェントを設計する",
    subtitle: "Design Autonomous Agents with Agent Studio",
    keyInsight: "WorkflowよりAI自律度の高いエージェントをAgent Studioで設計できるようになります。ゴール設計とツール選択の考え方を身につけられます。",
  },
  s15: {
    title: "AirSyncコネクタを自作する（ADaaS）",
    subtitle: "カスタムAirSyncコネクタとADaaS SDK",
    keyInsight: "マーケットプレイスにない外部システムとの同期をADaaS SDKで自作できるようになります。カスタムSnap-inとの使い分けと、Extraction 4フェーズ・制御プロトコル・IDMの仕組みを説明できます。",
  },
};

const SESSION_TEXT_EN: Record<SessionId, { title: string; subtitle: string; keyInsight: string }> = {
  s01: {
    title: "What Is DevRev: The AI-Native Work Platform",
    subtitle: "Data model, Memory, and Computer foundations",
    keyInsight: "You will be able to explain why DevRev delivers business answers faster and more accurately than LLMs alone.\nYou will understand the four foundations that bind context, permissions, and evidence on a single data model.",
  },
  s02: {
    title: "Getting Started with DevRev",
    subtitle: "Navigate DevRev from Day One",
    keyInsight: "You will be able to create a workspace and navigate the core UI. You will have a clear mental model of DevRev's structure within your first 30 minutes.",
  },
  s03: {
    title: "Understanding the DevRev Data Model",
    subtitle: "Identity, Parts, and Work",
    keyInsight: "You will be able to organize data using the three pillars: Identity, Parts, and Work. You will be able to connect tickets, issues, and customer records in a single data model.",
  },
  s04: {
    title: "Designing Customer Support",
    subtitle: "Ticket Management & SLA",
    keyInsight: "You will be able to configure ticket management, SLA policies, and auto-triage. Once set up, your team's priority decisions become automated.",
  },
  s05: {
    title: "Building a Knowledge Base and Support Portal",
    subtitle: "Knowledge Base, Collections, and Support Portal",
    keyInsight: "You will be able to create Articles, organize them into Collections, and publish a Support Portal for customers. All three settings must align before customers can find anything.",
  },
  s06: {
    title: "Understanding Customers with Computer for Your Customers and Computer for User Insights",
    subtitle: "Live Chat, Session Replay, and Funnels",
    keyInsight: "Computer for Your Customers is the live chat touchpoint; Computer for User Insights records and analyzes behavior. Combine them to deeply understand your customers",
  },
  s07: {
    title: "Managing the Development Cycle",
    subtitle: "From Issue to Release",
    keyInsight: "Complete the loop from issue to release inside DevRev. This is where the value of connecting support and engineering on one tool becomes clear",
  },
  s08: {
    title: "Admin Settings and Access Control",
    subtitle: "Admin, Roles, and Permissions",
    keyInsight: "Role design and permission control across the organization is the admin's first job. Get this right and operations become much smoother",
  },
  s09: {
    title: "Using Analytics Dashboards",
    subtitle: "Metrics and Dashboards",
    keyInsight: "DevRev analytics spans support, engineering, and operations. Visualize org-wide KPIs in a single dashboard",
  },
  s10: {
    title: "Designing Workflows and Automation",
    subtitle: "Automations and Workflows",
    keyInsight: "You will be able to automate business workflows using rule automation, AI condition nodes, and parallel paths. You will gain the prerequisite knowledge needed for Agent Studio.",
  },
  s11: {
    title: "Using Snap-ins and the Marketplace",
    subtitle: "Snap-ins, Marketplace, and Computer AirSync",
    keyInsight: "Snap-ins are managed across Featured, All, and Installed tabs. Jira Computer AirSync connects in three steps: generate API token, configure Keyring Connection, map fields",
  },
  s12: {
    title: "Getting Started with the DevRev API",
    subtitle: "Authenticate and Call the DevRev API",
    keyInsight: "A Personal Access Token is all you need to start calling the API with curl today. Understanding public vs beta APIs is your first step",
  },
  s13: {
    title: "Building Your First Snap-in",
    subtitle: "Build Your First Snap-in",
    keyInsight: "Snap-ins are publishable and distributable like npm packages. Learn the full cycle from local testing to production deployment",
  },
  s14: {
    title: "Designing Autonomous Agents with Agent Studio",
    subtitle: "Design Autonomous Agents with Agent Studio",
    keyInsight: "Agent Studio enables more advanced AI autonomy than Workflows. Build on your Workflow knowledge to learn goal design and tool selection for agents",
  },
  s15: {
    title: "Building a Custom AirSync Connector (ADaaS)",
    subtitle: "Custom AirSync Connectors and the ADaaS SDK",
    keyInsight: "Even external systems not in the marketplace can be synced by building a custom AirSync connector with the ADaaS SDK. Learn when to use ADaaS vs custom Snap-ins, and how the 4-phase extraction, control protocol, and IDM work",
  },
};

const LAYERS_JA = [
  { id: "foundations" as const, label: "DevRev基礎", sessions: ["s01", "s02", "s03"] as SessionId[] },
  { id: "platform" as const, label: "プラットフォーム活用", sessions: ["s04", "s05", "s06", "s07", "s08", "s09"] as SessionId[] },
  { id: "developer" as const, label: "開発者・拡張", sessions: ["s10", "s11", "s12", "s13", "s14", "s15"] as SessionId[] },
] as const;

const LAYERS_EN = [
  { id: "foundations" as const, label: "DevRev Foundations", sessions: ["s01", "s02", "s03"] as SessionId[] },
  { id: "platform" as const, label: "Platform in Action", sessions: ["s04", "s05", "s06", "s07", "s08", "s09"] as SessionId[] },
  { id: "developer" as const, label: "Extend & Automate", sessions: ["s10", "s11", "s12", "s13", "s14", "s15"] as SessionId[] },
] as const;

function buildSessionMeta(text: Record<SessionId, { title: string; subtitle: string; keyInsight: string }>): Record<SessionId, SessionLocalized> {
  return Object.fromEntries(
    SESSION_ORDER.map((id) => [id, { ...SESSION_BASE[id], ...text[id] }])
  ) as Record<SessionId, SessionLocalized>;
}

const SESSION_METAS = {
  ja: buildSessionMeta(SESSION_TEXT_JA),
  en: buildSessionMeta(SESSION_TEXT_EN),
} as const;

export function getSessionMeta(locale: string): Record<SessionId, SessionLocalized> {
  // Dev: keep edits reflected without relying on module cache.
  if (process.env.NODE_ENV !== "production") {
    const text = locale === "ja" ? SESSION_TEXT_JA : SESSION_TEXT_EN;
    return buildSessionMeta(text);
  }

  return (SESSION_METAS as Record<string, Record<SessionId, SessionLocalized>>)[locale] ?? SESSION_METAS.en;
}

export function getLayers(locale: string) {
  return locale === "ja" ? LAYERS_JA : LAYERS_EN;
}

// Shared constants
export const LEVEL_LABEL: Record<string, Record<string, string>> = {
  en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  ja: { beginner: '初級', intermediate: '中級', advanced: '上級' },
};

