"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FAQSchema } from "@/components/FAQSchema";
import { CalculatorHubCard } from "@/components/calculators/CalculatorHubCard";
import { PAGE_CONTENT_MAX, PageMediaStrip, PageMediaStripTriple } from "@/components/PageMediaStrip";
import { PlanningToolsStrip } from "@/components/PlanningToolsStrip";
import {
  HUB_CALCULATORS,
  HUB_SECTIONS,
  getHubCalculatorsBySection,
} from "@/lib/calculators/hub-catalog";
import {
  HUB_REVIEW_STORAGE_KEY,
  downloadCalculatorReviewExport,
  downloadCalculatorReviewMarkdown,
  type CalculatorReviewState,
} from "@/lib/calculators/hub-review-export";

const calculatorFAQs = [
  {
    question: "What calculators does AS Brokers offer?",
    answer:
      "We offer retirement reality, income in retirement (run-out), inflation impact, income tax, estate duty, annual estate reduction, premium increase comparison, and Everest Wealth product calculators.",
  },
  {
    question: "Are calculator results financial advice?",
    answer:
      "No. Our calculators are educational tools to illustrate concepts and rough estimates. For personalised advice, book a consultation with an AS Brokers adviser.",
  },
];

const pillarLinks = [
  { label: "Assess Capital Lifespan", href: "#retirement" },
  { label: "Calculate Everest Yields", href: "#product-quotations" },
  { label: "Secondary Risk Tools", href: "#risk-architecture" },
];

function emptyReviewState(): CalculatorReviewState {
  return Object.fromEntries(HUB_CALCULATORS.map((c) => [c.id, { keep: false, notes: "" }]));
}

function SectionHeading({ title, question }: { title: string; question: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="mb-1 text-xl font-bold text-white md:text-2xl">{title}</h2>
      <p className="text-sm text-zinc-500">Key question: {question}</p>
    </div>
  );
}

