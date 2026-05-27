import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { detectInitialLocale, MESSAGES, type Locale, type Messages } from "./messages";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface ProviderProps {
  initial?: Locale;
  onChange?: (next: Locale) => void;
  children: ReactNode;
}

export function LocaleProvider({ initial, onChange, children }: ProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initial ?? detectInitialLocale());

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale: (next) => {
      setLocaleState(next);
      onChange?.(next);
    },
    t: MESSAGES[locale],
  }), [locale, onChange]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT(): Messages {
  return useLocale().t;
}
