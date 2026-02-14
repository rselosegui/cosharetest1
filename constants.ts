
import { Asset, AssetCategory, Translation, SellingPoint } from './types';

export const TRANSLATIONS: Record<string, Translation> = {
  en: {
    heroTitle: "Exclusive assets for a fraction of the price.",
    heroSub: "Smart Ownership. Infinite Lifestyle.",
    ctaBrowse: "Explore Collection",
    ctaWaitlist: "Join Waitlist",
    howItWorks: "The Logic of Luxury",
    fractionConcept: "One Fraction. Six Weeks of Pleasure.",
    whyUs: "Why coshare?",
    assetsTitle: "Featured Assets",
    footerRights: "© 2024 coshare Holdings. All rights reserved.",
    navHome: "Home",
    navAssets: "Marketplace",
    navConcierge: "Concierge",
    navLogin: "Profile"
  },
  ar: {
    heroTitle: "أصول حصرية بجزء من السعر.",
    heroSub: "ملكية ذكية. أسلوب حياة لا يضاهى. ١/٨ التكلفة.",
    ctaBrowse: "استكشف المجموعة",
    ctaWaitlist: "انضم لقائمة الانتظار",
    howItWorks: "منطق الرفاهية",
    fractionConcept: "حصة واحدة. ستة أسابيع من المتعة.",
    whyUs: "لماذا coshare؟",
    assetsTitle: "أصول مميزة",
    footerRights: "© ٢٠٢٤ coshare القابضة. جميع الحقوق محفوظة.",
    navHome: "الرئيسية",
    navAssets: "السوق",
    navConcierge: "كونسيرج",
    navLogin: "الملف الشخصي"
  }
};

export const SELLING_POINTS: SellingPoint[] = [
  { icon: "shield", title: "Legal Security", description: "Fully regulated SPV structure for every asset." },
  { icon: "arrow-right-circle", title: "Guaranteed Exit", description: "Liquidate your share after 24 months." },
  { icon: "user-check", title: "Vetted Co-owners", description: "Strict KYC/AML and behavioral vetting." },
  { icon: "refresh-cw", title: "Smart Swap", description: "Trade weeks between assets globally." },
];

// Helper to get matching gallery images based on category
const getGallery = (category: AssetCategory | string, mainImage: string) => {
  // Return a set of relevant images including the main one
  return [mainImage, ...getCategoryImages(category)];
};

const getCategoryImages = (category: AssetCategory | string): string[] => {
  switch(category) {
    case AssetCategory.REAL_ESTATE:
      return [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-2a434f499419?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
      ];
    case AssetCategory.SUPERCAR:
      return [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544605972-e2d85f67530c?q=80&w=1200&auto=format&fit=crop"
      ];
    case AssetCategory.CLASSIC:
      return [
        "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583121274602-3e2820c698d9?q=80&w=1200&auto=format&fit=crop"
      ];
    case AssetCategory.OFFROAD:
      return [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop", // G-Wagon
        "https://images.unsplash.com/photo-1600329668735-3733c042337e?q=80&w=1200&auto=format&fit=crop", // FJ40
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop"  // Land Rover
      ];
    case AssetCategory.YACHT:
      return [
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605281317010-fe5ffe79ba02?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop"
      ];
    case AssetCategory.JET:
      return [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583067675402-23f27f8a32d1?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1612251372727-4c07d30d9518?q=80&w=1200&auto=format&fit=crop"
      ];
    case AssetCategory.SUPERBIKE:
      return [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1200&auto=format&fit=crop"
      ];
    case AssetCategory.WATCH:
      return [
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop"
      ];
    default:
      return [];
  }
};

// Wide images for panorama simulation
const PANORAMA_URLS = {
  interior: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=3200&auto=format&fit=crop",
  car: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=3200&auto=format&fit=crop", 
  yacht: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=3200&auto=format&fit=crop"
};

