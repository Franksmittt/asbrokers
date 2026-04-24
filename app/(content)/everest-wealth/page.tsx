import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { FAQSchema } from "@/components/FAQSchema";

export const metadata = {
  title: "Everest Wealth Products | Alternative Private Equity Investments South Africa",
  description:
    "Everest Wealth brokers: 12.8% Strategic Income, 14.2% Onyx Income+, 14.5% Strategic Growth, Amethyst Living Annuity. Fixed-return alternative private equity investments South Africa. FSP 17273.",
};

/** One readable column inside the full-bleed strip (matches phases + cards). */
const CONTENT = "mx-auto w-full max-w-6xl";

const everestWealthFAQs = [
  {
    question: "How are Everest Wealth returns taxed compared to interest?",
    answer:
      "Returns from Everest Wealth unlisted preference shares are distributed as dividends and subject to a flat 20% Dividends Withholding Tax (DWT) at source. Interest income and salary are taxed at your marginal income tax rate, which can be up to 45%. For high earners, the 20% DWT can preserve significantly more of your yield than marginal tax on interest.",
  },
  {
    question: "What is the minimum investment for Everest voluntary products?",
    answer:
      "Participation in the Strategic Growth, Strategic Income, or Onyx Income+ portfolios requires a minimum lump-sum investment of R100,000. This threshold is set by the product issuer and is enforced for all investors.",
  },
  {
    question: "Can I withdraw my capital early from Everest voluntary products?",
    answer:
      "Everest Wealth voluntary capital products are illiquid. Redemptions are not an automatic investor right and are subject to the discretion of the security issuer. If an exceptional early withdrawal is approved, you must give a 120-day notice period. An early exit penalty of up to 15% of the capital amount may be applied to protect the fund and remaining shareholders.",
  },
  {
    question: "Why is there a 120-day notice and 15% early exit penalty?",
    answer:
      "Unlisted private equity is illiquid by nature. The 120-day notice and potential 15% early exit penalty protect the underlying assets and remaining investors from sudden liquidity demands. They are disclosed in the product terms and form part of the structural risk of these alternative investments.",
  },
];

const trustTags = ["FSP 17273", "FSCA Category 1.8 (Shares)", "Zero Advice Fees"];

const incomeOptions = [
  {
    title: "12.8% Strategic Income",
    tag: "Most popular",
    subtitle: "Fixed 12.8% p.a. + 10% loyalty bonus at year 5",
    desc: "Predictable monthly income with long-term value. Best if you can accept slightly lower cash flow now in exchange for a capital bonus at maturity.",
    features: [
      "Fixed 12.8% per year for 5 years",
      "Monthly dividend income",
      "Dividends taxed at flat 20% (not income tax)",
      "10% loyalty bonus on capital after 5 years",
      "Capital returned at maturity",
      "Zero broker fees; 100% invested",
    ],
    href: "/everest-128-product",
    cta: "Calculate my 12.8% income",
  },
  {
    title: "14.2% Onyx Income+",
    tag: null,
    subtitle: "Fixed 14.2% p.a., maximum income from day one",
    desc: "Highest monthly income from day one. Best for retirees who need every rand of cash flow now and do not want to wait for a bonus.",
    features: [
      "Fixed 14.2% per year for 5 years",
      "Monthly dividend income from day one",
      "Dividends taxed at flat 20%",
      "No loyalty bonus (trade-off for higher rate)",
      "Broad private-sector diversification",
      "Zero broker fees",
    ],
    href: "/immediate-higher-income-calculator",
    cta: "Calculate my 14.2% income",
  },
];

const growthOption = {
  title: "14.5% Strategic Growth",
  subtitle: "Compound growth. No monthly income.",
  desc: "For capital you do not need to draw on during the term. Returns compound at 14.5% for five years and are paid at maturity.",
  features: [
    "Fixed 14.5% compound growth per year",
    "No monthly withdrawals; returns accumulate",
    "Dividends taxed at 20% on growth at maturity",
    "Capital committed for the full 5-year term",
    "Zero broker fees",
  ],
  href: "/everest-strategic-growth-145",
  cta: "Calculate 5-year growth",
};

const amethystOption = {
  title: "Amethyst Living Annuity",
  subtitle: "Pension, preservation & RA money. Structured returns, tax-sheltered growth.",
  desc: "A living annuity for pension, provident, preservation, or retirement annuity funds. Structured returns instead of day-to-day market noise. Growth inside the annuity is tax-free.",
  features: [
    "Structured net return profile (10.2% p.a.)",
    "Drawdown flexibility: 2.5% – 17.5%",
    "No tax on growth inside the annuity",
    "Tax only on income drawn (marginal rate)",
    "9% capital bonus after 5 years",
    "Inflation protection benefit included",
    "Zero broker fees",
  ],
  href: "/everest-amethyst-living-annuity",
  cta: "Calculate my annuity income",
};

