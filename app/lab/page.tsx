import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RunOutCalculator } from "@/components/RunOutCalculator";

const tools = [
  { name: "Retirement run-out", desc: "When does your money run out?", href: "#calculator" },
  { name: "Retirement Reality Calculator", desc: "How much capital do you really need?", href: "/retirement" },
  { name: "Life cover needs", desc: "Rough estimate of cover needed", href: "/contact" },
  { name: "Estate liquidity", desc: "Estate duty and liquidity check", href: "/contact" },
];

export default function LabPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">The Lab</h1>
          <p className="text-zinc-400 text-lg mb-4">
            10+ free calculators for retirement, investment and risk. So you know where you stand.
          </p>
          <Link
            href="/calculators"
            className="text-blue-400 hover:underline text-sm font-medium"
          >
            See all calculators, products & education
          </Link>
        </div>
      </section>
      <section id="calculator" className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">The &quot;Run-Out&quot; Calculator.</h2>
          <p className="text-zinc-400 max-w-3xl">
            Adjust the sliders to see when your capital might face the &quot;cliff&quot; based on current withdrawal rates.
          </p>
        </div>
        <RunOutCalculator />
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 pb-32">
        <h2 className="text-xl font-bold text-white mb-6">More tools</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              className="bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-white/20 transition-colors block"
            >
              <h3 className="font-bold text-white">{t.name}</h3>
              <p className="text-zinc-500 text-sm mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-zinc-500 text-sm mt-8">
          More calculators coming. Need something specific?{" "}
          <Link href="/contact" className="text-blue-400 hover:underline">Contact us</Link>.
        </p>
      </section>
      <Footer />
    </div>
  );
}
