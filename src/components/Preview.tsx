import { forwardRef } from "react";
import type { ThemeId } from "../lib/themes";

interface PreviewProps {
  html: string;
  themeId: ThemeId;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(function Preview(
  { html, themeId },
  ref,
) {
  return (
    <div className="preview" aria-label="Preview">
      <article
        ref={ref}
        className={`preview__content matop-print-root theme-${themeId}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
});
