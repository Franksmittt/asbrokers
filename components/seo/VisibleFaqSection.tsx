import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";

type VisibleFaqSectionProps = {
  faqs: FAQItem[];
  heading?: string;
  className?: string;
  /** @deprecated Always uses hub width (max-w-7xl). Kept for call-site compatibility. */
  wide?: boolean;
  /** @deprecated Always uses 3×2 grid. Kept for call-site compatibility. */
  twoColumn?: boolean;
};

/**
 * Visible FAQ block, always 6 items in a 3×2 grid at hub width (HOME4_WRAP).
 * Must match PageJsonLd FAQPage schema (both use ensureSixFaqs).
 */
export function VisibleFaqSection({
  faqs,
  heading = "Frequently asked questions",
  className = "",
}: VisibleFaqSectionProps) {
  const items = ensureSixFaqs(faqs);
  if (!items.length) return null;

  return (
    <section
      data-chunk-boundary="true"
      className={`border-t border-stone-200/80 bg-[#FDFCFA] py-12 md:py-16 ${className}`}
      aria-labelledby="visible-faq-heading"
    >
      <div className={HOME4_WRAP}>
        <h2 id="visible-faq-heading" className="text-2xl font-bold tracking-tight text-shark sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-stone-600">
          Educational answers only. For advice tailored to your circumstances, book a consultation with FSP 17273.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-stretch">
          {items.map((item) => (
            <details
              key={item.question}
              className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/80 open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  <span>{item.question}</span>
                  <span
                    className="mt-0.5 shrink-0 text-cinematic-teal transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
