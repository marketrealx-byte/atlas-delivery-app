
import React, { useState } from 'react';
import { DataRow } from '../types';
import { INDICES } from '../constants';
import { Plus, Search, Filter, X, ArrowRight, MapPin } from 'lucide-react';

interface Props {
  trips: DataRow[];
  trucks: DataRow[];
  drivers: DataRow[];
  onSubmit: (data: any[]) => void;
}

const Trips: React.FC<Props> = ({ trips, trucks, drivers, onSubmit }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: `TRP-${Math.floor(Math.random() * 9000) + 1000}`,
    date: new Date().toISOString().split('T')[0],
    truckId: '',
    driver: '',
    origin: '',
    destination: '',
    startKm: '',
    endKm: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rowData = [
      formData.id,
      formData.date,
      formData.truckId,
      formData.driver,
      formData.origin,
      formData.destination,
      formData.startKm,
      formData.endKm
    ];
    onSubmit(rowData);
    setIsFormOpen(false);
    setFormData({ ...formData, id: `TRP-${Math.floor(Math.random() * 9000) + 1000}`, origin: '', destination: '', startKm: '', endKm: '' });
  };

  const inputClass = "w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 text-slate-200";
  const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block ml-1";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">Daily Operations</h2>
          <p className="text-slate-500 text-sm font-medium">Real-time tracking of route metrics and fleet movement.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Log New Trip
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Trip Dispatch</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manual Entry Protocol</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="bg-slate-800 p-2 rounded-xl text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Dispatch Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Assigned Asset</label>
                  <select required value={formData.truckId} onChange={e => setFormData({...formData, truckId: e.target.value})} className={inputClass}>
                    <option value="">Select Truck</option>
                    {trucks.map((row, i) => (
                      <option key={i} value={row[INDICES.TRUCK.ID]}>{row[INDICES.TRUCK.NAME]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Operating Driver</label>
                <select required value={formData.driver} onChange={e => setFormData({...formData, driver: e.target.value})} className={inputClass}>
                  <option value="">Select Personnel</option>
                  {drivers.map((row, i) => (
                    <option key={i} value={row[INDICES.DRIVER.NAME]}>{row[INDICES.DRIVER.NAME]}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Origin</label>
                  <input required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} placeholder="Loading Hub" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Destination</label>
                  <input required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} placeholder="Discharge point" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Opening KM</label>
                  <input type="number" required value={formData.startKm} onChange={e => setFormData({...formData, startKm: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Closing KM</label>
                  <input type="number" required value={formData.endKm} onChange={e => setFormData({...formData, endKm: e.target.value})} className={inputClass} />
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 uppercase tracking-tighter">Sync Log to Atlas Cloud</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              placeholder="Filter by ID, Driver or Route..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700"
            />
          </div>
          <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/60 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] border-b border-slate-800/60">
                <th className="px-10 py-6">Reference ID</th>
                <th className="px-10 py-6">Dispatch Date</th>
                <th className="px-10 py-6">Asset & Driver</th>
                <th className="px-10 py-6">Route Vector</th>
                <th className="px-10 py-6 text-right">Distance (KM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {trips.length > 0 ? trips.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-600/5 transition-all group">
                  <td className="px-10 py-7 text-xs font-mono font-black text-blue-500 uppercase tracking-tighter">{row[INDICES.TRIP.ENTRY_ID]}</td>
                  <td className="px-10 py-7 text-sm font-bold text-slate-300">{row[INDICES.TRIP.DATE] ? String(row[INDICES.TRIP.DATE]).split('T')[0] : 'N/A'}</td>
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white">{row[INDICES.TRIP.TRUCK_ID]}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{row[INDICES.TRIP.DRIVER]}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-bold">{row[INDICES.TRIP.ORIGIN]}</span>
                      <ArrowRight size={12} className="text-slate-700" />
                      <span className="text-xs text-slate-400 font-bold">{row[INDICES.TRIP.DESTINATION]}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="inline-flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800/60">
                       <MapPin size={12} className="text-blue-500" />
                       <span className="text-sm font-black text-white">{row[INDICES.TRIP.TOTAL_KM] || 0}</span>
                       <span className="text-[10px] text-slate-600 font-bold">KM</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">No operational logs synced.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trips;
