import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] as const;

const HUB_PATHS = [
  "/",
  "/retirement",
  "/everest-wealth",
  "/insurance",
  "/solutions/estate-planning",
  "/insights",
  "/about",
  "/contact",
] as const;

const VIOLATIONS_PATH = join(process.cwd(), "test-results", "hub-accessibility-violations.json");

async function analyzeHub(page: import("@playwright/test").Page, path: string) {
  await page.goto(path);
  await page.locator("#main-content").waitFor({ state: "visible" });
  await page.waitForTimeout(500);

  const results = await new AxeBuilder({ page }).withTags([...WCAG_TAGS]).analyze();

  return {
    path,
    url: page.url(),
    violationCount: results.violations.length,
    violations: results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map((n) => ({
        html: n.html.slice(0, 200),
        target: n.target,
        failureSummary: n.failureSummary,
      })),
    })),
  };
}

test.describe("Hub pages WCAG 2.1 AA", () => {
  test("all 8 hub pages pass axe (mobile)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const all: Awaited<ReturnType<typeof analyzeHub>>[] = [];

    for (const path of HUB_PATHS) {
      all.push(await analyzeHub(page, path));
    }

    mkdirSync(join(process.cwd(), "test-results"), { recursive: true });
    writeFileSync(VIOLATIONS_PATH, JSON.stringify(all, null, 2), "utf8");

    const failing = all.filter((r) => r.violationCount > 0);
    if (failing.length) {
      console.log(JSON.stringify(failing, null, 2));
    }
    expect(failing, `axe violations — see ${VIOLATIONS_PATH}`).toEqual([]);
  });

  test("all 8 hub pages pass axe (desktop)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const all: Awaited<ReturnType<typeof analyzeHub>>[] = [];

    for (const path of HUB_PATHS) {
      all.push(await analyzeHub(page, path));
    }

    const failing = all.filter((r) => r.violationCount > 0);
    expect(failing).toEqual([]);
  });
});
