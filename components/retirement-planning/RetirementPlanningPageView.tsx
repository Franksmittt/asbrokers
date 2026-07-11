"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { HubCalculatorToolBay } from "@/components/hub/HubCalculatorToolBay";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, ShieldCheck } from "@/components/icons";
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
const WARM = "#FDFCFA";

const HERO_IMAGE = "/images/home4-goal-retire-16x9.png";

const CALC_REALITY = calculatorPagePath("asset-002-retirement-reality-check");
const CALC_GROWTH = calculatorPagePath("asset-001-retirement-growth");
const CALC_GOAL = calculatorPagePath("asset-017-personal-goal");

const PATH_STEPS = [
  {
    step: "01",
    title: "Diagnose your trajectory",
    body: "Start with the Retirement Survival Blueprint — a 5-step diagnostic that surfaces your Financial Freedom Score™ and the gaps that matter.",
    href: "/retirement-survival-blueprint",
    cta: "Start the Blueprint",
  },
  {
    step: "02",
    title: "Run the numbers yourself",
    body: "Use the calculators below for income gaps, required growth, and contribution projections. Educational only — not personalised advice.",
    href: "#planning-calculators-heading",
    cta: "Open the tools",
  },
  {
    step: "03",
    title: "Speak with an independent adviser",
    body: "When you want a plan built around your facts, book a strategy call with AS Brokers CC — FSP 17273, Krugersdorp, 25+ years.",
    href: "/contact",
    cta: "Book a strategy call",
  },
] as const;

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

const TRUST_BADGES = ["FSP 17273", "Category 1.8", "Est. 1998", "Krugersdorp · West Rand"];

function EducationCard({
  title,
  description,
  href,
  cta,
}: (typeof EDUCATION_CARDS)[number]) {
  return (
    <article className="h-full">
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col border-l-[3px] border-cinematic-teal bg-white p-6 ring-1 ring-stone-200/90 transition-colors hover:bg-stone-50 sm:p-8"
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
      {/* Purpose: orient the visitor in one screen */}
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
              This page is for South Africans still working. Diagnose your trajectory, check the
              numbers, then speak with an independent adviser when you want a plan — not a product
              pitch.
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
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-300 transition hover:bg-stone-50"
                style={{ color: INK }}
              >
                Book a strategy call
              </Link>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
              AS Brokers CC · Independent Category 1.8 · Est. 1998 · Krugersdorp
            </p>
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

      {/* Trust bar — established, not decorative */}
      <section
        data-chunk-boundary="true"
        className="border-y border-stone-200/80 py-5"
        style={{ backgroundColor: WARM }}
        aria-label="Credentials"
      >
        <div className={`${HOME4_WRAP} flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:justify-between`}>
          {TRUST_BADGES.map((badge) => (
            <p
              key={badge}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-600"
            >
              {badge}
            </p>
          ))}
        </div>
      </section>

      {/* How to use this page — remove the “wall of content” feeling */}
      <section
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="planning-path-heading"
      >
        <div className={HOME4_WRAP}>
          <HubReveal>
            <h2
              id="planning-path-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Three clear next steps.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              You do not need to read everything. Follow the path that matches where you are —
              diagnose, calculate, or speak to us.
            </p>
          </HubReveal>

          <ol className="mt-10 grid list-none gap-6 md:grid-cols-3">
            {PATH_STEPS.map((item, index) => (
              <li key={item.step}>
                <HubReveal delay={index * 0.04} className="h-full">
                  <article className="flex h-full flex-col border-t-2 border-cinematic-teal bg-white p-6 ring-1 ring-stone-200/90 sm:p-7">
                    <span
                      className="font-bold tabular-nums tracking-tight text-cinematic-teal"
                      style={{ fontSize: "1.25rem" }}
                    >
                      {item.step}
                    </span>
                    <h3
                      className="mt-3 font-bold tracking-tight"
                      style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.25rem)", color: INK }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-3 flex-1 text-sm leading-relaxed"
                      style={{ color: BODY }}
                    >
                      {item.body}
                    </p>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue transition hover:opacity-80"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                </HubReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Primary lead magnet */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-800 py-16 md:py-24"
        style={{
          background: "linear-gradient(135deg, #004a9e 0%, #006b6b 55%, #1D1D1F 100%)",
        }}
        aria-labelledby="planning-worry-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Flagship diagnostic · Financial Freedom Score™
            </p>
            <ShieldCheck className="mx-auto mt-5 h-9 w-9 text-white/75" aria-hidden />
            <h2
              id="planning-worry-heading"
              className="mt-5 font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
            >
              Will your money survive your retirement?
            </h2>
            <p
              className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80"
              style={{ fontSize: "1.0625rem" }}
            >
              Stop guessing. The Retirement Survival Blueprint is a guided 5-step diagnostic that
              shows your score and the gaps in your current trajectory — then points you toward
              advice when you are ready.
            </p>
            <Link
              href="/retirement-survival-blueprint"
              prefetch={false}
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
            >
              Start the Retirement Survival Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* DIY tools */}
      <HubCalculatorToolBay
        headingId="planning-calculators-heading"
        title="Prefer to run the numbers yourself?"
        lead="Illustrative tools for the accumulation phase. Educational only — not personalised advice. Use them to spot gaps before a fiduciary conversation."
        tools={CALCULATOR_TILES.map((tile) => ({
          code: tile.code,
          title: tile.title,
          description: tile.description,
          href: tile.href,
          span: "col-span-12 md:col-span-4",
        }))}
      />

      {/* SEO / depth — framed as optional deeper reading */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: WARM }}
        aria-labelledby="planning-education-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <p
              className="font-semibold uppercase tracking-[0.16em]"
              style={{ fontSize: "0.75rem", color: TEAL }}
            >
              When you want more depth
            </p>
            <h2
              id="planning-education-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Structures and reading that matter before you stop working.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Optional next reading — not required to start the Blueprint or book a call.
            </p>
          </HubReveal>

          {EDUCATION_CARDS.map((card, index) => (
            <HubReveal key={card.title} delay={index * 0.04} className={card.span}>
              <EducationCard {...card} />
            </HubReveal>
          ))}
        </div>
      </section>

      {/* Trust closer → lead */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-800 py-16 md:py-24"
        style={{ backgroundColor: INK }}
        aria-labelledby="planning-trust-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                Independent advice · Krugersdorp
              </p>
              <h2
                id="planning-trust-heading"
                className="mt-4 font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
              >
                Your retirement is too important for guesswork or institutional quotas.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
                AS Brokers CC is an independent Category 1.8 FSP (17273) with over 25 years helping
                West Rand families build plans that serve their goals — not a single product house.
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
                  className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/5"
                >
                  About AS Brokers
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <dl className="space-y-5 border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                {[
                  { dt: "Authorisation", dd: "FSCA FSP 17273 · Category 1.8" },
                  { dt: "Experience", dd: "Serving clients since 1998" },
                  { dt: "Location", dd: "Krugersdorp, West Rand, Gauteng" },
                  { dt: "Approach", dd: "Fiduciary, advice-led, not call-centre sales" },
                ].map((row) => (
                  <div key={row.dt} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      {row.dt}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-white">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/retirement-planning")} />
      <Footer />
    </>
  );
}
