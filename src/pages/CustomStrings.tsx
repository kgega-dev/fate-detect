import React, { useState } from 'react';
import { Database, Plus, Trash2, Search, X } from 'lucide-react';
import { Toast } from '../components/Toast';

export const CustomStrings = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Lista stringova u stanju (State)
  const [strings, setStrings] = useState([
    { name: 'AimAssist_V2', type: 'SHA-256', value: 'e3b0c44298fc1c149afbf4c8996fb9' },
    { name: 'Trigger_Elite', type: 'String', value: 'fate_detected_handle_01' }
  ]);

  // Polja za novi string
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddString = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newValue) {
      const newEntry = { name: newName, type: 'Manual Entry', value: newValue };
      setStrings([...strings, newEntry]); // Dodaje novi string na vrh liste
      setNewName("");
      setNewValue("");
      setIsModalOpen(false);
      
      // Pozivanje Toasta
      setToastMsg(`String "${newName}" added to vault`);
      setShowToast(true);
    }
  };

  const handleDelete = (index: number) => {
    const stringName = strings[index].name;
    const filteredStrings = strings.filter((_, i) => i !== index);
    setStrings(filteredStrings);
    
    // Pozivanje Toasta za brisanje
    setToastMsg(`Purged ${stringName} from memory`);
    setShowToast(true);
  };

  return (
    <div className="space-y-8">
      {/* TOAST POZIVANJE */}
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">Fate <span className="text-[#39de7f]">Vault</span></h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2 italic">Custom String Database</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#39de7f] text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:shadow-[0_0_20px_#39de7f66] transition-all"
        >
          <Plus size={16} /> Add New String
        </button>
      </div>

      {/* TABELA STRINGOVA */}
      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">Name</th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">Value</th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {strings.map((str, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-6 font-black italic text-white uppercase text-sm">{str.name}</td>
                <td className="p-6 font-mono text-[10px] text-gray-500">{str.value}</td>
                <td className="p-6 text-right">
                  <button onClick={() => handleDelete(i)} className="p-3 text-gray-600 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL ZA DODAVANJE (Pojavi se kad klikneš gumb) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black italic text-white uppercase">New String</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddString} className="space-y-4">
              <input 
                placeholder="STRING NAME" 
                className="w-full bg-black border border-white/5 p-4 rounded-xl text-xs font-black text-white outline-none focus:border-[#39de7f]/50"
                value={newName} onChange={(e) => setNewName(e.target.value)}
              />
              <input 
                placeholder="HASH OR VALUE" 
                className="w-full bg-black border border-white/5 p-4 rounded-xl text-xs font-black text-white outline-none focus:border-[#39de7f]/50"
                value={newValue} onChange={(e) => setNewValue(e.target.value)}
              />
              <button type="submit" className="w-full bg-[#39de7f] text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest mt-4">
                Confirm Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};