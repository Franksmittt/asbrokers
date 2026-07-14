import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { getAlt } from "@/lib/image-alt";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const HERO_IMAGE = "/images/retirement-planning-hero-16x9.webp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const FAIS_DISCLAIMER =
  "Calculators are provided for illustrative and educational purposes only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes may differ due to market conditions, fees, and legislative changes.";

const CALC_REALITY = calculatorPagePath("asset-002-retirement-reality-check");
const CALC_GROWTH = calculatorPagePath("asset-001-retirement-growth");
const CALC_GOAL = calculatorPagePath("asset-017-personal-goal");

const CALCULATORS = [
  {
    code: "ASSET 002",
    title: "Retirement Reality Check",
    description: "Compare desired retirement income against projected capital to see if a gap exists.",
    href: CALC_REALITY,
  },
  {
    code: "ASSET 001",
    title: "Required Capital Growth",
    description: "Find the return percentage you need to hit your target capital on your timeline.",
    href: CALC_GROWTH,
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Projections",
    description: "Project future lump sums from your monthly contributions and assumed growth.",
    href: CALC_GOAL,
  },
] as const;

const EDUCATION_NAV = [
  { id: "two-pot", label: "Two-Pot system" },
  { id: "ra-limits", label: "2026 RA tax limits" },
  { id: "cat-18", label: "Category 1.8 alternatives" },
] as const;

type Props = { faqs: FAQItem[] };

function ToolCard({
  code,
  title,
  description,
  href,
}: (typeof CALCULATORS)[number]) {
  return (
    <article className="flex h-full flex-col border border-stone-300/90 bg-white p-6 sm:p-7">
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
        Run calculation
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="mt-5 border-t border-stone-200 pt-4">
        <p className="text-[11px] leading-relaxed text-stone-500">{FAIS_DISCLAIMER}</p>
      </div>
    </article>
  );
}

