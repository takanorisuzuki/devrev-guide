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
- `docs/ja/` — 日本語セッション資料（`s*.md`）＋その他記事
- `docs/en/` — 英語ソース資料

## Notes

- テストスイートなし。変更後は `npm run build` と `npm run lint` で確認
