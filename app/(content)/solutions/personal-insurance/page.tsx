import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Personal Short-Term Insurance for Cars & Homes | AS Brokers",
  description: "When you need protection that actually protects. Home, motor, valuables, liability and travel. Structured with claims in mind.",
};

export default function PersonalInsurancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Short-Term Insurance</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Personal Short-Term Insurance</h1>
          <p className="text-xl text-zinc-400">When You Need Protection That Actually Protects</p>
          <p className="text-zinc-500 mt-4">Cheap insurance looks good until something goes wrong. We structure cover with claims in mind, not just premiums.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">What we cover</h2>
          <ul className="text-zinc-400 space-y-2">
            <li>· Home buildings and contents</li>
            <li>· Motor vehicles (private and commercial)</li>
            <li>· Household goods and personal effects</li>
            <li>· All risk cover (portable items)</li>
            <li>· Watercraft and leisure equipment</li>
            <li>· Valuable items (jewellery, electronics)</li>
            <li>· Personal liability</li>
            <li>· Travel insurance</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">Each policy is structured on your actual situation. We check sums insured, replacement values, and wording so it matches your needs.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">What makes AS Brokers different</h2>
          <ul className="text-zinc-400 space-y-2">
            <li>· Full-time dedicated claims specialist</li>
            <li>· Underwriting team, not a call centre</li>
            <li>· Direct advisor involvement</li>
            <li>· 47 years combined experience (Albert and Johnny)</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">We are not the cheapest option. We are the right option when you want insurance that works at claim time.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Get your personal insurance reviewed
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
