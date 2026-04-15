---
title: "オブジェクト構造リファレンス"
description: "DevRev の Identity / Parts / Work とリンクルールの一覧"
---

# オブジェクト構造リファレンス

チュートリアルでは [s03](/ja/s03) で概念を学ぶ。公式の [Core concepts](https://support.devrev.ai/devrev/article/ART-21847) は冒頭で *identity, parts, and work*（小文字）と列挙し、**図では Identity / Parts / Work** のラベルが使われている。このページは **一覧・図・リンクルール** をいつでも引けるリファレンスである。

## 全体リレーション図

3本柱は **Identity → Parts → Work**（公式の列挙順は *identity, parts, and work*）。Parts の内側は公式どおり **customer parts** と **builder parts** に分かれる（UI では RevPart / DevPart と表示されることが多い）。詳細は製品の設定により異なる場合がある。

```mermaid
graph TB
    subgraph Identity["Identity（誰が関わるか）"]
        DevOrg --> DevUser
        Account --> RevOrg --> RevUser
    end

    subgraph Parts["Parts（customer parts / builder parts）"]
        subgraph CustomerParts["Customer parts（例: RevPart）"]
            Product --> Capability --> Feature
            Feature --> Enhancement
        end
        subgraph BuilderParts["Builder parts（例: DevPart）"]
            CodeService["Code / Service"] --> Runnable
            CodeService --> Linkable
        end
    end

    subgraph Work["Work（作業オブジェクト）"]
        Conversation -->|エスカレーション| Ticket
        Ticket -->|開発連携| Issue
        Issue --> Task
        Ticket --> Incident
    end

    CustomerParts ---|is_work_of| Work
    BuilderParts ---|is_work_of| Work
    CustomerParts --> Article["Article（ナレッジベース）"]
    Identity --> Parts
    Identity --> Work
```

## 全オブジェクト一覧（概要）

主要オブジェクトをカテゴリ別に示す。DevUser / RevUser の可視性は目安である。

| カテゴリ | オブジェクト | 説明 | DevUser | RevUser |
|---------|---------------|------|---------|---------|
| Identity | DevOrg | 自社組織 | ○ | × |
| Identity | DevUser | 自社ユーザー | ○ | × |
| Identity | Account | 顧客台帳 | ○ | × |
| Identity | RevOrg | 顧客組織単位 | ○ | 条件付き |
| Identity | RevUser | 顧客側ユーザー | ○ | ○（本人） |
| Parts（customer） | Product | 製品最上位 | ○ | ○（参照） |
| Parts（customer） | Capability | 機能領域 | ○ | ○（参照） |
| Parts（customer） | Feature | 個別機能 | ○ | ○（参照） |
| Parts（customer） | Enhancement | 改善・大きなテーマ | ○ | × |
| Parts（builder） | Code / Service | 内部サービス | ○ | × |
| Parts（builder） | Runnable | 実行可能サービス | ○ | × |
| Parts（builder） | Linkable | ライブラリ等 | ○ | × |
| Work | Conversation | チャット・議論 | ○ | ○（自分） |
| Work | Ticket | 顧客チケット | ○ | ○（自分） |
| Work | Issue | 開発課題 | ○ | × |
| Work | Task | タスク | ○ | × |
| Work | Incident | インシデント | ○ | × |
| その他 | Article | ナレッジ | ○ | ○（公開分） |
| CRM | Opportunity | 商談 | ○ | × |

## リンクルール

### 異なるオブジェクト間のリンク

| ソース | ターゲット | リンクタイプ | 説明 |
|--------|-----------|------------|------|
| Conversation | Ticket | is_related_to | チャットをチケットに紐づける |
| Ticket | Issue | is_dependent_on | チケットが起点で Issue に依存 |
| Incident | Issue | is_dependent_on | インシデントが解決すべき Issue に依存 |
| Incident | Ticket | is_dependent_on | インシデントと関連チケットを紐づける |
| Issue | Ticket | is_dependent_on | Issue と Ticket の依存関係（双方向の使い方あり） |
| Issue / Ticket | Part | is_work_of | 作業を Part に紐づける |
| Task | Issue / Ticket | is_parent_of / is_child_of | タスクを Issue・Ticket の子として紐づける |
| Article | Part | （必須紐づけ） | KB は customer part（多くは RevPart）に紐づける |
| Account | Issue | リンク不可 | 必ず Ticket を経由すること |

### 同一オブジェクト間（自己参照）

| オブジェクト | リンクタイプ | 説明 |
|-------------|------------|------|
| Ticket ↔ Ticket | is_parent_of / is_child_of | 親子チケット |
| Ticket ↔ Ticket | is_duplicate_of | 重複チケット（重複側は自動クローズ） |
| Issue ↔ Issue | is_parent_of / is_child_of | 親子 Issue（親は 1 つのみ等、運用ルールに従う） |
| Issue ↔ Issue | is_dependent_on | 依存関係 |
| Issue ↔ Issue | is_duplicate_of | 重複 Issue |
| Task ↔ Task | is_dependent_on | タスク間依存 |
| Task ↔ Task | is_duplicate_of | 重複タスク |
| Part ↔ Part | is_parent_of / is_child_of | customer part 階層など |

### ストックリンクタイプ一覧

| リンクタイプ | 意味 | 主な用途 |
|-------------|------|---------|
| is_parent_of / is_child_of | 親子関係 | Ticket, Issue, Part |
| is_dependent_on | 依存関係（先に完了が必要） | Issue, Ticket, Incident |
| is_duplicate_of | 重複（重複側は自動クローズ） | Ticket, Issue, Task |
| is_related_to | 関連（緩やかなつながり） | Conversation↔Ticket |
| is_work_of | 作業の帰属先 | Issue/Ticket → Part |
| is_source_of | 起源・派生元 | Issue → Issue |
| is_part_of | 構成要素 | Part → Part |

カスタムリンクタイプを独自に定義することも可能である。

## このモデルの狙い

オブジェクトがなぜこのように分かれているか、学習用の観点で整理した。

| 観点 | 説明 | こう設計すると |
|---------|------|-------------------|
| Ticket は橋渡し役 | RevUser と DevUser をつなぐ顧客向けの接点 | 顧客は内部の開発用オブジェクトを意識しにくい |
| Issue は内部専用 | 開発チームの作業単位。顧客に見せない設計 | 試行錯誤を顧客に見せずに済む |
| Account は管理台帳 | DevUser が顧客企業を管理。Issue とは直接つながらない | 顧客情報と開発タスクが意図せず混ざりにくい |
| Conversation は入口 | 顧客の声の受け口。Ticket に昇格できる | 軽い相談とフォーマル対応を段階的に分けられる |
| Customer / builder parts | 顧客向け構成と内部技術を分離（公式の言い方） | 顧客には製品の見え方だけを伝えやすい |
| Article はアクセス制御 | 公開・内部・非公開などレベルで制御 | 社内ドキュメントと顧客向けヘルプを同一基盤で管理できる |
