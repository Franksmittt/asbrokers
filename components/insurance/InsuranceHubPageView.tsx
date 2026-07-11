"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const TEAL = "#00A3A3";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const INSET = "rgba(29,29,31,0.05)";
const FAIS_DISCLAIMER =
  "Content and calculators on this page are illustrative and educational only and do not constitute financial, tax, or insurance advice as defined in the FAIS Act, 2002. Outcomes depend on underwriting, policy wording, and your circumstances.";

const CALC_AVERAGE_CLAUSE = calculatorPagePath("asset-015-average-clause");

const PROTECTION_DOMAINS = [
  {
    title: "Medical aid & gap",
    description: "Scheme structuring and shortfall cover within statutory demarcation.",
    href: "/solutions/medical-aid",
  },
  {
    title: "Life & income",
    description: "Life, disability, and severe illness cover for dependents and earnings.",
    href: "/solutions/life-insurance",
  },
  {
    title: "Personal assets",
    description: "Home, motor, and high-value possessions — including underinsurance risk.",
    href: "/solutions/personal-insurance",
  },
  {
    title: "Business & partners",
    description: "Commercial cover, key person protection, and buy-and-sell continuity.",
    href: "/solutions/business-insurance",
  },
] as const;

const PARTNERS = ["Santam", "Old Mutual", "Bryte"] as const;

type Props = { faqs: FAQItem[] };

export function InsuranceHubPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={HOME4_WRAP}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
            Insurance &amp; risk · FSP 17273 · Category 1.8
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            Commercial and personal risk architecture
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Most owners discover policy flaws after the fire — Average Clause underinsurance, broken
            Business Interruption definitions, escalating life premiums. We structure indemnification
            for your balance sheet, place cover independently across the market, and stay for the
            claim.
          </p>

          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <a href="#protection-domains" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Protection domains
            </a>
            <a href="#average-clause" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Average clause diagnostic
            </a>
            <a href="#independence" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Independence
            </a>
            <a href="#risk-audit" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Book a risk audit
            </a>
          </nav>

          <h2 id="protection-domains" className="sr-only">
            Protecting personal wealth and commercial balance sheets
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px border sm:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {PROTECTION_DOMAINS.map((domain) => (
              <Link
                key={domain.href}
                href={domain.href}
                prefetch
                className="group flex flex-col bg-[#F7F6F3] p-6 transition hover:bg-white sm:p-8"
              >
                <h3 className="font-serif text-xl font-semibold tracking-tight text-shark">{domain.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{domain.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal">
                  Open domain
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section
        id="average-clause"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="average-clause-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="rounded-lg px-6 py-10 sm:px-10 sm:py-12" style={{ backgroundColor: INSET }}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Diagnostic · ASSET 015
            </p>
            <h2
              id="average-clause-heading"
              className="mt-4 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              The mechanics of the Average Clause in South Africa
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              If the sum insured is below replacement value, many policies reduce the claim
              proportionally:{" "}
              <span className="font-semibold tabular-nums text-shark">
                (Amount Insured ÷ Market Value) × Damages = Payout
              </span>
              . That is underwriting maths — not a scare tactic.
            </p>
            <Link
              href={CALC_AVERAGE_CLAUSE}
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
            >
              Run the Average Clause calculator
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-stone-500">{FAIS_DISCLAIMER}</p>
          </div>

          <div className="mt-10 grid gap-5 border bg-white p-6 sm:grid-cols-2 sm:p-8" style={{ borderColor: HAIRLINE }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Premium liability
              </p>
              <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight text-shark">
                Escalating vs level premiums
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Cheap starting premiums can become unaffordable when guarantees expire. Review the
                life insurance hub before comparing quotes on price alone.
              </p>
              <Link
                href="/solutions/life-insurance"
                prefetch
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
              >
                Open life cover education
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="border-t pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0" style={{ borderColor: HAIRLINE }}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Commercial continuity
              </p>
              <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight text-shark">
                Business risk review
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Key person, buy-and-sell funding, and commercial liability — structured for the
                balance sheet, not a generic package.
              </p>
              <Link
                href="/business-risk-review"
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
              >
                Start a business risk review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24" aria-labelledby="medical-gap-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 lg:gap-14`}>
          <aside className="col-span-12 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              Regulatory demarcation
            </p>
          </aside>
          <div className="col-span-12 max-w-3xl lg:col-span-9">
            <h2
              id="medical-gap-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Medical aid structuring vs gap cover demarcation
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Medical schemes are governed by the Medical Schemes Act and must provide Prescribed
              Minimum Benefits (PMBs). Gap cover is a short-term insurance product under Demarcation
              Regulations — designed to fund in-hospital specialist shortfalls, not to replace a
              medical scheme.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Annual gap cover benefit caps adjust under those regulations (verify the current
              figure for your policy year with a licensed adviser). We structure household health
              cover across both regimes without conflating them.
            </p>
            <Link
              href="/solutions/medical-aid"
              prefetch
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
            >
              Medical aid &amp; gap domain
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="independence"
        className="scroll-mt-28 border-y py-12 md:py-16"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="independence-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="independence-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            The independence advantage: unrestricted market access
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            As an independent Category 1.8 FSP we survey the market and place cover where it fits —
            without quotas that force a single insurer&apos;s shelf. Market access includes
            institutions such as:
          </p>
          <ul className="mt-8 grid gap-0 border-y sm:grid-cols-3" style={{ borderColor: HAIRLINE }}>
            {PARTNERS.map((name) => (
              <li
                key={name}
                className="border-b px-4 py-5 font-serif text-lg font-semibold tracking-tight text-stone-700 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                style={{ borderColor: HAIRLINE }}
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-600">
            Names indicate placement capability — not endorsement exclusivity or tied agency.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="insurance-faq-heading">
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <h2
            id="insurance-faq-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Frequently asked questions on insurance engineering
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

      <RelatedContent variant="warm" links={getRelatedLinks("/insurance")} />

      <section id="risk-audit" className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24" aria-labelledby="risk-audit-heading">
        <div className={HOME4_WRAP}>
          <div
            className="mx-auto max-w-[1000px] rounded-xl px-6 py-10 sm:px-10 sm:py-12"
            style={{ backgroundColor: INK }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              FSP 17273 · Category 1.8
            </p>
            <h2
              id="risk-audit-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready for a structured risk audit?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Bring policies, sums insured, and business continuity questions. An independent
              adviser will review cover architecture without product pressure.
            </p>
            <Link
              href="/contact?source=insurance_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Book a risk audit
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
