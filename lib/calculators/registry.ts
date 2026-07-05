/**
 * Canonical calculator registry — ASSET 001–017 (2026 rebuild).
 *
 * - `title` is the public-facing name (customers, embed iframe titles).
 * - `assetCode` + `title` form the staff label in Blog Studio / CRM (backend only).
 */

export type CalculatorEmbedKind = "static-html";

export type CalculatorRegistryEntry = {
  id: string;
  assetCode: string;
  title: string;
  embedKind: CalculatorEmbedKind;
  /** iframe src path (no origin) */
  embedPath: string;
  sourcePath: string;
  /** Listed on public /calculators hub when true */
  publicHub: boolean;
  generation: "v2";
};

export function formatStaffCalculatorLabel(entry: Pick<CalculatorRegistryEntry, "assetCode" | "title">): string {
  return `${entry.assetCode}: ${entry.title}`;
}

export function formatPublicCalculatorTitle(entry: Pick<CalculatorRegistryEntry, "title">): string {
  return entry.title;
}

const staticHtml = (file: string, title: string, assetCode: string, id: string): CalculatorRegistryEntry => ({
  id,
  assetCode,
  title,
  embedKind: "static-html",
  embedPath: `/embed-calculators/${file}`,
  sourcePath: `public/embed-calculators/${file}`,
  publicHub: true,
  generation: "v2",
});

/** AS Brokers calculator library — static HTML embeds in /public/embed-calculators */
export const CALCULATOR_REGISTRY: CalculatorRegistryEntry[] = [
  staticHtml(
    "asset-001-retirement-growth.html",
    "AS Brokers Retirement Growth Calculator",
    "ASSET 001",
    "asset-001-retirement-growth"
  ),
  staticHtml(
    "asset-002-retirement-reality-check.html",
    "AS Brokers Retirement Reality Check Calculator",
    "ASSET 002",
    "asset-002-retirement-reality-check"
  ),
  staticHtml(
    "asset-003-retirement-premium.html",
    "AS Brokers Retirement Premium Calculator",
    "ASSET 003",
    "asset-003-retirement-premium"
  ),
  staticHtml(
    "asset-004-life-of-capital.html",
    "AS Brokers Life of Capital Calculator",
    "ASSET 004",
    "asset-004-life-of-capital"
  ),
  staticHtml(
    "asset-005-future-value.html",
    "AS Brokers Future Value Calculator",
    "ASSET 005",
    "asset-005-future-value"
  ),
  staticHtml(
    "asset-006-income-tax.html",
    "AS Brokers Income Tax Calculator",
    "ASSET 006",
    "asset-006-income-tax"
  ),
  staticHtml(
    "asset-007-estate-duty.html",
    "AS Brokers Estate Duty & Executor Fee Calculator",
    "ASSET 007",
    "asset-007-estate-duty"
  ),
  staticHtml(
    "asset-008-estate-reduction.html",
    "AS Brokers Estate Reduction Strategy Calculator",
    "ASSET 008",
    "asset-008-estate-reduction"
  ),
  staticHtml(
    "asset-009-everest-142-income.html",
    "AS Brokers 14.2% Income Calculator",
    "ASSET 009",
    "asset-009-everest-142-income"
  ),
  staticHtml(
    "asset-010-everest-128-income.html",
    "AS Brokers 12.8% Income Calculator",
    "ASSET 010",
    "asset-010-everest-128-income"
  ),
  staticHtml(
    "asset-011-everest-128-vs-142.html",
    "AS Brokers 12.8% vs 14.2% Income Comparison Calculator",
    "ASSET 011",
    "asset-011-everest-128-vs-142"
  ),
  staticHtml(
    "asset-012-strategic-growth.html",
    "AS Brokers Strategic Growth Portfolio Calculator",
    "ASSET 012",
    "asset-012-strategic-growth"
  ),
  staticHtml(
    "asset-013-everest-income-vs-growth.html",
    "AS Brokers Everest Income vs Growth Comparison Calculator",
    "ASSET 013",
    "asset-013-everest-income-vs-growth"
  ),
  staticHtml(
    "asset-014-living-annuity.html",
    "AS Brokers Living Annuity Income Calculator",
    "ASSET 014",
    "asset-014-living-annuity"
  ),
  staticHtml(
    "asset-015-average-clause.html",
    "AS Brokers Average Clause Calculator",
    "ASSET 015",
    "asset-015-average-clause"
  ),
  staticHtml(
    "asset-016-growth-comparison.html",
    "AS Brokers The Power of Growth Calculator",
    "ASSET 016",
    "asset-016-growth-comparison"
  ),
  staticHtml(
    "asset-017-personal-goal.html",
    "AS Brokers Personal Goal Growth Calculator",
    "ASSET 017",
    "asset-017-personal-goal"
  ),
];

export function getCalculatorById(id: string): CalculatorRegistryEntry | undefined {
  return CALCULATOR_REGISTRY.find((entry) => entry.id === id);
}

export function getPublicHubCalculators(): CalculatorRegistryEntry[] {
  return CALCULATOR_REGISTRY.filter((entry) => entry.publicHub);
}

export function getStaffRegistryCalculators(): CalculatorRegistryEntry[] {
  return CALCULATOR_REGISTRY;
}

export function getBlogStudioCalculators(): CalculatorRegistryEntry[] {
  return CALCULATOR_REGISTRY;
}
