interface Props {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="help-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <header className="help-modal__header">
          <h2>Matop 記法ガイド</h2>
          <button type="button" className="help-modal__close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </header>

        <div className="help-modal__body">
          <h3>標準 Markdown</h3>
          <pre>{`# 見出し1
## 見出し2

**太字** / *斜体* / ~~打消し~~ / \`code\`

- 箇条書き
- [x] チェックリスト

> 引用

\`\`\`ts
const x: number = 42;
\`\`\`

| 表 | のヘッダ |
| --- | --- |
| a | b |

[リンク](https://example.com)
![画像](path.png)`}</pre>

          <h3>Matop 拡張記法</h3>

          <h4>フロントマター（題名・著者・日付）</h4>
          <pre>{`---
title: 月次レポート
author: 山田 太郎
date: 2026-05-26
---`}</pre>

          <h4>目次</h4>
          <p>本文中に <code>[[toc]]</code> と記述すると、その位置に見出しから目次を生成します。</p>

          <h4>数式（KaTeX）</h4>
          <pre>{`インライン: $e^{i\\pi} + 1 = 0$
ブロック:
$$ \\int_0^1 x^2 \\, dx = \\frac{1}{3} $$`}</pre>

          <h4>改ページ</h4>
          <p>単独行に <code>\newpage</code> または <code>\pagebreak</code> を書くと、PDF でその位置で改ページします。</p>

          <h4>脚注 / 定義リスト</h4>
          <pre>{`これは脚注つき[^1]。

[^1]: 脚注の本文。

用語
:   定義
:   別の定義`}</pre>

          <h4>Mermaid 図</h4>
          <pre>{`\`\`\`mermaid
flowchart LR
  A --> B
  B --> C
\`\`\``}</pre>

          <h3>出力設定</h3>
          <p>
            設定パネルから用紙サイズ・向き・余白・テーマ・ヘッダー/フッター・ページ番号・表紙生成・カスタム CSS を指定できます。
          </p>

          <h3>プライバシー</h3>
          <p>
            すべての変換はブラウザ内で行われ、文書がサーバーに送信されることはありません。
            下書きはブラウザのローカルストレージに自動保存され、ツールバーの「下書き消去」で削除できます。
          </p>
        </div>
      </div>
    </div>
  );
}
