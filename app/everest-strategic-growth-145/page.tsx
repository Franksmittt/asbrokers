import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Everest145GrowthCalculator } from "@/components/Everest145GrowthCalculator";

export const metadata = {
  title: "Everest Strategic Growth 14.5% Calculator | AS Brokers",
  description: "Grow your capital at 14.5% per year. Fixed compound growth for 5 years, 20% tax on dividends at maturity.",
};

export default function Everest145Page() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Grow Your Capital at 14.5% Per Year
          </h1>
          <p className="text-xl text-zinc-400">
            For investors who don&apos;t need income now. Your capital compounds at a fixed rate for 5 years no market risk, no decisions to make.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Everest145GrowthCalculator />
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact us on WhatsApp 067 242 9946</a>
          <Link href="/everest-wealth" className="text-blue-400 hover:underline">Investment options</Link>
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
