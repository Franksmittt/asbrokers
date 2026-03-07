import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Everest142Calculator } from "@/components/Everest142Calculator";

export const metadata = {
  title: "Immediate Higher Income Calculator | 14.2% Gross Assumption | AS Brokers",
  description: "Everest 14.2% investment calculator. Estimated monthly income from a fixed 14.2% annual return, 20% dividend tax.",
};

export default function ImmediateHigherIncomePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Everest 14.2% Investment Calculator
          </h1>
          <p className="text-xl text-zinc-400">
            Highest monthly income from day one. Fixed 14.2% p.a., 20% dividend tax.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Everest142Calculator />
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">What This Result Means</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The amount shown is the estimated monthly income from a fixed 14.2% annual return, paid regularly over the investment term. This option is designed for income certainty, not market speculation. Your income is not affected by daily market movements, headlines, or volatility.
          </p>
          <h2 className="text-xl font-bold text-white mb-4 mt-8">Who This Option Is Typically Best For</h2>
          <p className="text-zinc-400 leading-relaxed mb-2">This option is commonly used by investors who:</p>
          <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-6">
            <li>Want the highest possible monthly income now</li>
            <li>Do not want to wait for bonuses or future enhancements</li>
            <li>Can commit capital for the full term</li>
            <li>Prefer certainty over volatility</li>
            <li>Want better tax efficiency than interest-based income</li>
          </ul>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Contact me for an official quote
          </Link>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp 067 242 9946</a>
          <Link href="/everest-wealth" className="text-blue-400 hover:underline">Investment options</Link>
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
