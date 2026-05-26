import type { OutputSettings } from "../types";

// Convert margin string (e.g. "20mm") to the value used inside the @page rule.
// Falls back to a sensible default when the input is empty/invalid.
function normalizeMargin(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "20mm";
  if (/^-?\d+(\.\d+)?(mm|cm|in|pt|px)$/.test(trimmed)) return trimmed;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}mm`;
  return "20mm";
}

function buildPageRule(settings: OutputSettings): string {
  const { paperSize, orientation, margins } = settings;
  return `@page {
  size: ${paperSize} ${orientation};
  margin: ${normalizeMargin(margins.top)} ${normalizeMargin(margins.right)} ${normalizeMargin(margins.bottom)} ${normalizeMargin(margins.left)};
}`;
}

/**
 * Trigger the browser's native print dialog scoped to the preview content,
 * with @page rules derived from the user's output settings. This keeps
 * the document entirely client-side, preserves selectable text in the
 * resulting PDF, and lets the OS handle CJK font fallback correctly.
 */
export function printToPdf(settings: OutputSettings, previewHtml: string, baseStyles: string): void {
  const title = settings.fileName.replace(/\.pdf$/i, "") || "document";

  const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      ${buildPageRule(settings)}
      ${baseStyles}
    </style>
  </head>
  <body>
    <main class="matop-print-root">${previewHtml}</main>
  </body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    document.body.removeChild(iframe);
    throw new Error("印刷用フレームの初期化に失敗しました。");
  }
  doc.open();
  doc.write(html);
  doc.close();

  const cleanup = () => {
    setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 500);
  };

  const trigger = () => {
    const win = iframe.contentWindow;
    if (!win) {
      cleanup();
      throw new Error("印刷ウィンドウを取得できませんでした。");
    }
    win.focus();
    win.onafterprint = cleanup;
    try {
      win.print();
    } catch (err) {
      cleanup();
      throw err;
    }
  };

  // Wait for images and fonts to be ready so the print output is complete.
  const win = iframe.contentWindow;
  if (win && win.document.readyState !== "complete") {
    win.addEventListener("load", trigger, { once: true });
  } else {
    trigger();
  }
}

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
