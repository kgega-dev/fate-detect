import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function validateLicenseKey(v: string) {
  const value = v.trim();

  // Validacija u real-time
  if (value.length === 0) return "Ključ je obavezan.";
  if (value.length < 4) return "Ključ mora imati barem 4 znaka.";

  return null;
}

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [key, setKey] = useState("");
  const [touched, setTouched] = useState(false);

  const error = useMemo(() => {
    // Ako nije touched, ne prikazujemo error
    if (!touched) return null;
    return validateLicenseKey(key);
  }, [key, touched]);

  const canSubmit = validateLicenseKey(key) === null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const err = validateLicenseKey(key);
    if (err) {
      toast.push("error", err);
      return;
    }

    // Dummy LOGIN
    login({
      id: "local-user",
      email: "license@local",
      name: "Licensed User",
    });

    toast.push("success", "Autentikacija uspješna!");
    navigate("/", { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-[#020202] flex items-center justify-center overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-[#39de7f]/5 rounded-full blur-[120px] -top-48 -left-48" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[400px] p-12 bg-[#080808] border border-white/5 rounded-[3.5rem] shadow-2xl"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#39de7f]/10 border border-[#39de7f]/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(57,222,127,0.1)]">
            <Shield size={42} className="text-[#39de7f]" />
          </div>
          <h1 className="text-4xl font-black italic text-white tracking-tighter uppercase">
            Fate <span className="text-[#39de7f]">Detect</span>
          </h1>
          <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.5em] mt-3 italic">
            Authorization Required
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#39de7f] transition-colors"
              size={18}
            />

            <input
              type="password"
              placeholder="ENTER LICENSE KEY"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                if (!touched) setTouched(true); // real-time validacija krene cim krene tipkanje
              }}
              onBlur={() => setTouched(true)}
              className={[
                "w-full bg-black border rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-mono outline-none transition-all placeholder:text-gray-800",
                error ? "border-red-500/40 focus:border-red-500/60" : "border-white/5 focus:border-[#39de7f]/40",
              ].join(" ")}
            />

            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-400 text-[11px]">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              "w-full font-black py-5 rounded-2xl uppercase italic tracking-widest text-xs transition-all flex items-center justify-center gap-2 group",
              canSubmit
                ? "bg-[#39de7f] text-black hover:bg-[#2fb869]"
                : "bg-[#1a1a1a] text-gray-500 cursor-not-allowed",
            ].join(" ")}
          >
            Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};