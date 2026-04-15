[English](./README.md) | 日本語

# DevRev Guide

DevRev公式情報をもとにした学習サイト。14セッションでDevRevの基礎から開発者向け拡張まで体系的に学ぶ。

## セッション構成

| レイヤー | セッション | レベル |
|---------|----------|-------|
| DevRev基礎 | s01-s03 | 初級 |
| プラットフォーム活用 | s04-s09 | 初級 / 中級 |
| 開発者・拡張 | s10-s14 | 中級 / 上級 |

## 開発環境

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認。

コンテンツは `docs/en/`（英語）と `docs/ja/`（日本語）に格納。各セッションはMarkdownファイルでfrontmatter（`title`・`level`・`duration`）を持つ。

## 技術スタック

| レイヤー | ツール |
|---------|--------|
| コースサイト | Next.js 16 + Tailwind CSS |
| ホスティング | Vercel |
