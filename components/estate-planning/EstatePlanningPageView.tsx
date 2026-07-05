"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, LineChart, Scroll } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

const TEAL = "#008080";
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#2B2B2E";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8`;

const HERO_IMAGE = "/images/home4-goal-estate-16x9.png";

const CALC_ESTATE_DUTY = "/embed-calculators/asset-007-estate-duty.html";
const CALC_ESTATE_REDUCTION = "/embed-calculators/asset-008-estate-reduction.html";

const OUTCOME_CARDS = [
  {
    title: "Wills & Trusts",
    description: "Structure your legacy to protect your dependents and ring-fence your assets.",
    href: "/legacy-readiness-checklist",
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
  },
  {
    title: "Estate Duty & Tax Planning",
    description: "Legally minimize SARS liabilities so your family inherits your wealth, not the taxman.",
    href: CALC_ESTATE_DUTY,
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
  },
  {
    title: "Business Succession",
    description: "Buy-and-sell agreements and continuity planning to ensure your life's work survives you.",
    href: "/solutions/business-life",
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
  },
  {
    title: "Executor & Liquidity Planning",
    description:
      "Ensure your estate has the immediate cash flow required to settle fees and avoid forced asset sales.",
    href: "/contact",
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
  },
];

const ESTATE_CALCULATORS = [
  {
    staffLabel: "ASSET 007",
    title: "Estate Duty & Executor Fee Calculator",
    description:
      "Expose the cost of dying — duty, executor fees, and liquidity stress before your family faces it.",
    href: CALC_ESTATE_DUTY,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-7",
  },
  {
    staffLabel: "ASSET 008",
    title: "Estate Reduction Strategy",
    description:
      "Model R100k and R200k annual donation strategies to reduce estate duty over time within SARS limits.",
    href: CALC_ESTATE_REDUCTION,
    accent: "blue" as const,
    span: "col-span-12 lg:col-span-5",
  },
];

const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

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

function OutcomeCard({
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
      className="group flex h-full min-h-[11rem] flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,128,128,0.1)] sm:p-7"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
    >
      <div
        className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${border}18`, color: border }}
      >
        <Scroll className="h-5 w-5" aria-hidden />
      </div>
      <h3
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.45vw, 1.4375rem)", color: INK }}
      >
        {title}
      </h3>
      <p
        className="mt-3 flex-1 leading-relaxed"
        style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
      <span
        className="mt-5 inline-flex items-center gap-2 font-semibold"
        style={{ color: border, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
      >
        Explore outcome
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
          aria-hidden
        />
      </span>
    </Link>
  );
}

function EstateCalculatorTile({
  staffLabel,
  title,
  description,
  href,
  accent,
}: (typeof ESTATE_CALCULATORS)[number]) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,128,128,0.1)] sm:p-7"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
    >
      <div
        className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${border}18`, color: border }}
      >
        <LineChart className="h-5 w-5" aria-hidden />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-600">{staffLabel}</p>
      <h3
        className="mt-1 font-bold tracking-tight"
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
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function EstatePlanningPageView() {
  return (
    <>
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40" style={{ backgroundColor: CANVAS }}>
        <div className={`${GRID} gap-y-8 lg:items-center`}>
          <Reveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Estate Planning · Legacy Structuring · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 3rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Protecting your legacy. Engineering your wealth.
            </h1>
            <p
              className="mt-5 max-w-lg leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              What happens to your family and wealth if you die tomorrow? Ensure your assets transfer
              seamlessly without unnecessary tax burdens or delays.
            </p>
            <Link
              href="/legacy-readiness-checklist"
              prefetch={false}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{
                fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Take the Legacy Readiness Checklist
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Multi-generational South African family planning their legacy together"
                )}
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </header>

      <section
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="estate-outcomes-heading"
      >
        <div className={GRID}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2
              id="estate-outcomes-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              What outcome are you planning for?
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Start with the result you want — not a product brochure. We coordinate the financial and
              risk architecture with your attorney who drafts binding legal instruments.
            </p>
          </Reveal>

          {OUTCOME_CARDS.map((card, index) => (
            <Reveal key={card.href} delay={0.04 + index * 0.04} className={card.span}>
              <OutcomeCard
                title={card.title}
                description={card.description}
                href={card.href}
                accent={card.accent}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="border-y border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="estate-exposure-heading"
      >
        <div className={GRID}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2
              id="estate-exposure-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Quantify your estate&apos;s exposure.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative calculators only — not SARS assessments or legal advice. Use them to grasp
              scale, then involve qualified professionals for your specific facts.
            </p>
          </Reveal>

          {ESTATE_CALCULATORS.map((tile, index) => (
            <Reveal key={tile.href} delay={0.04 + index * 0.04} className={tile.span}>
              <EstateCalculatorTile {...tile} />
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="estate-trust-heading"
      >
        <Reveal>
          <article
            className={`${HOME4_WRAP} rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10`}
          >
            <h2
              id="estate-trust-heading"
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
            >
              Fiduciary structuring you can trust.
            </h2>
            <p
              className="mt-4 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
            >
              As an independent Category 1.8 FSP with over 25 years of experience, we engineer estate
              plans that serve your family, not institutional executors.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 ring-1 ring-stone-200/90"
                >
                  {badge}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-lg shadow-samsung-blue/25 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{
                fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Book an Estate Planning Review
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <p
              className="mt-8 max-w-3xl leading-relaxed text-stone-600"
              style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
            >
              AS Brokers does not draft wills or trust deeds and does not provide legal or tax advice on
              this website. Calculators and articles are educational. Verify current SARS position with
              qualified professionals.{" "}
              <Link href="/regulatory-compliance" prefetch={false} className="font-semibold text-cinematic-teal hover:text-teal-800">
                Disclosures
              </Link>
              .
            </p>
          </article>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
