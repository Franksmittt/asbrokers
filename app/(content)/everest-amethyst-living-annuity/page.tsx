import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AmethystAnnuityCalculator } from "@/components/AmethystAnnuityCalculator";
import { FAQSchema } from "@/components/FAQSchema";

export const metadata = {
  title: "Amethyst Living Annuity | Fixed 10.2% Retirement Income | AS Brokers CC",
  description:
    "Amethyst Living Annuity for pension, provident, preservation and RA funds. Drawdown 2.5%–17.5%. Non-Regulation 28. Tax-sheltered growth. SARS 2026/27 estimate for 65+.",
};

const amethystFAQs = [
  {
    question: "Is the Amethyst Living Annuity subject to Regulation 28?",
    answer:
      "The Amethyst Living Annuity is governed by the Long-term Insurance Act and FSCA regulations applicable to living annuities. It is not restricted by Regulation 28 of the Pension Funds Act (which applies to pension and RA funds before retirement). This allows greater investment flexibility, including exposure to the structured return profile that targets around 10.2% net per annum.",
  },
  {
    question: "What drawdown rates can I choose?",
    answer:
      "Pension fund rules for living annuities allow an annual drawdown of between 2.5% and 17.5% of the capital value. You can select a rate within this range to match your income needs. The Amethyst product targets a structured net return of approximately 10.2% per year; if your drawdown is below the return, capital can be preserved or grow.",
  },
  {
    question: "How is tax applied to the Amethyst Living Annuity?",
    answer:
      "Growth inside the annuity is tax-free. Only the income you draw down is taxed at your marginal income tax rate (e.g. under SARS 2026/27 tables). This is different from interest or rental income outside an annuity wrapper, which are fully taxable at your marginal rate.",
  },
];

export default function AmethystAnnuityPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <FAQSchema faqs={amethystFAQs} />
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Phase 3: Retirement Liquidity Architecture.</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Insulated Retirement: The Amethyst Living Annuity.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Transfer your Pension, Provident, or Retirement Annuity into a fixed-yield structure. Secure predictable income (~10.2% net) and a 9% capital maturity bonus, completely insulated from JSE crashes.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <AmethystAnnuityCalculator />
        </div>
      </section>
      {/* 2-column Bento: The Yield Architecture + Strategic Deployment */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Yield Architecture</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                The Amethyst delivers a fixed net return of{" "}
                <span className="text-cinematic-teal font-bold text-lg">~10.2%</span> per year, with a{" "}
                <span className="text-cinematic-teal font-bold text-lg">9%</span> capital maturity bonus after five years. Returns are not linked to market movements; capital and income are insulated from JSE volatility.
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Income tax is calculated based on standard SARS drawdown tables.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Strategic Deployment</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                For retirees demanding absolute certainty: zero ongoing fund-switching fees, no performance monitoring, and complete isolation from market sequencing risk. Your income and capital growth are structured, predictable, and tax-sheltered inside the annuity.
              </p>
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
              Initiate Section 14 Pension Transfer Review →
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