function PhaseHeader({ phase, title, subtitle }: { phase: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-8 md:mb-10">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cinematic-teal">{phase}</p>
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">{subtitle}</p>
      ) : null}
    </header>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="my-6 flex flex-1 flex-col gap-2.5">
      {items.map((f) => (
        <li key={f} className="flex gap-3 text-sm leading-snug text-zinc-400">
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cinematic-teal/90 shadow-[0_0_6px_rgba(0,128,128,0.45)]"
            aria-hidden
          />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function ProductCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-3 text-sm font-semibold text-white transition-colors hover:border-cinematic-teal/50 hover:bg-cinematic-teal/10 hover:text-teal-100 sm:w-auto sm:self-start sm:px-8"
    >
      {children}
    </Link>
  );
}

export default function EverestWealthPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <FAQSchema faqs={everestWealthFAQs} />

      <section className="border-b border-white/[0.06] pb-12 pt-28 md:pb-16 md:pt-32">
        <div className={PAGE_CONTENT_MAX}>
          <div className={`${CONTENT} text-center`}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Code 1.8 wealth engineering suite
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[2.75rem] md:leading-[1.08]">
              The alternative yield portfolio
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Bypass listed-market noise. Deploy capital into unlisted preference shares built for fixed returns, tax
              efficiency, and a clear five-year arc.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {trustTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-green-500/15 text-green-400">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-8 md:py-10">
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStrip
            variant="primary"
            src="/images/everest-suite-hero-16x9.jpg"
            alt="Real-economy sector backing structured income: agriculture, hospitality or industry, no people"
            priority
            rounded="3xl"
          />
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-14 md:py-16">
        <div className={PAGE_CONTENT_MAX}>
          <div className={CONTENT}>
            <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">Start here</h2>
            <p className="mb-6 text-sm text-zinc-500 md:text-base">Two questions point you to the right product.</p>
            <ol className="list-decimal space-y-5 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-600 md:text-base md:pl-6">
              <li className="pl-1">
                <strong className="font-semibold text-zinc-200">What type of money is this?</strong>
                <p className="mt-1.5 text-zinc-500">
                  Voluntary capital (savings, proceeds, cash): use the income and growth options in Phases 1 and 2.
                  Compulsory retirement money (pension, provident, preservation, RA): jump to Amethyst in Phase 3.
                </p>
              </li>
              <li className="pl-1">
                <strong className="font-semibold text-zinc-200">What do you need from it?</strong>
                <p className="mt-1.5 text-zinc-500">
                  Monthly income now: 12.8% Strategic Income (balanced) or 14.2% Onyx Income+ (max yield). Pure growth,
                  no income: 14.5% Strategic Growth. Unsure on split? Use the calculators or speak to us.
                </p>
              </li>
            </ol>
            <div className="mt-10">
              <PageMediaStrip
                variant="secondary"
                src="/images/everest-copper-industrial-4x3.jpg"
                alt="Industrial and copper processing suggesting tangible assets behind unlisted income strategies, no people"
                rounded="3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 */}
      <section className="border-b border-white/[0.06] py-14 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className={CONTENT}>
            <PhaseHeader
              phase="Phase 1"
              title="Immediate cash flow"
              subtitle="Two voluntary products. Same five-year discipline. Different trade-off between cash today and bonus at the end."
            />
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {incomeOptions.map((opt) => (
                <article
                  key={opt.href}
                  className="rim-light flex h-full flex-col rounded-[1.75rem] border-0 p-6 transition-colors duration-300 hover:bg-white/[0.04] md:rounded-[2rem] md:p-8"
                >
                  <div className="mb-1 flex min-h-[1.75rem] flex-wrap items-center gap-2">
                    {opt.tag ? (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">{opt.tag}</span>
                    ) : null}
                    {opt.href === "/immediate-higher-income-calculator" ? (
                      <span className="rounded-md bg-cinematic-teal/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cinematic-teal">
                        Max day-1 yield
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{opt.title}</h3>
                  <p className="mt-2 text-sm font-medium text-zinc-300">{opt.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{opt.desc}</p>
                  <FeatureList items={opt.features} />
                  <ProductCta href={opt.href}>{opt.cta} →</ProductCta>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-zinc-600">
              <Link href="/everest-128-product" prefetch={false} className="text-cinematic-teal hover:underline">
                Compare 12.8% vs 14.2% side by side
              </Link>{" "}
              (run both calculators with your numbers).
            </p>
          </div>
        </div>
      </section>

      {/* Phase 2: copy + stats panel */}
      <section className="border-b border-white/[0.06] py-14 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className={CONTENT}>
            <PhaseHeader
              phase="Phase 2"
              title="Pure capital compounding"
              subtitle="One product. No monthly withdrawals. The right-hand panel is the headline economics at a glance."
            />
            <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              <article className="rim-light flex flex-col rounded-[1.75rem] border-0 p-6 md:rounded-[2rem] md:p-8">
                <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{growthOption.title}</h3>
                <p className="mt-2 text-sm font-medium text-zinc-300">{growthOption.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{growthOption.desc}</p>
                <FeatureList items={growthOption.features} />
                <ProductCta href={growthOption.href}>{growthOption.cta} →</ProductCta>
              </article>

              <aside className="rim-light flex flex-col justify-between gap-8 rounded-[1.75rem] border-0 bg-gradient-to-br from-[#151518] via-[#12141a] to-[#0d0f14] p-6 md:rounded-[2rem] md:p-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Targeted compound</p>
                  <p className="mt-2 text-5xl font-black tabular-nums tracking-tight text-white md:text-6xl">14.5%</p>
                  <p className="mt-1 text-sm text-zinc-500">Per annum, fixed for the term. Not a guarantee of future results.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-2xl font-bold tabular-nums text-white">5</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">Year lock</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-2xl font-bold tabular-nums text-teal-300">20%</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">DWT at maturity</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600">
                  Illustrative only. Read the disclosure pack before you commit capital.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 3: same pattern (fixes empty grid column) */}
      <section className="border-b border-white/[0.06] py-14 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className={CONTENT}>
            <PhaseHeader
              phase="Phase 3"
              title="Retirement & compulsory money"
              subtitle="Amethyst is for pension, preservation, provident, and RA capital under living-annuity rules."
            />
            <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              <article className="rim-light flex flex-col rounded-[1.75rem] border-0 p-6 md:rounded-[2rem] md:p-8">
                <span className="mb-3 inline-flex w-fit rounded-md bg-cinematic-teal/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cinematic-teal">
                  Section 14 transfer approved
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{amethystOption.title}</h3>
                <p className="mt-2 text-sm font-medium text-zinc-300">{amethystOption.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{amethystOption.desc}</p>
                <FeatureList items={amethystOption.features} />
                <ProductCta href={amethystOption.href}>{amethystOption.cta} →</ProductCta>
              </article>

              <aside className="rim-light flex flex-col justify-between gap-8 rounded-[1.75rem] border-0 bg-gradient-to-br from-[#151518] via-[#12141a] to-[#0d0f14] p-6 md:rounded-[2rem] md:p-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Structured net profile</p>
                  <p className="mt-2 text-5xl font-black tabular-nums tracking-tight text-teal-300 md:text-6xl">10.2%</p>
                  <p className="mt-1 text-sm text-zinc-500">p.a. on current terms. Growth inside the annuity is tax-free until you draw.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-lg font-bold leading-tight text-white">
                      2.5<span className="text-zinc-600">–</span>17.5%
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">Drawdown band</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-2xl font-bold tabular-nums text-white">9%</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">Capital bonus (yr 5)</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600">
                  Regulation 28 and living-annuity rules apply. We map this to your existing funds in advice.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-14 md:py-16">
        <div className={PAGE_CONTENT_MAX}>
          <div className={`${CONTENT} text-center`}>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Not sure which one fits? Most people only know after income, tax, estate, and horizon are on the table.
              Calculators give numbers; a conversation gives context.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
            >
              Let&apos;s have that conversation
            </Link>
            <p className="mt-4 text-sm text-zinc-600">WhatsApp: 067 242 9946</p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-12 md:py-14">
        <div className={PAGE_CONTENT_MAX}>
          <div className={CONTENT}>
            <p className="text-sm leading-relaxed text-zinc-600">
              Everest Wealth Management (Pty) Ltd is an authorised Financial Services Provider (FSP 795). AS Brokers
              (FSP 17273) acts as an independent intermediary. All returns shown are based on current product terms and
              are not guaranteed. Past performance is not indicative of future results. These investments involve
              unlisted shares with limited liquidity during the investment term. Please consult a qualified financial
              adviser before making any investment decisions.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs font-medium uppercase tracking-wider text-zinc-600">
              <span>AS Brokers FSP 17273</span>
              <span>FSCA 1.8 shares</span>
              <span>25+ years</span>
              <span>Zero broker fees</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-12 md:py-14">
        <div className={PAGE_CONTENT_MAX}>
          <div className={CONTENT}>
            <div className="rim-light rounded-[1.75rem] border-0 p-6 md:rounded-[2rem] md:p-8">
              <p className="text-sm leading-relaxed text-zinc-400">
                Understanding the architecture: underlying structures, tax routing, and risk protocols for Everest
                Wealth.
              </p>
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:underline"
              >
                Read fiduciary briefing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className={`${PAGE_CONTENT_MAX} flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm`}>
          <Link href="/everest-wealth/about" prefetch={false} className="text-cinematic-teal hover:underline">
            Understanding Everest Wealth
          </Link>
          <a
            href="https://wa.me/27672429946"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            WhatsApp 067 242 9946
          </a>
          <Link href="/contact" prefetch={false} className="text-cinematic-teal hover:underline">
            Contact
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
