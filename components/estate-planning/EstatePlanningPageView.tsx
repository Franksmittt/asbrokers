"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { EstateLiquidityWaterfall } from "@/components/trust/TrustDiagrams";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const INSET = "rgba(29,29,31,0.05)";
const ESTATE_CRAFT = "/images/risk-arch-estate.png";
const FAIS_DISCLAIMER =
  "Content and calculators on this page are illustrative and educational only and do not constitute financial, tax, or legal advice as defined in the FAIS Act, 2002. Estate duty, executor fees, and donations rules change — verify current SARS and statutory positions with qualified professionals.";

const CALC_ESTATE_DUTY = calculatorPagePath("asset-007-estate-duty");
const CALC_ESTATE_REDUCTION = calculatorPagePath("asset-008-estate-reduction");

const PILLARS = [
  {
    dt: "Estate duty abatement",
    dd: "The first R3.5 million of a net dutiable estate is generally free of estate duty. Amounts above that are typically taxed at 20% up to R30 million, and 25% thereafter — confirm the current statutory position for your planning year.",
  },
  {
    dt: "Executor fees",
    dd: "Statutory maximum executor remuneration is commonly framed at 3.5% plus VAT (effective 4.025% where VAT applies). That cash must exist in the estate — a will alone does not create it.",
  },
  {
    dt: "Spousal rollover",
    dd: "Section 4(q) mechanisms can allow a surviving spouse to benefit from unused abatement capacity, often discussed as a combined R7 million shield across two estates — subject to facts and current law.",
  },
  {
    dt: "Annual donations",
    dd: "Lifetime transfers within SARS donation exemptions can reduce dutiable estates over time. Budget updates adjust annual exemptions — verify the current natural-person exemption before modelling multi-year strategies.",
  },
  {
    dt: "Section 7C trust loans",
    dd: "Interest-free or low-interest loans to trusts can trigger deemed donations based on the official rate of interest. Rate changes (for example after SARB repo moves) alter the maths — treat any published rate as educational until verified.",
  },
  {
    dt: "Business succession",
    dd: "Buy-and-sell funding and key-person capital sit on the financial side of continuity. Legal agreements remain attorney work; we coordinate the capital architecture.",
  },
] as const;

type Props = { faqs: FAQItem[] };

