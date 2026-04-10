---
title: DevRev公式情報調査記録
last_updated: 2026-04-10
next_review: 調査時に差分確認
---

# DevRev公式情報調査記録

> 調査目的：devrev-guideの学習コンテンツを公式一次情報と照合し、改善点を洗い出す。
> 次回同じ調査を行う場合は、このファイルを先に読み、差分のみを追跡すること。

## 調査概要

| 項目 | 内容 |
|------|------|
| 調査日 | 2026-04-10 |
| 調査者 | Claude Code (claude-sonnet-4-6) |
| 調査対象 | DevRev公式サイト、開発者ドキュメント、DevRev University |
| 主要URL | https://devrev.ai, https://developer.devrev.ai, https://devrev.ai/docs/DevRevU |

---

## 1. プラットフォーム全体像（現状）

### 1-1. ブランディングの変化

| 旧名称（2024年以前） | 現在の名称（2025-2026） |
|---------------------|----------------------|
| DevRev（プラットフォーム名） | **Computer by DevRev** |
| AgentOS | Computer（AgentOSの後継/統合概念） |
| Agent Builder | **Agent Studio**（Computerの一機能として統合） |

**影響するセッション**: s01（「Computerがプラットフォームに組み込まれている」は正しいが「Computer by DevRev」という正式名称を使うべき）、s13（「Agent Builder」という名称が「Agent Studio」に変更）

### 1-2. 現在のアーキテクチャ

DevRevは「Computer」を2つの主要用途に分けて提供している：

- **Computer for Support Teams** - 製品中心のカスタマーサポート
- **Computer for Builders** - 顧客中心のソフトウェア開発

**Computerの2つの特許技術**:
1. **Computer AirSync** - 複数の企業データソースを接続・同期
2. **Computer Memory** - パーミッション対応のナレッジグラフ（ビジネス関係のマッピングと柔軟なクエリ/分析）

**技術仕様**:
- サブ200msのクエリ応答時間（ペタバイト規模データでも）
- ベクトル化ベースのインテリジェント検索（数十億レコード対応）
- SQL クエリ対応のロバストなレポーティング

### 1-3. Agent Studio（旧: Agent Builder）

s13で「Agent Builder」として紹介している機能は、現在は**Agent Studio**という名称でComputerの一機能として提供されている。

**Agent Studioの概要**:
- カスタムAIエージェント構築プラットフォーム
- Computer Memoryの文脈データへのアクセスにより高速なレスポンスと推論を実現
- エージェントは新規チケット作成、レコード更新、チーム横断の作業調整が可能

**s13への影響**:
- 「2026年3月時点では一般公開前」という注記は**削除が必要**
- 名称を「Agent Builder」→「Agent Studio」に更新が必要
- UIハンズオンを追加できる段階になっている可能性が高い

---

## 2. コアコンセプト（公式定義）

### 2-1. Parts（パーツ）

公式定義：**"A part is a piece of a product or service"**

| 種類 | 説明 |
|------|------|
| **Customer Parts** | 顧客による製品消費方法。product、capability、featuresの3種類 |
| **Builder Parts** | 開発者が構築・使用するコード、サービス、コンポーネント |

Customer Parts は通常、1つ以上のBuilder Partsによってサポートされる。

### 2-2. Work（ワークアイテム）

公式定義：**"A work item is any artifact in the system that requires some activity"**

| 種類 | 説明 |
|------|------|
| Conversation | 同期的な議論。チケットにエスカレート可能 |
| Ticket | 顧客または消費者が作成 |
| Issue | ビルダーまたはメンテナーが作成 |
| Enhancement | 複数issueの親項目 |
| Task | より大きな作業の細分化 |

### 2-3. 3つのコアオブジェクト

現在の公式表現：**"three core objects: identity, parts, and work"**

s03では「Parts、Rev Users、Dev Users」の3軸として説明しているが、公式は「identity（=ユーザー概念の統合）、parts、work」という整理をしている。s03の内容は実質的に正確だが、用語の統一を検討すべき。

### 2-4. Memory（メモリ）

プラットフォームの中核：「すべての人と仕事（ユーザーと活動）を顧客と製品という2つの主要な次元の周りにもたらす」機能。

---

## 3. 開発者向け機能（Snap-in / API）

### 3-1. Snap-in開発の現状

**対応言語**: JavaScript / TypeScript（TypeScript SDKを強く推奨）

**構成要素**:

| 要素 | 説明 |
|------|------|
| Manifest | snap-in packageのバージョン定義ファイル（manifest.yaml） |
| Function | ユーザー提供コードを実行するフレームワーク |
| Event Source | Webhook、メール、タイマーベースのAPIコールからイベント収集 |
| Keyring | 外部システムの認証情報（PAT、APIキー、アクセストークン等） |
| Custom Type | カスタムオブジェクト型定義 |
| Vista | カスタムビュー定義 |
| Automation | イベントソースと関数のリンク |
| Commands | ユーザーがトリガー可能なアクション |
| Hooks | ライフサイクルイベント時の関数呼び出し |
| Snap-kit | UIカスタマイズコンポーネント |

