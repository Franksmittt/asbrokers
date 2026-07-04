import Link from "next/link";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WarmHero, WarmPageWithFooter, WarmPrimaryLink, WarmSecondaryLink, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_EYEBROW, WARM_H2, WARM_H3, WARM_LINK, WARM_WRAP } from "@/lib/warm-theme";

export const metadata = buildPageMetadata({
  path: "/everest-wealth/about",
  title: "Understanding Everest Wealth | How It Works, Structure & Risks",
  description:
    "A clear guide to Everest Wealth Management: regulation, product structure, how returns are generated, tax benefits, risks, and who these investments suit.",
});

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
  const heroImage = getPrimaryPageImage("/everest-wealth/about") ?? "/images/everest-suite-hero-16x9.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/everest-wealth/about"
        webPage={{
          name: "Understanding Everest Wealth | How It Works, Structure & Risks",
          description:
            "A clear guide to Everest Wealth Management: regulation, product structure, how returns are generated, tax benefits, risks, and who these investments suit.",
        }}
      />
      <WarmHero
        kicker="AS Brokers · Education"
        title="Understanding Everest Wealth"
        description="How the structure works, where returns come from, and what you need to know before investing."
        imageSrc={heroImage}
        maxWidth="4xl"
      >
        <div className="md:hidden mt-8 flex flex-wrap justify-center gap-2" aria-label="Page sections">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </WarmHero>

      <nav
        className="sticky top-[72px] z-40 hidden border-b border-stone-200/80 bg-warm-canvas/95 py-3 backdrop-blur-xl md:block"
        aria-label="Page sections"
      >
        <div className={`${WARM_WRAP} flex max-w-4xl flex-wrap items-center justify-center gap-2`}>
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-shark"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className={`${WARM_WRAP} max-w-4xl pb-20 pt-10 md:pb-28 md:pt-14`}>
        {/* Why alternatives */}
        <section id="context" className="scroll-mt-28 mb-14 md:mb-20">
          <div className={WARM_CARD}>
            <p className={WARM_EYEBROW}>Context</p>
            <h2 className={`mt-3 ${WARM_H2}`}>Why alternative investments in South Africa?</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              South Africa&apos;s economy in 2026 is marked by inflation, high interest rates, and structural headwinds. Public equity markets like the JSE can hit nominal highs while remaining concentrated in a few sectors (e.g. mining and resources) and vulnerable to global volatility, trade risks, and political uncertainty.
            </p>
            <p className={WARM_BODY}>
              In response, many investors are looking beyond traditional listed shares and bonds. Private equity and private debt, once mainly for institutions, are increasingly available to retail investors through regulated products. Everest Wealth positions itself in this space: offering stability and growth tied to unlisted assets, not daily market repricing.
            </p>
          </div>
        </section>

        {/* Three roles */}
        <section id="structure" className="scroll-mt-28 mb-14 md:mb-20">
          <p className={`${WARM_EYEBROW} mb-3`}>Regulation</p>
          <h2 className={`${WARM_H2} mb-3 md:mb-4`}>How the structure works: three distinct roles</h2>
          <p className={`mb-8 max-w-2xl ${WARM_BODY}`}>
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
                className={`${WARM_CARD} border-l-4 p-6 sm:p-8 md:p-9 ${
                  role.accent === "blue"
                    ? "border-blue-500/30"
                    : role.accent === "teal"
                    ? "border-teal-500/30"
                    : "border-amber-500/30"
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
                <h3 className={`${WARM_H3} mb-3`}>{role.title}</h3>
                <p className={WARM_BODY}>{role.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product suite */}
        <section id="products" className="scroll-mt-28 mb-14 md:mb-20">
          <p className={`${WARM_EYEBROW} mb-3`}>Products</p>
          <h2 className={`${WARM_H2} mb-3 md:mb-4`}>The product suite in plain terms</h2>
          <p className={`mb-8 max-w-2xl ${WARM_BODY}`}>
            Everest offers two broad categories: voluntary capital (savings, sale proceeds, cash) and compulsory retirement capital (pension, provident, preservation, RA). All voluntary products are unlisted preference shares with a minimum of R100,000, a five-year term, and no upfront broker fee. 100% of your capital is invested from day one.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-6">
            {[
              { name: "12.8% Strategic Income (Class A)", desc: "Monthly dividends; 10% loyalty bonus on capital at end of year 5. Suited to investors who can accept slightly lower monthly income in exchange for a deferred bonus.", border: "border-l-blue-500" },
              { name: "14.2% Onyx Income+ (Class J)", desc: "Higher monthly income from day one; no end-of-term bonus. Suited to those who need maximum cash flow now (e.g. retirees) and are willing to forgo the loyalty bonus.", border: "border-l-blue-500" },
              { name: "14.5% Strategic Growth (Class B)", desc: "No monthly withdrawals; returns compound and are paid at maturity (year 5). Best for capital you do not need as income during the term.", border: "border-l-blue-500" },
              { name: "Amethyst Living Annuity", desc: "For pension, provident, preservation, or RA money. Wrapped in a 27four Life policy; Regulation 28 compliant. Targets structured net return (e.g. 10.2% p.a.), drawdown 2.5%–17.5%, tax-free growth inside the annuity, 9% capital bonus after five years. Residual capital on death goes to nominated beneficiaries outside the estate.", border: "border-l-teal-500" },
            ].map((p) => (
              <div key={p.name} className={`${WARM_CARD} border-l-4 ${p.border} p-5 md:p-6`}>
                <h3 className={`${WARM_H3} mb-2 text-sm`}>{p.name}</h3>
                <p className="text-xs leading-relaxed text-stone-500">{p.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/everest-wealth" prefetch={false} className={`inline-flex items-center gap-2 text-sm ${WARM_LINK}`}>
            Compare products and use calculators →
          </Link>
        </section>

        {/* Returns */}
        <section id="returns" className="scroll-mt-28 mb-14 md:mb-20">
          <div className={WARM_CARD}>
            <p className={`${WARM_EYEBROW} mb-3`}>Mechanics</p>
            <h2 className={`mt-3 ${WARM_H2}`}>How are the returns generated?</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              Traditional private equity usually makes money when businesses are sold after many years. Everest&apos;s products, by contrast, promise regular (e.g. monthly) dividends from early on. To bridge that gap, Laudian uses a private-debt model: it lends to the underlying operating companies at intercompany interest rates (historically in the region of 15%–18%). The businesses (hotels, farms, mines, franchises) must generate enough cash to service this debt; Laudian then uses that cash flow to pay the dividends to preference-share investors (at the advertised 12.8%–14.5% net rates), after internal costs and fees.
            </p>
            <p className={`mt-4 ${WARM_BODY}`}>
              So in effect, as a retail investor you are participating in a high-yield corporate debt and equity structure. The underlying portfolio is diversified across sectors (e.g. mining and industrial, retail and leisure (e.g. SleepOver Hotels), agriculture, food and franchising, and medical). Laudian has also executed successful exits (e.g. the Witvlei copper project sale), which can strengthen the group&apos;s liquidity and ability to meet obligations and bonuses.
            </p>
            <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">Concentration risk</p>
              <p className={WARM_BODY}>
                A large share of cash flow can come from a minority of companies. Operational shocks (e.g. in mining, tourism, or franchising) could affect the HoldCo&apos;s ability to service debt and pay dividends. These products are rated as higher risk and should be part of a diversified plan, not a substitute for emergency funds or short-term savings.
              </p>
            </div>
          </div>
        </section>

        <section id="risks" className="scroll-mt-28 mb-14 md:mb-20">
          <div className={`${WARM_CARD} ring-amber-500/20`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-3">Important</p>
            <h2 className={WARM_H2}>Illiquidity and early exit</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              The yields (12.8%–14.5%) are higher than many traditional fixed-income options partly because the capital is locked in. The underlying assets are illiquid businesses, not listed shares. Redemption before the 60-month maturity is generally not allowed. In exceptional cases (e.g. death or severe, verifiable financial hardship), early exit may be considered at the HoldCo&apos;s discretion, subject to long notice periods (e.g. 120 days) and early-exit penalties that can be as high as 15% of capital.
            </p>
            <p className="mt-4 text-sm font-medium text-shark">
              Advisers must ensure that clients only invest money they can afford to lock away for the full term. Emergency funds and short-term cash should not be placed in these products.
            </p>
          </div>
        </section>

        <section id="fees" className="scroll-mt-28 mb-14 md:mb-20">
          <div className={WARM_CARD}>
            <p className={`${WARM_EYEBROW} mb-3`}>Remuneration</p>
            <h2 className={WARM_H2}>Fees: &quot;Zero broker fee&quot; and how advice is paid</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              Everest and AS Brokers market &quot;zero broker fees&quot;: 100% of your capital (e.g. R100,000) goes into the preference share from day one, with no upfront deduction for advice. In contrast, many unit trust or life insurance solutions deduct 1.5%–3% upfront. Advice and administration are not free; they are paid from the gross return generated by the underlying portfolio. Typical maximum deductions from that gross yield include discretionary and asset management fees (e.g. up to 1.6%), platform/administration (e.g. 0.15%), and advice fee (e.g. up to 1.84%). The advertised net yields (12.8%, 14.2%, 14.5%) are after these internal costs.
            </p>
            <p className="mt-4 text-sm font-medium text-shark">
              This aligns interests: the broker and the product provider only earn their fees if the underlying assets generate enough to pay your dividend and cover costs. If the HoldCo underperforms, fee recovery is at risk before your fixed dividend.
            </p>
          </div>
        </section>

        <section id="tax" className="scroll-mt-28 mb-14 md:mb-20">
          <div className={WARM_CARD}>
            <p className={`${WARM_EYEBROW} mb-3`}>Efficiency</p>
            <h2 className={WARM_H2}>Tax: why dividends can work in your favour</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              In South Africa, interest from bank deposits or bonds is taxed at your marginal income tax rate (after the annual interest exemption). For higher earners, that can be 31%–45%. Returns from Everest voluntary products are structured as dividends from preference shares, so they are subject to Dividends Withholding Tax (DWT) at a flat 20% at source, regardless of your personal tax bracket.
            </p>
            <div className="my-6 rounded-xl border border-stone-200 bg-stone-50 p-5">
              <p className="mb-2 text-xs font-medium text-stone-600">Example (39% marginal bracket, R1m at 12.8% gross over 5 years)</p>
              <p className="text-sm text-shark">As interest (39% tax): ~R390,400 net. As dividends (20% DWT): ~R512,000 net. A material difference.</p>
            </div>
            <p className={WARM_BODY}>
              This tax efficiency is a key reason the product is often positioned to higher earners who can benefit from the dividend treatment while accepting illiquidity and the risks of unlisted investments.
            </p>
            <p className="mt-4 text-sm text-stone-500">
              The Amethyst Living Annuity wraps retirement capital in a life policy: growth inside the annuity is tax-free; only the income you draw down is taxed at your marginal rate.
            </p>
          </div>
        </section>

        <section id="summary" className="scroll-mt-28">
          <div className={`${WARM_CARD} relative overflow-hidden bg-gradient-to-br from-white to-stone-50`}>
            <div className="relative">
              <p className={WARM_EYEBROW}>Next steps</p>
              <h2 className={`mt-3 ${WARM_H2}`}>Who is this for? Summary and next steps</h2>
              <p className={`mt-4 ${WARM_BODY}`}>
                Everest Wealth offers structured return-profile products backed by unlisted private debt and equity. They can suit investors who understand and accept illiquidity, concentration risk, and the fact that unlisted assets are not daily-valued like unit trusts. They are not suitable for emergency funds or short-term horizons. The tax benefit of dividends is most relevant for those in higher marginal tax brackets. The Amethyst Living Annuity can suit retirees who want a stable, drawdown-flexible income with exposure to this return profile inside a regulated wrapper.
              </p>
              <ul className={`mt-6 space-y-3 ${WARM_BODY}`}>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-cinematic-teal">✓</span> Use only capital you can lock away for the full five-year term.</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-cinematic-teal">✓</span> Treat these as a satellite allocation within a broader, diversified plan.</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-cinematic-teal">✓</span> Work with a Category 1.8 authorised intermediary (e.g. AS Brokers) for advice and suitability.</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-cinematic-teal">✓</span> All returns are based on current product terms and are not guaranteed; past performance is not indicative of future results.</li>
              </ul>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <WarmPrimaryLink href="/everest-wealth">View products and calculators</WarmPrimaryLink>
                <WarmSecondaryLink href="/contact">Talk to an adviser</WarmSecondaryLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      <WarmSection alt className="py-12 md:py-14">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <a href="https://wa.me/27662276044" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-shark">
            WhatsApp +27 66 227 6044
          </a>
          <Link href="/everest-wealth" prefetch={false} className={WARM_LINK}>
            Everest Wealth hub
          </Link>
          <Link href="/contact" prefetch={false} className={WARM_LINK}>
            Contact
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
