
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { Lightbox } from '../components/ui/Lightbox';
import { AssetCard } from '../components/AssetCard';
import { LeadCaptureModal } from '../components/LeadCaptureModal';
import { SyndicateModal } from '../components/SyndicateModal';
import { PanoramaViewer } from '../components/PanoramaViewer';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAssets } from '../contexts/AssetContext';

export const AssetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAsset, getPublicAssets } = useAssets();
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyndicateOpen, setIsSyndicateOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | '360'>('gallery');
  
  const { formatPrice } = useCurrency();

  // Find current asset
  const asset = id ? getAsset(id) : undefined;
  
  // Public Assets for similar list
  const publicAssets = getPublicAssets();

  // Filter for Similar Assets (Same category, excluding current)
  const similarAssets = publicAssets
    .filter(a => a.category === asset?.category && a.id !== asset?.id)
    .slice(0, 3);

  // Fallback if not enough similar assets
  const displaySimilar = similarAssets.length > 0 
    ? similarAssets 
    : publicAssets.filter(a => a.id !== asset?.id).slice(0, 3);

  useEffect(() => {
    setIsLoading(true);
    setViewMode('gallery');
    // Simulate data fetch latency
    const timer = setTimeout(() => setIsLoading(false), 500);
    window.scrollTo(0, 0); // Ensure scroll to top on id change
    return () => clearTimeout(timer);
  }, [id]);

  if (!asset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Asset Not Found</h2>
          <Link to="/marketplace"><Button>Return to Marketplace</Button></Link>
        </div>
      </div>
    );
  }

  const images = asset.gallery && asset.gallery.length > 0 ? asset.gallery : [asset.imageUrl, asset.imageUrl, asset.imageUrl];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Left Column: Visuals & Content */}
        <div className="lg:col-span-8 bg-platinum-50 flex flex-col">
          
          {/* View Mode Toggles */}
          {asset.panoramaUrl && (
             <div className="bg-white px-6 py-3 border-b border-zinc-100 flex gap-4 sticky top-20 z-30 lg:static">
               <button 
                  onClick={() => setViewMode('gallery')}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === 'gallery' ? 'text-marketing-black' : 'text-slate-400 hover:text-marketing-black'}`}
               >
                  Gallery
               </button>
               <button 
                  onClick={() => setViewMode('360')}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === '360' ? 'text-marketing-black' : 'text-slate-400 hover:text-marketing-black'}`}
               >
                  360° Immersion
               </button>
             </div>
          )}

          {/* Visual Container */}
          <div className="flex flex-col gap-1 p-1 min-h-[50vh] lg:min-h-0">
            {isLoading ? (
               <>
                 <Skeleton className="w-full aspect-video" />
                 <Skeleton className="w-full aspect-video" />
               </>
            ) : viewMode === '360' && asset.panoramaUrl ? (
                <div className="p-4 bg-zinc-900 h-full flex items-center justify-center">
                   <PanoramaViewer imageUrl={asset.panoramaUrl} />
                </div>
            ) : (
               images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative w-full group cursor-zoom-in overflow-hidden"
                  onClick={() => openLightbox(idx)}
                >
                  <img 
                    src={img} 
                    alt={`${asset.name} - View ${idx + 1}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-marketing-black shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Fullscreen
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-8 lg:p-16 max-w-4xl mx-auto w-full">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">{asset.category}</span>
              <h1 className="text-3xl md:text-5xl font-bold text-marketing-black mb-4">{asset.name}</h1>
              <p className="text-lg text-slate-500 font-light flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-slate-400"></span>
                {asset.location}
              </p>
            </div>

            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-lg font-light leading-relaxed text-slate-700">
                {asset.description || "A masterpiece of design and engineering. This asset represents the pinnacle of its category, offering unparallelled performance and luxury."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-200 py-8">
               {asset.specs.map((spec, i) => (
                 <div key={i}>
                   <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-1">{spec.label}</h4>
                   <p className="text-xl font-medium text-marketing-black">{spec.value}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Similar Assets Section */}
          <div className="bg-white border-t border-zinc-100 p-8 lg:p-16 mt-auto">
             <h3 className="text-xl font-bold text-marketing-black mb-8">You Might Also Desire</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <>
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                  </>
                ) : (
                  displaySimilar.map(similar => (
                    <AssetCard key={similar.id} asset={similar} compact={true} />
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Sticky Financial Module */}
        <div className="lg:col-span-4 bg-white border-l border-zinc-100 lg:h-screen lg:sticky lg:top-0 overflow-y-auto">
          <div className="p-8 lg:p-10 flex flex-col h-full">
             <div className="mb-8 mt-12 lg:mt-0">
               <div className="flex items-center justify-between mb-4">
                 <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                   {asset.status || 'Funding'}
                 </span>
                 <span className="text-xs font-medium text-slate-400">{asset.fundedPercentage}% Funded</span>
               </div>
               <div className="h-[2px] w-full bg-zinc-100 mb-6">
                 <div className="h-full bg-marketing-black" style={{ width: `${asset.fundedPercentage}%` }} />
               </div>
               
               <div className="text-center mb-8">
                 <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">1/8th Ownership Share</p>
                 <p className="text-4xl font-bold text-marketing-black">{formatPrice(asset.sharePrice)}</p>
               </div>

               <div className="flex flex-col gap-3 mb-4">
                 <Button onClick={() => setIsModalOpen(true)} className="w-full py-4 text-lg" size="lg">Reserve Share</Button>
                 <Button onClick={() => setIsSyndicateOpen(true)} variant="outline" className="w-full" size="md">
                    Create Syndicate (Group Buy)
                 </Button>
               </div>
               <p className="text-center text-xs text-slate-400">Fully refundable reservation deposit ($1,000)</p>
             </div>

             {/* Financial Breakdown Accordion Style */}
             <div className="border-t border-zinc-100 py-6 mt-auto">
               <h3 className="text-sm font-bold text-marketing-black mb-4">Financial Breakdown</h3>
               <div className="space-y-3 text-sm">
                 <div className="flex justify-between">
                   <span className="text-slate-500">Asset Valuation</span>
                   <span className="font-medium">{formatPrice(asset.totalValue)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500">SPV Formation & Legal (1.5%)</span>
                   <span className="font-medium">{formatPrice(asset.totalValue * 0.015)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500">coshare Sourcing Fee (2.5%)</span>
                   <span className="font-medium">{formatPrice(asset.totalValue * 0.025)}</span>
                 </div>
                 <div className="flex justify-between border-t border-zinc-100 pt-3 mt-3">
                   <span className="font-bold text-marketing-black">Total Offering Value</span>
                   <span className="font-bold text-marketing-black">{formatPrice(asset.totalValue * 1.04)}</span>
                 </div>
               </div>
             </div>

             <div className="bg-platinum-50 p-6 -mx-8 -mb-10 lg:mb-0 mt-8 lg:mt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Concierge Support</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Have questions about the legal structure or usage rights? Speak directly to our Private Client team.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-white border-zinc-200">Contact Concierge</Button>
             </div>
          </div>
        </div>

      </div>

      {/* Lightbox Overlay */}
      <Lightbox 
        images={images} 
        isOpen={lightboxOpen} 
        initialIndex={currentImageIndex} 
        onClose={() => setLightboxOpen(false)} 
      />

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        assetName={asset.name}
      />

      {/* Syndicate Modal */}
      <SyndicateModal 
        isOpen={isSyndicateOpen} 
        onClose={() => setIsSyndicateOpen(false)} 
        assetName={asset.name}
      />
    </div>
  );
};
