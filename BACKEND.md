# AS Brokers – Backend setup checklist

You’ve only done the frontend so far. This list covers **all backend-related setup**: env vars, external services, database, workers, and optional scripts.

---

## ⏸ WHERE YOU LEFT OFF (come back here)

- **Contact form** shows “Could not create contact.” → **HubSpot** is rejecting the POST because the **custom contact properties are missing** in HubSpot. Do this when you’re ready:
  1. HubSpot → **Settings** → **Properties** → **Contact properties** → **Create property** for each:
     - `platform_lead_score` (Number)
     - `financial_inquiry_topic` (Single-line text)
     - `financial_capital_input` (Number, optional)
  2. Save each, then submit the contact form again. The form will work once these exist.
- **Trigger.dev + Resend** (PDF after contact): worker runs with `npx trigger.dev@latest dev`; ensure `APP_URL` in Trigger dashboard points to your app so the PDF page loads.
- **Rest of backend**: see checklist below (OpenAI, Sanity, RAG ingest, etc.).

---

## 1. Environment variables

Create `.env.local` (and add the same in your host: Vercel, Trigger.dev, etc.). **Never commit real secrets.**

### Next.js app (local + Vercel)

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | For RAG/chat | PostgreSQL connection string (see §3). |
| `OPENAI_API_KEY` | For chat + RAG | From [OpenAI](https://platform.openai.com/api-keys). |
| `HUBSPOT_ACCESS_TOKEN` or `HUBSPOT_PRIVATE_APP_TOKEN` | For contact form | HubSpot API token (see §4). |
| `TRIGGER_SECRET_KEY` | For PDF-after-contact | From Trigger.dev project (see §6). |
| `NEXT_PUBLIC_APP_URL` or `APP_URL` | For PDF + draft mode | Full app URL, e.g. `https://yoursite.com`. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For Sanity CMS | From [sanity.io](https://sanity.io) project. |
| `NEXT_PUBLIC_SANITY_DATASET` | Optional | Default `production`. |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | Optional | e.g. `https://yoursite.com/studio`. |
| `SANITY_VIEWER_TOKEN` | For draft/preview | Sanity API token with read access (see §5). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional, Phase 4 | GA4 measurement ID (only used after consent). |
| `NEXT_PUBLIC_HOTJAR_ID` | Optional, Phase 4 | Hotjar site ID (only used after consent). |

### Trigger.dev worker (Trigger dashboard or `trigger dev` env)

| Variable | Required | Notes |
|----------|----------|--------|
| `RESEND_API_KEY` | Yes | From [Resend](https://resend.com) (see §7). |
| `APP_URL` or `NEXT_PUBLIC_APP_URL` | Yes | So the worker can open `/internal/pdf-report` to render PDF. |
| `RESEND_FROM` | Optional | e.g. `AS Brokers <noreply@yourdomain.com>`. Defaults to Resend test domain. |
| `PUPPETEER_EXECUTABLE_PATH` | Optional | Only if the worker environment needs a custom Chrome path. |
| `TRIGGER_PROJECT_REF` | Optional | Override in trigger.config.ts; usually set in Trigger dashboard. |

### Optional: `.env.example` (already present)

Your `.env.example` currently has Sanity and analytics. Consider adding (with empty values) so others know what’s needed:

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
- **Draft mode**  
  `app/api/draft-mode/enable/route.ts`: uses `SANITY_VIEWER_TOKEN` for Sanity preview.

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

## 5. Sanity (Phase 3 CMS)

Insights and any Sanity-driven content.

1. **Sanity project**
   - [sanity.io](https://sanity.io) → create project → note **Project ID** and **Dataset** (e.g. `production`).

2. **Env in Next.js**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_STUDIO_URL` (if you use embedded studio).

3. **Draft / Visual Editing**
   - Create an API token with **Viewer** (or read) access.
   - Set `SANITY_VIEWER_TOKEN` in `.env.local` (and in Vercel). Used by `app/api/draft-mode/enable/route.ts` and `sanity/lib/live.ts`.

4. **CORS**
   - In Sanity project settings, add your app origins (e.g. `http://localhost:3000`, `https://yoursite.com`).

5. **Studio**
   - Studio is at `/studio` in this repo. Deploy the app and open `/studio` to edit content; or deploy Sanity Studio separately and set `NEXT_PUBLIC_SANITY_STUDIO_URL` to that URL.

6. **Schemas**
   - Ensure your document types (e.g. for “insights”) are defined and deployed so the frontend queries match.

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
   Verify your domain in Resend and set `RESEND_FROM` (e.g. `AS Brokers <noreply@yourdomain.com>`). Without this, you can use the default Resend test address.

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
- [ ] Sanity: project + dataset; env set; `SANITY_VIEWER_TOKEN` for draft; CORS and schemas done.
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

Once the above are done, your “backend” is effectively complete for this stack: contact → HubSpot + optional PDF email; chat → OpenAI + optional RAG; draft mode → Sanity; analytics → GA4/Hotjar after consent.
