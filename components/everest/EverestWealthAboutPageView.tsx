"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
  HUB_BLUE as BLUE,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

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

const PRODUCTS = [
  {
    name: "12.8% Strategic Income (Class A)",
    desc: "Monthly dividends; 10% loyalty bonus on capital at end of year 5. Suited to investors who can accept slightly lower monthly income in exchange for a deferred bonus.",
    href: "/everest-128-product",
    border: TEAL,
  },
  {
    name: "14.2% Onyx Income+ (Class J)",
    desc: "Higher monthly income from day one; no end-of-term bonus. Suited to those who need maximum cash flow now (e.g. retirees) and are willing to forgo the loyalty bonus.",
    href: "/immediate-higher-income-calculator",
    border: BLUE,
  },
  {
    name: "14.5% Strategic Growth (Class B)",
    desc: "No monthly withdrawals; returns compound and are paid at maturity (year 5). Best for capital you do not need as income during the term.",
    href: "/everest-strategic-growth-145",
    border: BLUE,
  },
  {
    name: "Amethyst Living Annuity",
    desc: "For pension, provident, preservation, or RA money. Wrapped in a 27four Life policy; Regulation 28 compliant. Targets structured net return (e.g. 10.2% p.a.), drawdown 2.5%–17.5%, tax-free growth inside the annuity, 9% capital bonus after five years. Residual capital on death goes to nominated beneficiaries outside the estate.",
    href: "/everest-amethyst-living-annuity",
    border: TEAL,
  },
];

const ROLES = [
  {
    num: "1",
    title: "Everest Wealth Management (FSP 795)",
    body: "The product provider and structurer. Everest is an authorised Financial Services Provider with Category I, II, and IIA licences from the FSCA. It designs the investment products (e.g. 12.8% Strategic Income, 14.2% Onyx Income+, 14.5% Strategic Growth) and distributes them through independent intermediaries. Everest does not hold or operate the underlying businesses; it structures the instruments and the mandates.",
    accent: BLUE,
  },
  {
    num: "2",
    title: "AS Brokers (FSP 17273) and Category 1.8",
    body: "AS Brokers is an independent FSP that advises and distributes Everest products. To do this legally, advisers must hold FSCA Category 1.8 (Securities and Instruments: Shares) authority. This requires specific experience in shares and equips advisers to explain unlisted investments, valuations, and liquidity risks. Your capital is only invested through compliant, audited channels. Never via unsolicited social media or unverified offers. The FSCA has warned about individuals impersonating Everest; always use a verified, licensed intermediary like AS Brokers.",
    accent: TEAL,
  },
  {
    num: "3",
    title: "Laudian Investment Holdings (the HoldCo)",
    body: "Your investment is deployed into preference shares issued by Laudian, an unlisted private equity holding company. Laudian is not an FSP; it is regulated under the Companies Act. It uses the capital pool to invest in and lend to underlying operating companies (e.g. mining, hospitality, agriculture, franchising). This separation is standard: the FSCA oversees advice and product disclosure; company law and governance apply to the day-to-day running of the underlying businesses.",
    accent: "#6B6B70",
  },
];

type Props = {
  heroImage: string;
};

function SectionCard({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article
      id={id}
      style={style}
      className={`scroll-mt-28 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8 ${className}`}
    >
      {children}
    </article>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-semibold uppercase tracking-[0.18em]"
      style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-3 font-bold tracking-tight"
      style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`leading-relaxed ${className}`}
      style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
    >
      {children}
    </p>
  );
}

