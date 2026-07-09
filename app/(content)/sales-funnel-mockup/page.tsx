import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX } from "@/components/PageMediaStrip";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/sales-funnel-mockup",
  title: "Sales Funnel Mockup | Everest Strategic Income Example",
  description:
    "A standalone AS Brokers sales funnel mockup for Everest Strategic Income 12.8%, created as a client-facing example of a high-converting financial-services funnel.",
  noIndex: true,
});

const proofItems = [
  {
    eyebrow: "Proof of work",
    title: "Show the advice process, not just the promise",
    body: "The funnel makes the invisible work tangible: capital suitability checks, liquidity warnings, dividend-tax modelling, and advisor review steps are visible before the call is booked.",
  },
  {
    eyebrow: "Objection pre-handling",
    title: "Answer the hard questions early",
    body: "Liquidity, risk, minimum investment, tax treatment, and whether the product is suitable are handled in the main story rather than hidden at the bottom.",
  },
  {
    eyebrow: "Low-friction conversion",
    title: "One clear next step",
    body: "Instead of asking a cold visitor to invest, the page offers a personalised income clarity report and then moves qualified leads into an advisor consultation.",
  },
];

const funnelStages = [
  {
    stage: "Awareness",
    offer: "Free income clarity report",
    detail: "A simple lead magnet that estimates the monthly income profile and flags key suitability questions.",
  },
  {
    stage: "Consideration",
    offer: "Proof pack and advisor explainer",
    detail: "Documentary-style evidence: dividend example, liquidity terms, real-economy backing narrative, and FAIS disclosure.",
  },
  {
    stage: "Conversion",
    offer: "15-minute retirement income fit call",
    detail: "A low-pressure booking step that checks goals, capital source, liquidity needs, and risk tolerance.",
  },
  {
    stage: "Ascension",
    offer: "Full wealth architecture review",
    detail: "The client can move from one product enquiry into estate, insurance, tax, and retirement planning conversations.",
  },
];

const objectionCards = [
  {
    question: "Is my capital locked in?",
    answer:
      "The page would disclose that voluntary Everest capital products are illiquid, with withdrawals subject to issuer discretion, a 120-day notice period, and a possible early-exit penalty.",
  },
  {
    question: "Is 12.8% guaranteed?",
    answer:
      "The copy uses targeted-return language and keeps risk visible. The mockup shows the return profile as an illustration that must be reviewed with an advisor.",
  },
  {
    question: "What about tax?",
    answer:
      "The funnel frames dividend withholding tax in plain language and invites the visitor to compare it with their own marginal income-tax position.",
  },
  {
    question: "Am I suitable?",
    answer:
      "The lead step asks about capital source, emergency liquidity, income need, and time horizon before positioning the consultation.",
  },
];

const valueStack = [
  "Illustrative income estimate",
  "Liquidity and risk checklist",
  "Dividend-tax explainer",
  "Advisor suitability screen",
  "Next-step wealth architecture map",
];

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cinematic-teal">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">{title}</h2>
      {children ? <div className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">{children}</div> : null}
    </div>
  );
}

function MockInput({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</span>
      <input
        readOnly
        value={value}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300 outline-none"
      />
    </label>
  );
}

function FunnelMetric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-rim-glow">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{note}</p>
    </div>
  );
}

