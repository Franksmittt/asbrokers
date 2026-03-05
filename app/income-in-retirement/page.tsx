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
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Will Your Money Last in Retirement?
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            Most people overestimate how long their capital will provide income. Find out in 30 seconds.
          </p>
          <span className="inline-block text-zinc-500" aria-hidden>
            ↓
          </span>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <LifeOfCapitalCalculator />
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
