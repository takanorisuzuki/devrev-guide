---
title: "オブジェクト構造リファレンス"
description: "DevRev の Identity / Parts / Work とリンクルールの一覧"
---

# オブジェクト構造リファレンス

チュートリアルでは [s03](/ja/s03) で概念を学ぶ。公式の全体説明は [Core concepts](https://support.devrev.ai/devrev/article/ART-21847)。このページは **一覧・図・リンクルール** をいつでも引けるリファレンスである。

## 全体リレーション図

3本柱は **Identity → Parts → Work**。Parts の内側は **customer parts** と **builder parts**（UI では RevPart / DevPart と表示されることが多い）。**Enhancement** は **Part（customer RevPart）** として **Product → Capability → Feature → Enhancement** の階層に属する（**Issue / Ticket そのものではない**）。複数 Issue を束ねる Epic 的な役割やライフサイクル、Ticket・Opportunity との接続など **Work に近い振る舞い**を併せ持つハイブリッドでもある（[s03](/ja/s03) 参照）。Issue / Ticket は **is_work_of** で **Part** に帰属させる（**Feature** に限らず **Enhancement** も対象になりうる）。**Enhancement** は **is_parent_of** で複数 **Issue** の親にもなりうる。図ではその関係を示している。**Incident → Ticket** の向きは下記リンクルール表と一致させている。詳細は製品の設定により異なる場合がある。

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
        Incident -->|is_dependent_on| Ticket
    end

    Enhancement -->|is_parent_of| Issue

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
| Parts（customer） | Enhancement | 改善テーマ（階層末端の RevPart。Issue を束ねる Epic 的役割も） | ○ | × |
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
| Issue / Ticket | Part | is_work_of | 作業を Part に紐づける（**Part** には Feature などに加え **Enhancement** も含む） |
| Enhancement | Issue | is_parent_of | Enhancement（Part）が複数 Issue の親になる Epic 的まとまり |
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
| is_parent_of / is_child_of | 親子関係 | Ticket, Issue, Part、**Enhancement（Part）→ Issue** |
| is_dependent_on | 依存関係（先に完了が必要） | Issue, Ticket, Incident |
| is_duplicate_of | 重複（重複側は自動クローズ） | Ticket, Issue, Task |
| is_related_to | 関連（緩やかなつながり） | Conversation↔Ticket |
| is_work_of | 作業の帰属先 | Issue/Ticket → Part（Feature / **Enhancement** など） |
| is_source_of | 起源・派生元 | Issue → Issue |
| is_part_of | 構成要素 | Part → Part |

カスタムリンクタイプを独自に定義することも可能である。

## 拡張の仕組み（カスタムオブジェクト・カスタムフィールド）

設計や API 連携の途中で「標準オブジェクトだけでは足りない」と感じたときに戻って読むセクションである。いますべてを設定する必要はない。

DevRev の標準オブジェクトでは表現しきれない業務要件がある場合、以下の 3 つの拡張手段を使う。

### カスタムフィールド

既存オブジェクト（Ticket, Issue, Account など）にフィールドを追加する。UI の Settings 画面から設定可能。

```
例: Ticket に「影響ユーザー数」フィールドを追加
フィールド名: tnt__impacted_user_count
型: int
```

- フィールド名には `tnt__` プレフィックスが付く（テナント固有を意味する）。
- 型は text, int, double, bool, enum, timestamp, id（他オブジェクト参照）などが使用可能。
- enum 型は選択肢をあらかじめ定義する。

### サブタイプ

既存のオブジェクトタイプ（Ticket, Issue など）に対して、用途別のサブタイプを定義する。

```
例: Ticket のサブタイプ
- Bug（バグ報告）
- Feature Request（機能要望）
- Question（質問）
```

サブタイプごとに異なるカスタムフィールドを持たせることができる。たとえば Bug サブタイプにのみ「再現手順」フィールドを追加する、といった設計が可能。

### カスタムオブジェクト

標準のオブジェクトカテゴリに収まらない概念をモデル化する場合に使う。

```
例: custom_object.vendor（ベンダー管理）
  - ベンダー名（text）
  - 契約期間（timestamp）
  - SLA レベル（enum）
```

- カスタムオブジェクトは `custom_object.xxx` という名前空間で管理される。
- 標準オブジェクトと同様にリンクで接続でき、検索やダッシュボードの対象にもなる。
- API からの操作も標準オブジェクトと同じパターンで行える。

### 使い分けの指針

| やりたいこと | 手段 |
|-------------|------|
| Ticket に項目を追加したい | カスタムフィールド |
| Ticket を用途別に分類したい | サブタイプ |
| 既存オブジェクトに当てはまらない概念を追加したい | カスタムオブジェクト |

カスタムフィールドの設定方法は Settings > Object Customization から行う。カスタムオブジェクトの作成は API 経由で行う（[s12](/ja/s12) 参照）。

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
