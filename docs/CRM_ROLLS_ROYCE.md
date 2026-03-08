# AS Brokers CRM Rules: Rolls-Royce Wealth Concierge Implementation

**Version:** 1.0 (March 7, 2026)  
**Purpose:** Guide Cursor AI in building a state-of-the-art, bespoke CRM for AS Brokers CC (FSP 17273, Category 1.8). This is the "Rolls-Royce" vision: luxurious, AI-infused, compliance-first system for seamless client experiences, staff efficiency, and owner oversight. Always align with project tech stack (Next.js App Router, TypeScript, Tailwind with rim-light glassmorphism, Framer Motion, Supabase for auth/DB/Storage/RLS, HubSpot bi-sync, Trigger.dev for automations/PDFs, OpenAI gpt-4o-mini for AI agents, Drizzle ORM + pgvector for RAG, Sanity CMS for content). Build on existing mock (lib/mock-*.ts) by replacing with real backend. Prioritize: Security (POPIA/FAIS), personalization (AI), scalability (1k+ clients), mobile-first (PWA enhancements).

---

## Core Principles (Always Apply)

- **Design Language**: Fuse Apple Pro (easing: cubic-bezier(0.25,0.1,0.25,1), squircle borders rounded-3xl, void/shark backgrounds #000000/#1D1D1F) with Samsung Galaxy (Nightography teal/orange orbs, CTA glows in samsung-blue/supernova-gold). Use rim-light glassmorphism (.rim-light: bg-white/5 backdrop-blur-2xl ring-white/10). Trust hallmarks (FSP 17273, 25+ years) in .trust-hallmark (tabular-nums, engraved).
- **AI Integration**: Use agentic AI (OpenAI) for autonomous tasks (e.g., compliance checks, workflow execution). Make AI explainable/auditable. Inject RAG (pgvector) for grounding in Everest docs/SARS rules.
- **Compliance & Security**: Embed KYC/AML, audit trails, 4-eyes approvals, data sovereignty (Supabase EU servers). Auto-flag risks (e.g., drawdown >17.5%). RLS for roles: admin (all), staff (assigned), client (own data).
- **Service Alignment**: Tailor to AS Brokers services: Retirement/Investments (Everest products like 12.8% Strategic Income), Insurance/Risk (short-term/life personal/business), Medical/Wellness, Estate/Business Structuring, Claims. Use service tags from mock-crm.ts.
- **Trends 2026**: Incorporate from top CRMs (Salesforce FSC: 360 views, AI agents for onboarding/lending; Wealthbox: drag-drop pipelines, social-style activity streams; Altitude: AI prioritization, solo advisor focus; Zoho Finance: no-code workflows, AUM tracking; Redtail: household mapping, AI notetaking; Equisoft: Salesforce-native customization). Key trends: Agentic AI (do-bots for compliance/automation), hyper-personalization (AI scores like Retirement Readiness), real-time monitoring, privacy-first (GDPR/CCPA analogs for POPIA), unified data (CRM + portfolio integrations).
- **Implementation Style**: RSC default, Server Actions for mutations (e.g., Zod schemas in lib/validations). Framer Motion for transitions. Recharts for visuals. No-code elements via Sanity for custom workflows.
- **Testing/Edge Cases**: Always suggest tests (Jest/Vitest). Handle errors gracefully (e.g., fallback UIs). Prefers-reduced-motion support.

---

## User-Specific Rules

### Client Portal: Private Wealth Terminal (VIP Experience)

- **Goal**: Clients (high-net-worth, retirees, families) feel empowered/trusted. Self-service with luxury (one-tap actions, AI insights). Build on /portal mock.
- **Key Features**:
  - Dashboard: Real-time Wealth Overview (Recharts: growth curves, drawdown projections). Pull Everest API data (integrate via Trigger.dev). Add AI "Retirement Readiness Score" (agentic AI simulates scenarios using calcAmethystAnnuity tool).
  - Service Modules: Modular cards for each service. E.g., Retirement: Adjust drawdowns (2.5-17.5%, validate Zod), simulate inflation (CostOfInflationCalculator). Insurance: View policies, upload claims (Supabase Storage). Estate: Simulator with R100k/R200k donations. Use hyper-personalization (AI tailors based on profile).
  - Interactions: Unified messaging (thread with AI drafts, sentiment analysis). Document vault (OCR via OpenAI vision). Appointments (calendar sync, AI suggestions). Educational hub (Sanity articles, personalized via RAG).
  - Trust Elements: Biometric login (Supabase Auth), transparency logs. Mobile PWA with offline holdings view.
- **Cursor Actions**: When editing /portal/*, suggest AI integrations (e.g., useChat for personalized recs). Ensure RLS: client sees only own data. Generate Zod schemas for inputs (e.g., investmentLeadSchema with R100k min).

### Staff Interface: Precision Engine (Efficiency for Advisors/Ops)

- **Goal**: Staff (e.g., Johnny for estates) focus on advice, not admin. Automate drudgery with AI. Build on /crm mock.
- **Key Features**:
  - Pipeline/Leads: Enhanced Kanban (drag-drop with persist via Supabase). AI prioritization (score by capital/Fit/Eng, agentic AI routes e.g., commercial to Petro).
  - Client 360: Profiles with household mapping (link family for estates). AI summaries (e.g., "High inflation risk"). Timeline with all interactions.
  - Workflows: Service-specific (e.g., Everest quotes via Trigger.dev PDFs; claims disputes with AI templates). No-code customization (Sanity for workflow templates).
  - Tools: Task automation (AI-assigned, reminders). Correspondence with sentiment AI. Mobile: Scan docs (device camera integration). Integrations: HubSpot sync, Everest/Santam APIs.
  - Compliance: Auto-audits, red flags (e.g., suitability checks).
- **Cursor Actions**: For /crm/*, suggest Drizzle queries with RLS. Add agentic AI (e.g., Server Action for AI briefs: streamText with tools like calculateEstateDuty). Refactor mocks to real (e.g., getLeadsForAdvisor → Supabase select).

### Owner Dashboard: Command Center (Oversight for Albert/Johnny)

- **Goal**: Total control with predictive insights. Feel in command.
- **Key Features**:
  - Analytics: AI dashboards (Recharts: AUM growth, conversion rates). Predictive (e.g., "Duty savings forecast: R2M").
  - Management: Staff performance tracking, reassigns. Service breakdowns (e.g., "Everest: 40% revenue").
  - Alerts: Executive notifications (e.g., high-value leads). One-click audits.
  - Growth: Referral analytics, marketing integrations.
- **Cursor Actions**: Create /crm/executive page. Use OpenAI for predictions (e.g., agentic AI on historical data). Ensure admin-only RLS.

---

## Roadmap & Phasing

- **Phase 1**: Backend Swap (Supabase Auth/Magic Links, RLS, HubSpot bi-sync). Replace all mocks.
- **Phase 2**: AI Agents (integrate OpenAI for autonomous tasks, RAG for compliance grounding).
- **Phase 3**: Integrations (Everest APIs, mobile PWA). Testing/compliance audit sims.
- **Phase 4**: Launch Optimizations (performance, SEO for portal).

**Cost estimate:** R500k–1M (on top of existing site), focusing on custom AI/workflows.  
**Metrics of success:** 90% client satisfaction; 30% faster onboarding; zero compliance breaches.

---

## When to Apply

- On any CRM/portal file: Suggest refinements per trends (e.g., add agentic AI if workflow detected).
- Generate new components: E.g., AIAdvisorBrief.tsx for summaries.
- Refactor: Always Zod at boundaries, error handling.

This rule evolves the project into a fintech powerhouse. Query me for clarifications.
