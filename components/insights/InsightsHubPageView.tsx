"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { Footer } from "@/components/Footer";
import { InsightsFeedFilter } from "@/components/insights/InsightsFeedFilter";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import type { InsightFeedItem } from "@/lib/insights/feed";
import type { InsightCategoryValue } from "@/lib/insights/insightCategories";
import { getAlt } from "@/lib/image-alt";

const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

const TEAL = "#008080";
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#2B2B2E";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8`;

const HERO_IMAGE = "/images/home4-why-independence-4x3.jpg";

const FEATURED = {
  title: "Semigration & Retirement Villages Western Cape",
  description:
    "A flagship guide for high-net-worth families relocating from Gauteng to the coast — retirement capital, village living, and estate planning in one place.",
  href: "/insights/semigration-retirement",
  image: "/images/home4-goal-estate-16x9.png",
};

export const INSIGHTS_TOPIC_NAV = [
  {
    id: "retirement",
    label: "Retirement Guides",
    categories: ["retirement_planning", "financial_freedom"] as InsightCategoryValue[],
  },
  {
    id: "investments",
    label: "Investment Strategies",
    categories: ["investments"] as InsightCategoryValue[],
  },
  {
    id: "insurance",
    label: "Insurance & Risk",
    categories: [
      "short_term_business",
      "short_term_personal",
      "life_insurance_business",
      "life_insurance_personal",
      "medical_aid",
      "health_wellness",
    ] as InsightCategoryValue[],
  },
  {
    id: "estate",
    label: "Estate Planning",
    categories: ["estate_planning", "last_will_testament", "trust_structure"] as InsightCategoryValue[],
  },
  {
    id: "calculators",
    label: "Interactive Calculators",
    href: "/calculators",
  },
] as const;

const initialNewsletterState: NewsletterActionState = { success: false };

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

function InsightsNewsletterSignup() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-7">
      <h3
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
      >
        Stay ahead of your financial future.
      </h3>
      <p
        className="mt-3 leading-relaxed"
        style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
      >
        Occasional fiduciary insights on retirement, estate duty, and wealth — no spam.
      </p>
      <form action={formAction} className="relative mt-5">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={isPending}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-4 pr-12 text-sm text-shark placeholder:text-stone-500 transition-colors focus:border-cinematic-teal/50 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/20 disabled:opacity-60"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-samsung-blue text-white transition-all duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue disabled:opacity-60"
          aria-label={isPending ? "Subscribing" : "Subscribe to newsletter"}
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>
      {state.message ? (
        <p
          className={`mt-2 text-sm ${state.success ? "text-cinematic-teal" : "text-amber-700"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

type Props = {
  articles: InsightFeedItem[];
};

export function InsightsHubPageView({ articles }: Props) {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const handleTopicSelect = useCallback((topicId: string) => {
    setActiveTopicId((prev) => (prev === topicId ? null : topicId));
    document.getElementById("latest")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40" style={{ backgroundColor: CANVAS }}>
        <div className={`${GRID} gap-y-8 lg:items-center`}>
          <Reveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Learn · Insights · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 3rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Financial Education & Fiduciary Insights.
            </h1>
            <p
              className="mt-5 max-w-lg leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              Master your financial future with our library of retirement guides, investment strategies,
              and fiduciary research.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Professional financial education library and study environment"
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
        className="border-t border-stone-200/80 py-8 md:py-10"
        style={{ backgroundColor: CANVAS }}
        aria-label="Insight topics"
      >
        <div className={`${HOME4_WRAP} flex flex-wrap gap-2 sm:gap-3`}>
          {INSIGHTS_TOPIC_NAV.map((topic) =>
            "href" in topic && topic.href ? (
              <Link
                key={topic.id}
                href={topic.href}
                prefetch={false}
                className="rounded-full bg-white px-4 py-2.5 font-semibold text-shark shadow-sm ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-md sm:px-5"
                style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
              >
                {topic.label}
              </Link>
            ) : (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicSelect(topic.id)}
                className={`rounded-full px-4 py-2.5 font-semibold shadow-sm ring-1 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-md sm:px-5 ${
                  activeTopicId === topic.id
                    ? "bg-cinematic-teal/15 text-cinematic-teal ring-cinematic-teal/30"
                    : "bg-white text-shark ring-stone-200/90"
                }`}
                style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
              >
                {topic.label}
              </button>
            )
          )}
        </div>
      </section>

      <section
        className="border-y border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="insights-featured-heading"
      >
        <div className={GRID}>
          <Reveal className="col-span-12 lg:col-span-8">
            <Link
              href={FEATURED.href}
              prefetch={false}
              className="group block overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200/90"
            >
              <div className="relative aspect-[16/10] w-full bg-stone-100 sm:aspect-[2/1]">
                <Image
                  src={FEATURED.image}
                  alt={getAlt(FEATURED.image, FEATURED.title)}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 flex lg:col-span-4">
            <article className="flex h-full flex-col justify-center rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8">
              <p
                className="font-semibold uppercase tracking-[0.16em]"
                style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
              >
                Featured authority piece
              </p>
              <h2
                id="insights-featured-heading"
                className="mt-3 font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", color: INK }}
              >
                {FEATURED.title}
              </h2>
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
              >
                {FEATURED.description}
              </p>
              <Link
                href={FEATURED.href}
                prefetch={false}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-samsung-blue px-5 py-3 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
              >
                Read the full guide
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section
        id="latest"
        className="py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="insights-latest-heading"
      >
        <div className={HOME4_WRAP}>
          <Reveal>
            <h2
              id="insights-latest-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Latest from our fiduciaries
            </h2>
            <p
              className="mt-2 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Articles and guides from AS Brokers — educational only, not personalised advice.
            </p>
          </Reveal>

          <InsightsFeedFilter
            articles={articles}
            topicNav={INSIGHTS_TOPIC_NAV}
            activeTopicId={activeTopicId}
            onClearTopic={() => setActiveTopicId(null)}
          />
        </div>
      </section>

      <section
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-label="Calculators and newsletter"
      >
        <div className={`${GRID} lg:items-stretch`}>
          <Reveal className="col-span-12 lg:col-span-6">
            <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-7">
              <h3
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
              >
                Prefer to run the numbers yourself?
              </h3>
              <p
                className="mt-3 flex-1 leading-relaxed"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
              >
                Access our Fiduciary Calculator Library — ASSET tools for retirement, estate duty,
                insurance, and Everest Wealth scenarios.
              </p>
              <Link
                href="/calculators"
                prefetch={false}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3 font-semibold text-white shadow-md shadow-samsung-blue/20 transition-[background-color,box-shadow] duration-500 hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
              >
                View Calculators
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="col-span-12 lg:col-span-6">
            <InsightsNewsletterSignup />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
