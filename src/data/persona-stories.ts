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

  executive: {
    persona: 'executive',
    characterName: '山本',
    before: `月曜の経営会議。山本（VP）は各部門の現状を把握したい。しかし情報は全部、各部門長の頭の中にある。

サポート部長に「今月のSLA達成率は？」と聞く。「確認して午後に共有します」。部長がZendeskからCSVを出してスプレッドシートにまとめる作業が入る。

開発部長に「あの大口顧客のバグ、いつ直る？」と聞く。「PMに確認します」。部長→PM→Jira確認→Slackで返事、で翌日に回答が来る。

営業部長に「解約リスクのある顧客は？」と聞く。「サポートの状況も踏まえないと…」。営業部長がサポート部長に聞いて、サポート部長がZendeskで調べて…2日後に「たぶんA社とC社が危ない」。

結局、全社を横断した意思決定に必要な情報を揃えるのに1週間かかる。しかも届く情報は各部門長のフィルターがかかった「たぶん」混じりの報告。生データではない。`,
    turning: `DevRevのダッシュボードを開く。誰にも聞かずに1画面で見える：

• サポートKPI：週次チケット数推移、SLA達成率、CSAT、Part別分布
• 開発KPI：スプリントVelocity、バーンダウン、リリース進捗
• 営業KPI：パイプライン、Account別の健康スコア
• クロス分析：「チケットが最も多いPartのIssue消化状況」「リリース後のチケット減少率」

「サポート負荷が高い機能は？」→ Part Distributionチャートで即答。ドリルダウンして「修正予定はNext Sprint」まで確認。部門長に聞く必要がない。

「解約リスクは？」→ Account健康スコアの低い順にソート。チケット頻度×未解決Issue数×契約更新日の組み合わせでリスクが数値化されている。「たぶん」ではなくデータ。`,
    after: `山本の経営判断：

• 全社状況の把握：1週間（各部門に聞いて回る）→ 5分（ダッシュボードを開くだけ）
• 情報の質：部門長フィルター越しの「たぶん」→ 生データに基づくファクト
• 意思決定の速度：「来週までに調べて」→ 会議中にその場で判断
• 部門横断の優先度判断：「サポート負荷高い × 開発未着手 × 大口顧客」のトリプル条件でフィルタ。どの部門長にも偏らない判断材料
• 新メンバーの教育：「Zendeskはこう、Jiraはこう、SFはこう」→「DevRevにログインして。全部ここにある」`,
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

  executive: {
    persona: 'executive',
    characterName: 'Yamamoto',
    before: `Monday leadership meeting. Yamamoto (VP) needs the full picture across all departments. But every piece of information lives in a different department head's domain.

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
    after: `Yamamoto's decision-making:

• Full picture: 1 week (asking each department) → 5 minutes (open the dashboard)
• Information quality: "probably" filtered through department heads → facts grounded in raw data
• Decision speed: "look into it by next week" → decide on the spot during the meeting
• Cross-department prioritization: filter by "high support load × no dev progress × major account" triple condition. Unbiased by any single department head's perspective
• New hire training: "Zendesk works like this, Jira like that, SF like this..." → "Log in to DevRev. Everything's here."`,
  },
};

export function getPersonaStory(locale: string, personaId: PersonaId): PersonaStory {
  const stories = locale === 'ja' ? STORIES_JA : STORIES_EN;
  return stories[personaId];
}

export function getAllPersonaStories(locale: string): Record<PersonaId, PersonaStory> {
  return locale === 'ja' ? STORIES_JA : STORIES_EN;
}