export default function SalesFunnelMockupPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050507]">
      <section className="relative border-b border-white/[0.07] pb-16 pt-28 md:pb-24 md:pt-36">
        <BackgroundOrbs />
        <div className={`${PAGE_CONTENT_MAX} relative z-10`}>
          <div className="mx-auto mb-8 flex max-w-5xl flex-wrap items-center justify-center gap-3 text-center">
            <span className="rounded-full border border-supernova-gold/30 bg-supernova-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-supernova-gold">
              Mockup concept only
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Unlinked standalone funnel page
            </span>
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cinematic-teal">
                Everest Strategic Income 12.8% funnel example
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Turn idle capital into a structured income conversation.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                A high-converting AS Brokers funnel could educate cautious investors, make the advice process visible, and
                move qualified prospects toward a retirement income fit call.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#lead-capture"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
                >
                  Preview the lead magnet
                </Link>
                <Link
                  href="#proof"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:border-cinematic-teal/50 hover:bg-cinematic-teal/10"
                >
                  See proof structure
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["FSP 17273", "R100k minimum", "120-day liquidity notice", "Advisor-reviewed"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rim-light rounded-[2.5rem] p-4 shadow-[0_0_80px_rgba(0,128,128,0.16)]">
              <div className="rounded-[2rem] border border-white/10 bg-[#101014] p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Income preview
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">R1,000,000 example</p>
                  </div>
                  <span className="rounded-full bg-cinematic-teal/15 px-3 py-1 text-xs font-semibold text-teal-200">
                    Targeted
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <FunnelMetric
                    label="Annual profile"
                    value="12.8%"
                    note="Targeted annual dividend yield before product risk review."
                  />
                  <FunnelMetric
                    label="Monthly gross"
                    value="R10,667"
                    note="Illustrative monthly dividend before withholding tax."
                  />
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-supernova-gold/20 bg-supernova-gold/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-supernova-gold">
                    Maturity hook
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">10% loyalty bonus at year 5</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    The funnel makes the upside easy to understand while keeping liquidity and suitability warnings visible.
                  </p>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Visitor path</p>
                  <div className="mt-4 space-y-3">
                    {["Estimate income", "Download report", "Book advisor fit call"].map((step, index) => (
                      <div key={step} className="flex items-center gap-3 text-sm text-zinc-300">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                          {index + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="relative border-b border-white/[0.07] py-16 md:py-24">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeader eyebrow="Documentary realism" title="A financial funnel should feel evidenced, not advertised.">
            <p>
              The handbook recommends showing proof of work, handling objections early, and reducing cognitive friction.
              This mockup translates those ideas into a regulated financial-services context.
            </p>
          </SectionHeader>

          <div className="grid gap-4 md:grid-cols-3">
            {proofItems.map((item) => (
              <article key={item.title} className="rim-light rounded-[2rem] p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">{item.eyebrow}</p>
                <h3 className="mt-4 text-xl font-bold tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#101014] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Behind-the-scenes proof panel
              </p>
              <div className="mt-6 space-y-4 font-mono text-xs text-zinc-400">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  client.capital_source = voluntary_cash
                  <br />
                  minimum_check = passed_R100000
                  <br />
                  liquidity_warning = required_before_call
                </div>
                <div className="rounded-2xl border border-cinematic-teal/20 bg-cinematic-teal/10 p-4 text-teal-100">
                  advisor_review_queue: Albert or Johnny
                  <br />
                  advice_status: suitability_screen_pending
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Value ladder</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {funnelStages.map((item) => (
                  <div key={item.stage} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-bold text-cinematic-teal">{item.stage}</p>
                    <h3 className="mt-2 font-semibold text-white">{item.offer}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] py-16 md:py-24">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeader eyebrow="Pre-handle objections" title="The page can build trust before the visitor speaks to anyone.">
            <p>
              Instead of burying risk in a generic FAQ, the funnel turns predictable concerns into clear, advisor-friendly
              explanations.
            </p>
          </SectionHeader>

          <div className="grid gap-4 md:grid-cols-2">
            {objectionCards.map((item) => (
              <article key={item.question} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-bold tracking-[-0.03em] text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lead-capture" className="py-16 md:py-24">
        <div className={PAGE_CONTENT_MAX}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2.5rem] border border-white/10 bg-[#101014] p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cinematic-teal">Lead magnet mockup</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                Get your retirement income clarity report.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-400">
                This would be the non-threatening conversion point: the client receives a tailored report, and AS Brokers
                receives enough context to route the enquiry properly.
              </p>

              <ul className="mt-8 space-y-3">
                {valueStack.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-300">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cinematic-teal/15 text-xs font-bold text-teal-200">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rim-light rounded-[2.5rem] p-4">
              <div className="rounded-[2rem] bg-black/30 p-5 md:p-7">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Example form state</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Preview your income profile</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    Static mockup only. A production version would use Zod validation, a Server Action, CRM capture, and
                    advisor assignment.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <MockInput label="Investment amount" value="R1,000,000" />
                  <MockInput label="Capital source" value="Voluntary cash" />
                  <MockInput label="Income need" value="Monthly income" />
                  <MockInput label="Time horizon" value="5 years" />
                </div>

                <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-500">Illustrative monthly gross income</p>
                      <p className="mt-1 text-4xl font-bold tracking-[-0.05em] text-white">R10,667</p>
                    </div>
                    <span className="rounded-full bg-supernova-gold/15 px-3 py-1 text-xs font-semibold text-supernova-gold">
                      Before DWT
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                    This figure is for demonstration only and is not financial advice, a guarantee, or a recommendation.
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.01] hover:shadow-cta-glow-gold"
                >
                  Generate my report - mock button
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-relaxed text-amber-100">
            <strong>Compliance note:</strong> This page is a visual mockup for a sales-funnel concept. Any production
            version should be reviewed for FAIS, POPIA, product-provider disclosure, risk wording, suitability language,
            record keeping, and consent before going live.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
