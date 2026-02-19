import { Bell, User } from 'lucide-react';

export const Navbar = () => {
  // Cita iz memorije, ako nema nicega stavi Gega247 kao default korisnika 
  const currentUser = localStorage.getItem('user') || 'Gega247';
  const currentRank = localStorage.getItem('rank') || 'Enterprise Member';

  return (
    <header className="flex justify-between items-center py-6 px-10 bg-black/20 backdrop-blur-md border-b border-[#1a1a1a] sticky top-0 z-30">
      <div className="text-left">
        <h2 className="text-white font-bold text-sm tracking-tight">System / <span className="text-gray-500">Overview</span></h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:text-[#39de7f] transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#39de7f] rounded-full border-2 border-black"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-[#1a1a1a]">
          <div className="text-right">
            <p className="text-xs font-black text-white uppercase tracking-tighter italic">{currentUser}</p>
            <p className="text-[9px] text-[#39de7f] font-black uppercase tracking-widest">{currentRank}</p>
          </div>
          <div className="w-10 h-10 bg-[#39de7f]/10 border border-[#39de7f]/20 rounded-xl flex items-center justify-center text-[#39de7f]">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};