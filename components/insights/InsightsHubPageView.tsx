"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useActionState, useCallback, useState } from "react";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import type { InsightFeedItem } from "@/lib/insights/feed";
import type { InsightCategoryValue } from "@/lib/insights/insightCategories";

const InsightsFeedFilter = dynamic(
  () => import("@/components/insights/InsightsFeedFilter").then((m) => m.InsightsFeedFilter),
  { loading: () => <p className="mt-8 text-sm text-stone-500">Loading articles…</p> }
);

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const TEAL = "#00A3A3";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const FAIS_DISCLAIMER =
  "Articles and guides on this page are educational only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Personalised advice requires a needs analysis with a licensed representative of FSP 17273.";

const FEATURED = {
  title: "Semigration & Retirement Villages Western Cape",
  description:
    "A flagship guide for high-net-worth families relocating from Gauteng to the coast: retirement capital, village living, and estate planning in one place.",
  href: "/insights/semigration-retirement",
};

export const INSIGHTS_TOPIC_NAV = [
  {
    id: "retirement",
    label: "Retirement",
    categories: ["retirement_planning", "financial_freedom"] as InsightCategoryValue[],
  },
  {
    id: "investments",
    label: "Investments",
    categories: ["investments"] as InsightCategoryValue[],
  },
  {
    id: "insurance",
    label: "Insurance",
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
    label: "Estate",
    categories: ["estate_planning", "last_will_testament", "trust_structure"] as InsightCategoryValue[],
  },
  {
    id: "calculators",
    label: "Calculators",
    href: "/calculators",
  },
] as const;

const CALC_HANDOFFS = [
  { label: "Retirement reality check", href: "/calculators/asset-002-retirement-reality-check" },
  { label: "Estate duty & executor fees", href: "/calculators/asset-007-estate-duty" },
  { label: "Average clause underinsurance", href: "/calculators/asset-015-average-clause" },
  { label: "Full calculator library", href: "/calculators" },
] as const;

const initialNewsletterState: NewsletterActionState = { success: false };

function InsightsNewsletterSignup() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);

  return (
    <div className="border bg-transparent p-6 sm:p-8" style={{ borderColor: HAIRLINE }}>
      <h3 className="font-serif text-xl font-semibold tracking-tight text-shark">
        Fiduciary newsletter
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        Occasional insights on retirement, estate duty, and wealth engineering. No spam.
      </p>
      <form action={formAction} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={isPending}
          className="w-full flex-1 border border-stone-300 bg-white px-4 py-3 text-sm text-shark placeholder:text-stone-400 focus:border-cinematic-teal focus:outline-none focus:ring-1 focus:ring-cinematic-teal disabled:opacity-60"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded bg-cinematic-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:opacity-60"
          aria-label={isPending ? "Subscribing" : "Subscribe to newsletter"}
        >
          Subscribe
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>
      {state.message ? (
        <p
          className={`mt-3 text-sm ${state.success ? "text-cinematic-teal" : "text-amber-700"}`}
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
  faqs?: FAQItem[];
};

export function InsightsHubPageView({ articles, faqs = [] }: Props) {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const faqItems = ensureSixFaqs(faqs);

  const handleTopicSelect = useCallback((topicId: string) => {
    setActiveTopicId((prev) => (prev === topicId ? null : topicId));
    document.getElementById("latest")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-10 pt-28 md:pb-12 md:pt-36 lg:pt-40">
        <div className={HOME4_WRAP}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
            Learn · Insights · FSP 17273
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            Fiduciary insights &amp; financial education
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Financial intuition fails against South African legislation, Two-Pot, estate duty, gap
            demarcation, tax drag. Read fiduciary analyses first; arrive at advice already educated.
            Articles are not personalised advice.
          </p>
        </div>
      </header>

      <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 pb-16 lg:gap-14 lg:pb-24`}>
        <aside className="col-span-12 lg:col-span-3">
          <nav
            aria-label="Library topics"
            className="border-t pt-6 lg:sticky lg:top-28 lg:border-t-0 lg:pt-0"
            style={{ borderColor: HAIRLINE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Topics</p>
            <ul className="mt-4 space-y-3">
              {INSIGHTS_TOPIC_NAV.map((topic) =>
                "href" in topic && topic.href ? (
                  <li key={topic.id}>
                    <Link
                      href={topic.href}
                      prefetch={false}
                      className="text-sm font-medium text-stone-700 transition hover:text-cinematic-teal"
                    >
                      {topic.label}
                    </Link>
                  </li>
                ) : (
                  <li key={topic.id}>
                    <button
                      type="button"
                      onClick={() => handleTopicSelect(topic.id)}
                      aria-current={activeTopicId === topic.id ? "page" : undefined}
                      className={`text-left text-sm font-medium transition hover:text-cinematic-teal ${
                        activeTopicId === topic.id ? "text-cinematic-teal" : "text-stone-700"
                      }`}
                    >
                      {topic.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>

        <div className="col-span-12 lg:col-span-9">
          <section aria-labelledby="insights-featured-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Featured research
            </p>
            <h2
              id="insights-featured-heading"
              className="mt-3 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              {FEATURED.title}
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              {FEATURED.description}
            </p>
            <Link
              href={FEATURED.href}
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
            >
              Read the full guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>

          <section id="latest" className="mt-16 scroll-mt-28" aria-labelledby="insights-latest-heading">
            <h2
              id="insights-latest-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Latest financial intelligence
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
              Chronological archive. Educational only, not personalised advice.
            </p>
            <InsightsFeedFilter
              articles={articles}
              topicNav={INSIGHTS_TOPIC_NAV}
              activeTopicId={activeTopicId}
              onClearTopic={() => setActiveTopicId(null)}
              variant="editorial"
            />
          </section>

          <section className="mt-16" aria-labelledby="newsletter-heading">
            <h2 id="newsletter-heading" className="sr-only">
              Newsletter
            </h2>
            <InsightsNewsletterSignup />
          </section>

          <section className="mt-16" aria-labelledby="calc-handoff-heading">
            <h2
              id="calc-handoff-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
            >
              Fiduciary calculators &amp; diagnostic tools
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
              Interactive tools live outside long-form reading, open them when you want numbers.
            </p>
            <ul className="mt-6 border-y" style={{ borderColor: HAIRLINE }}>
              {CALC_HANDOFFS.map((item) => (
                <li key={item.href} className="border-b last:border-b-0" style={{ borderColor: HAIRLINE }}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="flex items-center justify-between gap-4 py-4 text-sm font-medium text-shark transition hover:text-cinematic-teal"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="border-t py-16 md:py-24" style={{ borderColor: HAIRLINE }} aria-labelledby="insights-faq-heading">
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <h2
            id="insights-faq-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Frequently asked questions on financial education
          </h2>
          <div className="mt-8 divide-y border-y" style={{ borderColor: HAIRLINE }}>
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span className="shrink-0 text-cinematic-teal transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/insights")} />

      <section className="pb-16 md:pb-24" aria-labelledby="advice-boundary-heading">
        <div className={HOME4_WRAP}>
          <div
            className="mx-auto max-w-[1000px] rounded-xl px-6 py-10 sm:px-10 sm:py-12"
            style={{ backgroundColor: INK }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Education → advice boundary
            </p>
            <h2
              id="advice-boundary-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Need advice on your circumstances?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              The articles above do not account for your personal financial situation. A
              consultation with FSP 17273 starts with a proper needs analysis.
            </p>
            <Link
              href="/contact?source=insights_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Book a consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-white/50">{FAIS_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
