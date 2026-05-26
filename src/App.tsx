import { useMemo, useRef, useState } from "react";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { Toolbar } from "./components/Toolbar";
import { SettingsPanel } from "./components/SettingsPanel";
import { Notice } from "./components/Notice";
import { renderMarkdown } from "./lib/markdown";
import { printToPdf } from "./lib/pdf";
import { SAMPLE_MARKDOWN } from "./lib/sample";
import { DEFAULT_SETTINGS, type OutputSettings } from "./types";
import { PRINT_STYLES } from "./styles/printStylesString";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

interface AppNotice {
  message: string;
  tone: "error" | "info";
}

export function App() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [settings, setSettings] = useState<OutputSettings>(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const rendered = useMemo(() => {
    try {
      return renderMarkdown(markdown);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setNotice({ tone: "error", message: `プレビューの生成に失敗しました: ${msg}` });
      return { html: "", data: {} };
    }
  }, [markdown]);

  const handleFileLoad = (file: File) => {
    if (file.size > MAX_FILE_BYTES) {
      setNotice({ tone: "error", message: `ファイルが大きすぎます（上限 ${MAX_FILE_BYTES / 1024 / 1024} MB）。` });
      return;
    }
    const name = file.name.toLowerCase();
    const okExt = /\.(md|markdown|txt)$/.test(name);
    if (!okExt && !file.type.startsWith("text/")) {
      setNotice({ tone: "error", message: ".md / .markdown / .txt のテキストファイルのみ読み込めます。" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setMarkdown(text);
      const stem = file.name.replace(/\.(md|markdown|txt)$/i, "") || "document";
      setSettings((prev) => ({ ...prev, fileName: `${stem}.pdf` }));
      setNotice({ tone: "info", message: `${file.name} を読み込みました。` });
    };
    reader.onerror = () => {
      setNotice({ tone: "error", message: "ファイルの読み込みに失敗しました。" });
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    if (!previewRef.current) {
      setNotice({ tone: "error", message: "プレビューが利用できません。" });
      return;
    }
    setBusy(true);
    try {
      printToPdf(settings, previewRef.current.innerHTML, PRINT_STYLES);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setNotice({ tone: "error", message: `PDF 出力に失敗しました: ${msg}` });
    } finally {
      setTimeout(() => setBusy(false), 300);
    }
  };

  return (
    <div className="app">
      <Toolbar
        onOpenFile={handleFileLoad}
        onOpenSettings={() => setSettingsOpen(true)}
        onExport={handleExport}
        onLoadSample={() => setMarkdown(SAMPLE_MARKDOWN)}
        onClear={() => setMarkdown("")}
        busy={busy}
      />

      {notice && (
        <Notice
          message={notice.message}
          tone={notice.tone}
          onDismiss={() => setNotice(null)}
        />
      )}

      <main className="workspace">
        <Editor
          value={markdown}
          onChange={setMarkdown}
          onFileLoad={handleFileLoad}
        />
        <Preview ref={previewRef} html={rendered.html} themeId={settings.theme} />
      </main>

      <SettingsPanel
        open={settingsOpen}
        settings={settings}
        onChange={setSettings}
        onClose={() => setSettingsOpen(false)}
      />

      <footer className="footer">
        <span>Matop — Markdown to PDF · 文書はブラウザ外に送信されません</span>
      </footer>
    </div>
  );
}
