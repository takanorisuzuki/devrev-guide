@AGENTS.md

# devrev-guide

DevRev 製品ガイドの Next.js サイト。Markdown ドキュメントを静的サイトとして配信する。
`devrev-presales` プロジェクトから `docs/ja/` 以下のセッション資料を参照用に読み込む。

## Tech Stack

- Next.js 16 (App Router)、React 19、TypeScript、Tailwind CSS v4
- gray-matter、remark、remark-gfm（Markdown → HTML）
- Mermaid、Vercel Analytics

## Commands

```bash
npm run dev    # 開発サーバー起動（http://localhost:3000）
npm run build  # 本番ビルド
npm run lint   # ESLint
```

## Structure

- `src/app/` — ページ・レイアウト
- `src/components/` — 共有コンポーネント
- `src/lib/` — ユーティリティ
- `src/data/references.ts` — リファレンスページの登録（`REFERENCES` 配列に追加するとサイドバーとルーティングに自動反映）
- `docs/ja/` — 日本語セッション資料（`s*.md`）＋その他記事
- `docs/en/` — 英語ソース資料

## Notes

- テストスイートなし。変更後は `npm run build` と `npm run lint` で確認

## リファレンスページの追加手順

1. `docs/ja/<slug>.md` と `docs/en/<slug>.md` を両方作成する（片方だけだとビルドが404）
2. `src/data/references.ts` の `REFERENCES` 配列にエントリを追加する
3. リンクテキストはファイル名でなく正式名称を使う（例: `オブジェクト構造リファレンス`）

## ドキュメント内リンクのルール

- リファレンスへのリンクパスは `/ja/reference/<slug>` 形式（`/ja/<slug>` は404になる）
- セッションへのリンクは `/ja/s01` 形式（`/reference/` 不要）

## 日英ドキュメントの使い分け

- `docs/ja/` は日本市場向け。日本固有の要件（個情法・ISMAP・FISC・J-SOX等）を記載してよい
- `docs/en/` はグローバル向け。日本固有の規制・Q&A・表現は入れない。GDPR/HIPAA/SOX等の国際標準を使う
- 単純翻訳ではなく、対象読者に合わせて内容を変える
