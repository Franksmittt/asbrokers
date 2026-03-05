import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Business Short-Term Insurance for South African Companies | AS Brokers",
  description: "Protecting the businesses that create South Africa's wealth. Property, liability, business interruption, fleet. Specialists, not call centres.",
};

export default function BusinessInsurancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Business Insurance</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Business Short-Term Insurance</h1>
          <p className="text-xl text-zinc-400">Protecting the Businesses That Create South Africa&apos;s Wealth</p>
          <p className="text-zinc-500 mt-4">Business insurance is complex by nature. That&apos;s exactly why it needs specialists not salespeople reading from scripts.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">What we cover</h2>
          <ul className="text-zinc-400 space-y-2">
            <li>· Buildings & business property</li>
            <li>· Machinery & equipment</li>
            <li>· Stock (seasonal & transit)</li>
            <li>· Business interruption & loss of income</li>
            <li>· Public & products liability</li>
            <li>· Professional indemnity</li>
            <li>· Employers&apos; liability</li>
            <li>· Theft, money & fidelity</li>
            <li>· Electronic equipment & cyber risks</li>
            <li>· Goods in transit & fleet</li>
            <li>· Contract works & industry-specific risks</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">We don&apos;t apply templates. Each business is assessed on how it actually operates.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Our approach: risk first, insurance second</h2>
          <p className="text-zinc-400 text-sm mb-4">We start by understanding your business: how it earns money, what would stop that income, and what single event would bankrupt the business if uninsured. Only then do we structure cover.</p>
          <p className="text-zinc-500 text-sm">50–60% of AS Brokers&apos; practice income comes from business short-term insurance. This is our core focus.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Review your business risk structure
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
