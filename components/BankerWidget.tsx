
import React, { useState } from 'react';

export const BankerWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Card */}
      <div 
        className={`bg-white shadow-2xl mb-4 p-5 w-72 transform transition-all duration-300 origin-bottom-right ${
          isExpanded ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none absolute bottom-0 right-0'
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" 
            alt="Sarah" 
            className="w-12 h-12 rounded-full object-cover border border-zinc-200"
          />
          <div>
            <p className="font-bold text-swiss-900 text-sm">Sarah Jenkins</p>
            <p className="text-xs text-slate-500">Head of Member Relations</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Online Now</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 italic mb-4 border-l-2 border-swiss-900 pl-3">
          "I can help you structure your SPV or answer questions about the Ferrari allocation."
        </p>
        <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2 px-4 rounded-sm flex items-center justify-center gap-2 transition-colors">
          <span>Chat on WhatsApp</span>
        </button>
      </div>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-3 bg-swiss-900 text-white pl-4 pr-2 py-2 rounded-full shadow-lg hover:shadow-swiss-900/30 transition-all hover:scale-105"
      >
        <span className="text-xs font-medium tracking-wide">Private Concierge</span>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            {isExpanded ? (
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            )}
        </div>
      </button>
    </div>
  );
};
