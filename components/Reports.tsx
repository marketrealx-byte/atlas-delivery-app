
import React, { useState, useMemo } from 'react';
import { DataRow } from '../types';
import { INDICES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, FileSpreadsheet, TrendingUp, TrendingDown, AlertCircle, Map, Fuel, Wallet } from 'lucide-react';

interface Props {
  trips: DataRow[];
  fuel: DataRow[];
  expenses: DataRow[];
}

const Reports: React.FC<Props> = ({ trips, fuel, expenses }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const cleanDate = (val: any) => String(val || '').split('T')[0];

  const filterByDate = (row: any[], dateIdx: number) => {
    if (!dateRange.start && !dateRange.end) return true;
    const d = cleanDate(row[dateIdx]);
    if (!d) return false;
    const time = new Date(d).getTime();
    const start = dateRange.start ? new Date(dateRange.start).getTime() : -Infinity;
    const end = dateRange.end ? new Date(dateRange.end).getTime() : Infinity;
    return time >= start && time <= end;
  };

  const filteredTrips = useMemo(() => trips.filter(r => filterByDate(r, INDICES.TRIP.DATE)), [trips, dateRange]);
  const filteredFuel = useMemo(() => fuel.filter(r => filterByDate(r, INDICES.FUEL.DATE)), [fuel, dateRange]);
  const filteredExpenses = useMemo(() => expenses.filter(r => filterByDate(r, INDICES.EXPENSE.DATE)), [expenses, dateRange]);

  // Summary Metrics
  const summary = useMemo(() => ({
    totalKm: filteredTrips.reduce((acc, r) => acc + (Number(r[INDICES.TRIP.TOTAL_KM]) || 0), 0),
    totalFuel: filteredFuel.reduce((acc, r) => acc + (Number(r[INDICES.FUEL.FUEL_ADDED]) || 0), 0),
    totalExp: filteredExpenses.reduce((acc, r) => acc + (Number(r[INDICES.EXPENSE.AMOUNT]) || 0), 0)
  }), [filteredTrips, filteredFuel, filteredExpenses]);

  // Chart Data Preparation
  const kmTrendData = useMemo(() => {
    return filteredTrips
      .map(r => ({
        date: cleanDate(r[INDICES.TRIP.DATE]),
        km: Number(r[INDICES.TRIP.TOTAL_KM]) || 0
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredTrips]);

  const expenseBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    filteredExpenses.forEach(r => {
      const cat = String(r[INDICES.EXPENSE.CATEGORY] || 'Other');
      map[cat] = (map[cat] || 0) + (Number(r[INDICES.EXPENSE.AMOUNT]) || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredExpenses]);

  const triggerDownload = (name: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Atlas_${name}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportTrips = () => {
    const header = "Date,Trip ID,Vehicle,Driver,Origin,Destination,Distance(KM)\n";
    const body = filteredTrips.map(r => 
      `${cleanDate(r[INDICES.TRIP.DATE])},${r[INDICES.TRIP.ENTRY_ID]},${r[INDICES.TRIP.TRUCK_ID]},"${r[INDICES.TRIP.DRIVER]}","${r[INDICES.TRIP.ORIGIN]}","${r[INDICES.TRIP.DESTINATION]}",${r[INDICES.TRIP.TOTAL_KM]}`
    ).join("\n");
    triggerDownload("Trips", header + body);
  };

  const exportFuel = () => {
    const header = "Date,Log ID,Vehicle,Cost(Rs),Liters\n";
    const body = filteredFuel.map(r => 
      `${cleanDate(r[INDICES.FUEL.DATE])},${r[INDICES.FUEL.ID]},${r[INDICES.FUEL.TRUCK]},${r[INDICES.FUEL.COST]},${r[INDICES.FUEL.FUEL_ADDED]}`
    ).join("\n");
    triggerDownload("Fuel", header + body);
  };

  const exportExpenses = () => {
    const header = "Date,Exp ID,Category,Vehicle,Description,Amount(Rs)\n";
    const body = filteredExpenses.map(r => 
      `${cleanDate(r[INDICES.EXPENSE.DATE])},${r[INDICES.EXPENSE.ID]},${r[INDICES.EXPENSE.CATEGORY]},${r[INDICES.EXPENSE.TRUCK]},"${r[INDICES.EXPENSE.DESCRIPTION]}",${r[INDICES.EXPENSE.AMOUNT]}`
    ).join("\n");
    triggerDownload("Expenses", header + body);
  };

  if (trips.length === 0 && fuel.length === 0 && expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[2.5rem] animate-pulse">
        <AlertCircle size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Waiting for Atlas Cloud Sync...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-900/40 p-6 rounded-[2rem] border border-slate-800/60 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-4">
          <Calendar size={18} className="text-blue-500" />
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={dateRange.start}
              onChange={e => setDateRange({...dateRange, start: e.target.value})}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-black text-slate-200 outline-none focus:ring-1 focus:ring-blue-500" 
            />
            <span className="text-slate-700 font-black text-[10px] uppercase">to</span>
            <input 
              type="date" 
              value={dateRange.end}
              onChange={e => setDateRange({...dateRange, end: e.target.value})}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-black text-slate-200 outline-none focus:ring-1 focus:ring-blue-500" 
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportTrips} className="group flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            <FileSpreadsheet size={14} className="group-hover:scale-110 transition-transform" /> Trips CSV
          </button>
          <button onClick={exportFuel} className="group flex items-center gap-2 bg-amber-600/10 hover:bg-amber-600 text-amber-400 hover:text-white border border-amber-500/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            <FileSpreadsheet size={14} className="group-hover:scale-110 transition-transform" /> Fuel CSV
          </button>
          <button onClick={exportExpenses} className="group flex items-center gap-2 bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            <FileSpreadsheet size={14} className="group-hover:scale-110 transition-transform" /> Expenses CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex items-center gap-3 mb-6 text-blue-500">
            <Map size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Total Mileage</span>
          </div>
          <p className="text-4xl font-black text-slate-100">{summary.totalKm.toLocaleString()} <span className="text-xs text-slate-600">KM</span></p>
        </div>
        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex items-center gap-3 mb-6 text-amber-500">
            <Fuel size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Fuel Consumed</span>
          </div>
          <p className="text-4xl font-black text-slate-100">{summary.totalFuel.toLocaleString()} <span className="text-xs text-slate-600">LITERS</span></p>
        </div>
        <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex items-center gap-3 mb-6 text-rose-500">
            <Wallet size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Operational Cost</span>
          </div>
          <p className="text-4xl font-black text-slate-100"><span className="text-xl text-slate-600 mr-1">Rs.</span>{summary.totalExp.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800/60 h-[450px] shadow-inner">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest">Mileage Performance</h3>
            <TrendingUp size={16} className="text-blue-500" />
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kmTrendData}>
                <defs>
                  <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickMargin={12} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '10px'}} />
                <Area type="monotone" dataKey="km" stroke="#3b82f6" strokeWidth={4} fill="url(#colorKm)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800/60 h-[450px] shadow-inner">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest">Expense Breakdown</h3>
            <TrendingDown size={16} className="text-rose-500" />
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={100} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '10px'}} />
                <Bar dataKey="value" fill="#f43f5e" radius={[0, 8, 8, 0]} barSize={28} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
