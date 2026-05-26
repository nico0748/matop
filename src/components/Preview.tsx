import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { ThemeId } from "../lib/themes";
import { renderMermaid } from "../lib/mermaid";

interface PreviewProps {
  html: string;
  themeId: ThemeId;
  customCss: string;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(function Preview(
  { html, themeId, customCss },
  externalRef,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(externalRef, () => innerRef.current as HTMLDivElement, []);

  useEffect(() => {
    if (!innerRef.current) return;
    let cancelled = false;
    renderMermaid(innerRef.current).catch(() => {
      // Errors are surfaced in-place by renderMermaid; nothing else to do.
    });
    return () => {
      cancelled = true;
      void cancelled;
    };
  }, [html]);

  return (
    <div className="preview" aria-label="Preview">
      {customCss && <style>{customCss}</style>}
      <article
        ref={innerRef}
        className={`preview__content matop-print-root theme-${themeId}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
});
