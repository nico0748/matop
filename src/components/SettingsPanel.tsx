import type { OutputSettings, Orientation, PaperSize } from "../types";
import { THEMES } from "../lib/themes";

interface Props {
  open: boolean;
  settings: OutputSettings;
  onChange: (next: OutputSettings) => void;
  onClose: () => void;
}

const PAPER_SIZES: PaperSize[] = ["A4", "A3", "B5", "Letter", "Legal"];
const ORIENTATIONS: Orientation[] = ["portrait", "landscape"];

export function SettingsPanel({ open, settings, onChange, onClose }: Props) {
  if (!open) return null;

  const update = <K extends keyof OutputSettings>(key: K, value: OutputSettings[K]) =>
    onChange({ ...settings, [key]: value });

  const updateMargin = (side: keyof OutputSettings["margins"], value: string) =>
    onChange({ ...settings, margins: { ...settings.margins, [side]: value } });

  return (
    <div className="settings-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <aside className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <header className="settings-panel__header">
          <h2>出力設定</h2>
          <button type="button" className="settings-panel__close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </header>

        <section className="settings-panel__section">
          <label className="settings-field">
            <span>テーマ</span>
            <select
              value={settings.theme}
              onChange={(e) => update("theme", e.target.value as OutputSettings["theme"])}
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>

          <label className="settings-field">
            <span>用紙サイズ</span>
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
            <span>向き</span>
            <select
              value={settings.orientation}
              onChange={(e) => update("orientation", e.target.value as Orientation)}
            >
              {ORIENTATIONS.map((o) => (
                <option key={o} value={o}>{o === "portrait" ? "縦" : "横"}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="settings-panel__section">
          <h3>余白</h3>
          <div className="settings-grid">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <label key={side} className="settings-field">
                <span>{({ top: "上", right: "右", bottom: "下", left: "左" } as const)[side]}</span>
                <input
                  type="text"
                  value={settings.margins[side]}
                  onChange={(e) => updateMargin(side, e.target.value)}
                  placeholder="20mm"
                />
              </label>
            ))}
          </div>
          <p className="settings-hint">単位は mm / cm / in / pt が使えます。例: 20mm</p>
        </section>

        <section className="settings-panel__section">
          <h3>ヘッダー / フッター</h3>
          <label className="settings-field">
            <span>
              <input
                type="checkbox"
                checked={settings.pageNumbers}
                onChange={(e) => update("pageNumbers", e.target.checked)}
              />
              {" "}ページ番号を表示
            </span>
          </label>
          <label className="settings-field">
            <span>ヘッダー（中央）</span>
            <input
              type="text"
              value={settings.headerText}
              onChange={(e) => update("headerText", e.target.value)}
              placeholder="（例）社外秘"
            />
          </label>
          <label className="settings-field">
            <span>フッター（中央）</span>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => update("footerText", e.target.value)}
              placeholder="（例）© 2026 Matop"
            />
          </label>
          <p className="settings-hint">
            ブラウザによってはヘッダー/フッターの表示位置・書式が異なる場合があります。
          </p>
        </section>

        <section className="settings-panel__section">
          <label className="settings-field">
            <span>ファイル名</span>
            <input
              type="text"
              value={settings.fileName}
              onChange={(e) => update("fileName", e.target.value)}
              placeholder="document.pdf"
            />
          </label>
          <p className="settings-hint">
            最終的なファイル名は、表示される印刷ダイアログで保存時に指定します（ブラウザの仕様）。
          </p>
        </section>
      </aside>
    </div>
  );
}
