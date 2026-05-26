export type Locale = "ja" | "en";

export const LOCALES: { id: Locale; label: string }[] = [
  { id: "ja", label: "日本語" },
  { id: "en", label: "English" },
];

export interface Messages {
  // Toolbar
  toolbarSubtitle: string;
  openFile: string;
  sample: string;
  clear: string;
  clearDraft: string;
  clearDraftTitle: string;
  help: string;
  settings: string;
  exportPdf: string;
  exportPdfBusy: string;

  // Editor / formatting toolbar
  editorPlaceholder: string;
  fmtBold: string;
  fmtItalic: string;
  fmtStrike: string;
  fmtCode: string;
  fmtCodeBlock: string;
  fmtH1: string;
  fmtH2: string;
  fmtH3: string;
  fmtQuote: string;
  fmtUl: string;
  fmtOl: string;
  fmtTask: string;
  fmtLink: string;
  fmtImage: string;
  fmtTable: string;
  fmtHr: string;
  fmtPageBreak: string;
  fmtToc: string;
  fmtMath: string;
  fmtMermaid: string;

  // Settings panel
  settingsTitle: string;
  settingsClose: string;
  theme: string;
  paperSize: string;
  orientation: string;
  portrait: string;
  landscape: string;
  margins: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  marginUnitsHint: string;
  headerFooter: string;
  showPageNumbers: string;
  headerCenter: string;
  footerCenter: string;
  headerExample: string;
  footerExample: string;
  headerFooterHint: string;
  coverPage: string;
  coverPageToggle: string;
  coverPageHint: string;
  customCss: string;
  customCssExample: string;
  customCssHint: string;
  fileName: string;
  fileNameHint: string;

  // Help modal
  helpTitle: string;
  helpStandard: string;
  helpExtensions: string;
  helpFrontmatter: string;
  helpToc: string;
  helpTocBody: string;
  helpMath: string;
  helpPageBreak: string;
  helpPageBreakBody: string;
  helpFootnote: string;
  helpMermaid: string;
  helpOutput: string;
  helpOutputBody: string;
  helpPrivacy: string;
  helpPrivacyBody: string;

  // Notices
  filetypeError: string;
  filesizeError: (mb: number) => string;
  fileLoaded: (name: string) => string;
  fileLoadFailed: string;
  previewError: (msg: string) => string;
  exportError: (msg: string) => string;
  previewUnavailable: string;
  draftRestored: string;
  draftCleared: string;

  // Theme labels
  themeDefault: string;
  themeGithub: string;
  themeAcademic: string;
  themeMinimal: string;

  // Footer
  footerCaption: string;

  // Language toggle
  language: string;
}

