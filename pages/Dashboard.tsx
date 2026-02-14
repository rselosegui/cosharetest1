
import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAssets } from '../contexts/AssetContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { SchedulingModal } from '../components/SchedulingModal';
import { SettingsModal } from '../components/SettingsModal';
import { AddAssetModal } from '../components/AddAssetModal';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { getUserAssets } = useAssets();
  const { user } = useAuth();
  
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [selectedAssetForSchedule, setSelectedAssetForSchedule] = useState('');

  // Use authenticated user ID or fallback
  const USER_ID = user?.id || 'user-1'; 
  const myAssets = getUserAssets(USER_ID);

  // New Logic: Relevant Stats for a User/Seller
  // 1. Net Asset Value (Sum of totalValue of items they own/list)
  const netAssetValue = myAssets.reduce((acc, asset) => acc + (asset.totalValue || 0), 0);
  
  // 2. Active Listings (Count of Public items)
  const activeListingsCount = myAssets.filter(a => a.visibility === 'public').length;
  
  // 3. Buyer Inquiries (Mocked based on listings)
  const buyerInquiries = activeListingsCount * 3 + 2; 

  const handleSchedule = (assetName: string) => {
    setSelectedAssetForSchedule(assetName);
    setIsSchedulingOpen(true);
  };

  return (
    <div className="min-h-screen bg-platinum-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <h1 className="text-3xl font-bold text-swiss-900">Welcome back, {user?.name?.split(' ')[1] || 'Partner'}</h1>
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
             
             {/* Prominent New Acquisition Button */}
             <Button 
               onClick={() => setIsAddAssetOpen(true)} 
               className="bg-swiss-900 hover:bg-swiss-800 shadow-lg shadow-swiss-900/20"
             >
               + New Acquisition
             </Button>
          </div>
        </header>

        {/* Portfolio Summary - Rethought for Relevance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 shadow-sm border border-zinc-100">
             <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Net Asset Value</h3>
             <div className="flex items-end gap-3">
               <span className="text-3xl font-bold text-marketing-black">{formatPrice(netAssetValue)}</span>
             </div>
             <p className="text-[10px] text-slate-400 mt-2">Total valuation of portfolio holdings</p>
          </div>
          <div className="bg-white p-6 shadow-sm border border-zinc-100">
             <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Active Listings</h3>
             <div className="flex items-end gap-3">
               <span className="text-3xl font-bold text-marketing-black">{activeListingsCount}</span>
               <span className="text-emerald-600 text-sm font-medium mb-1">Public</span>
             </div>
              <p className="text-[10px] text-slate-400 mt-2">Visible on Global Marketplace</p>
          </div>
          <div className="bg-white p-6 shadow-sm border border-zinc-100">
             <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Buyer Inquiries</h3>
             <div className="flex items-end gap-3">
               <span className="text-3xl font-bold text-marketing-black">{buyerInquiries}</span>
               <span className="text-emerald-600 text-sm font-medium mb-1">New</span>
             </div>
             <p className="text-[10px] text-slate-400 mt-2">Pending Concierge Review</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: My Assets */}
           <div className="lg:col-span-2 space-y-6">
             <h2 className="text-xl font-bold text-swiss-900 flex items-center gap-2">
               My Portfolio
               <span className="bg-zinc-200 text-zinc-600 px-2 py-0.5 text-xs rounded-full">{myAssets.length}</span>
             </h2>
             
             {myAssets.length === 0 ? (
               <div className="bg-white border border-zinc-100 p-8 text-center">
                 <p className="text-slate-500 mb-4">You haven't listed any assets yet.</p>
                 <Button onClick={() => setIsAddAssetOpen(true)} variant="outline">List your first asset</Button>
               </div>
             ) : (
                <div className="space-y-4">
                  {myAssets.map(asset => (
                    <div key={asset.id} className="bg-white border border-zinc-100 flex flex-col md:flex-row overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-[10px] uppercase font-bold">Owner</div>
                        
                        {asset.visibility === 'private' ? (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-[10px] uppercase font-bold flex items-center gap-1">
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                             Private
                          </div>
                        ) : (
                           <div className="absolute bottom-2 right-2 bg-emerald-600/90 text-white px-2 py-1 text-[10px] uppercase font-bold flex items-center gap-1">
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                             Public
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold">{asset.name}</h3>
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-sm">Active</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-4">Location: {asset.location}</p>
                          <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 pt-4">
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Valuation</p>
                                <p className="font-medium text-sm">{formatPrice(asset.totalValue)}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Share Price</p>
                                <p className="font-medium text-sm">{formatPrice(asset.sharePrice)}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Category</p>
                                <p className="font-medium text-sm">{asset.category}</p>
                              </div>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Link to={`/asset/${asset.id}`} className="inline-block">
                              <Button size="sm" variant="outline">View Details</Button>
                            </Link>
                            <Button size="sm" variant="ghost">Edit Listing</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             )}
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

      <AddAssetModal 
        isOpen={isAddAssetOpen}
        onClose={() => setIsAddAssetOpen(false)}
        ownerId={USER_ID}
      />
    </div>
  );
};
