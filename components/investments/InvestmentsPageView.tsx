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
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { HubHeroActions } from "@/components/hub/HubHeroActions";
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";
import { getAlt } from "@/lib/image-alt";

const HERO_IMAGE = "/images/investments-hero-16x9.webp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
/** WCAG AA teal on canvas; lighter teal for shark chapters. */
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";

const FAIS_CALCULATOR_DISCLAIMER =
  "Calculators are provided for illustrative and educational purposes only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes may differ due to market conditions, fees, taxation, inflation, and legislative changes.";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this page is provided for general informational purposes only and constitutes factual information as contemplated in Section 1(3)(a) of the Financial Advisory and Intermediary Services Act, 37 of 2002 (FAIS Act). It does not constitute financial, investment, legal, tax, or other professional advice. No recommendation, guidance, or proposal is made regarding the appropriateness or suitability of any financial product or service for any individual. Before making any financial decision, consult an authorised representative of AS Brokers CC (FSP 17273) for a Financial Needs Analysis and a formal Record of Advice.";

const EDUCATIONAL_TOOLS = [
  {
    code: "ASSET 016",
    title: "Power of Growth Calculator",
    description:
      "An illustrative comparison of starting a growth projection today versus delaying the same inputs.",
    href: calculatorPagePath("asset-016-growth-comparison"),
  },
  {
    code: "ASSET 017",
    title: "Goal Engineering Planner™",
    description:
      "Members-only educational tool that reverse-engineers a growth rate from user-entered goals and assumptions.",
    href: calculatorPagePath("asset-017-personal-goal"),
  },
] as const;

type Props = { faqs: FAQItem[] };

