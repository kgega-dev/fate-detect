import React, { useState } from "react";
import { ShieldCheck, Trash2, Download } from "lucide-react";
import { useToast } from "../context/ToastContext";

type ScanResult = "Clean" | "Flagged";

type ScanEntry = {
  id: string;
  target: string;
  result: ScanResult;
  date: string;
};

export const SavedScans = () => {
  const toast = useToast();

  const notify = (msg: string, type: "success" | "error" | "info" = "success") => {
    toast.push(type, msg);
  };

  const [scans, setScans] = useState<ScanEntry[]>([
    { id: "#8824", target: "Discord.exe", result: "Clean", date: "2024-12-21" },
    { id: "#8815", target: "Unknown_Process", result: "Flagged", date: "2024-12-18" },
  ]);

  const wipeHistory = () => {
    if (scans.length === 0) {
      notify("No scan history to wipe.", "info");
      return;
    }

    setScans([]);
    notify("All scan history wiped from local memory.", "info");
  };

  const downloadReport = (scan: ScanEntry) => {
    // simulacija downloada
    notify(`Log report for ${scan.target} downloaded`, "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Saved Scans
        </h2>

        <button
          onClick={wipeHistory}
          className="text-red-500 text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} /> Wipe All History
        </button>
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-[3rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">
                Target
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">
                Scan ID
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic">
                Result
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-gray-500 italic text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {scans.map((scan) => (
              <tr key={scan.id} className="group hover:bg-white/[0.01] transition-colors">
                <td className="p-6 font-black italic text-white uppercase">
                  {scan.target}
                </td>

                <td className="p-6 font-mono text-[10px] text-gray-600">
                  {scan.id}
                </td>

                <td className="p-6">
                  <span
                    className={[
                      "text-[10px] font-black uppercase tracking-widest italic px-3 py-1 rounded-xl",
                      scan.result === "Clean"
                        ? "bg-[#39de7f]/10 text-[#39de7f]"
                        : "bg-red-500/10 text-red-500",
                    ].join(" ")}
                  >
                    {scan.result}
                  </span>
                </td>

                <td className="p-6 text-right">
                  <button
                    onClick={() => downloadReport(scan)}
                    className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-[#39de7f] group-hover:text-black transition-all"
                    aria-label={`Download report for ${scan.target}`}
                  >
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {scans.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-[11px] text-gray-600 uppercase font-black tracking-widest italic"
                >
                  No saved scans available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};