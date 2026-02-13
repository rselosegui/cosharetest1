
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CurrencyCode } from '../types';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67
};

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'AED '
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const formatPrice = (amountInUSD: number) => {
    const rate = RATES[currency];
    const value = amountInUSD * rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'AED' ? 'USD' : currency, // Hack to prevent AED formatting issues in some browsers
      currencyDisplay: 'symbol',
      maximumFractionDigits: 0,
    }).format(value).replace('US$', 'AED '); // Manual override if needed for AED
  };

  // Helper for consistent formatting including symbol override
  const safeFormat = (amountInUSD: number) => {
     const value = amountInUSD * RATES[currency];
     // Simple formatter
     const formatter = new Intl.NumberFormat('en-US', {
       maximumFractionDigits: 0,
     });
     
     if (currency === 'AED') return `AED ${formatter.format(value)}`;
     return `${SYMBOLS[currency]}${formatter.format(value)}`;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice: safeFormat }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
