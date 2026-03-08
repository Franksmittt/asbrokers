-- Seed staff and households for AS Brokers CRM (IDs match mock for compatibility).
-- Run after 20260308000000_crm_schema.sql (e.g. in Supabase SQL Editor or via supabase db push).

-- Staff (advisors, ops)
INSERT INTO public.staff (id, name, role, routing_intent, whats_app) VALUES
  ('s1', 'Albert Schuurman', 'Manager & Key Individual', ARRAY['Strategic oversight', 'Escalations', 'Ultra HNW'], '0672429946'),
  ('s2', 'Elize Schuurman', 'Director & Head of Negotiations', ARRAY['Corporate claim disputes', 'Underwriter negotiation'], NULL),
  ('s3', 'Corne Schuurman', 'IT, Systems & Accounts', ARRAY['System alerts', 'API integration', 'Commission tracking'], NULL),
  ('s4', 'Monique Schuurman', 'Operations Manager', ARRAY['Risk assessments', 'Short-term insurance', 'Renewals'], NULL),
  ('s5', 'Johnny Farinha', 'Financial Advisor', ARRAY['Business development', 'Domestic/commercial/life'], '0672429946'),
  ('s6', 'Petro Vermeulen', 'Technical Underwriter', ARRAY['Commercial underwriting', 'Risk assessment'], NULL),
  ('s7', 'Shanel van Niekerk', 'Specialized Claims Consultant', ARRAY['Domestic/commercial claims'], NULL),
  ('s8', 'Sharine van Vollenstee', 'Medical Aid & Life Assistant', ARRAY['Medical aid', 'Life onboarding', 'Appointments'], NULL)
ON CONFLICT (id) DO NOTHING;

-- Households
INSERT INTO public.households (id, name) VALUES
  ('h1', 'Botha family'),
  ('h2', 'Van der Berg')
ON CONFLICT (id) DO NOTHING;

-- Optional: sample leads (so CRM has data when using Supabase)
INSERT INTO public.leads (id, name, email, phone, intent, source, status, fit_score, engagement_score, assigned_advisor_id, service_category, household_id) VALUES
  ('l1', 'Jan van der Berg', 'jan.vdberg@example.co.za', '082 123 4567', 'Everest Wealth 12.8% Strategic Income', 'Calculator Hub', 'qualified', 88, 72, 's1', 'retirement_everest', 'h2'),
  ('l2', 'Sarah Mbeki', 's.mbeki@example.co.za', '083 234 5678', 'Commercial Liability Cover', 'Contact form', 'new', 65, 45, 's6', 'short_term_business', NULL),
  ('l3', 'Pieter and Maria Botha', 'botha.family@example.co.za', '071 345 6789', 'Estate planning & semigration', 'Financial Health Quiz', 'proposal', 92, 90, 's5', 'estate_business', 'h1'),
  ('l4', 'Thabo Nkosi', 't.nkosi@example.co.za', '084 456 7890', 'Life insurance onboarding', 'Website', 'contacted', 70, 55, 's8', 'life_personal', NULL),
  ('l5', 'Linda Pretorius', 'linda.p@example.co.za', '072 567 8901', 'Amethyst Living Annuity quote', 'Everest calculator', 'new', 85, 78, 's1', 'retirement_everest', NULL)
ON CONFLICT (id) DO NOTHING;
