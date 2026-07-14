/**
 * Focused verification: contact + newsletter → CRM leads; Studio draft + calculator.
 */
import { chromium } from "playwright";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.argv[2] || "http://127.0.0.1:3120").replace(/\/$/, "");

function loadEnvLocal() {
  const p = join(ROOT, ".env.local");
  const out = {};
  if (!existsSync(p)) return out;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[line.slice(0, i).trim()] = v;
  }
  return out;
}

const env = loadEnvLocal();
const stamp = Date.now();
const out = { stamp, contact: null, newsletter: null, crm: null, studio: null, notifications: null };

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// --- Contact ---
const contactName = `QA Contact ${stamp}`;
const contactEmail = `qa.contact.${stamp}@asbrokers.test`;
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
await page.waitForSelector("#fullName");
// Remove overlays that intercept clicks (cookie dialog / sticky nav)
await page.evaluate(() => {
  document.querySelectorAll('[aria-label="Cookie consent"]').forEach((el) => el.remove());
});
await page.fill("#fullName", contactName);
await page.fill("#phone", "0662276044");
await page.fill("#email", contactEmail);
await page.locator("#discussion-topics").click();
await page.locator('[role="listbox"] label').first().click();
await page.locator("#discussion-topics").click(); // close listbox
await page.locator("#consent").evaluate((el) => {
  el.checked = true;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
});
await page.getByRole("button", { name: /Send enquiry/i }).click({ force: true });
await page.waitForSelector("text=Request received", { timeout: 25000 });
out.contact = { ok: true, name: contactName, email: contactEmail };
console.log("✓ contact Request received");

// --- Newsletter (insights) ---
const newsEmail = `qa.news.${stamp}@asbrokers.test`;
await page.goto(`${BASE}/insights`, { waitUntil: "networkidle" });
await page.getByLabel(/Email for newsletter/i).first().fill(newsEmail);
await page.getByRole("button", { name: /Subscribe to newsletter/i }).first().click();
await page.waitForTimeout(2500);
const newsText = await page.locator("body").innerText();
out.newsletter = {
  ok: /thank|subscribed|welcome|got it|added/i.test(newsText),
  email: newsEmail,
};
console.log(out.newsletter.ok ? "✓ newsletter" : "⚠ newsletter soft");

// --- CRM ---
await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
await page.getByLabel(/CRM access PIN/i).fill(env.CRM_SUPERUSER_PIN);
await page.getByRole("button", { name: /Enter CRM/i }).click();
await page.waitForURL((u) => u.pathname.startsWith("/crm"));
await page.goto(`${BASE}/crm/leads`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
let leadsBody = await page.locator("body").innerText();
const contactVisible = leadsBody.includes(contactName);
// newsletter may show as email-only name
const newsVisible = leadsBody.includes(newsEmail) || leadsBody.includes(`qa.news.${stamp}`);
out.crm = {
  contactVisible,
  newsVisible,
  recordsLine: leadsBody.split("\n").find((l) => /records in view/i.test(l)) || null,
};

// Notifications: inspect wiring
await page.goto(`${BASE}/crm`, { waitUntil: "networkidle" });
const bell = page.getByRole("button", { name: "Notifications" });
const hasBell = (await bell.count()) > 0;
let panel = false;
let onclickAttr = null;
if (hasBell) {
  onclickAttr = await bell.evaluate((el) => ({
    hasOnclick: typeof el.onclick === "function",
    outer: el.outerHTML.slice(0, 200),
  }));
  await bell.click();
  await page.waitForTimeout(500);
  panel = (await page.locator('[role="dialog"], [role="menu"], [data-notifications], .notifications-panel').count()) > 0;
}
out.notifications = { hasBell, panel, onclickAttr };
console.log(
  contactVisible ? "✓ CRM shows contact lead" : "✗ CRM missing contact lead",
  newsVisible ? "✓ CRM shows newsletter" : "⚠ CRM missing newsletter lead",
  panel ? "✓ notifications panel" : "✗ notifications bell not wired"
);

// Open contact lead detail
if (contactVisible) {
  await page.goto(`${BASE}/crm/leads`, { waitUntil: "networkidle" });
  await page.getByText(contactName).first().click();
  await page.waitForTimeout(1500);
  out.crm.detailUrl = page.url();
  out.crm.detailHasEmail = (await page.locator("body").innerText()).includes(contactEmail);
  console.log(out.crm.detailHasEmail ? "✓ lead detail has email" : "✗ lead detail missing email");
}

// --- Studio ---
await page.goto(`${BASE}/studio/blog/login`, { waitUntil: "networkidle" });
await page.fill("#studio-password", env.CLIENT_STUDIO_PASSWORD);
await page.getByRole("button", { name: /Enter studio/i }).click();
await page.waitForURL((u) => u.pathname.includes("/studio/blog") && !u.pathname.includes("login"));
await page.goto(`${BASE}/studio/blog/workspace`, { waitUntil: "networkidle" });

const title = `QA Calc Post ${stamp}`;
const titleInput = page.locator("#studio-post-title");
await titleInput.waitFor({ timeout: 15000 });
await titleInput.fill(title);

const slug = page.locator("#studio-post-slug");
if (await slug.count()) await slug.fill(`qa-calc-post-${stamp}`);
const excerpt = page.locator("#studio-post-excerpt");
if (await excerpt.count()) await excerpt.fill("Mock post embedding ASSET 001 calculator.");

// Ensure HTML has calc slot or iframe
const html = page.locator("textarea").first();
if (await html.count()) {
  const cur = await html.inputValue();
  if (!/CALC_|embed-calculators/i.test(cur)) {
    await html.fill(
      `<p>QA mock insight with calculator.</p>\n[CALCULATOR_SLOT]\n`
    );
  }
}

let calcPicked = false;
const selects = page.locator("select");
for (let i = 0; i < (await selects.count()); i++) {
  const sel = selects.nth(i);
  const opts = await sel.locator("option").allTextContents();
  const idx = opts.findIndex((o) => /ASSET\s*001/i.test(o));
  if (idx >= 0) {
    await sel.selectOption({ index: idx });
    calcPicked = true;
    break;
  }
}

// category
const cats = page.locator('input[type="checkbox"]');
if ((await cats.count()) > 0) {
  await cats.first().check({ force: true }).catch(async () => {
    await page.locator('label:has(input[type="checkbox"])').first().click();
  });
}

await page.getByRole("button", { name: /Save draft/i }).first().click();
await page.waitForTimeout(3500);
const studioBody = await page.locator("body").innerText();
const saved =
  /saved|draft|updated/i.test(studioBody) &&
  !/not connected|Session expired|failed to save/i.test(studioBody);
const listed = studioBody.includes(title) || (await page.getByText(title).count()) > 0;

out.studio = { title, calcPicked, saved, listed, url: page.url(), bannerHint: studioBody.split("\n").find((l) => /saved|error|fail|draft|connected/i.test(l)) };
console.log(
  calcPicked ? "✓ calculator selected" : "✗ calculator not selected",
  saved ? "✓ draft save ok" : "⚠ draft save uncertain",
  listed ? "✓ title present" : "⚠ title not listed"
);

await browser.close();
mkdirSync(join(ROOT, "docs"), { recursive: true });
writeFileSync(join(ROOT, "docs", "QA-FORMS-CRM-STUDIO.json"), JSON.stringify(out, null, 2));
console.log("\nRESULT", JSON.stringify(out, null, 2));
if (!out.contact?.ok || !out.crm?.contactVisible || !out.studio?.calcPicked) process.exitCode = 1;
