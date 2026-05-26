export type ThemeId = "default" | "github" | "academic" | "minimal";

export interface Theme {
  id: ThemeId;
  label: string;
  /** CSS scoped under `.matop-print-root.theme-<id>`. */
  css: string;
}

const GITHUB_THEME = `
.matop-print-root.theme-github {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans",
    "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, "Noto Sans JP",
    "Helvetica Neue", Arial, sans-serif;
  color: #1f2328;
}
.matop-print-root.theme-github h1 { border-bottom: 1px solid #d0d7de; }
.matop-print-root.theme-github h2 { border-bottom: 1px solid #d0d7de; }
.matop-print-root.theme-github table th { background: #f6f8fa; }
.matop-print-root.theme-github code { background: rgba(175,184,193,0.2); }
.matop-print-root.theme-github pre { background: #f6f8fa; }
.matop-print-root.theme-github blockquote { color: #57606a; border-left-color: #d0d7de; }
`;

const ACADEMIC_THEME = `
.matop-print-root.theme-academic {
  font-family: "Times New Roman", "Hiragino Mincho ProN", "Yu Mincho", "MS Mincho", serif;
  font-size: 11pt;
  line-height: 1.8;
  color: #111;
}
.matop-print-root.theme-academic h1 {
  text-align: center;
  font-size: 1.7em;
  border-bottom: 0;
  margin: 0.4em 0 1em;
}
.matop-print-root.theme-academic h2 {
  font-size: 1.25em;
  border-bottom: 0;
  border-left: 4px solid #444;
  padding-left: 0.5em;
}
.matop-print-root.theme-academic h3 { font-size: 1.1em; }
.matop-print-root.theme-academic blockquote {
  font-style: italic;
  color: #333;
  border-left: 3px solid #888;
}
.matop-print-root.theme-academic table th,
.matop-print-root.theme-academic table td {
  border: 1px solid #444;
}
.matop-print-root.theme-academic p { text-indent: 1em; }
.matop-print-root.theme-academic ul,
.matop-print-root.theme-academic ol,
.matop-print-root.theme-academic pre,
.matop-print-root.theme-academic blockquote,
.matop-print-root.theme-academic table { text-indent: 0; }
`;

const MINIMAL_THEME = `
.matop-print-root.theme-minimal {
  font-family:
    -apple-system, "Helvetica Neue", "Hiragino Sans", "Yu Gothic", sans-serif;
  color: #222;
  line-height: 1.7;
}
.matop-print-root.theme-minimal h1,
.matop-print-root.theme-minimal h2,
.matop-print-root.theme-minimal h3,
.matop-print-root.theme-minimal h4 {
  border: 0;
  font-weight: 600;
}
.matop-print-root.theme-minimal pre {
  background: #fafafa;
  border: 1px solid #eee;
}
.matop-print-root.theme-minimal table th,
.matop-print-root.theme-minimal table td {
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}
.matop-print-root.theme-minimal table th { background: transparent; }
.matop-print-root.theme-minimal blockquote {
  border-left: 2px solid #ccc;
  color: #555;
}
`;

const DEFAULT_THEME = `
/* Default theme inherits the base preview styles in src/styles/preview.css */
.matop-print-root.theme-default { }
`;

export const THEMES: Theme[] = [
  { id: "default", label: "標準", css: DEFAULT_THEME },
  { id: "github", label: "GitHub 風", css: GITHUB_THEME },
  { id: "academic", label: "学術風", css: ACADEMIC_THEME },
  { id: "minimal", label: "ミニマル", css: MINIMAL_THEME },
];

export const ALL_THEME_CSS: string = THEMES.map((t) => t.css).join("\n");
