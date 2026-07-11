import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import {
  HUB_DOMAINS,
  getHubDomainCalculators,
  getHubFeaturedCalculators,
  type HubCalculator,
} from "@/lib/calculators/hub-catalog";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const HAIRLINE = "#E5E5E5";
const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;
const CRAFT_STRIP = "/images/calculators-hub-16x9.jpg";

const FAIS_DISCLAIMER =
  "These calculators are illustrative and educational only. They do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes depend on fees, markets, underwriting, and your circumstances. Targeted Everest return profiles are not guarantees.";

type FaqItem = { question: string; answer: string };

function CalculatorCard({
  tool,
  featured = false,
  anchor = false,
}: {
  tool: HubCalculator;
  featured?: boolean;
  /** Stable hub deep-link target (`#asset-00x-...`). Only one per id. */
  anchor?: boolean;
}) {
  return (
    <article {...(anchor ? { id: tool.id } : {})} className="scroll-mt-28 h-full">
      <Link
        href={tool.href}
        prefetch={false}
        className={`group flex h-full flex-col bg-white p-5 transition hover:ring-cinematic-teal/40 sm:p-6 ${
          featured
            ? "rounded-3xl shadow-lg ring-1 ring-samsung-blue/20"
            : "rounded-2xl ring-1 ring-stone-200/90"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em] tabular-nums"
            style={{ color: TEAL }}
          >
            {tool.assetCode}
          </p>
          {featured ? (
            <span className="rounded-full bg-samsung-blue/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-samsung-blue">
              Start here
            </span>
          ) : null}
        </div>
        <h3
          className="mt-3 font-bold tracking-tight text-shark group-hover:text-cinematic-teal"
          style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", lineHeight: 1.25 }}
        >
          {tool.title}
        </h3>
        <p
          className="mt-2 flex-1 text-sm leading-relaxed"
          style={{ color: BODY }}
        >
          {tool.problem}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue">
          Open calculator
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </article>
  );
}

type Props = {
  faqItems: FaqItem[];
};

/** Grid-first public calculators hub: start here → domains → FAQ → convert. */
export function CalculatorsHubView({ faqItems }: Props) {
  const featured = getHubFeaturedCalculators();

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* Hero: 12-col grid */}
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pt-40">
        <div className={GRID}>
          <div className="col-span-12 lg:col-span-7">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: TEAL }}
            >
              Albert&apos;s ASSET library · FSP 17273 · Ungated
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 1.45rem + 2.2vw, 3.25rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Run the numbers before anyone sells you a product
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
            >
              Seventeen educational calculators for retirement longevity, Everest income profiles,
              estate duty, tax, and underinsurance. Test your own assumptions, then book a capital
              assessment if you want independent advice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#start-here"
                className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e]"
              >
                Start with a recommended tool
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#investments"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                style={{ color: INK }}
              >
                Browse Everest tools
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <aside
              className="rounded-2xl bg-white p-5 text-sm leading-relaxed ring-1 ring-stone-200/90"
              style={{ color: BODY }}
              role="note"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                FAIS notice
              </p>
              <p className="mt-2">{FAIS_DISCLAIMER}</p>
            </aside>
            <figure className="mt-6 overflow-hidden rounded-2xl ring-1 ring-stone-200/90">
              <div className="relative aspect-[16/10] bg-white">
                <Image
                  src={CRAFT_STRIP}
                  alt={getAlt(
                    CRAFT_STRIP,
                    "Calculator planning sheets for retirement, tax, estate and premiums on a desk"
                  )}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority={false}
                />
              </div>
              <figcaption className="bg-white px-4 py-3 text-xs leading-relaxed text-stone-500">
                Craft, not theatre. Tools stay free so you arrive informed.
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      {/* Sticky domain jump: grid row */}
      <nav
        aria-label="Calculator domains"
        className="sticky top-0 z-20 border-y bg-[#F7F6F3]/95 backdrop-blur-sm"
        style={{ borderColor: HAIRLINE }}
      >
        <div className={`${GRID} items-center py-3`}>
          <p className="col-span-12 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 sm:col-span-3 lg:col-span-2">
            Jump to
          </p>
          <div className="col-span-12 flex flex-wrap gap-x-5 gap-y-2 sm:col-span-9 lg:col-span-10">
            <a
              href="#start-here"
              className="text-sm font-medium text-stone-700 transition hover:text-cinematic-teal"
            >
              Start here
            </a>
            {HUB_DOMAINS.map((domain) => (
              <a
                key={domain.id}
                href={`#${domain.id}`}
                className="text-sm font-medium text-stone-700 transition hover:text-cinematic-teal"
              >
                {domain.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Featured starters */}
      <section
        id="start-here"
        className="scroll-mt-24 border-b py-14 md:py-16"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="start-here-heading"
      >
        <div className={GRID}>
          <div className="col-span-12 lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
              Where most visitors begin
            </p>
            <h2
              id="start-here-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
            >
              Three tools. Three common problems.
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: BODY }}>
              Pick the problem that sounds like yours. Every tool is ungated. Soft lead capture sits
              after the calculator if you want an adviser to walk through the numbers.
            </p>
          </div>
          {featured.map((tool) => (
            <div key={tool.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <CalculatorCard tool={tool} featured />
            </div>
          ))}
        </div>
      </section>

      {/* Domain grids */}
      {HUB_DOMAINS.map((domain) => {
        const tools = getHubDomainCalculators(domain);
        return (
          <section
            key={domain.id}
            id={domain.id}
            className="scroll-mt-24 border-b py-14 md:py-16"
            style={{ borderColor: HAIRLINE }}
            aria-labelledby={`${domain.id}-heading`}
          >
            <div className={GRID}>
              <div className="col-span-12 lg:col-span-8">
                <h2
                  id={`${domain.id}-heading`}
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
                >
                  {domain.label}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: BODY }}>
                  {domain.lead}
                </p>
              </div>

              {domain.everestDisclosure ? (
                <div className="col-span-12">
                  <div
                    className="rounded-2xl bg-white p-5 text-sm leading-relaxed ring-1 ring-stone-200/90"
                    style={{ color: BODY }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                      Everest voluntary capital, read before opening tools
                    </p>
                    <p className="mt-2">
                      Everest calculators model targeted return profiles on unlisted preference-share
                      structures, not bank guarantees. Typical constraints include a R100,000 minimum,
                      five-year term commitment, 120-day notice, and up to a 15% early exit penalty may
                      apply. Dividends are typically subject to 20% DWT.{" "}
                      <Link
                        href="/everest-wealth/about"
                        prefetch={false}
                        className="font-semibold text-cinematic-teal"
                      >
                        Understanding Everest
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              ) : null}

              {tools.map((tool) => (
                <div key={tool.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
                  <CalculatorCard tool={tool} anchor />
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="py-14 md:py-20" aria-labelledby="calc-faq-heading">
        <div className={GRID}>
          <div className="col-span-12 lg:col-span-4">
            <h2
              id="calc-faq-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2rem)", color: INK }}
            >
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
              Education first. Advice only after a needs analysis with FSP 17273.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="divide-y border-y" style={{ borderColor: HAIRLINE }}>
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <span>{item.question}</span>
                      <span
                        className="shrink-0 text-cinematic-teal transition group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />

      {/* Terminal convert */}
      <section className="pb-16 md:pb-24" aria-labelledby="calc-terminal-heading">
        <div className={GRID}>
          <div className="col-span-12 rounded-3xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-8 ring-1 ring-samsung-blue/15 sm:p-10 lg:col-span-10 lg:col-start-2">
            <h2
              id="calc-terminal-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
            >
              Need help interpreting the numbers?
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: BODY }}>
              Calculators stay educational. When you want clarity on Everest suitability, retirement
              longevity, estate liquidity, or cover gaps, speak with an independent Category 1.8
              adviser, not a call centre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact?source=calculators_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#004a9e]"
              >
                Book a capital assessment
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                style={{ color: INK }}
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
