
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { AssetCategory } from '../types';
import { useAssets } from '../contexts/AssetContext';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId: string;
}

export const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose, ownerId }) => {
  const { addAsset } = useAssets();
  const [step, setStep] = useState<'details' | 'media' | 'settings'>('details');
  
  const [formData, setFormData] = useState({
    name: '',
    category: AssetCategory.REAL_ESTATE as string,
    location: '',
    totalValue: 0,
    description: '',
    imageUrl: '',
    visibility: 'public' as 'public' | 'private',
    year: new Date().getFullYear().toString()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addAsset({
      name: formData.name,
      category: formData.category,
      location: formData.location,
      totalValue: Number(formData.totalValue),
      sharePrice: Number(formData.totalValue) / 8, // Default 1/8th model
      description: formData.description,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80', // Fallback
      visibility: formData.visibility,
      ownerId: ownerId,
      specs: [
        { label: 'Year', value: formData.year },
        { label: 'Listed By', value: 'Private Owner' }
      ]
    });
    
    onClose();
    // Reset form roughly
    setFormData({ ...formData, name: '', location: '', totalValue: 0, imageUrl: '' });
    setStep('details');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-center mb-8">
           <h3 className="text-xl font-bold text-marketing-black">List New Asset</h3>
           <p className="text-sm text-slate-500">Concierge Listing Service</p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 'details' && (
            <div className="space-y-4">
               <div>
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Asset Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent" placeholder="e.g. 1989 Porsche 911 Turbo" />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent">
                      {Object.values(AssetCategory).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Year / Model</label>
                    <input name="year" value={formData.year} onChange={handleChange} className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent" placeholder="YYYY" />
                  </div>
               </div>

               <div>
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Location</label>
                  <input required name="location" value={formData.location} onChange={handleChange} className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent" placeholder="City, Country" />
               </div>

               <div>
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Total Valuation (USD)</label>
                  <input required type="number" name="totalValue" value={formData.totalValue || ''} onChange={handleChange} className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent" placeholder="0.00" />
               </div>

               <div className="pt-4">
                  <Button type="button" onClick={() => setStep('media')} className="w-full">Next: Media & Privacy</Button>
               </div>
            </div>
          )}

          {step === 'media' && (
             <div className="space-y-4">
               <div>
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Image URL</label>
                  <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent" placeholder="https://..." />
                  <p className="text-[10px] text-slate-400 mt-1">Direct link to high-res image.</p>
               </div>

               <div>
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full border border-zinc-200 p-2 focus:outline-none focus:border-swiss-900 bg-transparent rounded-sm text-sm" placeholder="Describe the condition and provenance..." />
               </div>

               <div>
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Visibility</label>
                  <div className="flex gap-4">
                     <label className="flex items-center gap-2 cursor-pointer border border-zinc-200 p-3 rounded-sm flex-1 hover:bg-zinc-50">
                        <input type="radio" name="visibility" value="public" checked={formData.visibility === 'public'} onChange={handleChange} />
                        <span className="text-sm font-medium">Public Marketplace</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer border border-zinc-200 p-3 rounded-sm flex-1 hover:bg-zinc-50">
                        <input type="radio" name="visibility" value="private" checked={formData.visibility === 'private'} onChange={handleChange} />
                        <span className="text-sm font-medium">Private Portfolio</span>
                     </label>
                  </div>
               </div>

               <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep('details')} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1">List Asset</Button>
               </div>
             </div>
          )}
        </form>
      </div>
    </Modal>
  );
};
