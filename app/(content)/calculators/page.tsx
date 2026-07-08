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

      <section
        className="border-b border-stone-200/80 pb-12 pt-28 md:pb-16 md:pt-36"
        style={{ backgroundColor: "#F7F6F3" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <p
            className="font-semibold uppercase tracking-[0.2em]"
            style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: "#006B6B" }}
          >
            Planning tools · FSP 17273
          </p>
          <h1
            className="mt-4 font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
              lineHeight: 1.12,
              color: "#1D1D1F",
            }}
          >
            Financial calculators
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{
              fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
              color: "#2B2B2E",
            }}
          >
            Seventeen illustrative calculators for retirement, Everest Wealth, estate planning, tax, and
            insurance. Results are educational only, not financial advice.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20" style={{ backgroundColor: "#FDFCFA" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CALCULATOR_REGISTRY.map((entry) => (
              <li key={entry.id} id={entry.id}>
                <Link
                  href={entry.embedPath}
                  prefetch={false}
                  className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-md ring-1 ring-stone-200/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <p
                    className="font-semibold uppercase tracking-wide"
                    style={{ fontSize: "0.6875rem", color: "#006B6B" }}
                  >
                    {entry.assetCode}
                  </p>
                  <h2
                    className="mt-2 font-semibold leading-snug group-hover:text-[#0057B8]"
                    style={{
                      fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)",
                      color: "#1D1D1F",
                    }}
                  >
                    {formatPublicCalculatorTitle(entry)}
                  </h2>
                  <span
                    className="mt-auto pt-4 font-semibold"
                    style={{ fontSize: "0.875rem", color: "#0057B8" }}
                  >
                    Open calculator
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
            >
              Speak with an adviser
            </Link>
            <Link
              href="/retirement"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition-colors duration-300 hover:bg-stone-50"
              style={{ color: "#1D1D1F" }}
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
