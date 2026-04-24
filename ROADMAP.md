# AS Brokers Website — Premium Upgrade Roadmap

Vision: Elevate the site into a top-tier financial services experience for South Africa—sleek, authoritative, and lead-generating for high-net-worth clients in Gauteng and beyond.

---

## Phase 1 — Foundation & Quick Wins (Current)

**Focus:** Design polish, trust signals, and structure for future features. No external API keys required.

- [x] **Immersive hero:** Parallax/mouse-reactive gradient orbs (Framer Motion)
- [x] **Micro-interactions:** Button glow on focus/active, glassmorphism on key cards
- [x] **Calculator charts:** Recharts integration; projection chart on Run-Out (or Retirement)
- [x] **SEO & trust:** JSON-LD schema (Organization, FinancialService), FAQ schema where relevant
- [x] **Content structure:** `/insights` placeholder for blog/resources
- [x] **Compliance:** FAIS/POPIA trust banner or footer reinforcement

**Effort:** ~15–20 hours | **Value:** Stronger first impression, better SEO, readiness for content.

---

## Phase 2 — Advanced Interactivity & Data

**Requires:** Design assets or API keys where noted.

- **AI-powered personalization**
  - Chatbot on homepage and `/calculators` (Vercel AI SDK or Grok API)
  - “What’s your biggest financial worry?” → recommend calculators/paths
  - Pre-fill other calculators from one (with consent)
- **Financial Health Quiz**
  - Multi-step quiz (e.g. Chartered Wealth–style “Balance Test”)
  - Score → tailored Everest Wealth / solution recommendations
- **Enhanced calculators**
  - Interactive Recharts/D3 projections on all major calculators
  - “What if” scenario sliders (e.g. inflation +2%)
  - Export to branded PDF (existing email capture → PDF generation)
- **Wealth Simulator**
  - Single flow: retirement + insurance + estate inputs → holistic report

**Effort:** ~40–50 hours | **Value:** 2–3x engagement and lead quality.

---

## Phase 3 — Rich Content & Multimedia

- **Blog / resource hub**
  - `/insights` with articles (e.g. “2026 SA Budget & Estates”)
  - Podcast embeds (Spotify/YouTube), video explainers
- **Video**
  - Hero: optional SA landscape loop (Table Mountain, etc.) with overlay
  - Team: short video intros from Albert & Johnny + clickable bios
  - Everests: explainer animations (After Effects → web)
- **Events & newsletter**
  - Event registration for online seminars
  - Mailchimp (or similar) signup + drip to consultation

**Effort:** Content + integration ~25–35 hours | **Value:** Thought leadership, SEO, trust.

---

## Phase 4 — Client Experience & Integrations

- **Client portal**
  - NextAuth.js: secure login, saved calculator results, document upload
  - Book consultations: Calendly or Zoom integration
- **CRM & marketing**
  - Forms → HubSpot or Salesforce (lead scoring)
  - Post-calculator email: “Your PDF + tip sheet” automation
- **External data**
  - Stats SA / inflation proxy for calculators (if available)
  - Everest Wealth API for live quotes (if provided)
- **Analytics & optimization**
  - GA4 + Hotjar (heatmaps, session replay)
  - A/B tests on hero CTAs, form flows
  - Schema markup for key pages (FAQ, HowTo where relevant)

**Effort:** ~25–30 hours + ongoing content | **Value:** Automated lead nurture, scalability.

---

## Phase 5 — Premium Polish (Optional)

- **Custom illustrations**
  - SA illustrator: vault motifs, calculator infographics (e.g. “money growing”)
- **3D / immersive**
  - Three.js: subtle rotating icons (shield, graph) in hero or product sections
- **PWA**
  - Manifest + service worker for offline access to key calculators
- **Accessibility**
  - High-contrast mode, reduced-motion support, WCAG audit

**Effort:** ~20–30 hours | **Value:** “Luxury brand” feel, differentiation.

---

## Technical Stack (Current + Planned)

| Area           | Current              | Phase 2+                    |
|----------------|----------------------|-----------------------------|
| Framework      | Next.js 15 (App Router) | Same                        |
| Styling        | Tailwind CSS         | Same + more glassmorphism   |
| Animation      | Framer Motion        | Same + parallax/orbs        |
| Charts         | Custom bars          | Recharts (Phase 1)          |
| Auth           | —                    | NextAuth.js (Phase 4)       |
| AI             | —                    | Vercel AI SDK / Grok (Phase 2) |
| Analytics      | —                    | GA4, Hotjar (Phase 4)       |
| Forms          | React Hook Form + Zod| + CRM webhooks, CAPTCHA     |

---

## Success Metrics

- **Leads:** Increase in contact form + calculator email captures
- **Engagement:** Time on site, calculator completions, quiz completions
- **SEO:** Rankings for “retirement planner Gauteng”, “Everest Wealth”, “estate planning SA”
- **Performance:** Core Web Vitals (LCP, FID, CLS) in green
- **Trust:** FSP/FAIS/POPIA clarity; low bounce on key pages

---

*Last updated: March 2026. Tax calculators use SARS 2026/27 (Budget 2026). Prioritise Phase 2 (AI, data refresh) and Phase 3 (content) next.*
