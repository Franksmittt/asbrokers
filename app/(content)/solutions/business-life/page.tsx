import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Business Life Insurance for South African Companies | AS Brokers",
  description: "Buy-and-sell agreements, key person insurance, contingent liability, loan account cover. Structure first, insurance funds the agreement.",
};

export default function BusinessLifePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Business Insurance</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Business Life Insurance & Employee Benefits</h1>
          <p className="text-xl text-zinc-400">Protecting Your Partners, Directors, and Key Employees</p>
          <p className="text-zinc-500 mt-4">The technical discipline most brokers avoid and often get wrong. We specialise in it.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Core structures we specialise in</h2>
          <ul className="text-zinc-400 space-y-4">
            <li><strong className="text-white">Buy-and-sell agreements</strong> Surviving partners retain control; families receive fair value. We ensure valuations are realistic, ownership and beneficiaries correct, and funding works in practice.</li>
            <li><strong className="text-white">Key person insurance</strong> Protects the business from the loss of critical individuals. Cash flow, client retention, replacement costs.</li>
            <li><strong className="text-white">Contingent liability cover</strong> Critical where directors have signed personal sureties. Without it, banks can call in loans on death.</li>
            <li><strong className="text-white">Loan account insurance</strong> One of the most overlooked risks. Protects business cash flow, estate liquidity and families from unexpected liabilities.</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">Contracts first. Insurance funds the agreement. We work alongside legal and valuation specialists so structure comes first.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-zinc-400 text-sm">This service is for business owners with partners or shareholders, directors with surety exposure, companies with loan accounts, and businesses reliant on key individuals. If your business fits, this conversation is essential.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Review your business assurance & contracts
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
