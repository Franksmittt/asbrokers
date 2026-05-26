-- Blog Studio: multi-select categories on client_insight_posts (Insights filtering).
-- Safe to run multiple times (Supabase SQL editor or CLI).

ALTER TABLE public.client_insight_posts
  ADD COLUMN IF NOT EXISTS categories jsonb DEFAULT '[]'::jsonb;
