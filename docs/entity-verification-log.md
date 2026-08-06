# Entity verification log

Pre-filled from `lib/seo.ts` / site constants. Update rows when owner verifies live sources. Do not invent social URLs.

## Canonical entity

| Field | Value (from codebase) | Verified live? | Source / date |
| --- | --- | --- | --- |
| Legal name | AS Brokers CC | | |
| Brand | AS Brokers | | |
| FSP number | 17273 | | |
| Category | 1.8 (Securities and Instruments: Shares) | | |
| Domain | https://www.asbrokers.co.za | | |
| Phone | 011 954 6641 (`+27119546641` in schema) | | |
| Street | Unit 2, The Bridge, 47 Commissioner Street | | |
| Locality | Krugersdorp | | |
| Region | Gauteng | | |
| Postal code | 1739 | | |
| Country | ZA | | |
| Geo (approx) | -26.085, 27.775 | | |
| Founding year | 1998 | | |
| Principals | Albert Schuurman; Johnny Farinha | | |

## Contact channels (schema)

| Channel | Value | In JSON-LD ContactPoint? | Public on marketing site? |
| --- | --- | --- | --- |
| Office phone | 011 954 6641 (`+27119546641`) | Yes — `customer service` | Yes (schema + contact surfaces) |
| Email (Albert) | albert@asbrokers.co.za | Yes — with office phone | Yes (`/contact` mailto + FAQ copy) |
| WhatsApp | +27 66 227 6044 (`+27662276044`) | Yes — `contactType: WhatsApp` | Yes (`/contact` + FAQ copy) |
| Email (Johnny) | johnny@asbrokers.co.za | **Skipped** | No — CRM-only (`lib/crm/team-members.ts`), not shown on public marketing pages |

## sameAs profiles

| Platform | URL | On Organization + LocalBusiness? | Verified |
| --- | --- | --- | --- |
| LinkedIn | TBD — see `docs/entity-sameas-todo.md` | Required when set | |
| Facebook | TBD | Required when set | |
| Instagram | TBD | Required when set | |
| YouTube | TBD | Required when set | |
| X / Twitter | TBD | Required when set | |
| Google Business Profile | TBD | Required when set | |

Policy: when URLs arrive, set the **same** list on both Organization and LocalBusiness `sameAs` arrays. Never invent placeholders.
