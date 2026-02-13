
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
}

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose, assetName }) => {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');

  // Mock calendar generation for current month
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const bookedDays = [5, 6, 12, 13, 20, 21, 22]; // Mock booked days

  const toggleDate = (day: number) => {
    if (bookedDays.includes(day)) return;
    if (selectedDates.includes(day)) {
      setSelectedDates(selectedDates.filter(d => d !== day));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  const handleConfirm = () => {
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 500);
  };

  const reset = () => {
    setStep('select');
    setSelectedDates([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={reset}>
      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-marketing-black">Concierge Scheduler</h3>
          <p className="text-sm text-slate-500 mt-1">{assetName}</p>
        </div>

        {step === 'select' && (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-marketing-black text-lg">October 2024</span>
                <div className="flex gap-3 text-[10px] uppercase tracking-wider font-medium">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-200"></span> Booked</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-marketing-black"></span> Selected</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['S','M','T','W','T','F','S'].map((d,i) => (
                  <div key={i} className="text-center text-xs text-slate-400 font-bold uppercase">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {days.map(day => {
                  const isBooked = bookedDays.includes(day);
                  const isSelected = selectedDates.includes(day);
                  return (
                    <button
                      key={day}
                      disabled={isBooked}
                      onClick={() => toggleDate(day)}
                      className={`
                        aspect-square rounded-sm text-sm font-medium flex items-center justify-center transition-all duration-200
                        ${isBooked ? 'bg-zinc-50 text-zinc-300 cursor-not-allowed' : 'hover:bg-zinc-100 text-slate-700'}
                        ${isSelected ? 'bg-marketing-black text-white hover:bg-zinc-800 shadow-md transform scale-105' : ''}
                      `}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-zinc-100">
               <span className="text-sm font-medium text-slate-600">
                 {selectedDates.length === 0 ? 'Select dates' : `${selectedDates.length} days selected`}
               </span>
               <Button onClick={() => setStep('confirm')} disabled={selectedDates.length === 0} size="sm">
                 Review Request
               </Button>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <div className="text-center space-y-6">
             <div className="bg-platinum-50 p-6 rounded-sm border border-zinc-100">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Booking Summary</p>
                <p className="text-2xl font-bold text-marketing-black mb-1">
                  {selectedDates.length} Days
                </p>
                <p className="text-sm text-slate-600">October {selectedDates.sort((a,b)=>a-b).join(', ')}</p>
                
                <div className="mt-4 pt-4 border-t border-zinc-200 text-left space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Location</span>
                      <span className="font-medium">Monaco (Storage A)</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Service</span>
                      <span className="font-medium">Valet Delivery</span>
                   </div>
                </div>
             </div>
             <div className="space-y-3">
               <Button onClick={handleConfirm} className="w-full" size="lg">Confirm Booking</Button>
               <button onClick={() => setStep('select')} className="text-xs font-bold text-slate-400 hover:text-marketing-black transition-colors uppercase tracking-widest">
                 Back to Calendar
               </button>
             </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm border border-emerald-100">
               ✓
             </div>
             <h3 className="text-xl font-bold text-marketing-black mb-2">Booking Confirmed</h3>
             <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
               Your concierge has been notified. The asset will be prepared and delivered to your preferred location.
             </p>
             <Button onClick={reset} variant="outline" className="w-full">
               Return to Dashboard
             </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
