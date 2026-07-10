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
import { ArrowRight, LineChart, ShieldCheck, FileText } from "@/components/icons";
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

const HERO_IMAGE = "/images/home4-goal-retire-16x9.png";

const CALC_REALITY = calculatorPagePath("asset-002-retirement-reality-check");
const CALC_GROWTH = calculatorPagePath("asset-001-retirement-growth");
const CALC_GOAL = calculatorPagePath("asset-017-personal-goal");

const CALCULATOR_TILES = [
  {
    code: "ASSET 002",
    title: "Retirement Reality Check",
    description: "Compare your desired income against your projected capital to see if a gap exists.",
    href: CALC_REALITY,
    accent: "teal" as const,
  },
  {
    code: "ASSET 001",
    title: "Retirement Growth Calculator",
    description: "Discover the exact return percentage you need to hit your target.",
    href: CALC_GROWTH,
    accent: "blue" as const,
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Growth",
    description: "Project future lump sums based on your monthly contributions.",
    href: CALC_GOAL,
    accent: "teal" as const,
  },
];

const EDUCATION_CARDS = [
  {
    title: "Tax-Free Investments & RAs",
    description:
      "Build long-term capital with tax-efficient structures and disciplined contributions before you retire.",
    href: "/everest-wealth",
    cta: "Explore wealth building",
    span: "col-span-12 md:col-span-7",
  },
  {
    title: "Preservation Funds",
    description:
      "Changing jobs? Understand your options for pension or provident capital without derailing your timeline.",
    href: "/contact",
    cta: "Speak to an adviser",
    span: "col-span-12 md:col-span-5",
  },
  {
    title: "Latest Retirement Guides",
    description: "Plain-language articles on accumulation, tax, inflation, and retirement readiness.",
    href: "/insights",
    cta: "Browse insights",
    span: "col-span-12",
  },
];

const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

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

function EducationCard({
  title,
  description,
  href,
  cta,
  span,
}: (typeof EDUCATION_CARDS)[number]) {
  return (
    <article className={span}>
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col rounded-2xl bg-white/95 p-6 shadow-lg ring-1 ring-stone-200/80 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
      >
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", color: INK }}
        >
          {title}
        </h3>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)", color: BODY }}
        >
          {description}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 font-semibold text-samsung-blue"
          style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

type Props = { faqs: FAQItem[] };

export function RetirementPlanningPageView({ faqs }: Props) {
  return (
    <>
      {/* Split hero — text and image in separate grid cells */}
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
              Pre-retirement · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Are you on track to retire comfortably?
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              Clarity on your capital, your timeline, and exactly what growth rate you need to reach
              financial independence.
            </p>
            <Link
              href="/retirement-survival-blueprint"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Take the Retirement Survival Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Professional South African couple in their fifties reviewing retirement plans together"
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

      {/* Worry funnel */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="planning-worry-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-8">
            <article className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-xl sm:p-10">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-8 w-8 shrink-0" style={{ color: TEAL }} aria-hidden />
                <div>
                  <h2
                    id="planning-worry-heading"
                    className="font-bold tracking-tight"
                    style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.9vw, 2rem)", color: INK }}
                  >
                    Will your money survive your retirement?
                  </h2>
                  <p
                    className="mt-4 max-w-2xl leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.125rem)", color: BODY }}
                  >
                    Stop guessing. Take our 5-step guided diagnostic to discover your Financial
                    Freedom Score™ and identify any gaps in your current trajectory.
                  </p>
                  <Link
                    href="/retirement-survival-blueprint"
                    prefetch={false}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
                    style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
                  >
                    Start the Retirement Survival Blueprint
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          </HubReveal>
        </div>
      </section>

      {/* Calculator hub */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="planning-calculators-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <div className="flex items-center gap-3">
              <LineChart className="h-7 w-7 shrink-0" style={{ color: TEAL }} aria-hidden />
              <h2
                id="planning-calculators-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
              >
                Run your own numbers.
              </h2>
            </div>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative tools for the accumulation phase. Educational only — not personalised
              advice.
            </p>
          </HubReveal>

          {CALCULATOR_TILES.map((tile, index) => (
            <HubReveal key={tile.code} delay={index * 0.04} className="col-span-12 md:col-span-4">
              <CalculatorTile {...tile} />
            </HubReveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 bg-white/60 py-14 md:py-20"
        aria-labelledby="planning-education-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 shrink-0" style={{ color: TEAL }} aria-hidden />
              <h2
                id="planning-education-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
              >
                Master your accumulation phase.
              </h2>
            </div>
          </HubReveal>

          {EDUCATION_CARDS.map((card, index) => (
            <HubReveal key={card.title} delay={index * 0.05} className={card.span}>
              <EducationCard {...card} />
            </HubReveal>
          ))}
        </div>
      </section>

      {/* Fiduciary trust */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="planning-trust-heading"
      >
        <div className={`${GRID} items-center gap-y-8`}>
          <HubReveal className="col-span-12 lg:col-span-7">
            <h2
              id="planning-trust-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Expert guidance for your final working years.
            </h2>
            <p
              className="mt-4 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.125rem)", color: BODY }}
            >
              As an independent Category 1.8 FSP, we engineer wealth-building strategies that
              aren&apos;t tied to a single institution. Let&apos;s build a plan that works for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700 shadow-sm ring-1 ring-stone-200/80"
                >
                  {badge}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Book a Retirement Strategy Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/retirement-planning")} />
      <Footer />
    </>
  );
}
