import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  Database,
  FileText,
  Clock,
  DollarSign,
  User,
  LogOut,
  Zap,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

type MenuItem = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  path: string;
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [active, setActive] = useState(true);

  const menu: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Shield, label: "Detection Tools", path: "/tools" },
    { icon: Database, label: "String Vault", path: "/custom-strings" },
    { icon: FileText, label: "Logs & Scans", path: "/saved-scans" },
    { icon: Clock, label: "Changelogs", path: "/changelogs" },
    { icon: DollarSign, label: "Affiliate", path: "/affiliate" },
  ];

  const handleLogout = () => {
    logout(); // reset global auth state
    navigate("/login", { replace: true }); // redirect to login page
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#080808]/90 border-r border-white/5 backdrop-blur-xl p-8 flex flex-col z-50">
      <div className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#39de7f] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(57,222,127,0.4)]">
          <Shield size={22} className="text-black" />
        </div>
        <div>
          <h1 className="text-xl font-black italic uppercase text-white leading-none tracking-tighter">
            FATE
          </h1>
          <p className="text-[10px] font-bold text-[#39de7f] tracking-[0.3em] uppercase">
            Detect
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group",
                isActive
                  ? "bg-white/5 text-[#39de7f] border border-white/5 shadow-lg"
                  : "text-gray-500 hover:text-white hover:bg-white/[0.02]",
              ].join(" ")
            }
          >
            <item.icon size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-widest italic">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            [
              "flex items-center gap-4 px-5 py-2 rounded-xl transition-all",
              isActive ? "text-[#39de7f] bg-white/5" : "text-gray-500 hover:text-white",
            ].join(" ")
          }
        >
          <User size={18} />
          <span className="text-[11px] font-black uppercase italic tracking-widest">
            My Profile 
          </span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              "flex items-center gap-4 px-5 py-2 rounded-xl transition-colors",
              isActive ? "text-[#39de7f] bg-white/5" : "text-gray-500 hover:text-white",
            ].join(" ")
          }
        >
          <Settings size={18} />
          <span className="text-[11px] font-black uppercase italic tracking-widest">
            Settings
          </span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={18} />
          <span className="text-[11px] font-black uppercase tracking-widest italic text-left">
            Terminate
          </span>
        </button>

        <div
          className={[
            "p-4 rounded-2xl border transition-all duration-500",
            active ? "bg-[#39de7f]/5 border-[#39de7f]/20" : "bg-red-500/5 border-red-500/20",
          ].join(" ")}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest italic">
              Protection
            </span>
            <div
              className={[
                "w-2 h-2 rounded-full animate-pulse",
                active ? "bg-[#39de7f]" : "bg-red-500",
              ].join(" ")}
            />
          </div>

          <button
            onClick={() => setActive((v) => !v)}
            className="w-full flex items-center justify-center gap-2 bg-black/40 py-2 rounded-xl text-[10px] font-black text-white uppercase italic"
          >
            <Zap size={12} className={active ? "text-[#39de7f]" : "text-gray-500"} />{" "}
            {active ? "Engine Active" : "Engine Paused"}
          </button>
        </div>
      </div>
    </aside>
  );
};