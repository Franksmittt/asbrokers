import Link from "next/link";
import { Footer } from "@/components/Footer";
import { IncomeTaxCalculator } from "@/components/IncomeTaxCalculator";

export const metadata = {
  title: "South African Income Tax Calculator (2025–2026) | AS Brokers",
  description:
    "Calculate your South African PAYE based on official SARS 2025/26 tax tables. See annual tax, monthly PAYE, effective tax rate and net pay.",
};

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            AS Brokers · Tax Planning
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Income Tax Calculator
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Calculate your South African PAYE based on official SARS 2025/26 tax tables.
          </p>
          <p className="text-zinc-500 mt-4">
            Enter your gross monthly salary and age to see exactly how much goes to SARS, and how much you actually take home.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
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
            2025–2026 SARS tax tables. Its purpose is simple: to show you how much income you actually keep after tax,
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

      {/* Tax Is Not Static in Retirement */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Tax Is Not Static in Retirement</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Your tax position in retirement is not static. It changes as:
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2 mb-4">
            <li>Income sources shift</li>
            <li>Drawdown rates change</li>
            <li>Investments are added or sold</li>
            <li>Age-based rebates apply differently over time</li>
          </ul>
          <p className="text-zinc-400 leading-relaxed">
            An income structure that looks tax-efficient today may become less efficient if it isn&apos;t reviewed and
            adjusted.
          </p>
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

      {/* CTA: Want Help Improving */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want Help Improving Your After-Tax Retirement Income?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Complete the form and we will contact you to review your results and discuss practical ways to improve tax
            efficiency as part of your broader retirement plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Complete the form below
          </Link>
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
