import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { CALCULATOR_REGISTRY, formatPublicCalculatorTitle } from "@/lib/calculators/registry";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: "Financial Calculators",
  description:
    "AS Brokers planning calculators for retirement, Everest Wealth, estate, tax, and insurance. Educational tools only. FSP 17273.",
});

export default function CalculatorsPage() {
  return (
    <>
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: "Financial Calculators | AS Brokers CC",
          description:
            "Educational planning calculators for retirement, Everest Wealth, estate duty, tax, and insurance.",
        }}
      />

      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Planning tools</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Financial calculators
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Seventeen illustrative calculators for retirement, Everest Wealth, estate planning, tax, and insurance.
            Results are educational only, not financial advice.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CALCULATOR_REGISTRY.map((entry) => (
              <li key={entry.id} id={entry.id}>
                <Link
                  href={entry.embedPath}
                  prefetch={false}
                  className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200 transition-all duration-300 ease-in-out hover:ring-samsung-blue/40 hover:shadow-md"
                >
                  <h2 className="text-base font-semibold leading-snug text-shark group-hover:text-samsung-blue">
                    {formatPublicCalculatorTitle(entry)}
                  </h2>
                  <span className="mt-auto pt-4 text-sm font-semibold text-samsung-blue">Open calculator</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
            >
              Speak with an adviser
            </Link>
            <Link
              href="/retirement"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-shark ring-1 ring-stone-200 transition-colors duration-300 ease-in-out hover:bg-stone-50"
            >
              Retirement hub
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
