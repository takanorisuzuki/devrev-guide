export const SESSION_ORDER = [
  "s01", "s02", "s03", "s04", "s05", "s06",
  "s07", "s08", "s09", "s10", "s11", "s12", "s13", "s14"
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
};

const SESSION_TEXT_JA: Record<SessionId, { title: string; subtitle: string; keyInsight: string }> = {
  s01: {
    title: "DevRevとは何か：AIネイティブな作業基盤",
    subtitle: "データモデル、Memory、Computer の土台",
    keyInsight:
      "Claude等LLM単体で使うよりも、DevRevと組み合わせることで、業務回答をより速く正確に、低コストで得られる。\n既存のSoRと運用を保ちながら、文脈・権限・根拠を同一データモデルで束ねる4基盤の仕組みを理解する",
  },
  s02: {
    title: "はじめてのDevRev：セットアップと基本操作",
    subtitle: "Navigate DevRev from Day One",
    keyInsight: "ワークスペース作成から基本ナビゲーションまで。最初の30分で全体像をつかむことが学習加速の鍵",
  },
  s03: {
    title: "DevRevのデータモデルを理解する",
    subtitle: "Identity, Parts, Work — 公式の3本柱",
    keyInsight: "Identity（誰が）・Parts（何を届けるか）・Work（何が動くか）の3本柱。ワークをパーツに、パーツを顧客・開発者の identity に結びつけると公式でも説明されている",
  },
  s04: {
    title: "カスタマーサポートを設計する",
    subtitle: "Ticket Management & SLA",
    keyInsight: "チケット管理・SLAポリシー・自動トリアージの3点セットがサポート運用の基盤。ここを設計するとチームの動き方が変わる",
  },
  s05: {
    title: "ナレッジベースとサポートポータルを構築する",
    subtitle: "Knowledge Base, Collections, and Support Portal",
    keyInsight: "ナレッジベースはArticleの集積だが、Collectionの設計とポータルの公開設定まで揃えて初めて顧客に届く。3つの設定が連動している",
  },
  s06: {
    title: "PLuGとObserve Appで顧客を理解する",
    subtitle: "Live Chat, Session Replay, and Funnels",
    keyInsight: "PLuGは顧客接点のライブチャット、Observe Appはその行動を録画・分析するセット機能。2つを組み合わせて顧客理解を深める",
  },
  s07: {
    title: "開発サイクルを管理する",
    subtitle: "From Issue to Release",
    keyInsight: "課題からリリースまでをDevRevで完結できる。サポートチームとエンジニアリングを同一ツールでつなぐ利点がここに現れる",
  },
  s08: {
    title: "管理者設定とアクセス制御",
    subtitle: "Admin, Roles, and Permissions",
    keyInsight: "組織全体のロール設計と権限制御が管理者の最初の仕事。ここを正しく設定すると運用が大きく楽になる",
  },
  s09: {
    title: "分析ダッシュボードを活用する",
    subtitle: "Metrics and Dashboards",
    keyInsight: "DevRevの分析機能はサポート・開発・運営の全チームに跨る。1つのダッシュボードで組織全体のKPIを可視化できる",
  },
  s10: {
    title: "ワークフローと自動化を設計する",
    subtitle: "Automations and Workflows",
    keyInsight: "基本的なルール自動化から始められるが、AI条件ノードや並列パスを組み合わせると非常に複雑になる。Agent Studioの直接の前提知識",
  },
  s11: {
    title: "Snap-inとマーケットプレイスを活用する",
    subtitle: "Snap-ins, Marketplace, and AirSync",
    keyInsight: "Snap-inはFeatured/All/Installedの3タブで管理する。Jira AirSyncはAPIトークン取得→Keyring Connection→フィールドマッピングの3ステップで接続できる",
  },
  s12: {
    title: "DevRev APIを使ってみる",
    subtitle: "Authenticate and Call the DevRev API",
    keyInsight: "Personal Access Tokenさえ取得すれば、curlで今日からAPIを叩ける。公開APIとベータAPIの違いを理解することが最初のステップ",
  },
  s13: {
    title: "Snap-inを自作する",
    subtitle: "Build Your First Snap-in",
    keyInsight: "Snap-in開発はnpmパッケージのように公開・配布できる。ローカルテストから本番デプロイまでを一気通貫で学ぶ",
  },
  s14: {
    title: "Agent Studioで自律エージェントを設計する",
    subtitle: "Design Autonomous Agents with Agent Studio",
    keyInsight: "Agent StudioはWorkflowより高度なAI自律エージェントを設計できる。Workflowの知識を前提に、エージェントのゴール設計とツール選択を学ぶ",
  },
};

