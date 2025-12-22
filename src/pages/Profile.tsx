import React from 'react';
import { User, Shield, Key, Mail, Award, Terminal, Activity, Globe } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* USER HEADER */}
      <div className="flex items-center gap-8 bg-[#080808] p-10 rounded-[3.5rem] border border-white/5">
        <div className="w-32 h-32 bg-gradient-to-br from-[#39de7f] to-[#1a6e3d] rounded-[2.5rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(57,222,127,0.25)]">
          <User size={64} strokeWidth={2.5} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Gega247</h2>
            <div className="px-3 py-1 bg-[#39de7f]/10 border border-[#39de7f]/20 rounded-lg">
                <span className="text-[10px] font-black text-[#39de7f] uppercase italic tracking-widest">Lead Dev</span>
            </div>
          </div>
          <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.4em] italic">System Administrator & Lead Architect</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INFO PANELS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem]">
            <h3 className="text-white font-black italic uppercase text-lg mb-8 tracking-tight flex items-center gap-3">
                <Terminal size={20} className="text-[#39de7f]" /> Security Intel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileItem label="User ID" value="#0247-GEGA" icon={Terminal} color="text-gray-400" />
              <ProfileItem label="System Status" value="Bypass Active" icon={Award} color="text-yellow-500" />
              <ProfileItem label="Auth Method" value="Hardware ID" icon={Key} color="text-blue-500" />
              <ProfileItem label="Global Rank" value="Elite Member" icon={Shield} color="text-[#39de7f]" />
            </div>
          </div>

          <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem]">
             <h3 className="text-white font-black italic uppercase text-lg mb-6 tracking-tight">Account Activity</h3>
             <div className="h-40 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center text-gray-700 italic text-xs font-black uppercase tracking-widest">
                Activity Graph Under Maintenance
             </div>
          </div>
        </div>

        {/* STAFF ACTIONS */}
        <div className="space-y-6">
            <div className="bg-[#39de7f] p-10 rounded-[3rem] text-black shadow-[0_0_30px_rgba(57,222,127,0.1)]">
              <h3 className="font-black italic uppercase text-2xl mb-8 leading-none">Staff<br/>Access</h3>
              <div className="space-y-3">
                <button className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:opacity-90 transition-all shadow-xl">
                  Manage Users
                </button>
                <button className="w-full py-4 bg-black/10 border border-black/20 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black/20 transition-all">
                  Global Ban List
                </button>
                <button className="w-full py-4 bg-black/10 border border-black/20 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black/20 transition-all">
                  System Logs
                </button>
              </div>
            </div>

            <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem]">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-600 uppercase italic">Network status</span>
                    <Globe size={14} className="text-[#39de7f]" />
                </div>
                <p className="text-white font-black text-xl mt-4 italic uppercase tracking-tight">Connected</p>
                <p className="text-[10px] text-[#39de7f] font-bold uppercase mt-1">Frankfurt Node-01</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value, icon: Icon, color }: any) => (
  <div className="flex items-center gap-5 p-5 bg-black border border-white/5 rounded-2xl hover:border-[#39de7f]/20 transition-all">
    <div className={`p-3 bg-white/5 rounded-xl ${color}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 italic">{label}</p>
      <p className="text-xs font-black text-white uppercase tracking-tight">{value}</p>
    </div>
  </div>
);