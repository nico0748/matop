export const SAMPLE_MARKDOWN = `---
title: Matop へようこそ
author: Matop チーム
date: 2026-05-26
---

**Matop** はブラウザだけで Markdown を PDF に変換できるツールです。

[[toc]]

## 1. 基本機能

- リアルタイムプレビュー
- 用紙サイズ・向き・余白の指定
- 日本語フォントの崩れない出力
- 文書はブラウザ外に出ません

## 2. テーマと表紙

設定パネルから **GitHub / 学術風 / ミニマル** など複数のテーマを選べます。
「フロントマターから表紙を生成」を有効にすると、上記の \`title\` / \`author\` / \`date\` が独立した表紙ページになります。

## 3. サンプル: コード

\`\`\`ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## 4. サンプル: 表

| 機能 | 状態 |
| --- | --- |
| 入力・編集 | ✅ |
| プレビュー | ✅ |
| PDF 出力 | ✅ |
| テーマ選択 | ✅ |
| Mermaid 図 | ✅ |

## 5. サンプル: 数式

オイラーの恒等式: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}
$$

## 6. サンプル: 脚注と定義リスト

これは脚注つきの文章[^matop]。

[^matop]: Matop は **Ma**rkdown **to** **P**df の略です。

Markdown
:   軽量マークアップ言語。
:   テキストの体裁を簡潔に記述できる。

CJK
:   日本語・中国語・韓国語などの多バイト文字。

## 7. サンプル: Mermaid 図

\`\`\`mermaid
flowchart LR
  A[Markdown] --> B[Preview]
  B --> C[PDF]
  C --> D((完成))
\`\`\`

## 8. 改ページ

\\newpage

> 右上の **PDF として出力** を押すと、ブラウザの印刷ダイアログから保存できます。
> 入力内容と設定はブラウザに自動保存され、リロード後も復元されます。
`;
