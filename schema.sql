
-- AURA Database Schema Blueprint (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Authentication (Supabase Auth extends this)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  kyc_provider_id TEXT, -- Stripe Identity Reference
  is_broker BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Assets Table (The Core)
CREATE TABLE public.assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Real Estate', 'Supercar', 'Classic', 'Desert 4x4', 'Yacht', 'Jet', 'Superbike')),
  make TEXT,
  model TEXT,
  year INTEGER,
  location TEXT NOT NULL,
  total_valuation NUMERIC(15, 2) NOT NULL,
  share_price NUMERIC(15, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  funded_amount NUMERIC(15, 2) DEFAULT 0,
  target_amount NUMERIC(15, 2) NOT NULL,
  status TEXT DEFAULT 'funding' CHECK (status IN ('funding', 'active', 'sold')),
  image_gallery_json JSONB DEFAULT '[]'::jsonb,
  specs_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Ownership Structure (The SPV Logic)
CREATE TABLE public.shares (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id),
  user_id UUID REFERENCES public.profiles(id),
  fraction_percentage NUMERIC(5, 2) DEFAULT 12.5, -- 1/8th
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  contract_url TEXT, -- DocuSign signed PDF
  certificate_number TEXT
);

-- 4. Scheduling System
CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id),
  user_id UUID REFERENCES public.profiles(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'confirmed',
  is_swap BOOLEAN DEFAULT FALSE
);

-- 5. Content Management (Headless CMS pattern)
CREATE TABLE public.content_blocks (
  id TEXT PRIMARY KEY, -- e.g., 'home_hero_en'
  content TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);
