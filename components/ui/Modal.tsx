
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-swiss-900/40 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="relative transform bg-white shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300 text-left my-8 rounded-sm">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-marketing-black transition-colors z-10 p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