export function CalculatorsHubPage() {
  const [review, setReview] = useState<CalculatorReviewState>(emptyReviewState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HUB_REVIEW_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CalculatorReviewState;
        setReview({ ...emptyReviewState(), ...parsed });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(HUB_REVIEW_STORAGE_KEY, JSON.stringify(review));
  }, [review, hydrated]);

  const updateEntry = useCallback((id: string, patch: Partial<{ keep: boolean; notes: string }>) => {
    setReview((prev) => ({
      ...prev,
      [id]: { keep: prev[id]?.keep ?? false, notes: prev[id]?.notes ?? "", ...patch },
    }));
  }, []);

  const stats = useMemo(() => {
    const entries = HUB_CALCULATORS.map((c) => review[c.id] ?? { keep: false, notes: "" });
    return {
      keep: entries.filter((e) => e.keep).length,
      notes: entries.filter((e) => e.notes.trim()).length,
    };
  }, [review]);

  const retirementCalcs = getHubCalculatorsBySection(HUB_SECTIONS.retirement.id);
  const riskCalcs = getHubCalculatorsBySection(HUB_SECTIONS.risk.id);

  return (
    <div className="min-h-screen bg-void">
      <FAQSchema faqs={calculatorFAQs} />

      {/* Review toolbar */}
      <div className="sticky top-16 z-40 border-b border-[#00549F]/30 bg-shark/95 backdrop-blur-xl">
        <div className={`${PAGE_CONTENT_MAX} py-3`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">
                Calculator curation review
              </p>
              <p className="text-sm text-zinc-400">
                Tick calculators to <strong className="text-white">keep</strong>, add notes, then export for sign-off.
                {hydrated && (
                  <span className="ml-2 text-zinc-500">
                    {stats.keep} selected · {stats.notes} with notes
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setReview(emptyReviewState())}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => downloadCalculatorReviewMarkdown(review)}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
              >
                Export .md
              </button>
              <button
                type="button"
                onClick={() => downloadCalculatorReviewExport(review)}
                className="rounded-xl bg-[#00549F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0066b8]"
              >
                Export review file
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-cinematic-teal/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gold-orange/10 blur-[120px]" />
        <div className={`relative ${PAGE_CONTENT_MAX}`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">AS Brokers</p>
              <h1 className="mb-4 text-3xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
                The Actuarial Reality Check.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed tracking-[0.01em] text-gray-400">
                Run the numbers. Expose your capital lifespan. Engineer a high-yield solution.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[2rem] rim-light p-5 md:p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Jump to section</p>
                <nav className="flex flex-col gap-2">
                  {pillarLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className={PAGE_CONTENT_MAX}>
          <PlanningToolsStrip />
        </div>
      </section>

      <section className="border-t border-white/5 py-8" aria-hidden>
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStrip
            variant="primary"
            src="/images/calculators-hub-16x9.jpg"
            alt="Calculator planning sheets for retirement, tax, estate and premiums on a desk, no people"
            rounded="3xl"
          />
        </div>
      </section>

      <section className="border-t border-white/5 bg-black/20 py-8 md:py-10">
        <div className={PAGE_CONTENT_MAX}>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="shrink-0 md:max-w-xs">
              <h2 className="text-lg font-bold text-white">How to use these tools</h2>
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-zinc-400">
              <p>
                Each tool answers a specific question and leads to a practical solution. Use any order; start with what
                matters most to you.
              </p>
              <p className="text-zinc-500">
                <strong className="text-zinc-300">Review mode:</strong> tick the calculators you want on the final
                public page, add notes beside each, then click <strong className="text-zinc-300">Export review file</strong>{" "}
                and send the JSON to your developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-black/10 py-10" aria-hidden>
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStripTriple
            items={[
              {
                src: "/images/calculators-capital-lifespan-4x3.jpg",
                alt: "Retirement capital, timeline planner and calculator  -  capital lifespan theme, no people",
              },
              {
                src: "/images/calculators-education-16x9.jpg",
                alt: "Finance books and notebook for learning before an adviser meeting, no people",
              },
              {
                src: "/images/home-actuarial-engine-16x9.jpg",
                alt: "Actuarial desk with retirement planning worksheet and calculator, no people",
              },
            ]}
          />
        </div>
      </section>

      <section id="retirement" className="scroll-mt-32 border-t border-white/5 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title={HUB_SECTIONS.retirement.title}
            question={HUB_SECTIONS.retirement.question}
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {retirementCalcs.map((calc) => (
              <div
                key={calc.id}
                id={calc.id === "everest-wealth-products" ? "product-quotations" : undefined}
                className={`scroll-mt-32 ${calc.gridClassName ?? ""}`}
              >
                <CalculatorHubCard
                  calc={calc}
                  review={review[calc.id] ?? { keep: false, notes: "" }}
                  onKeepChange={(keep) => updateEntry(calc.id, { keep })}
                  onNotesChange={(notes) => updateEntry(calc.id, { notes })}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="risk-architecture" className="scroll-mt-32 border-t border-white/5 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading title={HUB_SECTIONS.risk.title} question={HUB_SECTIONS.risk.question} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {riskCalcs.map((calc) => (
              <CalculatorHubCard
                key={calc.id}
                calc={calc}
                review={review[calc.id] ?? { keep: false, notes: "" }}
                onKeepChange={(keep) => updateEntry(calc.id, { keep })}
                onNotesChange={(notes) => updateEntry(calc.id, { notes })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Education — not in curation list */}
      <section id="financial-education" className="scroll-mt-24 border-t border-white/5 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title="Financial Education"
            question="What is it costing you not to learn how money really works?"
          />
          <div className="mx-auto w-full max-w-3xl">
            <Link
              href="/contact"
              prefetch={false}
              className="group block rounded-[2rem] border-0 rim-light p-6 transition-all duration-500 hover:bg-white/[0.07] md:p-8 lg:p-10"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cinematic-teal">
                Education & Growth
              </span>
              <h3 className="mb-3 mt-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cinematic-teal/90 md:text-2xl">
                The Cost of Not Learning
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                Most people leave their investments in the hands of others and accept whatever return they get.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-cinematic-teal transition-all duration-300 group-hover:gap-2">
                Get in touch
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-black/20 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Business Risk Management
              </p>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Your Business Stops the Moment You Do.
                <br />
                That&apos;s Not a Business. That&apos;s a Risk.
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                If your income depends entirely on you being present, you don&apos;t own a business — you own a job with
                overhead.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-white/10 bg-[#101014] p-6 md:p-8">
                <Link
                  href="/business-risk-review"
                  className="inline-flex items-center gap-2 rounded-[2rem] bg-white px-6 py-3 font-bold text-black transition-all duration-500 hover:scale-[1.03] hover:bg-zinc-200"
                >
                  Run the Business Risk Review™
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-[2rem] rim-light p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cinematic-teal/10 to-gold-orange/5" />
              <div className="relative text-center">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Stop Guessing Your Capital Lifespan.</h2>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-[2rem] bg-white px-8 py-4 font-bold text-black transition-all duration-500 hover:bg-zinc-200"
                >
                  Request a review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
