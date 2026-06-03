import { PersonaId } from './personas';

export type PersonaStory = {
  persona: PersonaId;
  before: string;
  turning: string;
  after: string;
};

const STORIES_JA: Record<PersonaId, PersonaStory> = {
  support: {
    persona: 'support',
    before: `月曜朝9時。サポート担当者はZendeskを開きます。週末に溜まった47件のチケット。まず全件を目視で重要度判定します。顧客Aの「ログインできない」はよくある質問ですが、顧客Bの同じ文面は先週から続くバグの再報告かもしれません。Jiraを別タブで開き、関連Issueを検索しますが、チケット番号の紐付けが2世代前のものです。Slackで開発チームに「この件まだ直ってないですか？」と聞きます。返事が来るまで次のチケットへ。

11時。SLA期限が迫った5件に気づきます。でもそのうち3件は同じバグの報告だと昼過ぎに判明します。1件ずつ回答を書いてしまった後です。`,
    turning: `DevRevを開きます。47件のうち、Computerが自動で分類済みです：

• 12件は既存KB記事で自己解決可能 → Computer for Your Customersが自動提案済み
• 8件は同一バグの重複 → 1つのIssueに集約表示
• 3件がSLA残り2時間以内 → 上部に赤いバッジ

最初に開いたチケットの右パネルには：
• 過去の類似チケット3件のリンク
• その顧客のAccount情報（契約プラン、過去の問い合わせ頻度）
• Computerが生成した回答ドラフト（KB記事を根拠に引用）

回答ドラフトを微修正して送信。2分。`,
    after: `サポート担当者の午前中：

• 47件 → 実質対応が必要なのは24件（23件はAIが処理 or 重複統合）
• 重複バグの報告は自動でIssueに集約。「この問題は5社が報告中」と開発チームに自動通知済み
• SLA違反：0件（AI分類で優先度が正確に、かつ即座に割り当て）
• 午後の空き時間でKB記事を1本追加 → 来週の類似チケットはさらに減る`,
  },

  sales: {
    persona: 'sales',
    before: `営業担当者は明日のQBRに向けて資料を作っています。Salesforceで契約情報は確認できます。しかしチケットの状況はサポート部のZendeskにあります。アクセス権がありません。Slackでサポートリーダーに「A社のチケット状況教えてもらえますか？」とメンションします。返事が来るまで待ちます。

開発進捗も同じです。Jiraのアクセス権はエンジニアリング部門だけが持っています。PMにSlackで「あの機能いつリリースですか？」と聞きます。PMが会議中で、返事は3時間後。

結局、QBR資料に書けるのは「確認中」の文字だけです。当日の朝にようやく「たぶん来月には」という曖昧な返事が来ます。

QBR本番。顧客から「先月報告したバグはどうなりました？」と聞かれます。サポートに聞きましたがJira番号までは教えてもらえませんでした。「確認して折り返します」。また誰かに聞いて、待ちます。`,
    turning: `DevRevでAccountページを開きます。画面には：

• Account健康スコア：チケット頻度・SLA達成率・CSAT推移が1画面（サポートに聞く必要はありません）
• 直近のチケット→Issue紐づけ：「決済エラー」のチケット3件 → Issue #412に集約 → ステージ: In Review（今週リリース予定）。開発チームに聞かなくても進捗が見えます
• Opportunity連携：来期のアップセル提案に関連するFeature Requestが2件、Enhancementとして登録済み。ロードマップ上の位置が見えます

権限の壁がありません。サポートのチケットも、開発のIssueも、営業に必要な範囲で同じ画面に出ます。誰かに聞いて待つ時間がゼロです。

QBR前の準備：Computerに「このAccountの直近3ヶ月のサマリーを作って」と依頼します。2分で要約が出ます。根拠はすべてチケット・Issue・リリースノートへのリンク付きです。`,
    after: `営業担当者のQBR当日：

• 準備時間：丸1日（人に聞いて待つ時間）→ 15分（自分で見るだけ）
• 「バグいつ直る？」→ 即答（Issue→Releaseのリンクをそのまま共有）
• 「こんな機能ほしい」→ その場でTicket起票 → 自動でEnhancementに紐づくのを顧客に見せる
• 「確認して折り返します」→ もう言わなくていい
• 部署の壁を越えた情報が、権限設計のもとで1画面に集まっています`,
  },

  developer: {
    persona: 'developer',
    before: `開発者のスプリントプランニング。Jiraに48件のBacklogがあります。うち12件はサポートからの転記ですが、「お客様が〇〇でお困りです」としか書かれていません。再現手順がありません。影響範囲もわかりません。

PMが「このバグ何社から来てる？」と聞きます。Zendesk側のチケット数はわかりません。サポートリーダーにSlackで聞いて、半日後に「たぶん5社くらい」と返ってきます。「たぶん」で優先度は決められません。

リリース後。修正したバグについて「該当顧客への通知お願いします」とサポートにSlackで依頼します。サポート担当が「どのチケットのことですか？」と返します。紐付けが切れています。`,
    turning: `DevRevのComputer for Buildersでスプリントボードを開きます。Issueの右パネルには：

• 紐づいたTicket一覧：このバグを報告した顧客5社のチケットがすべて見えます
• 各Ticketの元の文面：顧客が実際に書いた再現手順が読めます
• Account情報：報告企業の契約プラン・ARRが見えます → 「大手3社が影響を受けています」
• Computerの要約：5件のチケットを横断分析した「共通の再現条件」が提示されます

優先度判断：「ARR上位3社が影響、再現手順明確、修正見積もり2日」→ 即座にスプリントに入れます。根拠が明確です。`,
    after: `開発者のリリース後：

• Issueを「Done」に → 紐づいた5件のチケットが自動でステータス更新
• 5社の顧客に自動通知：「ご報告いただいた問題がv2.3.1で修正されました」
• 手動の通知依頼Slack：不要
• 優先度判断の精度：「何社？」「影響度？」が全部データで見えるので、PMとの議論が5分で終わります`,
  },

  executive: {
    persona: 'executive',
    before: `月曜の経営会議。役員は各部門の現状を把握したいと思っています。しかし情報は全部、各部門長の頭の中にあります。

サポート部長に「今月のSLA達成率は？」と聞きます。「確認して午後に共有します」。部長がZendeskからCSVを出してスプレッドシートにまとめる作業が入ります。

開発部長に「あの大口顧客のバグ、いつ直る？」と聞きます。「PMに確認します」。部長→PM→Jira確認→Slackで返事、で翌日に回答が来ます。

営業部長に「解約リスクのある顧客は？」と聞きます。「サポートの状況も踏まえないと…」。営業部長がサポート部長に聞いて、サポート部長がZendeskで調べて…2日後に「たぶんA社とC社が危ない」。

結局、全社を横断した意思決定に必要な情報を揃えるのに1週間かかります。しかも届く情報は各部門長のフィルターがかかった「たぶん」混じりの報告。生データではありません。`,
    turning: `DevRevのダッシュボードを開きます。誰にも聞かずに1画面で見えます：

• サポートKPI：週次チケット数推移、SLA達成率、CSAT、Part別分布
• 開発KPI：スプリントVelocity、バーンダウン、リリース進捗
• 営業KPI：パイプライン、Account別の健康スコア
• クロス分析：「チケットが最も多いPartのIssue消化状況」「リリース後のチケット減少率」

「サポート負荷が高い機能は？」→ Part Distributionチャートで即答。ドリルダウンして「修正予定はNext Sprint」まで確認できます。部門長に聞く必要がありません。

「解約リスクは？」→ Account健康スコアの低い順にソート。チケット頻度×未解決Issue数×契約更新日の組み合わせでリスクが数値化されています。「たぶん」ではなくデータです。`,
    after: `役員の経営判断：

• 全社状況の把握：1週間（各部門に聞いて回る）→ 5分（ダッシュボードを開くだけ）
• 情報の質：部門長フィルター越しの「たぶん」→ 生データに基づくファクト
• 意思決定の速度：「来週までに調べて」→ 会議中にその場で判断
• 部門横断の優先度判断：「サポート負荷高い × 開発未着手 × 大口顧客」のトリプル条件でフィルタ。どの部門長にも偏らない判断材料
• 新メンバーの教育：「Zendeskはこう、Jiraはこう、Salesforceはこう」→「DevRevにログインして。全部ここにある」`,
  },
};

