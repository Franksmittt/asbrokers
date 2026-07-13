import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { getAlt } from "@/lib/image-alt";
import { EverestRolesTriangle } from "@/components/trust/TrustDiagrams";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";
const CRAFT_IMAGE = "/images/everest-copper-industrial-4x3.jpg";

const CONSTRAINTS = [
  { dt: "Minimum", dd: "R100,000" },
  { dt: "Term", dd: "5 years" },
  { dt: "Notice", dd: "120 days" },
  { dt: "Early exit", dd: "Up to 15% may apply" },
  { dt: "Tax", dd: "20% DWT typical" },
  { dt: "Structure", dd: "Preference shares" },
] as const;

const PROBLEMS = [
  {
    title: "You need income, not another market rollercoaster",
    body: "A 20% drawdown the year you start withdrawing can gut a retirement plan. The job is cash you can budget on, not a unit-trust brochure.",
  },
  {
    title: "Cash and interest are getting taxed hard",
    body: "Interest can attract marginal rates up to 45%. Dividend-style structures typically face 20% DWT, a different tax conversation for many higher earners.",
  },
  {
    title: "You want clarity before anyone sells you a product",
    body: "Run the numbers yourself. Constraints sit on the same page as the yield. Advice only after a needs analysis with FSP 17273.",
  },
] as const;

const PRODUCTS = [
  {
    name: "12.8% Strategic Income",
    yieldLabel: "12.8% targeted p.a.",
    focus: "Monthly income with a 10% loyalty bonus illustration after five years.",
    bestFor: "Income now, with a term reward if you stay invested.",
    href: calculatorPagePath("asset-010-everest-128-income"),
  },
  {
    name: "14.2% Onyx Income+",
    yieldLabel: "14.2% targeted p.a.",
    focus: "Maximum day-one monthly income. No loyalty bonus.",
    bestFor: "When cash flow this month matters more than deferred capital rewards.",
    href: calculatorPagePath("asset-009-everest-142-income"),
  },
  {
    name: "14.5% Strategic Growth",
    yieldLabel: "14.5% targeted p.a.",
    focus: "Pure compounding to maturity. No monthly drawings.",
    bestFor: "Capital you can leave untouched for the full term.",
    href: calculatorPagePath("asset-012-strategic-growth"),
  },
] as const;

const TRUST_FACTS = [
  { dt: "Your adviser", dd: "AS Brokers CC · FSP 17273" },
  { dt: "Licence", dd: "Category 1.8 · unlisted shares" },
  { dt: "Independence", dd: "Not a tied Everest agent" },
  { dt: "Product provider", dd: "Everest Wealth · FSP 795" },
] as const;

type Props = { faqs: FAQItem[] };

/**
 * Everest hub: problem → trust → constraints → products → tools.
 * Continuous Document unity with /calculators (canvas, hairlines, shark FAQ).
 */
