"use client";

import Image from "next/image";
import Link from "next/link";
import { EverestProductComparisonTable } from "@/components/EverestProductComparisonTable";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, Briefcase, LineChart } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8`;

const HERO_IMAGE = "/images/home4-import/card1.png";

const CALC_INCOME_VS_GROWTH = "/embed-calculators/asset-013-everest-income-vs-growth.html";
const CALC_POWER_OF_GROWTH = "/embed-calculators/asset-016-growth-comparison.html";
const CALC_142_INCOME = "/embed-calculators/asset-009-everest-142-income.html";
const CALC_128_INCOME = "/embed-calculators/asset-010-everest-128-income.html";
const CALC_LIVING_ANNUITY = "/embed-calculators/asset-014-living-annuity.html";
const CALC_STRATEGIC_GROWTH = "/embed-calculators/asset-012-strategic-growth.html";
const CALC_LIFE_OF_CAPITAL = "/embed-calculators/asset-004-life-of-capital.html";

const BEFORE_RETIREMENT = {
  title: "Before Retirement",
  focus: "Wealth Building & Compounding",
  description: "Grow your capital aggressively and tax-efficiently while you work.",
  links: [
    { label: "Strategic Growth 14.5%", href: CALC_STRATEGIC_GROWTH },
    { label: "Retirement planning", href: "/retirement" },
    { label: "Power of Growth calculator", href: CALC_POWER_OF_GROWTH },
  ],
};

const AFTER_RETIREMENT = {
  title: "After Retirement",
  focus: "Income & Capital Preservation",
  description: "Generate reliable, structured income to sustain your lifestyle.",
  links: [
    { label: "Amethyst Living Annuity", href: CALC_LIVING_ANNUITY },
    { label: "Life of capital", href: CALC_LIFE_OF_CAPITAL },
    { label: "Strategic Income 12.8%", href: CALC_128_INCOME },
  ],
};

const EVEREST_PRODUCTS = [
  {
    title: "12.8% Strategic Income",
    rate: "12.8%",
    rateLabel: "Targeted p.a.",
    tag: "Monthly income + loyalty bonus",
    description:
      "Monthly dividend income with a 10% loyalty bonus on capital after five years. A balanced choice if you can accept slightly lower cash flow now for long-term value.",
    href: CALC_128_INCOME,
    cta: "Explore Strategic Income",
    fiduciary: [
      "R100,000 minimum lump sum",
      "Dividends taxed at 20% DWT (not marginal income tax)",
      "120-day notice may apply on approved early exit",
      "Up to 15% early exit penalty may apply",
    ],
  },
  {
    title: "14.2% Onyx Income+",
    rate: "14.2%",
    rateLabel: "Targeted p.a.",
    tag: "Maximum day-one income",
    description:
      "Higher monthly income from day one, with no loyalty bonus. Suited to retirees who need maximum cash flow now.",
    href: CALC_142_INCOME,
    cta: "Explore Onyx Income+",
    fiduciary: [
      "R100,000 minimum lump sum",
      "Dividends taxed at 20% DWT",
      "120-day notice may apply on approved early exit",
      "Up to 15% early exit penalty may apply",
    ],
  },
  {
    title: "14.5% Strategic Growth",
    rate: "14.5%",
    rateLabel: "Compound p.a.",
    tag: "Pure compounding",
    description:
      "Capital compounding with no monthly withdrawals. Returns accumulate over five years and are paid at maturity.",
    href: CALC_STRATEGIC_GROWTH,
    cta: "Explore Strategic Growth",
    fiduciary: [
      "R100,000 minimum lump sum",
      "20% DWT on growth at maturity",
      "Five-year term commitment",
      "Illiquid; early exit subject to issuer discretion",
    ],
  },
];

const CALCULATOR_TILES = [
  {
    title: "Everest Income vs Growth Comparison",
    description: "Compare 12.8%, 14.2%, and 14.5% outcomes side by side.",
    href: CALC_INCOME_VS_GROWTH,
    accent: "teal" as const,
  },
  {
    title: "The Power of Growth Calculator",
    description: "Project future lump sums and monthly contributions over time.",
    href: CALC_POWER_OF_GROWTH,
    accent: "blue" as const,
  },
  {
    title: "Single Product Income Calculators",
    description: "Model day-one income for Onyx 14.2% or Strategic Income 12.8%.",
    href: CALC_142_INCOME,
    secondaryHref: CALC_128_INCOME,
    secondaryLabel: "12.8% Income",
    accent: "teal" as const,
  },
];

const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

function LifeStageCard({
  title,
  focus,
  description,
  links,
  accent,
}: {
  title: string;
  focus: string;
  description: string;
  links: { label: string; href: string }[];
  accent: "teal" | "blue";
}) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.06)] ring-1 ring-stone-200/90 sm:p-7"
      style={{ borderLeft: `4px solid ${border}` }}
    >
      <span
        className="inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
        style={{ backgroundColor: `${border}14`, color: border }}
      >
        {focus}
      </span>
      <h2
        className="mt-4 font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
      >
        {title}
      </h2>
      <p
        className="mt-3 leading-relaxed"
        style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              className="group inline-flex items-center gap-2 font-semibold"
              style={{ color: border, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              {link.label}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5"
                style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProductCard({
  title,
  rate,
  rateLabel,
  tag,
  description,
  href,
  cta,
  fiduciary,
}: (typeof EVEREST_PRODUCTS)[number]) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white/95 p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 backdrop-blur-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {tag ? (
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: TEAL }}
            >
              {tag}
            </span>
          ) : null}
          <h3
            className="mt-1 font-bold tracking-tight"
            style={{ fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", color: INK }}
          >
            {title}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <p
            className="font-bold tabular-nums"
            style={{ fontSize: "clamp(1.75rem, 1.5rem + 1vw, 2.25rem)", color: TEAL }}
          >
            {rate}
          </p>
          <p className="text-[10px] font-medium uppercase tracking-wide text-stone-500">{rateLabel}</p>
        </div>
      </div>
      <p
        className="mt-4 flex-1 leading-relaxed"
        style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
      >
        {description}
      </p>
      <Link
        href={href}
        prefetch={false}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-stone-100 px-5 py-2.5 font-semibold text-shark transition-colors duration-500 hover:bg-stone-200"
        style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="mt-5 border-t border-stone-200/80 pt-4">
        <ul className="space-y-1">
          {fiduciary.map((note) => (
            <li key={note} className="text-xs leading-relaxed text-stone-500">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CalculatorTile({
  title,
  description,
  href,
  secondaryHref,
  secondaryLabel,
  accent,
}: (typeof CALCULATOR_TILES)[number]) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,128,128,0.1)] sm:p-7">
      <div
        className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${border}18`, color: border }}
      >
        <LineChart className="h-5 w-5" aria-hidden />
      </div>
      <h3
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", color: INK }}
      >
        {title}
      </h3>
      <p
        className="mt-2 flex-1 leading-relaxed"
        style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href={href}
          prefetch={false}
          className="inline-flex items-center gap-2 font-semibold"
          style={{ color: border, fontSize: "clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)" }}
        >
          {secondaryHref ? "14.2% Income" : "Open calculator"}
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link
            href={secondaryHref}
            prefetch={false}
            className="inline-flex items-center gap-2 font-semibold text-stone-600 hover:text-shark"
            style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)" }}
          >
            {secondaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function EverestWealthPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  return (
    <>
      {/* Hero — side-by-side, no text-on-image overlap */}
      <header
        data-chunk-boundary="true"
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} gap-y-8 lg:items-center`}>
          <HubReveal className="col-span-12 lg:col-span-5">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Investments · Everest Wealth · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 3rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Smarter investments for every stage of your life.
            </h1>
            <p
              className="mt-5 max-w-md leading-relaxed"
              style={{
                fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              From tax-free wealth building to high-yield retirement income, access exclusive
              opportunities tailored to your goals.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{
                fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Book an Investment Strategy Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "South African couple in a trusted investment planning consultation"
                )}
                fill
                priority
                className="object-cover object-center"
                sizes={HUB_SPLIT_HERO_SIZES}
              />
            </div>
          </HubReveal>
        </div>
      </header>

      {/* Life-stage journey */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="everest-life-stage-heading"
      >
        <div className={`${HOME4_WRAP} space-y-6`}>
          <HubReveal>
            <h2
              id="everest-life-stage-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Where are you on your journey?
            </h2>
            <p
              className="mt-2 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Start with your timeline. We will match the right structures, calculators, and
              conversations to your stage.
            </p>
          </HubReveal>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <HubReveal delay={0.04}>
              <LifeStageCard {...BEFORE_RETIREMENT} accent="teal" />
            </HubReveal>
            <HubReveal delay={0.08}>
              <LifeStageCard {...AFTER_RETIREMENT} accent="blue" />
            </HubReveal>
          </div>
        </div>
      </section>

      {/* Premium yield architectures */}
      <section
        data-chunk-boundary="true"
        className="border-y border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="everest-products-heading"
      >
        <div className={`${HOME4_WRAP} space-y-6`}>
          <HubReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="font-semibold uppercase tracking-[0.14em]"
                style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
              >
                Everest Wealth
              </p>
              <h2
                id="everest-products-heading"
                className="mt-2 font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
              >
                Premium Yield Architectures
              </h2>
              <p
                className="mt-2 max-w-2xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                Structured return profiles for voluntary capital. Targeted terms, not guarantees.
                Your adviser will confirm suitability before you invest.
              </p>
            </div>
            <Link
              href="/everest-wealth/about"
              prefetch={false}
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-samsung-blue hover:text-cinematic-teal"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Understanding Everest
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {EVEREST_PRODUCTS.map((product, index) => (
              <HubReveal key={product.title} delay={index * 0.04}>
                <ProductCard {...product} />
              </HubReveal>
            ))}
          </div>
          <HubReveal delay={0.12}>
            <EverestProductComparisonTable variant="warm" />
          </HubReveal>
        </div>
      </section>

      {/* Calculator hub */}
      <section
        data-chunk-boundary="true"
        className="py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="everest-calculators-heading"
      >
        <div className={`${HOME4_WRAP} space-y-6`}>
          <HubReveal>
            <h2
              id="everest-calculators-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Run the numbers for your portfolio.
            </h2>
            <p
              className="mt-2 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative calculators only, not personalised advice. Use them to explore scenarios
              before speaking with an adviser.
            </p>
          </HubReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {CALCULATOR_TILES.map((tile, index) => (
              <HubReveal key={tile.title} delay={index * 0.04}>
                <CalculatorTile {...tile} />
              </HubReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Authority & trust — warm footer, no dark void */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="everest-trust-heading"
      >
        <HubReveal>
          <div
            className={`${HOME4_WRAP} grid gap-8 rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10`}
          >
            <div>
              <h2
                id="everest-trust-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
              >
                Access investments many advisers cannot offer.
              </h2>
              <p
                className="mt-4 max-w-xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                As a Category 1.8 authorised financial services provider, we can guide suitable
                clients toward traditional and selected alternative investments, including Everest
                Wealth solutions, while remaining fully independent. We are not tied to a single
                product house.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700 ring-1 ring-stone-200/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                prefetch={false}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-lg shadow-samsung-blue/25 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                style={{
                  fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                }}
              >
                Book an Investment Strategy Call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="rounded-2xl bg-stone-50 p-6 ring-1 ring-stone-200/80 sm:p-7">
              <Briefcase className="h-8 w-8 text-cinematic-teal/80" aria-hidden />
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)", color: BODY }}
              >
                Everest Wealth Management (Pty) Ltd is an authorised Financial Services Provider (FSP
                795). AS Brokers (FSP 17273) acts as an independent intermediary. Returns shown are
                based on current product terms and are not guaranteed. Unlisted investments involve
                liquidity constraints. Consult a qualified financial adviser before investing.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <Link
                  href="/everest-wealth/about"
                  prefetch={false}
                  className="font-semibold hover:opacity-80"
                  style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)", color: TEAL }}
                >
                  Fiduciary briefing
                </Link>
                <a
                  href="https://wa.me/27662276044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-600 hover:text-shark"
                  style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
                >
                  WhatsApp +27 66 227 6044
                </a>
              </div>
            </div>
          </div>
        </HubReveal>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/everest-wealth")} />
      <Footer />
    </>
  );
}
