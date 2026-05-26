import { forwardRef } from "react";

interface PreviewProps {
  html: string;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(function Preview(
  { html },
  ref,
) {
  return (
    <div className="preview" aria-label="Preview">
      <article
        ref={ref}
        className="preview__content matop-print-root"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
});
