-- Append-only CRM AI audit log (additive — safe to run on production).
-- Apply via: npm run db:push  OR Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.crm_ai_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type varchar(64) NOT NULL,
  lead_id uuid REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  model varchar(64),
  summary text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crm_ai_audit_log_created_idx ON public.crm_ai_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS crm_ai_audit_log_staff_idx ON public.crm_ai_audit_log (staff_user_id);
CREATE INDEX IF NOT EXISTS crm_ai_audit_log_lead_idx ON public.crm_ai_audit_log (lead_id);
