import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RetirementShortfallCalculator } from "@/components/RetirementShortfallCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Retirement Readiness Calculator | Gap & Contribution Planning";
const PAGE_DESCRIPTION =
  "Estimate your retirement capital shortfall, projected savings, and monthly contribution required. Educational retirement readiness tool for South Africans. FSP 17273.";

const readinessFAQs = [
  {
    question: "What is the Retirement Readiness Calculator?",
    answer:
      "It compares the retirement capital you may need against the projected value of your current savings, estimates any shortfall, and illustrates a starting monthly contribution that could help close the gap.",
  },
  {
    question: "How is this different from the Retirement Reality Calculator?",
    answer:
      "Retirement Reality estimates the lump sum required at retirement to fund income for life. Retirement Readiness adds your current savings and contribution path to show whether you are on track and what gap remains.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement-readiness",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function RetirementReadinessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <PageJsonLd path="/retirement-readiness" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} faqs={readinessFAQs} />

      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 md:px-8">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-red-600/15 blur-[100px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Retirement Planning
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Retirement Readiness Calculator
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Are you on track? Compare required retirement capital against projected savings, see your gap, and explore
            what a starting contribution might look like.
          </p>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10">
          <RetirementShortfallCalculator />
        </div>
      </section>

      <section className="border-t border-white/5 px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-3">
          <Link
            href="/retirement"
            className="inline-flex items-center justify-center rounded-[2rem] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Retirement Reality Calculator
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center justify-center rounded-[2rem] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            All calculators
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[2rem] bg-white px-6 py-3 text-sm font-bold text-black hover:bg-zinc-200"
          >
            Speak to AS Brokers
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
