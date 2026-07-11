"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { EVEREST_CONSTRAINT_STRING } from "@/lib/problem-messaging";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const INSET = "rgba(29,29,31,0.05)";

const PRODUCTS = [
  {
    name: "12.8% Strategic Income",
    yieldLabel: "12.8% Targeted p.a.",
    focus: "Monthly income + 10% loyalty bonus after five years",
    href: calculatorPagePath("asset-010-everest-128-income"),
  },
  {
    name: "14.2% Onyx Income+",
    yieldLabel: "14.2% Targeted p.a.",
    focus: "Maximum day-one monthly income; no loyalty bonus",
    href: calculatorPagePath("asset-009-everest-142-income"),
  },
  {
    name: "14.5% Strategic Growth",
    yieldLabel: "14.5% Targeted p.a.",
    focus: "Pure compounding to maturity; no monthly drawings",
    href: calculatorPagePath("asset-012-strategic-growth"),
  },
] as const;

type Props = { faqs: FAQItem[] };

export function EverestWealthPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={HOME4_WRAP}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
            Everest Wealth · Category 1.8 · FSP 17273 advising · Everest FSP 795
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            Structured monthly income without daily market volatility
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Retirees and income-seekers cannot afford a 20% market correction exactly when they need
            to draw cash. Where suitable, Everest voluntary preference-share structures target
            predictable dividends — with illiquidity and DWT stated before you run a single number.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={calculatorPagePath("asset-010-everest-128-income")}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Calculate 12.8% target income
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/everest-wealth/about"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
            >
              Read the full Everest guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <aside
            className="mt-8 max-w-3xl border bg-white p-5 text-sm leading-relaxed text-stone-600"
            style={{ borderColor: HAIRLINE }}
            role="note"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
              Constraint string (read before any calculator)
            </p>
            <p className="mt-2 tabular-nums">{EVEREST_CONSTRAINT_STRING}</p>
          </aside>
        </div>
      </header>

      <section className="pb-16 md:pb-24" aria-labelledby="volatility-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 lg:gap-14`}>
          <aside className="col-span-12 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              The problem
            </p>
          </aside>
          <div className="col-span-12 max-w-3xl lg:col-span-9">
            <h2
              id="volatility-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Sequence-of-returns risk meets South African tax drag
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Drawing income from volatile equities means selling into dips. Interest-bearing cash
              can attract marginal tax up to 45%. The job is predictable cash flow — not another
              unit-trust brochure.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              AS Brokers (FSP 17273, Category 1.8) can discuss Everest Wealth structures where they
              fit — as one tool among others, never a default for every client. Everest is regulated
              separately (FSP 795). We are an independent intermediary, not a tied agent or
              subsidiary.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-labelledby="suite-heading">
        <div className={HOME4_WRAP}>
          <h2
            id="suite-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Three voluntary profiles — pick the cash-flow job
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Yields sit at body weight with “Targeted p.a.” — never as glowing sales numerals.
            Constraints travel in the same visual group.
          </p>
          <div className="mt-10 overflow-hidden border bg-white" style={{ borderColor: HAIRLINE }}>
            {PRODUCTS.map((row) => (
              <div
                key={row.name}
                className="grid gap-3 border-b px-5 py-6 last:border-b-0 md:grid-cols-12 md:items-center md:gap-6"
                style={{ borderColor: HAIRLINE }}
              >
                <div className="md:col-span-4">
                  <p className="font-serif text-lg font-semibold tracking-tight text-shark">{row.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{row.focus}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm font-semibold tabular-nums text-shark">{row.yieldLabel}</p>
                  <p className="mt-1 text-xs text-stone-500">Not guaranteed. Educational only.</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-xs leading-relaxed text-stone-500">{EVEREST_CONSTRAINT_STRING}</p>
                </div>
                <div className="md:col-span-2">
                  <Link
                    href={row.href}
                    prefetch={false}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinematic-teal hover:opacity-80"
                  >
                    Illustrate
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-stone-600">
            Living annuity capital (Amethyst, Reg 28, 2.5%–17.5% drawdown) is a different wrapper —{" "}
            <Link
              href={calculatorPagePath("asset-014-living-annuity")}
              prefetch={false}
              className="font-semibold text-cinematic-teal"
            >
              model living annuity income
            </Link>{" "}
            separately from voluntary preference shares.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-labelledby="compare-heading">
        <div className={HOME4_WRAP}>
          <div className="rounded-lg px-6 py-10 sm:px-10" style={{ backgroundColor: INSET }}>
            <h2
              id="compare-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
            >
              Income vs growth: which trade-off fits?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
              Compare maximum day-one income against deferred compounding — illustrative only.
            </p>
            <Link
              href={calculatorPagePath("asset-013-everest-income-vs-growth")}
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
            >
              Open Income vs Growth calculator
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="everest-faq-heading">
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <h2
            id="everest-faq-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Frequently asked questions
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

      <RelatedContent variant="warm" links={getRelatedLinks("/everest-wealth")} />

      <section className="pb-16 md:pb-24" aria-labelledby="everest-cta-heading">
        <div className={HOME4_WRAP}>
          <div
            className="mx-auto max-w-[1000px] rounded-xl px-6 py-10 sm:px-10 sm:py-12"
            style={{ backgroundColor: INK }}
          >
            <h2
              id="everest-cta-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready to test suitability — not chase a headline yield?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Run the calculators, read the constraints, then book FSP 17273 if you want a needs
              analysis. Calculators are not advice.
            </p>
            <Link
              href="/contact?source=everest_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Book a capital assessment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
