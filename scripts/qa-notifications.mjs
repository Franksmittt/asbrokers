import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
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
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("http://127.0.0.1:3120/login");
await page.getByLabel(/CRM access PIN/i).fill(env.CRM_SUPERUSER_PIN);
await page.getByRole("button", { name: /Enter CRM/i }).click();
await page.waitForURL((u) => u.pathname.startsWith("/crm"));
await page.getByRole("button", { name: "Notifications" }).click();
await page.waitForSelector('[aria-label="New lead notifications"]', { timeout: 5000 });
const panel = await page.locator('[aria-label="New lead notifications"]').innerText();
console.log("panel ok");
console.log(panel.slice(0, 400).replace(/\n/g, " | "));
const hasQa = /QA Contact|Newsletter subscriber|New leads/i.test(panel);
console.log("has content", hasQa);
await browser.close();
if (!hasQa) process.exit(1);
