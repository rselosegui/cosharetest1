
export type Language = 'en' | 'ar';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED';

export interface Translation {
  heroTitle: string;
  heroSub: string;
  ctaBrowse: string;
  ctaWaitlist: string;
  howItWorks: string;
  fractionConcept: string;
  whyUs: string;
  assetsTitle: string;
  footerRights: string;
  navHome: string;
  navAssets: string;
  navConcierge: string;
  navLogin: string;
}

export enum AssetCategory {
  REAL_ESTATE = 'Real Estate',
  SUPERCAR = 'Supercar',
  CLASSIC = 'Classic',
  OFFROAD = 'Desert 4x4',
  YACHT = 'Yacht',
  JET = 'Jet',
  SUPERBIKE = 'Superbike',
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  location: string;
  totalValue: number;
  sharePrice: number;
  fundedPercentage: number;
  imageUrl: string;
  gallery?: string[];
  panoramaUrl?: string; // New field for 360 view
  description?: string;
  specs: { label: string; value: string }[];
  isGoldenVisa?: boolean; 
  status?: string;
}

export interface SellingPoint {
  icon: string;
  title: string;
  description: string;
}
