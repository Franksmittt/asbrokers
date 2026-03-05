import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Everest Wealth Products | Fixed-Return Retirement Investments SA | AS Brokers",
  description: "Which Everest product fits your retirement? 12.8% Strategic Income, 14.2% Onyx Income+, 14.5% Strategic Growth, Amethyst Living Annuity.",
};

const trustPoints = [
  "Everest Wealth FSP 795",
  "Fixed returns",
  "Not market-linked",
  "Zero broker fees",
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
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Which Everest Product Fits Your Retirement?
          </h1>
          <p className="text-xl text-zinc-400 mb-6">
            Four investment options. One question: what does your money need to do for you? Use this guide to find the right structure, then run the numbers with your own calculator.
          </p>
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
            {trustPoints.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                {p}
              </li>
            ))}
          </ul>
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

      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Voluntary capital income options</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {incomeOptions.map((opt) => (
              <div key={opt.href} className="bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-white/20 transition-colors">
                {opt.tag && (
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{opt.tag}</span>
                )}
                <h3 className="text-xl font-bold text-white mt-2 mb-1">{opt.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{opt.subtitle}</p>
                <p className="text-zinc-500 text-sm mb-4">{opt.desc}</p>
                <ul className="text-zinc-500 text-xs space-y-1 mb-6">
                  {opt.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
                <Link href={opt.href} className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline">
                  {opt.cta} →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/everest-128-product" className="text-zinc-500 text-sm hover:text-white">
              ⚖ Compare 12.8% vs 14.2% side by side (use both calculators)
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voluntary capital growth option */}
            <div className="bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-white/20 transition-colors">
              <h2 className="text-lg font-bold text-white mb-4">Voluntary capital growth option</h2>
              <h3 className="text-xl font-bold text-white mb-2">{growthOption.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{growthOption.subtitle}</p>
              <p className="text-zinc-500 text-sm mb-4">{growthOption.desc}</p>
              <ul className="text-zinc-500 text-xs space-y-1 mb-6">
                {growthOption.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <Link href={growthOption.href} className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline">
                {growthOption.cta} →
              </Link>
            </div>
            {/* Compulsory retirement money */}
            <div className="bg-[#151518] rounded-[2rem] p-6 border border-white/5 hover:border-white/20 transition-colors">
              <h2 className="text-lg font-bold text-white mb-4">Compulsory retirement money</h2>
              <h3 className="text-xl font-bold text-white mb-2">{amethystOption.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{amethystOption.subtitle}</p>
              <p className="text-zinc-500 text-sm mb-4">{amethystOption.desc}</p>
              <ul className="text-zinc-500 text-xs space-y-1 mb-6">
                {amethystOption.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <Link href={amethystOption.href} className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline">
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
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Let&apos;s have that conversation
          </Link>
          <p className="text-zinc-500 text-sm mt-4">or WhatsApp: 067 242 9946</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Understanding Everest Wealth</h2>
          <p className="text-zinc-500 text-sm mb-4">
            Everest Wealth Management (Pty) Ltd is an authorised Financial Services Provider (FSP 795). AS Brokers (FSP 17273) acts as an independent intermediary. All returns shown are based on current product terms and are not guaranteed. Past performance is not indicative of future results. These investments involve unlisted shares with limited liquidity during the investment term. Please consult with a qualified financial adviser before making any investment decisions.
          </p>
          <Link href="/everest-wealth/about" className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline mb-6">
            Read a detailed guide: how it works, structure, risks and tax →
          </Link>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
            <span>AS Brokers FSP 17273</span>
            <span>FSCA 1.8 Shares Authority</span>
            <span>25+ Years Experience</span>
            <span>Zero Broker Fees</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
          <Link href="/everest-wealth/about" className="text-blue-400 hover:underline">Understanding Everest Wealth</Link>
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">Contact us on WhatsApp 067 242 9946</a>
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
