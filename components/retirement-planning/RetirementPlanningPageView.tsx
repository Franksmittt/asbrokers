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
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { HubHeroActions } from "@/components/hub/HubHeroActions";
import { HubHeroAfterLink } from "@/components/hub/HubHeroAfterLink";
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";
import { CallbackForm } from "@/components/forms/CallbackForm";

const HERO_IMAGE = "/images/retirement-planning-hero-16x9.webp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const FAIS_DISCLAIMER =
  "Calculators are provided for illustrative and educational purposes only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes may differ due to market conditions, fees, and legislative changes.";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this page is general information under Section 1(3)(a) of the FAIS Act, 37 of 2002, and is not financial advice or a product recommendation. Personal recommendations follow a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

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
    title: "Goal Engineering Planner™",
    description: "Members only, reverse-engineer the growth required to achieve a financial goal.",
    href: CALC_GOAL,
  },
] as const;

const EDUCATION_NAV = [
  { id: "two-pot", label: "Two-Pot system" },
  { id: "ra-limits", label: "2026 RA tax limits" },
  { id: "cat-18", label: "Category 1.8 scope" },
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
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* §1 Orientation hero, continuous canvas */}
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="Retirement" longLabel="Retirement Planning" />}
        title="Will your capital still pay you at 80?"
        description="Most people discover the retirement gap too late, when switching strategies is expensive. AS Brokers CC (FSP 17273) helps you quantify the gap, stress-test your timeline, and structure a plan after a needs analysis. Run the numbers first, then let's talk."
        actions={
          <HubHeroActions
            primaryLabel="Request a needs analysis"
            primaryHref="/contact?source=retirement_hero"
          />
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/retirement-planning-hero-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/retirement-planning-hero-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/retirement-planning-hero-16x9-480.webp"
                alt={getAlt(HERO_IMAGE, "Couple reviewing retirement documents outdoors at a garden table")}
                width={480}
                height={359}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>
          </figure>
        }
        after={
          <HubHeroAfterLink
            prompt="Prefer the survival blueprint first?"
            href="#retirement-survival-blueprint"
            label="Retirement Survival Blueprint"
          />
        }
      />

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
              Start here
            </p>
            <h2
              id="blueprint-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              The Retirement Survival Blueprint
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              A guided 5-step walkthrough that surfaces your Financial Freedom Score™ and common
              planning gaps, including capital longevity, drawdown sequencing, and contribution
              timing, before your first conversation with an adviser.
            </p>
            <Link
              href="/retirement-survival-blueprint"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Start the blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* §3 Toolkit, flat white cards on canvas */}
      <section
        id="educational-calculators"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="calculators-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="calculators-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Run your numbers first, then let&apos;s talk
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            These tools make the gap visible. See the raw figures, then bring the output to a
            strategy call. An authorised adviser will assess your facts and what actually needs to
            change.
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
                2026 retirement annuity tax deduction limits (educational)
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Contributions to pension, provident, and retirement annuity funds are deductible at
                27.5% of the greater of remuneration or taxable income, subject to an annual cap.
                From March 2026 that annual ceiling rises to{" "}
                <span className="font-semibold tabular-nums text-shark">R430,000</span> (from
                R350,000). High earners in the final accumulation years can model whether they are
                using the allowance and what that means for cash flow. This page does not decide
                whether maximising contributions is appropriate for any individual.
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
                Category 1.8 advice scope (educational)
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                AS Brokers holds Category 1.8 authorisation, which includes advice on certain
                securities and instruments that may sit outside a standard unit-trust shelf. Where
                unlisted instruments are discussed in advice, liquidity, term, valuation difficulty,
                fees, and tax treatment must be confirmed against current provider documentation.
                Targeted or illustrative return profiles are not guarantees.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                For factual investment education without a product catalogue, continue to the{" "}
                <Link href="/investments" prefetch={false} className="font-semibold text-cinematic-teal hover:opacity-80">
                  investments hub
                </Link>
                .
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* §5 Minimal credential strip */}
      <section
        className="border-y border-stone-300/80 py-8"
        aria-label="Practice credentials"
      >
        <div
          className={`${HOME4_WRAP} grid gap-6 md:grid-cols-3 md:gap-8`}
        >
          {[
            { title: "25+ years", body: "Est. 1998 · Krugersdorp, West Rand" },
            { title: "FSP 17273", body: "Independent Category 1.8 · FSCA" },
            { title: "Needs analysis first", body: "Personal recommendations only after a documented needs analysis" },
          ].map((item) => (
            <div key={item.title}>
              <p className="font-serif text-lg font-semibold tracking-tight text-shark">{item.title}</p>
              <p className="mt-1 text-sm text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="pb-14 pt-2 md:pb-20"
        style={{ backgroundColor: CANVAS }}
        aria-label="Request a callback"
      >
        <div className={HOME4_WRAP}>
          <CallbackForm
            source="retirement_planning"
            heading="Want to talk through your retirement numbers?"
            description="Leave your name and number. An authorised adviser phones you back within one business day. Bring your calculator results if you've run them."
            whatsappMessage="Hi AS Brokers, please call me back about my retirement planning."
          />
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
            Request a needs analysis
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section aria-label="General information disclaimer" className="pb-10">
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
