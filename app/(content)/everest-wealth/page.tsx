import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FAQSchema } from "@/components/FAQSchema";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata = {
  title: "Everest Wealth Products | Alternative Private Equity Investments South Africa",
  description:
    "Everest Wealth brokers: 12.8% Strategic Income, 14.2% Onyx Income+, 14.5% Strategic Growth, Amethyst Living Annuity. Fixed-return alternative private equity investments South Africa. FSP 17273.",
};

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

const trustTags = [
  "FSP 17273",
  "FSCA Category 1.8 (Shares)",
  "Zero Advice Fees",
];

const incomeOptions = [
  {
    title: "12.8% Strategic Income",
    tag: "Most popular",
    subtitle: "Fixed 12.8% p.a. + 10% loyalty bonus at year 5",
    desc: "Predictable monthly income with long-term value. Best for investors who can accept slightly lower monthly income in exchange for a capital bonus at maturity.",
    features: [
      "Fixed 12.8% per year for 5 years",
      "Monthly dividend income",
      "Dividends taxed at flat 20% (not income tax)",
      "10% loyalty bonus on capital after 5 years",
      "Capital returned at maturity",
      "Zero broker fees 100% invested",
    ],
    href: "/everest-128-product",
    cta: "Calculate my 12.8% income",
  },
  {
    title: "14.2% Onyx Income+",
    tag: null,
    subtitle: "Fixed 14.2% p.a. maximum income now",
    desc: "Highest monthly income from day one. Best for retirees who need every rand of cash flow now and don't want to wait for a bonus.",
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
  subtitle: "Compound growth no monthly income",
  desc: "For capital you don't need income from. Returns compound at 14.5% for 5 years and are paid at maturity.",
  features: [
    "Fixed 14.5% compound growth per year",
    "No monthly withdrawals returns accumulate",
    "Dividends taxed at 20% on growth at maturity",
    "Capital committed for full 5-year term",
    "Zero broker fees",
  ],
  href: "/everest-strategic-growth-145",
  cta: "Calculate 5-year growth",
};

const amethystOption = {
  title: "Amethyst Living Annuity",
  subtitle: "For pension / RA money structured returns, tax-sheltered growth",
  desc: "A living annuity for pension, provident, preservation, or retirement annuity funds. Structured returns instead of market-linked volatility. Growth inside the annuity is tax-free.",
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

export default function EverestWealthPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <FAQSchema faqs={everestWealthFAQs} />
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">Code 1.8 Wealth Engineering Suite.</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            The Alternative Yield Portfolio.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            Bypass public market volatility. Deploy capital into unlisted preference shares engineered for fixed returns, tax efficiency, and absolute certainty.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {trustTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 shadow-[0_0_12px_rgba(34,197,94,0.08)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-green-500/15 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-8 py-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <ImagePlaceholder
            src="/images/everest-visual.jpg"
            alt="Everest Wealth fixed-return investment options"
            aspectRatio="16/9"
            placeholderLabel="everest-visual.jpg"
          />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Start here</h2>
          <p className="text-zinc-400 mb-4">Answer two questions to find the right product:</p>
          <ol className="text-zinc-400 space-y-2 list-decimal list-inside">
            <li><strong className="text-zinc-300">What type of money are you investing?</strong><br />Voluntary capital (savings, sale proceeds, cash) see the three income and growth options below. Compulsory retirement money (pension, provident, preservation, RA) scroll to the Amethyst Living Annuity.</li>
            <li><strong className="text-zinc-300">What do you need from this investment?</strong><br />Monthly income now 12.8% Strategic Income (recommended) or 14.2% Onyx Income+. Capital growth, no income 14.5% Strategic Growth. Not sure how much to allocate? use the Income Goal Calculator or contact us.</li>
          </ol>
        </div>
      </section>

      {/* Phase 1: Immediate Cash Flow Architecture */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Phase 1: Immediate Cash Flow Architecture</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {incomeOptions.map((opt) => (
              <div key={opt.href} className="bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {opt.tag && (
                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{opt.tag}</span>
                  )}
                  {opt.href === "/immediate-higher-income-calculator" && (
                    <span className="text-xs font-semibold text-cinematic-teal uppercase tracking-wider px-2 py-0.5 rounded-md bg-cinematic-teal/20">
                      Max Day-1 Yield
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mt-2 mb-1">{opt.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{opt.subtitle}</p>
                <p className="text-zinc-500 text-sm mb-4">{opt.desc}</p>
                <ul className="text-zinc-500 text-xs space-y-1 mb-6">
                  {opt.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
                <Link href={opt.href} prefetch={false} className="inline-flex items-center gap-2 text-cinematic-teal font-medium hover:underline">
                  {opt.cta} →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/everest-128-product" prefetch={false} className="text-zinc-500 text-sm hover:text-white">
              ⚖ Compare 12.8% vs 14.2% side by side (use both calculators)
            </Link>
          </div>
        </div>
      </section>

      {/* Phase 2: Pure Capital Compounding */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Phase 2: Pure Capital Compounding</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-blue-500/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">{growthOption.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{growthOption.subtitle}</p>
              <p className="text-zinc-500 text-sm mb-4">{growthOption.desc}</p>
              <ul className="text-zinc-500 text-xs space-y-1 mb-6">
                {growthOption.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <Link href={growthOption.href} prefetch={false} className="inline-flex items-center gap-2 text-cinematic-teal font-medium hover:underline">
                {growthOption.cta} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 3: Retirement Liquidity Isolation */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Phase 3: Retirement Liquidity Isolation</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-blue-500/40 transition-colors">
              <span className="text-xs font-semibold text-cinematic-teal uppercase tracking-wider px-2 py-0.5 rounded-md bg-cinematic-teal/20 inline-block mb-2">
                Section 14 Transfer Approved
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-2">{amethystOption.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{amethystOption.subtitle}</p>
              <p className="text-zinc-500 text-sm mb-4">{amethystOption.desc}</p>
              <ul className="text-zinc-500 text-xs space-y-1 mb-6">
                {amethystOption.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <Link href={amethystOption.href} prefetch={false} className="inline-flex items-center gap-2 text-cinematic-teal font-medium hover:underline">
                {amethystOption.cta} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-400 mb-6">
            Not sure which one fits? Most clients don&apos;t know until we&apos;ve discussed their full picture income needs, tax position, estate plan, and time horizon. The calculators give you clarity. A conversation gives you confidence.
          </p>
          <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Let&apos;s have that conversation
          </Link>
          <p className="text-zinc-500 text-sm mt-4">or WhatsApp: 067 242 9946</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-zinc-500 text-sm mb-4">
            Everest Wealth Management (Pty) Ltd is an authorised Financial Services Provider (FSP 795). AS Brokers (FSP 17273) acts as an independent intermediary. All returns shown are based on current product terms and are not guaranteed. Past performance is not indicative of future results. These investments involve unlisted shares with limited liquidity during the investment term. Please consult with a qualified financial adviser before making any investment decisions.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
            <span>AS Brokers FSP 17273</span>
            <span>FSCA 1.8 Shares Authority</span>
            <span>25+ Years Experience</span>
            <span>Zero Broker Fees</span>
          </div>
        </div>
      </section>

      {/* Tertiary CTA: Fiduciary Briefing */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Understanding the Architecture. Review the underlying structures, tax routing, and risk mitigation protocols of Everest Wealth.
            </p>
            <Link href="/everest-wealth/about" prefetch={false} className="inline-flex items-center gap-2 text-cinematic-teal font-medium hover:underline">
              Read Fiduciary Briefing →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
          <Link href="/everest-wealth/about" prefetch={false} className="text-cinematic-teal hover:underline">Understanding Everest Wealth</Link>
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">Contact us on WhatsApp 067 242 9946</a>
          <Link href="/contact" prefetch={false} className="text-cinematic-teal hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
