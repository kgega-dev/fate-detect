import React from "react";
import { AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { Toast } from "./Toast";

export function ToastHost() {
  const { toasts, remove } = useToast();

  // Ako nema toastova, ne renderamo nista
  if (toasts.length === 0) return null;

  // Renderamo samo zadnji (najnoviji), da UI ostane cist
  const last = toasts[toasts.length - 1];

  return (
    <AnimatePresence mode="wait">
      <Toast
        key={last.id}
        message={last.message}
        type={last.type}
        onClose={() => remove(last.id)}
      />
    </AnimatePresence>
  );
}