
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Jonathan',
    lastName: 'Sterling',
    email: 'j.sterling@familyoffice.com',
    phone: '+1 (555) 0123-4567',
    location: 'New York, USA'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleSignOut = () => {
    // In a real application, you would clear the auth token/session here
    navigate('/');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-marketing-black">Account Settings</h3>
            <span className="text-xs font-mono text-slate-400">ID: CS-8821-X</span>
        </div>
        
        <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">First Name</label>
                    <input 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent transition-colors font-medium text-marketing-black text-base" 
                    />
                </div>
                <div>
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Last Name</label>
                    <input 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent transition-colors font-medium text-marketing-black text-base" 
                    />
                </div>
            </div>
            
            <div>
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Email Address</label>
                <input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent transition-colors font-medium text-marketing-black text-base" 
                />
            </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Phone</label>
                    <input 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent transition-colors font-medium text-marketing-black text-base" 
                    />
                </div>
                <div>
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Primary Residence</label>
                    <input 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 bg-transparent transition-colors font-medium text-marketing-black text-base" 
                    />
                </div>
             </div>

            <div className="pt-6">
                <Button type="submit" disabled={isSaving} className="w-full">
                    {isSaving ? 'Updating Profile...' : 'Save Changes'}
                </Button>
            </div>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-100 flex justify-between items-center">
            <div className="text-xs text-slate-400">
                <p>Member since 2023</p>
                <p>Tier: Platinum</p>
            </div>
            <button 
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-700 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors px-3 py-2 rounded-sm hover:bg-red-50"
            >
                Sign Out
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
        </div>
      </div>
    </Modal>
  );
};
