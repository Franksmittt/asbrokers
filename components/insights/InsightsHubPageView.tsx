"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useActionState, useCallback, useMemo, useState } from "react";
import { subscribeNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import type { InsightFeedItem } from "@/lib/insights/feed";
import type { InsightCategoryValue } from "@/lib/insights/insightCategories";
import { getAlt } from "@/lib/image-alt";

const InsightsFeedFilter = dynamic(
  () => import("@/components/insights/InsightsFeedFilter").then((m) => m.InsightsFeedFilter),
  { loading: () => <p className="mt-8 text-sm text-stone-500">Loading articles…</p> }
);

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
/** WCAG AA teal on canvas; lighter teal for shark chapters. */
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const FAIS_DISCLAIMER =
  "Articles and guides on this page are educational only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Personalised advice requires a needs analysis with a licensed representative of FSP 17273.";

/** Flagship static guide when the CMS feed has no featured candidate yet. */
const FLAGSHIP_FALLBACK = {
  title: "Semigration & Retirement Villages Western Cape",
  description:
    "A flagship guide for high-net-worth families relocating from Gauteng to the coast: retirement capital, village living, and estate planning in one place.",
  href: "/insights/semigration-retirement",
  thumbnailUrl: "/images/og-default.jpg" as string | null,
  publishedAt: null as string | null,
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

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InsightsNewsletterSignup() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialNewsletterState);

  return (
    <div className="border bg-white/60 p-6 sm:p-8" style={{ borderColor: HAIRLINE }}>
      <h3 className="font-serif text-xl font-semibold tracking-tight text-shark">
        Stay ahead of the legislation
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        Occasional fiduciary notes on retirement, estate duty, and wealth engineering. No spam, no
        product push.
      </p>
      <form action={formAction} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={isPending}
          className="w-full flex-1 border border-stone-300 bg-white px-4 py-3 text-sm text-shark placeholder:text-stone-400 focus:outline-none focus:ring-1 disabled:opacity-60"
          style={{ ["--tw-ring-color" as string]: TEAL }}
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: TEAL }}
          aria-label={isPending ? "Subscribing" : "Subscribe to newsletter"}
        >
          Subscribe
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>
      {state.message ? (
        <p
          className={`mt-3 text-sm ${state.success ? "" : "text-amber-700"}`}
          style={state.success ? { color: TEAL } : undefined}
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

  const featured = useMemo(() => {
    const withImage = articles.find((a) => Boolean(a.thumbnailUrl));
    const latest = withImage ?? articles[0];
    if (!latest) return FLAGSHIP_FALLBACK;
    return {
      title: latest.title,
      description:
        latest.excerpt?.trim() ||
        "A fiduciary deep-dive from the AS Brokers insights library — education before advice.",
      href: `/insights/${latest.slug}?locale=${latest.locale}`,
      thumbnailUrl: latest.thumbnailUrl,
      publishedAt: latest.publishedAt,
    };
  }, [articles]);

  const archiveArticles = useMemo(() => {
    if (!articles.length) return articles;
    const featuredHrefSlug = featured.href.split("?")[0]?.replace("/insights/", "");
    if (!featuredHrefSlug || featured.href.includes("semigration-retirement")) return articles;
    return articles.filter((a) => a.slug !== featuredHrefSlug);
  }, [articles, featured.href]);

  const handleTopicSelect = useCallback((topicId: string) => {
    setActiveTopicId((prev) => (prev === topicId ? null : topicId));
    document.getElementById("latest")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* §1 Hero — light */}
      <header
        className="border-b pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL }}
          >
            Learn · Insights library · FSP 17273
          </p>
          <h1
            className="mt-5 max-w-4xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2.2vw, 3.25rem)", lineHeight: 1.12, color: INK }}
          >
            The AS Brokers insights library
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Deep reading for people who take South African wealth seriously — Two-Pot, estate duty,
            underinsurance, tax drag, Everest structuring. Written here so you arrive at advice
            already educated. Articles are educational only, not personalised advice.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <a href="#featured" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Featured
            </a>
            <a href="#latest" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              All articles
            </a>
            <a href="#why-library" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Why we publish
            </a>
            <a href="#newsletter" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Newsletter
            </a>
          </nav>
          {articles.length > 0 ? (
            <p className="mt-6 text-sm text-stone-500">
              <span className="font-semibold tabular-nums text-shark">{articles.length}</span>
              {" "}published article{articles.length === 1 ? "" : "s"} in the library
            </p>
          ) : null}
        </div>
      </header>

      {/* §2 Library — light: topics + featured + archive */}
      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-label="Insights library"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <nav
              aria-label="Library topics"
              className="lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Browse by topic
              </p>
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
                        aria-current={activeTopicId === topic.id ? "true" : undefined}
                        className={`text-left text-sm font-medium transition ${
                          activeTopicId === topic.id
                            ? "font-semibold"
                            : "text-stone-700 hover:text-cinematic-teal"
                        }`}
                        style={activeTopicId === topic.id ? { color: TEAL } : undefined}
                      >
                        {topic.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-stone-500">
                New posts published in Blog Studio appear here automatically.
              </p>
            </nav>
          </aside>

          <div className="min-w-0 lg:col-span-9">
            <article id="featured" className="scroll-mt-28" aria-labelledby="insights-featured-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Featured reading
              </p>
              <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="min-w-0 lg:col-span-7">
                  <div
                    className="relative aspect-[16/10] overflow-hidden border bg-white"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <Image
                      src={featured.thumbnailUrl ?? "/images/og-default.jpg"}
                      alt={getAlt(featured.thumbnailUrl ?? "/images/og-default.jpg", featured.title)}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      unoptimized={Boolean(featured.thumbnailUrl?.startsWith("http"))}
                      priority
                    />
                  </div>
                </div>
                <div className="min-w-0 lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
                  {featured.publishedAt ? (
                    <time
                      className="text-xs font-semibold uppercase tracking-wider text-stone-500 tabular-nums"
                      dateTime={featured.publishedAt}
                    >
                      {formatDateShort(featured.publishedAt)}
                    </time>
                  ) : (
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Flagship guide
                    </p>
                  )}
                  <h2
                    id="insights-featured-heading"
                    className="mt-3 font-serif font-semibold tracking-tight"
                    style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                    {featured.description}
                  </p>
                  <Link
                    href={featured.href}
                    prefetch={false}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                    style={{ color: TEAL }}
                  >
                    Read the article
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>

            <section id="latest" className="mt-16 scroll-mt-28" aria-labelledby="insights-latest-heading">
              <h2
                id="insights-latest-heading"
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
              >
                All insights
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                Chronological library. Filter by topic, then open what matters to your situation.
              </p>
              <InsightsFeedFilter
                articles={archiveArticles.length ? archiveArticles : articles}
                topicNav={INSIGHTS_TOPIC_NAV}
                activeTopicId={activeTopicId}
                onClearTopic={() => setActiveTopicId(null)}
                variant="editorial"
              />
            </section>
          </div>
        </div>
      </section>

      {/* §3 Why we publish — shark */}
      <section
        id="why-library"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="why-library-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] lg:sticky lg:top-28"
              style={{ color: TEAL_ON_DARK }}
            >
              Editorial standard
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="why-library-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Written for people who refuse thin advice
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              This library is where AS Brokers publishes the thinking behind the practice —
              legislation, liquidity, risk architecture, and the questions clients actually ask.
              It is not content marketing filler. It is the reading room before a strategy call.
            </p>
            <dl className="mt-10 space-y-0 border-y border-white/10">
              {[
                {
                  dt: "Education first",
                  dd: "Arrive informed. Personalised advice still requires a needs analysis with FSP 17273 — these pages never replace that.",
                },
                {
                  dt: "South African context",
                  dd: "SARS, Two-Pot, Medical Schemes Act demarcation, estate duty — framed for local balance sheets, not imported generic blogs.",
                },
                {
                  dt: "Published from the practice",
                  dd: "Articles created in Blog Studio go live here. When Albert publishes, this is where clients and referrals come to learn.",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="grid gap-2 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-white">{row.dt}</dt>
                  <dd className="text-sm leading-relaxed text-white/65">{row.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* §4 Newsletter + tools — light */}
      <section
        id="newsletter"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="newsletter-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14`}>
          <div className="min-w-0 lg:col-span-6">
            <h2 id="newsletter-heading" className="sr-only">
              Newsletter
            </h2>
            <InsightsNewsletterSignup />
          </div>
          <div className="min-w-0 lg:col-span-6">
            <h2
              id="calc-handoff-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
            >
              Prefer numbers to narrative?
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
              Open a calculator when you want the maths. Bring the output to a call if you want
              advice on your facts.
            </p>
            <ul className="mt-6 border-y" style={{ borderColor: HAIRLINE }}>
              {CALC_HANDOFFS.map((item) => (
                <li key={item.href} className="border-b last:border-b-0" style={{ borderColor: HAIRLINE }}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="flex items-center justify-between gap-4 py-4 text-sm font-medium text-shark transition hover:opacity-80"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden style={{ color: TEAL }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* §5 FAQ — shark */}
      <VisibleFaqSection
        faqs={faqItems}
        headingId="insights-faq-heading"
        primaryCta={{ href: "/contact?source=insights_faq", label: "Book a capital assessment" }}
      />

      {/* §6 Related — light */}
      <RelatedContent variant="warm" links={getRelatedLinks("/insights")} />

      {/* §7 Terminal — dark panel */}
      <section
        className="scroll-mt-28 pb-16 pt-4 md:scroll-mt-32 md:pb-24"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="advice-boundary-heading"
      >
        <div className={HOME4_WRAP}>
          <div
            className="rounded-xl px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14"
            style={{ backgroundColor: INK }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL_ON_DARK }}
            >
              Education → advice boundary
            </p>
            <h2
              id="advice-boundary-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready to apply this to your circumstances?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              The library educates. A consultation with FSP 17273 starts with a proper needs
              analysis — bring the questions these articles raised.
            </p>
            <Link
              href="/contact?source=insights_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
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
