
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Asset } from '../types';
import { SEED_ASSETS } from '../constants';

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'fundedPercentage'>) => void;
  getAsset: (id: string) => Asset | undefined;
  getPublicAssets: () => Asset[];
  getUserAssets: (userId: string) => Asset[];
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(() => {
    // Try to load from local storage first to persist user data across refreshes
    const saved = localStorage.getItem('coshare_assets');
    if (saved) {
      return JSON.parse(saved);
    }
    return SEED_ASSETS;
  });

  // Persist to local storage whenever assets change
  useEffect(() => {
    localStorage.setItem('coshare_assets', JSON.stringify(assets));
  }, [assets]);

  const addAsset = (newAssetData: Omit<Asset, 'id' | 'fundedPercentage'>) => {
    const newAsset: Asset = {
      ...newAssetData,
      id: `ua-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fundedPercentage: 0,
      specs: newAssetData.specs || [],
    };
    setAssets(prev => [newAsset, ...prev]);
  };

  const getAsset = (id: string) => {
    return assets.find(a => a.id === id);
  };

  const getPublicAssets = () => {
    return assets.filter(a => a.visibility === 'public');
  };

  const getUserAssets = (userId: string) => {
    return assets.filter(a => a.ownerId === userId);
  };

  return (
    <AssetContext.Provider value={{ assets, addAsset, getAsset, getPublicAssets, getUserAssets }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
