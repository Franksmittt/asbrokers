import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Independent Financial Advisor Alberton | About AS Brokers CC",
  description:
    "AS Brokers CC is your independent financial advisor in Alberton, East Rand. FSP 17273. Category 1.8. Albert Schuurman & Johnny Farinha. Retirement, insurance, estate planning since 1998.",
  openGraph: {
    title: "Independent Financial Advisor Alberton | About AS Brokers CC",
    description: "Independent financial advisor Alberton. FSP 17273. 25+ years. Retirement, Everest Wealth, estate.",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">About us</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Independent Financial Advisor Alberton
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            AS Brokers CC is an independent, authorised financial services provider based in Alberton, East Rand, Gauteng. We hold FSP 17273 and a Category 1.8 (Securities and Instruments: Shares) license, enabling us to advise on and distribute unlisted alternative investments, including Everest Wealth products, alongside retirement planning, insurance, and estate structuring.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/team"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-200"
            >
              Meet the team
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Why an independent advisor in Alberton</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We are not tied to a single product house. Our advice is built around your goals: retirement income, estate duty mitigation, business continuity, and tax-efficient structures. As a Code 1.8 FSP broker, we can offer Everest Wealth fixed-return and living annuity solutions that many advisers cannot distribute.
          </p>
          <p className="text-zinc-500 text-sm">
            FSP 17273 · Alberton, East Rand, Gauteng · Est. 1998 · 25+ years experience
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
