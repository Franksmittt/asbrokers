import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { Everest128Calculator } from "@/components/Everest128Calculator";

export const metadata = {
  title: "Everest Strategic Income 12.8% | AS Brokers Krugersdorp",
  description: "Explore the Everest Strategic Income solution targeting 12.8% returns. AS Brokers, an Authorised FSP in Krugersdorp, offers structured income growth.",
};

export default function Everest128Page() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Product\", \"name\": \"Everest Strategic Income 12.8%\", \"description\": \"The Everest Strategic Income solution, available through AS Brokers CC (FSP 17273), is a voluntary investment structure designed to offer a targeted 12.8% annual income yield. It provides a structured approach for wealth enhancement for clients in Krugersdorp, West Rand, and Gauteng, seeking stable income opportunities. Please note a 120-day notice period and 15% early exit penalty apply to withdrawals.\", \"brand\": {\"@type\": \"Organization\", \"name\": \"Everest Wealth\"}, \"offers\": {\"@type\": \"Offer\", \"priceCurrency\": \"ZAR\", \"description\": \"Targeted 12.8% annual income yield.\", \"name\": \"Everest Strategic Income Product\"}, \"provider\": {\"@type\": \"FinancialService\", \"name\": \"AS Brokers CC\", \"url\": \"https://www.asbrokers.co.za\", \"slogan\": \"Your trusted financial services partner in the West Rand.\", \"address\": {\"@type\": \"PostalAddress\", \"addressLocality\": \"Krugersdorp\", \"addressRegion\": \"Gauteng\", \"addressCountry\": \"ZA\"}, \"hasOfferCatalog\": {\"@type\": \"OfferCatalog\", \"name\": \"AS Brokers Financial Products and Services\", \"itemListElement\": [{\"@type\": \"OfferCatalog\", \"name\": \"Everest Wealth Solutions\", \"itemListElement\": [{\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"Everest Strategic Income 12.8%\"}}]}]}}" }} />
      <section className="pt-28 pb-8">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 Wealth Engineering</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Yield Engineering: 12.8% Strategic Income.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Calculate your predictable monthly cash flow. Unlisted, insulated from market volatility, and engineered with a 10% capital maturity bonus at year 5.
            </p>
          </div>
          <div className="mt-8">
            <PageMediaStrip
              variant="secondary"
              src="/images/everest-128-inset-1x1.jpg"
              alt="Structured income and wealth engineering"
              rounded="3xl"
            />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className={PAGE_CONTENT_MAX}>
          <div className="rounded-[2rem] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-0 overflow-hidden">
            <Everest128Calculator />
          </div>
        </div>
      </section>
      {/* Fiduciary Compliance & Structure – Bento grid */}
      <section className="py-12 border-t border-white/5">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Fiduciary Compliance & Structure</h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Regulated Efficiency</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                All yields are subject to a flat 20% Dividend Withholding Tax (DWT), vastly outperforming standard income tax scales.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">Authority</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Albert Schuurman & Johnny Farinha · AS Brokers FSP 17273 · Code 1.8 Shares.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/everest-wealth" className="text-cinematic-teal hover:underline">Investment options</Link>
                <Link href="/contact" className="text-cinematic-teal hover:underline">Contact</Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
