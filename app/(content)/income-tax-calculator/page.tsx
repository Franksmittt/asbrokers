import Link from "next/link";
import { IncomeTaxCalculator } from "@/components/IncomeTaxCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_LINK, WARM_META } from "@/lib/warm-theme";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "South African Income Tax Calculator (2026/27)";
const PAGE_DESCRIPTION =
  "Calculate your South African PAYE based on official SARS 2026/27 tax tables (Budget 2026). See annual tax, monthly PAYE, effective tax rate and net pay.";

export const metadata = buildPageMetadata({
  path: "/income-tax-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function IncomeTaxCalculatorPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/income-tax-calculator" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Phase 2: Risk Architecture · Tax Exposure"
        title="The Income Tax Liability Engine"
        description="Calculate your exact marginal tax exposure based on official SARS 2026/27 tables. Understand how traditional income structures are penalizing your wealth."
      >
        <p className={`mt-4 ${WARM_META}`}>
          Enter your gross monthly salary and age. Rates as of Budget 2026. Consult a tax practitioner for the latest.
        </p>
      </WarmSimpleHero>

      <WarmSection narrow>
        <div className={`${WARM_CARD} overflow-hidden`}>
          <IncomeTaxCalculator />
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>Understanding Your Retirement Income Tax Position</h2>
        <p className={`${WARM_BODY} mb-4`}>
          The calculator above estimates your South African income tax based on the income you entered and the current
          2026/27 SARS tax tables (Budget 2026). Its purpose is simple: to show you how much income you actually keep after tax,
          not just what you earn before tax.
        </p>
        <p className={WARM_BODY}>
          In retirement, tax matters more than most people expect. Income usually comes from multiple sources, such as
          living annuities, dividends, interest, rental income, or business income, and each is taxed differently.
          When these income streams overlap, retirees are often pushed into higher tax brackets without realising it.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>What This Calculator Shows</h2>
        <p className={`${WARM_BODY} mb-4`}>This calculator helps you:</p>
        <ul className={`list-disc list-inside ${WARM_BODY} space-y-2 mb-4`}>
          <li>Estimate your annual income tax payable</li>
          <li>See your effective tax rate (what you really pay overall)</li>
          <li>Understand your net income after tax</li>
          <li>Test how changes in income affect your tax outcome</li>
        </ul>
        <p className={WARM_BODY}>
          Many retirement plans fail not because investments perform badly, but because tax is underestimated or
          poorly structured. Small inefficiencies compound over time and quietly erode both income and capital.
        </p>
      </WarmSection>

      <WarmSection alt narrow>
        <div className={WARM_CARD}>
          <h2 className={`${WARM_H2} mb-6`}>The Fiduciary Advantage: Tax Arbitrage</h2>
          <p className={WARM_BODY}>
            Standard interest-bearing investments are penalized by marginal tax rates (up to 45%). By restructuring capital into private equity preference shares (such as Everest Wealth), your yields are subjected to a flat 20% Dividend Withholding Tax (DWT). This single structural change can drastically increase your net take-home yield.
          </p>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>The Real Question</h2>
        <p className={`${WARM_BODY} mb-4`}>
          The real retirement tax planning question is not: &quot;How much tax do I pay?&quot;
        </p>
        <p className={`${WARM_BODY} mb-4`}>
          but rather: &quot;How do I structure my income so that I keep more of it, legally and sustainably?&quot;
        </p>
        <p className={WARM_BODY}>
          This calculator shows you what is happening. Proper planning focuses on why, and how to improve it.
        </p>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>Who This Tool Is Designed For</h2>
        <p className={WARM_BODY}>
          If your income does not come from a single payslip, or if you are relying on multiple income sources in
          retirement, this tool is designed for you.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <div className={`${WARM_CARD} text-center`}>
          <h2 className={`${WARM_H2} mb-4`}>Restructure Your Tax Liability</h2>
          <p className={`${WARM_BODY} mb-8`}>
            Stop paying marginal rates on your investment growth. Let our wealth engineers structure your capital for maximum tax efficiency.
          </p>
          <WarmPrimaryLink href="/contact">Initiate Tax-Efficient Structuring →</WarmPrimaryLink>
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="https://wa.me/27662276044"
            target="_blank"
            rel="noopener noreferrer"
            className={WARM_LINK}
          >
            WhatsApp us · +27 66 227 6044
          </a>
          <Link href="/solutions" className={WARM_LINK}>
            Income in retirement
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Insurance & risk planning
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Estate planning
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Business insurance
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
