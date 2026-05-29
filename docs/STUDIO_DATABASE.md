# Blog Studio database (client_insight_posts)

The Insights **Blog Studio** (`/studio/blog/workspace`) stores posts in PostgreSQL table `client_insight_posts`.

## Required columns

Including **`categories`** (jsonb array) for topic filters on `/insights`.

Migrations in repo:

- `drizzle/0001_client_insight_posts.sql` — base table
- `drizzle/0002_client_insight_optional_columns.sql` — hero + calculator columns
- `drizzle/0003_client_insight_categories.sql` — categories column
- `supabase/migrations/20260526120000_client_insight_categories.sql` — same (Supabase SQL Editor)

## Apply schema (production)

**Option A — Drizzle (recommended if you use `DATABASE_URL` on Vercel)**

1. Copy `DATABASE_URL` from Vercel → Settings → Environment Variables (or Supabase → Database → connection string).
2. Paste into local `.env.local` (do not commit).
3. Run:

```bash
npm run db:push
npm run db:repair-studio
npm run db:verify-studio
```

**Option B — Supabase SQL Editor (no local URL needed)**

1. Open Supabase → SQL → New query.
2. Paste contents of `supabase/migrations/20260526120000_client_insight_categories.sql`.
3. Run.

## Verify

```bash
npm run db:verify-studio
```

You should see: connection OK, table exists, all columns present (including `categories`).

`db:repair-studio` is idempotent and can be run when production has newer studio code than database schema. The app also attempts this same repair at runtime when `DATABASE_URL` is configured.

## Env on Vercel

Studio needs (same as before):

- `DATABASE_URL` — Postgres (primary for saves)
- `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — image uploads + REST fallback if Postgres is unreachable

Categories are saved via Postgres when `DATABASE_URL` is set. If only Supabase REST is used, run the Supabase migration above so the `categories` column exists.
