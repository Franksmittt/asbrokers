"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, LineChart } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
  HUB_BLUE as BLUE,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";
import { calculatorPagePath } from "@/lib/calculators/page-path";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

const HERO_IMAGE = "/images/home4-import/card1.png";

const CALC_POWER_OF_GROWTH = calculatorPagePath("asset-016-growth-comparison");
const CALC_PERSONAL_GOAL = calculatorPagePath("asset-017-personal-goal");
const CALC_INCOME_VS_GROWTH = calculatorPagePath("asset-013-everest-income-vs-growth");
const CALC_LIVING_ANNUITY = calculatorPagePath("asset-014-living-annuity");
const CALC_LIFE_OF_CAPITAL = calculatorPagePath("asset-004-life-of-capital");

const BEFORE_LINKS = [
  { label: "Tax-free investments", href: "/everest-wealth" },
  { label: "Retirement annuities", href: "/retirement-planning" },
  { label: "Preservation funds", href: "/contact" },
];

const AFTER_LINKS = [
  { label: "Living annuities", href: CALC_LIVING_ANNUITY },
  { label: "Sustainable drawdowns", href: CALC_LIFE_OF_CAPITAL },
  { label: "Alternative yields", href: "/everest-wealth" },
];

const EVEREST_PRODUCTS = [
  {
    title: "12.8% Strategic Income",
    rate: "12.8%",
    rateLabel: "Targeted p.a.",
    tag: "Monthly income + loyalty bonus",
    description:
      "Monthly dividend income with a 10% loyalty bonus on capital after five years. A balanced choice if you can accept slightly lower cash flow now for long-term value.",
    href: calculatorPagePath("asset-010-everest-128-income"),
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
      "Higher monthly income from day one, with no loyalty bonus. Suited when you need maximum cash flow now.",
    href: calculatorPagePath("asset-009-everest-142-income"),
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
    href: calculatorPagePath("asset-012-strategic-growth"),
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
    code: "ASSET 016",
    title: "The Power of Growth Calculator",
    description: "Project future lump sums based on your monthly contributions.",
    href: CALC_POWER_OF_GROWTH,
    accent: "blue" as const,
    span: "col-span-12 lg:col-span-5",
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Growth",
    description: "Discover the exact return percentage you need to hit your target date.",
    href: CALC_PERSONAL_GOAL,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-4",
  },
  {
    code: "ASSET 013",
    title: "Everest Income vs Growth",
    description: "Compare our high-yield strategies side by side.",
    href: CALC_INCOME_VS_GROWTH,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-3",
  },
];

const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

