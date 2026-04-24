import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EstateDutyCalculator } from "@/components/EstateDutyCalculator";

export const metadata = {
  title: "Estate Duty & Executor Cost Calculator South Africa | AS Brokers FSP 17273",
  description:
    "Illustrative estate duty, abatement, and executor-cost awareness for South African residents. Not a SARS assessment - independent FSP 17273 educational tool with liquidity planning context.",
  keywords: [
    "estate duty calculator South Africa",
    "executor fees estimate",
    "estate liquidity planning",
    "SARS estate duty awareness",
    "FSP 17273",
  ],
};

export default function EstateDutyCalculatorPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[320px] h-[320px] bg-red-500/15 blur-[100px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute bottom-1/4 left-0 w-[240px] h-[240px] bg-amber-600/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            Phase 2: Risk Architecture · Fiduciary Liability.
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

      {/* Educational context */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-4 text-sm text-zinc-400 leading-relaxed">
          <h2 className="text-xl font-bold text-white mb-2">Understanding estate duty (headline level only)</h2>
          <p>
            <strong className="text-zinc-300">Estate duty</strong> is a tax levied on the dutiable amount of a deceased
            person’s South African estate. The net estate considers allowable deductions and abatements in terms of{" "}
            <strong className="text-zinc-300">current statute and SARS guidance</strong>. Rates commonly discussed include
            portions taxed at <strong className="text-zinc-300">20%</strong> and higher bands at{" "}
            <strong className="text-zinc-300">25%</strong>, but your outcome depends on assets, debts, rollovers to surviving
            spouses where applicable, and filing accuracy.
          </p>
          <p>
            <strong className="text-zinc-300">Executor fees</strong> (often commission-based subject to regulation and agreed
            terms) and <strong className="text-zinc-300">liquidity timing</strong> mean families sometimes must raise cash
            before inheritances flow. Life policies and liquid investments may help - if ownership and beneficiary structures
            were set up correctly and remain appropriate.
          </p>
          <p className="text-zinc-500">
            This calculator uses simplified assumptions to surface magnitude, not to replace a conveyancer, accountant, or
            SARS filing. Laws and abatements change; verify with professionals for your estate.
          </p>
          <p className="pt-2">
            <Link href="/solutions/estate-planning" className="text-cinematic-teal hover:underline font-medium">
              Estate planning services overview
            </Link>
            {" · "}
            <Link href="/annual-estate-reduction-strategy" className="text-cinematic-teal hover:underline font-medium">
              Donations modelling tool
            </Link>
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EstateDutyCalculator />
        </div>
      </section>

      {/* Liquidity Stress Test – Bento card */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Liquidity Stress Test
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The figure above is a high-level estimate of the cash your estate must produce at death. SARS can claim{" "}
              <strong className="text-zinc-300">20% on the first R30 million</strong> and{" "}
              <strong className="text-zinc-300">25% on amounts above that</strong>, plus executor fees. All of it is
              payable in cash before heirs receive their inheritances.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Estate duty is calculated on the total value of your estate at death, including property, investments,
              policies, cash, and other assets, after allowable deductions. This calculator is not designed for
              precision. Its purpose is awareness: to expose the liquidity gap before it becomes a crisis.
            </p>
            <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
              You have just run a liquidity stress test. The next step is to reduce the number.
            </p>
          </div>
        </div>
      </section>

      {/* The Hidden Problem */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">The Hidden Problem</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            What often catches families off guard is not poor investment performance, but the fact that growth inside an
            estate quietly increases the eventual tax bill over time. Capital locked in low-yield, traditional
            structures makes it worse: when the estate freezes, that capital cannot be turned into cash quickly
            enough. The liquidity crisis is exacerbated precisely when families can least afford it.
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

      {/* Strategic Capital Migration */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Strategic Capital Migration</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The first step in mathematically reducing your exposure is the annual donations allowance. South African
            tax residents may donate up to <strong className="text-zinc-300">R100,000 per individual</strong> or{" "}
            <strong className="text-zinc-300">R200,000 per married couple</strong> each tax year free of donations tax.
            By using this exemption and redirecting growth outside your personal estate (for example into a family
            trust), future estate duty can be reduced without drastic once-off decisions.
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

      {/* Next Step – Squircle CTA with pulsing glow */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border-2 border-blue-500/40 p-8 md:p-10 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Next Step</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                If you would like to see how annual donations, when invested correctly, can reduce estate duty and shift
                long-term growth outside your estate, the next calculator will walk you through that strategy.
              </p>
              <Link
                href="/annual-estate-reduction-strategy"
                prefetch={false}
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors w-full sm:w-auto justify-center"
              >
                Engineer Your Estate Reduction Strategy →
              </Link>
            </div>
          </div>
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
            <Link href="/income-in-retirement" className="text-blue-400 hover:underline">
              Income in retirement
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Solutions hub
            </Link>
            <Link href="/solutions/estate-planning" className="text-blue-400 hover:underline">
              Estate planning
            </Link>
            <Link href="/solutions/business-insurance" className="text-blue-400 hover:underline">
              Business insurance
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
