# AS Brokers Platform — Honest Valuation

**Purpose:** No-fluff technical valuation for AI-assisted due diligence  
**Date:** September 2026

---

## The Truth About This Codebase

### How It Was Built

| Metric | Value | Implication |
|--------|-------|-------------|
| Total commits | 542 | Active development |
| Cursor Agent commits | 119 (22%) | AI-assisted development |
| Human commits | 423 (78%) | Mix of human + AI |
| Project duration | ~6.5 months (Mar-Sep 2026) | Rapid build |
| Lines of TypeScript/TSX | 73,658 | Medium-sized app |
| Number of files | 587 | Reasonable structure |

**Yes, AI (Cursor) was used.** This is visible in the git history. ~22% of commits are from Cursor Agent.

### What AI-Assisted Development Means for Value

**Arguments AGAINST high valuation:**
- AI can generate boilerplate quickly → less labor cost
- Much of the UI is Tailwind + React patterns → reproducible
- Next.js scaffolding is well-documented → low barrier
- An experienced dev with Cursor could rebuild faster

**Arguments FOR fair valuation:**
- AI still requires human direction, debugging, integration
- Domain knowledge (FAIS compliance, SA financial services) isn't AI-generated
- Business logic in calculators is custom
- Working, deployed, tested system > theoretical rebuild

---

## Hard Numbers

### Codebase Composition

| Category | Files | Lines | Notes |
|----------|-------|-------|-------|
| TypeScript/TSX total | 587 | 73,658 | All application code |
| Calculator HTML embeds | 17 | 7,801 | Static assets |
| Configuration | ~15 | ~1,000 | Standard configs |

### What Actually Works vs What Doesn't

| Feature | Status | Evidence |
|---------|--------|----------|
| Marketing site | ✅ Works | 40+ routes, deployed |
| Blog Studio | ✅ Works | Real CRUD, Supabase storage |
| CRM leads/kanban | ✅ Works | Drizzle DB, real data |
| CRM WhatsApp | ✅ Works | Meta API integration |
| AI Chat | ✅ Works | Gemini, streaming, RAG |
| Calculators | ⚠️ Partial | 17 built, some compliance-locked |
| Client Portal | ❌ Mock only | `lib/mock-portal.ts` - hardcoded data |
| Course platform | ⚠️ Partial | UI works, persistence split-brain |
| RLS security | ❌ Not implemented | Vision doc only |

### The Portal Problem

The client portal (`/portal/*`) is **entirely mock data**:

```typescript
// lib/mock-portal.ts - This is ALL the portal data
export const clientProfile: ClientProfile = {
  name: "Margaret van der Berg",
  totalPortfolioValue: 18_450_000,
  monthlyIncome: 192_500,
};
```

There is no:
- Real client authentication
- Everest API integration
- Document storage backend
- Real messaging system

**This is a significant gap.** The portal is a UI prototype, not a functional system.

---

## Honest Valuation

### Method: What Would It Cost to Rebuild?

**Assumptions for AI-assisted rebuild:**
- Senior developer with Cursor: R600/hr effective rate
- AI accelerates development by ~2-3x for boilerplate
- Complex business logic still requires human time
- Integration and debugging not significantly faster with AI

### Component Breakdown

| Component | Complexity | AI-Buildable? | Human Hours | AI-Assisted Hours | Cost @ R600/hr |
|-----------|------------|---------------|-------------|-------------------|----------------|
| Next.js scaffolding | Low | 90% | 40 | 15 | R9,000 |
| Marketing pages (40) | Low | 80% | 120 | 40 | R24,000 |
| Tailwind design system | Medium | 70% | 80 | 30 | R18,000 |
| Blog Studio CRUD | Medium | 60% | 60 | 30 | R18,000 |
| Course Studio | Medium | 60% | 50 | 25 | R15,000 |
| CRM UI (kanban, lists) | Medium | 60% | 100 | 45 | R27,000 |
| CRM Drizzle schema | Medium | 50% | 40 | 25 | R15,000 |
| CRM Server Actions | Medium | 50% | 80 | 50 | R30,000 |
| WhatsApp integration | High | 30% | 60 | 50 | R30,000 |
| AI Chat + RAG | High | 40% | 80 | 55 | R33,000 |
| Supabase Auth setup | Medium | 50% | 30 | 20 | R12,000 |
| Calculators (17) | High | 20% | 200 | 170 | R102,000 |
| Middleware/security | Medium | 40% | 40 | 28 | R16,800 |
| CI/CD + testing | Medium | 50% | 40 | 25 | R15,000 |
| Documentation | Low | 70% | 30 | 12 | R7,200 |
| **TOTAL** | | | **1,030** | **620** | **R372,000** |

