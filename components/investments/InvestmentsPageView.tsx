"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { WealthContinuumViz } from "@/components/trust/TrustDiagrams";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
/** WCAG AA teal on canvas; lighter teal for shark chapters. */
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";
const FAIS_DISCLAIMER =
  "Calculators are provided for illustrative and educational purposes only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes may differ due to market conditions, fees, and legislative changes.";

const CALC_POWER_OF_GROWTH = calculatorPagePath("asset-016-growth-comparison");
const CALC_PERSONAL_GOAL = calculatorPagePath("asset-017-personal-goal");
const CALC_INCOME_VS_GROWTH = calculatorPagePath("asset-013-everest-income-vs-growth");
const CALC_128_VS_142 = calculatorPagePath("asset-011-everest-128-vs-142");

const PAGE_NAV = [
  { id: "fiduciary-philosophy", label: "Fiduciary approach" },
  { id: "phase-accumulation", label: "Growth strategies" },
  { id: "phase-distribution", label: "Income solutions" },
  { id: "everest-toolkit", label: "Everest products" },
  { id: "diagnostic-tools", label: "Diagnostic tools" },
] as const;

const GROWTH_TOOLS = [
  {
    code: "ASSET 016",
    title: "The Power of Growth",
    description: "Project future lump sums from monthly contributions and assumed growth.",
    href: CALC_POWER_OF_GROWTH,
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Growth",
    description: "Find the return profile needed to hit a target capital on your date.",
    href: CALC_PERSONAL_GOAL,
  },
] as const;

const DIAGNOSTIC_TOOLS = [
  {
    code: "ASSET 013",
    title: "Everest Income vs Growth",
    description:
      "Side-by-side illustration of income-led versus growth-led voluntary structures.",
    href: CALC_INCOME_VS_GROWTH,
    cta: "Calculate scenario",
  },
  {
    code: "ASSET 011",
    title: "12.8% vs 14.2% Income",
    description:
      "Compare Strategic Income and Onyx Income+ targeted monthly cash flow side by side.",
    href: CALC_128_VS_142,
    cta: "Compare profiles",
  },
] as const;

const EVEREST_ROWS = [
  {
    name: "12.8% Strategic Income",
    yieldLabel: "12.8% Targeted p.a.",
    focus: "Monthly income + loyalty bonus",
    notes: [
      "R100,000 minimum lump sum",
      "Dividends typically subject to 20% DWT",
      "120-day notice may apply on approved early exit",
      "Up to 15% early exit penalty may apply",
    ],
    href: calculatorPagePath("asset-010-everest-128-income"),
  },
  {
    name: "14.2% Onyx Income+",
    yieldLabel: "14.2% Targeted p.a.",
    focus: "Maximum day-one income",
    notes: [
      "R100,000 minimum lump sum",
      "Dividends typically subject to 20% DWT",
      "120-day notice may apply on approved early exit",
      "Up to 15% early exit penalty may apply",
    ],
    href: calculatorPagePath("asset-009-everest-142-income"),
  },
  {
    name: "14.5% Strategic Growth",
    yieldLabel: "14.5% Targeted p.a.",
    focus: "Pure compounding over term",
    notes: [
      "R100,000 minimum lump sum",
      "20% DWT on growth at maturity (typical treatment)",
      "Five-year term commitment",
      "Illiquid; early exit subject to issuer discretion",
    ],
    href: calculatorPagePath("asset-012-strategic-growth"),
  },
] as const;

type Props = { faqs: FAQItem[] };

function ToolCard({
  code,
  title,
  description,
  href,
  cta = "Run calculation",
}: {
  code: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
}) {
  return (
    <article className="flex h-full flex-col border bg-white p-6 sm:p-7" style={{ borderColor: HAIRLINE }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 tabular-nums">
        {code}
      </p>
      <h3
        className="mt-3 font-serif font-semibold tracking-tight text-shark"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)" }}
      >
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
      <Link
        href={href}
        prefetch={false}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal transition hover:opacity-80"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="mt-5 border-t pt-4" style={{ borderColor: HAIRLINE }}>
        <p className="text-[11px] leading-relaxed text-stone-500">{FAIS_DISCLAIMER}</p>
      </div>
    </article>
  );
}

