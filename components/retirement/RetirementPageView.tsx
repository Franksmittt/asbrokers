"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, FileText, LineChart, MessageCircle } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

const TEAL = "#008080";
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#2B2B2E";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-8`;

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: EASE_SMOOTH, delay }}
    >
      {children}
    </motion.div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white sm:h-11 sm:w-11"
      style={{ backgroundColor: TEAL }}
      aria-hidden
    >
      {n}
    </span>
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
      className="group flex h-full flex-col rounded-[1.25rem] bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,128,128,0.1)] sm:p-7"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
    >
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
      <span
        className="mt-5 inline-flex items-center gap-2 font-semibold"
        style={{ color: border, fontSize: "clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)" }}
      >
        Open calculator
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
          aria-hidden
        />
      </span>
    </Link>
  );
}

function PathwayCard({
  title,
  description,
  links,
  accent,
}: {
  title: string;
  description: string;
  links: { label: string; href: string }[];
  accent: "teal" | "blue";
}) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <article
      className="flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-[0_8px_32px_rgba(29,29,31,0.06)] ring-1 ring-stone-200/90 sm:p-8"
      style={{ borderLeft: `4px solid ${border}` }}
    >
      <h3
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
      >
        {title}
      </h3>
      <p
        className="mt-3 leading-relaxed"
        style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
      <ul className="mt-6 space-y-3">
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

