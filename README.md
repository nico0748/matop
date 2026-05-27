# Matop — Markdown to PDF

ブラウザ上で Markdown を記述・プレビューし、テーマやページ設定を選んでワンクリックで PDF を生成・ダウンロードできるWebアプリケーション。日本語フォントの埋め込みに対応し、文書を保持しないプライバシー重視の設計です。

> Matop — a privacy-friendly web app that turns Markdown into clean, print-ready PDFs right in your browser, with live preview, themes, and full CJK font support.

## 特徴

- **インストール不要・アカウント不要**でブラウザだけで完結
- **リアルタイムプレビュー**: 左にエディタ、右に整形済み表示
- **CommonMark + GFM**: 表・タスクリスト・打ち消し線・自動リンク
- **コードハイライト**: highlight.js による言語別ハイライト
- **CJK対応**: OS のフォントを利用するため日本語が崩れない
- **プライバシー優先**: 文書はブラウザ外に一切送信されない（クライアント側変換）
- **用紙サイズ・向き・余白**を選択可能（A4 / A3 / B5 / Letter / Legal）

## 開発

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 本番ビルド
npm run typecheck # 型チェック
```

## 仕組み

MVP は完全クライアント側で動作します。Markdown は `markdown-it` で HTML に変換し、`DOMPurify` でサニタイズ後にプレビュー表示します。PDF 出力は専用の `<iframe>` に印刷用 CSS（`@page` でサイズ・向き・余白を指定）を流し込み、ブラウザのネイティブ印刷ダイアログから「PDF として保存」する方式を採ります。これにより、

- 文書はブラウザ外に出ません
- 本文テキストは選択・検索可能のまま PDF 化されます
- CJK フォントは OS のフォントが使われるため崩れません

## 追加機能 (第2フェーズ)

- **テーマ選択** (標準 / GitHub / 学術風 / ミニマル)
- **YAML フロントマター** (title / author / date)
- **目次自動生成** (`[[toc]]` マーカー)
- **LaTeX 数式** (`$inline$` / `$$block$$`) — KaTeX 描画
- **改ページ制御** (`\\newpage` または `\\pagebreak` を単独行で)
- **ページ番号・ヘッダー・フッター** (`@page` マージンボックス)

## 追加機能 (第3フェーズ)

- **Mermaid ダイアグラム** (\`\`\`mermaid フェンスで SVG 描画、動的インポートで軽量)
- **表紙ページ生成** (フロントマター title/author/date から独立した表紙ページ)
- **カスタム CSS** (設定パネルから任意の CSS を適用)
- **脚注・定義リスト** (markdown-it-footnote / markdown-it-deflist)
- **ヘルプ/記法ガイド** (ツールバーの「? ヘルプ」から Matop 拡張記法を含むチートシート)
- **下書きの自動保存** (localStorage に入力と設定を保存、リロード後に復元)

## 追加機能 (第4フェーズ)

- **CodeMirror エディタ** (FR-04) — 行番号、Markdown シンタックスハイライト、Undo/Redo、行折り返し
- **フォーマット用ツールバー** — 太字 / 斜体 / 見出し / リスト / リンク / 画像 / 表 / コードブロック / 改ページ / TOC / 数式 / Mermaid の挿入ボタン
- **多言語UI** (FR-28) — 日本語 / 英語の切替。ブラウザの言語設定から初期値を検出、選択は下書きと一緒に localStorage に保存

## ロードマップ

詳細は [docs/requirements.md](./docs/requirements.md) を参照。

- 第1フェーズ (MVP) — 入力・プレビュー・基本PDF出力 ✅
- 第2フェーズ — テーマ / ヘッダー/フッター / 目次 / 数式 / フロントマター / 改ページ ✅
- 第3フェーズ — Mermaid / 表紙 / カスタムCSS / 脚注・定義リスト / 下書き保存 / ヘルプ ✅
- 第4フェーズ — CodeMirror エディタ / フォーマットツールバー / 多言語UI ✅
- 今後 — サーバー側変換オプション (要件書 §11)

## ライセンス

Apache-2.0
