import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RetirementRealityCalculator } from "@/components/RetirementRealityCalculator";

export const metadata = {
  title: "You're Not Saving Enough for Retirement | AS Brokers",
  description:
    "Calculate how much capital you really need for retirement. Proof is in the calculator. Retirement income planning for South Africans.",
};

export default function RetirementPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            AS Brokers · Retirement Planning
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            You&apos;re Not Saving Enough for Retirement
          </h1>
          <p className="text-xl text-zinc-400">Proof is in the calculator.</p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
            Step 1: Calculate Required Capital
          </div>
        </div>
      </section>

      {/* You Are Not Saving Enough */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            You Are Not Saving Enough and I Can Prove It
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Most South Africans retire with far less capital than they need. Not because they didn&apos;t save. But because they underestimated what retirement actually costs.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The monthly income you need in retirement doesn&apos;t care about market returns, tax benefits, or product brochures. It cares about one thing: whether you have enough capital to generate it.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            And most people don&apos;t.
          </p>
        </div>
      </section>

      {/* Why Traditional Savings Methods Fall Short */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Why Traditional Savings Methods Fall Short
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            For decades, South Africans have been told to save a percentage of their income. 10%. 15%. Maybe 20% if you&apos;re serious.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            That advice assumes stable employment, consistent contributions, moderate inflation, and average life expectancy. It also assumes you&apos;ll maintain the same lifestyle in retirement that you have now.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            Reality is rarely that cooperative.
          </p>
        </div>
      </section>

      {/* The Real Problem: Income Replacement */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Real Problem: Income Replacement
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Retirement isn&apos;t about having a lump sum. It&apos;s about replacing the income you earned while working.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            If you need R30,000 per month in retirement and you retire at 65, you don&apos;t just need R360,000 for one year. You need enough capital to generate R30,000 per month for 20, 25, or 30 years, while that capital erodes from withdrawals and is undermined by inflation.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            The number is almost always higher than people expect.
          </p>
        </div>
      </section>

      {/* This Calculator Tests Your Assumptions */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            This Calculator Tests Your Assumptions Using Math
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            No generic multiples. No hopeful estimates. Just the actual capital required based on the income you tell it you need.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            It accounts for inflation, tax, withdrawal rates, and time. It shows you what you actually need, not what sounds reasonable.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            When you see the result, you may feel surprised. That reaction is normal. The number often looks higher than expected because most retirement planning skips the compounding effect of inflation, tax erosion, and time.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            Use the calculator below to find out how much capital you need, and what it will cost you per month to get there.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <RetirementRealityCalculator />
        </div>
      </section>

      {/* Why This Number Matters */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Why This Number Matters More Than You Think
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            If the result surprised you, that reaction is normal.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Most people underestimate what retirement income really costs because the pressures don&apos;t show up all at once. Inflation compounds quietly over decades. Tax reduces what you can actually spend. And your capital is expected to produce income for 20 to 30 years, often longer.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            When these factors are viewed separately, they feel manageable. When combined, they reveal the real cost of sustainable retirement income.
          </p>
          <p className="text-zinc-400 leading-relaxed font-medium text-zinc-300">
            This calculator doesn&apos;t exaggerate the problem. It simply exposes it.
          </p>
        </div>
      </section>

      {/* Retirement Planning Is Not About the Capital Alone */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Retirement Planning Is Not About the Capital Alone
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The size of your capital matters.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            But what matters more is the gap between where you are now and what your income needs to support, year after year.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            That gap is not closed by hope, market averages, or rules of thumb.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            It is closed in one way only: by the rate of growth your investment must deliver, consistently, over time.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Until you know that required growth rate, you cannot judge whether your current plan is realistic, or whether you are slowly eroding capital without realising it.
          </p>
          <p className="text-zinc-300 font-medium mb-2">You now know the income problem.</p>
          <p className="text-zinc-300 font-medium mb-6">The next question is the only one that matters.</p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            What <strong className="text-white">annual growth rate</strong> must your investment deliver to make this plan sustainable, after inflation, tax, and time?
          </p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            This is the calculation most people never do. It&apos;s also the calculation that determines whether retirement income works or eventually fails.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Calculate the growth rate required
          </Link>
        </div>
      </section>

      {/* Quick links / CTA strip */}
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
