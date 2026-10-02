---
title: "Article アクセス制御リファレンス"
description: "KB Articleの権限モデル — scope / access_level / shared_with の仕組みと判定フロー"
---

# Article アクセス制御リファレンス

最終更新日: 2026年10月3日

ナレッジベース（KB）の Article は、「誰に見せるか」を細かく決められます。[s05](/ja/s05) では Collection 公開の基本を扱いました。このページでは**権限モデルの全体像**をリファレンスとしてまとめます。

## 3つの制御パラメータ

Article のアクセス制御は、次の3つのパラメータで決まります。

| パラメータ | 役割 | 設定方法 |
|-----------|------|---------|
| **scope** | 記事の大分類（社内向け / 顧客向け） | 作成時に指定、または作成経路で決まる。更新でも変更できる（後述） |
| **access_level** | 公開レベル（private / public など） | API で設定可能。ただし Internal 記事では指定不可（システムが private にする）。GUI では直接操作しない |
| **shared_with** | 閲覧可能なユーザー/グループの明示指定 | GUI の「Visible to」フィールド、または API |

`access_level` と `shared_with` は**同時に指定できません**（どちらか一方のみ）。一方を指定すると、もう一方はシステム側で合わせられます（例: External で `access_level=public` を指定すると、共有先が自動で付く）。

---

## scope: Internal と External

| 項目 | **Internal** | **External** |
|------|------------|------------|
| 意味 | 社内文書（Google Docs/Notionの共有モデルに近い） | ヘルプセンター記事（顧客向け） |
| access_level | システムが **private** にする（利用者が指定する項目ではない） | public / external など。指定しなければ未設定のままのこともある |
| shared_with 対象 | **DevUser 型**のユーザー/グループのみ | DevUser + RevUser 両方指定可能 |
| 主な作成経路 | Computer AirSync による取込（Confluence, Notion, OneDrive等）、API で scope=Internal | GUI で手動作成（デフォルト）、または URL クローリング |
| Computer for Your Customers への露出 | デフォルトで非公開（意図しない公開を防ぐ設計） | 設定に応じて公開される |

**なぜ Computer AirSync 取込が Internal デフォルトなのか**: 外部ツールから同期したドキュメントには、社内限定の情報が含まれることが多いです。意図せず Computer for Your Customers や Support Portal に出さないため、Internal（=private）がデフォルトで適用されます。

### scope の更新（2026年7月以降）

2026年7月以降、`articles.update` で scope を変更できます。以前は作成後の変更ができませんでしたが、仕様が変わりました。

- Internal → External への変更は可能
- External へ変更すると、既存の `shared_with` は**解除**される。必要な共有は付け直す
- 顧客公開のために安易に Internal → External へ変えない。共有の付け直しが必要になる

---

## access_level: 5つの値

| 値 | 意味 | 主な用途 |
|---|---|---|
| **private** | デフォルトの seeded roles が適用されない。`shared_with` に明示指定された人のみアクセス可能 | Internal 記事でシステムが設定する値。社内限定文書 |
| **public** | status=published の場合、認証なしでもアクセス可能 | SEO 対応のヘルプセンター記事 |
| external | External scope 記事で SEO 無効（認証必要だが RevUser はアクセス可） | 限定公開の顧客向け記事 |
| restricted | 設計上存在するが現在は限定的 | — |
| internal | 設計上存在するが現在は限定的 | — |

> 実運用上重要なのは **`private`** と **`public`** です。

### private の動作

- デフォルトのシステムロール（seeded roles）が**適用されません**
- `shared_with` に明示的に追加されたユーザー/グループ**のみ**がアクセス可能です
- Internal 記事では、作成時にシステムが `access_level=private` にします
- Internal 記事の作成・更新で利用者が `access_level` を指定すると拒否されます（「Internal では access_level を設定してはならない」）

### public の動作

- status=published かつ access_level=public であれば、**認証トークンなし**でもアクセス可能です
- Support Portal や Computer for Your Customers からの検索対象になります
- SEO インデックスの対象になります
- External 記事で `access_level=public` を指定すると、共有先（例: All Users / Customers）がシステム側で付くことがあります

---

## shared_with: ユーザーとグループの指定

`shared_with` フィールドで、Article を閲覧できるユーザーやグループを明示指定します。

### 指定可能な対象

| 対象 | scope=internal | scope=external |
|------|:---:|:---:|
| DevUser（個人） | ○ | ○ |
| DevUser 型グループ | ○ | ○ |
| RevUser（個人） | × | ○ |
| RevUser 型グループ | × | ○ |

