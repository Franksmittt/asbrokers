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
      {/* Hero – cinematic void + risk orb */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/15 blur-[100px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute bottom-1/4 left-0 w-[240px] h-[240px] bg-amber-700/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Actuarial Reality Check.
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
            The Capital Deficit.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Traditional retirement modeling is fundamentally flawed. Calculate the exact, mathematical capital required to sustain your lifestyle, and expose your projected shortfall.
          </p>
        </div>
      </section>

      {/* 2-column Bento: The Mathematical Drag + The Income Delusion (directly beneath hero) */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Mathematical Drag</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Standard inflation and traditional market volatility destroy required yields. Nominal returns are not real returns. If your portfolio cannot consistently deliver growth above inflation and tax, your capital is eroding in purchasing power.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Income Delusion</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The goal is not a lump sum; it is indestructible cash flow. If your yield is below 10%, you are mathematically guaranteed to draw down your principal. The calculator below exposes the capital required to avoid that outcome.
              </p>
            </div>
          </div>
          {/* Lead-in to calculator */}
          <div className="rounded-[2rem] bg-gradient-to-br from-blue-950/30 to-transparent border border-white/10 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">
              This calculator tests your assumptions with math
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              No generic multiples. No hopeful estimates. Just the actual capital required for the income you say you need. It accounts for inflation, tax, withdrawal rates, and time.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator – premium Bento with red risk glow */}
      <section id="calculator" className="py-12 md:py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20 scroll-mt-24">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.12)] p-0 overflow-hidden">
          <RetirementRealityCalculator />
        </div>
      </section>

      {/* Fix CTA: Erase the Deficit with Structured Yield */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Erase the Deficit with Structured Yield.</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              You cannot save your way out of a capital deficit. You must engineer a higher, fixed yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/everest-amethyst-living-annuity"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
              >
                Calculate Amethyst Living Annuity (~10.2% Net) →
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-4 rounded-[2rem] hover:bg-white/10 transition-colors"
              >
                Book Actuarial Consultation
              </Link>
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
