import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] as const;

const VIOLATIONS_PATH = join(process.cwd(), "test-results", "accessibility-violations-summary.json");

async function analyzePage(page: import("@playwright/test").Page, name: string) {
  const results = await new AxeBuilder({ page }).withTags([...WCAG_TAGS]).analyze();

  if (results.violations.length > 0) {
    mkdirSync(join(process.cwd(), "test-results"), { recursive: true });
    writeFileSync(
      VIOLATIONS_PATH,
      JSON.stringify(
        {
          page: name,
          url: page.url(),
          violationCount: results.violations.length,
          violations: results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.map((n) => ({
              html: n.html,
              target: n.target,
              failureSummary: n.failureSummary,
            })),
          })),
        },
        null,
        2
      ),
      "utf8"
    );
  }

  expect(results.violations, `WCAG violations on ${name} — see ${VIOLATIONS_PATH}`).toEqual([]);
}

async function resolveInsightArticlePath(baseURL: string): Promise<string> {
  try {
    const res = await fetch(`${baseURL}/sitemap.xml`);
    if (!res.ok) return "/insights/semigration-retirement";
    const xml = await res.text();
    const matches = [...xml.matchAll(/<loc>[^<]*\/insights\/([^/<\?]+)<\/loc>/g)].map((m) => `/insights/${m[1]}`);
    const dynamic = matches.find((p) => p !== "/insights/semigration-retirement") ?? matches[0];
    return dynamic ?? "/insights/semigration-retirement";
  } catch {
    return "/insights/semigration-retirement";
  }
}

test.describe("WCAG 2.1 AA — axe-core", () => {
  test("home page (/)", async ({ page }) => {
    await page.goto("/");
    await page.locator("#main-content").waitFor({ state: "visible" });
    await analyzePage(page, "/");
  });

  test("primary conversion page (/contact)", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("#main-content").waitFor({ state: "visible" });
    await analyzePage(page, "/contact");
  });

  test("dynamic insight template", async ({ page, baseURL }) => {
    const path = await resolveInsightArticlePath(baseURL!);
    await page.goto(path);
    await page.locator("#main-content").waitFor({ state: "visible" });
    await analyzePage(page, path);
  });
});

test.describe("Keyboard & form semantics", () => {
  test("mobile nav menu opens via keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /toggle menu/i });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#mobile-nav-panel")).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact us" }).first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-panel")).toBeHidden();
  });

  test("contact form fields are labeled", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/^phone/i)).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.getByRole("button", { name: /what would you like to discuss/i })).toBeVisible();
  });
});
