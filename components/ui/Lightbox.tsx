import React, { useEffect, useCallback, useState } from 'react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  }, [onClose, handleNext, handlePrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[101]">
        <div className="text-white/70 text-xs tracking-widest uppercase font-medium">
          {currentIndex + 1} / {images.length}
        </div>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-2 focus:outline-none group"
        >
          <span className="sr-only">Close</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:rotate-90 transition-transform duration-300">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-10 flex items-center justify-center">
        <img 
          src={images[currentIndex]} 
          alt={`View ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain shadow-2xl select-none"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
        />
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button 
        onClick={handlePrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-all focus:outline-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button 
        onClick={handleNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-all focus:outline-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};
