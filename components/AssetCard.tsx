
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Asset } from '../types';
import { Skeleton } from './ui/Skeleton';
import { useCurrency } from '../contexts/CurrencyContext';

interface AssetCardProps {
  asset: Asset;
  compact?: boolean;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, compact = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { formatPrice } = useCurrency();

  return (
    <Link to={`/asset/${asset.id}`} className="block group h-full">
      <div className={`bg-white border border-transparent hover:border-zinc-200 transition-all duration-300 h-full flex flex-col ${compact ? 'text-sm' : ''}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full z-10" />
          )}
          <img 
            src={asset.imageUrl} 
            alt={asset.name} 
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Minimalist Status Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-marketing-black z-20">
            {asset.category}
          </div>
          
          {asset.isGoldenVisa && (
             <div className="absolute top-4 right-4 bg-emerald-50/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-emerald-800 border border-emerald-100 z-20">
               Residency
             </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 flex flex-col flex-grow ${compact ? 'p-4' : 'p-6'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`${compact ? 'text-base' : 'text-lg'} font-medium text-marketing-black leading-tight group-hover:text-swiss-900 transition-colors`}>
              {asset.name}
            </h3>
          </div>
          
          <p className="text-sm text-slate-500 mb-6 font-light">{asset.location}</p>

          {/* Specs Grid */}
          {!compact && (
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-100 py-4 mb-4 mt-auto">
              {asset.specs.map((spec, idx) => (
                <div key={idx}>
                  <p className="text-[10px] uppercase text-slate-400 tracking-wider">{spec.label}</p>
                  <p className="text-sm font-medium text-slate-700">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Funding Progress */}
          <div className={`${compact ? 'mt-auto' : ''}`}>
            <div className="flex justify-between text-xs mb-2 font-medium">
              <span className="text-slate-900">1/8 Share</span>
              <span className="text-slate-900">{formatPrice(asset.sharePrice)}</span>
            </div>
            <div className="h-[2px] w-full bg-zinc-100">
              <div 
                className="h-full bg-marketing-black transition-all duration-1000 ease-out" 
                style={{ width: `${asset.fundedPercentage}%` }}
              />
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
              <span>{asset.fundedPercentage}% Funded</span>
              <span>{8 - Math.ceil((asset.fundedPercentage / 100) * 8)} shares left</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
