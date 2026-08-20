-- Advisor campaign goals (additive). Safe to run on production.
-- No FK to auth.users: PIN identities may not exist as auth rows.

CREATE TABLE IF NOT EXISTS public.crm_advisor_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug varchar(80) NOT NULL,
  title text NOT NULL,
  owner_advisor_id uuid NOT NULL,
  owner_name varchar(120) NOT NULL,
  service_category varchar(64) NOT NULL,
  area_label varchar(80) NOT NULL,
  target_count integer NOT NULL,
  start_date varchar(10) NOT NULL,
  end_date varchar(10) NOT NULL,
  status varchar(24) NOT NULL DEFAULT 'active',
  weekly_log jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS crm_advisor_goals_slug_uid ON public.crm_advisor_goals (slug);
CREATE INDEX IF NOT EXISTS crm_advisor_goals_owner_idx ON public.crm_advisor_goals (owner_advisor_id);
CREATE INDEX IF NOT EXISTS crm_advisor_goals_status_idx ON public.crm_advisor_goals (status);