**基本コマンド**:
```bash
devrev snap_in_package create-one --slug my-first-snap-in
```

作成されたフォルダには `manifest.yaml` と `code/` フォルダが含まれる。

**外部連携対応**: GitHub、Slack、Bitbucket、Discordなど

**ドキュメントURL**: https://developer.devrev.ai/snapin-development/tutorials/getting-started

### 3-2. API

- OpenAPI Specification 3.0準拠
- 公開版とベータ版の2バージョン
- 認証: Personal Access Token（PAT）

### 3-3. PLuG SDK

| プラットフォーム | 対応 |
|----------------|------|
| Web | ✓（Web SDK） |
| iOS | ✓ |
| Android | ✓ |
| React Native | ✓ |
| Cordova | ✓ |
| Flutter | ✓ |

**主要機能**:
- AIチャットウィジェット
- 検索バー
- ユーザーセッション録画（自動開始）
- エンゲージメントとナッジ
- カスタム分析イベント送信
- プッシュ通知（モバイル）

---

## 4. DevRev University（公式学習リソース）

### 4-1. コース一覧

| コース名 | 説明 |
|---------|------|
| DevRev: Product Mastery | プラットフォームの基礎と高度な実践 |
| DevRev: Session Analytics | カスタマーセッション追跡とインサイト発見 |
| Computer for Builders | AI駆動型製品開発 |
| DevRev: Admin Management and Set-up | ワークフロー設定と管理 |
| DevRev Platform Fundamentals | エコシステム入門 |
| DevRev: Customizations and Snap-ins | カスタム体験構築 |
| DevRev: Workflows and Automations | スケーラブルな自動化設計 |
| DevRev: Analytics, Access and Security Control | セキュリティと分析 |

**URL**: https://devrev.ai/docs/DevRevU

### 4-2. デモ動画カテゴリー

公式デモは以下のカテゴリーに分類されている（https://devrev.ai/docs/DevRevU/demos）：

- プラットフォーム基本機能（検索、ナビゲーション、通知）
- サポート関連（ナレッジベース、PLuG、Slack/メール/WhatsApp統合）
- プロダクト管理（スプリントボード、セッションアナリティクス）
- エンタープライズ検索（Turing AIベース）
- 管理機能（ロール/権限、SLA、テンプレート）

---

## 5. AIエージェント機能の詳細

### 5-1. Computerの3本柱（公式ブログより）

1. **Knowledge（コンテキストエンジン）** - すべてのインタラクションがエージェントの組織メモリを強化
2. **Skills（アクションレイヤー）** - コンテキストに応じた能力の展開
3. **Reasoning（人間とAIの協調）** - 重要な決定における人間のコントロールを維持

### 5-2. 定量的効果（公式数値）

| 指標 | 数値 |
|------|------|
| コンテキストスイッチング削減 | 60% |
| クロスファンクショナルリクエスト解決時間短縮 | 40% |
| 初回解決率向上 | 45% |
| 複雑な複数部門問題の解決時間削減 | 50% |
| 週間コンテキストスイッチング節約時間 | 10時間 |

### 5-3. Computer+エコシステム

- **Support App**: 顧客サービス運用
- **Build App**: プロダクト開発加速
- **Observe App**: プロダクトアナリティクス

---

## 6. 公式URLリスト

| 用途 | URL |
|------|-----|
| トップページ | https://devrev.ai |
| プラットフォーム概要 | https://support.devrev.ai/devrev/article/ART-21826 |
| コアコンセプト | https://support.devrev.ai/devrev/article/ART-21847 |
| 開発者ドキュメント（トップ） | https://developer.devrev.ai |
| Snap-in入門チュートリアル | https://developer.devrev.ai/snapin-development/tutorials/getting-started |
| Snap-in概念 | https://developer.devrev.ai/snapin-development/concepts |
| CLI リファレンス | https://developer.devrev.ai/snapin-development/references/cli |
| Web SDK | https://developer.devrev.ai/sdks/web/installation |
| DevRev University | https://devrev.ai/docs/DevRevU |
| デモ動画 | https://devrev.ai/docs/DevRevU/demos |
| AgentOS/Computer概要 | https://devrev.ai/agent-os |
| AIエージェントビジョン | https://devrev.ai/blog/devrevs-vision-for-ai-agent |
| KB Article作成 | https://support.devrev.ai/devrev/article/ART-21914 |
| Collections | https://support.devrev.ai/devrev/article/ART-21915 |
| Support Portal | https://support.devrev.ai/devrev/article/ART-21864 |

**注意**: `devrev.ai/docs/*` は `support.devrev.ai` へリダイレクトされる（308 Permanent）。ドキュメント内リンクを使う場合は `support.devrev.ai` のURLを使用する。