export function RetirementPlanningPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* §1 Orientation hero, continuous canvas */}
      <header className="pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-[7.5rem] lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] text-cinematic-teal">
              Pre-retirement diagnostics · FSP 17273 · Category 1.8
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)",
                lineHeight: 1.15,
                color: INK,
              }}
            >
              Will your capital survive your lifespan?
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              Most plans are built to <em>reach</em> retirement, then fail to fund life after it.
              We calculate your capital gap and drawdown trajectory first (education before advice),
              then decide whether a Wealth Engineering Call with FSP 17273 is needed.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#retirement-survival-blueprint"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Start diagnostic
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={CALC_REALITY}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
              >
                Run Reality Check
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <figure className="overflow-hidden border border-stone-300/90 bg-white">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={HERO_IMAGE}
                  alt={getAlt(
                    HERO_IMAGE,
                    "Couple outdoors — will your capital survive your lifespan?"
                  )}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                  sizes={HUB_SPLIT_HERO_SIZES}
                />
              </div>
            </figure>
          </div>
        </div>
      </header>

      {/* §2 Inset Blueprint panel, NOT full-bleed dark */}
      <section
        id="retirement-survival-blueprint"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="blueprint-heading"
      >
        <div className={HOME4_WRAP}>
          <div
            className="rounded-lg px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14"
            style={{ backgroundColor: INK }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] text-cinematic-teal">
              Primary diagnostic
            </p>
            <h2
              id="blueprint-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              The Retirement Survival Blueprint
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              A guided 5-step diagnostic that surfaces your Financial Freedom Score™ and the gaps
              in your current trajectory, before you stop working.
            </p>
            <Link
              href="/retirement-survival-blueprint"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Get my score
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* §3 Toolkit, flat white cards on canvas */}
      <section
        id="fiduciary-calculators"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="calculators-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="calculators-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Fiduciary calculators &amp; reality checks
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Ungated educational tools. Use them to see the raw numbers, then bring the output to a
            strategy call if you want advice on your facts.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {CALCULATORS.map((calc) => (
              <ToolCard key={calc.code} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* §4 Editorial education, sticky index + prose */}
      <section
        id="legislation"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="legislation-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <nav
              aria-label="Education sections"
              className="lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                On this section
              </p>
              <ul className="mt-4 space-y-3">
                {EDUCATION_NAV.map((item) => (
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
          </aside>

          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="legislation-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Navigating South African retirement legislation
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Educational context only, not personalised advice. These frameworks shape every
              pre-retirement conversation we have with clients.
            </p>

            <article id="two-pot" className="scroll-mt-28 mt-12 md:scroll-mt-32">
              <h3
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
              >
                The impact of the Two-Pot retirement system
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                From September 2024, new contributions to retirement funds are split: one-third into
                a Savings Pot (accessible once per tax year, subject to tax) and two-thirds into a
                Retirement Pot (preserved until retirement and typically used to purchase an
                annuity). Amounts accumulated before 31 August 2024 sit in a Vested Pot under prior
                rules. For pre-retirees, the practical question is how liquidity, tax, and annuity
                planning interact, not a slogan about “access.”
              </p>
              <dl className="mt-6 space-y-4 border-t border-stone-300/80 pt-6">
                {[
                  {
                    dt: "Vested Pot",
                    dd: "Historical savings to 31 August 2024, protected under previous access rules.",
                  },
                  {
                    dt: "Savings Pot",
                    dd: "One-third of new contributions; limited annual access; withdrawals taxed at marginal rates.",
                  },
                  {
                    dt: "Retirement Pot",
                    dd: "Two-thirds of new contributions; preserved until retirement for annuity purchase.",
                  },
                ].map((row) => (
                  <div key={row.dt} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-shark">{row.dt}</dt>
                    <dd className="text-sm leading-relaxed text-stone-600">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article id="ra-limits" className="scroll-mt-28 mt-14 md:scroll-mt-32">
              <h3
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
              >
                Maximising the 2026 retirement annuity tax deduction limits
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Contributions to pension, provident, and retirement annuity funds are deductible at
                27.5% of the greater of remuneration or taxable income, subject to an annual cap.
                From March 2026 that annual ceiling rises to{" "}
                <span className="font-semibold tabular-nums text-shark">R430,000</span> (from
                R350,000). High earners in the final accumulation years should model whether they
                are using the allowance, and what that means for cash flow, before assuming “max
                RA” is automatically optimal.
              </p>
              <aside className="mt-6 border border-stone-300/90 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cinematic-teal">
                  2026 callout
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  Annual RA / retirement fund deduction cap:{" "}
                  <strong className="tabular-nums">R430,000</strong> from 1 March 2026. Verify the
                  current SARS position with a qualified professional for your tax year.
                </p>
              </aside>
            </article>

            <article id="cat-18" className="scroll-mt-28 mt-14 md:scroll-mt-32">
              <h3
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
              >
                Category 1.8 alternative yield strategies
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                AS Brokers holds Category 1.8 authorisation, which includes advice on certain
                unlisted instruments that sit outside a standard unit-trust shelf. Structured yield
                products (including Everest Wealth voluntary offerings with targeted return
                profiles) can form part of a pre-retirement conversation where liquidity, term, and
                tax treatment must be understood clearly, including 20% dividends tax on relevant
                returns, R100,000 minimums on voluntary products, and early-exit constraints.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Targeted return profiles are not guarantees. Read{" "}
                <Link href="/everest-wealth/about" prefetch={false} className="font-semibold text-cinematic-teal hover:opacity-80">
                  Understanding Everest
                </Link>{" "}
                before comparing any voluntary product to liquid market funds.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* §5 Minimal credential strip */}
      <section
        className="border-y border-stone-300/80 py-8"
        aria-label="Fiduciary credentials"
      >
        <div
          className={`${HOME4_WRAP} grid gap-6 md:grid-cols-3 md:gap-8`}
        >
          {[
            { title: "25+ years", body: "Est. 1998 · Krugersdorp, West Rand" },
            { title: "FSP 17273", body: "Independent Category 1.8 · FSCA" },
            { title: "Fiduciary tone", body: "Education before advice · no product quotas" },
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
        headingId="planning-faq-heading"
        primaryCta={{ href: "/contact?source=retirement_faq", label: "Contact us" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/retirement-planning")} />

      {/* §7 Final conversion, only full-bleed dark before footer */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: INK }}
        aria-labelledby="final-cta-heading"
      >
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <h2
            id="final-cta-heading"
            className="font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
          >
            Ready for a structured review?
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75">
            Bring your portfolio figures, policies, and goals. An independent adviser will review
            your position without pressure or jargon.
          </p>
          <Link
            href="/contact"
            prefetch={false}
            className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
          >
            Book an actuarial consultation
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
