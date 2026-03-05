import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EstateDutyCalculator } from "@/components/EstateDutyCalculator";

export const metadata = {
  title: "Estate Duty Calculator South Africa | AS Brokers",
  description:
    "Calculate estate duty, executor fees, and the total cash your estate will need at death. Understand the cost of dying.",
};

export default function EstateDutyCalculatorPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            AS Brokers · Estate Planning
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Estate Duty Calculator
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-4">Understand the cost of dying.</p>
          <p className="text-zinc-500">
            Calculate estate duty, executor fees, and the total cash your estate will need at death, before your family
            has to find out the hard way.
          </p>
        </div>
      </section>

      {/* Teaser bullets */}
      <section className="py-8 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-zinc-400">
            <span>Estate duty payable</span>
            <span>Executor fees</span>
            <span>Total estate costs</span>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EstateDutyCalculator />
        </div>
      </section>

      {/* What This Estate Duty Estimate Tells You */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            What This Estate Duty Estimate Tells You
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The figure shown above is a high-level estimate of how much estate duty SARS could potentially claim from
            your estate based on the information you entered.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Estate duty is calculated on the total value of your estate at death, including property, investments,
            policies, cash, and other assets, after allowable deductions. It is currently charged at 20% on the first R30
            million and 25% on amounts above that, and it is payable in cash before heirs receive their inheritances.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            This calculator is not designed for precision. Its purpose is awareness.
          </p>
        </div>
      </section>

      {/* The Hidden Problem */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">The Hidden Problem</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            What often catches families off guard is not poor investment performance, but the fact that growth inside an
            estate quietly increases the eventual tax bill over time.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            When sufficient liquidity is not available, estates are often forced to sell assets under pressure, delay
            finalisation, or disrupt long-term plans.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            The good news is that estate duty exposure can usually be reduced legally and gradually, but only if
            planning starts early and is applied consistently.
          </p>
        </div>
      </section>

      {/* A Practical Solution */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">A Practical Solution</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            One of the most effective tools available to South Africans is the annual donations allowance.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            By using the R100,000 per person per year exemption and redirecting growth outside your personal estate,
            future estate duty can be reduced without drastic once-off decisions.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            This result is not a prediction.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            It is a planning signal. The size of the problem is shown above; the solution requires structured action over
            time.
          </p>
        </div>
      </section>

      {/* Next Step */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Next Step</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            If you would like to see how annual donations, when invested correctly, can reduce estate duty and shift
            long-term growth outside your estate, the next calculator will walk you through that strategy.
          </p>
          <Link
            href="/annual-estate-reduction-strategy"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Calculate your annual estate reduction strategy
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://wa.me/27672429946"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              WhatsApp us · 067 242 9946
            </a>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Income in retirement
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Insurance & risk planning
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Estate planning
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Business insurance
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
