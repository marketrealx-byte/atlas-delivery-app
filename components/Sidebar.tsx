
import React from 'react';
import { Truck, Map, Wallet, ShieldCheck, BarChart3, User } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: Tab.TRIPS, label: 'Daily Trips', icon: Map },
    { id: Tab.FINANCE, label: 'Finance & Fuel', icon: Wallet },
    { id: Tab.FOUNDATION, label: 'Fleet Foundation', icon: ShieldCheck },
    { id: Tab.REPORTS, label: 'System Reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-72 border-r border-slate-800/50 h-screen flex flex-col bg-slate-950 backdrop-blur-xl sticky top-0 shrink-0 z-40">
      <div className="p-10 flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-xl shadow-xl shadow-blue-900/40">
          <Truck className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-slate-100 uppercase italic">ATLAS<span className="text-blue-500 ml-1">DELIVERY</span></h1>
      </div>

      <nav className="flex-1 px-6 py-4 flex flex-col gap-2">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-4 mb-6">Operations Command</p>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/40' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <item.icon size={20} strokeWidth={2.5} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-slate-800/40">
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/40">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <User size={20} className="text-white" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black text-slate-100 truncate">Malak Zubair</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
