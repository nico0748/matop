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

## ロードマップ

詳細は [docs/requirements.md](./docs/requirements.md) を参照。

- 第1フェーズ (MVP) — 入力・プレビュー・基本PDF出力 ✅ 本リポジトリ
- 第2フェーズ — テーマ選択、ヘッダー/フッター、目次、数式、フロントマター
- 第3フェーズ — Mermaid 図、カスタムCSS、表紙生成、多言語UI、サーバー側変換オプション

## ライセンス

Apache-2.0
