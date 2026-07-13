# Task 4 — ContactPoint polish + next/font decision

Date: 2026-07-13  
Scope: WhatsApp ContactPoint; next/font only if visual parity possible. FAQ UI pad unchanged. CSP Report-Only. No HSTS preload. No commit unless human asks.

## Files changed

| File | Action |
| --- | --- |
| `lib/seo.ts` | Shared `buildContactPoints()`; WhatsApp `+27662276044` second ContactPoint on Organization + LocalBusiness |
| `docs/entity-verification-log.md` | Contact channels table (Albert / WhatsApp / Johnny skip) |
| `docs/TASK4-FONTS-CONTACT.md` | **New** — this proof |

## ContactPoint outcome

- Kept Albert primary: office `+27116601445` + `albert@asbrokers.co.za`, `contactType: customer service`, same areaServed as before.
- Added WhatsApp: `+27662276044`, `contactType: WhatsApp`, same areaServed.
- Johnny email **not** added: `johnny@asbrokers.co.za` appears only in CRM internals, not on public marketing pages (`/contact` shows Albert only).

## Fonts: BLOCKED

### What the design already uses

- Tailwind `font-sans`: `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- Tailwind `font-serif`: `Iowan Old Style`, `Palatino Linotype`, `Palatino`, `Georgia`, `serif` (heavy use on hubs)
- Only local font file: `lib/fonts/Inter-Bold.woff` for **OG image** generation (`lib/og-fonts.ts`), not site UI

### Why next/font was not wired

Introducing Inter (local) or a Google stand-in for body/headings would replace the intentional system-ui + Georgia/Palatino look from the recent Continuous Document layout work and would almost certainly fail `tests/visual.spec.ts` baselines. There are no local files matching the live sans/serif stacks, and `next/font` cannot self-host `system-ui` / Iowan without changing glyphs.

**Decision:** stop after ContactPoint. Perfect-10 next/font pipeline deferred until owner accepts a deliberate font family choice (or supplies matching `.woff2` files) with new visual baselines.

## Visual tests

**SKIPPED** — no UI/font change in this task (JSON-LD + docs only). Baselines remain the authority for a future font task; running them here would only re-assert an unchanged UI and still need a production `next build` + Linux-aligned snapshots (CI note in `docs/DEPLOYMENT.md`).

## Confirmation: layout / CRM / Studio untouched

- No layout.tsx font wiring, Tailwind family swap, PageView, FAQ UI, CRM, Studio, portal, CSP enforce, or chat/quiz index changes.
- HSTS remains without `preload` (Task 3).
