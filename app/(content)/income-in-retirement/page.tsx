import Link from "next/link";
import { Footer } from "@/components/Footer";
import { LifeOfCapitalCalculator } from "@/components/LifeOfCapitalCalculator";

export const metadata = {
  title: "Is Your Retirement Income Enough? | Retirement Calculator SA | AS Brokers",
  description:
    "Will your money last in retirement? Use the Life of Capital calculator to see how long your savings will last with inflation and tax.",
};

export default function IncomeInRetirementPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero – cinematic void + depletion-risk orb */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[320px] h-[320px] bg-red-600/15 blur-[100px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute bottom-1/3 left-0 w-[260px] h-[260px] bg-amber-700/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 · Capital Lifespan</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            The Capital Depletion Test.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            Run the mathematics of your current trajectory. Most traditional portfolios deplete years before expected. Expose your exact capital lifespan in 30 seconds.
          </p>
          <span className="inline-block text-zinc-500" aria-hidden>
            ↓
          </span>
        </div>
      </section>

      {/* Calculator – premium Bento with red risk glow */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.12)] p-0 overflow-hidden">
          <LifeOfCapitalCalculator />
        </div>
      </section>

      {/* The Fix CTA – bridge problem → solution */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8 lg:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Does your trajectory show depletion?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              You cannot out-save mathematical drag. To extend your capital lifespan, you must migrate to high-yield, unlisted alternative assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/everest-wealth"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
              >
                Engineer a High-Yield Solution →
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

      {/* Footer / trust */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <span>Albert Schuurman & Johnny Farinha</span>
          <span>AS Brokers | FSP 17273</span>
          <span>Independent Authorised Financial Service Provider</span>
        </div>
        <div className="max-w-4xl mx-auto mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/retirement" className="text-zinc-400 hover:text-white transition-colors">
            Retirement income
          </Link>
          <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
