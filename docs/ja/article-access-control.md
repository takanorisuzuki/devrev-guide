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

**API での scope 変更と、Computer AirSync の再同期は別です。** 取込側の記事更新では scope を送らない実装があるため、「API で scope を変えられる」ことを「再同期でも scope が更新される」とは読まないでください。

**scope と shared_with の同時更新**には、組織設定で検証のオン/オフが切り替わる実装があります。次の手順が安全です。

1. 必要なら先に共有を確認する
2. scope だけを更新する
3. 解除された共有を付け直す

jp-trans-ux-test（2026年10月3日）では、Internal に DevUser 型グループを共有したあと scope だけを External に更新すると、共有が空になることを確認しました。scope と shared_with を同一リクエストで送る挙動は、環境によって異なる可能性があるため、ここでは一般化しません。

---

## access_level: 5つの値

| 値 | 意味 | 主な用途 |
|---|---|---|
| **private** | デフォルトの seeded roles が適用されない。追加の閲覧者は `shared_with` で指定する（デフォルトは所有者） | Internal 記事でシステムが設定する値。社内限定文書 |
| **public** | status=published の場合、条件が揃えば認証なしでも取得できる | SEO 対応のヘルプセンター記事 |
| external | External scope 記事で SEO 無効（認証必要だが RevUser はアクセス可） | 限定公開の顧客向け記事 |
| restricted | 設計上存在するが現在は限定的 | — |
| internal | 設計上存在するが現在は限定的 | — |

> 実運用上重要なのは **`private`** と **`public`** です。

### private の動作

- デフォルトのシステムロール（seeded roles）が**適用されません**
- **デフォルトでは所有者がアクセス**できます。追加のアクセスは `shared_with` で付与します
- **作成者（created_by）と所有者（owned_by）は同一とは限りません**。空の共有を「作成者のみ」と書かず、「所有者のみ」と読むのが安全です
- Internal 記事では、作成時にシステムが `access_level=private` にします
- Internal 記事の作成・更新で利用者が `access_level` を指定すると拒否されます（「Internal では access_level を設定してはならない」）

### public の動作

- status=published かつ access_level=public は、匿名取得の**記事側の条件**です
- **Support Portal での匿名表示**には、記事側に加えて **Public Portal の有効化**が必要です。Public Portal が無効なら、ログイン済みの顧客に限られます
- API での匿名取得と、ポータル画面での匿名表示は分けて考えてください
- Computer for Your Customers からの検索対象にもなり得ます（ポータル設定とは別条件）
- SEO インデックスの対象になります
- External 記事で `access_level=public` を指定すると、共有先（例: All Users / Customers）がシステム側で付くことがあります

---

## shared_with: ユーザーとグループの指定

`shared_with` フィールドで、Article への追加の閲覧者（ユーザーやグループ）を明示指定します。

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
- 「Visible to」を空にすると、Internal 記事は**所有者**がアクセスできる状態になります（作成者と同一とは限らない）

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

- **顧客向け表示**（Support Portal / Computer for Your Customers）: status=published が前提。ポータルの匿名表示には Public Portal 設定も必要
- **社内の閲覧・編集・Draft でのレビュー**: Published でなくても保存・更新できる

顧客向けアクセスの判定イメージ:

```
1. status = published か？
   └─ No → RevUser からは見えない（DevUser 向け draft など）

2. access_level = private か？
   └─ Yes → デフォルト roles 無効。所有者 + shared_with の明示指定
   └─ No → 次へ

3. access_level = public か？
   └─ Yes → 記事側は匿名取得の候補。Portal 匿名表示は Public Portal 有効が別途必要
   └─ No → デフォルト roles が適用される

4. scope = internal か？
   └─ Yes → RevUser には見せない。所有者と shared_with の DevUser のみ
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

共有制限を避ける目的だけで Internal → External に変えないでください。再同期で scope が External に変わることも期待しないでください。

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
| **scope** | × | ○（create / update。Internal=1 / External=2） | 2026年7月以降は更新可。External 化で共有は解除。再同期とは別 |
| **status** | ○（公開/下書き/アーカイブ） | ○（articles.update） | 顧客向け表示には Published が必要。Draft の保存自体は可能 |

---

## 設計上の注意点

- `access_level` と `shared_with` は同時に送れません。片方を指定すると、もう片方はシステム側で合わせられます
- Internal 記事の `access_level` は利用者が指定するものではありません。システムが private にします
- private のデフォルトは**所有者**。作成者と所有者を同一視しない
- Internal の共有先は DevUser 個人、または DevUser 型グループです。RevUser 個人・RevUser 型グループは指定できません
- scope を External に変えると共有は消えます。必要な相手へ付け直してください
- API での scope 変更と AirSync 再同期での scope 更新は別物です
- Support Portal の匿名表示には Public Portal の有効化が必要です
- GUI 上では `access_level` を直接確認・変更できません（API で確認します）
- Computer AirSync 取込記事は、デフォルトでは Computer for Your Customers / Portal に出ません

---

## このページの確認範囲

| 項目 | 内容 |
|------|------|
| 確認日 | 2026年10月3日 |
| 環境 | `jp-trans-ux-test`（API） |
| 確認した操作 | Internal/External 作成、Internal への access_level 明示（拒否）、DevUser/RevUser 型グループへの共有、access_level と shared_with の同時指定（拒否）、scope のみの Internal→External 更新と共有解除、Draft→Published |
| 未確認 | 別ユーザーでの実閲覧、Support Portal の匿名表示、Agent 検索、Computer AirSync 再同期、scope と shared_with の同一リクエスト更新 |

---

## 関連リンク

- [s05: ナレッジベースとサポートポータルを構築する](/ja/s05) — KB の基本構築手順
- [s08: 管理者設定とアクセス制御](/ja/s08) — ロールと権限の全体設計
- [オブジェクト構造リファレンス](/ja/reference/architecture) — Article と Part の関係
- [公式: KB Article 作成](https://support.devrev.ai/devrev/article/ART-21914)
- [公式: Collections](https://support.devrev.ai/devrev/article/ART-21915)
