import { useRef } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { LOCALES, type Locale } from "../i18n/messages";

interface ToolbarProps {
  onOpenFile: (file: File) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onExport: () => void;
  onLoadSample: () => void;
  onClear: () => void;
  onClearDraft: () => void;
  busy?: boolean;
}

export function Toolbar({
  onOpenFile,
  onOpenSettings,
  onOpenHelp,
  onExport,
  onLoadSample,
  onClear,
  onClearDraft,
  busy,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__logo" aria-hidden="true">📄</span>
        <span className="toolbar__title">Matop</span>
        <span className="toolbar__subtitle">{t.toolbarSubtitle}</span>
      </div>

      <div className="toolbar__actions">
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onOpenFile(file);
            e.target.value = "";
          }}
        />
        <button type="button" className="btn btn--ghost" onClick={() => fileInputRef.current?.click()}>
          {t.openFile}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onLoadSample}>{t.sample}</button>
        <button type="button" className="btn btn--ghost" onClick={onClear}>{t.clear}</button>
        <button type="button" className="btn btn--ghost" onClick={onClearDraft} title={t.clearDraftTitle}>
          {t.clearDraft}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onOpenHelp}>{t.help}</button>
        <button type="button" className="btn btn--ghost" onClick={onOpenSettings}>{t.settings}</button>

        <label className="toolbar__lang" title={t.language}>
          <span className="sr-only">{t.language}</span>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            {LOCALES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </label>

        <button type="button" className="btn btn--primary" onClick={onExport} disabled={busy}>
          {busy ? t.exportPdfBusy : t.exportPdf}
        </button>
      </div>
    </header>
  );
}
