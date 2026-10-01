/**
 * Browser E2E smoke for Command Workspace Phase 1.
 * Requires: npm run dev on :3000 and .env.local with CRM_PIN_DEVELOPER=85879
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE = process.env.E2E_BASE_URL || "http://localhost:3000";
const PIN = process.env.CRM_PIN_DEVELOPER || "85879";
const OUT = "/opt/cursor/artifacts";
mkdirSync(OUT, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const failures = [];

  async function shot(name) {
    const path = join(OUT, name);
    await page.screenshot({ path, fullPage: false });
    console.log("  screenshot:", path);
  }

  console.log("→ Login CRM with developer PIN");
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  // Prefer PIN field if present
  const pinInput =
    (await page.$('input[name="pin"]')) ||
    (await page.$('input[type="password"]')) ||
    (await page.$('input[inputmode="numeric"]'));
  if (!pinInput) {
    failures.push("No PIN input on /login");
  } else {
    await pinInput.fill(PIN);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }).catch(() => {}),
      page.click('button[type="submit"]'),
    ]);
  }
  await page.waitForTimeout(1500);
  const afterLogin = page.url();
  console.log("  after login:", afterLogin);
  await shot("e2e-1-crm-after-pin.png");

  console.log("→ /workspace (Command Workspace)");
  await page.goto(`${BASE}/workspace`, { waitUntil: "networkidle" });
  const workspaceText = await page.locator("body").innerText();
  const workspaceNorm = workspaceText.toLowerCase();
  if (!workspaceNorm.includes("command workspace")) {
    failures.push("/workspace missing Command Workspace heading");
  }
  for (const verb of ["today", "serve", "teach", "publish", "grow", "system"]) {
    if (!workspaceNorm.includes(verb)) failures.push(`/workspace missing ${verb}`);
  }
  await shot("e2e-2-workspace-home.png");
  console.log("  url:", page.url());

  console.log("→ /studio via CRM bridge (no Studio password)");
  await page.goto(`${BASE}/studio`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const studioUrl = page.url();
  const studioText = await page.locator("body").innerText();
  if (studioUrl.includes("/login") && studioUrl.includes("studio")) {
    failures.push("Studio redirected to Studio password login despite CRM session");
  }
  if (!studioText.includes("Insights") && !studioText.includes("Studio")) {
    failures.push("/studio content unexpected");
  }
  if (!studioText.includes("CRM session") && !studioText.includes("Insights")) {
    // soft note — CRM bridge banner preferred
    console.log("  note: CRM bridge banner may be absent if studio cookie also present");
  }
  await shot("e2e-3-studio-home.png");
  console.log("  url:", studioUrl);

  console.log("→ Insights Studio workspace");
  await page.goto(`${BASE}/studio/blog/workspace`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const blogUrl = page.url();
  if (blogUrl.includes("/studio/blog/login")) {
    failures.push("Blog workspace blocked — CRM bridge failed");
  }
  await shot("e2e-4-blog-studio.png");
  console.log("  url:", blogUrl);

  console.log("→ Public Insights index (warm canvas)");
  await page.goto(`${BASE}/insights`, { waitUntil: "networkidle" });
  await shot("e2e-5-insights-index.png");

  // Sample article if any slug link present (exclude bare /insights)
  const article = page.locator('a[href^="/insights/"]').filter({ hasNotText: /^$/ }).first();
  const articleHref = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href^="/insights/"]')];
    const hit = links.find((a) => {
      try {
        const path = new URL(a.href, location.origin).pathname;
        return /^\/insights\/[^/]+/.test(path);
      } catch {
        return false;
      }
    });
    return hit?.getAttribute("href") ?? null;
  });
  if (articleHref) {
    await page.goto(new URL(articleHref, BASE).toString(), { waitUntil: "networkidle" });
    await shot("e2e-6-insight-article.png");
    const body = (await page.locator("body").innerText()).toLowerCase();
    // Studio-published articles use ClientInsightArticle (kicker "Insights studio" + prose).
    // Static hard-coded insight pages are out of Phase 1 scope.
    if (body.includes("insights studio")) {
      const prose = page.locator(".prose").first();
      if (!(await prose.count())) {
        failures.push("Studio Insight article missing prose measure");
      }
    } else {
      console.log("  static insight page (no studio prose shell) — OK for Phase 1");
    }
    console.log("  article:", page.url());
  } else {
    console.log("  no public insight article slugs — skip article check");
    void article;
  }

  console.log("→ Newsletter + Courses studio via bridge");
  await page.goto(`${BASE}/studio/newsletter`, { waitUntil: "networkidle" });
  if (page.url().includes("/login")) failures.push("Newsletter studio blocked");
  await shot("e2e-7-newsletter.png");
  await page.goto(`${BASE}/studio/courses`, { waitUntil: "networkidle" });
  if (page.url().includes("/login")) failures.push("Courses studio blocked");
  await shot("e2e-8-courses.png");

  await browser.close();

  if (failures.length) {
    console.error("\n✗ Failures:");
    for (const f of failures) console.error(" -", f);
    process.exitCode = 1;
  } else {
    console.log("\n✓ E2E Command Workspace smoke passed");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
