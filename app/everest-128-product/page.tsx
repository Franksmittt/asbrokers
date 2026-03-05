import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Everest128Calculator } from "@/components/Everest128Calculator";

export const metadata = {
  title: "Strategic Income Calculator | Fixed 12.8% Return + Bonus | AS Brokers",
  description: "Turn your capital into predictable monthly income. Fixed 12.8% p.a., 20% dividend tax, 10% loyalty bonus at year 5.",
};

export default function Everest128Page() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Turn Your Capital Into Predictable Monthly Income
          </h1>
          <p className="text-xl text-zinc-400">
            See exactly what your investment can pay you every month, with fixed returns and tax efficiency built in.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Everest128Calculator />
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <span>Albert Schuurman & Johnny Farinha</span>
          <span>AS Brokers | FSP 17273</span>
          <Link href="/everest-wealth" className="text-blue-400 hover:underline">Investment options</Link>
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
