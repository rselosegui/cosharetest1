import React, { useState } from 'react';
import { AssetCard } from '../components/AssetCard';
import { Button } from '../components/ui/Button';
import { SEED_ASSETS } from '../constants';
import { AssetCategory } from '../types';

export const Marketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const categories = ['All', ...Object.values(AssetCategory)];

  const filteredAssets = activeCategory === 'All' 
    ? SEED_ASSETS 
    : SEED_ASSETS.filter(a => a.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Filter Header */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100 py-4 transition-all">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar flex justify-between items-center gap-4">
          <div className="flex space-x-2 whitespace-nowrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-marketing-black text-white' 
                    : 'bg-platinum-50 text-slate-600 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="hidden md:block border-l border-zinc-200 pl-4">
            <button 
               onClick={() => setViewMode(viewMode === 'grid' ? 'compact' : 'grid')}
               className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-marketing-black flex items-center gap-2"
            >
              <span className={`w-4 h-4 border border-current ${viewMode === 'grid' ? 'bg-current' : ''}`}></span>
              {viewMode === 'grid' ? 'Compact View' : 'Editorial View'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-marketing-black">
            {activeCategory === 'All' ? 'Global Portfolio' : `${activeCategory} Collection`}
          </h1>
          {/* Mobile view toggle could go here if needed, but keeping it simple */}
        </div>

        {filteredAssets.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {filteredAssets.map(asset => (
              <AssetCard key={asset.id} asset={asset} compact={viewMode === 'compact'} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400">No assets currently available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
