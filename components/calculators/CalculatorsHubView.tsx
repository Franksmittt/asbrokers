import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
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

/** Continuous Document tokens, matched to Estate / Retirement hubs. */
const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const INSET = "rgba(29,29,31,0.05)";
const CRAFT_STRIP = "/images/calculators-hub-16x9.jpg";

const FAIS_DISCLAIMER =
  "These calculators are illustrative and educational only. They do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Actual outcomes depend on fees, markets, underwriting, and your circumstances. Targeted Everest return profiles are not guarantees.";

const PAIRED_DOMAIN_IDS = new Set(["tax", "insurance"]);

type FaqItem = { question: string; answer: string };

function cardGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-5";
  if (count === 2) return "grid grid-cols-1 gap-5 sm:grid-cols-2";
  if (count === 3) return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3";
  return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3";
}

/** One card language everywhere (light chapters, shark chapters, split pair). */
function CalculatorCard({
  tool,
  anchor = false,
}: {
  tool: HubCalculator;
  anchor?: boolean;
}) {
  return (
    <article
      {...(anchor ? { id: tool.id } : {})}
      className="flex h-full scroll-mt-28 flex-col border bg-white p-6 sm:p-7"
      style={{ borderColor: HAIRLINE }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 tabular-nums">
        {tool.assetCode}
      </p>
      <h3
        className="mt-3 font-serif font-semibold tracking-tight text-shark"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)" }}
      >
        {tool.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{tool.problem}</p>
      <Link
        href={tool.href}
        prefetch={false}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal transition hover:opacity-80"
      >
        Run calculation
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

function SectionHeader({
  kicker,
  headingId,
  title,
  lead,
  invert = false,
}: {
  kicker: string;
  headingId: string;
  title: string;
  lead?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          invert ? "text-cinematic-teal" : "text-cinematic-teal"
        }`}
      >
        {kicker}
      </p>
      <h2
        id={headingId}
        className={`mt-3 font-serif font-semibold tracking-tight ${
          invert ? "text-white" : ""
        }`}
        style={{
          fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)",
          color: invert ? undefined : INK,
        }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-base ${
            invert ? "text-white/70" : ""
          }`}
          style={invert ? undefined : { color: BODY }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function DomainChapter({ domain }: { domain: HubDomain }) {
  const tools = getHubDomainCalculators(domain);
  const toolLabel = tools.length === 1 ? "1 tool" : `${tools.length} tools`;

  return (
    <section
      id={domain.id}
      className="scroll-mt-28 border-b pb-16 pt-14 md:pb-24 md:pt-20"
      style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
      aria-labelledby={`${domain.id}-heading`}
    >
      <div className={HOME4_WRAP}>
        <SectionHeader
          kicker={toolLabel}
          headingId={`${domain.id}-heading`}
          title={domain.label}
          lead={domain.lead}
        />

        {domain.everestDisclosure ? (
          <aside
            className="mt-8 max-w-3xl rounded-lg p-5 text-sm leading-relaxed"
            style={{ backgroundColor: INSET, color: BODY }}
            role="note"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              Everest voluntary capital, read before opening tools
            </p>
            <p className="mt-2">
              Targeted return profiles on unlisted preference-share structures, not bank guarantees.
              R100,000 min · five-year term · 120-day notice · up to 15% early exit penalty may apply ·
              20% DWT typical.{" "}
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="font-semibold text-cinematic-teal hover:opacity-80"
              >
                Understanding Everest
              </Link>
              .
            </p>
          </aside>
        ) : null}

        <div className={`mt-10 ${cardGridClass(tools.length)}`}>
          {tools.map((tool) => (
            <CalculatorCard key={tool.id} tool={tool} anchor />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Keep the light | dark pair the user liked; same card language inside both halves. */
function PairedDomainRow({ domains }: { domains: readonly HubDomain[] }) {
  return (
    <section className="border-b" style={{ borderColor: HAIRLINE }} aria-label="Tax and insurance">
      <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
        {domains.map((domain, index) => {
          const tools = getHubDomainCalculators(domain);
          const toolLabel = tools.length === 1 ? "1 tool" : `${tools.length} tools`;
          const dark = index % 2 === 1;

          return (
            <div
              key={domain.id}
              id={domain.id}
              className={`scroll-mt-28 px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:px-10 ${
                dark ? "bg-shark text-white" : ""
              }`}
              style={dark ? undefined : { backgroundColor: CANVAS }}
              aria-labelledby={`${domain.id}-heading`}
            >
              <div className="mx-auto flex h-full w-full max-w-xl flex-col lg:max-w-lg">
                <SectionHeader
                  kicker={toolLabel}
                  headingId={`${domain.id}-heading`}
                  title={domain.label}
                  lead={domain.lead}
                  invert={dark}
                />
                <div className="mt-8 flex flex-1 flex-col gap-5">
                  {tools.map((tool) => (
                    <CalculatorCard key={tool.id} tool={tool} anchor />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

type Props = {
  faqItems: FaqItem[];
};

/**
 * Calculators hub, Continuous Document unity:
 * Canvas chapters + one Shark "Start here" + Tax|Insurance split + inset terminal.
 * Same hairline ToolCard as Estate / Retirement.
 */
export function CalculatorsHubView({ faqItems }: Props) {
  const featured = getHubFeaturedCalculators();
  const mainDomains = HUB_DOMAINS.filter((d) => !PAIRED_DOMAIN_IDS.has(d.id));
  const pairedDomains = HUB_DOMAINS.filter((d) => PAIRED_DOMAIN_IDS.has(d.id));

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* 1. Hero */}
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-12 items-start gap-10 lg:gap-12`}>
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Albert&apos;s ASSET library · FSP 17273 · Ungated
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)",
                lineHeight: 1.15,
                color: INK,
              }}
            >
              Run the numbers before anyone sells you a product
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              Seventeen educational calculators for retirement, Everest income, estate duty, tax, and
              underinsurance. Test assumptions yourself, then book a capital assessment if you want
              advice.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#start-here"
                className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Start here
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#investments"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
              >
                Browse Everest tools
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-5 lg:col-span-5">
            <aside
              className="border bg-white p-5 text-sm leading-relaxed"
              style={{ borderColor: HAIRLINE, color: BODY }}
              role="note"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                FAIS notice
              </p>
              <p className="mt-2 text-[13px] leading-relaxed">{FAIS_DISCLAIMER}</p>
            </aside>
            <figure className="border bg-white" style={{ borderColor: HAIRLINE }}>
              <div className="relative aspect-[16/10]">
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
              <figcaption className="border-t px-4 py-3 text-[11px] leading-relaxed text-stone-500" style={{ borderColor: HAIRLINE }}>
                Craft, not theatre. Tools stay free so you arrive informed.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* 2. On this page, non-sticky */}
        <nav
          aria-label="On this page"
          className={`${HOME4_WRAP} mt-12 border-t pt-6`}
          style={{ borderColor: HAIRLINE }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            On this page
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <a href="#start-here" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Start here
            </a>
            {HUB_DOMAINS.map((domain) => (
              <a
                key={domain.id}
                href={`#${domain.id}`}
                className="text-sm font-medium text-stone-700 hover:text-cinematic-teal"
              >
                {domain.label}
              </a>
            ))}
            <a href="#faq" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              FAQ
            </a>
          </div>
        </nav>
      </header>

      {/* 3. Start here, one Shark Chapter */}
      <section
        id="start-here"
        className="scroll-mt-28 bg-shark py-16 text-white md:py-24"
        aria-labelledby="start-here-heading"
      >
        <div className={HOME4_WRAP}>
          <SectionHeader
            kicker="Where most visitors begin"
            headingId="start-here-heading"
            title="Three tools. Three common problems."
            lead="Pick the problem that sounds like yours. Tools stay ungated. Soft lead capture sits after each calculator if you want an adviser on the numbers."
            invert
          />
          <div className={`mt-10 ${cardGridClass(featured.length)}`}>
            {featured.map((tool) => (
              <CalculatorCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. How this library works */}
      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="how-library-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 lg:gap-12`}>
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader
              kicker="How this library works"
              headingId="how-library-heading"
              title="Educate, calculate, then decide if you need advice"
            />
          </div>
          <ol className="col-span-12 space-y-0 divide-y lg:col-span-8" style={{ borderColor: HAIRLINE }}>
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
                className="grid grid-cols-[3rem_1fr] gap-4 py-6 first:pt-0 last:pb-0"
                style={{ borderColor: HAIRLINE }}
              >
                <span className="text-[11px] font-semibold tabular-nums text-stone-500">{item.step}</span>
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5–7. Domain chapters */}
      {mainDomains.map((domain) => (
        <DomainChapter key={domain.id} domain={domain} />
      ))}

      {/* 8. Tax | Insurance split */}
      <PairedDomainRow domains={pairedDomains} />

      {/* 9. FAQ, canvas hairline */}
      <section
        id="faq"
        className="scroll-mt-28 border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="calc-faq-heading"
      >
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <SectionHeader
            kicker="Before you book"
            headingId="calc-faq-heading"
            title="Straight answers on advice, Everest, and which tool to open"
            lead="Education first. Personal financial advice only after a needs analysis with AS Brokers CC, FSP 17273."
          />
          <div className="mt-10 divide-y border-y" style={{ borderColor: HAIRLINE }}>
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-serif font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-base leading-snug sm:text-lg">{item.question}</span>
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
          <p className="mt-8 text-sm">
            <Link
              href="/everest-wealth/about"
              prefetch={false}
              className="font-semibold text-cinematic-teal hover:opacity-80"
            >
              Understanding Everest
            </Link>
            <span className="mx-2 text-stone-400">·</span>
            <Link
              href="/contact?source=calculators_faq"
              prefetch={false}
              className="font-semibold text-cinematic-teal hover:opacity-80"
            >
              Book a capital assessment
            </Link>
          </p>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />

      {/* 10. Inset terminal */}
      <section className="pb-16 md:pb-24" aria-labelledby="calc-terminal-heading">
        <div className={HOME4_WRAP}>
          <div className="mx-auto max-w-[1000px] rounded-xl bg-shark px-6 py-10 text-white sm:px-10 sm:py-12 md:flex md:items-end md:justify-between md:gap-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                Next step
              </p>
              <h2
                id="calc-terminal-heading"
                className="mt-3 font-serif text-2xl font-semibold tracking-tight text-white"
              >
                Need help interpreting the numbers?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Calculators stay educational. For Everest suitability, retirement longevity, estate
                liquidity, or cover gaps, speak with an independent Category 1.8 adviser.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col items-start gap-3 md:mt-0 md:items-end">
              <Link
                href="/contact?source=calculators_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Book a capital assessment
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Or WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
