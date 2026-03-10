import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Everest128Calculator } from "@/components/Everest128Calculator";

export const metadata = {
  title: "Strategic Income Calculator | Fixed 12.8% Return + Bonus | AS Brokers",
  description: "Turn your capital into predictable monthly income. Fixed 12.8% p.a., 20% dividend tax, 10% loyalty bonus at year 5.",
};

export default function Everest128Page() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 Wealth Engineering</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Yield Engineering: 12.8% Strategic Income.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Calculate your predictable monthly cash flow. Unlisted, insulated from market volatility, and engineered with a 10% capital maturity bonus at year 5.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-0 overflow-hidden">
          <Everest128Calculator />
        </div>
      </section>
      {/* Fiduciary Compliance & Structure – Bento grid */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Fiduciary Compliance & Structure</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Regulated Efficiency</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                All yields are subject to a flat 20% Dividend Withholding Tax (DWT), vastly outperforming standard income tax scales.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">Authority</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Albert Schuurman & Johnny Farinha · AS Brokers FSP 17273 · Code 1.8 Shares.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/everest-wealth" className="text-cinematic-teal hover:underline">Investment options</Link>
                <Link href="/contact" className="text-cinematic-teal hover:underline">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