---

## 7. 既存コンテンツとの差分・更新推奨箇所

### 優先度：高

| セッション | 問題点 | 推奨対応 |
|-----------|--------|---------|
| s13 | 「Agent Builderは2026年3月時点では一般公開前」という注記が古い | 「Agent Studio」として公開済みに更新。UIハンズオンを追加 |
| s13 | 機能名「Agent Builder」が現在の公式名称と異なる | 「Agent Studio（within Computer）」に名称変更 |
| s01 | 「Computer」の説明はあるが「Computer by DevRev」という正式ブランド名がない | 正式名称を追記 |

### 優先度：中

| セッション | 問題点 | 推奨対応 |
|-----------|--------|---------|
| s03 | 「Parts、Rev Users、Dev Users」の3軸は実態に即しているが、公式のWork概念が不足 | Workオブジェクト（Conversation/Ticket/Issue/Enhancement/Task）の階層を明示 |
| s11 | Snap-inの「manifest.yaml + code/」構造の説明を最新CLI仕様に合わせる | `devrev snap_in_package create-one` コマンドを追記 |
| s12 | Snap-kit（UIコンポーネント）の言及がない | Snap-kitセクションを追加 |

### 優先度：低

| セッション | 問題点 | 推奨対応 |
|-----------|--------|---------|
| s05 | PLuG SDKのモバイル対応プラットフォーム（React Native, Cordova, Flutter）の言及がない | SDK対応プラットフォーム一覧を更新 |
| 全体 | DevRev Universityのコース一覧との対応表がない | 各セッションとDevRevUコースの対応を示すと学習者が自学習しやすくなる |

---

## 8. ナレッジベース・サポートポータル（2026-04-10調査）

### 8-1. KB Article

**ソース**: ART-21914（support.devrev.ai）

| 項目 | 内容 |
|------|------|
| 作成方法 | リッチテキストエディタ / URLリンク / ファイルアップロード（PDF, Word） |
| 必須フィールド | Part（どの製品領域か）、Owned by（担当Dev User） |
| ステータス | Draft → Published → Archived |
| Collectionへの割り当て | 任意だが推奨 |

### 8-2. Collections

**ソース**: ART-21915（support.devrev.ai）

| 項目 | 内容 |
|------|------|
| 作成場所 | Settings > Support > Article Collections > +Collection |
| 設定フィールド | Title, Description, Parent, Publish Collection（公開トグル） |
| ネスト | 子Collectionを持てる（無制限） |
| 並び順 | ドラッグ＆ドロップ |
| 公開条件 | Article Published + Collection Publish ON + Visibility設定 の3つが揃うこと |

### 8-3. Support Portal

**ソース**: ART-21864（support.devrev.ai）

| 項目 | 内容 |
|------|------|
| デフォルトURL | `https://support.devrev.ai/<yourcompany>` |
| カスタムドメイン | DevRevサポートへのチケット起票が必要 |
| 外観設定場所 | Settings > Plug & Portal > Portal Settings > Appearance |
| 外観設定項目 | ロゴ, ファビコン, カラー, テーマ, ヘッダー/フッター, ヒーローセクション |
| ポータル機能 | チケット起票 + 進捗トラッキング + KB検索（構文 + セマンティック） |

### 8-4. Language Settings

| 項目 | 内容 |
|------|------|
| 対応言語数 | 6言語 |
| 対応言語 | English (en), Spanish (es), Japanese (ja), Dutch (nl), Portuguese (pt), Simplified Chinese (zh-CN) |
| 多言語実装方法 | 各言語用の親Collectionをフォルダとして設定。翻訳ArticleをそのCollectionに登録 |
| プレビュー | 言語・デバイス別のライブプレビュー対応 |

### 8-5. Web Crawler

| 項目 | 内容 |
|------|------|
| エンドポイント | `Create Web Crawler Job` API |
| 入力 | URL または XMLサイトマップ |
| 設定項目 | ドメイン許可リスト、最大深度、URLフィルタ（正規表現） |
| 出力 | Articleとして生成。必ずレビューしてから公開すること |

---

## 9. 次回調査時のチェックリスト

次回この調査を行う場合、以下の差分のみを確認すること：

- [ ] Agent Studioの機能追加・変更（https://devrev.ai/agent-os）
- [ ] Snap-in CLIバージョンアップ（https://developer.devrev.ai/snapin-development/references/cli）
- [ ] DevRev Universityの新コース追加（https://devrev.ai/docs/DevRevU）
- [ ] PLuG SDKの新プラットフォーム対応
- [ ] Computer by DevRevの新機能発表（公式ブログ）
- [ ] コアコンセプトのドキュメントURL変更（現在 support.devrev.ai へリダイレクト中）
- [ ] KB Article作成方法の変更（ART-21914）
- [ ] Support Portalの設定画面変更（ART-21864）
- [ ] 言語設定の対応言語追加（6言語 → 更新の可能性）
