import type { FrontMatter } from "./frontmatter";

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

/**
 * Build a cover page from frontmatter. Returns an empty string if there
 * is no title to anchor the cover on.
 */
export function buildCoverPage(data: FrontMatter): string {
  if (!data.title) return "";
  const parts: string[] = [];
  parts.push(`<h1 class="matop-cover__title">${escapeHtml(data.title)}</h1>`);
  if (data.author) parts.push(`<p class="matop-cover__author">${escapeHtml(data.author)}</p>`);
  if (data.date) parts.push(`<p class="matop-cover__date">${escapeHtml(data.date)}</p>`);
  return `<section class="matop-cover">${parts.join("")}</section><div class="page-break" aria-hidden="true"></div>`;
}
