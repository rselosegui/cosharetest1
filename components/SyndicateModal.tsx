
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface SyndicateModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
}

export const SyndicateModal: React.FC<SyndicateModalProps> = ({ isOpen, onClose, assetName }) => {
  const [step, setStep] = useState<'invite' | 'copied'>('invite');

  const syndicateId = Math.random().toString(36).substring(7).toUpperCase();
  const shareLink = `coshare.io/syn/${syndicateId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setStep('copied');
    setTimeout(() => setStep('invite'), 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-marketing-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-marketing-black mb-2">Create Syndicate</h3>
          <p className="text-sm text-slate-500">
             Purchase {assetName} with your network. Fill 4 shares to unlock a <strong>5% fee reduction</strong> for everyone.
          </p>
        </div>

        <div className="bg-platinum-50 p-6 rounded-sm border border-zinc-200 mb-8">
           <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              <span>Syndicate Status</span>
              <span>1/4 Filled</span>
           </div>
           <div className="flex gap-2 mb-4">
              <div className="h-2 flex-1 bg-marketing-black rounded-full"></div>
              <div className="h-2 flex-1 bg-zinc-200 rounded-full"></div>
              <div className="h-2 flex-1 bg-zinc-200 rounded-full"></div>
              <div className="h-2 flex-1 bg-zinc-200 rounded-full"></div>
           </div>
           <p className="text-xs text-slate-500 text-center italic">
              You + 3 partners needed to close
           </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Private Invite Link</label>
            <div className="flex gap-2">
               <input 
                  readOnly 
                  value={shareLink} 
                  className="flex-1 bg-white border border-zinc-200 px-4 py-3 text-sm font-mono text-slate-600 focus:outline-none"
               />
               <Button onClick={handleCopy} variant="primary">
                  {step === 'copied' ? 'Copied' : 'Copy'}
               </Button>
            </div>
          </div>
          
          <div className="relative flex py-2 items-center">
             <div className="flex-grow border-t border-zinc-200"></div>
             <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest">Or</span>
             <div className="flex-grow border-t border-zinc-200"></div>
          </div>

          <Button variant="outline" className="w-full" onClick={onClose}>
             Browse Contacts
          </Button>
        </div>
      </div>
    </Modal>
  );
};
