
import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Button } from '../components/ui/Button';
import { SchedulingModal } from '../components/SchedulingModal';
import { SettingsModal } from '../components/SettingsModal';

export const Dashboard: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedAssetForSchedule, setSelectedAssetForSchedule] = useState('');

  // Mock Data
  const portfolioValue = 82500;
  const initialValue = 75000;
  const growth = ((portfolioValue - initialValue) / initialValue) * 100;

  const handleSchedule = (assetName: string) => {
    setSelectedAssetForSchedule(assetName);
    setIsSchedulingOpen(true);
  };

  return (
    <div className="min-h-screen bg-platinum-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <h1 className="text-3xl font-bold text-swiss-900">Welcome back, Mr. Sterling</h1>
             <p className="text-slate-500">Member ID: CS-8821-X</p>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={() => setIsSettingsOpen(true)}
                className="bg-white border border-zinc-200 text-slate-600 hover:text-marketing-black hover:border-marketing-black px-4 py-3 text-sm font-medium flex items-center gap-2 transition-all duration-200"
             >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Account
             </button>
             <Button variant="outline" className="bg-white">Concierge</Button>
             <Button>New Acquisition</Button>
          </div>
        </header>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 shadow-sm border border-zinc-100">
             <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Total Asset Value</h3>
             <div className="flex items-end gap-3">
               <span className="text-3xl font-bold text-marketing-black">{formatPrice(portfolioValue)}</span>
               <span className="text-emerald-600 text-sm font-medium mb-1">+{growth.toFixed(1)}%</span>
             </div>
          </div>
          <div className="bg-white p-6 shadow-sm border border-zinc-100">
             <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Annual Usage Remaining</h3>
             <div className="flex items-end gap-3">
               <span className="text-3xl font-bold text-marketing-black">38 Days</span>
               <span className="text-slate-400 text-sm font-medium mb-1">of 44</span>
             </div>
          </div>
          <div className="bg-white p-6 shadow-sm border border-zinc-100">
             <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Next Dividend</h3>
             <div className="flex items-end gap-3">
               <span className="text-3xl font-bold text-marketing-black">Oct 15</span>
               <span className="text-slate-400 text-sm font-medium mb-1">Estimated</span>
             </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: My Assets */}
           <div className="lg:col-span-2 space-y-6">
             <h2 className="text-xl font-bold text-swiss-900">My Portfolio</h2>
             
             {/* Asset Card */}
             <div className="bg-white border border-zinc-100 flex flex-col md:flex-row overflow-hidden group hover:shadow-lg transition-shadow">
               <div className="md:w-1/3 h-48 md:h-auto relative">
                 <img src="https://picsum.photos/id/1071/800/600" alt="Ferrari" className="w-full h-full object-cover" />
                 <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-[10px] uppercase font-bold">12.5% Share</div>
               </div>
               <div className="p-6 flex-1 flex flex-col justify-between">
                 <div>
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-lg font-bold">Ferrari SF90 Stradale</h3>
                     <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-sm">Active</span>
                   </div>
                   <p className="text-sm text-slate-500 mb-4">Location: Monaco (Storage A)</p>
                   <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 pt-4">
                      <div>
                        <p className="text-[10px] uppercase text-slate-400">Your Equity</p>
                        <p className="font-medium text-sm">{formatPrice(portfolioValue)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400">Maintenance</p>
                        <p className="font-medium text-sm">Paid (Q3)</p>
                      </div>
                      <div>
                         <p className="text-[10px] uppercase text-slate-400">Usage</p>
                         <p className="font-medium text-sm">6 Days Used</p>
                      </div>
                   </div>
                 </div>
                 <div className="mt-6 flex gap-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSchedule('Ferrari SF90 Stradale')}
                    >
                      Schedule Drive
                    </Button>
                    <Button size="sm" variant="ghost">Sell Share</Button>
                 </div>
               </div>
             </div>
           </div>

           {/* Right: Upcoming */}
           <div className="space-y-6">
             <h2 className="text-xl font-bold text-swiss-900">Upcoming Schedule</h2>
             <div className="bg-white border border-zinc-100 p-6">
                <div className="border-l-2 border-marketing-black pl-4 py-1 mb-6">
                   <p className="text-sm font-bold">Monaco Grand Prix Wknd</p>
                   <p className="text-xs text-slate-500">May 24 - May 27 • Confirmed</p>
                </div>
                <div className="border-l-2 border-zinc-200 pl-4 py-1">
                   <p className="text-sm font-bold text-slate-400">Summer Alpine Tour</p>
                   <p className="text-xs text-slate-400">Aug 10 - Aug 16 • Pending Swap</p>
                </div>
                
                <Button 
                  className="w-full mt-8" 
                  variant="outline"
                  onClick={() => handleSchedule('Global Portfolio Calendar')}
                >
                  Open Calendar
                </Button>
             </div>
           </div>

        </div>
      </div>

      <SchedulingModal 
        isOpen={isSchedulingOpen} 
        onClose={() => setIsSchedulingOpen(false)} 
        assetName={selectedAssetForSchedule}
      />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};
