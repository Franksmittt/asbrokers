# AS Brokers Website & Calculator Compliance Control File
## Containment package — 2026-07-22

**Effective at:** 2026-07-22T06:43:00+02:00 (Africa/Johannesburg)  
**Instruction type:** Regulatory containment (not visual redesign)  
**Holding page:** `/calculators` (temporary 302 target)

### Backup retention

| Record | Location / method |
|--------|-------------------|
| Pre-containment git history | Git commit history on `main` immediately before containment commit |
| Calculator page configs (source) | `lib/calculators/page-configs.ts`, `lib/calculators/registry.ts` (unchanged source retained; pages restricted via middleware) |
| Embed HTML engines | `public/embed-calculators/*` retained on disk; restricted embeds 302 via middleware |
| Disclaimers / notices | `lib/compliance/containment.ts` |
| This control package | `docs/compliance-control/` |

**Note:** Full production page PDF/screenshot capture should be completed by Frank/ops from the live site at the pre-containment deploy revision and filed alongside this folder. Source code and formulas were not deleted.

### Do not rebuild yet

High-risk calculators must follow the approval sequence in Albert’s instruction before any rebuild is published.
