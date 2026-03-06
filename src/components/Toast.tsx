import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

type ToastProps = {
  message: string;
  type?: ToastType;
  onClose: () => void;
  durationMs?: number;
};

export const Toast = ({ message, type = "success", onClose, durationMs = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [onClose, durationMs]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className="fixed bottom-10 right-10 z-[999]"
    >
      <div
        className={[
          "bg-[#080808] border-2 p-5 rounded-2xl flex items-center gap-4 shadow-2xl min-w-[300px]",
          type === "success" ? "border-[#39de7f]/50" : "border-red-500/50",
        ].join(" ")}
      >
        <div
          className={[
            "p-2 rounded-lg",
            type === "success"
              ? "bg-[#39de7f]/10 text-[#39de7f]"
              : type === "error"
              ? "bg-red-500/10 text-red-500"
              : "bg-white/10 text-white",
          ].join(" ")}
        >
          {type === "success" ? <CheckCircle size={20} /> : <Info size={20} />}
        </div>

        <div className="flex-1">
          <p className="text-[11px] font-black uppercase text-white tracking-widest italic">
            {message}
          </p>
        </div>

        <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};