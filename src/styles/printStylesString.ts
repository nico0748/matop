// Bundle the styles that must travel with the print iframe.
// Vite's `?inline` query returns the CSS as a string at build time.
import previewStyles from "./preview.css?inline";
import hljsTheme from "highlight.js/styles/github.css?inline";

export const PRINT_STYLES = `
${previewStyles}
${hljsTheme}
html, body { margin: 0; padding: 0; background: white; }
.matop-print-root { max-width: none; padding: 0; }
`;
