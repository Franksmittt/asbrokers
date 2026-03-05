import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Understanding Everest Wealth | How It Works, Structure & Risks | AS Brokers",
  description:
    "A clear guide to Everest Wealth Management: regulation, product structure, how returns are generated, tax benefits, risks, and who these investments suit. Independent analysis for informed decisions.",
};

export default function EverestWealthAboutPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Education</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Understanding Everest Wealth
          </h1>
          <p className="text-xl text-zinc-400">
            How the structure works, where returns come from, and what you need to know before investing. A detailed, easy-to-follow overview.
          </p>
        </div>
      </section>

      {/* Why alternatives in South Africa */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Why alternative investments in South Africa?</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            South Africa&apos;s economy in 2026 is marked by inflation, high interest rates, and structural headwinds. Public equity markets like the JSE can hit nominal highs while remaining concentrated in a few sectors (e.g. mining and resources) and vulnerable to global volatility, trade risks, and political uncertainty.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            In response, many investors are looking beyond traditional listed shares and bonds. Private equity and private debt, once mainly for institutions, are increasingly available to retail investors through regulated products. Everest Wealth positions itself in this space: offering stability and growth tied to unlisted assets, not daily market repricing.
          </p>
        </div>
      </section>

      {/* Regulatory architecture */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">How the structure works: three distinct roles</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            The distribution and management of unlisted investments in South Africa are governed by the FAIS Act. The Everest value chain splits responsibilities clearly between the product provider, the adviser, and the asset manager.
          </p>
          <div className="space-y-8">
            <div className="bg-[#151518] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">1. Everest Wealth Management (FSP 795)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                The product provider and structurer. Everest is an authorised Financial Services Provider with Category I, II, and IIA licences from the FSCA. It designs the investment products (e.g. 12.8% Strategic Income, 14.2% Onyx Income+, 14.5% Strategic Growth) and distributes them through independent intermediaries. Everest does not hold or operate the underlying businesses; it structures the instruments and the mandates.
              </p>
            </div>
            <div className="bg-[#151518] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">2. AS Brokers (FSP 17273) and Category 1.8</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                AS Brokers is an independent FSP that advises and distributes Everest products. To do this legally, advisers must hold FSCA Category 1.8 (Securities and Instruments: Shares) authority. This requires specific experience in shares and equips advisers to explain unlisted investments, valuations, and liquidity risks. Your capital is only invested through compliant, audited channels—never via unsolicited social media or unverified offers. The FSCA has warned about individuals impersonating Everest; always use a verified, licensed intermediary like AS Brokers.
              </p>
            </div>
            <div className="bg-[#151518] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">3. Laudian Investment Holdings (the HoldCo)</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                Your investment is deployed into preference shares issued by Laudian, an unlisted private equity holding company. Laudian is not an FSP; it is regulated under the Companies Act. It uses the capital pool to invest in and lend to underlying operating companies (e.g. mining, hospitality, agriculture, franchising). This separation is standard: the FSCA oversees advice and product disclosure; company law and governance apply to the day-to-day running of the underlying businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product suite */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">The product suite in plain terms</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Everest offers two broad categories: voluntary capital (savings, sale proceeds, cash) and compulsory retirement capital (pension, provident, preservation, RA). All voluntary products are unlisted preference shares with a minimum of R100,000, a five-year term, and no upfront broker fee—100% of your capital is invested from day one.
          </p>
          <div className="space-y-4 mb-6">
            <div className="border-l-2 border-blue-500/50 pl-4">
              <h3 className="font-bold text-white mb-1">12.8% Strategic Income (Class A)</h3>
              <p className="text-zinc-500 text-sm">Monthly dividends; 10% loyalty bonus on capital at the end of year 5. Suited to investors who can accept slightly lower monthly income in exchange for a deferred bonus.</p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4">
              <h3 className="font-bold text-white mb-1">14.2% Onyx Income+ (Class J)</h3>
              <p className="text-zinc-500 text-sm">Higher monthly income from day one; no end-of-term bonus. Suited to those who need maximum cash flow now (e.g. retirees) and are willing to forgo the loyalty bonus.</p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4">
              <h3 className="font-bold text-white mb-1">14.5% Strategic Growth (Class B)</h3>
              <p className="text-zinc-500 text-sm">No monthly withdrawals; returns compound and are paid at maturity (year 5). Best for capital you do not need as income during the term.</p>
            </div>
            <div className="border-l-2 border-teal-500/50 pl-4">
              <h3 className="font-bold text-white mb-1">Amethyst Living Annuity</h3>
              <p className="text-zinc-500 text-sm">For pension, provident, preservation, or RA money. Wrapped in a 27four Life policy so it complies with Regulation 28. Targets a structured net return (e.g. 10.2% p.a.), drawdown between 2.5% and 17.5%, tax-free growth inside the annuity, and a 9% capital bonus after five years under certain conditions. Residual capital on death goes to nominated beneficiaries outside the estate.</p>
            </div>
          </div>
          <Link href="/everest-wealth" className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline">
            Compare products and use calculators →
          </Link>
        </div>
      </section>

      {/* How returns are generated */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">How are the returns generated?</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Traditional private equity usually makes money when businesses are sold after many years. Everest&apos;s products, by contrast, promise regular (e.g. monthly) dividends from early on. To bridge that gap, Laudian uses a private-debt model: it lends to the underlying operating companies at intercompany interest rates (historically in the region of 15%–18%). The businesses (hotels, farms, mines, franchises) must generate enough cash to service this debt; Laudian then uses that cash flow to pay the dividends to preference-share investors (at the advertised 12.8%–14.5% net rates), after internal costs and fees.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            So in effect, as a retail investor you are participating in a high-yield corporate debt and equity structure. The underlying portfolio is diversified across sectors—e.g. mining and industrial, retail and leisure (e.g. SleepOver Hotels), agriculture, food and franchising, and medical. Laudian has also executed successful exits (e.g. the Witvlei copper project sale), which can strengthen the group&apos;s liquidity and ability to meet obligations and bonuses.
          </p>
          <p className="text-zinc-500 text-sm">
            Concentration risk exists: a large share of cash flow can come from a minority of companies. Operational shocks (e.g. in mining, tourism, or franchising) could affect the HoldCo&apos;s ability to service debt and pay dividends. This is why these products are rated as higher risk and should be considered as part of a diversified plan, not as a substitute for emergency funds or short-term savings.
          </p>
        </div>
      </section>

      {/* Illiquidity and risks */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Illiquidity and early exit</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The yields (12.8%–14.5%) are higher than many traditional fixed-income options partly because the capital is locked in. The underlying assets are illiquid businesses, not listed shares. Redemption before the 60-month maturity is generally not allowed. In exceptional cases (e.g. death or severe, verifiable financial hardship), early exit may be considered at the HoldCo&apos;s discretion, subject to long notice periods (e.g. 120 days) and early-exit penalties that can be as high as 15% of capital.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Advisers must ensure that clients only invest money they can afford to lock away for the full term. Emergency funds and short-term cash should not be placed in these products.
          </p>
        </div>
      </section>

      {/* Fees and remuneration */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Fees: &quot;Zero broker fee&quot; and how advice is paid</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Everest and AS Brokers market &quot;zero broker fees&quot;: 100% of your capital (e.g. R100,000) goes into the preference share from day one, with no upfront deduction for advice. In contrast, many unit trust or life insurance solutions deduct 1.5%–3% upfront. Advice and administration are not free; they are paid from the gross return generated by the underlying portfolio. Typical maximum deductions from that gross yield include discretionary and asset management fees (e.g. up to 1.6%), platform/administration (e.g. 0.15%), and advice fee (e.g. up to 1.84%). The advertised net yields (12.8%, 14.2%, 14.5%) are after these internal costs.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            This aligns interests: the broker and the product provider only earn their fees if the underlying assets generate enough to pay your dividend and cover costs. If the HoldCo underperforms, fee recovery is at risk before your fixed dividend. That does not remove investment risk, but it means remuneration is tied to the success of the structure.
          </p>
        </div>
      </section>

      {/* Tax */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Tax: why dividends can work in your favour</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            In South Africa, interest from bank deposits or bonds is taxed at your marginal income tax rate (after the annual interest exemption). For higher earners, that can be 31%–45%. Returns from Everest voluntary products are structured as dividends from preference shares, so they are subject to Dividends Withholding Tax (DWT) at a flat 20% at source, regardless of your personal tax bracket.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            For someone in a 39% marginal bracket, R1 million at 12.8% gross over five years could mean roughly R640,000 gross. As interest: tax at 39% could leave about R390,400 net. As dividends: tax at 20% could leave about R512,000 net—a material difference. This tax efficiency is a key reason the product is often positioned to higher earners who can benefit from the dividend treatment while accepting illiquidity and the risks of unlisted investments.
          </p>
          <p className="text-zinc-500 text-sm">
            The Amethyst Living Annuity wraps retirement capital in a life policy: growth inside the annuity is tax-free; only the income you draw down is taxed at your marginal rate.
          </p>
        </div>
      </section>

      {/* Who it's for and next steps */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Who is this for? Summary and next steps</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Everest Wealth offers structured, fixed-yield-style products backed by unlisted private debt and equity. They can suit investors who understand and accept illiquidity, concentration risk, and the fact that unlisted assets are not daily-valued like unit trusts. They are not suitable for emergency funds or short-term horizons. The tax benefit of dividends is most relevant for those in higher marginal tax brackets. The Amethyst Living Annuity can suit retirees who want a stable, drawdown-flexible income with exposure to this return profile inside a regulated wrapper.
          </p>
          <ul className="text-zinc-400 space-y-2 mb-8">
            <li>· Use only capital you can lock away for the full five-year term.</li>
            <li>· Treat these as a satellite allocation within a broader, diversified plan.</li>
            <li>· Work with a Category 1.8 authorised intermediary (e.g. AS Brokers) for advice and suitability.</li>
            <li>· All returns are based on current product terms and are not guaranteed; past performance is not indicative of future results.</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link href="/everest-wealth" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              View products and calculators
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              Talk to an adviser
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
            WhatsApp 067 242 9946
          </a>
          <Link href="/everest-wealth" className="text-blue-400 hover:underline">Everest Wealth hub</Link>
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
