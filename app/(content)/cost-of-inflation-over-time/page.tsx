import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FutureValueCalculator } from "@/components/FutureValueCalculator";

export const metadata = {
  title: "Future Value Calculator (Inflation) | Test Your Buying Power | AS Brokers",
  description:
    "Understand the impact of inflation on your savings and purchasing power over time. See what today's money will be worth in the future.",
};

export default function CostOfInflationPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero – cinematic void + risk orb */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-red-600/15 blur-[100px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute bottom-1/3 left-0 w-[220px] h-[220px] bg-amber-700/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            Actuarial Reality Check.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            The Capital Erosion Test.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Inflation is the silent destruction of wealth. Calculate the exact rate at which your current capital is losing its purchasing power, and discover the required yield to outpace it.
          </p>
        </div>
      </section>

      {/* Teaser bullets */}
      <section className="py-8 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-zinc-400">
            <span>Future cost of living</span>
            <span>Purchasing power lost</span>
            <span>Real growth required</span>
          </div>
        </div>
      </section>

      {/* Calculator – premium Bento with red risk glow */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.12)] p-0 overflow-hidden">
          <FutureValueCalculator />
        </div>
      </section>

      {/* 2-column Bento: The Problem + The Solution */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Mathematical Deficit</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Traditional portfolios yielding 6–8% are essentially generating zero real return after inflation and tax. The nominal number on your statement masks the erosion. To preserve and grow wealth in real terms, your yield must consistently outpace both inflation and the tax drag.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Outpacing the Erosion</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                To secure real generational wealth, capital must be deployed into high-yield alternative structures (12.8%–14.5%) that mathematically crush inflation. Unlisted preference shares and structured returns are engineered for this purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA – premium Squircle */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-4">Stop Losing Purchasing Power.</h2>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="/everest-wealth"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
              >
                Engineer Inflation-Proof Yields →
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-4 rounded-[2rem] hover:bg-white/10 transition-colors"
              >
                Book Actuarial Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="https://wa.me/27672429946"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Contact us on WhatsApp · 067 242 9946
          </a>
          <div className="mt-4 text-zinc-500 text-sm">
            Albert Schuurman & Johnny Farinha · AS Brokers | FSP 17273 · Independent Authorised Financial Service Provider
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
