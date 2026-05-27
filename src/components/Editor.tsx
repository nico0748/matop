import { useCallback, useRef, type DragEvent } from "react";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, historyKeymap, history } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { EditorSelection } from "@codemirror/state";
import { FormattingToolbar, type FormatAction } from "./FormattingToolbar";

interface EditorProps {
  value: string;
  onChange: (next: string) => void;
  onFileLoad: (file: File) => void;
}

export function Editor({ value, onChange, onFileLoad }: EditorProps) {
  const cmRef = useRef<ReactCodeMirrorRef | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileLoad(file);
  };

  const applyFormat = useCallback((action: FormatAction) => {
    const view = cmRef.current?.view;
    if (!view) return;
    applyAction(view, action);
  }, []);

  return (
    <div
      className="editor"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <FormattingToolbar onAction={applyFormat} />
      <div className="editor__cm">
        <CodeMirror
          ref={cmRef}
          value={value}
          height="100%"
          extensions={[
            markdown(),
            history(),
            keymap.of([...defaultKeymap, ...historyKeymap]),
            EditorView.lineWrapping,
          ]}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
            autocompletion: false,
            indentOnInput: true,
          }}
          onChange={onChange}
          aria-label="Markdown editor"
        />
      </div>
    </div>
  );
}

function applyAction(view: EditorView, action: FormatAction): void {
  switch (action.kind) {
    case "wrap":
      wrapSelection(view, action.before, action.after);
      break;
    case "prefix":
      prefixLines(view, action.prefix);
      break;
    case "block":
      insertBlock(view, action.text);
      break;
  }
  view.focus();
}

function wrapSelection(view: EditorView, before: string, after: string): void {
  view.dispatch(
    view.state.changeByRange((range) => {
      const selected = view.state.sliceDoc(range.from, range.to);
      const placeholder = selected || "";
      const insert = `${before}${placeholder}${after}`;
      const newRange = selected
        ? EditorSelection.range(range.from, range.from + insert.length)
        : EditorSelection.cursor(range.from + before.length);
      return {
        changes: { from: range.from, to: range.to, insert },
        range: newRange,
      };
    }),
  );
}

function prefixLines(view: EditorView, prefix: string): void {
  view.dispatch(
    view.state.changeByRange((range) => {
      const lineStart = view.state.doc.lineAt(range.from);
      const lineEnd = view.state.doc.lineAt(range.to);
      const changes = [];
      for (let n = lineStart.number; n <= lineEnd.number; n++) {
        const line = view.state.doc.line(n);
        changes.push({ from: line.from, to: line.from, insert: prefix });
      }
      const delta = prefix.length * (lineEnd.number - lineStart.number + 1);
      return {
        changes,
        range: EditorSelection.range(range.from + prefix.length, range.to + delta),
      };
    }),
  );
}

function insertBlock(view: EditorView, text: string): void {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  // Insert on its own paragraph: ensure leading blank line if not already.
  const lineText = view.state.doc.sliceString(line.from, line.to);
  const prefix = lineText.length === 0 ? "" : "\n\n";
  view.dispatch({
    changes: { from: line.to, to: line.to, insert: `${prefix}${text}\n` },
    selection: EditorSelection.cursor(line.to + prefix.length + text.length + 1),
  });
}
