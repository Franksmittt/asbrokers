import Link from "next/link";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { ArrowRight } from "@/components/icons";
import {
  HUB_DOMAINS,
  getHubDomainCalculators,
  type HubCalculator,
  type HubDomain,
} from "@/lib/calculators/hub-catalog";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";
const PAIRED_DOMAIN_IDS = new Set(["tax", "insurance"]);

function cardGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-5";
  if (count === 2) return "grid grid-cols-1 gap-5 sm:grid-cols-2";
  if (count === 3) return "grid grid-cols-1 items-stretch gap-5 md:grid-cols-3";
  if (count === 8) return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4";
  if (count === 5) return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-6";
  return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3";
}

function cardSpanClass(count: number, index: number): string {
  if (count === 5) return index < 3 ? "lg:col-span-2" : "lg:col-span-3";
  return "";
}

function CalculatorCard({ tool, anchor = false }: { tool: HubCalculator; anchor?: boolean }) {
  return (
    <article
      {...(anchor ? { id: tool.id } : {})}
      className="flex h-full min-w-0 scroll-mt-28 flex-col border bg-white p-5 sm:p-7"
      style={{ borderColor: HAIRLINE }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.16em] tabular-nums"
        style={{ color: MUTED }}
      >
        {tool.assetCode}
      </p>
      <h3 className="mt-3 text-lg font-serif font-semibold tracking-tight text-shark sm:text-xl">
        {tool.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{tool.problem}</p>
      <Link
        href={tool.href}
        prefetch={false}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
        style={{ color: TEAL }}
      >
        Run calculation
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

function CalculatorGrid({ tools, anchor = false }: { tools: HubCalculator[]; anchor?: boolean }) {
  const count = tools.length;
  return (
    <div className={`mt-10 ${cardGridClass(count)}`}>
      {tools.map((tool, index) => {
        const span = cardSpanClass(count, index);
        if (!span) return <CalculatorCard key={tool.id} tool={tool} anchor={anchor} />;
        return (
          <div key={tool.id} className={`flex min-h-0 flex-col ${span}`}>
            <CalculatorCard tool={tool} anchor={anchor} />
          </div>
        );
      })}
    </div>
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
    <div className="min-w-0 max-w-2xl">
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
        style={{ color: invert ? TEAL_ON_DARK : TEAL }}
      >
        {kicker}
      </p>
      <h2
        id={headingId}
        className={`mt-3 text-2xl font-serif font-semibold tracking-tight sm:text-[1.75rem] ${
          invert ? "text-white" : ""
        }`}
        style={{ color: invert ? undefined : INK }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-base ${invert ? "text-white/70" : ""}`}
          style={invert ? undefined : { color: BODY }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function domainChapterDark(domainId: string): boolean {
  return domainId === "investments" || domainId === "estate";
}

function DomainChapter({ domain }: { domain: HubDomain }) {
  const tools = getHubDomainCalculators(domain);
  const toolLabel = tools.length === 1 ? "1 tool" : `${tools.length} tools`;
  const isEverest = Boolean(domain.everestDisclosure);
  const dark = domainChapterDark(domain.id);

  return (
    <section
      id={domain.id}
      className={`scroll-mt-28 content-visibility-auto pb-16 pt-14 md:pb-24 md:pt-20 ${
        dark ? "bg-shark text-white" : "border-b"
      }`}
      style={dark ? undefined : { borderColor: HAIRLINE, backgroundColor: CANVAS }}
      aria-labelledby={`${domain.id}-heading`}
    >
      <div className={HOME4_WRAP}>
        {isEverest ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <SectionHeader
                kicker={toolLabel}
                headingId={`${domain.id}-heading`}
                title={domain.label}
                lead={domain.lead}
                invert={dark}
              />
              <p className="mt-6 text-sm">
                <Link
                  href="/everest-wealth/about"
                  prefetch={false}
                  className="inline-flex items-center gap-2 font-semibold hover:opacity-80"
                  style={{ color: dark ? TEAL_ON_DARK : TEAL }}
                >
                  Understanding Everest
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </p>
            </div>
            <aside
              className="min-w-0 border bg-white lg:col-span-6"
              style={{ borderColor: HAIRLINE }}
              role="note"
              aria-label="Everest voluntary capital constraints"
            >
              <div className="border-b px-5 py-4 sm:px-6" style={{ borderColor: HAIRLINE }}>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  Before you open these tools
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  Targeted return profiles on unlisted preference shares, not bank guarantees.
                </p>
              </div>
              <dl
                className="grid grid-cols-2 gap-px sm:grid-cols-3"
                style={{ backgroundColor: HAIRLINE }}
              >
                {[
                  { dt: "Minimum", dd: "R100,000" },
                  { dt: "Term", dd: "5 years" },
                  { dt: "Notice", dd: "120 days" },
                  { dt: "Early exit", dd: "Up to 15% may apply" },
                  { dt: "Tax", dd: "20% DWT typical" },
                  { dt: "Structure", dd: "Preference shares" },
                ].map((item) => (
                  <div key={item.dt} className="min-w-0 bg-white px-5 py-4 sm:px-6">
                    <dt
                      className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: MUTED }}
                    >
                      {item.dt}
                    </dt>
                    <dd className="mt-1.5 break-words font-serif text-base font-semibold tracking-tight text-shark">
                      {item.dd}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        ) : (
          <SectionHeader
            kicker={toolLabel}
            headingId={`${domain.id}-heading`}
            title={domain.label}
            lead={domain.lead}
            invert={dark}
          />
        )}
        <CalculatorGrid tools={tools} anchor />
      </div>
    </section>
  );
}

function PairedDomainRow({ domains }: { domains: readonly HubDomain[] }) {
  return (
    <section
      className="scroll-mt-28 content-visibility-auto border-b pb-16 pt-14 md:pb-24 md:pt-20"
      style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
      aria-label="Tax and insurance calculators"
    >
      <div className={HOME4_WRAP}>
        <SectionHeader
          kicker="2 specialised tools"
          headingId="tax-insurance-heading"
          title="Tax & insurance"
          lead="SARS income estimates and underinsurance risk when the average clause applies. Same ungated ASSET format as the rest of the library."
        />
        <div
          className="mt-10 grid grid-cols-1 gap-px md:grid-cols-2"
          style={{ backgroundColor: HAIRLINE }}
        >
          {domains.map((domain) => {
            const tools = getHubDomainCalculators(domain);
            return (
              <div
                key={domain.id}
                id={domain.id}
                className="flex scroll-mt-28 flex-col bg-white"
                aria-labelledby={`${domain.id}-heading`}
              >
                <div className="border-b px-6 py-6 sm:px-8" style={{ borderColor: HAIRLINE }}>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    1 tool
                  </p>
                  <h3
                    id={`${domain.id}-heading`}
                    className="mt-2 font-serif text-xl font-semibold tracking-tight text-shark"
                  >
                    {domain.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                    {domain.lead}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                  {tools.map((tool) => (
                    <CalculatorCard key={tool.id} tool={tool} anchor />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Domain chapters + related + terminal + footer (FAQ stays in RSC hub for crawlability). */
export function CalculatorsHubBelowFold() {
  const mainDomains = HUB_DOMAINS.filter((d) => !PAIRED_DOMAIN_IDS.has(d.id));
  const pairedDomains = HUB_DOMAINS.filter((d) => PAIRED_DOMAIN_IDS.has(d.id));

  return (
    <>
      {mainDomains.map((domain) => (
        <DomainChapter key={domain.id} domain={domain} />
      ))}
      <PairedDomainRow domains={pairedDomains} />
      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />
      <section className="content-visibility-auto pb-16 md:pb-24" aria-labelledby="calc-terminal-heading">
        <div className={HOME4_WRAP}>
          <div className="rounded-xl bg-shark px-6 py-10 text-white sm:px-10 sm:py-12 md:flex md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
                style={{ color: TEAL_ON_DARK }}
              >
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
                className="inline-flex items-center gap-2 rounded px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Contact us
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
    </>
  );
}
