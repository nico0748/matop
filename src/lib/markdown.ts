import MarkdownIt from "markdown-it";
import type StateCore from "markdown-it/lib/rules_core/state_core.mjs";
import hljs from "highlight.js/lib/common";
import DOMPurify from "dompurify";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&#39;";
    }
  });
}

const md: MarkdownIt = new MarkdownIt({
  html: false,
  xhtmlOut: false,
  breaks: false,
  linkify: true,
  typographer: false,
  highlight(code: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const result = hljs.highlight(code, { language: lang, ignoreIllegals: true });
        return `<pre class="hljs"><code class="language-${lang}">${result.value}</code></pre>`;
      } catch {
        /* fall through to escaped raw */
      }
    }
    return `<pre class="hljs"><code>${escapeHtml(code)}</code></pre>`;
  },
});

md.enable(["table", "strikethrough"]);

md.core.ruler.after("inline", "task-lists", (state: StateCore): boolean => {
  const tokens = state.tokens;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "inline" || !token.children) continue;
    const first = token.children[0];
    if (!first || first.type !== "text") continue;
    const m = first.content.match(/^\[([ xX])\]\s+(.*)$/);
    if (!m) continue;
    const liOpen = tokens[i - 2];
    if (!liOpen || liOpen.type !== "list_item_open") continue;
    liOpen.attrJoin("class", "task-list-item");
    const checked = m[1].toLowerCase() === "x";
    first.content = m[2];
    const checkbox = new state.Token("html_inline", "", 0);
    checkbox.content = `<input type="checkbox" disabled${checked ? " checked" : ""}> `;
    token.children.unshift(checkbox);
  }
  return false;
});

export function renderMarkdown(source: string): string {
  const raw = md.render(source);
  return DOMPurify.sanitize(raw, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
}
