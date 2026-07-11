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
const CRAFT_STRIP = "/images/calculators-hub-16x9.jpg";

const FAIS_DISCLAIMER =
  "These calculators are illustrative and educational only. They do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes depend on fees, markets, underwriting, and your circumstances. Targeted Everest return profiles are not guarantees.";

type FaqItem = { question: string; answer: string };

/** Even tool rows: leftover cards expand (no stranded empty column). */
function cardGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-4";
  if (count === 2) return "grid grid-cols-1 gap-4 sm:grid-cols-2";
  // Flex wrap: last incomplete row grows to fill width instead of leaving a dead cell.
  return "flex flex-wrap gap-4 [&>*]:min-h-0 [&>*]:min-w-[min(100%,17.5rem)] [&>*]:flex-1 [&>*]:basis-[17.5rem] lg:[&>*]:basis-[calc(33.333%-0.75rem)]";
}

function CalculatorCard({
  tool,
  featured = false,
  anchor = false,
}: {
  tool: HubCalculator;
  featured?: boolean;
  anchor?: boolean;
}) {
  return (
    <article {...(anchor ? { id: tool.id } : {})} className="scroll-mt-28 h-full min-h-0">
      <Link
        href={tool.href}
        prefetch={false}
        className={`group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 transition hover:ring-cinematic-teal/50 sm:p-5 ${
          featured ? "ring-samsung-blue/25 shadow-sm" : "ring-stone-200/90"
        }`}
      >
        <p
          className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] tabular-nums"
          style={{ color: TEAL }}
        >
          {tool.assetCode}
        </p>
        <h3
          className="mt-2 font-bold tracking-tight text-shark group-hover:text-cinematic-teal"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", lineHeight: 1.3 }}
        >
          {tool.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
          {tool.problem}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue">
          Open
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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

/**
 * Calculators hub: 12-col shell for page chrome, nested even card grids for tools.
 * Headers never share a CSS-grid row with cards (avoids orphan columns).
 */
export function CalculatorsHubView({ faqItems }: Props) {
  const featured = getHubFeaturedCalculators();

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="border-b pb-10 pt-28 md:pb-12 md:pt-36 lg:pt-40" style={{ borderColor: HAIRLINE }}>
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`}>
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
              Albert&apos;s ASSET library · FSP 17273 · Ungated
            </p>
            <h1
              className="mt-3 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.4rem + 1.8vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Run the numbers before anyone sells you a product
            </h1>
            <p
              className="mt-4 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", color: BODY }}
            >
              Seventeen educational calculators for retirement, Everest income, estate duty, tax, and
              underinsurance. Test assumptions yourself, then book a capital assessment if you want
              advice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#start-here"
                className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
              >
                Start here
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#investments"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                style={{ color: INK }}
              >
                Everest tools
              </a>
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-4 lg:col-span-5">
            <aside
              className="rounded-2xl bg-white/80 p-4 text-sm leading-relaxed ring-1 ring-stone-200/90"
              style={{ color: BODY }}
              role="note"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-stone-500">
                FAIS notice
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed">{FAIS_DISCLAIMER}</p>
            </aside>
            <figure className="overflow-hidden rounded-2xl ring-1 ring-stone-200/90">
              <div className="relative aspect-[2/1] bg-white sm:aspect-[16/9] lg:aspect-[2/1]">
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
            </figure>
          </div>
        </div>
      </header>

      <nav
        aria-label="Calculator domains"
        className="sticky top-0 z-20 border-b bg-[#F7F6F3]/95 backdrop-blur-sm"
        style={{ borderColor: HAIRLINE }}
      >
        <div className={`${HOME4_WRAP} flex flex-wrap items-center gap-x-5 gap-y-2 py-3`}>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-stone-500">
            Jump
          </span>
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
      </nav>

      {/* Featured: header row, then separate 3-col card row */}
      <section
        id="start-here"
        className="scroll-mt-24 border-b py-10 md:py-12"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="start-here-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
              Where most visitors begin
            </p>
            <h2
              id="start-here-heading"
              className="mt-2 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
            >
              Three tools. Three common problems.
            </h2>
            <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
              Pick the problem that sounds like yours. Tools stay ungated.
            </p>
          </div>
          <div className={`mt-6 ${cardGridClass(featured.length)}`}>
            {featured.map((tool) => (
              <CalculatorCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      {HUB_DOMAINS.map((domain) => {
        const tools = getHubDomainCalculators(domain);
        return (
          <section
            key={domain.id}
            id={domain.id}
            className="scroll-mt-24 border-b py-10 md:py-12"
            style={{ borderColor: HAIRLINE }}
            aria-labelledby={`${domain.id}-heading`}
          >
            <div className={HOME4_WRAP}>
              <div className="max-w-2xl">
                <h2
                  id={`${domain.id}-heading`}
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
                >
                  {domain.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {domain.lead}
                </p>
              </div>

              {domain.everestDisclosure ? (
                <div
                  className="mt-5 rounded-2xl bg-white p-4 text-sm leading-relaxed ring-1 ring-stone-200/90"
                  style={{ color: BODY }}
                >
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-stone-500">
                    Everest voluntary capital, read before opening tools
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed">
                    Targeted return profiles on unlisted preference-share structures, not bank
                    guarantees. R100,000 min · five-year term · 120-day notice · up to 15% early exit
                    penalty may apply · 20% DWT typical.{" "}
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
              ) : null}

              <div className={`mt-6 ${cardGridClass(tools.length)}`}>
                {tools.map((tool) => (
                  <CalculatorCard key={tool.id} tool={tool} anchor />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-b py-10 md:py-14" style={{ borderColor: HAIRLINE }} aria-labelledby="calc-faq-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-10`}>
          <div className="col-span-12 lg:col-span-4">
            <h2
              id="calc-faq-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
              Education first. Advice only after a needs analysis with FSP 17273.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="divide-y border-y" style={{ borderColor: HAIRLINE }}>
              {faqItems.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="cursor-pointer list-none font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-sm sm:text-base">{item.question}</span>
                      <span
                        className="shrink-0 text-cinematic-teal transition group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />

      <section className="pb-14 md:pb-20" aria-labelledby="calc-terminal-heading">
        <div className={HOME4_WRAP}>
          <div className="rounded-2xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-6 ring-1 ring-samsung-blue/15 sm:p-8 md:flex md:items-end md:justify-between md:gap-8">
            <div className="max-w-xl">
              <h2
                id="calc-terminal-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
              >
                Need help interpreting the numbers?
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                Calculators stay educational. For Everest suitability, retirement longevity, estate
                liquidity, or cover gaps, speak with an independent Category 1.8 adviser.
              </p>
            </div>
            <div className="mt-5 flex shrink-0 flex-wrap gap-3 md:mt-0">
              <Link
                href="/contact?source=calculators_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
              >
                Book assessment
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
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
