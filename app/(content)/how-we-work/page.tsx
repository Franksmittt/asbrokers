import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";

const pillars = [
  {
    title: "Diagnose",
    body: "We start with your current position: retirement runway, tax leakage, estate drag, and insurance gaps. We use calculators to make risk visible before any recommendation.",
  },
  {
    title: "Design",
    body: "We structure a practical plan using the right mix of retirement, protection, and legacy tools. Every recommendation must match your goals, liquidity needs, and timeline.",
  },
  {
    title: "Implement",
    body: "Once agreed, we execute the plan end-to-end: product setup, portfolio allocation, and policy structure. You get a clear implementation path, not theory.",
  },
  {
    title: "Review",
    body: "Financial plans are living systems. We review performance, adjust for life and market changes, and keep your structure aligned with outcomes over time.",
  },
];

const reviewChecks = [
  "Will your retirement income still hold under inflation pressure?",
  "Are tax and estate costs reducing what your family receives?",
  "Is your insurance structure still aligned to your current liabilities?",
  "Are your product choices delivering the role they were selected for?",
];

export default function HowWeWorkPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <section className="border-b border-white/5 pt-28 pb-14 md:pt-32 md:pb-16">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">How we work</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Structured Advice. Measurable Outcomes.
            </h1>
            <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
              Most people get product pitches. We run a repeatable process that diagnoses risk, designs a strategy,
              implements with precision, and reviews for long-term control.
            </p>
          </div>
          <div className="mt-10">
            <PageMediaStrip
              variant="primary"
              src="/images/about-fiduciary-plaque-4x3.jpg"
              alt="Financial planning documents and compliance folders on adviser desk, no people"
              rounded="3xl"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-14 md:py-16">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mb-8 max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Our four-step client process</h2>
            <p className="text-sm leading-relaxed text-zinc-500 md:text-base">
              The same framework is used across retirement, risk, and legacy work so you always know where you are in
              the journey.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-[#101014] p-6 md:p-7">
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400 md:text-base">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-14 md:py-16">
        <div className={PAGE_CONTENT_MAX}>
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">What we check at every review</h2>
              <p className="text-sm leading-relaxed text-zinc-500 md:text-base">
                Reviews are not admin meetings. They are decision meetings focused on preserving outcomes.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#101014] p-6 md:p-7">
                <ul className="space-y-2.5">
                  {reviewChecks.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300 md:text-base">
                      <span className="mt-0.5 text-cinematic-teal">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#151518] to-[#1a1a24] p-8 text-center md:p-12">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">Ready for a structured review?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Bring your current portfolio, policies, and goals. We will show where the gaps are and what to do next.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-black hover:bg-zinc-200 sm:w-auto"
              >
                Book consultation
              </Link>
              <Link
                href="/calculators"
                prefetch={false}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Explore calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
