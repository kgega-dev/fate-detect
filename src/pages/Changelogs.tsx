import { Clock, RefreshCcw, ShieldCheck } from "lucide-react";
import { useToast } from "../context/ToastContext";

type ChangelogType = "Major" | "Security" | "Minor";

type ChangelogEntry = {
  version: string;
  date: string;
  type: ChangelogType;
  notes: string[];
};

export const Changelogs = () => {
  const toast = useToast();

  const notify = (msg: string, type: "success" | "error" | "info" = "success") => {
    toast.push(type, msg);
  };

  const logs: ChangelogEntry[] = [
    {
      version: "2.6.0",
      date: "Dec 22, 2025",
      type: "Major",
      notes: [
        "Added System Intel Feed on Dashboard",
        "Implemented global Kill-Switch protection",
        "Enhanced AES-256 token encryption",
        "Optimized Frankfurt-1 server nodes",
      ],
    },
    {
      version: "2.5.2",
      date: "Dec 20, 2025",
      type: "Security",
      notes: [
        "Kernel-mode driver stealth improvements",
        "New string signature database v4.2",
        "Fixed memory leak in UI rendering",
      ],
    },
  ];

  const checkUpdates = () => {
    notify("FATE ENGINE IS UP TO DATE [v2.6.0]", "info");
  };

  return (
    <div className="space-y-10 max-w-5xl animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Change<span className="text-[#39de7f]">logs</span>
          </h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">
            Evolution of Fate Engine
          </p>
        </div>

        <button
          onClick={checkUpdates}
          className="bg-[#39de7f] text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_#39de7f44] transition-all active:scale-95"
        >
          <RefreshCcw size={16} /> Check Updates
        </button>
      </header>

      <div className="space-y-8">
        {logs.map((log) => (
          <div
            key={log.version}
            className="bg-[#080808] border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity">
              <ShieldCheck size={120} className="text-[#39de7f]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter underline decoration-[#39de7f]/40">
                  Build {log.version}
                </h3>

                <span className="bg-[#39de7f]/10 text-[#39de7f] text-[9px] font-black px-3 py-1 rounded-full border border-[#39de7f]/20 uppercase tracking-widest italic">
                  {log.type} Update
                </span>

                <span className="text-gray-600 text-[10px] font-bold uppercase flex items-center gap-2 ml-auto">
                  <Clock size={12} /> {log.date}
                </span>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {log.notes.map((note, i) => (
                  <li
                    key={`${log.version}-${i}`}
                    className="flex items-center gap-4 text-gray-400 text-xs italic font-bold p-4 bg-white/[0.02] rounded-2xl border border-white/5"
                  >
                    <div className="w-1.5 h-1.5 bg-[#39de7f] rounded-full shadow-[0_0_10px_#39de7f]" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};