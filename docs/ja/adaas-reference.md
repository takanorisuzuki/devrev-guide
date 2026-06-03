---
title: "ADaaS 実装リファレンス"
description: "AirSyncコネクタ開発中に参照するチェックリスト・仕様・パターン集"
---

# ADaaS 実装リファレンス

[s15（AirSyncコネクタを自作する）](/ja/s15) の概念を学んだ後、実装中に参照するドキュメントです。

---

## エンティティスコープ

外部システムのオブジェクトには2種類のスコープがあります。ワーカーの実装方針に直結するため、最初に把握しておく必要があります。

| スコープ | 説明 | 例 |
|---------|------|-----|
| **External System Scoped** | インスタンス全体でグローバルなエンティティ。複数のSync Unitから参照される | Jiraのユーザー、Salesforceのコンタクト |
| **External Sync Unit Scoped** | 単一ワークスペース内に閉じたエンティティ | JiraのIssue、ZendeskのTicket |

**実装への影響:**

- External System Scopedなエンティティ（ユーザーなど）は、複数のSync Unitが同じデータを参照する。Object Mapperでのスコープ設定を誤ると重複登録が発生する
- External Sync Unit Scopedなエンティティは、Sync Unitをまたいで同一IDが存在しうる（例：プロジェクトAとBにそれぞれISSUE-1がある）

---

## サブタイプとカスタムフィールドの管理

### AirSyncが自動作成するサブタイプ

AirSyncは同期対象レコードに対して、以下のオブジェクトタイプにサブタイプを自動作成します:

- works, parts, conversations, articles, incidents

DevRevのストックフィールドにマップされない外部フィールドは、カスタムフィールドとして自動インポートされます。

### スキーマ変更の順序

**必ず外部システム側を先に変更し、次のSync RunでDevRevに反映させます。** DevRev側のサブタイプを手動変更すると同期対象外になります。

### マッピングからレコードタイプを削除した場合

既存データは削除されません。以降の更新（新規作成・変更）のみが停止します。

### カスタムステージのインポート

External Domain Metadataでステージダイアグラムを宣言することで、外部システムのステージをDevRevにインポートできます。

| プロパティ | 必須 | 説明 |
|-----------|------|------|
| `controlling_fields` | ✅ | ステージをエンコードする外部フィールド名（単一フィールド名を文字列で指定。配列ではない） |
| `stages` | ✅ | インポートするカスタムステージのマップ |
| `states` | - | インポートするカスタム状態のマップ |
| `all_transitions_allowed` | - | 任意ステージ間の遷移を許可するか |
| `starting_stage` | - | 新規レコードの初期ステージ |

### 動的レコードタイプ（Record Type Categories）

カスタムオブジェクトなど動的に増えるレコードタイプには **Record Type Categories** を使います。カテゴリレベルでマッピングを定義すると、そのカテゴリに属する全レコードタイプに自動適用されます。

---

## Mixins（同期済みレコードへの付加情報）

AirSyncが作成・更新したレコードには以下のMixinが自動付加されます。DevRevオブジェクトを参照・操作する際に活用できます。

| Mixin | 付加される情報 |
|-------|-------------|
| **Sync Metadata Mixin** | ソースリファレンス、オリジンシステム、Last Sync In / Last Sync Out の状態 |
| **External Source Data Mixin** | 外部システムでの Created / Updated / Closed 日時 |
| **Staged Data Mixin** | 未解決フィールド（Sync In / Sync Out） |

---

## Sync Modes リファレンス

| モード | 説明 | 抽出ロジック |
|--------|------|------------|
| `SyncMode.INITIAL` | 初回同期。全データ抽出 | `extract_from` が提供されていればそこから、なければ全データを抽出 |
| `SyncMode.INCREMENTAL` | 増分同期。前回以降の差分のみ | `reset_extract_from` が `true` なら `extract_from`、`false` なら `lastSuccessfulSyncStarted` を使用 |

外部APIが差分取得をサポートしない場合は、増分同期でもフルリフレッシュで実装して構いません（ドキュメントに明記すること）。

---

## バリデーションチェックリスト（完全版）

リリース前にすべてチェックしてください。

### Manifest