Internal 記事の共有先は、グループ自体が **DevUser 型**である必要があります。RevUser 型グループを指定すると拒否されます（「Internal 記事の共有先グループは DevUser 型でなければならない」）。

### GUI での操作

GUI では Article 詳細画面の **「Visible to」** フィールドで `shared_with` を設定できます。

- グループを指定すると、そのグループのメンバー全員にアクセス権が付与されます
- 「Visible to」を空にすると、Internal 記事は作成者のみアクセス可能になります

### グループによるアクセス制御の実例（External）

RevUser 型のグループ（例:「All Customers」「Partner Group」）を `shared_with` に指定することで、顧客セグメント別に Article の公開範囲を制御できます。

```
Article「API Migration Guide v2」
  scope: external
  access_level: external（認証必要）
  shared_with:
    - Group: "Enterprise Partners"（member_type: rev_user）
    - Group: "Beta Program Members"（member_type: rev_user）
```

この場合、Enterprise Partners または Beta Program Members に属する RevUser のみが閲覧できます。

---

## アクセス判定フロー

用途によって前提が違います。

- **顧客向け表示**（Support Portal / Computer for Your Customers）: status=published が前提
- **社内の閲覧・編集・Draft でのレビュー**: Published でなくても保存・更新できる

顧客向けアクセスの判定イメージ:

```
1. status = published か？
   └─ No → RevUser からは見えない（DevUser 向け draft など）

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

## Computer AirSync 取込と手動作成の違い

| 項目 | Computer AirSync 取込 | 手動作成（GUI） |
|------|------------|---------------|
| デフォルト scope | **internal** | **external** |
| access_level | システムが **private** | 公開設定に応じて変わる（public など） |
| Computer for Your Customers/Portal への露出 | デフォルトでは**非公開** | Published かつ公開設定で**公開** |
| 社内共有の広げ方 | DevUser 型グループを `shared_with` に追加 | 「Visible to」で制限または共有を調整 |

### 取込記事を顧客に見せたい場合

Internal のまま RevUser グループには共有できません。顧客向けにするには、次のいずれかが必要です。

1. scope を External に更新する（既存の共有は解除されるので、必要な共有を付け直す）
2. External として記事を再作成する

共有制限を避ける目的だけで Internal → External に変えないでください。

---

## Permission Aware 同期（OneDrive / SharePoint）

一部の Computer AirSync Extractor は、元システムの権限設定を保持したまま同期する **Permission Aware** 機能を持ちます。

### OneDrive

- 元の OneDrive 権限を保持して同期します
- OneDrive 上のユーザー/グループを、DevRev 側の対応するユーザー/グループにマッチングします
- DevRev 側で閲覧できるユーザーは、OneDrive 上でアクセス権を持つユーザーと一致します

### SharePoint

- Communication Site のコンテンツをインポートできます
- **Public**（全員に公開）または **Restricted to Owner Only**（オーナーのみ）を選択します
- デフォルトは「Restricted to Owner Only」です

---

## GUI / API での操作可否まとめ

| パラメータ | GUI 設定 | API 設定 | 備考 |
|-----------|:---:|:---:|------|
| **shared_with** | ○（「Visible to」） | ○（articles.create / articles.update） | access_level と同時指定不可 |
| **access_level** | × | ○（ただし Internal では指定不可） | shared_with と同時指定不可。External で public 等を指定すると共有先が付くことがある |
| **scope** | × | ○（create / update。Internal=1 / External=2） | 2026年7月以降は更新可。External 化で共有は解除される |
| **status** | ○（公開/下書き/アーカイブ） | ○（articles.update） | 顧客向け表示には Published が必要。Draft の保存自体は可能 |

---

## 設計上の注意点

- `access_level` と `shared_with` は同時に送れません。片方を指定すると、もう片方はシステム側で合わせられます
- Internal 記事の `access_level` は利用者が指定するものではありません。システムが private にします
- Internal の共有先は DevUser 型グループのみです。RevUser 型グループは使えません
- scope を External に変えると共有は消えます。必要な相手へ付け直してください
- GUI 上では `access_level` を直接確認・変更できません（API で確認します）
- Computer AirSync 取込記事は、デフォルトでは Computer for Your Customers / Portal に出ません

---

## 関連リンク

- [s05: ナレッジベースとサポートポータルを構築する](/ja/s05) — KB の基本構築手順
- [s08: 管理者設定とアクセス制御](/ja/s08) — ロールと権限の全体設計
- [オブジェクト構造リファレンス](/ja/reference/architecture) — Article と Part の関係
- [公式: KB Article 作成](https://support.devrev.ai/devrev/article/ART-21914)
- [公式: Collections](https://support.devrev.ai/devrev/article/ART-21915)
