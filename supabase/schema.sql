-- ==============================================================================
-- EcoCommute PostgreSQL Schema for Supabase
-- Problem ID: IHSA5 - Sustainable Urban Mobility & Corporate ESG Platform
-- ==============================================================================

-- 1. USERS TABLE (B2C Commuters, Employees, Corporate Admins)
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  company_id TEXT,
  preferences JSONB DEFAULT '{"weightProfile": "balanced"}'::jsonb,
  green_points INTEGER DEFAULT 100,
  total_trips INTEGER DEFAULT 0,
  total_co2_saved NUMERIC DEFAULT 0.0,
  total_money_saved NUMERIC DEFAULT 0.0,
  eco_score INTEGER DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COMPANIES TABLE (B2B Enterprise Organizations)
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  email TEXT,
  password TEXT,
  industry TEXT DEFAULT 'IT & Services',
  total_employees INTEGER DEFAULT 0,
  address TEXT DEFAULT 'Indore, MP',
  location JSONB DEFAULT '{"name": "Vijay Nagar", "lat": 22.7533, "lng": 75.8937}'::jsonb,
  working_hours JSONB DEFAULT '{"start": "09:00", "end": "18:00"}'::jsonb,
  commute_policy TEXT DEFAULT 'Encourage public transit and carpooling',
  monthly_budget NUMERIC DEFAULT 50000.0,
  transport_options JSONB DEFAULT '["bus", "carpool", "cycling"]'::jsonb,
  reward_rules TEXT DEFAULT 'Monthly top eco performers reward',
  best_employee_criteria TEXT DEFAULT 'Highest Eco Score',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EMPLOYEES TABLE (Corporate Commuters & Carpool Drivers)
CREATE TABLE IF NOT EXISTS public.employees (
  id TEXT PRIMARY KEY,
  employee_code TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_id TEXT REFERENCES public.companies(id) ON DELETE CASCADE,
  department TEXT DEFAULT 'Engineering',
  role TEXT DEFAULT 'Staff',
  home_location JSONB DEFAULT '{"name": "Palasia", "lat": 22.7236, "lng": 75.8824}'::jsonb,
  office_location JSONB DEFAULT '{"name": "Vijay Nagar", "lat": 22.7533, "lng": 75.8937}'::jsonb,
  arrival_time TEXT DEFAULT '09:00',
  departure_time TEXT DEFAULT '18:00',
  preferred_mode TEXT DEFAULT 'bus',
  green_points INTEGER DEFAULT 100,
  eco_score INTEGER DEFAULT 80,
  total_trips INTEGER DEFAULT 0,
  sustainable_trips INTEGER DEFAULT 0,
  total_co2_saved NUMERIC DEFAULT 0.0,
  total_money_saved NUMERIC DEFAULT 0.0,
  active_carpool_driver BOOLEAN DEFAULT FALSE,
  available_seats INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRIPS TABLE (Verifiable Journey Ledger)
CREATE TABLE IF NOT EXISTS public.trips (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  company_id TEXT,
  from_location JSONB NOT NULL,
  to_location JSONB NOT NULL,
  from_location_id TEXT,
  to_location_id TEXT,
  mode TEXT NOT NULL,
  cost NUMERIC NOT NULL DEFAULT 0.0,
  distance_km NUMERIC NOT NULL DEFAULT 0.0,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  estimated_co2_kg NUMERIC NOT NULL DEFAULT 0.0,
  co2_saved NUMERIC NOT NULL DEFAULT 0.0,
  money_saved NUMERIC NOT NULL DEFAULT 0.0,
  eco_score INTEGER NOT NULL DEFAULT 80,
  green_points_earned INTEGER DEFAULT 10,
  status TEXT NOT NULL DEFAULT 'completed',
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REWARDS TABLE (Incentive Claims & Distributions)
CREATE TABLE IF NOT EXISTS public.rewards (
  id TEXT PRIMARY KEY,
  company_id TEXT,
  employee_id TEXT,
  employee_name TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  amount NUMERIC NOT NULL DEFAULT 0.0,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'awarded',
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUTOMATION_EVENTS TABLE (viaSocket Webhook Delivery Ledger)
CREATE TABLE IF NOT EXISTS public.automation_events (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  company_id TEXT,
  employee_id TEXT,
  status TEXT NOT NULL DEFAULT 'delivered',
  status_code INTEGER DEFAULT 200,
  response_message TEXT,
  payload JSONB NOT NULL,
  webhook_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AUDIT_LOGS TABLE (Security & Navigation Handoff Ledger)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id TEXT,
  company_id TEXT,
  origin TEXT,
  destination TEXT,
  mode TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Row-Level Security (RLS) & Public API Access Policies
-- ==============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow full API access via anon/service keys
CREATE POLICY "Allow public read-write for users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for companies" ON public.companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for employees" ON public.employees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for trips" ON public.trips FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for rewards" ON public.rewards FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for automation_events" ON public.automation_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for audit_logs" ON public.audit_logs FOR ALL USING (true) WITH CHECK (true);