function LifeStageBlock({
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
  const border = accent === "teal" ? TEAL : BLUE;
  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg ring-1 ring-stone-200/90 sm:p-8"
      style={{ borderLeft: `4px solid ${border}` }}
    >
      <span
        className="inline-flex w-fit rounded-full px-3 py-1 font-semibold uppercase tracking-wide"
        style={{
          fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)",
          backgroundColor: `${border}14`,
          color: border,
        }}
      >
        {focus}
      </span>
      <h2
        className="mt-4 font-bold tracking-tight"
        style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
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
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function EverestProductCard({
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
    <article className="flex h-full w-full flex-col rounded-2xl bg-white/90 p-6 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span
            className="font-semibold uppercase tracking-wider"
            style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)", color: TEAL }}
          >
            {tag}
          </span>
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
          <p
            className="font-medium uppercase tracking-wide text-stone-600"
            style={{ fontSize: "clamp(0.625rem, 0.6rem + 0.05vw, 0.6875rem)" }}
          >
            {rateLabel}
          </p>
        </div>
      </div>
      <p
        className="mt-4 flex-1 leading-relaxed"
        style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
      <Link
        href={href}
        prefetch={false}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-stone-100 px-5 py-2.5 font-semibold text-shark transition-colors hover:bg-stone-200"
        style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="mt-5 border-t border-stone-200/80 pt-4">
        <ul className="space-y-1.5">
          {fiduciary.map((note) => (
            <li
              key={note}
              className="leading-relaxed text-stone-600"
              style={{ fontSize: "clamp(0.75rem, 0.72rem + 0.05vw, 0.8125rem)" }}
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CalculatorTile({
  code,
  title,
  description,
  href,
  accent,
}: (typeof CALCULATOR_TILES)[number]) {
  const border = accent === "teal" ? TEAL : BLUE;
  return (
    <article className="h-full">
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(29,29,31,0.12)] sm:p-7"
      >
        <p
          className="font-semibold uppercase tracking-[0.14em]"
          style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)", color: TEAL }}
        >
          {code}
        </p>
        <h3
          className="mt-2 font-bold tracking-tight"
          style={{ fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", color: INK }}
        >
          {title}
        </h3>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
        >
          {description}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 font-semibold"
          style={{ color: border, fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
        >
          Run calculator
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

type Props = { faqs: FAQItem[] };

export function InvestmentsPageView({ faqs }: Props) {
  return (
    <>
      <header
        data-chunk-boundary="true"
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} items-center gap-y-8`}>
          <HubReveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Investments · FSP 17273 · Category 1.8
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Smarter investments for every stage of your life.
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
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
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Speak to an Investment Expert
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Successful South African couple reviewing investment plans with an adviser"
                )}
                fill
                unoptimized
                priority
                className="object-cover object-center"
                sizes={HUB_SPLIT_HERO_SIZES}
              />
            </div>
          </HubReveal>
        </div>
      </header>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="investments-life-stage-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <h2
              id="investments-life-stage-heading"
              className="sr-only"
            >
              Choose your life stage
            </h2>
          </HubReveal>
          <HubReveal className="col-span-12 lg:col-span-6">
            <LifeStageBlock
              title="Before Retirement"
              focus="Wealth building"
              description="Grow your capital aggressively and tax-efficiently while you are still working."
              links={BEFORE_LINKS}
              accent="blue"
            />
          </HubReveal>
          <HubReveal delay={0.05} className="col-span-12 lg:col-span-6">
            <LifeStageBlock
              title="After Retirement"
              focus="Income generation"
              description="Generate reliable, structured income to sustain your lifestyle."
              links={AFTER_LINKS}
              accent="teal"
            />
          </HubReveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="investments-everest-heading"
      >
        <div className={HOME4_WRAP}>
          <HubReveal>
            <h2
              id="investments-everest-heading"
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Access investments many advisers cannot offer.
            </h2>
            <p
              className="mt-3 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Everest Wealth voluntary products target structured return profiles — not guaranteed
              outcomes. Educational summaries only; suitability depends on your circumstances.
            </p>
          </HubReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            {EVEREST_PRODUCTS.map((product, index) => (
              <HubReveal key={product.title} delay={index * 0.04} className="flex h-full">
                <EverestProductCard {...product} />
              </HubReveal>
            ))}
          </div>

          <HubReveal>
            <p
              className="mt-8 leading-relaxed text-stone-600"
              style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
            >
              Targeted returns are not guaranteed. Voluntary Everest capital is illiquid: 120-day
              notice and up to 15% early exit penalty may apply. Dividends subject to 20% DWT.
              R100,000 minimum on voluntary products. Amethyst living annuity rules differ — see{" "}
              <Link href="/everest-wealth/about" prefetch={false} className="font-semibold" style={{ color: TEAL }}>
                Understanding Everest
              </Link>
              .
            </p>
          </HubReveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 bg-white/60 py-14 md:py-20"
        aria-labelledby="investments-calculators-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <div className="flex items-center gap-3">
              <LineChart className="h-7 w-7 shrink-0" style={{ color: TEAL }} aria-hidden />
              <h2
                id="investments-calculators-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
              >
                Run the numbers for your portfolio.
              </h2>
            </div>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative calculators for wealth building and yield comparison. Not personalised
              advice.
            </p>
          </HubReveal>

          {CALCULATOR_TILES.map((tile, index) => (
            <HubReveal key={tile.code} delay={index * 0.04} className={tile.span}>
              <CalculatorTile {...tile} />
            </HubReveal>
          ))}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="investments-trust-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-300/70 sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[420px]">
              <Image
                src="/images/home4-why-independence-4x3.jpg"
                alt={getAlt(
                  "/images/home4-why-independence-4x3.jpg",
                  "Independent adviser meeting with clients in Krugersdorp"
                )}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="lg:col-span-7">
              <p
                className="font-semibold uppercase tracking-[0.2em]"
                style={{ fontSize: "0.75rem", color: TEAL }}
              >
                Krugersdorp · West Rand · FSP 17273
              </p>
              <h2
                id="investments-trust-heading"
                className="mt-4 font-bold tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)", lineHeight: 1.1, color: INK }}
              >
                Fiduciary structuring you can trust.
              </h2>
              <p
                className="mt-5 max-w-xl leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
              >
                As an independent Category 1.8 FSP with over 25 years of experience, we survey the
                entire market to build a bespoke wealth architecture that serves your goals, free
                from institutional quotas.
              </p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {TRUST_BADGES.map((badge) => (
                  <div key={badge} className="border-l-2 border-cinematic-teal/40 pl-4">
                    <dt className="text-sm font-bold text-shark">{badge}</dt>
                    <dd className="mt-1 text-xs text-stone-500">Verified credential</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact"
                prefetch={false}
                className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-samsung-blue/25 transition hover:bg-[#004a9e]"
              >
                Book an Investment Strategy Call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/investments")} />
      <Footer />
    </>
  );
}
