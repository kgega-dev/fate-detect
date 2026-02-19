import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Shield,
  Zap,
  Copy,
  Save,
  Trash2,
  History,
  Key,
  Monitor,
  HelpCircle,
  Cpu,
  Globe,
  Server,
} from "lucide-react";

import { StatCard } from "../components/StatCard";
import { useToast } from "../context/ToastContext";

/** Tipovi za "API" podatke **/
type DashboardStats = {
  activeSessions: number;
  detectionsBypassed: number;
  cpuUsagePercent: number;
  latencyMs: number;
  serverStatus: "Operational" | "Degraded" | "Down";
  region: string;
};

const API_URL = "/mock/dashboard-stats.json";

export const Dashboard = () => {
  const toast = useToast();

  const [sessionPin, setSessionPin] = useState("4493 9988");

  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Fate Detect Engine v2.5.1 Initialized...",
    "[AUTH] Developer: Gega247 connected via SSL",
    "[KERNEL] Kernel-mode driver loaded at 0x00FF21",
    "[SERVER] Handshake with Frankfurt-1 successful",
  ]);

  /** Loading + Error state */
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Global toast helper
  const notify = (msg: string, type: "success" | "error" | "info" = "success") => {
    toast.push(type, msg);
  };

  /** Fetch u useEffect + loading/error */
  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as DashboardStats;

        if (!alive) return;
        setStats(data);
      } catch (e) {
        if (!alive) return;
        if ((e as Error).name === "AbortError") return;

        const msg = (e as Error).message ?? "Unknown error";
        setError(msg);
        notify(`Greška pri dohvaćanju podataka: ${msg}`, "error");
      } finally {
        if (alive) setIsLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  // Simulacija logova u useEffect
  useEffect(() => {
    const interval = window.setInterval(() => {
      const events = [
        "Memory integrity check passed.",
        "Internal string vault synchronized.",
        "Gega247 bypass module: ACTIVE.",
        "Scanning active threads...",
        "Heartbeat signal verified.",
      ];

      setLogs((prev) => [
        ...prev.slice(-5),
        `[${new Date().toLocaleTimeString()}] ${
          events[Math.floor(Math.random() * events.length)]
        }`,
      ]);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const generateNewPin = () => {
    const newPin =
      Math.floor(1000 + Math.random() * 9000) +
      " " +
      Math.floor(1000 + Math.random() * 9000);
    setSessionPin(newPin);
    notify("NEW SESSION PIN GENERATED", "success");
  };

  const copyPin = async () => {
    try {
      await navigator.clipboard.writeText(sessionPin);
      notify("PIN COPIED TO CLIPBOARD", "success");
    } catch {
      notify("Ne mogu kopirati PIN (clipboard blokiran).", "error");
    }
  };

  /** Ako nema stats, pokazemo default fallback vrijednosti */
  const display = useMemo(() => {
    return {
      activeSessions: stats?.activeSessions ?? 1284,
      detectionsBypassed: stats?.detectionsBypassed ?? 48200,
      cpuUsagePercent: stats?.cpuUsagePercent ?? 12,
      latencyMs: stats?.latencyMs ?? 14,
      serverStatus: stats?.serverStatus ?? "Operational",
      region: stats?.region ?? "Frankfurt-1",
    };
  }, [stats]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SEKCIJA */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            System <span className="text-[#39de7f]">Overview</span>
          </h2>

          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">
            Welcome back, <span className="text-white">Gega247</span>
          </p>

          {/* Loading / Error prikaz */}
          <div className="mt-3">
            {isLoading && (
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-600 italic">
                Fetching telemetry...
              </p>
            )}
            {!isLoading && error && (
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-400 italic">
                Telemetry error: {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => notify("SYNCING WITH GLOBAL NODES...", "info")}
            className="bg-black border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-[#39de7f]/30 transition-all"
          >
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-500 uppercase">Server Status</p>
              <p className="text-[10px] font-black text-[#39de7f] uppercase">
                {display.serverStatus}
              </p>
              <p className="text-[9px] font-black text-gray-600 uppercase">{display.region}</p>
            </div>

            <Globe size={20} className="text-[#39de7f] animate-pulse" />
          </button>
        </div>
      </div>

      {/* TOP STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Zap}
          title="Active Sessions"
          value={display.activeSessions.toLocaleString()}
          trend="+2.4%"
        />
        <StatCard
          icon={Shield}
          title="Detections Bypassed"
          value={`${(display.detectionsBypassed / 1000).toFixed(1)}k`}
          trend="SAFE"
        />
        <StatCard icon={Cpu} title="CPU Usage" value={`${display.cpuUsagePercent}%`} />
        <StatCard icon={Activity} title="System Latency" value={`${display.latencyMs}ms`} />
      </div>

      {/* GLOBAL ALERTS */}
      <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-8 mt-8">
        <h3 className="text-lg font-black italic uppercase text-white mb-6 flex items-center gap-3">
          <Activity size={18} className="text-[#39de7f]" /> Global Alerts
        </h3>

        <div className="space-y-4">
          <div
            className="flex items-center gap-4 p-4 bg-[#39de7f]/5 border border-[#39de7f]/10 rounded-2xl cursor-pointer"
            onClick={() => notify("SECURITY BULLETIN UPDATED", "info")}
          >
            <div className="w-2 h-2 rounded-full bg-[#39de7f] animate-pulse" />
            <p className="text-[11px] font-bold text-gray-300 uppercase italic">
              <span className="text-[#39de7f]">Safe:</span> No new detections reported in the last 48 hours.
            </p>
          </div>

          <div
            className="flex items-center gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl cursor-pointer"
            onClick={() => notify("V2.5.1 OPTIMIZATION ACTIVE", "info")}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <p className="text-[11px] font-bold text-gray-300 uppercase italic">
              <span className="text-blue-500">Update:</span> Fate Engine v2.5.1 is now optimized for Windows 11 23H2.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* SESSION GENERATOR CARD */}
        <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
          <div
            className="absolute top-6 right-6 text-gray-700 hover:text-gray-400 cursor-help transition-colors"
            onClick={() => notify("GUIDE: GENERATE TOKEN AND PASTE IN LOADER", "info")}
          >
            <HelpCircle size={18} />
          </div>

          <h3 className="text-2xl font-black italic uppercase text-white mb-10 tracking-tight text-center">
            Generate a Session
          </h3>

          <div className="w-full bg-black border border-[#39de7f]/20 rounded-3xl p-8 mb-8 relative group-hover:border-[#39de7f]/40 transition-all shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-mono font-black text-white tracking-[0.4em]">{sessionPin}</span>

              <button
                onClick={copyPin}
                className="p-4 bg-[#39de7f]/10 text-[#39de7f] rounded-2xl hover:bg-[#39de7f] hover:text-black transition-all"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => notify("SESSION SETTINGS SAVED", "success")}
              className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#39de7f] hover:border-[#39de7f]/20 transition-all"
            >
              <Save size={24} />
            </button>

            <button
              onClick={() => notify("SESSION DATA PURGED", "info")}
              className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 size={24} />
            </button>
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={() => notify("FETCHING SESSION HISTORY...", "info")}
              className="w-full bg-[#39de7f]/5 border border-[#39de7f]/10 py-4 rounded-2xl text-[10px] font-black text-[#39de7f] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#39de7f]/10 transition-all"
            >
              <History size={16} /> View Session Logs
            </button>

            <button
              onClick={generateNewPin}
              className="w-full bg-[#39de7f] py-5 rounded-2xl text-xs font-black text-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_#39de7f66] transition-all"
            >
              <Key size={18} /> Generate New Session
            </button>

            <button
              onClick={() => notify("INITIALIZING REMOTE SCANNER...", "info")}
              className="w-full bg-white text-black py-5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              <Monitor size={18} /> Launch Remote Scanner
            </button>
          </div>
        </div>

        {/* QUICK STATUS & LIVE CONSOLE */}
        <div className="space-y-8">
          <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Server size={22} className="text-[#39de7f]" />
              <h3 className="text-xl font-black italic uppercase text-white tracking-tight">System Intel</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <InfoRow label="Auth Level" value="Level 7 (Root)" colorClass="text-[#39de7f]" />
              <InfoRow label="Kernel Driver" value="fate_v2.sys" colorClass="text-white" />
              <InfoRow label="Stealth Mode" value="Active" colorClass="text-[#39de7f]" />
              <InfoRow label="License" value="Lifetime" colorClass="text-blue-500" />
            </div>
          </div>

          <div className="bg-black border border-white/5 rounded-[3rem] p-8 font-mono relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-[#39de7f]/20" />
              </div>

              <button
                onClick={() => notify("TERMINAL BUFFER CLEARED", "info")}
                className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic hover:text-white transition-all"
              >
                Live Terminal [Clear]
              </button>
            </div>

            <div className="space-y-2 max-h-[180px] overflow-hidden">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className="text-[10px] text-gray-400 border-l-2 border-[#39de7f]/30 pl-3 py-1 animate-in slide-in-from-left duration-300"
                >
                  <span className="text-[#39de7f]/50"> {">"} </span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Pomocne komponente ---- */

type InfoRowProps = {
  label: string;
  value: string;
  colorClass: string;
};

const InfoRow = ({ label, value, colorClass }: InfoRowProps) => (
  <div className="flex justify-between items-center py-4 px-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all">
    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">{label}</span>
    <span className={`text-[10px] font-black uppercase tracking-tighter ${colorClass}`}>{value}</span>
  </div>
);