- [ ] `external_system_name` が正しく設定されている
- [ ] `is_subdomain: true` または `organization_data` で org ID が動的に決定される（ハードコードではない）
- [ ] `token_verification` が認証必須のエンドポイントを指している
- [ ] `secret_config.fields` にコードが参照する全フィールドが宣言されている
- [ ] `capabilities` に必要なケイパビリティ（`TIME_SCOPED_SYNCS` 等）が含まれている
- [ ] `loader_function` が宣言されている（extract-onlyでも必須）

### 抽出ロジック

- [ ] 全完了フラグが Sync Run 開始時にリセットされる（`StartExtractingData`）
- [ ] 増分同期で high-water mark が保持・更新される
- [ ] `adapter.isTimeout` が各ページ/バッチ処理前にチェックされている
- [ ] タイムアウト後に `repo.push()` を呼んでいない
- [ ] `onTimeout` が Progress イベント（Error や Done ではなく）を発行する
- [ ] `modified_date` がソースデータから導出されている（`new Date()` ではない）
- [ ] ページネーションカーソルが push 成功後にのみ進められる
- [ ] `extract_from` / `reset_extract_from` を正しく処理している（Time-Scoped Sync）

### ID管理

> **用語の注記**: s15では概念的に `external_org_id`（manifestで設定する値）と呼んでいます。プラットフォーム内部では `external_system_id` が正式名称で、`external_system_unique_identifier = <external_system_name>/<external_system_id>` として使われます。

- [ ] `external_system_id` が顧客インスタンスごとにユニーク
- [ ] `external_system_id` が不変（表示名やリネーム可能な値を使っていない）
- [ ] ESU の `id` が GUID や安定した識別子（表示名ではない）
- [ ] 2つの異なる顧客（DevOrgが異なる）が同じ `external_system_id` にならない
- [ ] 同一顧客内で異なるOAuthユーザーが接続した場合でも、同じ `external_system_id` になる（テナントIDはユーザーではなくインスタンスに紐づくため）

### ローディング（DR2E）

- [ ] `load-data.ts` が `LoadingDataDone` イベントを正しく発行する
- [ ] `load-attachments.ts` が `LoadingAttachmentsDone` イベントを正しく発行する
- [ ] Extract-only でも Loading 関数がクラッシュせず正常完了する

### テスト

- [ ] 初回同期が完了し、期待通りのレコードが DevRev に作成される
- [ ] 2回目の同期でデータが重複しない
- [ ] 増分同期で変更されたレコードのみ更新される
- [ ] タイムアウトからの再開でデータ損失・重複がない
- [ ] 無効なクレデンシャルで明確なエラーメッセージが表示される
- [ ] 空のレスポンス（0件）でエラーにならない
- [ ] null / 空文字 / 特殊文字 / Unicode が正しく処理される
- [ ] 大量データ（本番想定のボリューム）でテスト済み

---

## よくある失敗パターン（完全版）

| # | 失敗 | 影響 | 対策 |
|---|------|------|------|
| 1 | `external_system_id` をハードコード | 顧客間でデータ重複 | 外部APIから動的に取得する |
| 2 | 変更可能な値を `external_system_id` に使用 | リネーム時にデータ重複 | GUID等の不変IDを使用 |
| 3 | Sync Run間で完了フラグをリセットしない | 2回目以降のSyncが何も抽出しない | `StartExtractingData` で必ずリセット |
| 4 | `token_verification` がパブリックエンドポイント | 無効なクレデンシャルが検出されない | 認証必須のエンドポイントを使用 |
| 5 | `modified_date` に `new Date()` を使用 | 毎回全レコードが「変更あり」と判定される | ソースデータのタイムスタンプを使用 |
| 6 | `secret_config.fields` に宣言漏れ | ユーザーがUIでクレデンシャルを入力できない | コードが読む全フィールドを宣言 |
| 7 | リトライのバックオフ合計がLambda予算超過 | タイムアウト中のsleep、データ損失の可能性 | 最大合計待ち時間を計算して制限 |
| 8 | `onTimeout` で Error イベントを発行 | 再開可能なタイムアウトが致命的エラーになる | 必ず Progress イベントを発行 |
| 9 | `_dev_external_system_type` が空 | システム識別子の一部が欠落 | IDMファイルに正しい値を設定 |
| 10 | ESUの `id` に表示名を使用 | リソースリネーム時にIDが変わる | GUIDや安定した識別子を使用 |
