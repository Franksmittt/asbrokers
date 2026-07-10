import type { FAQItem } from "@/lib/seo";

type VisibleFaqSectionProps = {
  faqs: FAQItem[];
  heading?: string;
  className?: string;
  /** Wider container (max-w-7xl) for hub/calculator pages. */
  wide?: boolean;
  /** Two-column FAQ grid (3 rows × 2 cols for six items). */
  twoColumn?: boolean;
};

/**
 * Visible FAQ block — must match PageJsonLd FAQPage schema exactly (GSC / rich-result policy).
 */
export function VisibleFaqSection({
  faqs,
  heading = "Frequently asked questions",
  className = "",
  wide = false,
  twoColumn = false,
}: VisibleFaqSectionProps) {
  if (!faqs.length) return null;

  const containerMax = wide || twoColumn ? "max-w-7xl" : "max-w-3xl";

  return (
    <section
      data-chunk-boundary="true"
      className={`border-t border-stone-200/80 bg-[#FDFCFA] py-12 md:py-16 ${className}`}
      aria-labelledby="visible-faq-heading"
    >
      <div className={`mx-auto px-4 sm:px-6 md:px-8 ${containerMax}`}>
        <h2 id="visible-faq-heading" className="text-2xl font-bold tracking-tight text-shark sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-stone-600">
          Educational answers only. For advice tailored to your circumstances, book a consultation with FSP 17273.
        </p>
        <div
          className={
            twoColumn
              ? "mt-8 grid gap-4 sm:grid-cols-2 sm:items-stretch"
              : "mt-8 space-y-3"
          }
        >
          {faqs.map((item) => (
            <details
              key={item.question}
              className={`group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/80 open:shadow-md ${
                twoColumn ? "h-full" : ""
              }`}
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
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
