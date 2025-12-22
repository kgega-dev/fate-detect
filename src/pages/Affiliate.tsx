import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Copy, Check, MousePointer2, UserPlus, Wallet } from 'lucide-react';

export const Affiliate = () => {
  const [copied, setCopied] = useState(false);
  const refLink = "fate.detect/ref/Gega247";

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Partner <span className="text-[#39de7f]">Program</span></h2>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Monetize your network with Fate</p>
      </header>

      {/* DETALJNA STATISTIKA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem icon={MousePointer2} label="Total Clicks" value="1,842" color="text-blue-500" />
        <StatItem icon={UserPlus} label="Registrations" value="124" color="text-purple-500" />
        <StatItem icon={TrendingUp} label="Conv. Rate" value="6.7%" color="text-yellow-500" />
        <StatItem icon={Wallet} label="Total Earned" value="$1,420.00" color="text-[#39de7f]" />
      </div>

      {/* REFERRAL LINK BOX */}
      <div className="bg-[#080808] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <DollarSign size={120} className="text-[#39de7f]" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-black italic uppercase text-white mb-6 tracking-tight">Your Unique Referral Link</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-black border border-white/10 p-5 rounded-2xl font-mono text-sm text-[#39de7f] flex items-center shadow-inner">
              {refLink}
            </div>
            <button 
              onClick={handleCopy}
              className="bg-[#39de7f] text-black font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs hover:shadow-[0_0_30px_rgba(57,222,127,0.4)] transition-all active:scale-95"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied to Clipboard" : "Copy Link"}
            </button>
          </div>
          <p className="text-gray-600 text-[10px] font-bold uppercase mt-6 tracking-widest italic">
            You receive <span className="text-[#39de7f]">25% commission</span> for every successful subscription through your link.
          </p>
        </div>
      </div>

      {/* PAYOUT PROGRESS BAR */}
      <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] mt-8">
  <div className="flex justify-between items-end mb-4">
    <div>
      <p className="text-[10px] font-black text-gray-500 uppercase italic tracking-widest">Next Payout Progress</p>
      <p className="text-xl font-black text-white italic">$1,420 / $2,000</p>
    </div>
    <span className="text-[10px] font-black text-[#39de7f]">71%</span>
  </div>
  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
    <div className="h-full bg-[#39de7f] shadow-[0_0_15px_#39de7f]" style={{ width: '71%' }} />
  </div>
</div>

      {/* RECENT COMMISSIONS TABLE */}
      <div className="bg-[#080808] border border-white/5 rounded-[3rem] overflow-hidden">
        <div className="p-8 border-b border-white/5">
            <h3 className="text-lg font-black italic uppercase text-white tracking-tight">Recent Earnings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-500 tracking-widest italic">User</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-500 tracking-widest italic">Date</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-500 tracking-widest italic text-right">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { user: "User_882", date: "2 hours ago", amount: "$15.00" },
                { user: "Vortex_Dev", date: "5 hours ago", amount: "$45.00" },
                { user: "Shadow_AC", date: "1 day ago", amount: "$15.00" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-5 text-white font-bold text-xs italic uppercase tracking-tighter">{row.user}</td>
                  <td className="px-8 py-5 text-gray-500 text-[10px] font-black uppercase">{row.date}</td>
                  <td className="px-8 py-5 text-[#39de7f] font-black text-xs text-right italic">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/10 transition-all">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[9px] font-black uppercase text-gray-600 tracking-widest italic">{label}</span>
      <div className={`p-2 bg-black rounded-lg border border-white/5 ${color}`}>
        <Icon size={16} />
      </div>
    </div>
    <p className="text-2xl font-black text-white italic tracking-tighter">{value}</p>
  </div>
);