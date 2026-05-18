import { PersonaId } from './personas';

export type PersonaStory = {
  persona: PersonaId;
  characterName: string;
  before: string;
  turning: string;
  after: string;
};

const STORIES_JA: Record<PersonaId, PersonaStory> = {
  support: {
    persona: 'support',
    characterName: '佐藤',
    before: `月曜朝9時。佐藤はZendeskを開く。週末に溜まった47件のチケット。まず全件を目視で重要度判定。顧客Aの「ログインできない」はよくある質問だが、顧客Bの同じ文面は先週から続くバグの再報告かもしれない。Jiraを別タブで開き、関連Issueを検索するが、チケット番号の紐付けが2世代前のものだ。Slackで開発チームに「この件まだ直ってないですか？」と聞く。返事が来るまで次のチケットへ。

11時。SLA期限が迫った5件に気づく。でもそのうち3件は同じバグの報告だと昼過ぎに判明する。1件ずつ回答を書いてしまった後だ。`,
    turning: `DevRevを開く。47件のうち、Computerが自動で分類済み：

• 12件は既存KB記事で自己解決可能 → PLuGが自動提案済み
• 8件は同一バグの重複 → 1つのIssueに集約表示
• 3件がSLA残り2時間以内 → 上部に赤いバッジ

佐藤が最初に開いたチケットの右パネルには：
• 過去の類似チケット3件のリンク
• その顧客のAccount情報（契約プラン、過去の問い合わせ頻度）
• Computerが生成した回答ドラフト（KB記事を根拠に引用）

回答ドラフトを微修正して送信。2分。`,
    after: `佐藤の午前中：

• 47件 → 実質対応が必要なのは24件（23件はAIが処理 or 重複統合）
• 重複バグの報告は自動でIssueに集約。「この問題は5社が報告中」と開発チームに自動通知済み
• SLA違反：0件（AI分類で優先度が正確に、かつ即座に割り当て）
• 午後の空き時間でKB記事を1本追加 → 来週の類似チケットはさらに減る`,
  },

  sales: {
    persona: 'sales',
    characterName: '田中',
    before: `田中は明日のQBRに向けて資料を作っている。Salesforceで契約情報は確認できる。しかしチケットの状況はサポート部のZendeskにある。アクセス権がない。Slackでサポートリーダーに「A社のチケット状況教えてもらえますか？」とメンション。返事が来るまで待つ。

開発進捗も同じ。Jiraのアクセス権はエンジニアリング部門だけが持っている。PMにSlackで「あの機能いつリリースですか？」と聞く。PMが会議中で、返事は3時間後。

結局、QBR資料に書けるのは「確認中」の文字だけ。当日の朝にようやく「たぶん来月には」という曖昧な返事が来る。

QBR本番。顧客から「先月報告したバグはどうなりました？」と聞かれる。サポートに聞いたがJira番号までは教えてもらえなかった。「確認して折り返します」。また誰かに聞いて、待つ。`,
    turning: `DevRevでAccountページを開く。田中の画面には：

• Account健康スコア：チケット頻度・SLA達成率・CSAT推移が1画面（サポートに聞かなくていい）
• 直近のチケット→Issue紐づけ：「決済エラー」のチケット3件 → Issue #412に集約 → ステージ: In Review（今週リリース予定）。開発チームに聞かなくても進捗が見える
• Opportunity連携：来期のアップセル提案に関連するFeature Requestが2件、Enhancementとして登録済み。ロードマップ上の位置が見える

権限の壁がない。サポートのチケットも、開発のIssueも、営業に必要な範囲で同じ画面に出る。誰かに聞いて待つ時間がゼロ。

QBR前の準備：Computerに「このAccountの直近3ヶ月のサマリーを作って」と依頼。2分で要約が出る。根拠はすべてチケット・Issue・リリースノートへのリンク付き。`,
    after: `田中のQBR当日：

• 準備時間：丸1日（人に聞いて待つ時間）→ 15分（自分で見るだけ）
• 「バグいつ直る？」→ 即答（Issue→Releaseのリンクをそのまま共有）
• 「こんな機能ほしい」→ その場でTicket起票 → 自動でEnhancementに紐づくのを顧客に見せる
• 「確認して折り返します」→ もう言わなくていい
• 部署の壁を越えた情報が、権限設計のもとで1画面に集まっている`,
  },

  developer: {
    persona: 'developer',
    characterName: '鈴木',
    before: `鈴木のスプリントプランニング。Jiraに48件のBacklogがある。うち12件はサポートからの転記だが、「お客様が〇〇でお困りです」としか書かれていない。再現手順がない。影響範囲もわからない。

PMが「このバグ何社から来てる？」と聞く。Zendesk側のチケット数はわからない。サポートリーダーにSlackで聞いて、半日後に「たぶん5社くらい」と返ってくる。「たぶん」で優先度は決められない。

リリース後。修正したバグについて「該当顧客への通知お願いします」とサポートにSlackで依頼。サポート担当が「どのチケットのことですか？」と返す。紐付けが切れている。`,
    turning: `DevRevのBuild Appでスプリントボードを開く。Issueの右パネルには：

• 紐づいたTicket一覧：このバグを報告した顧客5社のチケットが全部見える
• 各Ticketの元の文面：顧客が実際に書いた再現手順が読める
• Account情報：報告企業の契約プラン・ARRが見える → 「大手3社が影響受けてる」
• Computerの要約：5件のチケットを横断分析した「共通の再現条件」が提示される

優先度判断：「ARR上位3社が影響、再現手順明確、修正見積もり2日」→ 即座にスプリントに入れる。根拠が明確。`,
    after: `鈴木のリリース後：

• Issueを「Done」に → 紐づいた5件のチケットが自動でステータス更新
• 5社の顧客に自動通知：「ご報告いただいた問題がv2.3.1で修正されました」
• 手動の通知依頼Slack：不要
• 優先度判断の精度：「何社？」「影響度？」が全部データで見えるので、PMとの議論が5分で終わる`,
  },

  leader: {
    persona: 'leader',
    characterName: '山本',
    before: `金曜午後。山本は週次レポートを作っている。Zendeskからチケット解決時間のCSVをエクスポート。JiraからVelocityレポートをスクリーンショット。Salesforceからパイプラインの数字をコピー。Spreadsheetsで集計し、Notionにまとめる。所要時間：3時間。

経営会議で「サポートの負荷が高い機能はどれ？」と聞かれる。「折り返し確認します」。Zendeskのタグ設計が粗いので、正確には出せない。

新メンバーのオンボーディング。「Zendeskはこう使って、Jiraはこう使って、Salesforceはこう見て、SlackのこのチャンネルでDevに聞いて…」教育コスト：1人あたり2週間。`,
    turning: `DevRevのダッシュボードを開く。1画面に：

• サポートKPI：週次チケット数推移、SLA達成率、CSAT、Part別分布
• 開発KPI：スプリントVelocity、バーンダウン、リリース進捗
• クロス分析：「チケットが最も多いPartのIssue消化状況」「リリース後のチケット減少率」

「サポート負荷が高い機能は？」→ Part Distributionチャートで即答。さらにそのPartのIssue一覧をドリルダウンして「修正予定はNext Sprint」まで回答。

新メンバーのオンボーディング：「DevRevにログインして。全部ここにある」`,
    after: `山本の運用：

• 週次レポート：3時間 → 自動生成で確認5分（Computerが要約＋差分ハイライト）
• 「どの機能が問題？」→ Part別分析で即答
• 新メンバーの教育：2週間 → 3日（覚えるツールが1つ）
• チーム横断の優先度判断：「サポート負荷高い × 開発未着手 × 大口顧客」のトリプル条件でフィルタ`,
  },
};

