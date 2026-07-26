import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { CallbackForm } from "@/components/forms/CallbackForm";
import {
  PROVIDER_GROUPS,
  PROVIDER_PANEL,
  type ProviderCategory,
} from "@/lib/provider-panel";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this page is general information under Section 1(3)(a) of the FAIS Act, 37 of 2002, and is not financial advice or a product recommendation. Provider names indicate contractual or placement capability only — not endorsement, ranking, or suitability. Personal recommendations follow a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

const GROUP_ORDER = ["business", "personal", "wealth", "fiduciary"] as const;

function CategoryCard({ category }: { category: ProviderCategory }) {
  return (
    <article
      id={category.id}
      className="flex h-full scroll-mt-28 flex-col border bg-white p-6 sm:p-7 md:scroll-mt-32"
      style={{ borderColor: HAIRLINE }}
    >
      <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
        {category.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">{category.problem}</p>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
        <span className="font-semibold text-shark">How we help: </span>
        {category.brokerRole}
      </p>
      <div className="mt-5 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
          Provider panel
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {category.providers.map((provider) => (
            <li
              key={provider}
              className="rounded-full border bg-[#F7F6F3] px-3.5 py-1.5 text-xs font-medium text-stone-700"
              style={{ borderColor: HAIRLINE }}
            >
              {provider}
            </li>
          ))}
        </ul>
      </div>
      {category.note ? (
        <p className="mt-4 border-t pt-3 text-[11px] leading-relaxed text-stone-500" style={{ borderColor: HAIRLINE }}>
          {category.note}
        </p>
      ) : null}
    </article>
  );
}

type Props = { faqs: FAQItem[] };

export function ProviderPanelPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* §1 Header */}
      <header className="pb-10 pt-28 md:pb-14 md:pt-36">
        <div className={HOME4_WRAP}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            AS Brokers CC · FSP 17273 · Independent Category 1.8
          </p>
          <h1
            className="mt-4 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            One broker. A full panel of providers behind you.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Whatever the problem — a business that needs cover, a family that needs protection, a
            retirement that needs structure — we work across a contracted panel of insurers,
            schemes, platforms, and fiduciary partners. Listed here factually, by service, in
            alphabetical order. Which of them fits <em>you</em> is decided in advice, not on a
            webpage.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/business-risk-review"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Start a free Business Risk Review
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact?source=providers"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
              style={{ color: TEAL }}
            >
              Request a needs analysis
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-stone-500">
            Provider names indicate placement capability or contractual relationships — not
            endorsement, exclusivity, or a recommendation of any product.
          </p>
        </div>
      </header>

      {/* §2 Grouped categories */}
      {GROUP_ORDER.map((group, index) => {
        const categories = PROVIDER_PANEL.filter((c) => c.group === group);
        const isDark = index % 2 === 1;
        return (
          <section
            key={group}
            id={`group-${group}`}
            className={
              isDark
                ? "scroll-mt-28 bg-shark py-14 text-white md:scroll-mt-32 md:py-20"
                : "scroll-mt-28 border-t py-14 md:scroll-mt-32 md:py-20"
            }
            style={isDark ? undefined : { borderColor: HAIRLINE, backgroundColor: CANVAS }}
            aria-labelledby={`group-${group}-heading`}
          >
            <div className={HOME4_WRAP}>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: isDark ? TEAL_ON_DARK : TEAL }}
              >
                Provider panel
              </p>
              <h2
                id={`group-${group}-heading`}
                className={`mt-3 font-serif font-semibold tracking-tight ${isDark ? "text-white" : ""}`}
                style={{
                  fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)",
                  color: isDark ? undefined : INK,
                }}
              >
                {PROVIDER_GROUPS[group]}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* §3 How a provider becomes YOUR provider */}
      <section
        className="border-t py-14 md:py-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="panel-process-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="panel-process-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            How a panel name becomes your cover
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            This page is the menu, not the meal. The route from a provider name to a policy or
            portfolio in your name always runs through the same steps: tell us the problem, sit a
            documented needs analysis with an authorised representative, then we survey this panel
            and place what the analysis supports — and review it every year.
          </p>
          <div className="mt-8">
            <CallbackForm
              source="providers"
              heading="Not sure which category your problem fits?"
              description="Leave your name and number. An authorised adviser phones you back within one business day and points you in the right direction."
              showNote
              whatsappMessage="Hi AS Brokers, please call me back — I want to know which of your providers can help with my situation."
            />
          </div>
        </div>
      </section>

      {/* §4 FAQ */}
      <VisibleFaqSection
        faqs={faqItems}
        id="providers-faq"
        headingId="providers-faq-heading"
        kicker="Straight answers"
        heading="About our provider panel"
        lead="Factual answers about how an independent broker works with providers. Personal advice follows a needs analysis with FSP 17273."
        primaryCta={{ href: "/contact?source=providers_faq", label: "Contact us" }}
        secondaryCta={{ href: "/business-risk-review", label: "Start the Risk Review" }}
      />

      {/* §5 Related */}
      <RelatedContent variant="warm" links={getRelatedLinks("/providers")} />

      {/* §6 Quiet Section 1(3)(a) disclaimer */}
      <section
        aria-label="General information disclaimer"
        className="border-t pb-10 pt-8"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
      >
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-xs leading-relaxed text-stone-500">{GENERAL_ADVICE_DISCLAIMER}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
