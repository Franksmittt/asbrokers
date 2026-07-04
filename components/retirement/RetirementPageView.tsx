"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, FileText, LineChart, MessageCircle } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

/** Smooth reveal — not default ease-in-out */
const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;
/** Apple snappy — hover / micro-interactions */
const EASE_SNAPPY = [0.4, 0, 0.6, 1] as const;

const TEAL = "#008080";
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#2B2B2E";

const HERO_IMAGE = "/images/home4-goal-retire-16x9.png";
const AMETHYST_IMAGE = "/images/living-annuity-inset-1x1.jpg";

const CALC_REALITY = "/embed-calculators/asset-002-retirement-reality-check.html";
const CALC_LIFE_OF_CAPITAL = "/embed-calculators/asset-004-life-of-capital.html";
const CALC_GROWTH = "/embed-calculators/asset-001-retirement-growth.html";
const CALC_GOAL = "/embed-calculators/asset-017-personal-goal.html";

const EDUCATION_LINKS = [
  {
    label: "Browse retirement insights",
    description: "Plain-language articles on income, tax, and longevity.",
    href: "/insights",
  },
  {
    label: "Semigration & retirement villages",
    description: "Planning a coastal move or village lifestyle.",
    href: "/insights/semigration-retirement",
  },
  {
    label: "Healthy Retirement Blueprint",
    description: "A guided assessment of your retirement readiness.",
    href: "/healthy-retirement-blueprint",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.75, ease: EASE_SMOOTH, delay }}
    >
      {children}
    </motion.div>
  );
}

function FluidEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-semibold uppercase tracking-[0.22em]"
      style={{
        fontSize: "clamp(0.6875rem, 0.62rem + 0.28vw, 0.8125rem)",
        color: TEAL,
      }}
    >
      {children}
    </p>
  );
}

