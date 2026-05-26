import type { OutputSettings } from "../types";

function normalizeMargin(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "20mm";
  if (/^-?\d+(\.\d+)?(mm|cm|in|pt|px)$/.test(trimmed)) return trimmed;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}mm`;
  return "20mm";
}

function escapeCssString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildPageRule(settings: OutputSettings): string {
  const { paperSize, orientation, margins, pageNumbers, headerText, footerText } = settings;

  const marginBoxes: string[] = [];
  if (headerText) {
    marginBoxes.push(`@top-center { content: "${escapeCssString(headerText)}"; font-size: 9pt; color: #555; }`);
  }
  if (footerText) {
    marginBoxes.push(`@bottom-center { content: "${escapeCssString(footerText)}"; font-size: 9pt; color: #555; }`);
  }
  if (pageNumbers) {
    // If a custom footer is set, place page numbers on the right; otherwise center.
    const slot = footerText ? "@bottom-right" : "@bottom-center";
    marginBoxes.push(`${slot} { content: counter(page) " / " counter(pages); font-size: 9pt; color: #555; }`);
  }

  return `@page {
  size: ${paperSize} ${orientation};
  margin: ${normalizeMargin(margins.top)} ${normalizeMargin(margins.right)} ${normalizeMargin(margins.bottom)} ${normalizeMargin(margins.left)};
  ${marginBoxes.join("\n  ")}
}`;
}

/**
 * Print the preview content as PDF via a hidden iframe. The browser's
 * native print pipeline handles paper size, margins, page numbers
 * (via @page margin boxes), and CJK font fallback.
 */
export function printToPdf(
  settings: OutputSettings,
  previewHtml: string,
  baseStyles: string,
): void {
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
    ${settings.customCss ? `<style data-matop="custom">${settings.customCss}</style>` : ""}
  </head>
  <body>
    <main class="matop-print-root theme-${settings.theme}">${previewHtml}</main>
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
