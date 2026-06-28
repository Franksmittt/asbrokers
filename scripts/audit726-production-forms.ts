/**
 * Production browser audit — client submission forms (RUN_ID: audit726)
 * Usage: npx tsx scripts/audit726-production-forms.ts
 */
import { chromium, type Page } from "playwright";

const BASE = "https://www.asbrokers.co.za";
const RUN_ID = "audit726";

type FormResult = {
  form: string;
  url: string;
  successShown: boolean;
  successMessage: string | null;
  errors: string[];
};

async function dismissCookieBanner(page: Page): Promise<void> {
  const banner = page.locator('[role="dialog"][aria-label="Cookie consent"]');
  if (await banner.isVisible().catch(() => false)) {
    await page.locator('button:has-text("Accept All")').click();
    await banner.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
  }
}

async function collectErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  for (const sel of ['[role="alert"]', ".text-amber-400", ".text-red-400"]) {
    const texts = await page.locator(sel).allTextContents();
    for (const t of texts) {
      const trimmed = t.trim();
      if (trimmed && !errors.includes(trimmed)) errors.push(trimmed);
    }
  }
  return errors;
}

async function testContactForm(page: Page): Promise<FormResult> {
  const url = `${BASE}/contact`;
  const result: FormResult = {
    form: "Contact form",
    url,
    successShown: false,
    successMessage: null,
    errors: [],
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dismissCookieBanner(page);
    await page.waitForSelector("#fullName", { timeout: 15000 });

    await page.fill("#fullName", `CRM TEST Contact ${RUN_ID}`);
    await page.fill("#phone", "0821234567");
    await page.fill("#email", `contact-${RUN_ID}@test.asbrokers.co.za`);

    await page.click("#discussion-topics");
    await page.waitForTimeout(300);
    const topicCheckbox = page.locator('[role="listbox"] label').filter({ hasText: "General enquiry" }).locator('input[type="checkbox"]');
    if (await topicCheckbox.count()) {
      await topicCheckbox.check({ force: true });
    } else {
      await page.locator('[role="listbox"] input[type="checkbox"]').first().check({ force: true });
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    await page.click("#fullName");
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      const consent = document.getElementById("consent") as HTMLInputElement | null;
      if (consent) {
        consent.checked = true;
        consent.dispatchEvent(new Event("input", { bubbles: true }));
        consent.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    await page.click('button[type="submit"]:has-text("Initiate Wealth Engineering Request")');

    const successHeading = page.locator('h3:has-text("Request received")');
    await successHeading.waitFor({ timeout: 45000 });
    result.successShown = true;
    result.successMessage = (await successHeading.textContent())?.trim() ?? "Request received";
  } catch (e) {
    result.errors.push(String(e));
    result.errors.push(...(await collectErrors(page)));
  }

  return result;
}

async function testNewsletter(page: Page): Promise<FormResult> {
  const url = `${BASE}/contact`;
  const result: FormResult = {
    form: "Footer newsletter",
    url,
    successShown: false,
    successMessage: null,
    errors: [],
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dismissCookieBanner(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const emailInput = page.locator('footer input[name="email"]');
    await emailInput.waitFor({ timeout: 15000 });
    await emailInput.fill(`newsletter-${RUN_ID}@test.asbrokers.co.za`);
    await page.locator('footer button[type="submit"]:has-text("Subscribe")').click();

    const status = page.locator('footer [role="status"]');
    await status.waitFor({ timeout: 45000 });
    const msg = (await status.textContent())?.trim() ?? "";
    result.successMessage = msg;
    result.successShown = /subscribed/i.test(msg);
    if (!result.successShown) result.errors.push(msg || "No success message");
  } catch (e) {
    result.errors.push(String(e));
    result.errors.push(...(await collectErrors(page)));
  }

  return result;
}

async function testLegacyChecklist(page: Page): Promise<FormResult> {
  const url = `${BASE}/legacy-readiness-checklist`;
  const result: FormResult = {
    form: "Legacy Readiness Checklist",
    url,
    successShown: false,
    successMessage: null,
    errors: [],
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dismissCookieBanner(page);

    const cta = page.locator('button:has-text("Get my checklist"), a:has-text("Get my checklist")').first();
    if (await cta.isVisible().catch(() => false)) {
      await cta.click();
      await page.waitForTimeout(600);
    }

    const firstName = page.locator('input[name="firstName"]:visible').first();
    await firstName.waitFor({ timeout: 15000 });

    await firstName.fill("CRM");
    await page.locator('input[name="surname"]:visible').first().fill(`Legacy ${RUN_ID}`);
    await page.locator('input[name="email"]:visible').first().fill(`legacy-${RUN_ID}@test.asbrokers.co.za`);
    await page.locator('input[name="phone"]:visible').first().fill("0821112233");
    await page.locator('button[type="submit"]:has-text("Send my checklist"):visible').first().click();

    await Promise.race([
      page.waitForURL(/\/legacy-readiness-checklist\/checklist\//, { timeout: 45000 }),
      page.locator('text=Preparing your checklist').waitFor({ timeout: 45000 }),
    ]);

    const currentUrl = page.url();
    if (currentUrl.includes("/checklist/")) {
      result.successShown = true;
      result.successMessage = `Redirected to checklist: ${currentUrl}`;
    } else {
      const prep = await page.locator("text=Preparing your checklist").textContent().catch(() => null);
      if (prep) {
        result.successShown = true;
        result.successMessage = prep.trim();
      }
    }
    if (!result.successShown) {
      result.errors.push(...(await collectErrors(page)));
    }
  } catch (e) {
    result.errors.push(String(e));
    result.errors.push(...(await collectErrors(page)));
  }

  return result;
}

async function testHealthyRetirement(page: Page): Promise<FormResult> {
  const url = `${BASE}/healthy-retirement-blueprint`;
  const result: FormResult = {
    form: "Healthy Retirement Blueprint",
    url,
    successShown: false,
    successMessage: null,
    errors: [],
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dismissCookieBanner(page);

    const startBtn = page.locator('button:has-text("Start free assessment")').first();
    await startBtn.waitFor({ timeout: 15000 });
    await startBtn.click();

    for (let i = 0; i < 10; i++) {
      const question = page.locator("text=/Question \\d+ of 10/");
      const visible = await question.isVisible().catch(() => false);
      if (!visible) break;

      const option = page.locator("#health-tool button[type='button']").filter({ hasText: /.+/ }).first();
      await option.waitFor({ timeout: 10000 });
      await option.click();
      await page.waitForTimeout(350);
    }

    await page.waitForSelector("#hrb-email", { timeout: 15000 });
    await page.fill("#hrb-firstName", `CRM Health ${RUN_ID}`);
    await page.fill("#hrb-email", `health-${RUN_ID}@test.asbrokers.co.za`);
    await page.fill("#hrb-phone", "0823334455");
    await page.click('button[type="submit"]:has-text("See my results")');

    const scoreHeading = page.locator('h2:has-text("Retirement Health Score")');
    await scoreHeading.waitFor({ timeout: 45000 });
    result.successShown = true;
    const scoreText = await page.locator("#health-tool .text-5xl").first().textContent();
    result.successMessage = `Retirement Health Score shown${scoreText ? `: ${scoreText.trim()}` : ""}`;
  } catch (e) {
    result.errors.push(String(e));
    result.errors.push(...(await collectErrors(page)));
  }

  return result;
}

async function testBusinessRiskReview(page: Page): Promise<FormResult> {
  const url = `${BASE}/business-risk-review`;
  const result: FormResult = {
    form: "Business Risk Review",
    url,
    successShown: false,
    successMessage: null,
    errors: [],
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dismissCookieBanner(page);

    const startBtn = page.locator('button:has-text("Start free workbook")').first();
    await startBtn.waitFor({ timeout: 15000 });
    await startBtn.scrollIntoViewIfNeeded();
    await startBtn.click();

    await page.waitForSelector("#brr-email", { timeout: 20000 });
    await page.fill("#brr-name", `CRM BRR ${RUN_ID}`);
    await page.fill("#brr-email", `brr-${RUN_ID}@test.asbrokers.co.za`);
    await page.fill("#brr-phone", "0825556677");
    await page.fill("#brr-company", "Audit726 Test Co Pty Ltd");
    await page.click('button:has-text("Continue to cover checklist")');

    await page.waitForSelector("#cover-buildings", { timeout: 15000 });
    await page.check("#cover-buildings");
    await page.check("#cover-theft");

    await page.click('button:has-text("See my Business Risk Score")');

    const resultsHeading = page.locator('h2:has-text("Your Business Risk Score")');
    await resultsHeading.waitFor({ timeout: 45000 });
    result.successShown = true;
    const pct = await page.locator("text=/\\d+%/").first().textContent();
    result.successMessage = `Business Risk Score displayed${pct ? ` (${pct.trim()} protection)` : ""}`;
  } catch (e) {
    result.errors.push(String(e));
    result.errors.push(...(await collectErrors(page)));
  }

  return result;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results: FormResult[] = [];

  const tests = [
    testContactForm,
    testNewsletter,
    testLegacyChecklist,
    testHealthyRetirement,
    testBusinessRiskReview,
  ];

  for (const test of tests) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ASBrokers-Audit726",
    });
    const page = await context.newPage();
    console.log(`\n--- Testing: ${test.name} ---`);
    const r = await test(page);
    results.push(r);
    console.log(JSON.stringify(r, null, 2));
    await context.close();
  }

  await browser.close();

  console.log("\n=== AUDIT726 RESULTS JSON ===");
  console.log(JSON.stringify(results, null, 2));

  const failed = results.filter((r) => !r.successShown);
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
