---
title: "Article アクセス制御リファレンス"
description: "KB Articleの権限モデル — scope / access_level / shared_with の仕組みと判定フロー"
---

# Article アクセス制御リファレンス

ナレッジベース（KB）の Article は「誰に見せるか」を精密に制御できる。[s05](/ja/s05) ではCollection公開の基本を扱ったが、このページでは**権限モデルの全体像**をリファレンスとしてまとめる。

## 3つの制御パラメータ

Article のアクセス制御は、以下の3つのパラメータで決まる。

| パラメータ | 役割 | 設定方法 |
|-----------|------|---------|
| **scope** | 記事の大分類（社内向け / 顧客向け） | 作成経路で自動決定（手動作成=external, AirSync取込=internal） |
| **access_level** | 公開レベル（private / public など） | API で設定可能。GUI では直接操作しない |
| **shared_with** | 閲覧可能なユーザー/グループの明示指定 | GUI の「Visible to」フィールド、または API |

この3つは独立ではなく、**内部的に同期されている**。API リクエストでは `access_level` と `shared_with` のどちらか一方のみ送信可能（両方同時は不可）。

---

## scope: Internal と External

| 項目 | **Internal** | **External** |
|------|------------|------------|
| 意味 | 社内文書（Google Docs/Notionの共有モデルに近い） | ヘルプセンター記事（顧客向け） |
| デフォルトの access_level | **private**（作成者のみ） | public または external（Platform Users全員がデフォルトアクセス可） |
| shared_with 対象 | DevUser のみ指定可能 | DevUser + RevUser 両方指定可能 |
| 主な作成経路 | **AirSync** による取込（Confluence, Notion, OneDrive等） | GUI で手動作成、またはURLクローリング |
| PLuG への露出 | デフォルトで非公開（意図しない公開を防ぐ設計） | 設定に応じて公開される |

**なぜ AirSync 取込が Internal デフォルトなのか**: 外部ツールから同期したドキュメントには社内限定の情報が含まれることが多い。PLuG や Support Portal に意図せず公開されることを防ぐため、Internal scope（=private）がデフォルト適用される。

---

## access_level: 5つの値

| 値 | 意味 | 主な用途 |
|---|---|---|
| **private** | デフォルトのseeded rolesが適用されない。`shared_with` に明示指定された人のみアクセス可能 | Internal scope のデフォルト。社内限定文書 |
| **public** | status=published の場合、認証なしでもアクセス可能 | SEO 対応のヘルプセンター記事 |
| external | External scope 記事でSEO無効（認証必要だが RevUser はアクセス可） | 限定公開の顧客向け記事 |
| restricted | 設計上存在するが現在は限定的 | — |
| internal | 設計上存在するが現在は限定的 | — |

> 現時点で実運用上重要なのは **`private`** と **`public`** の2つ。

### private の動作

- デフォルトのシステムロール（seeded roles）が**一切適用されない**
- `shared_with` に明示的に追加されたユーザー/グループ**のみ**がアクセス可能
- Internal scope の記事はすべて `access_level=private` がデフォルト

### public の動作

- status=published かつ access_level=public であれば、**認証トークンなし**でもアクセス可能
- Support Portal や PLuG からの検索対象になる
- SEO インデックスの対象になる

---

## shared_with: ユーザーとグループの指定

`shared_with` フィールドで、Article を閲覧できるユーザーやグループを明示指定する。

### 指定可能な対象

| 対象 | scope=internal | scope=external |
|------|:---:|:---:|
| DevUser（個人） | ○ | ○ |
| DevUser のグループ | ○ | ○ |
| RevUser（個人） | × | ○ |
| RevUser のグループ | × | ○ |

### GUI での操作

GUI では Article 詳細画面の **「Visible to」** フィールドで `shared_with` を設定できる。

- グループを指定すると、そのグループのメンバー全員にアクセス権が付与される
- 「Visible to」を空にすると、Internal scope 記事は作成者のみアクセス可能になる

### グループによるアクセス制御の実例

