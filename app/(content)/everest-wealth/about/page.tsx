import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Understanding Everest Wealth | How It Works, Structure & Risks | AS Brokers",
  description:
    "A clear guide to Everest Wealth Management: regulation, product structure, how returns are generated, tax benefits, risks, and who these investments suit. Independent analysis for informed decisions.",
};

const navSections = [
  { id: "context", label: "Why alternatives" },
  { id: "structure", label: "How it works" },
  { id: "products", label: "Product suite" },
  { id: "returns", label: "Returns" },
  { id: "risks", label: "Risks & liquidity" },
  { id: "fees", label: "Fees" },
  { id: "tax", label: "Tax" },
  { id: "summary", label: "Who it's for" },
];

export default function EverestWealthAboutPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">AS Brokers · Education</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
            Understanding Everest Wealth
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 md:mb-0">
            How the structure works, where returns come from, and what you need to know before investing.
          </p>
          {/* Section nav on mobile only (desktop uses sticky bar below) */}
          <div className="md:hidden flex flex-wrap justify-center gap-2 mt-8" aria-label="Page sections">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky section nav — desktop only */}
      <nav
        className="sticky top-[72px] z-40 hidden md:block py-3 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/5"
        aria-label="Page sections"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-20 md:pb-28">
        {/* Why alternatives */}
        <section id="context" className="scroll-mt-28 mb-14 md:mb-20">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 sm:p-8 md:p-10">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Context</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">Why alternative investments in South Africa?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              South Africa&apos;s economy in 2026 is marked by inflation, high interest rates, and structural headwinds. Public equity markets like the JSE can hit nominal highs while remaining concentrated in a few sectors (e.g. mining and resources) and vulnerable to global volatility, trade risks, and political uncertainty.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              In response, many investors are looking beyond traditional listed shares and bonds. Private equity and private debt, once mainly for institutions, are increasingly available to retail investors through regulated products. Everest Wealth positions itself in this space: offering stability and growth tied to unlisted assets, not daily market repricing.
            </p>
          </div>
        </section>

        {/* Three roles */}
        <section id="structure" className="scroll-mt-28 mb-14 md:mb-20">
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">Regulation</p>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">How the structure works: three distinct roles</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl">
            The distribution and management of unlisted investments in South Africa are governed by the FAIS Act. The Everest value chain splits responsibilities clearly between the product provider, the adviser, and the asset manager.
          </p>
          <div className="space-y-5 md:space-y-6">
            {[
              {
                num: "1",
                title: "Everest Wealth Management (FSP 795)",
                body: "The product provider and structurer. Everest is an authorised Financial Services Provider with Category I, II, and IIA licences from the FSCA. It designs the investment products (e.g. 12.8% Strategic Income, 14.2% Onyx Income+, 14.5% Strategic Growth) and distributes them through independent intermediaries. Everest does not hold or operate the underlying businesses; it structures the instruments and the mandates.",
                accent: "blue",
              },
              {
                num: "2",
                title: "AS Brokers (FSP 17273) and Category 1.8",
                body: "AS Brokers is an independent FSP that advises and distributes Everest products. To do this legally, advisers must hold FSCA Category 1.8 (Securities and Instruments: Shares) authority. This requires specific experience in shares and equips advisers to explain unlisted investments, valuations, and liquidity risks. Your capital is only invested through compliant, audited channels. Never via unsolicited social media or unverified offers. The FSCA has warned about individuals impersonating Everest; always use a verified, licensed intermediary like AS Brokers.",
                accent: "teal",
              },
              {
                num: "3",
                title: "Laudian Investment Holdings (the HoldCo)",
                body: "Your investment is deployed into preference shares issued by Laudian, an unlisted private equity holding company. Laudian is not an FSP; it is regulated under the Companies Act. It uses the capital pool to invest in and lend to underlying operating companies (e.g. mining, hospitality, agriculture, franchising). This separation is standard: the FSCA oversees advice and product disclosure; company law and governance apply to the day-to-day running of the underlying businesses.",
                accent: "amber",
              },
            ].map((role) => (
              <div
                key={role.num}
                className={`rounded-2xl border p-6 sm:p-8 md:p-9 ${
                  role.accent === "blue"
                    ? "bg-[#151518] border-blue-500/20"
                    : role.accent === "teal"
                    ? "bg-[#151518] border-teal-500/20"
                    : "bg-[#151518] border-amber-500/20"
                }`}
              >
                <div
                  className={`inline-flex w-10 h-10 rounded-xl items-center justify-center text-lg font-bold mb-4 ${
                    role.accent === "blue"
                      ? "bg-blue-500/20 text-blue-400"
                      : role.accent === "teal"
                      ? "bg-teal-500/20 text-teal-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {role.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{role.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{role.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product suite */}
        <section id="products" className="scroll-mt-28 mb-14 md:mb-20">
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">Products</p>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">The product suite in plain terms</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl">
            Everest offers two broad categories: voluntary capital (savings, sale proceeds, cash) and compulsory retirement capital (pension, provident, preservation, RA). All voluntary products are unlisted preference shares with a minimum of R100,000, a five-year term, and no upfront broker fee. 100% of your capital is invested from day one.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-6">
            {[
              { name: "12.8% Strategic Income (Class A)", desc: "Monthly dividends; 10% loyalty bonus on capital at end of year 5. Suited to investors who can accept slightly lower monthly income in exchange for a deferred bonus.", border: "border-l-blue-500" },
              { name: "14.2% Onyx Income+ (Class J)", desc: "Higher monthly income from day one; no end-of-term bonus. Suited to those who need maximum cash flow now (e.g. retirees) and are willing to forgo the loyalty bonus.", border: "border-l-blue-500" },
              { name: "14.5% Strategic Growth (Class B)", desc: "No monthly withdrawals; returns compound and are paid at maturity (year 5). Best for capital you do not need as income during the term.", border: "border-l-blue-500" },
              { name: "Amethyst Living Annuity", desc: "For pension, provident, preservation, or RA money. Wrapped in a 27four Life policy; Regulation 28 compliant. Targets structured net return (e.g. 10.2% p.a.), drawdown 2.5%–17.5%, tax-free growth inside the annuity, 9% capital bonus after five years. Residual capital on death goes to nominated beneficiaries outside the estate.", border: "border-l-teal-500" },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl bg-[#151518] border border-white/10 border-l-4 ${p.border} p-5 md:p-6`}>
                <h3 className="font-bold text-white text-sm mb-2">{p.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/everest-wealth" prefetch={false} className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:underline">
            Compare products and use calculators →
          </Link>
        </section>

        {/* Returns */}
        <section id="returns" className="scroll-mt-28 mb-14 md:mb-20">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 sm:p-8 md:p-10">
            <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">Mechanics</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">How are the returns generated?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Traditional private equity usually makes money when businesses are sold after many years. Everest&apos;s products, by contrast, promise regular (e.g. monthly) dividends from early on. To bridge that gap, Laudian uses a private-debt model: it lends to the underlying operating companies at intercompany interest rates (historically in the region of 15%–18%). The businesses (hotels, farms, mines, franchises) must generate enough cash to service this debt; Laudian then uses that cash flow to pay the dividends to preference-share investors (at the advertised 12.8%–14.5% net rates), after internal costs and fees.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              So in effect, as a retail investor you are participating in a high-yield corporate debt and equity structure. The underlying portfolio is diversified across sectors (e.g. mining and industrial, retail and leisure (e.g. SleepOver Hotels), agriculture, food and franchising, and medical). Laudian has also executed successful exits (e.g. the Witvlei copper project sale), which can strengthen the group&apos;s liquidity and ability to meet obligations and bonuses.
            </p>
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-5 mt-6">
              <p className="text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">Concentration risk</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A large share of cash flow can come from a minority of companies. Operational shocks (e.g. in mining, tourism, or franchising) could affect the HoldCo&apos;s ability to service debt and pay dividends. These products are rated as higher risk and should be part of a diversified plan, not a substitute for emergency funds or short-term savings.
              </p>
            </div>
          </div>
        </section>

        {/* Illiquidity */}
        <section id="risks" className="scroll-mt-28 mb-14 md:mb-20">
          <div className="rounded-2xl bg-[#151518] border border-amber-500/20 p-6 sm:p-8 md:p-10">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">Important</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">Illiquidity and early exit</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              The yields (12.8%–14.5%) are higher than many traditional fixed-income options partly because the capital is locked in. The underlying assets are illiquid businesses, not listed shares. Redemption before the 60-month maturity is generally not allowed. In exceptional cases (e.g. death or severe, verifiable financial hardship), early exit may be considered at the HoldCo&apos;s discretion, subject to long notice periods (e.g. 120 days) and early-exit penalties that can be as high as 15% of capital.
            </p>
            <p className="text-zinc-300 text-sm font-medium">
              Advisers must ensure that clients only invest money they can afford to lock away for the full term. Emergency funds and short-term cash should not be placed in these products.
            </p>
          </div>
        </section>

        {/* Fees */}
        <section id="fees" className="scroll-mt-28 mb-14 md:mb-20">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 sm:p-8 md:p-10">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Remuneration</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">Fees: &quot;Zero broker fee&quot; and how advice is paid</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Everest and AS Brokers market &quot;zero broker fees&quot;: 100% of your capital (e.g. R100,000) goes into the preference share from day one, with no upfront deduction for advice. In contrast, many unit trust or life insurance solutions deduct 1.5%–3% upfront. Advice and administration are not free; they are paid from the gross return generated by the underlying portfolio. Typical maximum deductions from that gross yield include discretionary and asset management fees (e.g. up to 1.6%), platform/administration (e.g. 0.15%), and advice fee (e.g. up to 1.84%). The advertised net yields (12.8%, 14.2%, 14.5%) are after these internal costs.
            </p>
            <p className="text-zinc-300 text-sm font-medium">
              This aligns interests: the broker and the product provider only earn their fees if the underlying assets generate enough to pay your dividend and cover costs. If the HoldCo underperforms, fee recovery is at risk before your fixed dividend.
            </p>
          </div>
        </section>

        {/* Tax */}
        <section id="tax" className="scroll-mt-28 mb-14 md:mb-20">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 sm:p-8 md:p-10">
            <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">Efficiency</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">Tax: why dividends can work in your favour</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              In South Africa, interest from bank deposits or bonds is taxed at your marginal income tax rate (after the annual interest exemption). For higher earners, that can be 31%–45%. Returns from Everest voluntary products are structured as dividends from preference shares, so they are subject to Dividends Withholding Tax (DWT) at a flat 20% at source, regardless of your personal tax bracket.
            </p>
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 my-6">
              <p className="text-zinc-400 text-xs font-medium mb-2">Example (39% marginal bracket, R1m at 12.8% gross over 5 years)</p>
              <p className="text-zinc-300 text-sm">As interest (39% tax): ~R390,400 net. As dividends (20% DWT): ~R512,000 net. A material difference.</p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              This tax efficiency is a key reason the product is often positioned to higher earners who can benefit from the dividend treatment while accepting illiquidity and the risks of unlisted investments.
            </p>
            <p className="text-zinc-500 text-sm">
              The Amethyst Living Annuity wraps retirement capital in a life policy: growth inside the annuity is tax-free; only the income you draw down is taxed at your marginal rate.
            </p>
          </div>
        </section>

        {/* Summary + CTAs */}
        <section id="summary" className="scroll-mt-28">
          <div className="rounded-2xl bg-gradient-to-br from-[#151518] to-[#1a1a24] border border-white/10 p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/5 pointer-events-none" />
            <div className="relative">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Next steps</p>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-5">Who is this for? Summary and next steps</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Everest Wealth offers structured, fixed-yield-style products backed by unlisted private debt and equity. They can suit investors who understand and accept illiquidity, concentration risk, and the fact that unlisted assets are not daily-valued like unit trusts. They are not suitable for emergency funds or short-term horizons. The tax benefit of dividends is most relevant for those in higher marginal tax brackets. The Amethyst Living Annuity can suit retirees who want a stable, drawdown-flexible income with exposure to this return profile inside a regulated wrapper.
              </p>
              <ul className="text-zinc-400 text-sm space-y-3 mb-8">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Use only capital you can lock away for the full five-year term.</li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Treat these as a satellite allocation within a broader, diversified plan.</li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Work with a Category 1.8 authorised intermediary (e.g. AS Brokers) for advice and suitability.</li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> All returns are based on current product terms and are not guaranteed; past performance is not indicative of future results.</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="/everest-wealth" prefetch={false} className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
                  View products and calculators
                </Link>
                <Link href="/contact" prefetch={false} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Talk to an adviser
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer strip */}
      <section className="py-12 md:py-14 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <a href="https://wa.me/27672429946" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">WhatsApp 067 242 9946</a>
          <Link href="/everest-wealth" prefetch={false} className="text-blue-400 hover:underline">Everest Wealth hub</Link>
          <Link href="/contact" prefetch={false} className="text-blue-400 hover:underline">Contact</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
