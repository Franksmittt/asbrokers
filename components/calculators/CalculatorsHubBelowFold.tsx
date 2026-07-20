import Link from "next/link";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { ArrowRight, Lock } from "@/components/icons";
import {
  HUB_DOMAINS,
  getHubDomainCalculators,
  type HubCalculator,
  type HubDomain,
  type HubDifficulty,
} from "@/lib/calculators/hub-catalog";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";

function cardGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-5";
  if (count === 2) return "grid grid-cols-1 gap-5 sm:grid-cols-2";
  if (count === 3) return "grid grid-cols-1 items-stretch gap-5 md:grid-cols-3";
  if (count === 4) return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4";
  return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3";
}

function difficultyTone(difficulty: HubDifficulty): string {
  if (difficulty === "Beginner") return "#0F766E";
  if (difficulty === "Advanced") return "#9A3412";
  return "#57534e";
}

function CalculatorCard({ tool, anchor = false }: { tool: HubCalculator; anchor?: boolean }) {
  return (
    <article
      {...(anchor ? { id: tool.id } : {})}
      className="flex h-full min-w-0 scroll-mt-28 flex-col border bg-white p-5 sm:p-7"
      style={{ borderColor: HAIRLINE }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.16em] tabular-nums"
          style={{ color: MUTED }}
        >
          {tool.assetCode}
        </p>
        {tool.membersOnly ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1D1D1F] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
            <Lock className="h-3 w-3" aria-hidden />
            Members
          </span>
        ) : null}
        <span className="text-[11px] text-stone-400" aria-hidden>
          ·
        </span>
        <p className="text-[11px] font-medium tabular-nums" style={{ color: MUTED }}>
          {tool.estimatedTime}
        </p>
        <span className="text-[11px] text-stone-400" aria-hidden>
          ·
        </span>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: difficultyTone(tool.difficulty) }}
        >
          {tool.difficulty}
        </p>
      </div>
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
        {tool.membersOnly ? "View members page" : "Open Calculator"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

function CalculatorGrid({ tools, anchor = false }: { tools: HubCalculator[]; anchor?: boolean }) {
  return (
    <div className={`mt-10 ${cardGridClass(tools.length)}`}>
      {tools.map((tool) => (
        <CalculatorCard key={tool.id} tool={tool} anchor={anchor} />
      ))}
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
  return domainId === "investment-decisions" || domainId === "estate-planning";
}

function DomainChapter({ domain }: { domain: HubDomain }) {
  const tools = getHubDomainCalculators(domain);
  const toolLabel = tools.length === 1 ? "1 calculator" : `${tools.length} calculators`;
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

/** Toolkit categories (ASSET 001–017) + related content. */
export function CalculatorsHubBelowFold() {
  return (
    <>
      <section
        id="toolkit"
        className="scroll-mt-28 border-b pb-10 pt-14 md:pb-12 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="toolkit-heading"
      >
        <div className={HOME4_WRAP}>
          <SectionHeader
            kicker="The full library"
            headingId="toolkit-heading"
            title="The Retirement Gap Toolkit™"
            lead="Every Retirement Gap calculator (Assets 001–017), grouped into logical categories. Each card shows time, difficulty, and a short description."
          />
        </div>
      </section>
      {HUB_DOMAINS.map((domain) => (
        <DomainChapter key={domain.id} domain={domain} />
      ))}
      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />
    </>
  );
}
