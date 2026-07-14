# AS Brokers – Backend setup checklist

You’ve only done the frontend so far. This list covers **all backend-related setup**: env vars, external services, database, workers, and optional scripts.

---

## ⏸ WHERE YOU LEFT OFF (come back here)

**Handover status (Jul 2026):** Marketing site, CRM PIN login, Blog Studio, and form→CRM leads are live when Vercel env is set. See **`docs/HANDOVER.md`** first.

- **Contact / newsletter** write to Postgres CRM via `insertCrmLead` and email Albert via **Resend**. HubSpot sync is optional/non-blocking. If HubSpot sync is desired, create contact properties:
  - `platform_lead_score` (Number)
  - `financial_inquiry_topic` (Single-line text)
  - `financial_capital_input` (Number, optional)
- **AI chat / RAG** use **`GOOGLE_GENERATIVE_AI_API_KEY`** (Gemini) — not OpenAI.
- **Trigger.dev + Resend** (PDF after contact): optional; ensure `APP_URL` in Trigger points at production.
- **Client portal** remains a prototype (mock data).

---

## 1. Environment variables

Create `.env.local` (and add the same in your host: Vercel, Trigger.dev, etc.). **Never commit real secrets.**

### Next.js app (local + Vercel)

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | For CRM, Studio posts, RAG | PostgreSQL connection string (see §3). |
| `GOOGLE_GENERATIVE_AI_API_KEY` | For chat + RAG | From Google AI Studio (Gemini). |
| `RESEND_API_KEY` | For lead emails | Contact/newsletter/staff alerts (see §7). |
| `HUBSPOT_ACCESS_TOKEN` or `HUBSPOT_PRIVATE_APP_TOKEN` | Optional sync | HubSpot API token (see §4). |
| `TRIGGER_SECRET_KEY` | For PDF-after-contact | From Trigger.dev project (see §6). |
| `NEXT_PUBLIC_APP_URL` or `APP_URL` | For PDF + absolute URLs | Full app URL, e.g. `https://yoursite.com`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional, Phase 4 | GA4 measurement ID (only used after consent). |
| `NEXT_PUBLIC_HOTJAR_ID` | Optional, Phase 4 | Hotjar site ID (only used after consent). |
| `NEXT_PUBLIC_SUPABASE_URL` | For CRM | Supabase project URL (see §3.1). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For CRM | Supabase anon key. |
| `SUPABASE_SERVICE_ROLE_KEY` | For CRM (server) | Supabase service role key; never expose to client. |

### Trigger.dev worker (Trigger dashboard or `trigger dev` env)

