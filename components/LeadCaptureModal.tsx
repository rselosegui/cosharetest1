
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName?: string;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, assetName }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  const reset = () => {
    setStep('form');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={reset}>
      <div className="flex flex-col">
        {step === 'form' ? (
          <>
            <div className="bg-swiss-900 p-8 text-white text-center">
              <h3 className="text-xl font-serif mb-2">
                {assetName ? 'Reserve Your Allocation' : 'Join the Inner Circle'}
              </h3>
              <p className="text-slate-300 text-sm font-light">
                {assetName 
                  ? `Initiate your interest in ${assetName}.` 
                  : "Access off-market assets and priority allocations."}
              </p>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Full Name</label>
                  <input required type="text" className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 transition-colors bg-transparent placeholder-slate-300 text-base" placeholder="e.g. Jonathan Doe" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email Address</label>
                  <input required type="email" className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 transition-colors bg-transparent placeholder-slate-300 text-base" placeholder="name@familyoffice.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Phone (WhatsApp)</label>
                  <input required type="tel" className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-swiss-900 transition-colors bg-transparent placeholder-slate-300 text-base" placeholder="+1 ..." />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" id="accreditation" className="mt-1" />
                  <label htmlFor="accreditation" className="text-xs text-slate-500 leading-relaxed">
                    I certify that I am an Accredited Investor or High Net Worth Individual as defined by my local jurisdiction.
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-4" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Request Access'}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-swiss-900 mb-4">Request Received</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Your inquiry has been routed to our Private Client desk. A concierge will contact you within 2 hours via WhatsApp to verify your credentials.
            </p>
            <Button onClick={reset} variant="outline" className="w-full">
              Return to Browse
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
