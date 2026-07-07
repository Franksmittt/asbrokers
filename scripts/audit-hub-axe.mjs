/**
 * Standalone axe audit for hub pages (no Playwright webServer).
 * Usage: node scripts/audit-hub-axe.mjs [baseUrl]
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:3002";
const HUB_PATHS = [
  "/",
  "/retirement",
  "/everest-wealth",
  "/insurance",
  "/estate-planning",
  "/insights",
  "/about",
  "/contact",
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];

const browser = await chromium.launch();
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  for (const path of HUB_PATHS) {
    const url = `${BASE}${path === "/" ? "" : path}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.locator("#main-content").waitFor({ state: "visible" });

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    results.push({
      path,
      viewport: vp.name,
      url: page.url(),
      violations: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
        samples: v.nodes.slice(0, 3).map((n) => ({ html: n.html.slice(0, 120), target: n.target })),
      })),
    });

    const count = axe.violations.length;
    console.log(`${vp.name} ${path}: ${count} violation(s)`);
  }
  await context.close();
}

await browser.close();

const outDir = join(process.cwd(), "test-results");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "hub-axe-audit.json"), JSON.stringify(results, null, 2));

const failing = results.filter((r) => r.violations.length > 0);
if (failing.length) {
  console.error("\nFAIL: contrast/accessibility issues found");
  process.exit(1);
}
console.log("\nPASS: all hub pages axe-clean on mobile + desktop");
