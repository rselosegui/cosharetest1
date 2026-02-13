
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { AssetDetail } from './pages/AssetDetail';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { BankerWidget } from './components/BankerWidget';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  // Handle RTL direction
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <CurrencyProvider>
      <HashRouter>
        <ScrollToTop />
        <div className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'font-arabic' : ''}`}>
          <Navbar lang={lang} setLang={setLang} t={TRANSLATIONS[lang]} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home t={TRANSLATIONS[lang]} />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/asset/:id" element={<AssetDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer t={TRANSLATIONS[lang]} />
          <BankerWidget />
        </div>
      </HashRouter>
    </CurrencyProvider>
  );
};

export default App;
