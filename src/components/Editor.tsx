import { useEffect, useRef, type DragEvent } from "react";

interface EditorProps {
  value: string;
  onChange: (next: string) => void;
  onFileLoad: (file: File) => void;
}

export function Editor({ value, onChange, onFileLoad }: EditorProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.spellcheck = false;
  }, []);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileLoad(file);
  };

  return (
    <div
      className="editor"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <textarea
        ref={ref}
        className="editor__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ここに Markdown を入力、または .md ファイルをドロップしてください…"
        aria-label="Markdown editor"
      />
    </div>
  );
}
