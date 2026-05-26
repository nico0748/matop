import { useT } from "../i18n/LocaleContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: Props) {
  const t = useT();
  if (!open) return null;
  return (
    <div className="help-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <header className="help-modal__header">
          <h2>{t.helpTitle}</h2>
          <button type="button" className="help-modal__close" onClick={onClose} aria-label={t.settingsClose}>
            ×
          </button>
        </header>

        <div className="help-modal__body">
          <h3>{t.helpStandard}</h3>
          <pre>{`# H1
## H2

**bold** / *italic* / ~~strike~~ / \`code\`

- bullet
- [x] task

> quote

\`\`\`ts
const x: number = 42;
\`\`\`

| col | col |
| --- | --- |
| a | b |

[link](https://example.com)
![img](path.png)`}</pre>

          <h3>{t.helpExtensions}</h3>

          <h4>{t.helpFrontmatter}</h4>
          <pre>{`---
title: Monthly report
author: Jane Doe
date: 2026-05-26
---`}</pre>

          <h4>{t.helpToc}</h4>
          <p>{t.helpTocBody}</p>

          <h4>{t.helpMath}</h4>
          <pre>{`inline: $e^{i\\pi} + 1 = 0$
block:
$$ \\int_0^1 x^2 \\, dx = \\frac{1}{3} $$`}</pre>

          <h4>{t.helpPageBreak}</h4>
          <p>{t.helpPageBreakBody}</p>

          <h4>{t.helpFootnote}</h4>
          <pre>{`This has a footnote[^1].

[^1]: The footnote body.

term
:   definition
:   another definition`}</pre>

          <h4>{t.helpMermaid}</h4>
          <pre>{`\`\`\`mermaid
flowchart LR
  A --> B
  B --> C
\`\`\``}</pre>

          <h3>{t.helpOutput}</h3>
          <p>{t.helpOutputBody}</p>

          <h3>{t.helpPrivacy}</h3>
          <p>{t.helpPrivacyBody}</p>
        </div>
      </div>
    </div>
  );
}
