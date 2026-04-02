import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Medical Aid & Gap Cover South Africa | AS Brokers FSP 17273 Krugersdorp",
  description:
    "Medical scheme options, gap cover as short-term insurance, and health planning for families and professionals. Independent FSP 17273—clear on CMS schemes vs insurance products.",
  keywords: [
    "medical aid South Africa",
    "gap cover insurance",
    "medical scheme options",
    "health insurance adviser Gauteng",
    "FSP 17273",
  ],
};

export default function MedicalAidPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article>
        <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Health & Integration</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Medical Aid & Gap Cover</h1>
            <p className="text-xl text-zinc-400">The Health to Enjoy the Wealth You Build</p>
            <p className="text-zinc-500 mt-4 max-w-3xl mx-auto leading-relaxed">
              In South Africa, <strong className="text-zinc-400 font-medium">registered medical schemes</strong> fall under
              the <strong className="text-zinc-400 font-medium">Medical Schemes Act</strong> and oversight distinct from typical
              FAIS long-term products. <strong className="text-zinc-400 font-medium">Gap cover</strong> is usually a{" "}
              <strong className="text-zinc-400 font-medium">short-term insurance</strong> policy that pays toward in-hospital
              shortfalls when specialists charge above scheme tariff—subject to policy caps, waiting periods, and insurer rules.
              We help you compare options in plain language; we do not promise scheme benefit outcomes or claim approvals.
            </p>
            <p className="trust-hallmark text-xs text-zinc-600 mt-6">FSP 17273 · Scheme rules and PMBs apply per scheme</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Medical schemes: what to compare</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Scheme options differ by <strong className="text-zinc-300">network</strong>,{" "}
              <strong className="text-zinc-300">savings accounts</strong>, <strong className="text-zinc-300">day-to-day</strong>
              {" "}rules, and <strong className="text-zinc-300">chronic medicine</strong> programmes. Prescribed Minimum Benefits
              (PMBs) exist for certain conditions within scheme frameworks—but practical access still depends on scheme
              formularies, designated service providers, and pre-authorisation. Always read the scheme’s rules each year;
              benefits and contributions change.
            </p>
            <p className="text-zinc-500 text-sm">
              We assist with structured comparisons; final membership is between you and the scheme you select.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Gap cover: how it fits</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Gap policies are not substitutes for scheme membership for in-hospital care; they work alongside your scheme,
              within annual caps introduced under regulations that limit gap exposure relative to scheme benefits. Waiting
              periods for pre-existing conditions, oncology sub-limits, and co-payment riders vary—disclosure at application is
              critical to avoid later repudiation.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you change schemes, review gap alignment; combination mismatches are a frequent source of frustration.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Integration with risk and income planning</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Executives often carry <Link href="/solutions/life-insurance" className="text-cinematic-teal hover:underline">severe illness</Link>{" "}
              and <strong className="text-zinc-300">income protection</strong> alongside medical benefits. We map overlaps so
              you are not paying twice for the same risk event without knowing it, or leaving oncology shortfalls uncovered because
              products were bought in isolation.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Wellness and day-to-day costs</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Day-to-day spend, dental, and optical are often self-funded or scheme-specific. We can discuss budgeting and
              alternative structures that fit your tax and cash-flow picture—without presenting unlicensed “health insurance” as
              a magic substitute for a medical scheme where the law expects scheme membership.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Regulatory note</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Medical schemes are regulated by the Council for Medical Schemes (CMS). This page summarises general distinctions
              only; it is not a substitute for scheme brochures or insurer policy books. FSP 17273 for intermediary services
              within our licence categories.{" "}
              <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">Disclosures</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Review my medical aid and gap cover
            </Link>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}
