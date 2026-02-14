
import React from 'react';
import { DataRow } from '../types';
import { INDICES } from '../constants';
import { Truck, Users, Phone, ShieldCheck, Box } from 'lucide-react';

interface Props {
  trucks: DataRow[];
  drivers: DataRow[];
}

const Foundation: React.FC<Props> = ({ trucks, drivers }) => {
  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Active Fleet Matrix</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((row, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-7 rounded-2xl hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-slate-800/50 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Truck className="text-blue-500" size={28} />
                </div>
                <span className="bg-slate-950/50 text-[10px] font-black text-slate-500 px-3 py-1 rounded-full border border-slate-800 tracking-[0.1em]">
                  {row[INDICES.TRUCK.ID]}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{row[INDICES.TRUCK.NAME]}</h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Box size={16} className="text-slate-600" />
                <span>Payload Capacity: {row[INDICES.TRUCK.CAPACITY]}</span>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">Operational</span>
                <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">Track GPS</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Certified Personnel</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((row, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-7 rounded-2xl hover:border-indigo-500/50 transition-all group">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-indigo-400 text-2xl font-black border border-slate-700 shadow-inner">
                  {row[INDICES.DRIVER.NAME].charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-100">{row[INDICES.DRIVER.NAME]}</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{row[INDICES.DRIVER.ID]}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-indigo-500" />
                  </div>
                  <span>{row[INDICES.DRIVER.LICENSE]}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                    <Phone size={16} className="text-indigo-500" />
                  </div>
                  <span>{row[INDICES.DRIVER.CONTACT]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Foundation;
