
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AssetCard } from '../components/AssetCard';
import { LeadCaptureModal } from '../components/LeadCaptureModal';
import { Translation, AssetCategory, Asset } from '../types';
import { SELLING_POINTS } from '../constants';
import { useAssets } from '../contexts/AssetContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HomeProps {
  t: Translation;
}

// Curated high-resolution lifestyle imagery matching the brand's verticals
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop", // Modern Villa Architecture
  "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=2670&auto=format&fit=crop", // Defender in Desert (4x4)
  "https://images.unsplash.com/photo-1605281317010-fe5ffe79ba02?q=80&w=2670&auto=format&fit=crop", // Yacht Deck Lifestyle
  "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2670&auto=format&fit=crop", // Superbike Detail
  "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2670&auto=format&fit=crop", // Private Jet Abstract
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop", // Classic Car Interior
];

export const Home: React.FC<HomeProps> = ({ t }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getPublicAssets } = useAssets();
  
  const allAssets = getPublicAssets();

  // Select specific assets for the featured section: 1 Real Estate, 1 Supercar, 1 Yacht
  const featuredAssets = [
    allAssets.find(a => a.category === AssetCategory.REAL_ESTATE),
    allAssets.find(a => a.category === AssetCategory.SUPERCAR),
    allAssets.find(a => a.category === AssetCategory.YACHT)
  ].filter((a): a is Asset => a !== undefined);
  
  // Cost Calculator Data Mockup
  const chartData = [
    { name: 'Sole Owner', cost: 240000, color: '#E5E5EA' },
    { name: 'coshare 1/8', cost: 35000, color: '#1D1D1F' },
  ];

  // Rotate images with a slower, more premium interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds per slide for a relaxed pace
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section - Immersive, Minimal, Animated */}
      <section className="relative h-[100vh] supports-[height:100dvh]:h-[100dvh] flex items-center justify-center overflow-hidden bg-swiss-900">
        {/* Animated Background Layers */}
        {HERO_IMAGES.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 z-0 transition-all duration-[2500ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <div className="w-full h-full relative overflow-hidden">
               {/* Ken Burns Effect: Slower scale duration (10s) creates a subtle drift vs a fast zoom */}
               <img 
                src={img} 
                alt="Lifestyle Background" 
                className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear transform will-change-transform ${
                  index === currentImageIndex ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Vignette & Tint for text readability */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        ))}

        {/* Sophisticated Gradient Overlays */}
        {/* Top shadow for Nav visibility */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none"></div>
        {/* Bottom wash for text readability - stronger gradient for white text */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10 pointer-events-none"></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16 md:mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-marketing-black mb-6 leading-tight drop-shadow-sm mix-blend-hard-light">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-medium mb-10 tracking-wide max-w-2xl mx-auto drop-shadow-sm">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-none min-w-[200px] shadow-2xl shadow-swiss-900/20 hover:scale-105 transition-transform transform duration-300 bg-marketing-black text-white border-0">{t.ctaBrowse}</Button>
            </Link>
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto rounded-none border-marketing-black text-marketing-black min-w-[200px] bg-white/30 backdrop-blur-md hover:bg-white/60 transition-all duration-300"
            >
              {t.ctaWaitlist}
            </Button>
          </div>
        </div>

        {/* Slide Progress Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_IMAGES.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-700 ease-out shadow-sm ${
                        idx === currentImageIndex ? 'w-12 bg-marketing-black' : 'w-2 bg-slate-400/50 hover:bg-marketing-black/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>
      </section>

      {/* The 1/8th Logic Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-swiss-900 font-bold tracking-widest uppercase text-xs mb-4 block">The Model</span>
            <h2 className="text-3xl font-bold mb-6">{t.fractionConcept}</h2>
            <p className="text-slate-600 font-light leading-relaxed mb-8">
              Why pay for 100% of an asset you use 10% of the time? Owning 1/8th guarantees you 44 days of exclusive usage per year. 
              We handle the maintenance, insurance, and management. You simply arrive.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div className="border-l-2 border-marketing-black pl-4">
                <p className="text-3xl font-bold">44</p>
                <p className="text-sm text-slate-500 uppercase mt-1">Days / Year</p>
              </div>
              <div className="border-l-2 border-marketing-black pl-4">
                <p className="text-3xl font-bold">-87%</p>
                <p className="text-sm text-slate-500 uppercase mt-1">Cost Savings</p>
              </div>
            </div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-80 bg-platinum-50 p-8 rounded-sm">
            <h3 className="text-sm font-semibold mb-6 text-center">Cost Comparison (Annual)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '0px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* How it works - Minimal Line Icons */}
      <section className="py-24 bg-platinum-50 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-16 text-center">{t.howItWorks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Browse', 'Purchase 1/8', 'Schedule App', 'Enjoy'].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-slate-300 flex items-center justify-center mb-6 text-xl font-serif italic text-slate-400 bg-white">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step}</h3>
                <p className="text-sm text-slate-500 font-light max-w-[200px]">
                  Seamless digital process with full legal transparency.
                </p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-slate-200 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assets */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">{t.assetsTitle}</h2>
            <Link to="/marketplace" className="text-sm font-medium border-b border-marketing-black pb-1 hover:text-slate-600 transition">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAssets.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us / Selling Points */}
      <section className="py-24 bg-marketing-black text-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">{t.whyUs}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SELLING_POINTS.map((point, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <div className="mb-4 text-slate-400">
                  {/* Placeholder for Icon */}
                  <div className="w-8 h-8 border border-slate-600 rounded-full flex items-center justify-center text-xs">
                   ✓
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                <p className="text-sm text-slate-400 font-light">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
