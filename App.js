import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Truck, Plus } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('daily_trips');
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
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

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold italic">Fleet Activity</h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Plus className="w-4 h-4" /> New Entry
            </button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
            <p className="text-zinc-400">Welcome to Atlas Delivery Dashboard!</p>
            <p className="text-sm text-zinc-500 mt-2">Your system is now LIVE and connected.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
}
