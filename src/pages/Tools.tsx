import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, ShieldAlert, Loader2, Signal, Cpu, Terminal, Play } from 'lucide-react';
import { Toast } from '../components/Toast'; // Uvezi Toast

export const Tools = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const startScan = (moduleName: string) => {
    setIsScanning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Kada završi, postavi poruku i prikaži Toast
          setToastMsg(`${moduleName.toUpperCase()} EXECUTED SUCCESSFULLY`);
          setShowToast(true);
          
          // Zatvori modal nakon kratke pauze
          setTimeout(() => setIsScanning(false), 1000);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* TOAST NOTIFIKACIJA */}
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}

      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">Fate <span className="text-[#39de7f]">Modules</span></h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Gega247 Security Core</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
            <Signal size={14} className="text-[#39de7f]" />
            <span className="text-[10px] font-black text-white uppercase italic">Latency: 12ms</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ToolCard 
          icon={Search} 
          title="String Scanner" 
          desc="Deep memory analysis for forbidden strings and hidden handles." 
          onAction={() => startScan("String Scanner")}
          loading={isScanning}
        />
        <ToolCard 
          icon={Zap} 
          title="Bypass Engine" 
          desc="Inject stealth modules into active processes to avoid ring-0 detection." 
          onAction={() => startScan("Bypass Engine")}
          loading={isScanning}
        />
        <ToolCard 
          icon={ShieldAlert} 
          title="Heuristic Check" 
          desc="Analyze process behavior patterns for potential flagging triggers." 
          onAction={() => startScan("Heuristic Check")}
          loading={isScanning}
        />
      </div>

      {/* MODAL ZA SKENIRANJE */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#080808] border border-[#39de7f]/20 p-12 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_50px_rgba(57,222,127,0.1)]"
            >
              <Loader2 className="text-[#39de7f] animate-spin mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-black italic uppercase text-white mb-2">Executing Module</h3>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">Analyzing System Resources...</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black text-[#39de7f] uppercase italic">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    className="h-full bg-[#39de7f] shadow-[0_0_20px_#39de7f]" 
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ToolCard = ({ icon: Icon, title, desc, onAction, loading }: any) => (
  <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] flex flex-col group hover:border-[#39de7f]/20 transition-all shadow-xl">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#39de7f]/10 transition-colors">
      <Icon className="text-[#39de7f]" size={28} />
    </div>
    <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-500 text-[11px] font-medium mt-3 mb-8 leading-relaxed italic">{desc}</p>
    <button 
      onClick={onAction}
      disabled={loading}
      className="mt-auto w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest group-hover:bg-[#39de7f] group-hover:text-black transition-all flex items-center justify-center gap-2"
    >
      <Play size={14} fill="currentColor" /> Initialize Module
    </button>
  </div>
);