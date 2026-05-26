import { useRef } from "react";

interface ToolbarProps {
  onOpenFile: (file: File) => void;
  onOpenSettings: () => void;
  onExport: () => void;
  onLoadSample: () => void;
  onClear: () => void;
  busy?: boolean;
}

export function Toolbar({
  onOpenFile,
  onOpenSettings,
  onExport,
  onLoadSample,
  onClear,
  busy,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__logo" aria-hidden="true">📄</span>
        <span className="toolbar__title">Matop</span>
        <span className="toolbar__subtitle">Markdown → PDF</span>
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
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => fileInputRef.current?.click()}
        >
          ファイルを開く
        </button>
        <button type="button" className="btn btn--ghost" onClick={onLoadSample}>
          サンプル
        </button>
        <button type="button" className="btn btn--ghost" onClick={onClear}>
          クリア
        </button>
        <button type="button" className="btn btn--ghost" onClick={onOpenSettings}>
          ⚙ 設定
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onExport}
          disabled={busy}
        >
          {busy ? "生成中…" : "PDF として出力"}
        </button>
      </div>
    </header>
  );
}
