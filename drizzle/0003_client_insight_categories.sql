-- Client blog post categories (multi-select) for /insights filtering.
-- Apply with: npm run db:push

ALTER TABLE "client_insight_posts"
  ADD COLUMN IF NOT EXISTS "categories" jsonb DEFAULT '[]'::jsonb;

