interface NoticeProps {
  message: string;
  tone: "error" | "info";
  onDismiss: () => void;
}

export function Notice({ message, tone, onDismiss }: NoticeProps) {
  return (
    <div className={`notice notice--${tone}`} role={tone === "error" ? "alert" : "status"}>
      <span className="notice__text">{message}</span>
      <button type="button" className="notice__close" onClick={onDismiss} aria-label="閉じる">
        ×
      </button>
    </div>
  );
}
