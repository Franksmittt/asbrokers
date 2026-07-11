import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs } from "@/lib/seo";
import { CALCULATOR_REGISTRY, formatPublicCalculatorTitle } from "@/lib/calculators/registry";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const CRAFT_STRIP = "/images/calculators-hub-16x9.jpg";

const FAIS_DISCLAIMER =
  "These calculators are illustrative and educational only. They do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes depend on fees, markets, underwriting, and your circumstances. Targeted Everest return profiles are not guarantees.";

const DOMAINS = [
  {
    id: "retirement",
    label: "Retirement",
    ids: [
      "asset-001-retirement-growth",
      "asset-002-retirement-reality-check",
      "asset-003-retirement-premium",
      "asset-004-life-of-capital",
      "asset-014-living-annuity",
    ],
  },
  {
    id: "investments",
    label: "Investments & Everest",
    ids: [
      "asset-005-future-value",
      "asset-016-growth-comparison",
      "asset-017-personal-goal",
      "asset-009-everest-142-income",
      "asset-010-everest-128-income",
      "asset-011-everest-128-vs-142",
      "asset-012-strategic-growth",
      "asset-013-everest-income-vs-growth",
    ],
    everestDisclosure: true,
  },
  {
    id: "estate",
    label: "Estate & legacy",
    ids: ["asset-007-estate-duty", "asset-008-estate-reduction"],
  },
  {
    id: "tax",
    label: "Tax",
    ids: ["asset-006-income-tax"],
  },
  {
    id: "insurance",
    label: "Insurance",
    ids: ["asset-015-average-clause"],
  },
] as const;

const calculatorsFAQs = [
  {
    question: "Do these calculators constitute financial advice?",
    answer:
      "No. All tools on this page are educational illustrations only and do not constitute financial, tax, or investment advice under the FAIS Act, 2002. Book a consultation with FSP 17273 for a needs analysis.",
  },
  {
    question: "What does a targeted return profile mean?",
    answer:
      "Figures such as 12.8%, 14.2%, or 14.5% on Everest voluntary products are targeted structural profiles — not guaranteed rates. Liquidity constraints (including notice periods and possible early-exit penalties) apply. Read Understanding Everest before comparing products.",
  },
  {
    question: "Which calculator should I use for a retirement shortfall?",
    answer:
      "Start with ASSET 002 (Retirement Reality Check) and ASSET 001 (Retirement Growth). Living annuity drawdowns are modelled in ASSET 014.",
  },
  {
    question: "Which tool shows estate duty and executor fees?",
    answer:
      "ASSET 007 illustrates duty and executor fee pressure. ASSET 008 models donation-based estate reduction strategies within SARS limits — educational only.",
  },
  {
    question: "What is the Average Clause calculator for?",
    answer:
      "ASSET 015 illustrates how underinsurance can reduce a property claim when the average clause applies. It is not a claim assessment.",
  },
  {
    question: "Are the tools free to use?",
    answer:
      "Yes. The library is open access. We do not gate the index behind an email wall. Lead capture, if any, happens only after you choose to engage further.",
  },
];

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: "The Mathematical Reality Check | Fiduciary Calculators",
  description:
    "Run retirement, estate, insurance, and Everest scenarios yourself — ungated educational ASSET tools. Not FAIS advice. Then book FSP 17273 to interpret your numbers.",
});

function byId(id: string) {
  return CALCULATOR_REGISTRY.find((e) => e.id === id);
}

