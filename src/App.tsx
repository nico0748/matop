import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { Toolbar } from "./components/Toolbar";
import { SettingsPanel } from "./components/SettingsPanel";
import { HelpModal } from "./components/HelpModal";
import { Notice } from "./components/Notice";
import { renderMarkdown } from "./lib/markdown";
import { printToPdf } from "./lib/pdf";
import { SAMPLE_MARKDOWN } from "./lib/sample";
import { buildCoverPage } from "./lib/coverPage";
import { renderMermaid } from "./lib/mermaid";
import {
  DEFAULT_SETTINGS,
  type OutputSettings,
  type PersistedState,
} from "./types";
import { PRINT_STYLES } from "./styles/printStylesString";
import { clearStored, loadStored, useDebouncedPersist } from "./lib/storage";
import { LocaleProvider, useLocale } from "./i18n/LocaleContext";
import type { Locale } from "./i18n/messages";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

interface AppNotice {
  message: string;
  tone: "error" | "info";
}

interface InitialState {
  markdown: string;
  settings: OutputSettings;
  locale: Locale | undefined;
  restored: boolean;
}

function loadInitial(): InitialState {
  const stored = loadStored<PersistedState>();
  if (stored && typeof stored.markdown === "string" && stored.settings) {
    return {
      markdown: stored.markdown,
      settings: { ...DEFAULT_SETTINGS, ...stored.settings },
      locale: stored.locale,
      restored: true,
    };
  }
  return {
    markdown: SAMPLE_MARKDOWN,
    settings: DEFAULT_SETTINGS,
    locale: undefined,
    restored: false,
  };
}

export function App() {
  const initial = useMemo(loadInitial, []);
  return (
    <LocaleProvider initial={initial.locale}>
      <AppInner initial={initial} />
    </LocaleProvider>
  );
}

function AppInner({ initial }: { initial: InitialState }) {
  const { locale, t } = useLocale();
  const [markdown, setMarkdown] = useState<string>(initial.markdown);
  const [settings, setSettings] = useState<OutputSettings>(initial.settings);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useDebouncedPersist<PersistedState>({ markdown, settings, locale });

  useEffect(() => {
    if (initial.restored) {
      setNotice({ tone: "info", message: t.draftRestored });
    }
    // Show once at mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rendered = useMemo(() => {
    try {
      return renderMarkdown(markdown);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setNotice({ tone: "error", message: t.previewError(msg) });
      return { html: "", data: {} };
    }
  }, [markdown, t]);

  const finalHtml = useMemo(() => {
    if (!settings.coverPage) return rendered.html;
    return buildCoverPage(rendered.data) + rendered.html;
  }, [rendered, settings.coverPage]);

  const handleFileLoad = (file: File) => {
    if (file.size > MAX_FILE_BYTES) {
      setNotice({ tone: "error", message: t.filesizeError(MAX_FILE_BYTES / 1024 / 1024) });
      return;
    }
    const name = file.name.toLowerCase();
    const okExt = /\.(md|markdown|txt)$/.test(name);
    if (!okExt && !file.type.startsWith("text/")) {
      setNotice({ tone: "error", message: t.filetypeError });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setMarkdown(text);
      const stem = file.name.replace(/\.(md|markdown|txt)$/i, "") || "document";
      setSettings((prev) => ({ ...prev, fileName: `${stem}.pdf` }));
      setNotice({ tone: "info", message: t.fileLoaded(file.name) });
    };
    reader.onerror = () => {
      setNotice({ tone: "error", message: t.fileLoadFailed });
    };
    reader.readAsText(file);
  };

  const handleExport = async () => {
    if (!previewRef.current) {
      setNotice({ tone: "error", message: t.previewUnavailable });
      return;
    }
    setBusy(true);
    try {
      await renderMermaid(previewRef.current);
      printToPdf(settings, previewRef.current.innerHTML, PRINT_STYLES);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setNotice({ tone: "error", message: t.exportError(msg) });
    } finally {
      setTimeout(() => setBusy(false), 300);
    }
  };

  const handleClearDraft = () => {
    clearStored();
    setNotice({ tone: "info", message: t.draftCleared });
  };

  return (
    <div className="app">
      <Toolbar
        onOpenFile={handleFileLoad}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenHelp={() => setHelpOpen(true)}
        onExport={handleExport}
        onLoadSample={() => setMarkdown(SAMPLE_MARKDOWN)}
        onClear={() => setMarkdown("")}
        onClearDraft={handleClearDraft}
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
        <Preview
          ref={previewRef}
          html={finalHtml}
          themeId={settings.theme}
          customCss={settings.customCss}
        />
      </main>

      <SettingsPanel
        open={settingsOpen}
        settings={settings}
        onChange={setSettings}
        onClose={() => setSettingsOpen(false)}
      />

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />

      <footer className="footer">
        <span>{t.footerCaption}</span>
      </footer>
    </div>
  );
}
