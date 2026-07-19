import Link from "next/link";
import { CalculatorsHubBelowFold } from "@/components/calculators/CalculatorsHubBelowFold";
import { Footer } from "@/components/Footer";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { ArrowRight } from "@/components/icons";
import {
  HUB_DOMAINS,
  getHubFeaturedCalculators,
  type HubCalculator,
} from "@/lib/calculators/hub-catalog";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";

const HERO_ALT =
  "Couple reviewing finances with a calculator at a dining table at home";

type FaqItem = { question: string; answer: string };

function cardGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-5";
  if (count === 2) return "grid grid-cols-1 gap-5 sm:grid-cols-2";
  if (count === 3) return "grid grid-cols-1 items-stretch gap-5 md:grid-cols-3";
  return "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3";
}

function CalculatorCard({ tool }: { tool: HubCalculator }) {
  return (
    <article
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

/**
 * Calculators hub (RSC): hero, start-here, how-it-works, domain chapters, FAQ.
 * Entire hub stays server-rendered — do not gate chapters behind click/idle.
 */
export function CalculatorsHubView({ faqItems }: { faqItems: FaqItem[] }) {
  const featured = getHubFeaturedCalculators();

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      <MarketingHubHero
        imageFirstOnMobile
        kicker={
          <>
            <span className="sm:hidden">AS Brokers · ASSET · FSP 17273</span>
            <span className="hidden sm:inline">
              AS Brokers · Albert&apos;s ASSET library · FSP 17273 · Ungated
            </span>
          </>
        }
        title="Run the numbers before anyone sells you a product"
        description="Seventeen educational calculators for retirement, Everest income, estate duty, tax, and underinsurance. Test assumptions yourself, then contact us if you want advice."
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/calculators-hub-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/calculators-hub-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/calculators-hub-16x9-480.webp"
                alt={HERO_ALT}
                width={480}
                height={359}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>
          </figure>
        }
        actions={
          <>
            <a
              href="#start-here"
              className="inline-flex items-center gap-2 rounded bg-samsung-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
            >
              Start here
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#investments"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#006B6B] hover:opacity-80"
            >
              Browse Everest tools
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </>
        }
        after={
          <nav aria-label="On this page">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              On this page
            </p>
            <div className="-mx-4 mt-3 flex gap-x-5 gap-y-2 overflow-x-auto px-4 pb-1 text-sm font-medium text-stone-700 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              <a href="#start-here" className="shrink-0 whitespace-nowrap hover:text-shark">
                Start here
              </a>
              {HUB_DOMAINS.map((domain) => (
                <a
                  key={domain.id}
                  href={`#${domain.id}`}
                  className="shrink-0 whitespace-nowrap hover:text-shark"
                >
                  {domain.label}
                </a>
              ))}
              <a href="#faq" className="shrink-0 whitespace-nowrap hover:text-shark">
                FAQ
              </a>
            </div>
          </nav>
        }
      />

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

      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="how-library-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="max-w-2xl">
            <SectionHeader
              kicker="How this library works"
              headingId="how-library-heading"
              title="Educate, calculate, then decide if you need advice"
              lead="Three moves. Same path whether you came for Everest income, retirement longevity, or estate pressure."
            />
          </div>
          <ol
            className="mt-10 grid grid-cols-1 gap-px md:grid-cols-3"
            style={{ backgroundColor: HAIRLINE }}
          >
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
                body: "Contact us or WhatsApp when you want FSP 17273 to interpret the maths.",
              },
            ].map((item) => (
              <li key={item.step} className="flex flex-col bg-white px-6 py-8 sm:px-7 sm:py-10">
                <span
                  className="text-4xl font-serif font-semibold tabular-nums tracking-tight md:text-5xl"
                  style={{ lineHeight: 1, color: TEAL }}
                >
                  {item.step}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold tracking-tight text-shark">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href="#start-here"
              className="inline-flex items-center gap-2 font-semibold hover:opacity-80"
              style={{ color: TEAL }}
            >
              Jump to Start here
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-stone-600 underline-offset-2 hover:text-shark hover:underline"
            >
              Or WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>
      </section>

      <CalculatorsHubBelowFold />

      <VisibleFaqSection
        faqs={faqItems}
        id="faq"
        headingId="calc-faq-heading"
        primaryCta={{
          href: "/contact?source=calculators_faq",
          label: "Contact us",
        }}
      />

      <Footer />
    </div>
  );
}