function CalculatorEntryCard({
  title,
  description,
  href,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  accent: "teal" | "blue";
}) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <Link
      href={href}
      prefetch={false}
      className="group block h-full rounded-[1.25rem] bg-white p-6 shadow-[0_12px_40px_rgba(29,29,31,0.08)] ring-2 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,128,128,0.12)] sm:p-8"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
    >
      <div
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${border}18`, color: border }}
      >
        <LineChart className="h-6 w-6" aria-hidden />
      </div>
      <h3
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)", color: INK }}
      >
        {title}
      </h3>
      <p
        className="mt-3 leading-relaxed"
        style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: BODY }}
      >
        {description}
      </p>
      <span
        className="mt-6 inline-flex items-center gap-2 font-semibold"
        style={{ color: border, fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1rem)" }}
      >
        Open calculator
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function RetirementPageView() {
  return (
    <>
      {/* 1 · Asymmetrical hero — 12-column, no full-bleed template grid */}
      <header className="pt-28 md:pt-36 lg:pt-40" style={{ backgroundColor: CANVAS }}>
        <div className={`${HOME4_WRAP} grid grid-cols-12 items-end gap-x-6 gap-y-10 lg:gap-x-8`}>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pb-16">
            <FluidEyebrow>Retirement · FSP 17273 · Independent advice</FluidEyebrow>
            <h1
              className="mt-5 max-w-xl font-bold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 1.35rem + 2.8vw, 3.35rem)",
                lineHeight: 1.08,
                color: INK,
              }}
            >
              Retirement planning, engineered for peace of mind.
            </h1>
            <p
              className="mt-6 max-w-lg leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 0.98rem + 0.35vw, 1.3125rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              Whether you are years away or already retired, discover exactly where you stand and how
              to make your capital last.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-8 lg:col-start-5 lg:row-start-1">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-[0_24px_64px_rgba(29,29,31,0.14)] ring-1 ring-stone-300/80 sm:aspect-[16/9]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "Relaxed South African retiree couple enjoying retirement")}
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(115deg, ${TEAL}99 0%, ${TEAL}55 42%, transparent 72%)`,
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-shark/35 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* 2 · Audience self-segmentation */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="retirement-pathways-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-8`}>
          <div className="col-span-12 lg:col-span-4 lg:col-start-1">
            <Reveal>
              <h2
                id="retirement-pathways-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)", color: INK }}
              >
                Where are you in your journey?
              </h2>
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: BODY }}
              >
                Choose the path that matches your stage. We will point you to the right tools first.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.05} className="col-span-12 lg:col-span-7 lg:col-start-1">
            <article
              className="h-full rounded-[1.75rem] bg-white p-8 shadow-[0_16px_48px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 sm:p-10"
              style={{ borderLeft: `4px solid ${TEAL}` }}
            >
              <h3
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", color: INK }}
              >
                I&apos;m planning for retirement.
              </h3>
              <p
                className="mt-4 max-w-2xl leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: BODY }}
              >
                I want to know if I&apos;m saving enough and when I can afford to stop working.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { label: "Retirement Growth Calculator", href: CALC_GROWTH },
                  { label: "Personal Goal Growth Calculator", href: CALC_GOAL },
                  { label: "Retirement insights & guides", href: "/insights" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="group inline-flex items-center gap-2 font-semibold"
                      style={{ color: TEAL, fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
                    >
                      {link.label}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-2">
            <article
              className="h-full rounded-[1.75rem] bg-white p-8 shadow-[0_16px_48px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 sm:p-10"
              style={{ borderLeft: "4px solid #0057B8" }}
            >
              <h3
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", color: INK }}
              >
                I&apos;m already retired.
              </h3>
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: BODY }}
              >
                I need a sustainable income strategy so my money doesn&apos;t run out.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { label: "Everest Amethyst Living Annuity", href: "/everest-amethyst-living-annuity" },
                  { label: "Life of Capital Calculator", href: CALC_LIFE_OF_CAPITAL },
                  { label: "Retirement Survival Blueprint", href: "/retirement-survival-blueprint" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="group inline-flex items-center gap-2 font-semibold"
                      style={{ color: "#0057B8", fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
                    >
                      {link.label}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* 3 · Worry funnel — Question → Education → Calculator → Advice */}
      <section
        className="border-y border-stone-300/70 py-16 md:py-24"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="retirement-worry-heading"
      >
        <div className={`${HOME4_WRAP}`}>
          <Reveal>
            <h2
              id="retirement-worry-heading"
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.625rem, 1.25rem + 1.5vw, 2.5rem)", color: INK }}
            >
              I&apos;m worried I won&apos;t have enough money.
            </h2>
            <p
              className="mt-5 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: BODY }}
            >
              That concern is common, and it is solvable with clarity. Follow a calm path from learning
              to numbers to conversation.
            </p>
          </Reveal>

          {/* Step 1 · Education — asymmetric 8 + 4 with intentional whitespace */}
          <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-8">
            <Reveal className="col-span-12 lg:col-span-8">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white"
                  style={{ backgroundColor: TEAL, fontSize: "1.125rem" }}
                  aria-hidden
                >
                  1
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" style={{ color: TEAL }} aria-hidden />
                    <h3
                      className="font-bold"
                      style={{ fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)", color: INK }}
                    >
                      Education
                    </h3>
                  </div>
                  <p
                    className="mt-2 leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: BODY }}
                  >
                    Read retirement guides written for South Africans, not product brochures.
                  </p>
                  <ul className="mt-6 space-y-4">
                    {EDUCATION_LINKS.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} prefetch={false} className="group block rounded-xl p-4 ring-1 ring-stone-200/90 bg-white transition-shadow duration-500 hover:shadow-md" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}>
                          <span className="font-semibold" style={{ color: INK, fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}>
                            {item.label}
                          </span>
                          <p className="mt-1 leading-relaxed" style={{ color: BODY, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}>
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            <div className="hidden lg:col-span-4 lg:block" aria-hidden />
          </div>

          {/* Step 2 · Assessment — 7 + 5 asymmetric calculator cards */}
          <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-20 lg:gap-x-8">
            <Reveal delay={0.05} className="col-span-12 lg:col-span-4 lg:col-start-1">
              <div className="flex items-start gap-4 lg:sticky lg:top-28">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white"
                  style={{ backgroundColor: TEAL, fontSize: "1.125rem" }}
                  aria-hidden
                >
                  2
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" style={{ color: TEAL }} aria-hidden />
                    <h3
                      className="font-bold"
                      style={{ fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)", color: INK }}
                    >
                      Assessment
                    </h3>
                  </div>
                  <p
                    className="mt-2 leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: BODY }}
                  >
                    Run your own numbers in plain language. Illustrative only, not personalised advice.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="col-span-12 lg:col-span-7 lg:col-start-6">
              <CalculatorEntryCard
                title="Retirement Reality Check"
                description="See whether your current savings path supports the income you want in retirement."
                href={CALC_REALITY}
                accent="teal"
              />
            </Reveal>
            <Reveal delay={0.12} className="col-span-12 lg:col-span-5 lg:col-start-7 lg:row-start-2">
              <CalculatorEntryCard
                title="Life of Capital"
                description="Model how long your retirement capital may last with drawdowns and inflation."
                href={CALC_LIFE_OF_CAPITAL}
                accent="blue"
              />
            </Reveal>
          </div>

          {/* Step 3 · Advice */}
          <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-20 lg:gap-x-8">
            <Reveal delay={0.1} className="col-span-12 lg:col-span-7">
              <div className="flex h-full flex-col rounded-[1.75rem] bg-white p-8 ring-2 ring-stone-200/90 sm:p-10" style={{ borderTop: `4px solid ${TEAL}` }}>
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white"
                    style={{ backgroundColor: TEAL, fontSize: "1.125rem" }}
                    aria-hidden
                  >
                    3
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" style={{ color: TEAL }} aria-hidden />
                      <h3
                        className="font-bold"
                        style={{ fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)", color: INK }}
                      >
                        Advice
                      </h3>
                    </div>
                    <p
                      className="mt-3 max-w-xl leading-relaxed"
                      style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: BODY }}
                    >
                      When the numbers raise questions, an independent FSP 17273 adviser can help you
                      interpret them and explore suitable next steps, without pressure or jargon.
                    </p>
                    <Link
                      href="/contact"
                      prefetch={false}
                      className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-7 py-4 font-semibold text-white shadow-md shadow-samsung-blue/25 transition-[background-color,box-shadow,transform] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue active:scale-[0.98]"
                      style={{
                        fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1rem)",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                      }}
                    >
                      Book a consultation
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="hidden lg:col-span-5 lg:block" aria-hidden />
          </div>
        </div>
      </section>

      {/* 4 · Amethyst solution — half image, half content */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="retirement-amethyst-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-10 lg:items-center lg:gap-x-10`}>
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_24px_64px_rgba(29,29,31,0.12)] ring-1 ring-stone-300/80 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src={AMETHYST_IMAGE}
                alt={getAlt(AMETHYST_IMAGE, "Premium retirement lifestyle and travel")}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-shark/50 via-transparent to-teal-900/20"
                aria-hidden
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <FluidEyebrow>Everest Amethyst Living Annuity</FluidEyebrow>
            <h2
              id="retirement-amethyst-heading"
              className="mt-4 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.15rem + 1.4vw, 2.25rem)", color: INK }}
            >
              Structured retirement income, without daily market noise.
            </h2>
            <p
              className="mt-2 font-semibold"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: TEAL }}
            >
              Target net yield profile
            </p>
            <p
              className="mt-1 font-bold tabular-nums tracking-tight"
              style={{ fontSize: "clamp(2.75rem, 2rem + 4.5vw, 4.75rem)", lineHeight: 1, color: INK }}
              aria-label="Approximately 10.2 percent per annum"
            >
              ~10.2%
              <span
                className="ml-2 font-semibold"
                style={{ fontSize: "clamp(1.125rem, 1rem + 0.4vw, 1.5rem)", color: BODY }}
              >
                p.a.
              </span>
            </p>
            <p
              className="mt-6 leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: BODY }}
            >
              For pension, provident, preservation, and RA capital, Amethyst offers a regulated
              living-annuity wrapper with flexible drawdown between{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                2.5% and 17.5%
              </strong>
              , designed for retirees who want clarity on sustainable income.
            </p>
            <ul
              className="mt-6 space-y-3 leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
            >
              <li>
                <strong className="font-semibold" style={{ color: INK }}>
                  SARS 2026/27:
                </strong>{" "}
                Tax treatment depends on your age, income, and product structure. Illustrations use
                current tables for planning purposes only.
              </li>
              <li>
                <strong className="font-semibold" style={{ color: INK }}>
                  Section 14 transfer:
                </strong>{" "}
                Pension, provident, preservation, and RA capital may be transferred into a living
                annuity subject to fund rules and adviser suitability assessment.
              </li>
            </ul>
            <Link
              href="/everest-amethyst-living-annuity"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 font-semibold"
              style={{ color: TEAL, fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
            >
              Explore Amethyst Living Annuity
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5 · Empathic conversion footer — high contrast on warm canvas */}
      <section
        className="border-t border-stone-300/70 py-16 md:py-24"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="retirement-cta-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-x-6 lg:gap-x-8`}>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-1">
            <h2
              id="retirement-cta-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.6vw, 2.75rem)", color: INK }}
            >
              Stop guessing. Let&apos;s look at the math together.
            </h2>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: BODY }}
            >
              Book a retirement clarity call with an independent adviser. Personal, structured, and
              focused on your goals. FSP 17273 · Category 1.8.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="col-span-12 flex items-center lg:col-span-4 lg:col-start-9">
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-8 py-4 font-semibold text-white shadow-lg shadow-samsung-blue/30 transition-[background-color,box-shadow,transform] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue active:scale-[0.98] sm:w-auto"
              style={{
                fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Book a Retirement Clarity Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
