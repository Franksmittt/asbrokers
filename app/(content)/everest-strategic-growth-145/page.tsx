import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Everest145GrowthCalculator } from "@/components/Everest145GrowthCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Everest Strategic Growth 145 | Structured Investment Solution";
const PAGE_DESCRIPTION =
  "Discover the Everest Strategic Growth 145, a structured investment solution designed for targeted capital growth. Learn more from AS Brokers CC, your Authorised Financial Services Provider (FSP 17273).";

export const metadata = buildPageMetadata({
  path: "/everest-strategic-growth-145",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function Everest145Page() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <PageJsonLd
        path="/everest-strategic-growth-145"
        webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }}
        product={{
          name: "Everest Strategic Growth 14.5%",
          description:
            "Structured investment solution targeting 14.5% compound growth over a five-year term. R100,000 minimum voluntary capital.",
          brandName: "Everest Wealth",
        }}
      />
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 Wealth Engineering: Capital Growth.</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Pure Compounding: 14.5% Strategic Growth.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Model a targeted 14.5% annual compound growth profile over five years, with product terms, liquidity limits, and risk disclosures reviewed before committing capital.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-0 overflow-hidden">
          <Everest145GrowthCalculator />
        </div>
      </section>
      {/* The Tax Architecture – Bento card */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">The Tax Architecture</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Growth is highly efficient. Yields are subject to a flat 20% Dividend Withholding Tax (DWT) at maturity, circumventing marginal income tax brackets.
            </p>
          </div>
        </div>
      </section>
      {/* Deploy Your Capital – CTA block */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Deploy Your Capital.</h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 w-full bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
          >
            Request 14.5% Term Sheet →
          </Link>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <a href="https://wa.me/27662276044" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp +27 66 227 6044</a>
            <Link href="/everest-wealth" className="text-cinematic-teal hover:underline">Investment options</Link>
            <Link href="/contact" className="text-cinematic-teal hover:underline">Contact</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
