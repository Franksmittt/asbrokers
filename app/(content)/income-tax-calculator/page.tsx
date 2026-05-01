import Link from "next/link";
import { Footer } from "@/components/Footer";
import { IncomeTaxCalculator } from "@/components/IncomeTaxCalculator";

export const metadata = {
  title: "South African Income Tax Calculator (2026/27) | AS Brokers",
  description:
    "Calculate your South African PAYE based on official SARS 2026/27 tax tables (Budget 2026). See annual tax, monthly PAYE, effective tax rate and net pay.",
};

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            Phase 2: Risk Architecture · Tax Exposure.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            The Income Tax Liability Engine.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Calculate your exact marginal tax exposure based on official SARS 2026/27 tables. Understand how traditional income structures are penalizing your wealth.
          </p>
          <p className="text-zinc-500 mt-4 text-sm">
            Enter your gross monthly salary and age. Rates as of Budget 2026. Consult a tax practitioner for the latest.
          </p>
        </div>
      </section>

      {/* Calculator – Bento card */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 overflow-hidden">
          <IncomeTaxCalculator />
        </div>
      </section>

      {/* Understanding Your Retirement Income Tax Position */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Understanding Your Retirement Income Tax Position
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The calculator above estimates your South African income tax based on the income you entered and the current
            2026/27 SARS tax tables (Budget 2026). Its purpose is simple: to show you how much income you actually keep after tax,
            not just what you earn before tax.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            In retirement, tax matters more than most people expect. Income usually comes from multiple sources, such as
            living annuities, dividends, interest, rental income, or business income, and each is taxed differently.
            When these income streams overlap, retirees are often pushed into higher tax brackets without realising it.
          </p>
        </div>
      </section>

      {/* What This Calculator Shows */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What This Calculator Shows</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">This calculator helps you:</p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2 mb-4">
            <li>Estimate your annual income tax payable</li>
            <li>See your effective tax rate (what you really pay overall)</li>
            <li>Understand your net income after tax</li>
            <li>Test how changes in income affect your tax outcome</li>
          </ul>
          <p className="text-zinc-400 leading-relaxed">
            Many retirement plans fail not because investments perform badly, but because tax is underestimated or
            poorly structured. Small inefficiencies compound over time and quietly erode both income and capital.
          </p>
        </div>
      </section>

      {/* The Fiduciary Advantage: Tax Arbitrage – Bento card */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">The Fiduciary Advantage: Tax Arbitrage</h2>
            <p className="text-zinc-400 leading-relaxed">
              Standard interest-bearing investments are penalized by marginal tax rates (up to 45%). By restructuring capital into private equity preference shares (such as Everest Wealth), your yields are subjected to a flat 20% Dividend Withholding Tax (DWT). This single structural change can drastically increase your net take-home yield.
            </p>
          </div>
        </div>
      </section>

      {/* The Real Question */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">The Real Question</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The real retirement tax planning question is not: &quot;How much tax do I pay?&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            but rather: &quot;How do I structure my income so that I keep more of it, legally and sustainably?&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed">
            This calculator shows you what is happening. Proper planning focuses on why, and how to improve it.
          </p>
        </div>
      </section>

      {/* Who This Tool Is Designed For */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Who This Tool Is Designed For</h2>
          <p className="text-zinc-400 leading-relaxed">
            If your income does not come from a single payslip, or if you are relying on multiple income sources in
            retirement, this tool is designed for you.
          </p>
        </div>
      </section>

      {/* CTA: Restructure Your Tax Liability */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Restructure Your Tax Liability.</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Stop paying marginal rates on your investment growth. Let our wealth engineers structure your capital for maximum tax efficiency.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
            >
              Initiate Tax-Efficient Structuring →
            </Link>
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