// Seed Data Strategy: 5 Assets Per Category as requested
export const SEED_ASSETS: Asset[] = [
  // User Portfolio Assets (1 Public, 1 Private)
  {
    id: 'user-public-1',
    name: 'Patek Philippe Nautilus 5711/1A',
    category: AssetCategory.WATCH,
    location: 'Geneva Vault',
    totalValue: 145000,
    sharePrice: 18125,
    fundedPercentage: 100,
    imageUrl: 'https://images.unsplash.com/photo-1639037233857-7977a4939a3f?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.WATCH, 'https://images.unsplash.com/photo-1639037233857-7977a4939a3f?q=80&w=1200&auto=format&fit=crop'),
    description: "The discontinued blue dial steel Nautilus. A horological icon. Held in a secure bonded warehouse in Geneva.",
    specs: [{ label: 'Ref', value: '5711/1A-010' }, { label: 'Year', value: '2019' }],
    ownerId: 'user-1',
    visibility: 'public'
  },
  {
    id: 'user-private-1',
    name: 'Aston Martin DB4 Series II',
    category: AssetCategory.CLASSIC,
    location: 'London, UK',
    totalValue: 450000,
    sharePrice: 56250,
    fundedPercentage: 100,
    imageUrl: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1200&auto=format&fit=crop', // Generic Classic
    gallery: getGallery(AssetCategory.CLASSIC, 'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "Family heirloom. Series II with the heavy duty bumper and large oil sump. Restored in 2018.",
    specs: [{ label: 'Year', value: '1960' }, { label: 'Engine', value: '3.7L I6' }],
    ownerId: 'user-1',
    visibility: 'private'
  },

  // Real Estate
  {
    id: 're-1',
    name: 'Palm Jumeirah Signature Villa',
    category: AssetCategory.REAL_ESTATE,
    location: 'Dubai, UAE',
    totalValue: 12500000,
    sharePrice: 1562500,
    fundedPercentage: 85,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.REAL_ESTATE, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.interior,
    description: "Located on the exclusive Frond N, this Signature Villa offers direct beach access and panoramic views of the Atlantis. Recently renovated with contemporary Italian furnishings.",
    specs: [{ label: 'Area', value: '7,000 sqft' }, { label: 'Beds', value: '6' }],
    isGoldenVisa: true,
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 're-2',
    name: 'Downtown Dubai Penthouse',
    category: AssetCategory.REAL_ESTATE,
    location: 'Dubai, UAE',
    totalValue: 8000000,
    sharePrice: 1000000,
    fundedPercentage: 40,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea904f8486d?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.REAL_ESTATE, 'https://images.unsplash.com/photo-1512453979798-5ea904f8486d?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.interior,
    description: "A triplex penthouse in the heart of Downtown, featuring a private pool and direct views of the Burj Khalifa. Includes 24/7 valet and concierge services.",
    specs: [{ label: 'View', value: 'Burj Khalifa' }, { label: 'Type', value: 'Duplex' }],
    isGoldenVisa: true,
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 're-3',
    name: 'Courchevel 1850 Chalet',
    category: AssetCategory.REAL_ESTATE,
    location: 'French Alps',
    totalValue: 15000000,
    sharePrice: 1875000,
    fundedPercentage: 10,
    imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.REAL_ESTATE, 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.interior,
    description: "Ski-in/ski-out luxury chalet in the prestigious Jardin Alpin sector. Features a private spa, cinema room, and wine cellar.",
    specs: [{ label: 'Ski-in', value: 'Yes' }, { label: 'Staff', value: 'Included' }],
    ownerId: 'system',
    visibility: 'public'
  },
  
  // Supercars
  {
    id: 'sc-1',
    name: 'Ferrari SF90 Stradale',
    category: AssetCategory.SUPERCAR,
    location: 'Monaco',
    totalValue: 600000,
    sharePrice: 75000,
    fundedPercentage: 92,
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.SUPERCAR, 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "The first series production PHEV Spider from the Prancing Horse. 1000cv of power, open-top driving thrill, and zero-emission city driving mode.",
    specs: [{ label: '0-100', value: '2.5s' }, { label: 'Engine', value: 'V8 Hybrid' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'sc-2',
    name: 'Lamborghini Revuelto',
    category: AssetCategory.SUPERCAR,
    location: 'Dubai, UAE',
    totalValue: 650000,
    sharePrice: 81250,
    fundedPercentage: 60,
    imageUrl: 'https://images.unsplash.com/photo-1544605972-e2d85f67530c?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.SUPERCAR, 'https://images.unsplash.com/photo-1544605972-e2d85f67530c?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "The first High Performance Electrified Vehicle (HPEV) hybrid super sports car. A V12 engine coupled with three electric motors.",
    specs: [{ label: 'Power', value: '1001 HP' }, { label: 'Engine', value: 'V12 Hybrid' }],
    ownerId: 'system',
    visibility: 'public'
  },

  // Classic (Restored to Vintage Sports Cars)
  {
    id: 'cl-1',
    name: 'Mercedes-Benz 300 SL "Gullwing"',
    category: AssetCategory.CLASSIC,
    location: 'Stuttgart, Germany',
    totalValue: 1800000,
    sharePrice: 225000,
    fundedPercentage: 75,
    imageUrl: 'https://images.unsplash.com/photo-1511527661048-7fe2b55819a0?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.CLASSIC, 'https://images.unsplash.com/photo-1511527661048-7fe2b55819a0?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "A pristine example of the automotive icon. Finished in Silver Grey Metallic with original red leather interior. Full matching numbers.",
    specs: [{ label: 'Year', value: '1955' }, { label: 'Condition', value: 'Concours' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'cl-2',
    name: 'Classic Mini Cooper S',
    category: AssetCategory.CLASSIC,
    location: 'London, UK',
    totalValue: 90000,
    sharePrice: 11250,
    fundedPercentage: 100,
    imageUrl: 'https://images.unsplash.com/photo-1532585640366-0e0600a94420?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.CLASSIC, 'https://images.unsplash.com/photo-1532585640366-0e0600a94420?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "The definitive 60s icon. 1967 Morris Mini-Cooper S Mk I. Rally-winning heritage in Almond Green.",
    specs: [{ label: 'Year', value: '1967' }, { label: 'Engine', value: '1275cc' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'cl-3',
    name: 'Porsche 911 (1963)',
    category: AssetCategory.CLASSIC,
    location: 'Zurich, Switzerland',
    totalValue: 320000,
    sharePrice: 40000,
    fundedPercentage: 60,
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.CLASSIC, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "One of the earliest 911s produced. Type 901 chassis. Air-cooled flat-six, completely restored to factory specifications.",
    specs: [{ label: 'Year', value: '1963' }, { label: 'Model', value: '901/911' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'cl-4',
    name: 'Ford Mustang (1964 1/2)',
    category: AssetCategory.CLASSIC,
    location: 'Los Angeles, USA',
    totalValue: 80000,
    sharePrice: 10000,
    fundedPercentage: 25,
    imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.CLASSIC, 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "The original Pony Car. Wimbledon White convertible with the 289 V8 engine option. A true piece of Americana.",
    specs: [{ label: 'Year', value: '1964' }, { label: 'Engine', value: '289 V8' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'cl-5',
    name: 'Jaguar E-Type Series 1',
    category: AssetCategory.CLASSIC,
    location: 'Coventry, UK',
    totalValue: 240000,
    sharePrice: 30000,
    fundedPercentage: 90,
    imageUrl: 'https://images.unsplash.com/photo-1622199709774-68340dfbb3df?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.CLASSIC, 'https://images.unsplash.com/photo-1622199709774-68340dfbb3df?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "1961 Series 1 3.8L Coupe. Opalescent Gunmetal with Red interior. The most beautiful car ever made.",
    specs: [{ label: 'Year', value: '1961' }, { label: 'Engine', value: '3.8L I6' }],
    ownerId: 'system',
    visibility: 'public'
  },

  // Desert 4x4 (Updated with New Requests)
  {
    id: 'off-1',
    name: 'Mercedes-Benz G-Class (W460)',
    category: AssetCategory.OFFROAD,
    location: 'Gstaad, Switzerland',
    totalValue: 180000,
    sharePrice: 22500,
    fundedPercentage: 65,
    imageUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.OFFROAD, 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "The original Geländewagen. A perfectly restored 1982 280GE with plaid interior. Unstoppable capability meets vintage utilitarian charm.",
    specs: [{ label: 'Year', value: '1982' }, { label: 'Engine', value: '2.8L I6' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'off-2',
    name: 'Suzuki Jimny Heritage',
    category: AssetCategory.OFFROAD,
    location: 'Okinawa, Japan',
    totalValue: 40000,
    sharePrice: 5000,
    fundedPercentage: 90,
    imageUrl: 'https://images.unsplash.com/photo-1606256258909-5e1975b9671d?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.OFFROAD, 'https://images.unsplash.com/photo-1606256258909-5e1975b9671d?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "A cult classic. This pristine Jimny Sierra features the coveted open-top design and rugged lightweight chassis that defined a generation.",
    specs: [{ label: 'Model', value: 'LJ80' }, { label: 'Roof', value: 'Soft Top' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'off-3',
    name: 'Peec Studio Custom',
    category: AssetCategory.OFFROAD,
    location: 'Dubai, UAE',
    totalValue: 120000,
    sharePrice: 15000,
    fundedPercentage: 45,
    imageUrl: 'https://images.unsplash.com/photo-1563276632-15a9957c7908?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.OFFROAD, 'https://images.unsplash.com/photo-1563276632-15a9957c7908?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "A unique bespoke build by Peec Studio. Reimagined for the modern era with upgraded suspension, bespoke leather interior, and electric powertrain conversion.",
    specs: [{ label: 'Build', value: 'Custom' }, { label: 'Power', value: 'EV Conv' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'off-4',
    name: 'Toyota Land Cruiser FJ40',
    category: AssetCategory.OFFROAD,
    location: 'California, USA',
    totalValue: 140000,
    sharePrice: 17500,
    fundedPercentage: 80,
    imageUrl: 'https://images.unsplash.com/photo-1600329668735-3733c042337e?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.OFFROAD, 'https://images.unsplash.com/photo-1600329668735-3733c042337e?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "The definitive 4x4. Restored frame-off to museum quality in Nebula Green. Features the legendary F-engine and original jump seats.",
    specs: [{ label: 'Year', value: '1978' }, { label: 'Engine', value: '4.2L I6' }],
    ownerId: 'system',
    visibility: 'public'
  },
  {
    id: 'off-5',
    name: 'Land Rover Defender 110',
    category: AssetCategory.OFFROAD,
    location: 'Cotswolds, UK',
    totalValue: 160000,
    sharePrice: 20000,
    fundedPercentage: 55,
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.OFFROAD, 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car,
    description: "A rugged icon. Late model Defender 110 configured for overland expeditions. Features pop-top tent, external cage, and winch.",
    specs: [{ label: 'Series', value: '110' }, { label: 'Engine', value: 'Td5' }],
    ownerId: 'system',
    visibility: 'public'
  },

  // Yachts
  {
    id: 'y-1',
    name: 'Riva 88\' Folgore',
    category: AssetCategory.YACHT,
    location: 'Cannes, France',
    totalValue: 6500000,
    sharePrice: 812500,
    fundedPercentage: 5,
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.YACHT, 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.yacht,
    description: "Italian style meets carbon fiber technology. The 88' Folgore features a revolutionary hull design and bespoke interior finishes.",
    specs: [{ label: 'Length', value: '88 ft' }, { label: 'Cabins', value: '4' }],
    ownerId: 'system',
    visibility: 'public'
  },

  // Jets
  {
    id: 'j-1',
    name: 'HondaJet Elite II',
    category: AssetCategory.JET,
    location: 'London, UK',
    totalValue: 7000000,
    sharePrice: 875000,
    fundedPercentage: 30,
    imageUrl: 'https://images.unsplash.com/photo-1583067675402-23f27f8a32d1?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.JET, 'https://images.unsplash.com/photo-1583067675402-23f27f8a32d1?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.interior,
    description: "The most advanced light jet in its class. Unmatched fuel efficiency and range, with a whisper-quiet cabin.",
    specs: [{ label: 'Range', value: '1,547 nm' }, { label: 'Pax', value: '6' }],
    ownerId: 'system',
    visibility: 'public'
  },

  // Superbikes
  {
    id: 'sb-1',
    name: 'Ducati Superleggera V4',
    category: AssetCategory.SUPERBIKE,
    location: 'Bologna, Italy',
    totalValue: 100000,
    sharePrice: 12500,
    fundedPercentage: 45,
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
    gallery: getGallery(AssetCategory.SUPERBIKE, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop'),
    panoramaUrl: PANORAMA_URLS.car, 
    description: "The most powerful and technologically advanced production Ducati ever built. Carbon fiber frame, swingarm and wheels. 234 hp.",
    specs: [{ label: 'Power', value: '234 HP' }, { label: 'Weight', value: '159 kg' }],
    ownerId: 'system',
    visibility: 'public'
  }
];