export default function CalculatorsPage() {
  const faqItems = ensureSixFaqs(calculatorsFAQs);

  return (
    <>
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: buildPageTitle("Financial Calculators & Actuarial Planning Tools"),
          description:
            "Educational planning calculators for retirement, Everest Wealth, estate duty, tax, and insurance.",
        }}
        faqs={faqItems}
      />

      <div style={{ backgroundColor: CANVAS }} className="text-shark">
        <header className="pb-10 pt-28 md:pb-12 md:pt-36 lg:pt-40">
          <div className={HOME4_WRAP}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Planning tools · <span className="tabular-nums">FSP 17273</span>
            </p>
            <h1
              className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
            >
              The mathematical reality check
            </h1>
            <p
              className="mt-5 max-w-2xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              You cannot plan a 30-year retirement or a risk structure on guesswork. Run the numbers
              yourself — retirement longevity, estate liquidity, underinsurance, yield trade-offs —
              before you speak to anyone. Educational only; then bring results to FSP 17273 if you
              want advice.
            </p>
            <aside
              className="mt-8 max-w-3xl border bg-white p-5 text-sm leading-relaxed text-stone-600"
              style={{ borderColor: HAIRLINE }}
              role="note"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                FAIS notice
              </p>
              <p className="mt-2">{FAIS_DISCLAIMER}</p>
            </aside>
            <figure className="mt-10 max-w-4xl">
              <div
                className="relative aspect-[16/9] overflow-hidden border bg-white"
                style={{ borderColor: HAIRLINE }}
              >
                <Image
                  src={CRAFT_STRIP}
                  alt={getAlt(
                    CRAFT_STRIP,
                    "Calculator planning sheets for retirement, tax, estate and premiums on a desk"
                  )}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority={false}
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
                Tools as craft — ungated ASSET calculators so you test assumptions before a sales
                conversation.
              </figcaption>
            </figure>
          </div>
        </header>

        <nav
          aria-label="Calculator domains"
          className="sticky top-0 z-20 border-y bg-[#F7F6F3]/95 backdrop-blur-sm"
          style={{ borderColor: HAIRLINE }}
        >
          <div className={`${HOME4_WRAP} flex flex-wrap gap-x-6 gap-y-2 py-3`}>
            {DOMAINS.map((domain) => (
              <a
                key={domain.id}
                href={`#${domain.id}`}
                className="text-sm font-medium text-stone-700 transition hover:text-cinematic-teal"
              >
                {domain.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={`${HOME4_WRAP} space-y-16 py-14 md:py-20`}>
          {DOMAINS.map((domain) => (
            <section
              key={domain.id}
              id={domain.id}
              className="scroll-mt-24"
              aria-labelledby={`${domain.id}-heading`}
            >
              <h2
                id={`${domain.id}-heading`}
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
              >
                {domain.label}
              </h2>

              {"everestDisclosure" in domain && domain.everestDisclosure ? (
                <div
                  className="mt-6 border p-5 text-sm leading-relaxed text-stone-600"
                  style={{ borderColor: HAIRLINE }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                    Everest voluntary capital — read before opening tools
                  </p>
                  <p className="mt-2">
                    Everest calculators model targeted return profiles on unlisted preference-share
                    structures — not bank guarantees. Typical constraints include a R100,000 minimum,
                    five-year term commitment, 120-day notice, and up to a 15% early exit penalty may
                    apply. Dividends are typically subject to 20% DWT.{" "}
                    <Link href="/everest-wealth/about" prefetch={false} className="font-semibold text-cinematic-teal">
                      Understanding Everest
                    </Link>
                    .
                  </p>
                </div>
              ) : null}

              <ul className="mt-6 border-y" style={{ borderColor: HAIRLINE }}>
                {domain.ids.map((id) => {
                  const entry = byId(id);
                  if (!entry) return null;
                  return (
                    <li key={entry.id} id={entry.id} className="border-b last:border-b-0" style={{ borderColor: HAIRLINE }}>
                      <Link
                        href={calculatorPagePath(entry.id)}
                        prefetch={false}
                        className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-4 transition hover:opacity-90 sm:grid-cols-[7.5rem_1fr_auto]"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 tabular-nums">
                          {entry.assetCode}
                        </span>
                        <h3 className="font-serif text-base font-semibold tracking-tight text-shark group-hover:text-cinematic-teal sm:text-lg">
                          {formatPublicCalculatorTitle(entry).replace(/^AS Brokers\s+/i, "")}
                        </h3>
                        <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-cinematic-teal" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <section className="border-t py-16 md:py-24" style={{ borderColor: HAIRLINE }} aria-labelledby="calc-faq-heading">
          <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
            <h2
              id="calc-faq-heading"
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

        <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />

        <section className="pb-16 md:pb-24" aria-labelledby="calc-terminal-heading">
          <div className={HOME4_WRAP}>
            <div className="mx-auto max-w-3xl border p-8 sm:p-10" style={{ borderColor: HAIRLINE }}>
              <h2
                id="calc-terminal-heading"
                className="font-serif text-2xl font-semibold tracking-tight text-shark"
              >
                Need help interpreting the numbers?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                When a calculation raises more questions than answers, request a Wealth Engineering
                Call. Calculators remain educational; advice requires a needs analysis.
              </p>
              <Link
                href="/contact?source=calculators_terminal"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
              >
                Continue to contact
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
