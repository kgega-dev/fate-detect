import React, { useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

type VaultStringType = "SHA-256" | "String" | "Manual Entry";

type VaultString = {
  name: string;
  type: VaultStringType;
  value: string;
};

export const CustomStrings = () => {
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista stringova u State-u (tipizirano)
  const [strings, setStrings] = useState<VaultString[]>([
    { name: "AimAssist_V2", type: "SHA-256", value: "e3b0c44298fc1c149afbf4c8996fb9" },
    { name: "Trigger_Elite", type: "String", value: "fate_detected_handle_01" },
  ]);

  // Polja za novi string
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const notify = (msg: string, type: "success" | "error" | "info" = "success") => {
    toast.push(type, msg);
  };

  const nameTrim = newName.trim();
  const valueTrim = newValue.trim();

  const canSubmit = useMemo(() => {
    return nameTrim.length >= 3 && valueTrim.length >= 3;
  }, [nameTrim, valueTrim]);

  const handleAddString = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      notify("Unos nije valjan (min. 3 znaka za naziv i vrijednost).", "error");
      return;
    }

    // Provjeri duplikat imena
    const exists = strings.some((s) => s.name.toLowerCase() === nameTrim.toLowerCase());
    if (exists) {
      notify(`String "${nameTrim}" već postoji u vaultu.`, "error");
      return;
    }

    const newEntry: VaultString = { name: nameTrim, type: "Manual Entry", value: valueTrim };
    setStrings((prev) => [newEntry, ...prev]);

    setNewName("");
    setNewValue("");
    setIsModalOpen(false);

    notify(`String "${nameTrim}" added to vault`, "success");
  };

  const handleDelete = (index: number) => {
    const stringName = strings[index]?.name ?? "Unknown";
    setStrings((prev) => prev.filter((_, i) => i !== index));
    notify(`Purged ${stringName} from memory`, "info");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            Fate <span className="text-[#39de7f]">Vault</span>
          </h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2 italic">
            Custom String Database
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#39de7f] text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:shadow-[0_0_20px_#39de7f66] transition-all"
        >
          <Plus size={16} /> Add New String
        </button>
      </div>

      {/* STRINGOVI */}
      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">Name</th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">Value</th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {strings.map((str, i) => (
              <tr key={`${str.name}-${i}`} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-6 font-black italic text-white uppercase text-sm">{str.name}</td>
                <td className="p-6 font-mono text-[10px] text-gray-500">{str.value}</td>
                <td className="p-6 text-right">
                  <button
                    onClick={() => handleDelete(i)}
                    className="p-3 text-gray-600 hover:text-red-500 transition-colors"
                    aria-label={`Delete ${str.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {strings.length === 0 && (
              <tr>
                <td className="p-8 text-center text-[11px] text-gray-600 uppercase font-black tracking-widest italic" colSpan={3}>
                  Vault is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL ZA DODAVANJE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black italic text-white uppercase">New String</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddString} className="space-y-4">
              <input
                placeholder="STRING NAME"
                className="w-full bg-black border border-white/5 p-4 rounded-xl text-xs font-black text-white outline-none focus:border-[#39de7f]/50"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <input
                placeholder="HASH OR VALUE"
                className="w-full bg-black border border-white/5 p-4 rounded-xl text-xs font-black text-white outline-none focus:border-[#39de7f]/50"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />

              {/* real-time validation hint */}
              {!canSubmit && (
                <p className="text-[10px] font-black uppercase tracking-widest italic text-gray-600">
                  Min 3 znaka za naziv i vrijednost.
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-[#39de7f] text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};