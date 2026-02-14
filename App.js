import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LayoutDashboard, Truck, Fuel, Wallet, 
  BarChart3, AlertCircle, Plus, Download, Search 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';

const App = () => {
  const [activeTab, setActiveTab] = useState('daily_trips');
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      {/* Sidebar / Header */}
      <header className="border-b border-zinc-800 p-4 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">LogiTrack <span className="text-orange-500">Pro</span></h1>
          </div>
          <nav className="flex gap-4">
            <button onClick={() => setActiveTab('daily_trips')} className={`px-4 py-2 rounded-md transition ${activeTab === 'daily_trips' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-800'}`}>Trips</button>
            <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 rounded-md transition ${activeTab === 'reports' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-800'}`}>Reports</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'daily_trips' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold italic">Fleet Activity</h2>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Plus className="w-4 h-4" /> New Entry
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-zinc-400 text-sm">Total KM Today</p>
                <p className="text-2xl font-bold">1,240 <span className="text-sm font-normal text-zinc-500">km</span></p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-zinc-400 text-sm">Fuel Consumed</p>
                <p className="text-2xl font-bold text-orange-400">320 <span className="text-sm font-normal text-zinc-500">L</span></p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-zinc-400 text-sm">Pending Alerts</p>
                <p className="text-2xl font-bold text-red-500">2</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
               <table className="w-full text-left">
                 <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
                   <tr>
                     <th className="p-4">Truck ID</th>
                     <th className="p-4">Route</th>
                     <th className="p-4">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-800">
                   <tr className="hover:bg-zinc-800/30 transition">
                     <td className="p-4 font-medium">T-9021</td>
                     <td className="p-4">Karachi → Lahore</td>
                     <td className="p-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs">Completed</span></td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500">
            Reports and Charts are loading...
          </div>
        )}
      </main>
    </div>
  );
};

// Root mount
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
