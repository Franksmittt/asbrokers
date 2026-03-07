import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Personal Life Insurance and Life Cover | AS Brokers South Africa",
  description: "Death cover, permanent disability, temporary disability, severe illness. Income protection structured around your life, not products.",
};

export default function LifeInsurancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Life Insurance</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Personal Life Insurance</h1>
          <p className="text-xl text-zinc-400">It&apos;s Not About Dying. It&apos;s About What Happens to Your Income.</p>
          <p className="text-zinc-500 mt-4">Four distinct covers: death, permanent disability, temporary disability, severe illness. Most people have some; very few have all structured correctly.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">The four critical components</h2>
          <ul className="text-zinc-400 space-y-4">
            <li><strong className="text-white">Death cover.</strong> Provide for dependants, settle debt, cover the cost of dying.</li>
            <li><strong className="text-white">Permanent disability.</strong> Often more financially destructive than death; you consume but no longer contribute.</li>
            <li><strong className="text-white">Income protection (temporary disability).</strong> Who pays your salary if you can&apos;t work for 6 or 12 months?</li>
            <li><strong className="text-white">Severe illness (dread disease).</strong> Lump sum for recovery, best care and living expenses during a health crisis.</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-6">We structure insurance around your income first, not around products. Life changes; insurance must keep up.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-zinc-400 text-sm">If your cover has not been reviewed in years, you may be paying too much, underinsured, or both. We assess what you have, identify gaps, and show you what properly structured life insurance looks like.</p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/premium-increase-calculator" className="text-blue-400 hover:underline text-sm font-medium">Premium increase calculator</Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Request a life insurance review
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