const STORIES_EN: Record<PersonaId, PersonaStory> = {
  support: {
    persona: 'support',
    before: `Monday, 9 AM. The support agent opens Zendesk. 47 tickets piled up over the weekend. First task: visually scan every one for severity. Customer A's "can't log in" is a common question, but Customer B's similar message might be a re-report of last week's bug. They open Jira in another tab to search for related Issues, but the ticket linkage is two generations old. They ask the dev team on Slack: "Is this still not fixed?" and move to the next ticket while waiting for a reply.

11 AM. They notice 5 tickets approaching SLA deadlines. But it turns out 3 of them are reporting the same bug - discovered after lunch. Already wrote individual responses to each one.`,
    turning: `Open DevRev. Of the 47 tickets, Computer has already auto-classified:

• 12 are answerable by existing KB articles → Computer for Your Customers already suggested them
• 8 are duplicates of the same bug → consolidated under one Issue
• 3 are within 2 hours of SLA breach → red badges at the top

The first ticket opened shows in the right panel:
• Links to 3 similar past tickets
• Account info (contract plan, past inquiry frequency)
• A draft reply generated by Computer (citing KB articles as evidence)

Edit the draft slightly and send. 2 minutes.`,
    after: `The support agent's morning:

• 47 tickets → only 24 actually need attention (23 handled by AI or consolidated)
• Duplicate bug reports auto-consolidated into one Issue. "5 companies reporting this problem" auto-notified to dev team
• SLA violations: 0 (AI classification nails priority and assignment instantly)
• Afternoon free time used to add 1 KB article → fewer similar tickets next week`,
  },

  sales: {
    persona: 'sales',
    before: `The sales rep is preparing for tomorrow's QBR. Contract info is in Salesforce - accessible. But ticket status lives in the support team's Zendesk. No access. They Slack the support lead: "Can you share Account A's ticket status?" and wait for a reply.

Dev progress is the same story. Jira access is restricted to engineering. They Slack the PM: "When is that feature releasing?" PM is in meetings. Reply comes 3 hours later.

The QBR deck ends up with "checking..." in half the fields. A vague "probably next month" arrives the morning of.

QBR time. Customer asks: "What happened to the bug we reported last month?" Support shared some info but not the Jira number. "Let me get back to you." Ask someone. Wait again.`,
    turning: `Open the Account page in DevRev. The screen shows:

• Account health score: ticket frequency, SLA compliance, CSAT trend - all in one view (no need to ask support)
• Recent Ticket→Issue links: "Payment error" tickets (3) → Issue #412 → Stage: In Review (releasing this week). Dev progress visible without asking engineering
• Opportunity linkage: 2 Feature Requests tied to next quarter's upsell, registered as Enhancements with roadmap positions visible

No access walls. Support tickets, dev Issues, and sales-relevant data appear on the same screen within proper permission boundaries. Zero time spent waiting for someone to get back to you.

QBR prep: Ask Computer "Summarize this Account's last 3 months." Summary appears in 2 minutes. Every fact linked to its source ticket, Issue, or release note.`,
    after: `QBR day:

• Prep time: a full day (asking people, waiting) → 15 minutes (just look it up)
• "When's the bug fix?" → instant answer (share the Issue→Release link directly)
• "We'd love this feature" → file a Ticket on the spot → show the customer it auto-links to an Enhancement
• "Let me get back to you" → never needs to say that again
• Cross-department information, unified under proper access controls, all in one screen`,
  },

  developer: {
    persona: 'developer',
    before: `Sprint planning. 48 items in the Jira backlog. 12 of them are transcribed from support, but they just say "Customer is having trouble with X." No repro steps. No impact scope.

PM asks: "How many companies are hitting this bug?" No idea - it's in Zendesk. They ask the support lead on Slack and get "probably about 5" half a day later. Can't prioritize on "probably."

After release. Slack the support team: "Please notify affected customers about the fix." Support replies: "Which tickets are you referring to?" The linkage is broken.`,
    turning: `Open the Sprint Board in DevRev's Computer for Builders. The Issue's right panel shows:

• Linked Tickets: all 5 companies that reported this bug, visible at a glance
• Original ticket text: the actual repro steps customers wrote
• Account info: contract plans and ARR of reporting companies → "3 major accounts affected"
• Computer's summary: cross-analyzed 5 tickets to surface "common reproduction conditions"

Priority decision: "Top-3 ARR accounts affected, clear repro, estimated 2-day fix" → into the sprint immediately. Evidence is clear.`,
    after: `After release:

• Move Issue to "Done" → 5 linked tickets auto-update their status
• 5 customers auto-notified: "The issue you reported was fixed in v2.3.1"
• Manual Slack notification request: unnecessary
• Priority accuracy: "How many companies? Impact?" All visible in data, so the PM discussion takes 5 minutes`,
  },

  executive: {
    persona: 'executive',
    before: `Monday leadership meeting. The executive needs the full picture across all departments. But every piece of information lives in a different department head's domain.

Ask the Support Director: "What's our SLA compliance this month?" "Let me pull that together this afternoon." The director has to export CSV from Zendesk and compile a spreadsheet.

Ask the Engineering Director: "When's the fix for that major account's bug?" "Let me check with the PM." Director → PM → Jira lookup → Slack reply. Answer arrives next day.

Ask the Sales Director: "Which accounts are at churn risk?" "I'd need to factor in support data too..." Sales Director asks Support Director, who checks Zendesk... 2 days later: "Probably Account A and C."

It takes a full week to assemble the cross-functional data needed for a single strategic decision. And what arrives is filtered through each department head's interpretation - "probably" mixed in. Never the raw data.`,
    turning: `Open DevRev's dashboard. Without asking anyone, one screen shows:

• Support KPIs: weekly ticket trends, SLA compliance, CSAT, Part-level distribution
• Dev KPIs: sprint Velocity, burndown, release progress
• Sales KPIs: pipeline, per-Account health scores
• Cross-team analysis: "Issue burn rate for the Part with most tickets," "ticket reduction after releases"

"Which feature has highest support load?" → instant answer from the Part Distribution chart. Drill down to that Part's Issue list: "Fix scheduled for Next Sprint." No need to ask anyone.

"Churn risk?" → Sort by Account health score. Ticket frequency × unresolved Issues × renewal date - risk quantified in numbers, not "probably."`,
    after: `The executive's decision-making:

• Full picture: 1 week (asking each department) → 5 minutes (open the dashboard)
• Information quality: "probably" filtered through department heads → facts grounded in raw data
• Decision speed: "look into it by next week" → decide on the spot during the meeting
• Cross-department prioritization: filter by "high support load × no dev progress × major account" triple condition. Unbiased by any single department head's perspective
• New hire training: "Zendesk works like this, Jira like that, Salesforce like this..." → "Log in to DevRev. Everything's here."`,
  },
};

export function getPersonaStory(locale: string, personaId: PersonaId): PersonaStory {
  const stories = locale === 'ja' ? STORIES_JA : STORIES_EN;
  return stories[personaId];
}

export function getAllPersonaStories(locale: string): Record<PersonaId, PersonaStory> {
  return locale === 'ja' ? STORIES_JA : STORIES_EN;
}