function ToolCard({
  code,
  title,
  description,
  href,
}: {
  code: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="flex h-full flex-col border bg-white p-6 sm:p-7" style={{ borderColor: HAIRLINE }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 tabular-nums">
        {code}
      </p>
      <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight text-shark">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
      <Link
        href={href}
        prefetch={false}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
      >
        Run calculation
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <p className="mt-5 border-t pt-4 text-[11px] leading-relaxed text-stone-500" style={{ borderColor: HAIRLINE }}>
        {FAIS_DISCLAIMER}
      </p>
    </article>
  );
}

export function EstatePlanningPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-12 items-start gap-10 lg:gap-12`}>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Estate planning · FSP 17273 · Category 1.8
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
            >
              Estate liquidity engineering &amp; succession
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              A will is only half the job. Without cash for estate duty and executor fees, heirs can
              be forced into a fire sale. We engineer liquidity — life cover and capital structure —
              while partnered attorneys draft the legal instruments.
            </p>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              <a href="#legacy-checklist" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Legacy checklist
              </a>
              <a href="#estate-architecture" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Duty &amp; fees
              </a>
              <a href="#estate-calculators" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Calculators
              </a>
              <a href="#strategy-call" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Strategy call
              </a>
            </nav>
          </div>

          <div className="col-span-12 space-y-6 lg:col-span-6">
            <EstateLiquidityWaterfall />
            <div
              id="legacy-checklist"
              className="scroll-mt-28 rounded-lg px-6 py-8 sm:px-8 sm:py-10"
              style={{ backgroundColor: INSET }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Primary diagnostic
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-shark">
                Legacy Readiness Checklist
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                A guided readiness review covering wills, liquidity, duty awareness, and succession
                gaps — before you book a strategy call.
              </p>
              <Link
                href="/legacy-readiness-checklist"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 rounded bg-cinematic-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Start the checklist
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section
        id="estate-architecture"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="architecture-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="architecture-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            The financial architecture of deceased estates in South Africa
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Objective legislative framing — engineer liquidity and optimize lawful rollovers. Not
            “avoid the taxman” rhetoric.
          </p>
          <figure className="mt-8 max-w-3xl">
            <div
              className="relative aspect-[16/9] overflow-hidden border bg-white"
              style={{ borderColor: HAIRLINE }}
            >
              <Image
                src={ESTATE_CRAFT}
                alt={getAlt(
                  ESTATE_CRAFT,
                  "Estate planning desk — documents, portfolio and succession context"
                )}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
              Craft, not faces: liquidity engineering is paperwork and capital structure — attorneys
              draft; we engineer the cash.
            </figcaption>
          </figure>
          <dl className="mt-10 border-y" style={{ borderColor: HAIRLINE }}>
            {PILLARS.map((row) => (
              <div
                key={row.dt}
                className="grid gap-2 border-b py-6 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:gap-8"
                style={{ borderColor: HAIRLINE }}
              >
                <dt className="font-serif text-base font-semibold tracking-tight text-shark">{row.dt}</dt>
                <dd className="text-sm leading-relaxed text-stone-600">{row.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="estate-calculators"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="estate-calcs-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="estate-calcs-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Intergenerational wealth transfer tools
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Model liquidity stress and donation strategies. Illustrative only — bring outputs to a
            strategy call for advice on your facts.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <ToolCard
              code="ASSET 007"
              title="Estate Duty & Executor Fee Calculator"
              description="Illustrate duty, executor fees, and liquidity pressure from the inputs you provide."
              href={CALC_ESTATE_DUTY}
            />
            <ToolCard
              code="ASSET 008"
              title="Estate Reduction Strategy"
              description="Model annual donation strategies within SARS limits to understand multi-year estate reduction maths."
              href={CALC_ESTATE_REDUCTION}
            />
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24" aria-labelledby="scope-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 lg:gap-14`}>
          <aside className="col-span-12 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              Scope boundary
            </p>
          </aside>
          <div className="col-span-12 max-w-3xl lg:col-span-9">
            <h2
              id="scope-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Financial coordination vs legal drafting
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              AS Brokers engineers liquidity — life cover, investment placement, and succession
              funding — so an estate can settle fees and duty without forced sales. Binding wills,
              trust deeds, and related instruments are drafted by admitted attorneys. We coordinate;
              we do not practise as a law firm on this website.
            </p>
            <Link
              href="/solutions/business-life"
              prefetch
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
            >
              Business succession domain
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y py-8" style={{ borderColor: HAIRLINE }} aria-label="Fiduciary credentials">
        <div className={`${HOME4_WRAP} grid gap-6 sm:grid-cols-3`}>
          {[
            { title: "25+ years", body: "Est. 1998 · Krugersdorp, West Rand" },
            { title: "FSP 17273", body: "Independent Category 1.8 · FSCA" },
            { title: "Scope honesty", body: "Financial engineering · attorney-drafted instruments" },
          ].map((item) => (
            <div key={item.title}>
              <p className="font-serif text-lg font-semibold tracking-tight text-shark">{item.title}</p>
              <p className="mt-1 text-sm text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="estate-faq-heading">
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <h2
            id="estate-faq-heading"
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

      <RelatedContent variant="warm" links={getRelatedLinks("/estate-planning")} />

      <section id="strategy-call" className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24" aria-labelledby="strategy-heading">
        <div className={HOME4_WRAP}>
          <div
            className="mx-auto max-w-[1000px] rounded-xl px-6 py-10 sm:px-10 sm:py-12"
            style={{ backgroundColor: INK }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              FSP 17273 · Category 1.8
            </p>
            <h2
              id="strategy-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready for a legacy strategy call?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Bring asset lists, existing wills, and business continuity questions. We review
              liquidity and risk architecture; attorneys handle drafting.
            </p>
            <Link
              href="/contact?source=estate_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Book a strategy call
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
