import type { OutputSettings, Orientation, PaperSize } from "../types";
import { THEMES } from "../lib/themes";
import { useT } from "../i18n/LocaleContext";

interface Props {
  open: boolean;
  settings: OutputSettings;
  onChange: (next: OutputSettings) => void;
  onClose: () => void;
}

const PAPER_SIZES: PaperSize[] = ["A4", "A3", "B5", "Letter", "Legal"];
const ORIENTATIONS: Orientation[] = ["portrait", "landscape"];

export function SettingsPanel({ open, settings, onChange, onClose }: Props) {
  const t = useT();
  if (!open) return null;

  const update = <K extends keyof OutputSettings>(key: K, value: OutputSettings[K]) =>
    onChange({ ...settings, [key]: value });

  const updateMargin = (side: keyof OutputSettings["margins"], value: string) =>
    onChange({ ...settings, margins: { ...settings.margins, [side]: value } });

  const themeLabel = (id: string): string => {
    switch (id) {
      case "default": return t.themeDefault;
      case "github": return t.themeGithub;
      case "academic": return t.themeAcademic;
      case "minimal": return t.themeMinimal;
      default: return id;
    }
  };

  return (
    <div className="settings-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <aside className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <header className="settings-panel__header">
          <h2>{t.settingsTitle}</h2>
          <button type="button" className="settings-panel__close" onClick={onClose} aria-label={t.settingsClose}>
            ×
          </button>
        </header>

        <section className="settings-panel__section">
          <label className="settings-field">
            <span>{t.theme}</span>
            <select
              value={settings.theme}
              onChange={(e) => update("theme", e.target.value as OutputSettings["theme"])}
            >
              {THEMES.map((th) => (
                <option key={th.id} value={th.id}>{themeLabel(th.id)}</option>
              ))}
            </select>
          </label>

          <label className="settings-field">
            <span>{t.paperSize}</span>
            <select
              value={settings.paperSize}
              onChange={(e) => update("paperSize", e.target.value as PaperSize)}
            >
              {PAPER_SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="settings-field">
            <span>{t.orientation}</span>
            <select
              value={settings.orientation}
              onChange={(e) => update("orientation", e.target.value as Orientation)}
            >
              {ORIENTATIONS.map((o) => (
                <option key={o} value={o}>{o === "portrait" ? t.portrait : t.landscape}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="settings-panel__section">
          <h3>{t.margins}</h3>
          <div className="settings-grid">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <label key={side} className="settings-field">
                <span>
                  {side === "top" ? t.marginTop
                    : side === "right" ? t.marginRight
                    : side === "bottom" ? t.marginBottom
                    : t.marginLeft}
                </span>
                <input
                  type="text"
                  value={settings.margins[side]}
                  onChange={(e) => updateMargin(side, e.target.value)}
                  placeholder="20mm"
                />
              </label>
            ))}
          </div>
          <p className="settings-hint">{t.marginUnitsHint}</p>
        </section>

        <section className="settings-panel__section">
          <h3>{t.headerFooter}</h3>
          <label className="settings-field">
            <span>
              <input
                type="checkbox"
                checked={settings.pageNumbers}
                onChange={(e) => update("pageNumbers", e.target.checked)}
              />
              {" "}{t.showPageNumbers}
            </span>
          </label>
          <label className="settings-field">
            <span>{t.headerCenter}</span>
            <input
              type="text"
              value={settings.headerText}
              onChange={(e) => update("headerText", e.target.value)}
              placeholder={t.headerExample}
            />
          </label>
          <label className="settings-field">
            <span>{t.footerCenter}</span>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => update("footerText", e.target.value)}
              placeholder={t.footerExample}
            />
          </label>
          <p className="settings-hint">{t.headerFooterHint}</p>
        </section>

        <section className="settings-panel__section">
          <h3>{t.coverPage}</h3>
          <label className="settings-field">
            <span>
              <input
                type="checkbox"
                checked={settings.coverPage}
                onChange={(e) => update("coverPage", e.target.checked)}
              />
              {" "}{t.coverPageToggle}
            </span>
          </label>
          <p className="settings-hint">{t.coverPageHint}</p>
        </section>

        <section className="settings-panel__section">
          <h3>{t.customCss}</h3>
          <label className="settings-field">
            <textarea
              value={settings.customCss}
              onChange={(e) => update("customCss", e.target.value)}
              placeholder={t.customCssExample}
              rows={5}
              spellCheck={false}
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
              }}
            />
          </label>
          <p className="settings-hint">{t.customCssHint}</p>
        </section>

        <section className="settings-panel__section">
          <label className="settings-field">
            <span>{t.fileName}</span>
            <input
              type="text"
              value={settings.fileName}
              onChange={(e) => update("fileName", e.target.value)}
              placeholder="document.pdf"
            />
          </label>
          <p className="settings-hint">{t.fileNameHint}</p>
        </section>
      </aside>
    </div>
  );
}
