import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FutureValueCalculator } from "@/components/FutureValueCalculator";

export const metadata = {
  title: "Future Value Calculator (Inflation) | Test Your Buying Power | AS Brokers",
  description:
    "Understand the impact of inflation on your savings and purchasing power over time. See what today's money will be worth in the future.",
};

export default function CostOfInflationPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            AS Brokers · Inflation Planning
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Future Value Calculator
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-4">
            Understand the impact of inflation on your savings and purchasing power over time.
          </p>
          <p className="text-zinc-500">
            See what today&apos;s money will actually be worth in the future, and how much more you&apos;ll need just to
            maintain the same lifestyle.
          </p>
        </div>
      </section>

      {/* Teaser bullets */}
      <section className="py-8 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-zinc-400">
            <span>Future cost of living</span>
            <span>Purchasing power lost</span>
            <span>Real growth required</span>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <FutureValueCalculator />
        </div>
      </section>

      {/* Understanding the Impact of Inflation */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Understanding the Impact of Inflation on Your Money
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The calculator above shows what today&apos;s money will be worth in the future after inflation. It does not
            measure how much your money grows on paper; it shows what your money can actually buy in real terms.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Inflation is one of the biggest and most underestimated risks in retirement planning. While prices
            don&apos;t rise dramatically in a single year, inflation compounds quietly over time. Over a 10–20 year
            period, this erosion can significantly reduce purchasing power if income and investment growth fail to keep
            up.
          </p>
        </div>
      </section>

      {/* The Common Misconception */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">The Common Misconception</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Many people assume that as long as their investments are growing, their retirement plan is on track. The
            problem is that income can increase while buying power decreases.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Groceries, medical costs, insurance, fuel, and everyday living expenses rise year after year, regardless of
            what your account balance looks like.
          </p>
        </div>
      </section>

      {/* What This Calculator Helps You Do */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What This Calculator Helps You Do</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            This calculator helps you test that reality by translating a current rand amount or income into its future
            buying power. It allows you to:
          </p>
          <ul className="space-y-2 text-zinc-400">
            {[
              "See how inflation affects future income needs",
              "Compare investment growth against inflation to assess real growth",
              "Understand how sensitive long-term outcomes are to small changes in inflation",
              "Replace assumptions and rules of thumb with realistic projections",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The Critical Question */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">The Critical Question</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            This tool highlights a critical planning question:
          </p>
          <p className="text-zinc-300 font-medium mb-4">
            Will your future income still support your lifestyle in today&apos;s terms?
          </p>
          <p className="text-zinc-400 leading-relaxed">
            If the future value shown is lower than you expected, it means your current income or capital will buy less
            in the future, even if the nominal rand amount grows.
          </p>
        </div>
      </section>

      {/* The Real Question / Everest CTA */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Are Your Investments Beating Inflation, or Just Keeping You Busy?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Most investments give you one good year, then take it back the next. Up 12%, down 8%, sideways for two
            years. The statement looks like progress, but your purchasing power hasn&apos;t moved.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            If your growth depends on market timing and luck, you don&apos;t have a plan. You have a gamble with a nice
            logo on the statement.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            What if your investment delivered consistent, double-digit returns, in good years and bad? Not a promise. A
            structure. Built to deliver fixed returns through unlisted share investments, regardless of what the market
            does.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline"
          >
            See what consistent growth looks like
          </Link>
          <span className="text-zinc-500 text-sm ml-2">– View indicative Everest Wealth product projections</span>
        </div>
      </section>

      {/* Purpose and Next Steps */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Purpose and Next Steps</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The purpose of this calculator is not prediction or precision. It is awareness. It shows the gap inflation
            creates over time.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Closing that gap requires more than chasing returns. It requires proper structure, tax efficiency, and
            income planning that focuses on real (after-inflation, after-tax) outcomes. Use this calculator as a
            starting point to understand the problem. The solution lies in how income is structured to keep pace with
            inflation over decades, not just years.
          </p>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="https://wa.me/27672429946"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Contact us on WhatsApp · 067 242 9946
          </a>
          <div className="mt-4 text-zinc-500 text-sm">
            Albert Schuurman & Johnny Farinha · AS Brokers | FSP 17273 · Independent Authorised Financial Service Provider
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
