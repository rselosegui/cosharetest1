import React from 'react';
import { Translation } from '../../types';

export const Footer: React.FC<{ t: Translation }> = ({ t }) => {
  return (
    <footer className="bg-platinum-50 border-t border-zinc-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tighter mb-4 flex items-center">
              c<span className="inline-block transform scale-x-[1.6] mx-1">o</span>share
            </h3>
            <p className="text-slate-500 max-w-sm font-light leading-relaxed">
              Redefining ownership through fractional access to the world's most coveted assets.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-slate-400">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-marketing-black transition">Marketplace</a></li>
              <li><a href="#" className="hover:text-marketing-black transition">Sell Your Asset</a></li>
              <li><a href="#" className="hover:text-marketing-black transition">Pricing Logic</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-slate-400">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-marketing-black transition">SPV Structure</a></li>
              <li><a href="#" className="hover:text-marketing-black transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-marketing-black transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>{t.footerRights}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <span>Dubai</span>
             <span>London</span>
             <span>Zurich</span>
          </div>
        </div>
      </div>
    </footer>
  );
};