| Variable | Required | Notes |
|----------|----------|--------|
| `RESEND_API_KEY` | Yes | From [Resend](https://resend.com) (see §7). |
| `APP_URL` or `NEXT_PUBLIC_APP_URL` | Yes | So the worker can open `/internal/pdf-report` to render PDF. |
| `RESEND_FROM` | Optional | e.g. `AS Brokers <albert@asbrokers.co.za>`. Defaults to albert@asbrokers.co.za. |
| `PUPPETEER_EXECUTABLE_PATH` | Optional | Only if the worker environment needs a custom Chrome path. |
| `TRIGGER_PROJECT_REF` | Optional | Override in trigger.config.ts; usually set in Trigger dashboard. |

### Optional: `.env.example` (already present)

Your `.env.example` currently has analytics and app keys. Consider adding (with empty values) so others know what’s needed:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `HUBSPOT_ACCESS_TOKEN` or `HUBSPOT_PRIVATE_APP_TOKEN`
- `TRIGGER_SECRET_KEY`
- `NEXT_PUBLIC_APP_URL` / `APP_URL`
- `RESEND_API_KEY`, `RESEND_FROM` (document as “Trigger worker”)

---

## 2. What already runs in the “backend” (Next.js server)

No separate backend server is required. These run inside Next.js:

- **Contact form**  
  `app/actions/contact.ts` and `app/(content)/actions/contact.ts`: validate with Zod → `syncContactToHubSpot()` → optionally trigger Trigger.dev task `generate-financial-pdf`.
- **Chat API**  
  `app/api/chat/route.ts`: uses OpenAI + optional RAG (`getRagContext()` from DB). Works without DB (empty context).
- **Insights / Blog Studio**  
  Public `/insights` is served from **Blog Studio** (`client_insight_posts` via Supabase/Postgres). Editors use `/studio/blog`. Legacy Sanity CMS tooling and draft-mode routes were removed (Perfect-10 Tasks 12–13). `/studio` permanently redirects to `/studio/blog`.

So your “backend” work is: **env vars + external services + DB + Trigger worker**, not a new codebase.

---

## 3. Database (PostgreSQL + pgvector)

Used for RAG in the Digital Wealth Assistant (chat). Without it, chat still works but with no retrieved context.

1. **Create a PostgreSQL database**
   - Local: install Postgres and create a DB (e.g. `asbrokers`).
   - Hosted: e.g. [Vercel Postgres](https://vercel.com/storage/postgres), [Neon](https://neon.tech), [Supabase](https://supabase.com). Get `DATABASE_URL`.

2. **Enable pgvector**
   - Run once (before Drizzle schema migrations):
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
   - The repo has `drizzle/0000_enable_pgvector.sql` for this.

3. **Drizzle schema and migrations**
   - Schema: `lib/db/schema.ts` (tables: `resources`, `embeddings`).
   - Generate migrations (with `DATABASE_URL` set):
   ```bash
   npx drizzle-kit generate
   ```
   - Apply migrations:
   ```bash
   npx drizzle-kit migrate
   ```
   - Or use `drizzle-kit push` for dev if you prefer.

4. **RAG content (optional but recommended)**
   - Use the ingestion script: put **.txt** or **.md** files in `scripts/rag-documents/` (e.g. Everest brochures, FAIS compliance, SARS guidelines). For PDFs, export text to .txt first.
   - Run: `npm run rag:ingest` (or `npx tsx scripts/ingest-rag.ts [directory]`). Requires `OPENAI_API_KEY` and `DATABASE_URL` in `.env.local`.
   - The script chunks text (~600 chars with overlap), inserts into `resources`, embeds with OpenAI `text-embedding-3-small`, and inserts into `embeddings`.

### 3.1 Supabase CRM (optional)

The CRM (`/crm`, `/portal`) uses **mock data** by default. To use a **real Supabase backend**:

1. **Env vars** (in `.env.local` and your host):
   - `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – anon/public key.
   - `SUPABASE_SERVICE_ROLE_KEY` – service role key (server-only; never expose to client). Used by `lib/crm-data.ts` and `lib/supabase/server.ts` for CRM reads/writes until Supabase Auth + RLS are wired (Phase 2).

2. **Run migrations** in the Supabase project (SQL Editor or CLI):
   - First: `supabase/migrations/20260308000000_crm_schema.sql` (tables: staff, households, leads, clients, correspondence, tasks, notes).
   - Then: `supabase/migrations/20260308100000_crm_seed.sql` (seed staff, households, sample leads).

3. **Behaviour**: When both URL and service role key are set, `lib/crm-data.ts` uses Supabase; otherwise it falls back to mock data. Auth remains mock (cookies) until Phase 2 (Supabase Auth + RLS). See `docs/CRM_IMPLEMENTATION_PROGRESS.md` for the rollout plan.

---

## 4. HubSpot

Contact form submissions are synced to HubSpot (search by email, create or patch contact, cumulative lead score by topic).

1. **HubSpot account**  
   Create or use an existing account.

2. **Private app or access token**
   - Create a [Private App](https://developers.hubspot.com/docs/api/private-apps) (or use OAuth and get an access token).
   - Scopes: at least **crm.objects.contacts.read**, **crm.objects.contacts.write**.
   - Copy the token into `HUBSPOT_ACCESS_TOKEN` or `HUBSPOT_PRIVATE_APP_TOKEN` in `.env.local`.

3. **Custom property (optional)**  
   The code uses `platform_lead_score` (number). Create this in HubSpot if you want lead scoring; otherwise the service may still work with a fallback (check `lib/hubspot.service.ts` for required properties).

---

## 5. Blog Studio (Insights CMS)

**Source of truth for public Insights.** Sanity is retired from the app runtime (no `NEXT_PUBLIC_SANITY_*` / `SANITY_*` env required).

1. **Database**
   - Postgres/Supabase table `client_insight_posts` (see Studio repair/verify scripts: `npm run db:repair-studio`, `npm run db:verify-studio`).
   - Needs `DATABASE_URL` and/or `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` for inventory/admin tooling.

2. **Editor UI**
   - Blog Studio lives at `/studio/blog` (login + workspace).
   - Legacy `/studio` URL permanently redirects to `/studio/blog`.

3. **Public site**
   - Feed + article pages + sitemap use Studio published posts only (`lib/insights/feed.ts`).
   - Inventory (read-only): `npm run insights:inventory`.

4. **Remote Sanity project (ops only)**
   - Optional human ops later: archive/unpublish the old Sanity project in the Sanity dashboard. Not required for the app to run.

---

## 6. Trigger.dev (PDF after contact)

The contact form can trigger a background task that generates a PDF and emails it via Resend.

1. **Trigger.dev project**
   - [trigger.dev](https://trigger.dev) → create project → note **Project ref** (e.g. `as-brokers`). Optionally set `TRIGGER_PROJECT_REF` in env.

2. **Secrets in Trigger dashboard**
   - Add: `RESEND_API_KEY`, `APP_URL` (or `NEXT_PUBLIC_APP_URL`), optionally `RESEND_FROM`, `PUPPETEER_EXECUTABLE_PATH`.

3. **Deploy / run the worker**
   - Task is in `trigger/generatePdf.ts` (task id: `generate-financial-pdf`).  
   - **Production (deployed worker):** From repo root run:
     ```bash
     npx trigger.dev@latest deploy
     ```
     You may be prompted to log in or link the project. Ensure Trigger dashboard env vars (`RESEND_API_KEY`, `APP_URL`) are set for the same environment (e.g. prod).
   - **Local dev (worker runs on your machine):** Run `npx trigger.dev@latest dev`. The worker will execute tasks locally; `APP_URL` in the dashboard (or your env) must still be a URL that your machine can reach (e.g. `http://localhost:3000` for local Next.js, or a public URL like ngrok if Trigger runs in the cloud but you’re testing against localhost).

4. **Next.js**
   - In Vercel (or your host), set `TRIGGER_SECRET_KEY` (from Trigger.dev project). The contact action calls Trigger’s HTTP trigger endpoint with this key.

5. **PDF page**
   - The worker opens `APP_URL/internal/pdf-report?portfolio=...&drawdown=...`. Ensure `/internal/pdf-report` is reachable by the worker (not blocked by auth in a way that prevents server-side fetch).

---

## 7. Resend (email for PDF)

Used only by the Trigger.dev task to send the PDF.

1. **Resend account**  
   Sign up at [resend.com](https://resend.com).

2. **API key**  
   Create an API key → set as `RESEND_API_KEY` in the **Trigger.dev worker** env (not only in Next.js).

3. **Sender domain (production)**  
   Verify your domain in Resend and set `RESEND_FROM` (e.g. `AS Brokers <albert@asbrokers.co.za>`).

---

## 8. OpenAI (chat + RAG embeddings)

1. **API key**  
   [OpenAI API keys](https://platform.openai.com/api-keys) → create key.

2. **Set in Next.js**  
   `OPENAI_API_KEY` in `.env.local` and in Vercel (server-side only; never expose to client).

3. **Usage**
   - Chat: `app/api/chat/route.ts` uses the key for the chat model and for tools.
   - RAG: `lib/db/rag.ts` uses it for `text-embedding-3-small` when building context. If key is missing, RAG returns empty context.

---

## 9. Analytics (Phase 4 – optional)

- **GA4:** Create a GA4 property, get Measurement ID → `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Loaded only after “Accept All” cookie consent.
- **Hotjar:** Create a site, get ID → `NEXT_PUBLIC_HOTJAR_ID`. Same: only after consent.

No backend code to add; only env and consent wiring (already in place).

---

## 10. Quick checklist (copy and tick)

- [ ] `.env.local` created with all required Next.js vars (see §1).
- [ ] PostgreSQL created; `DATABASE_URL` set.
- [ ] `CREATE EXTENSION vector` run; Drizzle migrations generated and applied.
- [ ] (Optional) RAG ingestion script/process: populate `resources` + `embeddings`.
- [ ] HubSpot: private app or token; `HUBSPOT_ACCESS_TOKEN` or `HUBSPOT_PRIVATE_APP_TOKEN` set.
- [ ] Blog Studio / Insights: `client_insight_posts` reachable; editors use `/studio/blog`; public feed Studio-only.
- [ ] Trigger.dev: project created; worker env set (Resend, APP_URL, etc.); worker deployed or run with `trigger dev`.
- [ ] Resend: API key in Trigger worker env; domain verified for production.
- [ ] OpenAI: API key set in Next.js.
- [ ] Vercel (or host): all Next.js env vars added; `TRIGGER_SECRET_KEY` set.
- [ ] (Optional) GA4 and Hotjar IDs set for Phase 4 analytics.

---

## 11. Optional: npm scripts

You may want to add to `package.json`:

```json
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate",
"db:push": "drizzle-kit push",
"db:studio": "drizzle-kit studio",
"trigger:dev": "npx trigger dev",
"trigger:deploy": "npx trigger deploy"
```

---

Once the above are done, your “backend” is effectively complete for this stack: contact → HubSpot + optional PDF email; chat → OpenAI + optional RAG; Insights → Blog Studio; analytics → GA4/Hotjar after consent.
