# AS Brokers CRM – Implementation Progress (Rolls-Royce)

**Last updated:** June 2026 — Supabase auth + Drizzle CRM live; portal still mock.

## Current state (where we are)

| Area | Status | Notes |
|------|--------|--------|
| **Auth** | **Supabase (live)** | Magic links via Resend; roles in `app_metadata.role` (`admin` / `staff`). Legacy mock cookies cleared on logout only (`lib/mock-auth.ts`). |
| **CRM data** | **Drizzle + Postgres (live)** | `app/actions/crm.ts`, `lib/crm/*`, tables `crm_leads`, `crm_tasks`, etc. `lib/mock-crm.ts` removed. |
| **Team admin** | **Live** | `/crm/settings` — invite/edit users, permissions, revoke access (`crm_staff_profiles`). |
| **Portal data** | Mock only | `lib/mock-portal.ts` — wealth charts until Everest API. |
| **Kanban / leads** | Wired | Real DB; drag-and-drop persists `pipeline_status`. |
| **Blog Studio** | Live | `client_insight_posts` — drafts safe in DB; sitemap = published only. |

**Where it can still “bomb out”:**
- `DATABASE_URL` or Supabase keys missing on Vercel → CRM empty / auth fails.
- WhatsApp outbound needs Meta env vars on production.
- Portal has no real client RLS yet (Phase 2).

---

## Implementation plan (sections)

### Phase 1 – Backend swap & stability

- [x] **Section 1.1** – Harden CRM data layer (Drizzle; staff scoping in server actions).
- [x] **Section 1.2** – Supabase schema + CRM tables via Drizzle push.
- [x] **Section 1.4** – Supabase Auth magic links (replaces mock login).
- [ ] **Section 1.3** – (Optional) `lib/portal-data.ts` when Everest API available.

### Phase 2 – Auth & RLS (later)

- [x] **Section 2.1** – Supabase Auth magic links + admin invite flow.
- [ ] **Section 2.2** – RLS policies in Postgres (optional if staying on Drizzle service role).
- [ ] **Section 2.3** – Portal client identity + own-data only.

### Presentation leg (done – client demo)

- [x] **Presentation** – CRM presentation mode, rim-light cards, trust hallmarks.
- [x] **CRM redesign** – Minimal sidebar, kanban fix, WhatsApp inbox, settings/team admin.

---

## Resume checklist

1. Run `npm run crm:ensure-superuser` with Supabase service credentials so `albert@asbrokers.co.za` is the CRM admin superuser and any legacy `admin@asbrokers.co.za` account is revoked.
2. Confirm `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` on Vercel.
3. Portal: replace `lib/mock-portal.ts` when portfolio API is ready.
4. Optional: wire `/retirement-survival-blueprint` to CRM lead capture.
