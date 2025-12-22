import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Activity, Shield, Zap, Copy, 
  Save, Trash2, History, Key, Monitor, 
  HelpCircle, Cpu, Globe, Server 
} from 'lucide-react';
import { Toast } from '../components/Toast'; // Uvezi Toast komponentu

export const Dashboard = () => {
  const [sessionPin, setSessionPin] = useState("4493 9988");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Fate Detect Engine v2.5.1 Initialized...",
    "[AUTH] Developer: Gega247 connected via SSL",
    "[KERNEL] Kernel-mode driver loaded at 0x00FF21",
    "[SERVER] Handshake with Frankfurt-1 successful"
  ]);

  // Funkcija za okidanje notifikacije
  const notify = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  // Simulacija logova
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        "Memory integrity check passed.",
        "Internal string vault synchronized.",
        "Gega247 bypass module: ACTIVE.",
        "Scanning active threads...",
        "Heartbeat signal verified."
      ];
      setLogs(prev => [...prev.slice(-5), `[${new Date().toLocaleTimeString()}] ${events[Math.floor(Math.random() * events.length)]}`]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const generateNewPin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000) + " " + Math.floor(1000 + Math.random() * 9000);
    setSessionPin(newPin);
    notify("NEW SESSION PIN GENERATED");
  };

  const copyPin = () => {
    navigator.clipboard.writeText(sessionPin);
    notify("PIN COPIED TO CLIPBOARD");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* TOAST NOTIFIKACIJA */}
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}

      {/* HEADER SEKCIJA */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            System <span className="text-[#39de7f]">Overview</span>
          </h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">
            Welcome back, <span className="text-white">Gega247</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => notify("SYNCING WITH GLOBAL NODES...")}
            className="bg-black border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-[#39de7f]/30 transition-all"
          >
             <div className="text-right">
                <p className="text-[9px] font-black text-gray-500 uppercase">Server Status</p>
                <p className="text-[10px] font-black text-[#39de7f] uppercase">Operational</p>
             </div>
             <Globe size={20} className="text-[#39de7f] animate-pulse" />
          </button>
        </div>
      </div>

      {/* TOP STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Zap} label="Active Sessions" value="1,284" color="text-yellow-500" />
        <StatCard icon={Shield} label="Detections Bypassed" value="48.2k" color="text-[#39de7f]" />
        <StatCard icon={Cpu} label="CPU Usage" value="12%" color="text-blue-500" />
        <StatCard icon={Activity} label="System Latency" value="14ms" color="text-purple-500" />
      </div>

      {/* GLOBAL ALERTS */}
      <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-8 mt-8">
        <h3 className="text-lg font-black italic uppercase text-white mb-6 flex items-center gap-3">
          <Activity size={18} className="text-[#39de7f]" /> Global Alerts
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[#39de7f]/5 border border-[#39de7f]/10 rounded-2xl cursor-pointer" onClick={() => notify("SECURITY BULLETIN UPDATED")}>
            <div className="w-2 h-2 rounded-full bg-[#39de7f] animate-pulse" />
            <p className="text-[11px] font-bold text-gray-300 uppercase italic">
              <span className="text-[#39de7f]">Safe:</span> No new detections reported in the last 48 hours.
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl cursor-pointer" onClick={() => notify("V2.5.1 OPTIMIZATION ACTIVE")}>
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
          <div className="absolute top-6 right-6 text-gray-700 hover:text-gray-400 cursor-help transition-colors" onClick={() => notify("GUIDE: GENERATE TOKEN AND PASTE IN LOADER")}>
            <HelpCircle size={18} />
          </div>
          
          <h3 className="text-2xl font-black italic uppercase text-white mb-10 tracking-tight text-center">Generate a Session</h3>
          
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
            <button onClick={() => notify("SESSION SETTINGS SAVED")} className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#39de7f] hover:border-[#39de7f]/20 transition-all">
              <Save size={24} />
            </button>
            <button onClick={() => notify("SESSION DATA PURGED")} className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
              <Trash2 size={24} />
            </button>
          </div>

          <div className="w-full space-y-4">
            <button onClick={() => notify("FETCHING SESSION HISTORY...")} className="w-full bg-[#39de7f]/5 border border-[#39de7f]/10 py-4 rounded-2xl text-[10px] font-black text-[#39de7f] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#39de7f]/10 transition-all">
              <History size={16} /> View Session Logs
            </button>
            <button 
              onClick={generateNewPin}
              className="w-full bg-[#39de7f] py-5 rounded-2xl text-xs font-black text-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_#39de7f66] transition-all"
            >
              <Key size={18} /> Generate New Session
            </button>
            <button onClick={() => notify("INITIALIZING REMOTE SCANNER...")} className="w-full bg-white text-black py-5 rounded-2xl text-xs font-black text-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
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
              <InfoRow label="Auth Level" value="Level 7 (Root)" color="text-[#39de7f]" />
              <InfoRow label="Kernel Driver" value="fate_v2.sys" color="text-white" />
              <InfoRow label="Stealth Mode" value="Active" color="text-[#39de7f]" />
              <InfoRow label="License" value="Lifetime" color="text-blue-500" />
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
                onClick={() => notify("TERMINAL BUFFER CLEARED")}
                className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic hover:text-white transition-all"
               >
                Live Terminal [Clear]
               </button>
            </div>
            <div className="space-y-2 max-h-[180px] overflow-hidden">
              {logs.map((log, i) => (
                <div key={i} className="text-[10px] text-gray-400 border-l-2 border-[#39de7f]/30 pl-3 py-1 animate-in slide-in-from-left duration-300">
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

/* Pomoćne komponente */
const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-[#080808] border border-white/5 p-6 rounded-[2rem] hover:border-[#39de7f]/30 transition-all group shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] italic">{label}</span>
      <div className={`p-2 bg-black border border-white/5 rounded-xl ${color}`}>
        <Icon size={16} />
      </div>
    </div>
    <p className="text-3xl font-black text-white italic tracking-tighter group-hover:text-[#39de7f] transition-colors">{value}</p>
  </div>
);

const InfoRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-center py-4 px-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all">
    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">{label}</span>
    <span className={`text-[10px] font-black uppercase tracking-tighter ${color}`}>{value}</span>
  </div>
);