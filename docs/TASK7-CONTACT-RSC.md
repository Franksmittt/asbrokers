# Task 7 — /contact RSC shell + client leaves (FINAL)

Date: 2026-07-13  
Status: **DONE** (implementation complete; not reverted). Visual CI snapshots are stale — see Visual gate.

## Architecture (confirmed)

| Layer | File | Role |
| --- | --- | --- |
| Route (RSC) | `app/(content)/contact/page.tsx` | Metadata + PageJsonLd + `ContactPageView` |
| Page shell (RSC) | `components/contact/ContactPageView.tsx` | Static hero, channels, next-steps, FAIS, FAQ, Related, Footer |
| Banner leaf (client) | `components/contact/ContactIntakeBanner.client.tsx` | `useSearchParams` → optional `?source=` label |
| Form island (client) | `components/contact/ContactFormDeferred.tsx` | Dynamic import of enquiry form |
| Form (client) | `components/forms/ContactEnquiryForm.tsx` | `useActionState(submitContactEnquiry)` |
| Server Action | `app/actions/contact.ts` | `submitContactEnquiry` |

### Banner / Suspense

```tsx
<Suspense fallback={null}>
  <ContactIntakeBanner />
</Suspense>
```

- No `?source=` / unknown source → banner returns `null` (zero geometry).
- Suspense fallback is **`null`** (not a reserved-height placeholder) to avoid CLS and match pre-split behavior on `/contact`.

### Layout

Static sections keep prior classNames / structure / copy. No redesign.

## Files changed (final)

| File | Change |
| --- | --- |
| `components/contact/ContactPageView.tsx` | `"use client"` removed; RSC shell |
| `components/contact/ContactIntakeBanner.client.tsx` | **New** client leaf |
| `docs/TASK7-CONTACT-RSC.md` | This proof |

Unchanged: `ContactFormDeferred.tsx`, `ContactEnquiryForm.tsx`, `app/actions/contact.ts`, other hubs, CRM, Studio.

## Verification run

| Check | Result |
| --- | --- |
| `npm run build` | **PASS** (exit 0, ~9 min, BUILD_ID fresh) |
| Playwright `tests/visual.spec.ts` | Ran against that build |
| Form path (static) | **OK** — still `ContactFormDeferred` → `ContactEnquiryForm` → `submitContactEnquiry` |
| Live form POST | **Not run** (no live submit in this session) |

## Visual gate: BLOCKED (stale baselines — not Task 7 DOM regression)

| Screenshot | Diff ratio | Meaning |
| --- | --- | --- |
| `homepage.png` | ~0.68 | Home **untouched** by Task 7; baseline = old dark home; actual = current warm home |
| `contact.png` | ~0.84 | Baseline = old dark “Book a Private Actuarial Consultation”; actual = current warm “Contact us” |

**Not reverted.** Failures match outdated Linux snapshots vs Continuous Document redesign, not an RSC markup break. Actual contact viewport shows the intended current layout.

**To ungate:** refresh snapshots on Linux CI (`test:visual:update` in CI environment).

## Confirmation

- CRM / Studio / portal / DB / insights / manage-cookies / other hubs: untouched.
- FAQ UI pad-to-6: untouched.
- No commit performed.
