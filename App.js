
import React, { useState, useEffect, useCallback } from 'react';
import { Tab, DashboardData, Notification } from './types';
import { fetchDashboardData, submitData } from './services/api';
import Sidebar from './components/Sidebar';
import Trips from './components/Trips';
import Finance from './components/Finance';
import Foundation from './components/Foundation';
import Reports from './components/Reports';
import NotificationSystem from './components/NotificationSystem';
import { Loader2, RefreshCcw, Bell, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.TRIPS);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      addNotification('error', 'Cloud connection failed. Check network integrity.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleTripSubmit = async (rowData: any[]) => {
    const success = await submitData('Daily_Trips', rowData);
    if (success) {
      addNotification('success', 'Trip dispatch archived in Atlas.');
      loadData();
    } else {
      addNotification('error', 'Sync protocol failed.');
    }
  };

  const handleFuelSubmit = async (rowData: any[]) => {
    const success = await submitData('Fuel_Log', rowData);
    if (success) {
      addNotification('success', 'Fuel transaction logged.');
      loadData();
    } else {
      addNotification('error', 'Push rejected by Atlas Cloud.');
    }
  };

  const handleExpenseSubmit = async (rowData: any[]) => {
    const success = await submitData('Expenses', rowData);
    if (success) {
      addNotification('success', 'Fiscal expenditure updated.');
      loadData();
    } else {
      addNotification('error', 'Financial record failed.');
    }
  };

  const renderContent = () => {
    if (loading && !data) {
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-950 min-h-[60vh]">
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute -inset-10 bg-blue-600/10 blur-[60px] rounded-full animate-pulse"></div>
              <Loader2 className="animate-spin text-blue-500 relative" size={72} strokeWidth={1} />
            </div>
            <div className="text-center space-y-3">
              <p className="text-white font-black text-3xl tracking-tighter uppercase italic">Atlas Operations</p>
              <p className="text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase">Checking 2D Array Integrity...</p>
            </div>
          </div>
        </div>
      );
    }

    if (!data) return null;

    switch (activeTab) {
      case Tab.TRIPS:
        return <Trips trips={data.trips} trucks={data.trucks} drivers={data.drivers} onSubmit={handleTripSubmit} />;
      case Tab.FINANCE:
        return <Finance fuel={data.fuel} expenses={data.expenses} trucks={data.trucks} onSubmitFuel={handleFuelSubmit} onSubmitExpense={handleExpenseSubmit} />;
      case Tab.FOUNDATION:
        return <Foundation trucks={data.trucks} drivers={data.drivers} />;
      case Tab.REPORTS:
        return <Reports trips={data.trips} fuel={data.fuel} expenses={data.expenses} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-slate-100 selection:bg-blue-600/30 font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-10 lg:p-16 overflow-y-auto max-h-screen relative no-scrollbar bg-gradient-to-br from-slate-950 to-black">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-3.5 rounded-2xl border border-blue-400/20 shadow-2xl shadow-blue-900/10">
              <User className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Malak Zubair</h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Fleet Manager | Atlas Delivery</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              onClick={loadData}
              disabled={loading}
              className="px-8 py-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white transition-all hover:border-slate-700 disabled:opacity-50 flex items-center gap-3 text-xs font-black uppercase tracking-widest shadow-xl"
            >
              <RefreshCcw className={loading ? "animate-spin" : ""} size={14} />
              Core Sync
            </button>
            <div className="h-10 w-[1px] bg-slate-800/60 mx-1"></div>
            <button className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-white relative transition-all group">
              <Bell size={20} />
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-blue-600 rounded-full border-[3px] border-slate-950 shadow-lg group-hover:bg-blue-400 transition-colors"></span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <NotificationSystem notifications={notifications} remove={removeNotification} />
    </div>
  );
};

export default App;
