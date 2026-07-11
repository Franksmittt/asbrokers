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
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
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
  },
  {
    code: "ASSET 001",
    title: "Retirement Growth Calculator",
    description: "Discover the exact return percentage you need to hit your target.",
    href: CALC_GROWTH,
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Growth",
    description: "Project future lump sums based on your monthly contributions.",
    href: CALC_GOAL,
  },
];

const EDUCATION_CARDS = [
  {
    title: "Tax-Free Investments & RAs",
    description:
      "Build long-term capital with tax-efficient structures and disciplined contributions before you retire.",
    href: "/everest-wealth",
    cta: "Explore wealth building",
    span: "col-span-12 md:col-span-4",
  },
  {
    title: "Preservation Funds",
    description:
      "Changing jobs? Understand your options for pension or provident capital without derailing your timeline.",
    href: "/contact",
    cta: "Speak to an adviser",
    span: "col-span-12 md:col-span-4",
  },
  {
    title: "Latest Retirement Guides",
    description: "Plain-language articles on accumulation, tax, inflation, and retirement readiness.",
    href: "/insights",
    cta: "Browse insights",
    span: "col-span-12 md:col-span-4",
  },
];

const TRUST_ROWS = [
  { dt: "Authorisation", dd: "FSCA FSP 17273 · Category 1.8" },
  { dt: "Experience", dd: "Serving clients since 1998" },
  { dt: "Location", dd: "Krugersdorp, West Rand, Gauteng" },
  { dt: "Approach", dd: "Fiduciary, advice-led, not product quotas" },
];

/** Shared light-surface link card — same language for tools (on dark) and education (on light). */
function SurfaceCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  tone,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group flex h-full flex-col rounded-2xl p-6 transition-colors sm:p-7 ${
        dark
          ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/[0.08]"
          : "bg-white ring-1 ring-stone-200/90 hover:bg-stone-50"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.16em] ${
          dark ? "text-cinematic-teal" : ""
        }`}
        style={dark ? undefined : { color: TEAL }}
      >
        {eyebrow}
      </p>
      <h3
        className={`mt-3 font-bold tracking-tight ${dark ? "text-white" : ""}`}
        style={{
          fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)",
          color: dark ? undefined : INK,
        }}
      >
        {title}
      </h3>
      <p
        className={`mt-3 flex-1 leading-relaxed ${dark ? "text-white/70" : ""}`}
        style={{
          fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)",
          color: dark ? undefined : BODY,
        }}
      >
        {description}
      </p>
      <span
        className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
          dark ? "text-white" : "text-samsung-blue"
        }`}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

type Props = { faqs: FAQItem[] };

export function RetirementPlanningPageView({ faqs }: Props) {
  return (
    <>
      {/* Same light surface from hero through reading — no colour hopping */}
      <div style={{ backgroundColor: CANVAS }}>
        <header className="pb-12 pt-28 md:pb-14 md:pt-36 lg:pt-40">
          <div className={`${GRID} items-center gap-y-8`}>
            <HubReveal className="col-span-12 lg:col-span-6">
              <p
                className="font-semibold uppercase tracking-[0.2em]"
                style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
              >
                Pre-retirement planning · FSP 17273
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
                For South Africans still working. Diagnose your trajectory, check the numbers, then
                speak with an independent adviser when you want a plan — not a product pitch.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/retirement-survival-blueprint"
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#004a9e]"
                >
                  Start the Retirement Survival Blueprint
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-300 transition hover:bg-white"
                  style={{ color: INK }}
                >
                  Book a strategy call
                </Link>
              </div>
              <p className="mt-6 text-xs font-medium tracking-wide text-stone-500">
                AS Brokers CC · Independent Category 1.8 · Est. 1998 · Krugersdorp
              </p>
            </HubReveal>

            <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.08)] ring-1 ring-stone-300/60">
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

        {/* Quiet page map — same surface, no new band */}
        <div className={`${HOME4_WRAP} pb-12 md:pb-14`}>
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: BODY }}>
            Below: start with the Blueprint, use the calculators if you want to check figures
            yourself, then book advice when you are ready. Optional reading sits after that.
          </p>
        </div>
      </div>

      {/* Single dark module — one colour, one layout system, soft spacing only */}
      <section
        data-chunk-boundary="true"
        className="py-16 md:py-20"
        style={{ backgroundColor: INK }}
        aria-label="Diagnose, calculate, and get advice"
      >
        <div className={HOME4_WRAP}>
          {/* Diagnose */}
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Diagnose
            </p>
            <h2
              id="planning-worry-heading"
              className="mt-3 font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)", lineHeight: 1.15 }}
            >
              Will your money survive your retirement?
            </h2>
            <p className="mt-4 leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
              The Retirement Survival Blueprint is a guided 5-step diagnostic. It surfaces your
              Financial Freedom Score™ and the gaps that matter — then you can run numbers or speak
              to us.
            </p>
            <Link
              href="/retirement-survival-blueprint"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
            >
              Start the Retirement Survival Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Calculate — same wrap, same type, space instead of a harsh rule */}
          <div className="mt-16 md:mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Calculate
            </p>
            <h2
              id="planning-calculators-heading"
              className="mt-3 font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)", lineHeight: 1.15 }}
            >
              Prefer to run the numbers yourself?
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
              Illustrative tools only — not personalised advice. Spot gaps before a fiduciary
              conversation.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
              {CALCULATOR_TILES.map((tile) => (
                <SurfaceCard
                  key={tile.code}
                  tone="dark"
                  eyebrow={tile.code}
                  title={tile.title}
                  description={tile.description}
                  href={tile.href}
                  cta="Run calculator"
                />
              ))}
            </div>
          </div>

          {/* Advise */}
          <div className="mt-16 md:mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Get advice
            </p>
            <div className="mt-3 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
              <div className="lg:col-span-7">
                <h2
                  id="planning-trust-heading"
                  className="font-bold tracking-tight text-white"
                  style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)", lineHeight: 1.15 }}
                >
                  When you are ready for a plan built around your facts.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
                  AS Brokers CC is an independent Category 1.8 FSP (17273) with over 25 years helping
                  West Rand families — advice-led, not call-centre sales.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
                  >
                    Book a Retirement Strategy Call
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/about"
                    prefetch={false}
                    className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white/85 ring-1 ring-white/15 transition hover:bg-white/5"
                  >
                    About AS Brokers
                  </Link>
                </div>
              </div>
              <dl className="space-y-4 lg:col-span-5">
                {TRUST_ROWS.map((row) => (
                  <div key={row.dt}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                      {row.dt}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white/90">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Back to the same light surface */}
      <section
        data-chunk-boundary="true"
        className="py-14 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="planning-education-heading"
      >
        <div className={GRID}>
          <div className="col-span-12">
            <p
              className="font-semibold uppercase tracking-[0.16em]"
              style={{ fontSize: "0.75rem", color: TEAL }}
            >
              Optional reading
            </p>
            <h2
              id="planning-education-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Structures and guides for the accumulation phase.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Not required to start — here when you want more context.
            </p>
          </div>

          {EDUCATION_CARDS.map((card) => (
            <div key={card.title} className={card.span}>
              <SurfaceCard
                tone="light"
                eyebrow="Guide"
                title={card.title}
                description={card.description}
                href={card.href}
                cta={card.cta}
              />
            </div>
          ))}
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqs}
        className="border-t-0 !bg-[#F7F6F3]"
        heading="Frequently asked questions"
      />
      <RelatedContent variant="warm" links={getRelatedLinks("/retirement-planning")} />
      <Footer />
    </>
  );
}
