"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, Briefcase } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

const TEAL = "#008080";
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#2B2B2E";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8`;

const HERO_IMAGE = "/images/home4-why-independence-4x3.jpg";

const FOUNDERS = [
  {
    id: "person-albert-schuurman",
    name: "Albert Schuurman",
    role: "Co-founder & Key Individual",
    focus: "Retirement engineering, Everest Wealth, and living annuities.",
    initials: "AS",
  },
  {
    id: "person-johnny-farinha",
    name: "Johnny Farinha",
    role: "Co-founder",
    focus: "Estate structuring, business continuity, and personal life risk.",
    initials: "JF",
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

function FounderCard({
  id,
  name,
  role,
  focus,
  initials,
}: (typeof FOUNDERS)[number]) {
  return (
    <article
      id={id}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-stone-200/90 sm:flex-row"
    >
      <div
        className="flex aspect-square w-full shrink-0 items-center justify-center sm:w-44 md:w-48"
        style={{ backgroundColor: `${TEAL}14` }}
        aria-hidden
      >
        <span
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 2.75rem)", color: TEAL }}
        >
          {initials}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
        >
          {name}
        </h3>
        <p
          className="mt-1 font-semibold uppercase tracking-wide"
          style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.2vw, 0.75rem)", color: TEAL }}
        >
          {role}
        </p>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
        >
          {focus}
        </p>
      </div>
    </article>
  );
}

function IndependenceBlock({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: "teal" | "blue";
}) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 sm:p-7"
      style={{ borderLeft: `4px solid ${border}` }}
    >
      <h2
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.45vw, 1.4375rem)", color: INK }}
      >
        {title}
      </h2>
      <p
        className="mt-3 leading-relaxed"
        style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
    </article>
  );
}

export function AboutPageView() {
  return (
    <>
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40" style={{ backgroundColor: CANVAS }}>
        <div className={`${GRID} gap-y-8 lg:items-center`}>
          <Reveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              About AS Brokers · FSP 17273
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
              As an{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                independent financial advisor in Krugersdorp
              </strong>
              , we have spent over 25 years helping South Africans secure their retirement and protect
              their businesses.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "AS Brokers Krugersdorp office and independent financial advisers")}
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
        aria-labelledby="about-independence-heading"
      >
        <div className={GRID}>
          <Reveal className="col-span-12 lg:col-span-8">
            <h2
              id="about-independence-heading"
              className="sr-only"
            >
              The independence advantage
            </h2>
            <p
              className="max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Category 1.8 is regulatory language. For you, it means broader choice, clearer duty of care,
              and access to solutions many tied advisers cannot offer.
            </p>
          </Reveal>

          <Reveal delay={0.04} className="col-span-12 lg:col-span-7">
            <IndependenceBlock
              title="We work for you, not the product providers."
              description="Because we are fully independent, we survey the entire market to build a bespoke risk and wealth architecture that serves your goals, free from institutional quotas."
              accent="teal"
            />
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-5">
            <IndependenceBlock
              title="Access investments many advisers cannot offer."
              description="Our FSCA Category 1.8 license allows us to advise on and distribute exclusive structured returns and private market opportunities, such as Everest Wealth."
              accent="blue"
            />
          </Reveal>
        </div>
      </section>

      <section
        className="border-y border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="about-team-heading"
      >
        <div className={`${HOME4_WRAP} space-y-6`}>
          <Reveal>
            <h2
              id="about-team-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Meet the fiduciaries
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Two co-founders lead advice. A specialist team handles commercial underwriting, medical aid,
              and claims behind the scenes.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {FOUNDERS.map((founder, index) => (
              <Reveal key={founder.id} delay={0.04 + index * 0.04}>
                <FounderCard {...founder} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p
              className="max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
            >
              Our dedicated specialists —{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Petro Vermeulen
              </strong>{" "}
              (commercial underwriting),{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Monique Schuurman
              </strong>{" "}
              (personal short-term & renewals),{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Sharine van Vollenstee
              </strong>{" "}
              (medical aid & life onboarding), and{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Shanel van Niekerk
              </strong>{" "}
              (claims) — ensure every policy and claim receives expert attention.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="about-education-heading"
      >
        <Reveal>
          <div
            className={`${HOME4_WRAP} rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10`}
          >
            <div className="max-w-2xl">
              <Briefcase className="h-8 w-8 text-cinematic-teal/80" aria-hidden />
              <h2
                id="about-education-heading"
                className="mt-4 font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.1rem + 0.9vw, 1.875rem)", color: INK }}
              >
                Education before advice.
              </h2>
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
              >
                We believe you should never invest in something you don&apos;t fully understand. That is why
                we built South Africa&apos;s most comprehensive free library of fiduciary calculators and
                retirement guides.
              </p>
            </div>
            <Link
              href="/calculators"
              prefetch={false}
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3.5 font-semibold text-shark ring-1 ring-stone-200 transition-colors duration-500 hover:bg-stone-200 lg:mt-0"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Explore our Calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      <section
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="about-cta-heading"
      >
        <Reveal>
          <article
            className={`${HOME4_WRAP} rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10`}
          >
            <div className="flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 ring-1 ring-stone-200/90"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h2
              id="about-cta-heading"
              className="mt-6 max-w-2xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
            >
              Let&apos;s look at the math together.
            </h2>
            <p
              className="mt-4 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Book a consultation with an independent adviser in Krugersdorp. We will review your retirement,
              risk, and legacy goals without pressure or jargon.
            </p>

            <Link
              href="/contact"
              prefetch={false}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-lg shadow-samsung-blue/25 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
              style={{
                fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              }}
            >
              Book an Actuarial Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <p
              className="mt-6 text-sm leading-relaxed text-stone-600"
            >
              AS Brokers CC · FSP 17273 · Krugersdorp, West Rand, Gauteng · Est. 1998
            </p>
          </article>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
