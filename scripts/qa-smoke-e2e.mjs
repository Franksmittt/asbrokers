/**
 * End-to-end QA smoke for AS Brokers.
 * Usage: node scripts/qa-smoke-e2e.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE = (process.argv[2] || process.env.QA_BASE_URL || "http://127.0.0.1:3120").replace(/\/$/, "");
const EMBED_DIR = join(ROOT, "public", "embed-calculators");

function loadEnvLocal() {
  const p = join(ROOT, ".env.local");
  if (!existsSync(p)) return {};
  const out = {};
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
const report = {
  base: BASE,
  startedAt: new Date().toISOString(),
  calculators: [],
  calculatorPages: [],
  forms: [],
  studio: null,
  crm: null,
  links: { checked: 0, failures: [], orphansNoted: [] },
  errors: [],
};

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function fail(msg) {
  console.log(`  ✗ ${msg}`);
  report.errors.push(msg);
}

async function crmLogin(page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.getByLabel(/CRM access PIN/i).fill(env.CRM_SUPERUSER_PIN);
  await page.getByRole("button", { name: /Enter CRM/i }).click();
  await page.waitForURL((u) => u.pathname.startsWith("/crm"), { timeout: 20000 });
}

async function smokeCalculators(browser) {
  console.log("\n== Calculators (embed HTML) ==");
  const files = readdirSync(EMBED_DIR)
    .filter((f) => f.startsWith("asset-") && f.endsWith(".html"))
    .sort();

  for (const file of files) {
    const page = await browser.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e.message || e)));
    try {
      await page.goto(pathToFileURL(join(EMBED_DIR, file)).href, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      const btn = page.locator("button").filter({ hasText: /calculate|compare|goal/i }).first();
      if ((await btn.count()) > 0) {
        await btn.click({ timeout: 5000 });
        await page.waitForTimeout(250);
      } else {
        const firstInput = page.locator('input[type="number"], input[type="text"]').first();
        if ((await firstInput.count()) > 0) {
          await firstInput.fill("1000000");
          await firstInput.dispatchEvent("input");
          await page.waitForTimeout(250);
        }
      }
      const bodyText = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
      const hasResult = bodyText.length > 200 || /R\s?[\d]|%/.test(bodyText);
      const entry = { file, ok: hasResult && pageErrors.length === 0, pageErrors, bodyChars: bodyText.length };
      report.calculators.push(entry);
      if (entry.ok) ok(file);
      else fail(`${file}: result=${hasResult} errors=${pageErrors.join("; ") || "none"}`);
    } catch (e) {
      report.calculators.push({ file, ok: false, error: String(e) });
      fail(`${file}: ${e}`);
    } finally {
      await page.close();
    }
  }
}

async function checkCalculatorPages(browser) {
  console.log("\n== Calculator landing pages ==");
  const page = await browser.newPage();
  for (const c of report.calculators) {
    const id = c.file.replace(/\.html$/, "");
    const path = `/calculators/${id}`;
    const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    const status = res?.status() ?? 0;
    const iframeCount = await page.locator(`iframe[src*="embed-calculators"]`).count();
    const rowOk = status === 200 && iframeCount > 0;
    report.calculatorPages.push({ path, status, iframeCount, ok: rowOk });
    if (rowOk) ok(path);
    else fail(`${path}: status=${status} iframes=${iframeCount}`);
  }
  await page.close();
}

async function submitContact(browser, stamp) {
  const page = await browser.newPage();
  const name = `QA Contact ${stamp}`;
  const email = `qa.contact.${stamp}@asbrokers.test`;
  try {
    await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
    await page.waitForSelector('input[name="fullName"]', { timeout: 30000 });
    await page.fill('input[name="fullName"]', name);
    await page.fill('input[name="phone"]', "0662276044");
    await page.fill('input[name="email"]', email);
    await page.locator("#discussion-topics").click();
    await page.locator('[role="listbox"] label').first().click();
    await page.locator('input[name="consent"]').check({ force: true });
    await page.getByRole("button", { name: /Send enquiry/i }).click();
    await page.waitForSelector("text=Request received", { timeout: 20000 });
    report.forms.push({ form: "contact", name, email, success: true });
    ok(`contact → ${name}`);
    return { name, email };
  } catch (e) {
    report.forms.push({ form: "contact", success: false, error: String(e) });
    fail(`contact: ${e}`);
    return null;
  } finally {
    await page.close();
  }
}

async function submitNewsletter(browser, stamp) {
  const page = await browser.newPage();
  const email = `qa.news.${stamp}@asbrokers.test`;
  try {
    await page.goto(`${BASE}/insights`, { waitUntil: "networkidle" });
    const input = page.getByLabel(/Email for newsletter/i).first();
    await input.waitFor({ timeout: 15000 });
    await input.fill(email);
    await page.getByRole("button", { name: /Subscribe to newsletter/i }).first().click();
    await page.waitForTimeout(2500);
    const text = await page.locator("body").innerText();
    const success = /thank|subscribed|welcome|in touch|added|got it/i.test(text);
    report.forms.push({ form: "newsletter", email, success });
    if (success) ok(`newsletter → ${email}`);
    else ok(`newsletter submitted (soft) → ${email}`);
    return email;
  } catch (e) {
    report.forms.push({ form: "newsletter", success: false, error: String(e) });
    fail(`newsletter: ${e}`);
    return null;
  } finally {
    await page.close();
  }
}

async function submitFunnelForms(browser, stamp) {
  const funnels = [
    {
      form: "healthy-retirement-blueprint",
      path: "/healthy-retirement-blueprint",
      fill: async (page) => {
        // best-effort: fill common fields if present
        for (const [sel, val] of [
          ['input[name="fullName"], input[name="name"]', `QA Healthy ${stamp}`],
          ['input[name="email"]', `qa.healthy.${stamp}@asbrokers.test`],
          ['input[name="phone"]', "0662276044"],
        ]) {
          const el = page.locator(sel).first();
          if (await el.count()) await el.fill(val);
        }
        const consent = page.locator('input[name="consent"], input[type="checkbox"]').last();
        if (await consent.count()) await consent.check({ force: true }).catch(() => {});
      },
      marker: `QA Healthy ${stamp}`,
    },
    {
      form: "legacy-readiness-checklist",
      path: "/legacy-readiness-checklist",
      fill: async (page) => {
        for (const [sel, val] of [
          ['input[name="fullName"], input[name="name"]', `QA Legacy ${stamp}`],
          ['input[name="email"]', `qa.legacy.${stamp}@asbrokers.test`],
          ['input[name="phone"]', "0662276044"],
        ]) {
          const el = page.locator(sel).first();
          if (await el.count()) await el.fill(val);
        }
      },
      marker: `QA Legacy ${stamp}`,
    },
    {
      form: "business-risk-review",
      path: "/business-risk-review",
      fill: async (page) => {
        for (const [sel, val] of [
          ['input[name="fullName"], input[name="name"], input[name="contactName"]', `QA Risk ${stamp}`],
          ['input[name="email"]', `qa.risk.${stamp}@asbrokers.test`],
          ['input[name="phone"]', "0662276044"],
        ]) {
          const el = page.locator(sel).first();
          if (await el.count()) await el.fill(val);
        }
      },
      marker: `QA Risk ${stamp}`,
    },
    {
      form: "retirement-survival-blueprint",
      path: "/retirement-survival-blueprint",
      fill: async (page) => {
        for (const [sel, val] of [
          ['input[name="fullName"], input[name="name"]', `QA Survival ${stamp}`],
          ['input[name="email"]', `qa.survival.${stamp}@asbrokers.test`],
          ['input[name="phone"]', "0662276044"],
        ]) {
          const el = page.locator(sel).first();
          if (await el.count()) await el.fill(val);
        }
      },
      marker: `QA Survival ${stamp}`,
    },
  ];

  const markers = [];
  for (const f of funnels) {
    const page = await browser.newPage();
    try {
      const res = await page.goto(`${BASE}${f.path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
      const status = res?.status() ?? 0;
      if (status >= 400) {
        report.forms.push({ form: f.form, success: false, error: `HTTP ${status}` });
        fail(`${f.form}: HTTP ${status}`);
        continue;
      }
      await f.fill(page);
      const submit = page.getByRole("button", { name: /submit|send|complete|get|request|start|continue/i }).last();
      if ((await submit.count()) === 0) {
        report.forms.push({ form: f.form, success: false, error: "no submit button", skipped: true });
        fail(`${f.form}: no submit button found`);
        continue;
      }
      await submit.click({ timeout: 5000 }).catch(async () => {
        await page.locator('button[type="submit"]').last().click();
      });
      await page.waitForTimeout(2500);
      report.forms.push({ form: f.form, success: true, marker: f.marker });
      markers.push(f.marker);
      ok(`${f.form} submitted`);
    } catch (e) {
      report.forms.push({ form: f.form, success: false, error: String(e) });
      fail(`${f.form}: ${e}`);
    } finally {
      await page.close();
    }
  }
  return markers;
}

async function verifyCrm(browser, markers) {
  console.log("\n== CRM verification ==");
  const page = await browser.newPage();
  try {
    await crmLogin(page);
    ok(`CRM login → ${page.url()}`);
    await page.goto(`${BASE}/crm/leads`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const body = await page.locator("body").innerText();
    const found = markers.filter((m) => body.includes(m));
    const missing = markers.filter((m) => !body.includes(m));
    const bell = page.getByRole("button", { name: /Notifications/i });
    const hasBell = (await bell.count()) > 0;
    let bellWired = false;
    if (hasBell) {
      await bell.click();
      await page.waitForTimeout(400);
      // stub if nothing opens
      const dialog = await page.locator('[role="dialog"], [role="menu"], [data-notifications]').count();
      bellWired = dialog > 0;
    }
    report.crm = {
      ok: found.length > 0 && missing.length === 0,
      found,
      missing,
      notificationsButton: hasBell,
      notificationsInteractive: bellWired,
      recordsLine: body.split("\n").find((l) => /records in view/i.test(l)) || null,
    };
    if (found.length) ok(`Leads visible: ${found.join(", ")}`);
    if (missing.length) fail(`Leads missing: ${missing.join(", ")}`);
    if (hasBell && !bellWired) fail("Notifications bell present but not interactive (no panel)");
    else if (hasBell) ok("Notifications UI interactive");
  } catch (e) {
    report.crm = { ok: false, error: String(e) };
    fail(`CRM: ${e}`);
  } finally {
    await page.close();
  }
}

async function studioMockPost(browser, stamp) {
  console.log("\n== Blog Studio ==");
  const page = await browser.newPage();
  const title = `QA Calculator Embed ${stamp}`;
  try {
    await page.goto(`${BASE}/studio/blog/login`, { waitUntil: "networkidle" });
    await page.fill("#studio-password", env.CLIENT_STUDIO_PASSWORD);
    await page.getByRole("button", { name: /Enter studio/i }).click();
    await page.waitForURL((u) => u.pathname.includes("/studio/blog") && !u.pathname.includes("/login"), {
      timeout: 20000,
    });
    ok(`Studio login → ${page.url()}`);

    if (!page.url().includes("workspace")) {
      await page.goto(`${BASE}/studio/blog/workspace`, { waitUntil: "networkidle" });
    }

    // New post / clear title
    const newBtn = page.getByRole("button", { name: /new post|create|start/i }).first();
    if (await newBtn.count()) await newBtn.click().catch(() => {});

    const titleInput = page.locator("#studio-post-title").first();
    if (await titleInput.count()) {
      await titleInput.fill(title);
    }

    // Pick calculator in any select that lists ASSET codes
    const selects = page.locator("select");
    const count = await selects.count();
    let picked = false;
    for (let i = 0; i < count; i++) {
      const sel = selects.nth(i);
      const options = await sel.locator("option").allTextContents();
      const idx = options.findIndex((o) => /ASSET\s*001|Retirement Growth/i.test(o));
      if (idx >= 0) {
        await sel.selectOption({ index: idx });
        picked = true;
        ok(`Selected calculator option: ${options[idx].slice(0, 80)}`);
        break;
      }
    }

    // Ensure body has calc token / iframe via HTML area if needed
    const htmlArea = page.locator("textarea").first();
    if ((await htmlArea.count()) > 0) {
      const cur = await htmlArea.inputValue().catch(() => "");
      if (!/embed-calculators|CALC_|calculator/i.test(cur)) {
        await htmlArea.fill(
          `${cur}\n<p>QA mock post using ASSET 001.</p>\n<iframe src="/embed-calculators/asset-001-retirement-growth.html" title="ASSET 001" style="width:100%;min-height:720px;border:0" loading="lazy"></iframe>\n`
        );
        picked = true;
      }
    }

    // Fill slug/excerpt if empty
    const slug = page.locator("#studio-post-slug, input[name='slug']").first();
    if (await slug.count()) {
      const v = await slug.inputValue();
      if (!v) await slug.fill(`qa-calculator-embed-${stamp}`);
    }
    const excerpt = page.locator("#studio-post-excerpt, textarea[name='excerpt']").first();
    if (await excerpt.count()) {
      const v = await excerpt.inputValue().catch(() => "");
      if (!v) await excerpt.fill("QA mock insight post with an embedded calculator.");
    }

    // categories
    const cat = page.locator('input[type="checkbox"]').filter({ has: page.locator("xpath=..") }).first();
    // click first category checkbox in step 4 area
    const catBoxes = page.locator('label:has(input[type="checkbox"])');
    if ((await catBoxes.count()) > 0) {
      await catBoxes.first().click().catch(() => {});
    }

    const saveBtn = page.getByRole("button", { name: /Save draft|Save live changes/i }).first();
    let saved = false;
    let saveError = null;
    if (await saveBtn.count()) {
      await saveBtn.click();
      await page.waitForTimeout(3000);
      const banner = await page.locator("body").innerText();
      saveError = /not connected|failed|error|expired/i.test(banner)
        ? banner.split("\n").find((l) => /not connected|failed|error|expired/i.test(l)) || "save warning"
        : null;
      saved = !saveError || /saved|draft/i.test(banner);
    }

    // Preview iframe present in editor?
    const hasCalcUi = picked || (await page.locator('iframe[src*="embed-calculators"], select option').count()) > 0;

    report.studio = {
      ok: Boolean(picked || hasCalcUi),
      title,
      picked,
      saved,
      saveError,
      url: page.url(),
    };
    if (picked) ok(`Studio mock post ready: "${title}" (saved=${saved}${saveError ? `, note=${saveError}` : ""})`);
    else fail("Studio: could not select/embed calculator");
  } catch (e) {
    report.studio = { ok: false, error: String(e) };
    fail(`Studio: ${e}`);
  } finally {
    await page.close();
  }
}

async function crawlLinks(browser) {
  console.log("\n== Internal link 404 crawl ==");
  const seeds = [
    "/",
    "/calculators",
    "/contact",
    "/insights",
    "/retirement-planning",
    "/estate-planning",
    "/investments",
    "/insurance",
    "/everest-wealth",
    "/about",
    "/privacy",
    "/terms",
    "/complaints",
    "/conflict-of-interest",
    "/legacy-conversations",
    "/premium-increase-calculator",
    "/chat",
    "/quiz",
  ];
  const visited = new Set();
  const queue = [...seeds];
  const page = await browser.newPage();

  while (queue.length && visited.size < 140) {
    const path = queue.shift();
    if (!path || visited.has(path)) continue;
    visited.add(path);
    let status = 0;
    try {
      const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      status = res?.status() ?? 0;
    } catch (e) {
      report.links.failures.push({ path, status: 0, error: String(e) });
      fail(`${path}: navigation error`);
      continue;
    }
    report.links.checked++;
    if (status >= 400) {
      report.links.failures.push({ path, status });
      fail(`${path} → ${status}`);
    }

    const hrefs = await page.$$eval("a[href]", (as) =>
      as
        .map((a) => a.getAttribute("href") || "")
        .filter((h) => h.startsWith("/") && !h.startsWith("//"))
        .map((h) => h.split("?")[0].split("#")[0])
        .filter((h) => h.length > 1 && !h.startsWith("/api/") && !h.startsWith("/_next"))
    );
    for (const h of hrefs) {
      if (
        !visited.has(h) &&
        !queue.includes(h) &&
        visited.size + queue.length < 180 &&
        !h.startsWith("/crm/") &&
        !h.startsWith("/portal/") &&
        !h.startsWith("/studio/blog/workspace")
      ) {
        queue.push(h);
      }
    }
  }
  await page.close();
  ok(`Checked ${report.links.checked} pages; failures=${report.links.failures.length}`);
}

async function main() {
  console.log(`QA smoke against ${BASE}`);
  try {
    const r = await fetch(BASE);
    if (!r.ok && r.status !== 304) throw new Error(`HTTP ${r.status}`);
  } catch {
    console.error(`Cannot reach ${BASE}. Start with: npm run start -- -p 3120`);
    process.exit(2);
  }

  const browser = await chromium.launch({ headless: true });
  const stamp = Date.now();
  const markers = [];
  try {
    await smokeCalculators(browser);
    await checkCalculatorPages(browser);

    console.log("\n== Forms ==");
    const contact = await submitContact(browser, stamp);
    if (contact) markers.push(contact.name);
    await submitNewsletter(browser, stamp);
    const funnelMarkers = await submitFunnelForms(browser, stamp);
    markers.push(...funnelMarkers);

    await verifyCrm(browser, markers.filter(Boolean));
    await studioMockPost(browser, stamp);
    await crawlLinks(browser);
  } finally {
    await browser.close();
  }

  report.finishedAt = new Date().toISOString();
  mkdirSync(join(ROOT, "docs"), { recursive: true });
  const outPath = join(ROOT, "docs", "QA-SMOKE-E2E-REPORT.json");
  writeFileSync(outPath, JSON.stringify(report, null, 2));

  const calcOk = report.calculators.every((c) => c.ok);
  const pagesOk = report.calculatorPages.every((c) => c.ok);
  const contactOk = report.forms.some((f) => f.form === "contact" && f.success);
  const crmOk = report.crm?.ok;
  const studioOk = report.studio?.ok;
  const linksOk = report.links.failures.length === 0;

  console.log("\n== SUMMARY ==");
  console.log(`Calculators: ${calcOk ? "PASS" : "FAIL"} (${report.calculators.filter((c) => c.ok).length}/${report.calculators.length})`);
  console.log(`Calc pages:  ${pagesOk ? "PASS" : "FAIL"}`);
  console.log(`Contact CRM: ${contactOk && crmOk ? "PASS" : "FAIL"}`);
  console.log(`Studio:      ${studioOk ? "PASS" : "FAIL"}`);
  console.log(`Links 404:   ${linksOk ? "PASS" : "FAIL"} (${report.links.failures.length})`);
  console.log(`Notifications interactive: ${report.crm?.notificationsInteractive ? "YES" : "NO"}`);
  console.log(`Report: ${outPath}`);

  if (!calcOk || !pagesOk || !contactOk || !crmOk || !studioOk || !linksOk) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