const STORIES_EN: Record<PersonaId, PersonaStory> = {
  support: {
    persona: 'support',
    characterName: 'Sato',
    before: `Monday, 9 AM. Sato opens Zendesk. 47 tickets piled up over the weekend. First task: visually scan every one for severity. Customer A's "can't log in" is a common question, but Customer B's similar message might be a re-report of last week's bug. Open Jira in another tab to search for related Issues, but the ticket linkage is two generations old. Ask the dev team on Slack: "Is this still not fixed?" Move to the next ticket while waiting for a reply.

11 AM. Notice 5 tickets approaching SLA deadlines. But it turns out 3 of them are reporting the same bug - discovered after lunch. Already wrote individual responses to each one.`,
    turning: `Open DevRev. Of the 47 tickets, Computer has already auto-classified:

• 12 are answerable by existing KB articles → PLuG already suggested them
• 8 are duplicates of the same bug → consolidated under one Issue
• 3 are within 2 hours of SLA breach → red badges at the top

The first ticket Sato opens shows in the right panel:
• Links to 3 similar past tickets
• Account info (contract plan, past inquiry frequency)
• A draft reply generated by Computer (citing KB articles as evidence)

Edit the draft slightly and send. 2 minutes.`,
    after: `Sato's morning:

• 47 tickets → only 24 actually need attention (23 handled by AI or consolidated)
• Duplicate bug reports auto-consolidated into one Issue. "5 companies reporting this problem" auto-notified to dev team
• SLA violations: 0 (AI classification nails priority and assignment instantly)
• Afternoon free time used to add 1 KB article → fewer similar tickets next week`,
  },

  sales: {
    persona: 'sales',
    characterName: 'Tanaka',
    before: `Tanaka is preparing for tomorrow's QBR. Contract info is in Salesforce - accessible. But ticket status lives in the support team's Zendesk. No access. Slack the support lead: "Can you share Account A's ticket status?" Wait for a reply.

Dev progress is the same story. Jira access is restricted to engineering. Slack the PM: "When is that feature releasing?" PM is in meetings. Reply comes 3 hours later.

The QBR deck ends up with "checking..." in half the fields. A vague "probably next month" arrives the morning of.

QBR time. Customer asks: "What happened to the bug we reported last month?" Support shared some info but not the Jira number. "Let me get back to you." Ask someone. Wait again.`,
    turning: `Open the Account page in DevRev. Tanaka's screen shows:

• Account health score: ticket frequency, SLA compliance, CSAT trend - all in one view (no need to ask support)
• Recent Ticket→Issue links: "Payment error" tickets (3) → Issue #412 → Stage: In Review (releasing this week). Dev progress visible without asking engineering
• Opportunity linkage: 2 Feature Requests tied to next quarter's upsell, registered as Enhancements with roadmap positions visible

No access walls. Support tickets, dev Issues, and sales-relevant data appear on the same screen within proper permission boundaries. Zero time spent waiting for someone to get back to you.

QBR prep: Ask Computer "Summarize this Account's last 3 months." Summary appears in 2 minutes. Every fact linked to its source ticket, Issue, or release note.`,
    after: `Tanaka's QBR day:

• Prep time: a full day (asking people, waiting) → 15 minutes (just look it up)
• "When's the bug fix?" → instant answer (share the Issue→Release link directly)
• "We'd love this feature" → file a Ticket on the spot → show the customer it auto-links to an Enhancement
• "Let me get back to you" → never needs to say that again
• Cross-department information, unified under proper access controls, all in one screen`,
  },

  developer: {
    persona: 'developer',
    characterName: 'Suzuki',
    before: `Suzuki's sprint planning. 48 items in the Jira backlog. 12 of them are transcribed from support, but they just say "Customer is having trouble with X." No repro steps. No impact scope.

PM asks: "How many companies are hitting this bug?" No idea - it's in Zendesk. Ask the support lead on Slack, get "probably about 5" half a day later. Can't prioritize on "probably."

After release. Slack the support team: "Please notify affected customers about the fix." Support replies: "Which tickets are you referring to?" The linkage is broken.`,
    turning: `Open the Sprint Board in DevRev's Build App. The Issue's right panel shows:

• Linked Tickets: all 5 companies that reported this bug, visible at a glance
• Original ticket text: the actual repro steps customers wrote
• Account info: contract plans and ARR of reporting companies → "3 major accounts affected"
• Computer's summary: cross-analyzed 5 tickets to surface "common reproduction conditions"

Priority decision: "Top-3 ARR accounts affected, clear repro, estimated 2-day fix" → into the sprint immediately. Evidence is clear.`,
    after: `Suzuki after release:

• Move Issue to "Done" → 5 linked tickets auto-update their status
• 5 customers auto-notified: "The issue you reported was fixed in v2.3.1"
• Manual Slack notification request: unnecessary
• Priority accuracy: "How many companies? Impact?" All visible in data, so the PM discussion takes 5 minutes`,
  },

  leader: {
    persona: 'leader',
    characterName: 'Yamamoto',
    before: `Friday afternoon. Yamamoto is building the weekly report. Export ticket resolution time CSV from Zendesk. Screenshot the Velocity report from Jira. Copy pipeline numbers from Salesforce. Compile in Sheets, format in Notion. Time spent: 3 hours.

Executive meeting: "Which feature has the highest support load?" "Let me get back to you." Zendesk's tag taxonomy is too coarse to answer precisely.

New hire onboarding: "Use Zendesk like this, Jira like that, check Salesforce here, ask Dev in this Slack channel..." Training cost: 2 weeks per person.`,
    turning: `Open DevRev's dashboard. One screen shows:

• Support KPIs: weekly ticket trends, SLA compliance, CSAT, Part-level distribution
• Dev KPIs: sprint Velocity, burndown, release progress
• Cross-team analysis: "Issue burn rate for the Part with most tickets," "ticket reduction after releases"

"Which feature has highest support load?" → instant answer from the Part Distribution chart. Drill down to that Part's Issue list: "Fix scheduled for Next Sprint."

New hire onboarding: "Log in to DevRev. Everything's here."`,
    after: `Yamamoto's operations:

• Weekly report: 3 hours → auto-generated, 5-minute review (Computer summarizes + highlights changes)
• "Which feature is the problem?" → Part-level analysis, instant answer
• New hire training: 2 weeks → 3 days (one tool to learn)
• Cross-team priority calls: filter by "high support load × no dev progress × major account" triple condition`,
  },
};

export function getPersonaStory(locale: string, personaId: PersonaId): PersonaStory {
  const stories = locale === 'ja' ? STORIES_JA : STORIES_EN;
  return stories[personaId];
}

export function getAllPersonaStories(locale: string): Record<PersonaId, PersonaStory> {
  return locale === 'ja' ? STORIES_JA : STORIES_EN;
}
