import Link from "next/link";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";

export type VisibleFaqSectionProps = {
  faqs: FAQItem[];
  /** Section element id for in-page anchors. */
  id?: string;
  headingId?: string;
  kicker?: string;
  heading?: string;
  lead?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  className?: string;
  /** @deprecated Kept for call-site compatibility. */
  wide?: boolean;
  /** @deprecated Kept for call-site compatibility. */
  twoColumn?: boolean;
};

/**
 * Sitewide FAQ chapter: shark band, sticky intro + CTAs, numbered open answers.
 * Matches /calculators FAQ layout. Keep in sync with PageJsonLd via ensureSixFaqs.
 */
export function VisibleFaqSection({
  faqs,
  id = "faq",
  headingId = "visible-faq-heading",
  kicker = "Before you book",
  heading = "Straight answers before you open a tool or book a call",
  lead = "Education first. Personal financial advice only after a needs analysis with AS Brokers CC, FSP 17273.",
  primaryCta = {
    href: "/contact?source=faq",
    label: "Book a capital assessment",
  },
  secondaryCta = {
    href: "/everest-wealth/about",
    label: "Understanding Everest",
  },
  className = "",
}: VisibleFaqSectionProps) {
  const items = ensureSixFaqs(faqs);
  if (!items.length) return null;

  return (
    <section
      id={id}
      data-chunk-boundary="true"
      className={`scroll-mt-28 bg-shark py-16 text-white md:py-24 ${className}`}
      aria-labelledby={headingId}
    >
      <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 lg:gap-14`}>
        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5EEAD4]">
            {kicker}
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65">{lead}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#5EEAD4] hover:opacity-80"
              >
                {secondaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>

        <ol className="col-span-12 divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
          {items.map((item, index) => (
            <li key={item.question} className="grid grid-cols-[2.75rem_1fr] gap-4 py-6 sm:gap-6">
              <span className="pt-1 text-[11px] font-semibold tabular-nums text-[#5EEAD4]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                  {item.answer}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
