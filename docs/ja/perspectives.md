---
title: "The Book of DevRev（Perspectives）リファレンス"
description: "AI Trifecta / Being AI-native / Essential Methodology を、このコース（s01–s14）と対応づけて要約する"
---

# The Book of DevRev（Perspectives）リファレンス

このページは、The Book of DevRev の `Perspectives`（視点）にある考え方を、**このガイド内で**参照できるように要点だけまとめたリファレンスである。

初見の方は、まずここだけ押さえておけば十分。

- **このページでわかること**: AIネイティブの捉え方／AI Trifecta（Search・Analytics・Workflows）／Essential Methodology の要点
- **おすすめの読み方**: 先にこのページで「地図」を掴み、各セッション（s01/s09/s10/s14）で具体に落とす

## Being AI-native（AIネイティブであること）

要点は「**AIは後付け（bolted-on）ではなく、組み込み（built-in）であるべき**」という主張である。クラウド移行が lift-and-shift できなかったのと同様に、既存アプリへ生成AIを“貼り付ける”だけでは限界が出やすい。

- **リアルタイム介入**: 人間のキーストローク速度で介入するための設計が必要
  - **Discern**: 分類・理解（クラスタリング、分類、入力補完など）
  - **Deflect**: 推奨・ルーティング・要約（人手を介さず前段で捌く）
  - **Deduplicate**: 重複の検出と統合（統合後の出自/provenance を保つ）
- **自然言語インターフェース**: text-to-SQL / text-to-visualization / text-to-API など「text2<*>」文化を前提に UX を作り直す
- **意味検索とボット**: ドキュメントやKBを継続クロール・索引化し、チャット（Slack/Teams）中心から“探して答える”中心へ寄せる。ボットは自然言語の意図を deterministic なワークフローに接続する
## The AI Trifecta（AIの三位一体）

The Book of DevRev では、AI時代の中核サービスを **Search / Analytics / Workflows** の3つに整理している。これは「モデルが賢いか」より手前の、**データと行動（実行）をどう束ねるか**の設計軸として使える。

- **Search**: 必要な情報に素早く辿りつき、根拠に沿って答える
- **Analytics**: 現状把握・予兆検知・意思決定を支える（指標、SQL、可視化など）
- **Workflows**: 条件に応じて行動を起こし、統制された自動化へつなぐ
## The Essential Methodology（Essentialの方法論）

スローガンは **Less but better（少なく、しかしより良く）**。ポスト・パンデミック以降の“忙しいだけの仕事”を見直し、目的と喜びを取り戻すための考え方として提示されている。

本文では特に、ビジネスにおける「Power of Three」を強調する。

- **customer-centric**（顧客）
- **product-led**（プロダクト）
- **AI-native**（AI）
プロセス（会議、メール、チャンネル、ダッシュボード…）が目的化しがちな現状に対し、「本質に集中する」ことを組織の規律として提案している。

## このコース内での対応（おすすめの読み方）

このリファレンスは “このコースの地図” として使うのが一番価値が高い。

- **AI Trifecta ↔ コース**
  - **Search**: [s01](/ja/s01)（Computer/Memoryと、記録に沿った回答の土台）
  - **Analytics**: [s09](/ja/s09)
  - **Workflows**: [s10](/ja/s10)
- **Being AI-native ↔ コース**
  - Discern/Deflect/Deduplicate の“行動”イメージは [s14](/ja/s14) のエージェント設計にも繋がる
  - 「組み込みで設計する」前提は [s01](/ja/s01) の “AIネイティブ” の説明を補強する

## 出典

- `https://thebook.devrev.ai/perspectives/`
- `https://thebook.devrev.ai/perspectives/ai-native/`
- `https://thebook.devrev.ai/ai-trifecta/`
- `https://thebook.devrev.ai/essentialism/`
