-- Optional studio post columns used by guided workflow hardening.
-- Safe to run multiple times.

ALTER TABLE "client_insight_posts"
  ADD COLUMN IF NOT EXISTS "calculator_name" text;

ALTER TABLE "client_insight_posts"
  ADD COLUMN IF NOT EXISTS "calculator_code" text;

ALTER TABLE "client_insight_posts"
  ADD COLUMN IF NOT EXISTS "hero_image_url" text;