function ToolCard({
  code,
  title,
  description,
  href,
}: {
  code: string;
  title: string;
  description: string;
  href: string;
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
        Open educational calculator
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="mt-5 border-t pt-4" style={{ borderColor: HAIRLINE }}>
        <p className="text-[11px] leading-relaxed text-stone-500">{FAIS_CALCULATOR_DISCLAIMER}</p>
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

/**
 * Investments hub — FAIS factual-information framing (compliance update 2026-07-24).
 * No named-product shelf, no suitability language, educational calculators only.
 */
export function InvestmentsPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="Investments" longLabel="Investments" />}
        title="Investment information from AS Brokers CC"
        description="AS Brokers CC (FSP 17273) provides factual information about investment wrappers, tax treatment concepts, and Category 1.8 advice services. Personal recommendations are given only after a Financial Needs Analysis with an authorised representative."
        actions={
          <HubHeroActions
            primaryLabel="Request a needs analysis"
            primaryHref="/contact?source=investments_hero"
          />
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/investments-hero-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/investments-hero-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/investments-hero-16x9-480.webp"
                alt={getAlt(HERO_IMAGE, "Adviser reviewing investment charts at a home desk")}
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
          <p className="max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
            Prefer educational calculators first?{" "}
            <Link
              href="/calculators"
              prefetch={false}
              className="font-semibold text-cinematic-teal hover:opacity-80"
            >
              View available educational calculators
            </Link>
            .
          </p>
        }
      />

      <section
        id="general-advice-disclaimer"
        className="scroll-mt-28 border-b pb-12 md:scroll-mt-32 md:pb-16"
        style={{ borderColor: HAIRLINE, backgroundColor: "#FFFBEB" }}
        aria-labelledby="disclaimer-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="disclaimer-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
          >
            General information disclaimer
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
            Any reference to past performance, historical averages, or illustrative projections is
            not necessarily indicative of future results. Figures shown in tools on this website are
            not guaranteed and depend on assumptions you enter, as well as market conditions, fees,
            taxation, and legislative change.
          </p>
        </div>
      </section>

      <section
        id="licence-and-scope"
        className="scroll-mt-28 border-b pb-16 md:scroll-mt-32 md:pb-24"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="licence-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel>Licence and scope</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="licence-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Authorised Financial Services Provider, FSP 17273
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              AS Brokers CC is an Authorised Financial Services Provider (FSP No. 17273). Category
              1.8 authorisation includes advice on certain securities and instruments, which may
              include unlisted instruments that sit outside a standard retail unit-trust shelf.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              This page explains concepts that commonly arise when clients discuss voluntary capital,
              retirement-fund wrappers, and income versus growth objectives. It does not present a
              product catalogue or rank products for any visitor.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Formal advice, product comparison for a specific client, and any recommendation are
              completed only through an authorised representative after a needs analysis.
            </p>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: BODY }}>
              Related statutory pages:{" "}
              <Link
                href="/regulatory-compliance"
                prefetch={false}
                className="font-semibold text-cinematic-teal hover:opacity-80"
              >
                Regulatory and compliance
              </Link>
              {" · "}
              <Link
                href="/conflict-of-interest"
                prefetch={false}
                className="font-semibold text-cinematic-teal hover:opacity-80"
              >
                Conflict of interest
              </Link>
              {" · "}
              <Link
                href="/privacy"
                prefetch={false}
                className="font-semibold text-cinematic-teal hover:opacity-80"
              >
                Privacy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section
        id="wrappers"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="wrappers-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel invert>Educational framing</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="wrappers-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Common investment wrappers, explained factually
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Different legal wrappers follow different tax, liquidity, and access rules. The
              descriptions below are educational only. They are not ranked options for any reader.
            </p>

            <dl className="mt-8 space-y-0 border-y border-white/10">
              {[
                {
                  dt: "Retirement annuity and preservation funds",
                  dd: "Sit inside the retirement-fund tax framework. Contribution, deduction, and access rules apply. These wrappers are not interchangeable with after-tax voluntary capital products.",
                },
                {
                  dt: "Living annuities",
                  dd: "Often used when retirement-fund capital is converted for income. Legislated drawdown bounds commonly discussed in South Africa are 2.5% to 17.5% of residual capital per year. Withdrawals are typically taxed as income. Growth treatment depends on the wrapper rules in force.",
                },
                {
                  dt: "Voluntary capital outside retirement funds",
                  dd: "Typically funded with after-tax money. Liquidity, notice periods, fees, and tax treatment depend on the specific instrument. Unlisted instruments may be illiquid and harder to value than listed equities.",
                },
                {
                  dt: "Interest versus dividend tax concepts",
                  dd: "Interest income is generally taxed at the investor’s marginal rate. Dividends on many South African preference-share structures are typically subject to Dividends Withholding Tax (currently often discussed at 20%). Tax treatment does not remove investment, liquidity, or credit risk, and it does not convert a targeted profile into a guarantee. Confirm current SARS treatment with a qualified professional.",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="grid gap-2 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-white">{row.dt}</dt>
                  <dd className="text-sm leading-relaxed text-white/65">{row.dd}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-white/70">
              For retirement planning education, see the{" "}
              <Link
                href="/retirement-planning"
                prefetch={false}
                className="font-semibold hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                retirement planning hub
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section
        id="unlisted-risks"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="unlisted-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel>Risk disclosures</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="unlisted-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Unlisted securities: risks that must stay visible
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Where Category 1.8 advice may involve unlisted securities or private structures,
              regulators have repeatedly highlighted limited transparency, liquidity constraints,
              and valuation difficulty. These assets should not be assumed to carry the same market
              characteristics or protections as listed equities.
            </p>
            <ul className="mt-6 space-y-3 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              <li>
                <span className="font-semibold text-shark">Not guaranteed.</span> Targeted or
                illustrative return profiles are not guarantees unless a specific contractual
                guarantee is expressly disclosed in product documentation.
              </li>
              <li>
                <span className="font-semibold text-shark">Illiquidity.</span> Early access may be
                limited, subject to notice periods, issuer discretion, or exit charges. Some
                voluntary products discussed in the market use minimum lump sums (for example
                R100,000), notice periods, and early-exit penalties. Exact terms are product-specific
                and must be confirmed in current provider documentation.
              </li>
              <li>
                <span className="font-semibold text-shark">Fees and loyalty mechanics.</span> Any
                loyalty bonus, cash-back, or similar benefit is not “free”. Associated costs may be
                built into the product economics. Fee and Effective Annual Cost (EAC) details, where
                applicable, must come from current provider disclosures during advice.
              </li>
              <li>
                <span className="font-semibold text-shark">No digital suitability score.</span> This
                website does not assign a recommended product, suitability score, or “best option”
                based on a form or calculator.
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: BODY }}>
              {/* CONTAINMENT 2026-07-22: named-product hubs and product calculators remain restricted */}
              Named-product landing pages and product-specific calculators are currently restricted
              pending formula, factual, provider, and compliance approval. They are not promoted on
              this page.
            </p>
          </div>
        </div>
      </section>

      <section
        id="educational-tools"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: "#FDFCFA" }}
        aria-labelledby="tools-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
            style={{ color: TEAL }}
          >
            Educational tools only
          </p>
          <h2
            id="tools-heading"
            className="mt-3 font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Illustrative calculators available during review
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            These tools output mathematics from assumptions you enter. They do not assess your full
            circumstances, risk profile, tax position, or product suitability.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {EDUCATIONAL_TOOLS.map((tool) => (
              <ToolCard key={tool.code} {...tool} />
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed" style={{ color: BODY }}>
            Product-specific comparison calculators remain unavailable to the public until approved.{" "}
            <Link
              href="/calculators"
              prefetch={false}
              className="font-semibold text-cinematic-teal hover:opacity-80"
            >
              Open the calculator holding page
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        id="how-advice-works"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="advice-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <EditorialLabel invert>Advice process</EditorialLabel>
            </div>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="advice-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              When website information becomes regulated advice
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Under the FAIS Act, advice includes any recommendation, guidance, or proposal of a
              financial nature about buying, investing in, replacing, varying, or terminating a
              financial product. A static website cannot complete a compliant needs analysis for
              every visitor, so this page stays within factual information.
            </p>
            <ol className="mt-8 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-white/70">
              <li>
                You may use educational pages and calculators to understand concepts and prepare
                questions.
              </li>
              <li>
                If you request advice, an authorised representative gathers your circumstances and
                completes a Financial Needs Analysis.
              </li>
              <li>
                Any product discussion is based on current provider documentation, fees, risks, and
                liquidity terms appropriate to that analysis.
              </li>
              <li>
                A Record of Advice documents the recommendation. Website copy is not a substitute for
                that record.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section
        className="border-b py-8"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-label="Practice credentials"
      >
        <div className={`${HOME4_WRAP} grid gap-6 md:grid-cols-3 md:gap-8`}>
          {[
            { title: "AS Brokers CC", body: "Est. 1998 · Krugersdorp, West Rand" },
            { title: "FSP 17273", body: "Authorised Financial Services Provider · FSCA" },
            { title: "Category 1.8", body: "Advice scope includes certain securities and instruments" },
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
        kicker="Before you contact us"
        heading="Straight answers about website information versus advice"
        lead="Education first. Personal financial advice only after a needs analysis with AS Brokers CC, FSP 17273."
        primaryCta={{ href: "/contact?source=investments_faq", label: "Request a needs analysis" }}
        secondaryCta={{ href: "/calculators", label: "View educational calculators" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/investments")} />

      <section
        id="book-needs-analysis"
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
                FSP 17273 · Needs analysis
              </p>
              <h2
                id="final-cta-heading"
                className="mt-4 font-serif font-semibold tracking-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
              >
                Request a personal financial assessment
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75">
                Bring your questions and supporting figures. An authorised representative will assess
                your circumstances before any product recommendation is made.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/55">{GENERAL_ADVICE_DISCLAIMER}</p>
            </div>
            <div className="mt-8 shrink-0 md:mt-0">
              <Link
                href="/contact?source=investments_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Contact AS Brokers
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
