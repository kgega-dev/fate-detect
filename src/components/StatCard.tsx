import React from "react";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="bg-[#0a0a0a]/80 border border-[#151515] p-6 rounded-[2rem] hover:border-[#39de7f]/30 transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 italic">
            {title}
          </p>

          <h3 className="text-3xl font-black text-white italic group-hover:text-[#39de7f] transition-colors mt-2 tracking-tighter">
            {value}
          </h3>

          {trend && (
            <span className="text-[10px] text-[#39de7f] font-bold bg-[#39de7f]/10 px-2 py-0.5 rounded-lg border border-[#39de7f]/20 mt-2 inline-block">
              {trend}
            </span>
          )}
        </div>

        <div className="p-3 bg-black border border-[#151515] rounded-xl text-gray-600 group-hover:text-[#39de7f] group-hover:shadow-[0_0_15px_rgba(57,222,127,0.2)] transition-all">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};