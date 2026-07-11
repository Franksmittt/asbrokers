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
  type HubDomain,
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

type SectionTone = "light" | "dark";

/** Even tool rows: leftover cards expand (no stranded empty column). */
function cardGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-4";
  if (count === 2) return "grid grid-cols-1 gap-4 sm:grid-cols-2";
  return "flex flex-wrap gap-4 [&>*]:min-h-0 [&>*]:min-w-[min(100%,17.5rem)] [&>*]:flex-1 [&>*]:basis-[17.5rem] lg:[&>*]:basis-[calc(33.333%-0.75rem)]";
}

function domainTone(domainId: string): SectionTone {
  // Alternating chapter rhythm: Everest light, retirement dark, estate light, tax dark, insurance light.
  if (domainId === "retirement" || domainId === "tax") return "dark";
  return "light";
}

function CalculatorCard({
  tool,
  featured = false,
  anchor = false,
  tone = "light",
}: {
  tool: HubCalculator;
  featured?: boolean;
  anchor?: boolean;
  tone?: SectionTone;
}) {
  const dark = tone === "dark";
  return (
    <article {...(anchor ? { id: tool.id } : {})} className="scroll-mt-28 h-full min-h-0">
      <Link
        href={tool.href}
        prefetch={false}
        className={`group flex h-full flex-col rounded-2xl p-5 ring-1 transition sm:p-5 ${
          dark
            ? "bg-white/[0.06] ring-white/10 hover:bg-white/[0.1] hover:ring-cinematic-teal/40"
            : featured
              ? "bg-white ring-samsung-blue/25 shadow-sm hover:ring-cinematic-teal/50"
              : "bg-white ring-stone-200/90 hover:ring-cinematic-teal/50"
        }`}
      >
        <p
          className={`text-[0.6875rem] font-semibold uppercase tracking-[0.14em] tabular-nums ${
            dark ? "text-cinematic-teal" : ""
          }`}
          style={dark ? undefined : { color: TEAL }}
        >
          {tool.assetCode}
        </p>
        <h3
          className={`mt-2 font-bold tracking-tight group-hover:text-cinematic-teal ${
            dark ? "text-white" : "text-shark"
          }`}
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", lineHeight: 1.3 }}
        >
          {tool.title}
        </h3>
        <p
          className={`mt-2 flex-1 text-sm leading-relaxed ${
            dark ? "text-white/70" : ""
          }`}
          style={dark ? undefined : { color: BODY }}
        >
          {tool.problem}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${
            dark ? "text-cinematic-teal" : "text-samsung-blue"
          }`}
        >
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

function DomainSection({ domain }: { domain: HubDomain }) {
  const tools = getHubDomainCalculators(domain);
  const tone = domainTone(domain.id);
  const dark = tone === "dark";

  return (
    <section
      id={domain.id}
      className={`scroll-mt-24 py-12 md:py-16 ${dark ? "bg-shark text-white" : "border-b"}`}
      style={dark ? undefined : { borderColor: HAIRLINE, backgroundColor: CANVAS }}
      aria-labelledby={`${domain.id}-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="max-w-2xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              dark ? "text-cinematic-teal" : ""
            }`}
            style={dark ? undefined : { color: TEAL }}
          >
            {tools.length} tools
          </p>
          <h2
            id={`${domain.id}-heading`}
            className={`mt-2 font-bold tracking-tight ${dark ? "text-white" : ""}`}
            style={{
              fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)",
              color: dark ? undefined : INK,
            }}
          >
            {domain.label}
          </h2>
          <p
            className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : ""}`}
            style={dark ? undefined : { color: BODY }}
          >
            {domain.lead}
          </p>
        </div>

        {domain.everestDisclosure ? (
          <div
            className={`mt-5 rounded-2xl p-4 text-sm leading-relaxed ring-1 ${
              dark
                ? "bg-white/[0.06] text-white/75 ring-white/10"
                : "bg-shark text-white/80 ring-shark"
            }`}
          >
            <p
              className={`text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
                dark ? "text-cinematic-teal" : "text-cinematic-teal"
              }`}
            >
              Everest voluntary capital, read before opening tools
            </p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed">
              Targeted return profiles on unlisted preference-share structures, not bank guarantees.
              R100,000 min · five-year term · 120-day notice · up to 15% early exit penalty may apply ·
              20% DWT typical.{" "}
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="font-semibold text-cinematic-teal underline-offset-2 hover:underline"
              >
                Understanding Everest
              </Link>
              .
            </p>
          </div>
        ) : null}

        <div className={`mt-6 ${cardGridClass(tools.length)}`}>
          {tools.map((tool) => (
            <CalculatorCard key={tool.id} tool={tool} anchor tone={tone} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Props = {
  faqItems: FaqItem[];
};

/**
 * Calculators hub: light/dark chapter rhythm, even card grids, substantive FAQ.
 */
export function CalculatorsHubView({ faqItems }: Props) {
  const featured = getHubFeaturedCalculators();

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* Light hero */}
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
              className="rounded-2xl bg-shark p-4 text-sm leading-relaxed text-white/80"
              role="note"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cinematic-teal">
                FAIS notice
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/75">{FAIS_DISCLAIMER}</p>
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

      {/* Dark: start here */}
      <section
        id="start-here"
        className="scroll-mt-24 bg-shark py-12 text-white md:py-16"
        aria-labelledby="start-here-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 max-w-2xl lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                Where most visitors begin
              </p>
              <h2
                id="start-here-heading"
                className="mt-2 font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)" }}
              >
                Three tools. Three common problems.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
                Pick the problem that sounds like yours. Tools stay ungated. If you want an adviser
                on the numbers afterward, leave details on the calculator page or WhatsApp us.
              </p>
            </div>
            <div className="col-span-12 grid grid-cols-3 gap-3 lg:col-span-5 lg:content-end">
              {[
                { n: "01", label: "Income" },
                { n: "02", label: "Shortfall" },
                { n: "03", label: "Estate" },
              ].map((step) => (
                <div
                  key={step.n}
                  className="rounded-xl bg-white/[0.06] px-3 py-3 ring-1 ring-white/10"
                >
                  <p className="text-[0.65rem] font-semibold tabular-nums text-cinematic-teal">
                    {step.n}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/90">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`mt-8 ${cardGridClass(featured.length)}`}>
            {featured.map((tool) => (
              <CalculatorCard key={tool.id} tool={tool} featured tone="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* Light: how the library works */}
      <section
        className="border-b py-12 md:py-14"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="how-library-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`}>
          <div className="col-span-12 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
              How this library works
            </p>
            <h2
              id="how-library-heading"
              className="mt-2 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              Educate, calculate, then decide if you need advice
            </h2>
          </div>
          <ol className="col-span-12 grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {[
              {
                step: "01",
                title: "Read the problem",
                body: "Each tool answers one question. Skim the one-line problem before you open it.",
              },
              {
                step: "02",
                title: "Run your numbers",
                body: "Illustrative only under FAIS. Change inputs until the picture matches your situation.",
              },
              {
                step: "03",
                title: "Bring results in",
                body: "Book a capital assessment or WhatsApp when you want FSP 17273 to interpret the maths.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-2xl bg-white p-5 ring-1 ring-stone-200/90"
              >
                <p className="text-[0.6875rem] font-semibold tabular-nums" style={{ color: TEAL }}>
                  {item.step}
                </p>
                <h3 className="mt-2 font-bold tracking-tight text-shark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {HUB_DOMAINS.map((domain) => (
        <DomainSection key={domain.id} domain={domain} />
      ))}

      {/* Dark FAQ revamp */}
      <section
        className="bg-shark py-14 text-white md:py-20"
        aria-labelledby="calc-faq-heading"
        id="faq"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-8 lg:gap-12`}>
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Before you book
            </p>
            <h2
              id="calc-faq-heading"
              className="mt-2 font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)" }}
            >
              Straight answers on advice, Everest, and which tool to open
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Education first. Personal financial advice only after a needs analysis with AS Brokers
              CC, FSP 17273.
            </p>
            <div className="mt-6 hidden gap-3 lg:flex lg:flex-col">
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="text-sm font-semibold text-cinematic-teal underline-offset-2 hover:underline"
              >
                Understanding Everest
              </Link>
              <Link
                href="/contact?source=calculators_faq"
                prefetch={false}
                className="text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Book a capital assessment
              </Link>
            </div>
          </div>

          <div className="col-span-12 space-y-3 lg:col-span-8">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group rounded-2xl bg-white/[0.06] ring-1 ring-white/10 open:bg-white/[0.09] open:ring-cinematic-teal/30"
              >
                <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-4 p-5 sm:p-6">
                    <span className="mt-0.5 shrink-0 text-[0.6875rem] font-semibold tabular-nums text-cinematic-teal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-1 items-start justify-between gap-4">
                      <span className="font-semibold leading-snug text-white text-sm sm:text-base">
                        {item.question}
                      </span>
                      <span
                        className="mt-0.5 shrink-0 text-lg leading-none text-cinematic-teal transition group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </span>
                </summary>
                <div className="border-t border-white/10 px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                  <p className="pl-8 text-sm leading-relaxed text-white/70 sm:pl-10">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />

      {/* Light terminal with dark CTA block */}
      <section className="pb-14 md:pb-20" aria-labelledby="calc-terminal-heading">
        <div className={HOME4_WRAP}>
          <div className="rounded-2xl bg-shark p-6 text-white sm:p-8 md:flex md:items-end md:justify-between md:gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                Next step
              </p>
              <h2
                id="calc-terminal-heading"
                className="mt-2 font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)" }}
              >
                Need help interpreting the numbers?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Calculators stay educational. For Everest suitability, retirement longevity, estate
                liquidity, or cover gaps, speak with an independent Category 1.8 adviser.
              </p>
            </div>
            <div className="mt-5 flex shrink-0 flex-wrap gap-3 md:mt-0">
              <Link
                href="/contact?source=calculators_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-2xl bg-cinematic-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Book assessment
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
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
