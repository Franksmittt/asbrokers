-- AS Brokers CRM schema for Supabase (Phase 1).
-- Run in Supabase SQL Editor or via: supabase db push
-- RLS: enable after Supabase Auth is wired (Phase 2). Until then use service_role in server.

-- Staff (advisors, ops). Ids match mock (s1, s2, ...) for seed compatibility.
CREATE TABLE IF NOT EXISTS public.staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  routing_intent TEXT[] DEFAULT '{}',
  whats_app TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Households (for estate/family mapping).
CREATE TABLE IF NOT EXISTS public.households (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (pre-conversion).
CREATE TYPE lead_status AS ENUM (
  'new', 'contacted', 'qualified', 'proposal', 'closed_won', 'closed_lost'
);
CREATE TYPE service_category AS ENUM (
  'retirement_everest', 'short_term_personal', 'short_term_business',
  'life_personal', 'life_business', 'medical_wellness', 'estate_business', 'claims'
);

CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  intent TEXT,
  source TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  fit_score INTEGER DEFAULT 0,
  engagement_score INTEGER DEFAULT 0,
  assigned_advisor_id TEXT NOT NULL REFERENCES public.staff(id) ON DELETE RESTRICT,
  service_category service_category NOT NULL,
  household_id TEXT REFERENCES public.households(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_assigned_advisor ON public.leads(assigned_advisor_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_service ON public.leads(service_category);

-- Clients (converted leads with portal access).
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES public.leads(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  assigned_advisor_id TEXT NOT NULL REFERENCES public.staff(id),
  advisor_whats_app TEXT,
  services service_category[] NOT NULL DEFAULT '{}',
  household_id TEXT REFERENCES public.households(id),
  converted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_advisor ON public.clients(assigned_advisor_id);

-- Correspondence (unified thread: email, WhatsApp, portal).
CREATE TYPE correspondence_channel AS ENUM ('portal', 'email', 'whatsapp');
CREATE TYPE correspondence_from_type AS ENUM ('lead', 'client', 'advisor');

CREATE TABLE IF NOT EXISTS public.correspondence (
  id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES public.leads(id),
  client_id TEXT REFERENCES public.clients(id),
  from_type correspondence_from_type NOT NULL,
  from_name TEXT NOT NULL,
  from_staff_id TEXT REFERENCES public.staff(id),
  body TEXT NOT NULL,
  channel correspondence_channel NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_correspondence_lead ON public.correspondence(lead_id);
CREATE INDEX IF NOT EXISTS idx_correspondence_client ON public.correspondence(client_id);

-- Tasks.
CREATE TABLE IF NOT EXISTS public.tasks (
  id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES public.leads(id),
  client_id TEXT REFERENCES public.clients(id),
  title TEXT NOT NULL,
  due_date DATE,
  assigned_to_id TEXT NOT NULL REFERENCES public.staff(id),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON public.tasks(assigned_to_id);
CREATE INDEX IF NOT EXISTS idx_tasks_lead ON public.tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_tasks_client ON public.tasks(client_id);

-- Internal notes (staff only).
CREATE TABLE IF NOT EXISTS public.notes (
  id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES public.leads(id),
  client_id TEXT REFERENCES public.clients(id),
  author_id TEXT NOT NULL REFERENCES public.staff(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_lead ON public.notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_notes_client ON public.notes(client_id);

-- Optional: profiles table for Supabase Auth → staff/client mapping (Phase 2).
-- CREATE TABLE IF NOT EXISTS public.profiles (
--   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--   role TEXT NOT NULL CHECK (role IN ('admin','staff','client')),
--   staff_id TEXT REFERENCES public.staff(id),
--   client_id TEXT REFERENCES public.clients(id),
--   full_name TEXT,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- Enable RLS on all tables (policies to be added in Phase 2).
-- ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- etc.
