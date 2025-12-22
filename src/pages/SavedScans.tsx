import React, { useState } from 'react';
import { ShieldCheck, Trash2, Download } from 'lucide-react';
import { Toast } from '../components/Toast';

export const SavedScans = () => {
  const [showToast, setShowToast] = useState(false);
  const scans = [
    { id: '#8824', target: 'Discord.exe', result: 'Clean', date: '2024-12-21' },
    { id: '#8815', target: 'Unknown_Process', result: 'Flagged', date: '2024-12-18' },
  ];

  return (
    <div className="space-y-8">
      {showToast && <Toast message="Log report downloaded to local storage" onClose={() => setShowToast(false)} />}
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Saved Scans</h2>
        <button onClick={() => { setShowToast(true); }} className="text-red-500 text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
          <Trash2 size={14} /> Wipe All History
        </button>
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-[3rem] overflow-hidden">
        <table className="w-full text-left">
          <tbody className="divide-y divide-white/5">
            {scans.map((scan) => (
              <tr key={scan.id} className="group hover:bg-white/[0.01]">
                <td className="p-6 font-black italic text-white uppercase">{scan.target}</td>
                <td className="p-6 font-mono text-[10px] text-gray-600">{scan.id}</td>
                <td className="p-6 text-right">
                  <button onClick={() => setShowToast(true)} className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-[#39de7f] group-hover:text-black transition-all">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};