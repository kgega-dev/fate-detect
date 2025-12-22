import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(key.length > 3) navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-[#020202] flex items-center justify-center overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-[#39de7f]/5 rounded-full blur-[120px] -top-48 -left-48" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-[400px] p-12 bg-[#080808] border border-white/5 rounded-[3.5rem] shadow-2xl">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#39de7f]/10 border border-[#39de7f]/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(57,222,127,0.1)]">
            <Shield size={42} className="text-[#39de7f]" />
          </div>
          <h1 className="text-4xl font-black italic text-white tracking-tighter uppercase">Fate <span className="text-[#39de7f]">Detect</span></h1>
          <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.5em] mt-3 italic">Authorization Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#39de7f] transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="ENTER LICENSE KEY" 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-black border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-mono focus:border-[#39de7f]/40 outline-none transition-all placeholder:text-gray-800"
            />
          </div>
          <button type="submit" className="w-full bg-[#39de7f] text-black font-black py-5 rounded-2xl uppercase italic tracking-widest text-xs hover:bg-[#2fb869] transition-all flex items-center justify-center gap-2 group">
            Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};