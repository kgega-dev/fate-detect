import React, { createContext, useContext, useMemo, useState } from "react";

export type ToastType = "success" | "error" | "info";

export type ToastMsg = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastContextValue = {
  toasts: ToastMsg[];
  push: (type: ToastType, message: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const value = useMemo<ToastContextValue>(() => {
    return {
      toasts,
      push: (type, message) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
      },
      remove: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
      clear: () => setToasts([]),
    };
  }, [toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast se mora koristiti unutar ToastProvider-a");
  return ctx;
}