const SESSION_TEXT_EN: Record<SessionId, { title: string; subtitle: string; keyInsight: string }> = {
  s01: {
    title: "What Is DevRev: The AI-Native Work Platform",
    subtitle: "Data model, Memory, and Computer foundations",
    keyInsight: "Combining LLMs (e.g. Claude) with DevRev delivers business answers faster, more accurately, and at lower cost than using an LLM alone.\nUnderstand the four foundations that bind context and permissions on a single data model.",
  },
  s02: {
    title: "Getting Started with DevRev",
    subtitle: "Navigate DevRev from Day One",
    keyInsight: "From workspace creation to basic navigation. Mastering the big picture in your first 30 minutes accelerates everything that follows",
  },
  s03: {
    title: "Understanding the DevRev Data Model",
    subtitle: "Identity, Parts, and Work",
    keyInsight: "Three pillars: Identity (who), Parts (what you deliver), Work (what is in motion). Official docs describe connecting work to parts and parts to customer and developer identity",
  },
  s04: {
    title: "Designing Customer Support",
    subtitle: "Ticket Management & SLA",
    keyInsight: "Ticket management, SLA policies, and auto-triage form the foundation of support operations. Getting this right changes how your team works",
  },
  s05: {
    title: "Building a Knowledge Base and Support Portal",
    subtitle: "Knowledge Base, Collections, and Support Portal",
    keyInsight: "A Knowledge Base is more than articles — Collections and portal visibility settings must align before customers can find anything. Three settings work together",
  },
  s06: {
    title: "Understanding Customers with PLuG and Observe App",
    subtitle: "Live Chat, Session Replay, and Funnels",
    keyInsight: "PLuG is the live chat touchpoint; Observe App records and analyzes behavior. Combine them to deeply understand your customers",
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
    keyInsight: "Simple rule-based automation is easy to start; combining AI condition nodes and parallel paths gets complex fast. Direct prerequisite for Agent Studio",
  },
  s11: {
    title: "Using Snap-ins and the Marketplace",
    subtitle: "Snap-ins, Marketplace, and AirSync",
    keyInsight: "Snap-ins are managed across Featured, All, and Installed tabs. Jira AirSync connects in three steps: generate API token, configure Keyring Connection, map fields",
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
};

const LAYERS_JA = [
  { id: "foundations" as const, label: "DevRev基礎", sessions: ["s01", "s02", "s03"] as SessionId[] },
  { id: "platform" as const, label: "プラットフォーム活用", sessions: ["s04", "s05", "s06", "s07", "s08", "s09"] as SessionId[] },
  { id: "developer" as const, label: "開発者・拡張", sessions: ["s10", "s11", "s12", "s13", "s14"] as SessionId[] },
] as const;

const LAYERS_EN = [
  { id: "foundations" as const, label: "DevRev Foundations", sessions: ["s01", "s02", "s03"] as SessionId[] },
  { id: "platform" as const, label: "Platform in Action", sessions: ["s04", "s05", "s06", "s07", "s08", "s09"] as SessionId[] },
  { id: "developer" as const, label: "Extend & Automate", sessions: ["s10", "s11", "s12", "s13", "s14"] as SessionId[] },
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

// Legacy exports for backward compatibility (defaults to Japanese)
export const SESSION_META = getSessionMeta("ja");
export const LAYERS = getLayers("ja");