export function EverestWealthAboutPageView({ heroImage }: Props) {
  return (
    <>
      <header
        data-chunk-boundary="true"
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} items-center gap-y-8`}>
          <HubReveal className="col-span-12 lg:col-span-6">
            <Eyebrow>Fiduciary briefing · AS Brokers education</Eyebrow>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Understanding Everest Wealth
            </h1>
            <Body className="mt-5 max-w-xl">
              A corporate whitepaper on regulation, product structure, how returns are generated, tax
              benefits, risks, and who these investments suit.
            </Body>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 shadow-sm ring-1 ring-stone-200/90">
                Everest FSP 795
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 shadow-sm ring-1 ring-stone-200/90">
                AS Brokers FSP 17273
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 shadow-sm ring-1 ring-stone-200/90">
                Category 1.8
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 lg:hidden" aria-label="Page sections">
              {navSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-stone-700 ring-1 ring-stone-200/90"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={heroImage}
                alt={getAlt(heroImage, "Everest Wealth regulatory briefing — real-economy portfolio context")}
                fill
                priority
                className="object-cover object-center"
                sizes={HUB_SPLIT_HERO_SIZES}
              />
            </div>
          </HubReveal>
        </div>
      </header>

      <nav
        className="sticky top-[72px] z-40 hidden border-b border-stone-200/80 py-3 backdrop-blur-xl md:block"
        style={{ backgroundColor: "rgba(247, 246, 243, 0.95)" }}
        aria-label="Page sections"
      >
        <div className={`${HOME4_WRAP} flex flex-wrap items-center justify-center gap-2`}>
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-white hover:text-stone-900"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="border-t border-stone-200/80 py-12 md:py-16" style={{ backgroundColor: "#FDFCFA" }}>
        <div className={`${GRID} gap-y-8`}>
          <HubReveal className="col-span-12 lg:col-span-7">
            <SectionCard id="context">
              <Eyebrow>Context</Eyebrow>
              <H2>Why alternative investments in South Africa?</H2>
              <Body className="mt-4">
                South Africa&apos;s economy in 2026 is marked by inflation, high interest rates, and
                structural headwinds. Public equity markets like the JSE can hit nominal highs while
                remaining concentrated in a few sectors (e.g. mining and resources) and vulnerable
                to global volatility, trade risks, and political uncertainty.
              </Body>
              <Body className="mt-4">
                In response, many investors are looking beyond traditional listed shares and bonds.
                Private equity and private debt, once mainly for institutions, are increasingly
                available to retail investors through regulated products. Everest Wealth positions
                itself in this space: offering stability and growth tied to unlisted assets, not daily
                market repricing.
              </Body>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-5">
            <SectionCard className="h-full bg-gradient-to-br from-white to-stone-50">
              <Eyebrow>Regulatory architecture</Eyebrow>
              <H2>Three distinct roles</H2>
              <Body className="mt-4">
                The distribution and management of unlisted investments in South Africa are governed
                by the FAIS Act. The Everest value chain splits responsibilities clearly between the
                product provider, the adviser, and the asset manager.
              </Body>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12">
            <div id="structure" className="scroll-mt-28 grid gap-6 md:grid-cols-3 lg:gap-8">
              {ROLES.map((role) => (
                <SectionCard key={role.num} className="border-l-4" style={{ borderLeftColor: role.accent }}>
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white"
                    style={{ backgroundColor: role.accent }}
                  >
                    {role.num}
                  </div>
                  <h3
                    className="font-bold tracking-tight"
                    style={{ fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", color: INK }}
                  >
                    {role.title}
                  </h3>
                  <Body className="mt-3">{role.body}</Body>
                </SectionCard>
              ))}
            </div>
          </HubReveal>

          <HubReveal className="col-span-12">
            <div id="products" className="scroll-mt-28">
            <Eyebrow>Products</Eyebrow>
            <H2>The product suite in plain terms</H2>
            <Body className="mt-4 max-w-3xl">
              Everest offers two broad categories: voluntary capital (savings, sale proceeds, cash) and
              compulsory retirement capital (pension, provident, preservation, RA). All voluntary
              products are unlisted preference shares with a minimum of R100,000, a five-year term, and
              no upfront broker fee. 100% of your capital is invested from day one.
            </Body>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  prefetch={false}
                  className="group block rounded-3xl bg-white p-6 shadow-lg ring-1 ring-stone-200/90 transition-shadow hover:shadow-xl sm:p-7"
                  style={{ borderLeft: `4px solid ${p.border}` }}
                >
                  <h3
                    className="font-bold tracking-tight group-hover:text-cinematic-teal"
                    style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: INK }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="mt-2 leading-relaxed text-stone-600"
                    style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
                  >
                    {p.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cinematic-teal">
                    View product
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
            </div>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-8">
            <SectionCard id="returns">
              <Eyebrow>Mechanics</Eyebrow>
              <H2>How are the returns generated?</H2>
              <Body className="mt-4">
                Traditional private equity usually makes money when businesses are sold after many
                years. Everest&apos;s products, by contrast, promise regular (e.g. monthly) dividends
                from early on. To bridge that gap, Laudian uses a private-debt model: it lends to the
                underlying operating companies at intercompany interest rates (historically in the
                region of 15%–18%). The businesses (hotels, farms, mines, franchises) must generate
                enough cash to service this debt; Laudian then uses that cash flow to pay the dividends
                to preference-share investors (at the advertised 12.8%–14.5% net rates), after
                internal costs and fees.
              </Body>
              <Body className="mt-4">
                So in effect, as a retail investor you are participating in a high-yield corporate debt
                and equity structure. The underlying portfolio is diversified across sectors (e.g. mining
                and industrial, retail and leisure (e.g. SleepOver Hotels), agriculture, food and
                franchising, and medical). Laudian has also executed successful exits (e.g. the Witvlei
                copper project sale), which can strengthen the group&apos;s liquidity and ability to meet
                obligations and bonuses.
              </Body>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-4">
            <SectionCard className="h-full bg-stone-50">
              <Eyebrow>Portfolio concentration</Eyebrow>
              <H2>Concentration risk</H2>
              <Body className="mt-4">
                A large share of cash flow can come from a minority of companies. Operational shocks
                (e.g. in mining, tourism, or franchising) could affect the HoldCo&apos;s ability to
                service debt and pay dividends. These products are rated as higher risk and should be
                part of a diversified plan, not a substitute for emergency funds or short-term savings.
              </Body>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-7">
            <SectionCard id="risks">
              <Eyebrow>Important</Eyebrow>
              <H2>Illiquidity and early exit</H2>
              <Body className="mt-4">
                The yields (12.8%–14.5%) are higher than many traditional fixed-income options partly
                because the capital is locked in. The underlying assets are illiquid businesses, not
                listed shares. Redemption before the 60-month maturity is generally not allowed. In
                exceptional cases (e.g. death or severe, verifiable financial hardship), early exit may
                be considered at the HoldCo&apos;s discretion, subject to long notice periods (e.g. 120
                days) and early-exit penalties that can be as high as 15% of capital.
              </Body>
              <p
                className="mt-4 font-medium leading-relaxed"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: INK }}
              >
                Advisers must ensure that clients only invest money they can afford to lock away for the
                full term. Emergency funds and short-term cash should not be placed in these products.
              </p>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-5">
            <SectionCard id="fees" className="h-full">
              <Eyebrow>Remuneration</Eyebrow>
              <H2>Fees: &quot;Zero broker fee&quot;</H2>
              <Body className="mt-4">
                Everest and AS Brokers market &quot;zero broker fees&quot;: 100% of your capital (e.g.
                R100,000) goes into the preference share from day one, with no upfront deduction for
                advice. Advice and administration are paid from the gross return generated by the
                underlying portfolio. Typical maximum deductions include discretionary and asset
                management fees (e.g. up to 1.6%), platform/administration (e.g. 0.15%), and advice fee
                (e.g. up to 1.84%). The advertised net yields (12.8%, 14.2%, 14.5%) are after these
                internal costs.
              </Body>
              <p
                className="mt-4 font-medium leading-relaxed"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: INK }}
              >
                This aligns interests: the broker and the product provider only earn their fees if the
                underlying assets generate enough to pay your dividend and cover costs.
              </p>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12">
            <SectionCard id="tax">
              <Eyebrow>Efficiency</Eyebrow>
              <H2>Tax: why dividends can work in your favour</H2>
              <Body className="mt-4">
                In South Africa, interest from bank deposits or bonds is taxed at your marginal income
                tax rate (after the annual interest exemption). For higher earners, that can be 31%–45%.
                Returns from Everest voluntary products are structured as dividends from preference
                shares, so they are subject to Dividends Withholding Tax (DWT) at a flat 20% at source,
                regardless of your personal tax bracket.
              </Body>
              <div className="my-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="mb-2 text-xs font-medium text-stone-600">
                  Example (39% marginal bracket, R1m at 12.8% gross over 5 years)
                </p>
                <p className="text-sm font-medium" style={{ color: INK }}>
                  As interest (39% tax): ~R390,400 net. As dividends (20% DWT): ~R512,000 net. A
                  material difference.
                </p>
              </div>
              <Body>
                This tax efficiency is a key reason the product is often positioned to higher earners
                who can benefit from the dividend treatment while accepting illiquidity and the risks of
                unlisted investments.
              </Body>
              <Body className="mt-4 text-stone-600">
                The Amethyst Living Annuity wraps retirement capital in a life policy: growth inside the
                annuity is tax-free; only the income you draw down is taxed at your marginal rate.
              </Body>
            </SectionCard>
          </HubReveal>

          <HubReveal className="col-span-12">
            <SectionCard id="summary" className="bg-gradient-to-br from-white to-stone-50">
              <Eyebrow>Next steps</Eyebrow>
              <H2>Who is this for? Summary and next steps</H2>
              <Body className="mt-4">
                Everest Wealth offers structured return-profile products backed by unlisted private debt
                and equity. They can suit investors who understand and accept illiquidity, concentration
                risk, and the fact that unlisted assets are not daily-valued like unit trusts. They are
                not suitable for emergency funds or short-term horizons. The tax benefit of dividends is
                most relevant for those in higher marginal tax brackets. The Amethyst Living Annuity can
                suit retirees who want a stable, drawdown-flexible income with exposure to this return
                profile inside a regulated wrapper.
              </Body>
              <ul className="mt-6 space-y-3">
                {[
                  "Use only capital you can lock away for the full five-year term.",
                  "Treat these as a satellite allocation within a broader, diversified plan.",
                  "Work with a Category 1.8 authorised intermediary (e.g. AS Brokers) for advice and suitability.",
                  "All returns are based on current product terms and are not guaranteed; past performance is not indicative of future results.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold" style={{ color: TEAL }}>
                      ✓
                    </span>
                    <Body>{item}</Body>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/investments"
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all hover:bg-[#004a9e]"
                >
                  View investments hub
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-stone-800 ring-1 ring-stone-200/90 transition-colors hover:bg-stone-50"
                >
                  Talk to an adviser
                </Link>
              </div>
            </SectionCard>
          </HubReveal>
        </div>
      </div>

      <section className="border-t border-stone-200/80 py-10" style={{ backgroundColor: CANVAS }}>
        <div className={`${HOME4_WRAP} flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-stone-600`}>
          <a href="https://wa.me/27662276044" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900">
            WhatsApp +27 66 227 6044
          </a>
          <Link href="/investments" prefetch={false} className="hover:text-stone-900">
            Investments hub
          </Link>
          <Link href="/contact" prefetch={false} className="hover:text-stone-900">
            Contact
          </Link>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/everest-wealth/about")} />
      <Footer />
    </>
  );
}
