
import React, { useState } from 'react';
import { DataRow } from '../types';
import { INDICES } from '../constants';
import { Fuel, Receipt, TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';

interface Props {
  fuel: DataRow[];
  expenses: DataRow[];
  trucks: DataRow[];
  onSubmitFuel: (rowData: any[]) => void;
  onSubmitExpense: (rowData: any[]) => void;
}

const Finance: React.FC<Props> = ({ fuel, expenses, trucks, onSubmitFuel, onSubmitExpense }) => {
  const [fuelForm, setFuelForm] = useState({ 
    id: `FL-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0], 
    truck: '', 
    cost: '', 
    added: '' 
  });
  
  const [expenseForm, setExpenseForm] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    category: 'Maintenance', 
    amount: '', 
    description: '', 
    truck: '' 
  });

  // STRICT INDEX SUMMING: Fuel[4] and Expense[6]
  const totalFuelVal = fuel.reduce((acc, row) => acc + (Number(row[INDICES.FUEL.FUEL_ADDED]) || 0), 0);
  const totalExpVal = expenses.reduce((acc, row) => acc + (Number(row[INDICES.EXPENSE.AMOUNT]) || 0), 0);

  const cardClass = "bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl shadow-xl";
  const inputClass = "w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-slate-200";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block ml-1";

  const onFuelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Maintain standard submission order but ensure consistency
    onSubmitFuel([fuelForm.id, fuelForm.date, fuelForm.truck, fuelForm.cost, fuelForm.added]);
    setFuelForm({ ...fuelForm, id: `FL-${Math.floor(Math.random()*1000)}`, cost: '', added: '' });
  };

  const onExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitExpense([expenseForm.date, expenseForm.category, expenseForm.amount, expenseForm.description, expenseForm.truck]);
    setExpenseForm({ ...expenseForm, amount: '', description: '' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardClass}>
          <div className="flex justify-between items-center mb-4 text-amber-500">
            <Fuel size={24} />
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Fuel Volume</p>
          <h3 className="text-3xl font-black mt-2 text-slate-100">{totalFuelVal.toLocaleString()} Units</h3>
        </div>

        <div className={cardClass}>
          <div className="flex justify-between items-center mb-4 text-blue-500">
            <Receipt size={24} />
            <TrendingDown size={16} className="text-rose-500" />
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Operational Burn</p>
          <h3 className="text-3xl font-black mt-2 text-slate-100">${totalExpVal.toLocaleString()}</h3>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-2xl shadow-blue-500/20 flex flex-col justify-between">
          <div>
            <p className="text-blue-100/70 text-xs font-bold uppercase tracking-widest">Fiscal Summary</p>
            <h3 className="text-4xl font-black mt-2 text-white">Metrics Live</h3>
          </div>
          <div className="flex items-center gap-2 text-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mt-4">
            <DollarSign size={14} /> Verified via rawExpenses[6]
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-8">
            <Fuel className="text-amber-500" size={20} />
            <h3 className="text-lg font-bold text-slate-100">Fuel Log Entry</h3>
          </div>
          <form className="space-y-5" onSubmit={onFuelSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Refill Date</label>
                <input type="date" required value={fuelForm.date} onChange={e => setFuelForm({...fuelForm, date: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Vehicle ID</label>
                <select required value={fuelForm.truck} onChange={e => setFuelForm({...fuelForm, truck: e.target.value})} className={inputClass}>
                  <option value="">Select Truck</option>
                  {trucks.map((row, i) => <option key={i} value={row[0]}>{row[1]} ({row[0]})</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Total Cost ($)</label>
                <input type="number" required placeholder="0.00" value={fuelForm.cost} onChange={e => setFuelForm({...fuelForm, cost: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Litres Added</label>
                <input type="number" required placeholder="0.00" value={fuelForm.added} onChange={e => setFuelForm({...fuelForm, added: e.target.value})} className={inputClass} />
              </div>
            </div>
            <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-600/20 active:scale-[0.98]">
              Record Fuel Transaction
            </button>
          </form>
        </div>

        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-8">
            <Receipt className="text-blue-500" size={20} />
            <h3 className="text-lg font-bold text-slate-100">Operational Expense</h3>
          </div>
          <form className="space-y-5" onSubmit={onExpenseSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Expense Date</label>
                <input type="date" required value={expenseForm.date} onChange={e => setExpenseForm({...expenseForm, date: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cost Category</label>
                <select className={inputClass} value={expenseForm.category} onChange={e => setExpenseForm({...expenseForm, category: e.target.value})}>
                  <option>Maintenance</option>
                  <option>Tolls</option>
                  <option>Registration</option>
                  <option>Insurance</option>
                  <option>Personnel</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Related Vehicle</label>
              <select className={inputClass} value={expenseForm.truck} onChange={e => setExpenseForm({...expenseForm, truck: e.target.value})}>
                <option value="">General Fleet Expense</option>
                {trucks.map((row, i) => <option key={i} value={row[0]}>{row[1]}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4">
               <div>
                  <label className={labelClass}>Total Amount ($)</label>
                  <input type="number" required placeholder="0.00" value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} className={inputClass} />
               </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
              Log Expense Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Finance;
