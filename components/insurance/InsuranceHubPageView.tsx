"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, LineChart, ShieldCheck } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

const TEAL = "#008080";
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#2B2B2E";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8`;

const HERO_IMAGE = "/images/home4-goal-insure-16x9.png";

const CALC_AVERAGE_CLAUSE = "/embed-calculators/asset-015-average-clause.html";

const PROTECTION_BLOCKS = [
  {
    title: "My Family's Health & Lifestyle",
    description: "Medical Aid, Gap Cover, and Vitality integration.",
    href: "/solutions/medical-aid",
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
  },
  {
    title: "My Life & Income",
    description: "Life Cover, Disability, and Severe Illness protection.",
    href: "/solutions/life-insurance",
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
  },
  {
    title: "My Business & Partners",
    description: "Buy & Sell agreements, Key Person cover, and Commercial risks.",
    href: "/solutions/business-life",
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
  },
  {
    title: "My Short-Term Assets",
    description: "Premium cover for vehicles, homes, and high-value possessions.",
    href: "/solutions/personal-insurance",
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
  },
];

const RISK_CALCULATORS = [
  {
    staffLabel: "ASSET 015",
    title: "Average Clause Calculator",
    description:
      "See how underinsurance can decimate a commercial or home claim when the average clause applies.",
    href: CALC_AVERAGE_CLAUSE,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-7",
  },
  {
    staffLabel: "Premium Liability Test",
    title: "Escalating vs level premiums",
    description:
      "Compare escalating and level premiums over time so you see the trap of expiring guarantees.",
    href: "/premium-increase-calculator",
    accent: "blue" as const,
    span: "col-span-12 lg:col-span-5",
  },
  {
    staffLabel: "Business Risk Review™",
    title: "Gap analysis for business owners",
    description:
      "Structured review of commercial, life, and continuity risks — not a generic quote form.",
    href: "/business-risk-review",
    accent: "teal" as const,
    span: "col-span-12",
  },
];

const PARTNERS = ["Santam", "Old Mutual", "Bryte"];
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

function ProtectionCard({
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
        <ShieldCheck className="h-5 w-5" aria-hidden />
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
        Explore protection
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
          aria-hidden
        />
      </span>
    </Link>
  );
}

function RiskCalculatorTile({
  staffLabel,
  title,
  description,
  href,
  accent,
}: (typeof RISK_CALCULATORS)[number]) {
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
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function InsuranceHubPageView() {
  return (
    <>
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40" style={{ backgroundColor: CANVAS }}>
        <div className={`${GRID} gap-y-8 lg:items-center`}>
          <Reveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Insurance · Risk Architecture · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 3rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Wealth protection and fiduciary defense.
            </h1>
            <p
              className="mt-5 max-w-lg leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              From your health to your business, we structure independent insurance to protect exactly
              what you&apos;ve built.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{
                fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Request a Risk Audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Confident South African business owner and family with secure asset protection"
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
        aria-labelledby="insurance-protect-heading"
      >
        <div className={GRID}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2
              id="insurance-protect-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              What do you need to protect?
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Start with your life event, not a product catalogue. Choose the area that matches your
              situation and we will guide you from education to advice.
            </p>
          </Reveal>

          {PROTECTION_BLOCKS.map((block, index) => (
            <Reveal key={block.href} delay={0.04 + index * 0.04} className={block.span}>
              <ProtectionCard
                title={block.title}
                description={block.description}
                href={block.href}
                accent={block.accent}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="border-y border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="insurance-risk-heading"
      >
        <div className={GRID}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2
              id="insurance-risk-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Test your current risk exposure.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative tools only — not quotes or personalised advice. Use them to spot gaps before
              a fiduciary conversation.
            </p>
          </Reveal>

          {RISK_CALCULATORS.map((tile, index) => (
            <Reveal key={tile.href} delay={0.04 + index * 0.04} className={tile.span}>
              <RiskCalculatorTile {...tile} />
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="insurance-trust-heading"
      >
        <Reveal>
          <div
            className={`${HOME4_WRAP} rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10`}
          >
            <h2
              id="insurance-trust-heading"
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
            >
              We work for you, not the insurer.
            </h2>
            <p
              className="mt-4 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
            >
              As an independent Category 1.8 FSP, we review the entire market to engineer a risk
              architecture that actually pays out when you need it most. No call centres, just dedicated
              fiduciary experts.
            </p>

            <div className="mt-8 border-t border-stone-200/80 pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600">
                Recognised partners
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                {PARTNERS.map((partner, index) => (
                  <span key={partner} className="flex items-center gap-x-6">
                    <span
                      className="font-semibold"
                      style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: INK }}
                    >
                      {partner}
                    </span>
                    {index < PARTNERS.length - 1 ? (
                      <span className="hidden h-4 w-px bg-stone-300 sm:block" aria-hidden />
                    ) : null}
                  </span>
                ))}
              </div>
            </div>

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
              Request a Risk Audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
