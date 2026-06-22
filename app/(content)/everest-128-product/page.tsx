import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { Everest128Calculator } from "@/components/Everest128Calculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/everest-128-product",
  title: "Everest Strategic Income 12.8% | AS Brokers Krugersdorp",
  description:
    "Explore the Everest Strategic Income solution targeting 12.8% returns. AS Brokers, an Authorised FSP in Krugersdorp, offers structured income growth.",
});

export default function Everest128Page() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <PageJsonLd
        path="/everest-128-product"
        webPage={{
          name: "Everest Strategic Income 12.8% | AS Brokers Krugersdorp",
          description:
            "Explore the Everest Strategic Income solution targeting 12.8% returns through AS Brokers CC (FSP 17273).",
        }}
        product={{
          name: "Everest Strategic Income 12.8%",
          description:
            "Voluntary investment structure targeting 12.8% annual income yield. R100,000 minimum. 120-day notice and 15% early exit penalty may apply.",
          brandName: "Everest Wealth",
        }}
      />
      <section className="pt-28 pb-8">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 Wealth Engineering</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Yield Engineering: 12.8% Strategic Income.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Calculate the targeted monthly cash flow profile. This unlisted structure includes a 10% capital maturity bonus at year 5 and must be reviewed with its liquidity and risk disclosures.
            </p>
          </div>
          <div className="mt-8">
            <PageMediaStrip
              variant="secondary"
              src="/images/everest-128-inset-1x1.jpg"
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
