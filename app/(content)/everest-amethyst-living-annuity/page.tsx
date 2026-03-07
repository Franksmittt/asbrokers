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
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Amethyst Living Annuity Calculator
          </h1>
          <p className="text-xl text-zinc-400">
            Structured returns, tax-sheltered growth. For pension, provident, preservation, or RA funds.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <AmethystAnnuityCalculator />
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Understanding the Results Above</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The figures illustrate how the Amethyst Living Annuity behaves based on your inputs. The investment earns a fixed net return of 10.2% per year. Returns are not linked to market movements. If your income drawdown stays below the return, capital is preserved. A 9% capital bonus is added after five years. Income figures are after estimated tax based on SARS 2026/27 tables (Budget 2026).
          </p>
          <h2 className="text-xl font-bold text-white mb-4 mt-8">Who Typically Considers the Amethyst Living Annuity</h2>
          <p className="text-zinc-400 leading-relaxed mb-2">Generally considered by retirees or pre-retirees who:</p>
          <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-6">
            <li>Want predictable, stable retirement income</li>
            <li>Prefer certainty over market volatility</li>
            <li>Do not want ongoing fund switching or performance monitoring</li>
            <li>Value simplicity and transparency in retirement planning</li>
          </ul>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Request a formal quotation or discuss transfer
          </Link>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp 067 242 9946</a>
          <Link href="/everest-wealth" className="text-blue-400 hover:underline">Investment options</Link>
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
