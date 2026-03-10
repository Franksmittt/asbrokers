import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Everest142Calculator } from "@/components/Everest142Calculator";

export const metadata = {
  title: "Immediate Higher Income Calculator | 14.2% Gross Assumption | AS Brokers",
  description: "Everest 14.2% investment calculator. Estimated monthly income from a fixed 14.2% annual return, 20% dividend tax.",
};

export default function ImmediateHigherIncomePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 Wealth Engineering</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Maximum Liquidity: 14.2% Onyx Income+.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Engineered for maximum day-one cash flow. Secure a fixed 14.2% annual return, bypassing public market volatility.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Everest142Calculator />
        </div>
      </section>
      {/* Dual-column Bento: The Mathematical Advantage + Ideal Capital Deployment */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Mathematical Advantage</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This option is designed for absolute income certainty, entirely divorced from daily market fluctuations. Your yield is fixed, transparent, and not affected by headlines, volatility, or timing.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Ideal Capital Deployment</h2>
              <ul className="space-y-3 text-zinc-400 text-sm">
                {[
                  "Maximum immediate income from day one",
                  "Willingness to trade the 10% maturity bonus for higher monthly yield",
                  "Preference for dividend tax efficiency over interest-based tax",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cinematic-teal/20 text-cinematic-teal mt-0.5" aria-hidden>
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* CTA – Squircle container */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-8 md:p-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
            >
              Request Official Onyx Term Sheet →
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp 067 242 9946</a>
          <Link href="/everest-wealth" className="text-cinematic-teal hover:underline">Investment options</Link>
          <Link href="/contact" className="text-cinematic-teal hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
