"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const push = useCallback((next: string) => {
    setMessage(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 4600);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[80] max-w-sm sm:bottom-6 sm:top-auto" role="status" aria-live="polite">
        {message ? (
          <div className="pointer-events-auto rounded-2xl bg-ink px-4 py-3 text-sm leading-6 text-white shadow-2xl">{message}</div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}