export function RetirementPageView() {
  return (
    <>
      {/* Hero — side-by-side, no column overlap */}
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40" style={{ backgroundColor: CANVAS }}>
        <div className={`${GRID} gap-y-10 lg:items-center lg:gap-y-8`}>
          <Reveal className="col-span-12 lg:col-span-5">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Retirement · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 3rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Retirement planning, engineered for peace of mind.
            </h1>
            <p
              className="mt-5 max-w-md leading-relaxed"
              style={{
                fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              Whether you are years away or already retired, discover exactly where you stand and how
              to make your capital last.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[16/9] lg:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "Relaxed South African retiree couple enjoying retirement")}
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-warm-canvas/20"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-shark/25 via-transparent to-transparent lg:hidden"
                aria-hidden
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* Pathways — header + two cards on one row */}
      <section
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="retirement-pathways-heading"
      >
        <div className={`${GRID} gap-y-8`}>
          <Reveal className="col-span-12">
            <h2
              id="retirement-pathways-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Where are you in your journey?
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Choose the path that matches your stage. We will point you to the right tools first.
            </p>
          </Reveal>

          <Reveal delay={0.04} className="col-span-12 lg:col-span-6">
            <PathwayCard
              title="I'm planning for retirement."
              description="I want to know if I'm saving enough and when I can afford to stop working."
              links={[
                { label: "Retirement Growth Calculator", href: CALC_GROWTH },
                { label: "Personal Goal Growth Calculator", href: CALC_GOAL },
                { label: "Retirement insights & guides", href: "/insights" },
              ]}
              accent="teal"
            />
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-6">
            <PathwayCard
              title="I'm already retired."
              description="I need a sustainable income strategy so my money doesn't run out."
              links={[
                { label: "Everest Amethyst Living Annuity", href: "/everest-amethyst-living-annuity" },
                { label: "Life of Capital Calculator", href: CALC_LIFE_OF_CAPITAL },
                { label: "Retirement Survival Blueprint", href: "/retirement-survival-blueprint" },
              ]}
              accent="blue"
            />
          </Reveal>
        </div>
      </section>

      {/* Worry funnel — stacked steps, no dead columns */}
      <section
        className="border-y border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="retirement-worry-heading"
      >
        <div className={`${HOME4_WRAP} space-y-12 md:space-y-16`}>
          <Reveal>
            <h2
              id="retirement-worry-heading"
              className="max-w-2xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
            >
              I&apos;m worried I won&apos;t have enough money.
            </h2>
            <p
              className="mt-4 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              That concern is common, and it is solvable with clarity. Follow a calm path from
              learning to numbers to conversation.
            </p>
          </Reveal>

          {/* Step 1 */}
          <Reveal delay={0.03}>
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-2">
                <StepBadge n={1} />
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 shrink-0" style={{ color: TEAL }} aria-hidden />
                  <h3
                    className="font-bold"
                    style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: INK }}
                  >
                    Education
                  </h3>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
                >
                  Read retirement guides written for South Africans, not product brochures.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {EDUCATION_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className="group block h-full rounded-xl bg-white p-4 ring-1 ring-stone-200/90 transition-shadow duration-500 hover:shadow-md"
                        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
                      >
                        <span
                          className="font-semibold leading-snug"
                          style={{ color: INK, fontSize: "clamp(0.9375rem, 0.9rem + 0.1vw, 1rem)" }}
                        >
                          {item.label}
                        </span>
                        <p
                          className="mt-1.5 leading-relaxed"
                          style={{ color: BODY, fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
                        >
                          {item.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={0.06}>
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-2">
                <StepBadge n={2} />
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 shrink-0" style={{ color: TEAL }} aria-hidden />
                  <h3
                    className="font-bold"
                    style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: INK }}
                  >
                    Assessment
                  </h3>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="mb-5 leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
                >
                  Run your own numbers in plain language. Illustrative only, not personalised advice.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CalculatorEntryCard
                    title="Retirement Reality Check"
                    description="See whether your savings path supports the income you want in retirement."
                    href={CALC_REALITY}
                    accent="teal"
                  />
                  <CalculatorEntryCard
                    title="Life of Capital"
                    description="Model how long your capital may last with drawdowns and inflation."
                    href={CALC_LIFE_OF_CAPITAL}
                    accent="blue"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={0.09}>
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-2">
                <StepBadge n={3} />
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 shrink-0" style={{ color: TEAL }} aria-hidden />
                  <h3
                    className="font-bold"
                    style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: INK }}
                  >
                    Advice
                  </h3>
                </div>
              </div>
              <div
                className="min-w-0 flex-1 rounded-[1.25rem] bg-white p-6 ring-1 ring-stone-200/90 sm:p-8"
                style={{ borderTop: `3px solid ${TEAL}` }}
              >
                <p
                  className="max-w-2xl leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  When the numbers raise questions, an independent FSP 17273 adviser can help you
                  interpret them and explore suitable next steps, without pressure or jargon.
                </p>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                  style={{
                    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                  }}
                >
                  Book a consultation
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Amethyst — balanced 5 + 7 split, shorter image */}
      <section
        className="py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="retirement-amethyst-heading"
      >
        <div className={`${GRID} gap-y-10 lg:items-center lg:gap-y-8`}>
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={AMETHYST_IMAGE}
                alt={getAlt(AMETHYST_IMAGE, "Premium retirement lifestyle and travel")}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-7">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Everest Amethyst Living Annuity
            </p>
            <h2
              id="retirement-amethyst-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.1rem + 0.9vw, 1.875rem)", color: INK }}
            >
              Structured retirement income, without daily market noise.
            </h2>
            <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span
                className="font-bold tabular-nums tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)", lineHeight: 1, color: INK }}
                aria-label="Approximately 10.2 percent per annum"
              >
                ~10.2%
              </span>
              <span
                className="pb-1 font-semibold"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
              >
                p.a. targeted net yield profile
              </span>
            </div>
            <p
              className="mt-5 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              For pension, provident, preservation, and RA capital, Amethyst offers a regulated
              living-annuity wrapper with flexible drawdown between{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                2.5% and 17.5%
              </strong>
              , designed for retirees who want clarity on sustainable income.
            </p>
            <ul
              className="mt-5 space-y-2.5 leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)", color: BODY }}
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
              className="mt-6 inline-flex items-center gap-2 font-semibold"
              style={{ color: TEAL, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Explore Amethyst Living Annuity
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA — single row, no orphan column */}
      <section
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="retirement-cta-heading"
      >
        <Reveal>
          <div
            className={`${HOME4_WRAP} flex flex-col items-start gap-6 rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10`}
          >
            <div className="max-w-2xl">
              <h2
                id="retirement-cta-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
              >
                Stop guessing. Let&apos;s look at the math together.
              </h2>
              <p
                className="mt-3 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                Book a retirement clarity call with an independent adviser. FSP 17273 · Category 1.8.
              </p>
            </div>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-lg shadow-samsung-blue/25 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{
                fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Book a Retirement Clarity Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
