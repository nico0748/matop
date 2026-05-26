import { useT } from "../i18n/LocaleContext";

export type FormatAction =
  | { kind: "wrap"; before: string; after: string }
  | { kind: "prefix"; prefix: string }
  | { kind: "block"; text: string };

interface Props {
  onAction: (action: FormatAction) => void;
}

interface ButtonSpec {
  label: string;
  title: string;
  action: FormatAction;
}

export function FormattingToolbar({ onAction }: Props) {
  const t = useT();

  const buttons: ButtonSpec[] = [
    { label: "B", title: t.fmtBold, action: { kind: "wrap", before: "**", after: "**" } },
    { label: "I", title: t.fmtItalic, action: { kind: "wrap", before: "*", after: "*" } },
    { label: "S", title: t.fmtStrike, action: { kind: "wrap", before: "~~", after: "~~" } },
    { label: "</>", title: t.fmtCode, action: { kind: "wrap", before: "`", after: "`" } },
    { label: "H1", title: t.fmtH1, action: { kind: "prefix", prefix: "# " } },
    { label: "H2", title: t.fmtH2, action: { kind: "prefix", prefix: "## " } },
    { label: "H3", title: t.fmtH3, action: { kind: "prefix", prefix: "### " } },
    { label: "“ ”", title: t.fmtQuote, action: { kind: "prefix", prefix: "> " } },
    { label: "•", title: t.fmtUl, action: { kind: "prefix", prefix: "- " } },
    { label: "1.", title: t.fmtOl, action: { kind: "prefix", prefix: "1. " } },
    { label: "☑", title: t.fmtTask, action: { kind: "prefix", prefix: "- [ ] " } },
    { label: "🔗", title: t.fmtLink, action: { kind: "wrap", before: "[", after: "](https://)" } },
    { label: "🖼", title: t.fmtImage, action: { kind: "wrap", before: "![alt](", after: ")" } },
    {
      label: "▦",
      title: t.fmtTable,
      action: {
        kind: "block",
        text: "| Header | Header |\n| --- | --- |\n| Cell | Cell |",
      },
    },
    {
      label: "```",
      title: t.fmtCodeBlock,
      action: { kind: "block", text: "```\ncode\n```" },
    },
    { label: "—", title: t.fmtHr, action: { kind: "block", text: "---" } },
    { label: "↵", title: t.fmtPageBreak, action: { kind: "block", text: "\\newpage" } },
    { label: "TOC", title: t.fmtToc, action: { kind: "block", text: "[[toc]]" } },
    { label: "Σ", title: t.fmtMath, action: { kind: "wrap", before: "$$\n", after: "\n$$" } },
    {
      label: "M",
      title: t.fmtMermaid,
      action: {
        kind: "block",
        text: "```mermaid\nflowchart LR\n  A --> B\n```",
      },
    },
  ];

  return (
    <div className="fmt-toolbar" role="toolbar" aria-label="Formatting toolbar">
      {buttons.map((b) => (
        <button
          key={b.title}
          type="button"
          className="fmt-toolbar__btn"
          title={b.title}
          onClick={() => onAction(b.action)}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
