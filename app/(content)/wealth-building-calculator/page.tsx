import Link from "next/link";
import { Footer } from "@/components/Footer";
import { WealthBuildingCalculator } from "@/components/WealthBuildingCalculator";

export const metadata = {
  title: "AS Brokers Wealth Building Calculator",
  description:
    "Calculate future wealth using compound growth, monthly contributions and annual increases. The AS Brokers Wealth Building Calculator helps illustrate investment growth, business growth and long-term financial freedom planning.",
};

export default function WealthBuildingCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 md:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,84,159,0.45), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Capital Lifespan &amp; Wealth Planning
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            AS Brokers Wealth Building Calculator
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Model how capital can grow over time — for investments, retirement savings, business growth, or financial
            freedom planning. No artificial limits on growth assumptions.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10">
          <WealthBuildingCalculator />
        </div>
      </section>

      <section className="border-t border-white/5 px-4 py-16 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-white">What this tool is for</h2>
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">
            This is a general-purpose compound growth calculator — not only an investment tool. Use it to illustrate how
            starting capital, monthly contributions, annual contribution increases, and your chosen growth rate combine
            over time.
          </p>
          <ul className="space-y-2 text-sm text-zinc-500">
            {[
              "Investment and wealth accumulation scenarios",
              "Retirement savings projections",
              "Business growth illustrations",
              "Financial freedom planning conversations",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#00549F]">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-[2rem] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              All calculators
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[2rem] bg-white px-6 py-3 text-sm font-bold text-black hover:bg-zinc-200"
            >
              Speak to AS Brokers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