const ja: Messages = {
  toolbarSubtitle: "Markdown → PDF",
  openFile: "ファイルを開く",
  sample: "サンプル",
  clear: "クリア",
  clearDraft: "下書き消去",
  clearDraftTitle: "ブラウザに保存された下書きを削除",
  help: "? ヘルプ",
  settings: "⚙ 設定",
  exportPdf: "PDF として出力",
  exportPdfBusy: "生成中…",

  editorPlaceholder: "ここに Markdown を入力、または .md ファイルをドロップしてください…",
  fmtBold: "太字",
  fmtItalic: "斜体",
  fmtStrike: "打消し",
  fmtCode: "コード",
  fmtCodeBlock: "コードブロック",
  fmtH1: "見出し1",
  fmtH2: "見出し2",
  fmtH3: "見出し3",
  fmtQuote: "引用",
  fmtUl: "箇条書き",
  fmtOl: "番号付き",
  fmtTask: "チェックリスト",
  fmtLink: "リンク",
  fmtImage: "画像",
  fmtTable: "表",
  fmtHr: "区切り線",
  fmtPageBreak: "改ページ",
  fmtToc: "目次",
  fmtMath: "数式",
  fmtMermaid: "Mermaid 図",

  settingsTitle: "出力設定",
  settingsClose: "閉じる",
  theme: "テーマ",
  paperSize: "用紙サイズ",
  orientation: "向き",
  portrait: "縦",
  landscape: "横",
  margins: "余白",
  marginTop: "上",
  marginRight: "右",
  marginBottom: "下",
  marginLeft: "左",
  marginUnitsHint: "単位は mm / cm / in / pt が使えます。例: 20mm",
  headerFooter: "ヘッダー / フッター",
  showPageNumbers: "ページ番号を表示",
  headerCenter: "ヘッダー（中央）",
  footerCenter: "フッター（中央）",
  headerExample: "（例）社外秘",
  footerExample: "（例）© 2026 Matop",
  headerFooterHint:
    "ブラウザによってはヘッダー/フッターの表示位置・書式が異なる場合があります。",
  coverPage: "表紙",
  coverPageToggle: "フロントマターから表紙を生成",
  coverPageHint:
    "文書冒頭の YAML フロントマター（title / author / date）が表紙として独立ページに表示されます。",
  customCss: "カスタム CSS",
  customCssExample: "例: .matop-print-root h1 { color: navy; }",
  customCssHint:
    "プレビューと PDF の双方に適用されます。`.matop-print-root` 配下にスコープすると安全です。",
  fileName: "ファイル名",
  fileNameHint:
    "最終的なファイル名は、表示される印刷ダイアログで保存時に指定します（ブラウザの仕様）。",

  helpTitle: "Matop 記法ガイド",
  helpStandard: "標準 Markdown",
  helpExtensions: "Matop 拡張記法",
  helpFrontmatter: "フロントマター（題名・著者・日付）",
  helpToc: "目次",
  helpTocBody:
    "本文中に [[toc]] と記述すると、その位置に見出しから目次を生成します。",
  helpMath: "数式（KaTeX）",
  helpPageBreak: "改ページ",
  helpPageBreakBody:
    "単独行に \\newpage または \\pagebreak を書くと、PDF でその位置で改ページします。",
  helpFootnote: "脚注 / 定義リスト",
  helpMermaid: "Mermaid 図",
  helpOutput: "出力設定",
  helpOutputBody:
    "設定パネルから用紙サイズ・向き・余白・テーマ・ヘッダー/フッター・ページ番号・表紙生成・カスタム CSS を指定できます。",
  helpPrivacy: "プライバシー",
  helpPrivacyBody:
    "すべての変換はブラウザ内で行われ、文書がサーバーに送信されることはありません。下書きはブラウザのローカルストレージに自動保存され、ツールバーの「下書き消去」で削除できます。",

  filetypeError: ".md / .markdown / .txt のテキストファイルのみ読み込めます。",
  filesizeError: (mb) => `ファイルが大きすぎます（上限 ${mb} MB）。`,
  fileLoaded: (name) => `${name} を読み込みました。`,
  fileLoadFailed: "ファイルの読み込みに失敗しました。",
  previewError: (msg) => `プレビューの生成に失敗しました: ${msg}`,
  exportError: (msg) => `PDF 出力に失敗しました: ${msg}`,
  previewUnavailable: "プレビューが利用できません。",
  draftRestored: "前回の下書きを復元しました。",
  draftCleared: "ブラウザに保存された下書きを削除しました。",

  themeDefault: "標準",
  themeGithub: "GitHub 風",
  themeAcademic: "学術風",
  themeMinimal: "ミニマル",

  footerCaption: "Matop — Markdown to PDF · 文書はブラウザ外に送信されません",

  language: "言語",
};

