import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Semigration & Retirement Villages Western Cape | AS Brokers CC",
  description:
    "Semigration and retirement villages Western Cape: financial planning for HNWIs relocating from Gauteng to the coast. Retirement capital, estate planning, and lifestyle transition. AS Brokers CC.",
  openGraph: {
    title: "Semigration & Retirement Villages Western Cape | AS Brokers CC",
    description: "Financial planning for semigration and Western Cape retirement. Capital deployment, estate, living annuities.",
  },
};

export default function SemigrationRetirementPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Insights</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Semigration & Retirement Villages Western Cape
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            A significant demographic shift is under way: high-net-worth individuals and families are relocating from Gauteng to the Western Cape (semigration), driven by lifestyle, governance, and energy resilience. That move often involves redeploying capital, downsizing or upgrading property, and rethinking retirement income and estate planning.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Retirement villages Western Cape</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Retirement villages and coastal nodes, from Hermanus and George to the Cape Winelands, attract buyers who want security, healthcare access, and community. Financing the move and sustaining income in retirement often requires a clear picture of existing retirement capital, drawdown strategies, and tax-efficient structures such as living annuities.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Planning for the transition</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Whether you are considering semigration or already relocating, aligning your retirement capital, estate plan, and income needs with your new lifestyle is essential. We help clients structure drawdown rates, assess fixed-return and living annuity options, and ensure liquidity and tax efficiency through the transition.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/retirement" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-200">
              Retirement Reality Calculator
            </Link>
            <Link href="/everest-amethyst-living-annuity" prefetch={false} className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10">
              Amethyst Living Annuity
            </Link>
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
              Contact us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
