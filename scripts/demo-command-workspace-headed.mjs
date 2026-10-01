/**
 * Headed browser walkthrough on DISPLAY for screen recording.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const PIN = "85879";

async function main() {
  const browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: ["--start-maximized", "--window-position=0,0"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.fill('input[type="password"], input[name="pin"]', PIN);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/crm/, { timeout: 15000 });
  await page.waitForTimeout(1200);

  await page.goto(`${BASE}/workspace`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  await page.goto(`${BASE}/studio`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  await page.goto(`${BASE}/studio/blog/workspace`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);

  await page.goto(`${BASE}/studio/newsletter`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);

  await page.goto(`${BASE}/workspace`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  await browser.close();
  console.log("✓ Headed demo complete");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