const en: Messages = {
  toolbarSubtitle: "Markdown → PDF",
  openFile: "Open file",
  sample: "Sample",
  clear: "Clear",
  clearDraft: "Clear draft",
  clearDraftTitle: "Remove the draft saved in your browser",
  help: "? Help",
  settings: "⚙ Settings",
  exportPdf: "Export PDF",
  exportPdfBusy: "Generating…",

  editorPlaceholder: "Type Markdown here, or drop a .md file…",
  fmtBold: "Bold",
  fmtItalic: "Italic",
  fmtStrike: "Strike",
  fmtCode: "Code",
  fmtCodeBlock: "Code block",
  fmtH1: "H1",
  fmtH2: "H2",
  fmtH3: "H3",
  fmtQuote: "Quote",
  fmtUl: "Bulleted",
  fmtOl: "Numbered",
  fmtTask: "Task list",
  fmtLink: "Link",
  fmtImage: "Image",
  fmtTable: "Table",
  fmtHr: "Divider",
  fmtPageBreak: "Page break",
  fmtToc: "TOC",
  fmtMath: "Math",
  fmtMermaid: "Mermaid",

  settingsTitle: "Output settings",
  settingsClose: "Close",
  theme: "Theme",
  paperSize: "Paper size",
  orientation: "Orientation",
  portrait: "Portrait",
  landscape: "Landscape",
  margins: "Margins",
  marginTop: "Top",
  marginRight: "Right",
  marginBottom: "Bottom",
  marginLeft: "Left",
  marginUnitsHint: "Units mm / cm / in / pt are supported. Example: 20mm.",
  headerFooter: "Header / Footer",
  showPageNumbers: "Show page numbers",
  headerCenter: "Header (center)",
  footerCenter: "Footer (center)",
  headerExample: "e.g. Confidential",
  footerExample: "e.g. © 2026 Matop",
  headerFooterHint:
    "Header/footer placement and formatting may vary slightly between browsers.",
  coverPage: "Cover page",
  coverPageToggle: "Generate a cover page from frontmatter",
  coverPageHint:
    "If the document starts with YAML frontmatter (title / author / date), a standalone cover page is rendered.",
  customCss: "Custom CSS",
  customCssExample: "e.g. .matop-print-root h1 { color: navy; }",
  customCssHint:
    "Applied to both the preview and the PDF. Scope under `.matop-print-root` for safety.",
  fileName: "File name",
  fileNameHint:
    "The actual file name is chosen in the print dialog at save time (browser behavior).",

  helpTitle: "Matop syntax guide",
  helpStandard: "Standard Markdown",
  helpExtensions: "Matop extensions",
  helpFrontmatter: "Frontmatter (title / author / date)",
  helpToc: "Table of contents",
  helpTocBody:
    "Write [[toc]] in the body to insert an auto-generated table of contents at that position.",
  helpMath: "Math (KaTeX)",
  helpPageBreak: "Page break",
  helpPageBreakBody:
    "A standalone line containing \\newpage or \\pagebreak forces a page break in the PDF.",
  helpFootnote: "Footnotes / definition lists",
  helpMermaid: "Mermaid diagrams",
  helpOutput: "Output settings",
  helpOutputBody:
    "Use the settings panel to control paper size, orientation, margins, theme, header/footer, page numbers, cover page, and custom CSS.",
  helpPrivacy: "Privacy",
  helpPrivacyBody:
    "All conversion happens locally in your browser; documents are never uploaded. Drafts are autosaved to localStorage and can be removed via the toolbar's \"Clear draft\" button.",

  filetypeError: "Only .md / .markdown / .txt text files can be loaded.",
  filesizeError: (mb) => `File is too large (limit ${mb} MB).`,
  fileLoaded: (name) => `Loaded ${name}.`,
  fileLoadFailed: "Failed to read the file.",
  previewError: (msg) => `Preview generation failed: ${msg}`,
  exportError: (msg) => `PDF export failed: ${msg}`,
  previewUnavailable: "Preview is unavailable.",
  draftRestored: "Previous draft restored.",
  draftCleared: "Cleared the draft saved in your browser.",

  themeDefault: "Default",
  themeGithub: "GitHub",
  themeAcademic: "Academic",
  themeMinimal: "Minimal",

  footerCaption: "Matop — Markdown to PDF · documents stay in your browser",

  language: "Language",
};

export const MESSAGES: Record<Locale, Messages> = { ja, en };

export function detectInitialLocale(): Locale {
  if (typeof navigator === "undefined") return "ja";
  const lang = (navigator.language || "").toLowerCase();
  return lang.startsWith("ja") ? "ja" : "en";
}
