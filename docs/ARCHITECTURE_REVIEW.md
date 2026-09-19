# AS Brokers CRM — Architecture Review

**Prepared for:** Albert (Owner Review)  
**Date:** September 2026  
**Version:** 1.0

A comprehensive technical assessment of the AS Brokers wealth concierge platform — covering architecture, technology choices, feature maturity, security posture, and strategic value.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Platform Overview](#platform-overview)
3. [Technology Stack Assessment](#technology-stack-assessment)
4. [Feature Inventory](#feature-inventory)
5. [Database & Data Architecture](#database--data-architecture)
6. [Security & Compliance](#security--compliance)
7. [AI Capabilities](#ai-capabilities)
8. [Deployment & Operations](#deployment--operations)
9. [Code Quality Metrics](#code-quality-metrics)
10. [Strategic Value Assessment](#strategic-value-assessment)
11. [Technical Debt & Risks](#technical-debt--risks)
12. [Recommendations](#recommendations)

---

## Executive Summary

### What This Platform Is

A **bespoke, AI-infused CRM and client engagement system** purpose-built for AS Brokers CC (FSP 17273), a Category 1.8 financial services provider. The platform combines:

- **Public marketing website** with educational content, lead magnets, and SEO optimization
- **Staff CRM** with kanban pipeline, AI-assisted insights, WhatsApp integration, and team management
- **Client portal** (prototype stage) for wealth dashboard and self-service
- **Calculator suite** (17 financial calculators) for lead generation and client education
- **Content management** via Blog Studio and Course Studio
- **AI chatbot** for compliant educational assistance

### Technical Maturity Score

| Area | Score | Notes |
|------|-------|-------|
| **Frontend** | 9/10 | Modern Next.js 15, React 19, excellent UI/UX |
| **Backend** | 7/10 | Solid Drizzle ORM; RLS not yet enforced |
| **AI Integration** | 8/10 | Gemini-powered with compliance guardrails |
| **Security** | 6/10 | Auth works; RLS and CSP need hardening |
| **DevOps** | 8/10 | Strong CI/CD; Vercel deployment |
| **Documentation** | 7/10 | Good but some drift from implementation |

### Key Metrics

| Metric | Value |
|--------|-------|
| **Total Routes** | ~99 page routes |
| **Components** | ~206 React components |
| **Library Modules** | ~163 TypeScript modules |
| **Database Tables** | 20+ Drizzle tables |
| **Test Coverage** | a11y, visual regression, Lighthouse, SEO |
| **Lines of Code** | Substantial monorepo (estimate 50k+ LoC) |

---

## Platform Overview

### Architecture Style

**Single-deployable Next.js monolith** using the App Router pattern. This is a modern, maintainable choice that:

- ✅ Simplifies deployment (one Vercel project)
- ✅ Shares code efficiently between marketing/CRM/portal
- ✅ Enables fast iteration with Server Components and Server Actions
- ⚠️ Will need decomposition if team scales significantly

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER / PWA                                │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE                                  │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ middleware.ts                                                    ││
│  │ • Compliance containment redirects                               ││
│  │ • Auth session management                                        ││
│  │ • Crawler policy enforcement                                     ││
│  │ • URL normalization                                              ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APP ROUTER                              │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ (content)/   │  │ (crm)/       │  │ (portal)/    │              │
│  │ Marketing    │  │ Staff CRM    │  │ Client       │              │
│  │ ~40 routes   │  │ ~20 routes   │  │ Portal       │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ studio/      │  │ api/         │  │ embed/       │              │
│  │ Blog/Course  │  │ Chat, OG,    │  │ Calculator   │              │
│  │ CMS          │  │ Webhooks     │  │ iframes      │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │ PostgreSQL  │ │ Supabase    │ │ External    │
            │ + pgvector  │ │ Auth/Storage│ │ APIs        │
            │ (Drizzle)   │ │             │ │             │
            └─────────────┘ └─────────────┘ └─────────────┘
                                                    │
                    ┌───────────────────────────────┤
                    ▼               ▼               ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │ Google      │ │ Resend      │ │ WhatsApp    │
            │ Gemini AI   │ │ Email       │ │ Cloud API   │
            └─────────────┘ └─────────────┘ └─────────────┘
```

### Route Organization

| Route Group | URL Pattern | Purpose | Status |
|-------------|-------------|---------|--------|
| `(content)/` | `/`, `/about`, `/services/*` | Public marketing | ✅ Production |
| `(crm)/` | `/crm/*` | Staff CRM | ✅ Production |
| `(portal)/` | `/portal/*` | Client portal | ⚠️ Prototype |
| `studio/` | `/studio/*` | Content management | ✅ Production |
| `login/` | `/login` | Authentication | ✅ Production |
| `embed/` | `/embed/*` | Calculator embeds | ✅ Production |
| `api/` | `/api/*` | Backend endpoints | ✅ Production |

---

## Technology Stack Assessment

### Core Framework (Excellent Choice)

| Technology | Version | Assessment |
|------------|---------|------------|
| **Next.js** | 15.5.x | Latest stable, App Router, excellent DX |
| **React** | 19 | Cutting-edge, Server Components enabled |
| **TypeScript** | 5.6 strict | Full type safety |
| **Tailwind CSS** | 3.4 | Industry standard, custom design tokens |

**Verdict:** Modern, well-supported stack with long runway. No migration pressure.

### Data Layer (Solid Foundation)

| Technology | Purpose | Assessment |
|------------|---------|------------|
| **Drizzle ORM** | Database access | Modern, type-safe, excellent DX |
| **PostgreSQL** | Primary database | Industry standard, reliable |
| **pgvector** | AI embeddings | Enables semantic search/RAG |
| **Supabase** | Auth + Storage | Good choice, well-integrated |

**Verdict:** Well-architected for scale. pgvector is forward-thinking for AI.

### AI Stack (Competitive Advantage)

| Technology | Purpose | Assessment |
|------------|---------|------------|
| **Google Gemini** | LLM backbone | Cost-effective, capable |
| **Vercel AI SDK** | Streaming/tools | Best-in-class abstraction |
| **RAG Pipeline** | Knowledge grounding | Custom implementation, works well |

**Verdict:** AI capabilities are a differentiator. FAIS-compliant boundaries implemented.

### Supporting Services

| Service | Purpose | Assessment |
|---------|---------|------------|
| **Resend** | Transactional email | Modern, reliable, good deliverability |
| **Trigger.dev** | Background jobs | PDF generation, webhook processing |
| **WhatsApp Cloud API** | Client communication | Direct Meta integration |
| **Vercel** | Hosting | Optimal for Next.js |

---

## Feature Inventory

### 1. Public Marketing Site

**Status:** ✅ Production-ready

| Feature | Implementation | Value |
|---------|----------------|-------|
| Service pages | 40+ content routes | SEO traffic |
| Lead magnets | HRB, Legacy, Business Risk | Lead generation |
| Calculator hub | 17 financial calculators | Engagement + leads |
| AI chat | Educational assistant | 24/7 engagement |
| Blog | Studio-managed | Content marketing |
| Courses | Learning platform | Client education |

**SEO Implementation:**
- Dynamic sitemaps with Blog Studio integration
- JSON-LD structured data (Organization, FinancialService, FAQ)
- Lighthouse CI gate (≥90 performance)
- Googlebot verification tests

### 2. Staff CRM

**Status:** ✅ Production-ready

| Feature | Implementation | Value |
|---------|----------------|-------|
| Lead pipeline | Kanban with drag-and-drop | Workflow efficiency |
| Client 360 | Full lead/client detail views | Service quality |
| WhatsApp inbox | Full send/receive integration | Client communication |
| AI panels | Lead insights, summaries | Advisor productivity |
| Team admin | Roles, permissions, invites | Access control |
| Goals tracking | Advisor campaign targets | Performance management |
| Executive dashboard | AUM, conversion, team metrics | Owner visibility |

**CRM Data Model:**
- Unified `crm_leads` table with pipeline stages
- Correspondence tracking (WhatsApp, email, portal)
- Task management with reminders
- AI audit logging for compliance

### 3. Client Portal

**Status:** ⚠️ Prototype (mock data)

| Feature | Implementation | Value |
|---------|----------------|-------|
| Wealth dashboard | Recharts visualizations | Client empowerment |
| Retirement score | AI-calculated readiness | Engagement |
| Document vault | UI ready, no backend | Compliance |
| Messaging | Thread UI, no backend | Communication |

**Gap:** Real Everest API integration and client authentication needed.

### 4. Content Studios

**Status:** ✅ Production-ready

| Studio | Features | Integration |
|--------|----------|-------------|
| Blog Studio | WYSIWYG editor, categories, SEO | Public `/insights` feed |
| Course Studio | Lessons, blocks, videos | Public `/learn` player |
| Newsletter Studio | Content editor | Resend integration |

### 5. Calculator Suite

**Status:** ✅ Production-ready (some containment)

17 financial calculators covering:
- Estate duty and donations
- Retirement planning
- Investment projections
- Business valuations
- Insurance needs

**Lead Capture:** Calculator sessions tracked in CRM with source attribution.

---

## Database & Data Architecture

### Schema Summary (Drizzle)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CRM CORE                                 │
├─────────────────────────────────────────────────────────────────┤
│ crm_leads          │ Unified lead pipeline                      │
│ crm_staff_profiles │ Team directory + permissions               │
│ crm_tasks          │ Advisor task management                    │
│ crm_advisor_goals  │ Campaign targets                           │
│ correspondence     │ WhatsApp/email/portal threads              │
│ lead_reminders     │ Follow-up scheduling                       │
│ global_notes       │ Team scratchpad                            │
│ crm_ai_audit_log   │ AI action compliance trail                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT & RAG                               │
├─────────────────────────────────────────────────────────────────┤
│ client_insight_posts    │ Blog articles                         │
│ studio_notebook_notes   │ Studio scratchpad                     │
│ resources               │ RAG document chunks                   │
│ embeddings              │ pgvector HNSW index                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      LEAD FUNNELS                                │
├─────────────────────────────────────────────────────────────────┤
│ healthy_retirement_assessments │ HRB funnel leads               │
│ business_risk_reviews          │ BRR funnel leads               │
│ legacy_checklist_leads         │ Legacy checklist leads         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      COURSE PLATFORM                             │
├─────────────────────────────────────────────────────────────────┤
│ courses                   │ Course metadata                     │
│ course_lessons            │ Lesson structure                    │
│ course_lesson_blocks      │ Content blocks                      │
│ course_enrollments        │ Student registrations               │
│ course_progress           │ Completion tracking                 │
│ course_studio_snapshot    │ v1 JSON backup                      │
└─────────────────────────────────────────────────────────────────┘
```

### Migrations

- **9 Drizzle migrations** (`drizzle/0000` - `0008`)
- pgvector enabled for AI embeddings
- Course platform tables with proper relationships
- Parallel Supabase migrations for storage buckets

### Data Access Patterns

```typescript
// Graceful degradation when DB unavailable
export function getDb() {
  const pool = getPool();
  if (!pool) return null;  // Forms degrade, CRM shows empty
  return drizzle(pool, { schema });
}
```

---

## Security & Compliance

### Authentication Architecture

| Method | Use Case | Security Level |
|--------|----------|----------------|
| **Supabase Magic Links** | Staff production login | ✅ High |
| **PIN Sessions** | Demo/meeting fallback | ⚠️ Medium |
| **Password Session** | Blog Studio | ⚠️ Medium |
| **None (planned)** | Client portal | ❌ Not implemented |

### Authorization Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROLE HIERARCHY                                │
├─────────────────────────────────────────────────────────────────┤
│ admin    → All CRM features, team management, executive views   │
│ staff    → Assigned leads, tasks, limited AI features           │
│ client   → Own data only (planned, not enforced)                │
└─────────────────────────────────────────────────────────────────┘
```

**Current Implementation:** Application-layer checks in Server Actions. No Postgres RLS enforced.

### FAIS/POPIA Compliance Features

| Requirement | Implementation |
|-------------|----------------|
| **FAIS Boundaries** | AI prompts explicitly prohibit advice |
| **Audit Trail** | `crm_ai_audit_log` tracks AI actions |
| **Consent** | POPIA consent on lead forms |
| **Data Sovereignty** | Supabase hosted (configurable region) |
| **Compliance Flags** | CRM displays risk indicators |

### Security Headers

```typescript
// next.config.ts security headers
X-Frame-Options: DENY  // Except calculator embeds
Strict-Transport-Security: max-age=63072000
Content-Security-Policy-Report-Only: ...  // Not enforcing yet
Permissions-Policy: restrictive defaults
```

### Security Gaps (Honest Assessment)

| Gap | Risk | Mitigation Path |
|-----|------|-----------------|
| No RLS on CRM tables | Medium | Implement Supabase RLS policies |
| CSP not enforcing | Low | Move to enforcing mode |
| PIN auth still active | Low | Phase out as magic links mature |
| Portal has no client auth | High (if launched) | Implement before go-live |

---

## AI Capabilities

### Current AI Features

| Feature | Model | Implementation |
|---------|-------|----------------|
| **Public Chat** | Gemini 2.5 Flash | Streaming, RAG-grounded, FAIS-bounded |
| **CRM Lead Insights** | Gemini | Summary generation, priority scoring |
| **CRM Meeting Briefs** | Gemini | Pre-meeting preparation |
| **Calculator Tools** | Gemini | Estate duty, retirement calculations |

### RAG Pipeline

```
Document Sources (scripts/rag-documents/)
         │
         ▼
    Chunking + Embedding (Gemini embedding-001)
         │
         ▼
    PostgreSQL + pgvector (HNSW index)
         │
         ▼
    Semantic Search (lib/db/rag.ts)
         │
         ▼
    Context Injection → Chat System Prompt
```

### AI Governance

- **Audit Logging:** All CRM AI actions logged with user, action, timestamp
- **FAIS Boundaries:** System prompts explicitly prohibit financial advice
- **Tool Restrictions:** Product-specific tools removed during compliance review
- **Model Versioning:** Pinned to specific Gemini model versions

---

## Deployment & Operations

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
jobs:
  build:           # npm run build
  accessibility:   # Playwright + axe-core
  visual-regression: # Playwright snapshots
  lighthouse:      # Performance ≥90
  seo-wrs:         # Googlebot verification
  master-audit:    # Aggregated test suite
```

### Environment Configuration

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection | Yes (for CRM) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side auth | Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini AI | Yes |
| `RESEND_API_KEY` | Email delivery | Yes |
| `WHATSAPP_*` | WhatsApp integration | Optional |
| `TRIGGER_*` | Background jobs | Optional |

### Monitoring & Observability

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Traffic, performance |
| Lighthouse CI | Performance regression |
| Playwright | Visual regression |
| Resend Dashboard | Email deliverability |

---

## Code Quality Metrics

### Test Coverage

| Test Type | Implementation | Coverage |
|-----------|----------------|----------|
| Accessibility | Playwright + axe-core | All public routes |
| Visual Regression | Playwright snapshots | Key pages |
| Performance | Lighthouse CI | ≥90 score gate |
| SEO | Googlebot verification | Critical pages |
| Unit Tests | Not implemented | Gap |

### Code Organization

```
Strengths:
✅ Clear route group separation
✅ Consistent lib/ organization
✅ Type-safe throughout
✅ Server Components default

Areas for Improvement:
⚠️ Some documentation drift
⚠️ Legacy migration files to clean up
⚠️ Unit test coverage needed
```

### Dependencies

| Category | Status |
|----------|--------|
| Security vulnerabilities | Run `npm audit` |
| Outdated packages | Generally current |
| Bundle size | Optimized with package imports |

---

## Strategic Value Assessment

### Business Value Delivered

| Capability | Business Impact |
|------------|-----------------|
| **Lead Capture** | Automated funnel → CRM pipeline |
| **24/7 AI Chat** | Always-on client engagement |
| **Staff Efficiency** | Kanban, AI briefs, WhatsApp inbox |
| **Compliance** | Audit trails, FAIS boundaries |
| **Content Marketing** | Blog, courses, calculators |
| **Owner Visibility** | Executive dashboard, team metrics |

### Competitive Differentiation

1. **AI-Native:** Not bolted on; AI throughout the stack
2. **Compliance-First:** FAIS/POPIA built into architecture
3. **Full-Stack Owned:** No vendor lock-in on CRM logic
4. **Modern UX:** Luxury design language, mobile-first

### Scalability Assessment

| Dimension | Current | Scale Path |
|-----------|---------|------------|
| **Users** | Small team | Supabase scales horizontally |
| **Data** | <1M rows | PostgreSQL handles well |
| **Traffic** | Low-medium | Vercel edge scales automatically |
| **AI Calls** | Modest | Gemini pricing is reasonable |

### Technology Investment Protection

- Next.js/React: 5+ year runway, massive ecosystem
- PostgreSQL: Decades of stability ahead
- Vercel: Strong market position, excellent support
- AI SDK: Abstracts model provider, easy to switch

---

## Technical Debt & Risks

### Critical Issues

| Issue | Impact | Effort to Fix |
|-------|--------|---------------|
| Portal mock data only | Blocks client value | Medium |
| No RLS enforcement | Security gap | Medium |
| PIN auth still active | Minor security risk | Low |

### Medium Priority

| Issue | Impact | Effort to Fix |
|-------|--------|---------------|
| Legacy Supabase migrations | Confusion | Low (delete) |
| Documentation drift | Onboarding friction | Low |
| Course platform split-brain | Maintenance burden | Medium |
| CSP report-only | Not enforcing | Low |

### Low Priority

| Issue | Impact | Effort to Fix |
|-------|--------|---------------|
| No unit tests | Regression risk | Medium |
| Some contained calculators | Reduced features | Business decision |

---

## Recommendations

### Immediate (Before Next Major Feature)

1. **Enforce RLS on CRM tables** - Move security to database layer
2. **Clean up legacy migrations** - Remove unused Supabase SQL schema
3. **Document current state** - Align docs with Gemini/Blog Studio reality

### Short-term (Next Quarter)

1. **Portal MVP** - Implement real client auth and basic Everest integration
2. **CSP Enforcement** - Move from report-only to enforcing
3. **Unit Test Foundation** - Add tests for critical business logic (calculators)

### Medium-term (6 Months)

1. **Full Everest Integration** - Real portfolio data in portal
2. **Course Platform Unification** - Pick Postgres or in-memory, not both
3. **Phase Out PIN Auth** - Magic links only for staff

### Long-term (12+ Months)

1. **Consider Service Decomposition** - If team grows significantly
2. **Advanced AI Features** - Proactive client insights, predictive analytics
3. **Mobile App** - If PWA insufficient for user needs

---

## Appendix: File Reference

### Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration, security headers |
| `drizzle.config.ts` | Database schema configuration |
| `tailwind.config.ts` | Design system tokens |
| `middleware.ts` | Request interception, auth, compliance |
| `vercel.json` | Deployment configuration |

### Documentation Files

| File | Purpose |
|------|---------|
| `docs/HANDOVER.md` | Production operations guide |
| `docs/CRM_ROLLS_ROYCE.md` | CRM vision document |
| `docs/DEPLOYMENT.md` | CI/CD and launch checklist |
| `agents.md` | AI/dev context memory |
| `app/calculators/CONTEXT.md` | Calculator business logic |

### Source Directories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router pages and actions |
| `components/` | React components by domain |
| `lib/` | Business logic and utilities |
| `drizzle/` | Database migrations |
| `trigger/` | Background job definitions |
| `scripts/` | Development and maintenance tools |
| `tests/` | Playwright test suites |

---

*This document is intended for technical due diligence and strategic planning. For operational details, consult `docs/HANDOVER.md`.*
