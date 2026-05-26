// Lazy-loaded Mermaid wrapper. The mermaid package is large; we only
// import it once a document actually contains a `mermaid` code block.

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void;
  render: (id: string, src: string) => Promise<{ svg: string }>;
};

let mermaidPromise: Promise<MermaidApi> | null = null;

async function getMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((mod) => {
      const m = mod.default as unknown as MermaidApi;
      m.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "strict",
        fontFamily:
          '-apple-system, "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif',
      });
      return m;
    });
  }
  return mermaidPromise;
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

/**
 * Walk `container` for `.mermaid` elements that have not yet been
 * processed and render each one into inline SVG in-place. Idempotent.
 */
export async function renderMermaid(container: HTMLElement): Promise<void> {
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>(".mermaid:not([data-mermaid-state])"),
  );
  if (nodes.length === 0) return;
  const m = await getMermaid();
  await Promise.all(
    nodes.map(async (node, i) => {
      const code = (node.textContent ?? "").trim();
      if (!code) {
        node.setAttribute("data-mermaid-state", "empty");
        return;
      }
      const id = `matop-mermaid-${Date.now()}-${i}`;
      try {
        const { svg } = await m.render(id, code);
        node.innerHTML = svg;
        node.setAttribute("data-mermaid-state", "ok");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "render error";
        node.innerHTML = `<pre class="mermaid-error">Mermaid: ${escapeHtml(msg)}</pre>`;
        node.setAttribute("data-mermaid-state", "error");
      }
    }),
  );
}
