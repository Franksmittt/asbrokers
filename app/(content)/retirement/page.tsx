import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RetirementRealityCalculator } from "@/components/RetirementRealityCalculator";
import { FAQSchema } from "@/components/FAQSchema";

const retirementFAQs = [
  {
    question: "How much capital do I need for retirement?",
    answer:
      "The amount depends on your target monthly income, inflation, investment growth, tax rate, and how long you expect to live. Use our Retirement Reality Calculator to get an estimate based on your own inputs.",
  },
  {
    question: "Why does the calculator show such a high number?",
    answer:
      "Retirement capital must fund income for 20–30+ years while inflation increases your income need each year. The calculator uses the present value of a growing annuity, so the figure reflects real purchasing power over time.",
  },
  {
    question: "What if my growth rate is lower than inflation?",
    answer:
      "If assumed investment growth does not exceed inflation, the calculation is not valid. Your capital would erode in real terms. You need growth above inflation to sustain income over a long retirement.",
  },
];

export const metadata = {
  title: "Retirement Reality Calculator | Semigration & Retirement Villages Western Cape",
  description:
    "Calculate how much capital you really need for retirement. Semigration and retirement villages Western Cape planning. Proof is in the calculator. Retirement income planning for South Africans.",
};

export default function RetirementPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <FAQSchema faqs={retirementFAQs} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-3">
            AS Brokers · Retirement Planning
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
            You&apos;re Not Saving Enough for Retirement
          </h1>
          <p className="text-lg text-zinc-400 mb-6">Proof is in the calculator.</p>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
            Step 1: Calculate required capital
          </span>
        </div>
      </section>

      {/* Editorial: single intro + two idea cards + calculator lead-in */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          {/* Intro block with pull quote */}
          <div className="mb-14">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              You are not saving enough, and the numbers prove it
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Most South Africans retire with far less capital than they need. Not because they didn&apos;t save. But because they underestimated what retirement actually costs.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The monthly income you need in retirement doesn&apos;t care about market returns, tax benefits, or product brochures. It cares about one thing: whether you have enough capital to generate it.
            </p>
            <p className="text-zinc-300 font-semibold text-lg">
              And most people don&apos;t.
            </p>
          </div>

          {/* Two idea cards side by side on desktop */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Why it happens</p>
              <h3 className="text-lg font-bold text-white mb-4">Why traditional savings methods fall short</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                For decades we&apos;ve been told to save 10%, 15%, maybe 20% of income. That advice assumes stable employment, consistent contributions, moderate inflation, and the same lifestyle in retirement.
              </p>
              <p className="text-zinc-300 text-sm font-medium">Reality is rarely that cooperative.</p>
            </div>
            <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
              <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">The real problem</p>
              <h3 className="text-lg font-bold text-white mb-4">Income replacement, not a lump sum</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                If you need R30,000 per month at 65, you don&apos;t need R360,000 for one year. You need enough capital to generate that income for 20, 25, or 30 years while withdrawals and inflation erode it.
              </p>
              <p className="text-zinc-300 text-sm font-medium">The number is almost always higher than people expect.</p>
            </div>
          </div>

          {/* Lead-in to calculator */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-950/30 to-transparent border border-white/10 p-6 md:p-8 mb-12">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">
              This calculator tests your assumptions with math
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              No generic multiples. No hopeful estimates. Just the actual capital required for the income you say you need. It accounts for inflation, tax, withdrawal rates, and time. When you see the result, you may feel surprised. That reaction is normal.
            </p>
            <p className="text-zinc-300 text-sm font-medium">
              Use the calculator below to find out how much capital you need, and what it will cost you per month to get there.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-12 md:py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <RetirementRealityCalculator />
        </div>
      </section>

      {/* Why this number matters + next step */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Why this number matters more than you think
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                If the result surprised you, that reaction is normal. Most people underestimate retirement income cost because the pressures don&apos;t show up all at once. Inflation compounds over decades. Tax reduces what you can spend. Your capital must produce income for 20 to 30 years.
              </p>
              <p className="text-zinc-300 text-sm font-medium">
                This calculator doesn&apos;t exaggerate the problem. It simply exposes it.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 h-full flex flex-col justify-between">
                <div>
                  <p className="text-zinc-300 font-medium mb-2">You now know the income problem.</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    The next question: what <strong className="text-white">growth rate</strong> must your investment deliver to make this plan sustainable? That&apos;s the calculation most people never do, and it determines whether retirement income works or eventually fails.
                  </p>
                </div>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors w-full sm:w-auto"
                >
                  Calculate the growth rate required
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic silo: retirement to Amethyst Living Annuity */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-[#151518]/50">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-[#151518] p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-3">From retirement capital to income: the Amethyst Living Annuity</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              If you have pension, provident, preservation or retirement annuity funds, the Amethyst Living Annuity offers a structured return profile (around 10.2% net p.a.) without the volatility of market-linked funds. Unlike pre-retirement funds governed by Regulation 28, the Amethyst operates under long-term insurance and FSCA rules, with full drawdown flexibility: you choose an annual income of between <strong className="text-zinc-300">2.5% and 17.5%</strong> of your capital. Growth inside the annuity is tax-free; only the income you draw is taxed.
            </p>
            <Link
              href="/everest-amethyst-living-annuity"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
            >
              Amethyst Living Annuity calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-10 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              WhatsApp 067 242 9946
            </a>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">Income in retirement</Link>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">Insurance & risk</Link>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">Estate planning</Link>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">Business insurance</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
