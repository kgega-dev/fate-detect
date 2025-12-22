import React, { useState } from 'react';
import { Save, Shield, Cpu, Bell, EyeOff } from 'lucide-react';
import { Toast } from '../components/Toast';

export const Settings = () => {
  const [showToast, setShowToast] = useState(false);
  const [config, setConfig] = useState({
    cloud: true, analysis: true, notify: true, stealth: false
  });

  const saveSettings = () => {
    setShowToast(true);
  };

  return (
    <div className="space-y-10">
      {showToast && <Toast message="System configuration updated successfully" onClose={() => setShowToast(false)} />}
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">System <span className="text-[#39de7f]">Config</span></h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2 italic">Tweak Fate Engine Performance</p>
        </div>
        <button 
          onClick={saveSettings}
          className="bg-[#39de7f] text-black px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:shadow-[0_0_30px_rgba(57,222,127,0.3)] transition-all"
        >
          <Save size={18} /> Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToggleItem 
          icon={Shield} title="Cloud Scanning" desc="Use remote servers to analyze process signatures."
          active={config.cloud} onClick={() => setConfig({...config, cloud: !config.cloud})}
        />
        <ToggleItem 
          icon={Cpu} title="Deep Analysis" desc="Enable ring-0 memory inspection (Higher CPU usage)."
          active={config.analysis} onClick={() => setConfig({...config, analysis: !config.analysis})}
        />
        <ToggleItem 
          icon={Bell} title="Auto Notifications" desc="Get instant alerts on status changes."
          active={config.notify} onClick={() => setConfig({...config, notify: !config.notify})}
        />
        <ToggleItem 
          icon={EyeOff} title="Stealth Mode" desc="Hide Fate process from standard task managers."
          active={config.stealth} onClick={() => setConfig({...config, stealth: !config.stealth})}
        />
      </div>
    </div>
  );
};

const ToggleItem = ({ icon: Icon, title, desc, active, onClick }: any) => (
  <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group">
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${active ? 'bg-[#39de7f]/10 text-[#39de7f]' : 'bg-white/5 text-gray-600'}`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-white font-black italic uppercase text-sm tracking-tight">{title}</h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 italic">{desc}</p>
      </div>
    </div>
    <button 
      onClick={onClick}
      className={`w-14 h-8 rounded-full relative transition-all duration-300 ${active ? 'bg-[#39de7f]' : 'bg-white/10'}`}
    >
      <div className={`absolute top-1 w-6 h-6 bg-black rounded-full transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);