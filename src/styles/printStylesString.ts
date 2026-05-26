// Bundle the styles that must travel with the print iframe.
// Vite's `?inline` query returns the CSS as a string at build time.
import previewStyles from "./preview.css?inline";
import hljsTheme from "highlight.js/styles/github.css?inline";
import katexStyles from "katex/dist/katex.min.css?inline";
import { ALL_THEME_CSS } from "../lib/themes";

export const PRINT_STYLES = `
${previewStyles}
${hljsTheme}
${katexStyles}
${ALL_THEME_CSS}
html, body { margin: 0; padding: 0; background: white; }
.matop-print-root { max-width: none; padding: 0; }
.page-break { break-after: page; page-break-after: always; height: 0; }
.matop-print-root .table-of-contents {
  background: #fafbfc;
  border: 1px solid #e4e7eb;
  border-radius: 6px;
  padding: 16px 20px;
  margin: 0 0 1.5em;
}
.matop-print-root .table-of-contents > ul,
.matop-print-root .table-of-contents > ol {
  margin: 0;
  padding-left: 1.4em;
}
.matop-print-root .table-of-contents a { color: inherit; text-decoration: none; }
.matop-print-root .table-of-contents a:hover { text-decoration: underline; }
`;
