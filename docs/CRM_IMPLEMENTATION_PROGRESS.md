# AS Brokers CRM – Implementation Progress (Rolls-Royce)

**Last updated:** Presentation leg done. Backend deferred; use this doc to resume when ready.

## Current state (where we are)

| Area | Status | Notes |
|------|--------|--------|
| **Auth** | Mock only | Cookies: `mock-crm-role`, `mock-crm-user`, `mock-crm-staff-id`. No Supabase Auth yet. |
| **CRM data** | Hybrid | `lib/crm-data.ts` uses Supabase when `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set; else mock. All CRM pages already use crm-data (not mock-crm directly). |
| **Supabase schema** | Migration exists | `supabase/migrations/20260308000000_crm_schema.sql` – staff, households, leads, clients, correspondence, tasks, notes. Must be run in Supabase. |
| **Portal data** | Mock only | `lib/mock-portal.ts` only. No portal Supabase layer yet. |
| **Kanban** | Wired | Uses crm-data; `updateLeadStatus` persists to Supabase when configured. |

**Where it can “bomb out”:**
- Supabase env set but migration not run → missing table errors.
- Supabase embed syntax in `getLeadsForAdvisor` (e.g. `staff:assigned_advisor_id(name)`) can fail depending on PostgREST version → Section 1 hardens to `select("*")` + lookups.

---

## Implementation plan (sections)

### Phase 1 – Backend swap & stability

- [x] **Section 1.1** – Harden CRM data layer (Supabase queries robust; no fragile embeds).
- [x] **Section 1.2** – Add Supabase seed SQL (staff, households, sample leads) and document `.env` + migration/seed in BACKEND.md (§3.1).
- [ ] **Section 1.3** – (Optional) Add `lib/portal-data.ts` with Supabase when configured, else mock-portal; portal pages keep using mock until this exists.
- [ ] **Section 1.4** – Keep auth as mock; document “Phase 2: Supabase Auth + RLS” steps.

### Phase 2 – Auth & RLS (later)

- [ ] **Section 2.1** – Supabase Auth (Magic Link / email); profiles table linking auth.users to staff_id / client_id.
- [ ] **Section 2.2** – RLS policies: admin (all), staff (assigned), client (own only).
- [ ] **Section 2.3** – Replace mock session with Supabase session in CRM/portal layouts.

### Presentation leg (done – client demo)

- [x] **Presentation** – Remove mock/backend footnotes from CRM and Portal dashboards. Fix executive Clients count (`allClients.length`). Login: AS Brokers + FSP 17273, “Demo: choose your view”. Portal/CRM/Executive: trust hallmark (FSP 17273), tagline on Portal. Rim-light on key cards (dashboard stats, recent leads, portal holdings, executive KPIs, My Advisor).
- [x] **Presentation sweep** – Remove remaining user-visible “mock” text: lead detail reassign tooltip (“Reassign lead”), portal Messages subtitle (unified thread copy), portal Documents (“View”, “Upload and view securely”; remove backend footnote). Empty state for Leads table; rim-light on Leads/Clients list cards, Portal Messages and Documents cards.

### Phase 3 – AI, integrations, polish (later)

- [ ] **Section 3.1** – AI agents (e.g. meeting briefs, RAG-grounded tools).
- [ ] **Section 3.2** – HubSpot bi-sync, Trigger.dev PDFs.
- [ ] **Section 3.3** – Portal: real holdings/documents/messages from DB.

---

## Section 1.1 – Harden CRM data layer

**Goal:** Supabase queries work with plain `select("*")` and in-memory lookups so we don’t depend on PostgREST embed syntax.

**Done:**
1. `getLeadsForAdvisor`: use `.select("*")` and resolve advisor/household names via existing `getStaffNameMap` / `getHouseholdNameMap` (no `staff:assigned_advisor_id(...)` embed).
2. (If any other function uses embeds, simplify similarly.)

**Resume from:** `lib/crm-data.ts` – ensure all `supabase.from(...).select(...)` use `*` or explicit column lists only; resolve FKs in code.
