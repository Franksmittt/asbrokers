import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Estate Planning, Wills & Trusts | AS Brokers FSP 17273",
  description:
    "Wills, trusts, estate duty planning and liquidity. Independent advice in Krugersdorp and Gauteng. Link to calculators and fiduciary structuring.",
};

export default function EstatePlanningPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Legacy Structuring</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Estate Planning & Trusts</h1>
          <p className="text-xl text-zinc-400">Secure Your Legacy With Clear Documents and Tax-Efficient Structures</p>
          <p className="text-zinc-500 mt-4">
            A valid will, appropriate trusts where they add value, and a plan for estate duty and liquidity help your family avoid disputes and forced sales. We work with your attorneys and tax advisers where needed.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">What we help you align</h2>
          <ul className="text-zinc-400 space-y-2">
            <li>· Wills and amendments that match your assets and wishes</li>
            <li>· Trusts for asset protection, minors, or business continuity—where appropriate</li>
            <li>· Estate duty and liquidity: what SARS and executors may require</li>
            <li>· Coordination with life cover and buy-and-sell structures for businesses</li>
            <li>· Annual donation planning within SARS limits (R100k / R200k)</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">
            We are an authorised financial services provider (FSP 17273). Complex legal drafting remains the domain of your attorney; we focus on financial and risk alignment with your estate plan.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Tools to stress-test the numbers</h2>
          <ul className="text-zinc-400 space-y-3">
            <li>
              <Link href="/estate-duty-calculator" className="text-cinematic-teal hover:underline font-medium">
                Estate duty calculator
              </Link>
              <span className="text-zinc-500"> — approximate duty and executor fees.</span>
            </li>
            <li>
              <Link href="/annual-estate-reduction-strategy" className="text-cinematic-teal hover:underline font-medium">
                Annual estate reduction strategy
              </Link>
              <span className="text-zinc-500"> — model donations over time.</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Discuss estate planning with an adviser
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
