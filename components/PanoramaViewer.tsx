
import React, { useRef, useState, useEffect } from 'react';

interface PanoramaViewerProps {
  imageUrl: string;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-sm cursor-move group select-none">
      {/* 360 Indicator */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-sm shadow-lg pointer-events-none">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-marketing-black">Live 360° View</span>
         </div>
      </div>

      {/* Instruction Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
         <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Drag to Rotate
         </div>
      </div>

      {/* Image Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden no-scrollbar flex items-center"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollBehavior: 'auto' }}
      >
        {/* We use a very wide aspect ratio to simulate panorama */}
        <img 
          src={imageUrl} 
          alt="360 Panorama" 
          className="max-w-none h-[120%] w-auto object-cover pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
};