RevUser 型のグループ（例:「All Customers」「Partner Group」）を `shared_with` に指定することで、顧客セグメント別にArticleの公開範囲を制御できる。

```
Article「API Migration Guide v2」
  scope: external
  access_level: external（認証必要）
  shared_with:
    - Group: "Enterprise Partners"（member_type: rev_user）
    - Group: "Beta Program Members"（member_type: rev_user）
```

この場合、Enterprise Partners または Beta Program Members に属する RevUser のみが閲覧できる。

---

## アクセス判定フロー

Article へのアクセスリクエストが来たとき、以下の順序で判定される。

```
1. status = published か？
   └─ No → RevUser からは見えない（DevUser 向け draft）

2. access_level = private か？
   └─ Yes → デフォルト roles 無効。shared_with に明示指定された人のみ
   └─ No → 次へ

3. access_level = public か？
   └─ Yes → 認証なしでもアクセス可（SEO対応）
   └─ No → デフォルト roles が適用される

4. scope = internal か？
   └─ Yes → RevUser には見せない。shared_with の DevUser のみ
   └─ No (external) → shared_with の RevUser/Group で顧客アクセスを決定
```

---

## AirSync 取込と手動作成の違い

| 項目 | AirSync 取込 | 手動作成（GUI） |
|------|------------|---------------|
| デフォルト scope | **internal** | **external** |
| デフォルト access_level | **private**（作成者のみ） | **public**（全員アクセス可） |
| PLuG/Portal への露出 | デフォルトでは**非公開** | Published にすると**公開** |
| 変更方法 | `shared_with` を API/GUI で追加 | 「Visible to」で制限を追加 |

### AirSync 取込で顧客に公開する手順

AirSync で Internal scope として取り込まれた記事を顧客に公開したい場合:

1. Article の `shared_with` に対象の RevUser グループを追加する
2. または、Article を手動で再作成し External scope にする

---

## Permission Aware 同期（OneDrive / SharePoint）

一部の AirSync Extractor は、元システムの権限設定を保持したまま同期する **Permission Aware** 機能を持つ。

### OneDrive

- 元の OneDrive 権限を保持して同期
- OneDrive 上のユーザー/グループを、DevRev 側の対応するユーザー/グループにマッチング
- DevRev 側で閲覧できるユーザーは、OneDrive 上でアクセス権を持つユーザーと一致する

### SharePoint

- Communication Site のコンテンツをインポート可能
- **Public**（全員に公開）または **Restricted to Owner Only**（オーナーのみ）を選択
- デフォルトは「Restricted to Owner Only」

---

## GUI / API での操作可否まとめ

| パラメータ | GUI 設定 | API 設定 | 備考 |
|-----------|:---:|:---:|------|
| **shared_with** | ○（「Visible to」） | ○（articles.create / articles.update） | access_level と排他（同時送信不可） |
| **access_level** | × | ○（articles.create / articles.update） | shared_with と排他。Plug バックエンドが同期を管理 |
| **scope** | × | ×（公開APIスキーマになし） | 作成経路で自動決定 |
| **status** | ○（公開/下書き/アーカイブ） | ○（articles.update） | Published でないと RevUser に見えない |

---

## 設計上の注意点

- `shared_with` と `access_level` は内部的に同期されているため、**APIで片方を変更するともう片方も影響を受ける**
- `scope` は作成後に変更できない（Internal→External への変更は、記事の再作成が必要）
- GUI 上では `access_level` の値を直接確認・変更する手段がない（APIで確認する）
- AirSync 取込の記事は、デフォルトで PLuG/Portal に露出しない設計になっているため、公開したい場合は明示的に `shared_with` を設定する必要がある

---

## 関連リンク

- [s05: ナレッジベースとサポートポータルを構築する](/ja/s05) — KB の基本構築手順
- [s08: 管理者設定とアクセス制御](/ja/s08) — ロールと権限の全体設計
- [オブジェクト構造リファレンス](/ja/architecture) — Article と Part の関係
- [公式: KB Article 作成](https://support.devrev.ai/devrev/article/ART-21914)
- [公式: Collections](https://support.devrev.ai/devrev/article/ART-21915)
