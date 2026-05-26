import { useEffect, useRef, useState } from "react";

const KEY = "matop:v1";

interface StoredState<T> {
  version: 1;
  value: T;
}

export function loadStored<T>(): T | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredState<T>;
    if (parsed?.version !== 1) return null;
    return parsed.value;
  } catch {
    return null;
  }
}

export function clearStored(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Persists `value` to localStorage on a debounce. Returns nothing; callers
 * read the initial value through {@link loadStored} once at mount.
 */
export function useDebouncedPersist<T>(value: T, delayMs = 500): void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        const payload: StoredState<T> = { version: 1, value };
        localStorage.setItem(KEY, JSON.stringify(payload));
      } catch {
        /* quota or unavailable; ignore */
      }
    }, delayMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, delayMs]);
}

/**
 * Hook returning a boolean flag that flips once when localStorage is
 * detected so callers can render a "draft restored" hint.
 */
export function useDraftRestoredOnce(restored: boolean): boolean {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (restored && !shown) setShown(true);
  }, [restored, shown]);
  return shown;
}