function EditorialLabel({ children, invert = false }: { children: ReactNode; invert?: boolean }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
      style={{ color: invert ? TEAL_ON_DARK : MUTED }}
    >
      {children}
    </p>
  );
}

export function InvestmentsPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* §1 Orientation hero */}
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] text-cinematic-teal">
              Investments · FSP 17273 · Category 1.8
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)",
                lineHeight: 1.15,
                color: INK,
              }}
            >
              Independent wealth engineering beyond the standard unit trust
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              High earners lose too much yield to JSE volatility and marginal tax on interest. Where
              suitable, Category 1.8 lets us discuss targeted private-market profiles and DWT
              architecture, with liquidity constraints stated upfront. Education before advice.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#diagnostic-tools"
                className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Compare investment profiles
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/everest-wealth"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
              >
                Explore Everest Wealth
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <WealthContinuumViz />
          </div>
        </div>

        <nav
          aria-label="On this page"
          className={`${HOME4_WRAP} mt-12 border-t pt-6 md:mt-14`}
          style={{ borderColor: HAIRLINE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            On this page
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {PAGE_NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm font-medium text-stone-700 transition hover:text-cinematic-teal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* §2 Fiduciary philosophy — light (pairs with hero) */}
      <section
        id="fiduciary-philosophy"
        className="scroll-mt-28 border-b pb-16 md:scroll-mt-32 md:pb-24"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="fiduciary-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel>Philosophy</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="fiduciary-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              The fiduciary advantage: Category 1.8 authority
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              AS Brokers CC is an independent FSP (17273) with Category 1.8 authorisation, including
              advice on certain unlisted instruments beyond a standard unit-trust shelf. We survey
              the market and structure advice around your goals, free from institutional product
              quotas.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              The 45% problem: interest on cash and many retail yields is taxed at your marginal
              rate. Where suitable, preference-share structures can sit in a 20% DWT environment , 
              with R100k minimums, term, and notice constraints stated next to any targeted profile.
              That is the Category 1.8 bridge many generic IFAs cannot offer.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Where appropriate, structured return profiles (including Everest Wealth voluntary
              products) are tools for a defined problem, tax drag, income predictability, or
              compounding, never a default product catalogue.
            </p>
          </div>
        </div>
      </section>

      {/* §3 Phase I: Accumulation — shark */}
      <section
        id="phase-accumulation"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="accumulation-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel invert>Phase I · Accumulation</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="accumulation-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Phase I: Capital accumulation and tax efficiency
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              While you are still working, the engineering problem is growth, tax efficiency, and
              compounding, without confusing accumulation vehicles with retirement income products.
            </p>

            <h3
              className="mt-10 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)" }}
            >
              Balancing voluntary capital and retirement annuities
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Retirement annuities and preservation funds sit inside the retirement-fund tax
              framework. Voluntary capital (including certain unlisted preference-share structures)
              is typically funded with after-tax money and follows different liquidity and tax
              rules. The right mix depends on cash flow, time horizon, and how much liquidity you
              can genuinely commit.
            </p>

            <dl className="mt-8 space-y-0 border-y border-white/10">
              {[
                {
                  dt: "Tax-free / RA wrappers",
                  dd: "Contribution limits and deduction rules apply. Strong for long-term retirement capital, see pre-retirement diagnostics if the shortfall is the real question.",
                },
                {
                  dt: "Voluntary structured capital",
                  dd: "Often R100,000 minimum, term and notice constraints, and DWT on dividends. Suited when you understand illiquidity in exchange for a targeted profile.",
                },
                {
                  dt: "Preservation funds",
                  dd: "Job-change capital that must stay inside the retirement system until access rules allow. Not interchangeable with voluntary Everest products.",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="grid gap-2 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-white">{row.dt}</dt>
                  <dd className="text-sm leading-relaxed text-white/65">{row.dd}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Modelling a pre-retirement shortfall?{" "}
              <Link
                href="/retirement-planning"
                prefetch={false}
                className="font-semibold hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Open the retirement planning hub
              </Link>
              .
            </p>

            <div className="mt-10">
              <a
                href="#growth-tools"
                className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Jump to growth calculators
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Growth tools — light (white cards) */}
      <section
        id="growth-tools"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="growth-tools-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
            style={{ color: TEAL }}
          >
            Accumulation tools
          </p>
          <h2
            id="growth-tools-heading"
            className="mt-3 font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Growth projection tools
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Ungated, illustrative maths for the accumulation phase. Bring the outputs to a strategy
            call if you want advice on your facts.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {GROWTH_TOOLS.map((tool) => (
              <ToolCard key={tool.code} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* §5 Phase II: Distribution — shark */}
      <section
        id="phase-distribution"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="distribution-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel invert>Phase II · Distribution</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="distribution-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Phase II: Capital distribution and sustainable income
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              After work, the engineering problem shifts: reliable income, drawdown discipline, and
              capital preservation. Living annuities and voluntary structured yields solve different
              problems, they must not be conflated.
            </p>
            <dl className="mt-8 space-y-0 border-y border-white/10">
              {[
                {
                  dt: "Living annuities",
                  dd: "Drawdowns typically between 2.5% and 17.5% of residual capital per year, within Regulation 28 wrappers. Growth inside the wrapper is tax-advantaged; withdrawals are taxed as income.",
                },
                {
                  dt: "Sustainable drawdowns",
                  dd: "The rate you take must survive longevity and sequence risk, not just “feel affordable” in year one.",
                },
                {
                  dt: "Structured voluntary yields",
                  dd: "May provide targeted monthly income or deferred compounding on after-tax capital, with notice periods and early-exit constraints.",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="grid gap-2 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-white">{row.dt}</dt>
                  <dd className="text-sm leading-relaxed text-white/65">{row.dd}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Full post-work income focus:{" "}
              <Link
                href="/retirement"
                prefetch={false}
                className="font-semibold hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Retirement income hub
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* §6 Everest toolkit — light (comparison table stays readable) */}
      <section
        id="everest-toolkit"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="everest-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel>Everest toolkit</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-9">
            <h2
              id="everest-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Targeted yields: unlisted preference share structures
            </h2>
            <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Where suitable, AS Brokers can discuss Everest Wealth voluntary products as one option
              among others. Targeted return profiles are not guarantees. Read liquidity, tax, and
              term constraints in the same row as the yield.
            </p>

            <h3
              className="mt-10 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              Understanding Dividends Withholding Tax (DWT) vs marginal tax
            </h3>
            <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Dividends on these voluntary structures are typically subject to 20% DWT, often more
              tax-efficient than interest taxed at marginal rates (up to 45% for top earners). That
              tax treatment does not remove liquidity risk or convert a targeted profile into a
              guarantee.
            </p>

            <h3
              className="mt-10 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              Liquidity, notice periods, and early exit risks
            </h3>
            <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Voluntary Everest capital is illiquid. A 120-day notice period and up to a 15% early
              exit penalty may apply. R100,000 minimum applies on voluntary products. Compare
              structures side-by-side below, then deep-dive product mechanics on the Everest hub if
              needed.
            </p>

            <div
              className="mt-10 overflow-hidden border bg-white"
              style={{ borderColor: HAIRLINE }}
              role="table"
              aria-label="Everest voluntary product comparison"
            >
              <div
                className="hidden grid-cols-12 border-b bg-[#F7F6F3] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 md:grid"
                style={{ borderColor: HAIRLINE }}
                role="row"
              >
                <div className="col-span-3" role="columnheader">
                  Structure
                </div>
                <div className="col-span-3" role="columnheader">
                  Targeted profile
                </div>
                <div className="col-span-4" role="columnheader">
                  Constraints (same visual group)
                </div>
                <div className="col-span-2" role="columnheader">
                  Explore
                </div>
              </div>
              {EVEREST_ROWS.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-1 gap-4 border-b px-4 py-5 last:border-b-0 md:grid-cols-12 md:gap-6 md:py-6"
                  style={{ borderColor: HAIRLINE }}
                  role="row"
                >
                  <div className="md:col-span-3" role="cell">
                    <p className="font-serif text-base font-semibold tracking-tight text-shark">
                      {row.name}
                    </p>
                    <p className="mt-1 text-sm text-stone-600">{row.focus}</p>
                  </div>
                  <div className="md:col-span-3" role="cell">
                    <p className="text-sm font-semibold tabular-nums text-shark">{row.yieldLabel}</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone-500">
                      Not guaranteed. Educational summary only.
                    </p>
                  </div>
                  <div className="md:col-span-4" role="cell">
                    <ul className="space-y-1.5">
                      {row.notes.map((note) => (
                        <li key={note} className="text-sm leading-relaxed text-stone-600">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2" role="cell">
                    <Link
                      href={row.href}
                      prefetch={false}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinematic-teal hover:opacity-80"
                    >
                      Illustrate
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed" style={{ color: BODY }}>
              Corporate structure, risks, and product mechanics:{" "}
              <Link
                href="/everest-wealth"
                prefetch={false}
                className="font-semibold text-cinematic-teal hover:opacity-80"
              >
                Everest Wealth hub
              </Link>{" "}
              ·{" "}
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="font-semibold text-cinematic-teal hover:opacity-80"
              >
                Understanding Everest
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* §7 Income vs growth — shark (white tool card) */}
      <section
        id="diagnostic-tools"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="income-tool-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Diagnostic tools
          </p>
          <h2
            id="income-tool-heading"
            className="mt-3 font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
          >
            Income vs growth: liquidity trade-offs
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
            Compare income versus growth, and day-one cash flow versus loyalty-bonus trade-offs,
            without treating either scenario as advice.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {DIAGNOSTIC_TOOLS.map((tool) => (
              <ToolCard key={tool.code} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* §8 Amethyst distinction — light */}
      <section
        id="amethyst-distinction"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="amethyst-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel>Amethyst distinction</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="amethyst-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              The Amethyst living annuity structure
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Pension, provident, and retirement annuity capital typically converts into an annuity
              at retirement. Amethyst is a living annuity structure with legislated drawdown bounds
              (2.5%–17.5%), a different legal and tax wrapper from voluntary preference-share
              products taxed under DWT.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              If your question is about Reg 28 retirement capital already inside (or about to enter)
              a living annuity, continue on the retirement income path rather than treating voluntary
              yields as a substitute.
            </p>
            <Link
              href="/retirement"
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
            >
              Continue to retirement income
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Credential strip — light, quiet */}
      <section
        className="border-b py-8"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-label="Fiduciary credentials"
      >        <div className={`${HOME4_WRAP} grid gap-6 md:grid-cols-3 md:gap-8`}>
          {[
            { title: "25+ years", body: "Est. 1998 · Krugersdorp, West Rand" },
            { title: "FSP 17273", body: "Independent Category 1.8 · FSCA" },
            { title: "Market survey", body: "Independence before any product shelf" },
          ].map((item) => (
            <div key={item.title}>
              <p className="font-serif text-lg font-semibold tracking-tight text-shark">{item.title}</p>
              <p className="mt-1 text-sm text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqItems}
        headingId="investments-faq-heading"
        primaryCta={{ href: "/contact?source=investments_faq", label: "Contact us" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/investments")} />

      {/* §10 Terminal conversion — full Related-content width */}
      <section
        id="book-strategy"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="final-cta-heading"
      >
        <div className={HOME4_WRAP}>
          <div
            className="rounded-xl px-6 py-10 sm:px-10 sm:py-12 md:flex md:items-end md:justify-between md:gap-10 md:px-12 md:py-14"
            style={{ backgroundColor: INK }}
          >
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] text-cinematic-teal">
                FSP 17273 · Category 1.8
              </p>
              <h2
                id="final-cta-heading"
                className="mt-4 font-serif font-semibold tracking-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
              >
                Ready for a structured investment review?
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75">
                You have the continuum, accumulation, distribution, and the constraints behind any
                targeted yield. Bring your figures; an independent adviser will review without product
                pressure.
              </p>
            </div>
            <div className="mt-8 shrink-0 md:mt-0">
              <Link
                href="/contact?source=investments_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
