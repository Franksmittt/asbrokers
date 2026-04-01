import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Medical Aid & Gap Cover | AS Brokers FSP 17273",
  description:
    "Medical scheme options, gap cover and health benefits for families and professionals. Independent advice in Krugersdorp and Gauteng.",
};

export default function MedicalAidPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Health & Integration</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Medical Aid & Gap Cover</h1>
          <p className="text-xl text-zinc-400">The Health to Enjoy the Wealth You Build</p>
          <p className="text-zinc-500 mt-4">
            Choosing a medical scheme option, adding gap cover where specialists charge above tariff, and reviewing benefits as your family changes—so you are not caught short at claim time.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">How we support you</h2>
          <ul className="text-zinc-400 space-y-2">
            <li>· Medical aid option reviews (hospital, savings, network plans)</li>
            <li>· Gap cover to reduce shortfalls on in-hospital specialist charges</li>
            <li>· Day-to-day, chronic and oncology benefits in plain language</li>
            <li>· Wellness and integration with your broader risk and wealth plan</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">
            Medical schemes are regulated separately from FAIS long-term insurance; we help you compare structured benefits and gap products suited to your needs. Always read scheme rules and gap policy wording.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Wellness & high-earner planning</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            For executives and business owners, health benefits often sit alongside income protection and severe illness cover. We can map how these pieces fit so you are not double-paying or leaving gaps.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Review my medical aid and gap cover
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