### Reality Check

That R372,000 is the **rebuild cost with a skilled dev + AI**. But that assumes:
- Perfect knowledge of requirements upfront
- No iteration, no client feedback loops
- No debugging integration issues
- No compliance review

**Multiply by 2x for real-world friction:** R744,000

### What About the Incomplete Parts?

| Missing Feature | Est. to Complete | Notes |
|-----------------|------------------|-------|
| Portal real auth | R40,000 | Supabase client auth |
| Portal Everest API | R80,000 | If API exists |
| Portal documents | R30,000 | Supabase storage |
| RLS policies | R50,000 | 15-20 tables |
| Course persistence | R25,000 | Unify data layer |
| **Subtotal** | **R225,000** | To make it complete |

---

## Valuation Summary

### Replacement Cost Approach

| Scenario | Amount (ZAR) |
|----------|--------------|
| Rebuild with AI (ideal conditions) | R372,000 |
| Rebuild with AI (realistic) | R744,000 |
| Cost to complete missing features | R225,000 |
| **Total if built from scratch today** | **R969,000** |

### As-Is Value (What You're Actually Buying)

| Factor | Adjustment |
|--------|------------|
| Base replacement cost | R744,000 |
| Discount: Portal is mock (-15%) | -R111,600 |
| Discount: No RLS (-5%) | -R37,200 |
| Discount: Technical debt (-5%) | -R37,200 |
| Premium: Working CRM (+10%) | +R74,400 |
| Premium: Working AI (+5%) | +R37,200 |
| Premium: Deployed + tested (+5%) | +R37,200 |
| **As-Is Value** | **R706,800** |

---

## Final Honest Assessment

| Valuation | Amount (ZAR) | Rationale |
|-----------|--------------|-----------|
| **Floor** | R500,000 | Buy vs build with AI; you'd pay this to skip 3-4 months |
| **Fair** | R700,000 - R800,000 | Working system, some gaps |
| **Ceiling** | R1,000,000 | Only if portal completion is included |

### What This Doesn't Include

- FSP 17273 license (separate asset, high value)
- Client relationships and AUM
- Domain name and brand
- Any recurring revenue
- Albert's expertise and relationships

### What Would Inflate This Unfairly

❌ Counting lines of code (AI generates verbose code)  
❌ Counting features that don't work (portal)  
❌ Comparing to traditional dev costs (AI changes this)  
❌ "Strategic value" premiums without proof of revenue  

### What Could Legitimately Add Value

✅ If Everest API integration is completed  
✅ If portal goes live with real clients  
✅ If there's documented lead flow / conversion data  
✅ If there's recurring revenue from the platform  

---

## For Albert's AI to Verify

### Claims That Are True

1. **73,658 lines of TypeScript** - `find . -name "*.ts" -o -name "*.tsx" | xargs wc -l`
2. **542 commits over 6.5 months** - `git log --oneline | wc -l`
3. **22% AI-assisted commits** - `git log --format="%an" | grep -c "Cursor"`
4. **CRM stores real data** - Drizzle schema in `lib/db/schema.ts`
5. **Portal is mock** - All data from `lib/mock-portal.ts`
6. **17 calculators exist** - `ls public/embed-calculators/*.html`
7. **No RLS enforced** - Check migrations, no policies active

### Claims to Be Skeptical Of

1. "Enterprise-grade security" - Not yet, app-layer only
2. "Complete CRM solution" - Works, but basic compared to Salesforce
3. "AI-powered insights" - Basic summaries, not predictive
4. "Client portal" - UI only, no backend

---

## Conclusion

**Fair market value: R700,000 - R800,000 ZAR**

This reflects:
- A working marketing site and basic CRM
- AI-assisted build (faster to replicate)
- Significant incomplete work (portal)
- Domain-specific business logic (calculators, FAIS compliance)

A buyer should negotiate for completion of the portal or reduce price by R200,000 if accepting as-is.

---

*This valuation is based on technical assessment only. Business factors (clients, revenue, licenses) are separate and likely more valuable than the code itself.*
