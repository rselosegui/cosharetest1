
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Language, Translation, CurrencyCode } from '../../types';
import { useCurrency } from '../../contexts/CurrencyContext';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translation;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleCurrency = () => {
    const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'AED'];
    const idx = currencies.indexOf(currency);
    setCurrency(currencies[(idx + 1) % currencies.length]);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter text-marketing-black z-50 relative flex items-center">
            c<span className="inline-block transform scale-x-[1.6] mx-1">o</span>share
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-marketing-black transition-colors">{t.navHome}</Link>
            <Link to="/marketplace" className="text-sm font-medium text-slate-600 hover:text-marketing-black transition-colors">{t.navAssets}</Link>
            <button className="text-sm font-medium text-slate-600 hover:text-marketing-black transition-colors">{t.navConcierge}</button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button 
              onClick={toggleCurrency}
              className="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-marketing-black w-8 text-center"
              title="Switch Currency"
            >
              {currency}
            </button>
            <div className="h-4 w-px bg-zinc-300"></div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-marketing-black"
            >
              {lang === 'en' ? 'ع' : 'EN'}
            </button>
            <Link to="/login">
              <Button variant="outline" size="sm" className="rounded-none border-zinc-200">
                {t.navLogin}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden z-50 flex items-center gap-4">
             <button 
              onClick={toggleCurrency}
              className="text-xs font-bold uppercase tracking-wide text-marketing-black"
            >
              {currency}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-marketing-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 flex flex-col transition-all duration-300 ease-in-out md:hidden pt-24 pb-8 overflow-y-auto ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-8 text-center px-6">
          <Link to="/" className="text-3xl font-light text-marketing-black hover:text-slate-600 flex items-center justify-center gap-1">
             c<span className="inline-block transform scale-x-[1.6]">o</span>share
          </Link>
          <div className="w-12 h-px bg-zinc-200 mx-auto"></div>
          <Link to="/marketplace" className="text-2xl font-light text-marketing-black hover:text-slate-600">{t.navAssets}</Link>
          <button className="text-2xl font-light text-marketing-black hover:text-slate-600">{t.navConcierge}</button>
          
          <div className="pt-8 flex flex-col items-center space-y-6">
            <button 
              onClick={() => {
                setLang(lang === 'en' ? 'ar' : 'en');
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-bold uppercase tracking-widest text-slate-500"
            >
              {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            </button>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full max-w-xs">
              <Button size="lg" className="w-full">{t.navLogin}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