export function EverestWealthPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* 1. Hero */}
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-7">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Everest Wealth · Independent Category 1.8 · FSP 17273
            </p>
            <h1
              className="mt-5 max-w-3xl font-serif font-semibold tracking-tight text-balance"
              style={{
                fontSize: "clamp(1.875rem, 1.4rem + 2vw, 3rem)",
                lineHeight: 1.15,
                color: INK,
              }}
            >
              Need monthly income without betting on the next market correction?
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              Albert&apos;s Category 1.8 practice educates you on Everest voluntary preference-share
              profiles first: targeted dividends, illiquidity, and tax, before anyone asks you to
              sign. Run the maths yourself. Then book FSP 17273 if you want advice.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Link
                href={calculatorPagePath("asset-010-everest-128-income")}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Calculate 12.8% target income
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                WhatsApp {WHATSAPP_DISPLAY}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-5 text-sm" style={{ color: BODY }}>
              Prefer the deep brief first?{" "}
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="font-semibold underline-offset-2 hover:underline"
                style={{ color: TEAL }}
              >
                Understanding Everest
              </Link>
            </p>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <figure className="border bg-white" style={{ borderColor: HAIRLINE }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={CRAFT_IMAGE}
                  alt={getAlt(
                    CRAFT_IMAGE,
                    "Copper industrial plant illustrating real-economy backing behind structured income"
                  )}
                  fill
                  quality={75}
                  priority
                  fetchPriority="high"
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <figcaption className="border-t px-5 py-4 text-sm leading-relaxed" style={{ borderColor: HAIRLINE, color: BODY }}>
                Real-economy illustration, not a yield lifestyle shot. Returns remain{" "}
                <span className="font-semibold text-shark">targeted, not guaranteed</span>.
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      {/* 2. Trust band */}
      <section
        className="border-y bg-white"
        style={{ borderColor: HAIRLINE }}
        aria-label="Who you are dealing with"
      >
        <div className={HOME4_WRAP}>
          <dl
            className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
            style={{ backgroundColor: HAIRLINE }}
          >
            {TRUST_FACTS.map((item) => (
              <div key={item.dt} className="min-w-0 bg-white px-5 py-6 sm:px-6">
                <dt
                  className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: MUTED }}
                >
                  {item.dt}
                </dt>
                <dd className="mt-2 font-serif text-base font-semibold tracking-tight text-shark">
                  {item.dd}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. Problems */}
      <section
        className="scroll-mt-28 bg-shark py-16 text-white md:py-24"
        aria-labelledby="everest-problems-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Why people land here
          </p>
          <h2
            id="everest-problems-heading"
            className="mt-3 max-w-2xl font-serif font-semibold tracking-tight text-balance"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)" }}
          >
            Three problems. One educational toolkit.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            We do not start with a brochure. We start with the cash-flow job you actually have.
          </p>

          <div
            className="mt-10 grid grid-cols-1 gap-px md:grid-cols-3"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            {PROBLEMS.map((item, index) => (
              <article key={item.title} className="flex flex-col bg-shark px-6 py-8 sm:px-7">
                <span
                  className="font-serif text-3xl font-semibold tabular-nums"
                  style={{ color: TEAL_ON_DARK }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Constraints fact sheet */}
      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="everest-constraints-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-5">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Before you open a calculator
            </p>
            <h2
              id="everest-constraints-heading"
              className="mt-3 font-serif font-semibold tracking-tight text-balance"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
            >
              The rules sit next to the yield
            </h2>
            <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
              Voluntary Everest profiles are unlisted preference-share structures. They are not bank
              deposits, not guaranteed rates, and not for money you may need next year. Albert will
              not soft-pedal that in a meeting, so we do not soft-pedal it on the page.
            </p>
            <Link
              href="/everest-wealth/about"
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
              style={{ color: TEAL }}
            >
              Full Understanding Everest guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <aside
            className="min-w-0 border bg-white lg:col-span-7"
            style={{ borderColor: HAIRLINE }}
            role="note"
            aria-label="Everest voluntary capital constraints"
          >
            <div className="border-b px-5 py-4 sm:px-6" style={{ borderColor: HAIRLINE }}>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: MUTED }}
              >
                Voluntary capital facts
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                Targeted return profiles. Educational illustrations only under FAIS.
              </p>
            </div>
            <dl
              className="grid grid-cols-2 gap-px sm:grid-cols-3"
              style={{ backgroundColor: HAIRLINE }}
            >
              {CONSTRAINTS.map((item) => (
                <div key={item.dt} className="min-w-0 bg-white px-5 py-4 sm:px-6">
                  <dt
                    className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: MUTED }}
                  >
                    {item.dt}
                  </dt>
                  <dd className="mt-1.5 break-words font-serif text-base font-semibold tracking-tight text-shark">
                    {item.dd}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* 5. Products — shark chapter */}
      <section
        id="profiles"
        className="scroll-mt-28 bg-shark py-16 text-white md:py-24"
        aria-labelledby="suite-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Three voluntary profiles
          </p>
          <h2
            id="suite-heading"
            className="mt-3 max-w-2xl font-serif font-semibold tracking-tight text-balance text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)" }}
          >
            Pick the cash-flow job, then run the illustration
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Same constraints on every row. Different income versus growth trade-offs. Calculators
            stay ungated.
          </p>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {PRODUCTS.map((product) => (
              <article
                key={product.name}
                className="flex min-w-0 flex-col border border-white/10 bg-white p-6 sm:p-7"
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums"
                  style={{ color: MUTED }}
                >
                  {product.yieldLabel}
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight text-shark">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                  {product.focus}
                </p>
                <p className="mt-4 text-sm font-medium text-shark">
                  Best when:{" "}
                  <span className="font-normal" style={{ color: BODY }}>
                    {product.bestFor}
                  </span>
                </p>
                <Link
                  href={product.href}
                  prefetch={false}
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  Run calculation
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 border border-white/15 bg-white/[0.04] px-6 py-6 sm:px-8">
            <p className="text-sm leading-relaxed text-white/70">
              <span className="font-semibold text-white">Living annuity capital is different.</span>{" "}
              Amethyst wraps retirement-fund money under Regulation 28 with legislated drawdowns
              (2.5%–17.5%). Do not conflate it with voluntary preference shares.{" "}
              <Link
                href={calculatorPagePath("asset-014-living-annuity")}
                prefetch={false}
                className="font-semibold hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Model living annuity income
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 6. Compare + roles */}
      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="compare-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-5">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Still deciding
            </p>
            <h2
              id="compare-heading"
              className="mt-3 font-serif font-semibold tracking-tight text-balance"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
            >
              Compare income vs growth before you book
            </h2>
            <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
              Side-by-side illustrations for day-one cash flow versus deferred compounding. Still
              educational. Still not advice.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <Link
                href={calculatorPagePath("asset-013-everest-income-vs-growth")}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                Income vs growth calculator
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={calculatorPagePath("asset-011-everest-128-vs-142")}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                12.8% vs 14.2% comparison
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/calculators#investments"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                All Everest tools on the ASSET hub
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <EverestRolesTriangle />
          </div>
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqItems}
        headingId="everest-faq-heading"
        primaryCta={{ href: "/contact?source=everest_faq", label: "Contact us" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/everest-wealth")} />

      {/* Terminal */}
      <section className="pb-16 md:pb-24" aria-labelledby="everest-cta-heading">
        <div className={HOME4_WRAP}>
          <div className="rounded-xl bg-shark px-6 py-10 text-white sm:px-10 sm:py-12 md:flex md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
                style={{ color: TEAL_ON_DARK }}
              >
                Next step
              </p>
              <h2
                id="everest-cta-heading"
                className="mt-3 font-serif text-2xl font-semibold tracking-tight text-white"
              >
                Test suitability, do not chase a headline yield
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Calculators stay educational. For Everest suitability, liquidity, and tax fit, speak
                with an independent Category 1.8 adviser at AS Brokers CC.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col items-start gap-3 md:mt-0 md:items-end">
              <Link
                href="/contact?source=everest_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Or WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
