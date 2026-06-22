import { test, expect } from "@playwright/test";

/** Googlebot smartphone UA (WRS emulation per Phase 10). */
const GOOGLEBOT_MOBILE_UA =
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.204 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const MAX_PAYLOAD_BYTES = 2_097_152;
const LOAD_TIMEOUT_MS = 5_000;
const HYDRATION_ERROR_RE =
  /Hydration failed|Text content does not match|Prop .+ did not match|did not match\. Server:/i;

/** Key indexable routes + primary keyword expected in raw HTML. */
const KEY_URLS = [
  { path: "/", titlePattern: /AS Brokers/i, keyword: "retirement" },
  { path: "/contact", titlePattern: /Contact/i, keyword: "FSP 17273" },
  { path: "/calculators", titlePattern: /Actuarial|calculator/i, keyword: "calculator" },
] as const;

function headerBytes(headers: Record<string, string>): number {
  return Object.entries(headers).reduce((sum, [k, v]) => sum + k.length + String(v).length + 4, 0);
}

function extractVisibleTextFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const next = Math.min(row[j] + 1, prev + 1, row[j - 1] + cost);
      row[j - 1] = prev;
      prev = next;
    }
    row[n] = prev;
  }
  return row[n];
}

function extractMainHtml(html: string): string {
  const mainMatch = html.match(/<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i);
  return mainMatch?.[1] ?? html;
}

function extractFirstH1Text(html: string): string {
  const scope = extractMainHtml(html);
  const h1Match = scope.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1Match ? extractVisibleTextFromHtml(h1Match[1]) : "";
}

test.use({
  userAgent: GOOGLEBOT_MOBILE_UA,
  viewport: { width: 412, height: 732 },
  isMobile: true,
});

test.describe("Phase 10 — WRS / crawler compatibility", () => {
  for (const { path, titlePattern, keyword } of KEY_URLS) {
    test.describe(path, () => {
      test("SSR HTML contains <title> and primary keyword (no JS)", async ({ request }) => {
        const res = await request.get(path, {
          headers: { Accept: "text/html" },
        });
        expect(res.ok(), `GET ${path} should return 200`).toBeTruthy();
        const html = await res.text();
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        expect(titleMatch, `<title> missing in raw HTML for ${path}`).toBeTruthy();
        expect(titleMatch![1]).toMatch(titlePattern);
        expect(html.toLowerCase()).toContain(keyword.toLowerCase());
      });

      test("Googlebot payload < 2MB (body + response headers)", async ({ page }) => {
        let totalBytes = 0;
        const seen = new Set<string>();

        page.on("response", async (response) => {
          const url = response.url();
          if (seen.has(url)) return;
          seen.add(url);
          const headers = response.headers();
          let bodySize = 0;
          const contentLength = headers["content-length"];
          if (contentLength) {
            bodySize = Number.parseInt(contentLength, 10) || 0;
          } else {
            try {
              bodySize = (await response.body()).length;
            } catch {
              bodySize = 0;
            }
          }
          totalBytes += bodySize + headerBytes(headers);
        });

        await page.goto(path, { waitUntil: "domcontentloaded", timeout: LOAD_TIMEOUT_MS });
        await page.waitForLoadState("networkidle", { timeout: LOAD_TIMEOUT_MS });

        expect(
          totalBytes,
          `Total transfer for ${path} was ${totalBytes} bytes (max ${MAX_PAYLOAD_BYTES})`
        ).toBeLessThan(MAX_PAYLOAD_BYTES);
      });

      test("no React hydration errors in console", async ({ page }) => {
        const hydrationErrors: string[] = [];
        page.on("console", (msg) => {
          if (msg.type() !== "error") return;
          const text = msg.text();
          if (HYDRATION_ERROR_RE.test(text)) hydrationErrors.push(text);
        });
        page.on("pageerror", (err) => {
          if (HYDRATION_ERROR_RE.test(err.message)) hydrationErrors.push(err.message);
        });

        await page.goto(path, { waitUntil: "networkidle", timeout: LOAD_TIMEOUT_MS });
        expect(hydrationErrors, `Hydration errors on ${path}`).toEqual([]);
      });

      test(`loads within ${LOAD_TIMEOUT_MS}ms (networkidle)`, async ({ page }) => {
        const start = Date.now();
        await page.goto(path, { waitUntil: "networkidle", timeout: LOAD_TIMEOUT_MS });
        const elapsed = Date.now() - start;
        expect(elapsed, `networkidle exceeded ${LOAD_TIMEOUT_MS}ms on ${path}`).toBeLessThanOrEqual(
          LOAD_TIMEOUT_MS
        );
      });

      test("SSR vs hydrated hero h1 edit distance ≤ 0.5% (optional advanced)", async ({
        page,
        request,
      }) => {
        const res = await request.get(path);
        const html = await res.text();
        const ssrHero = extractFirstH1Text(html);
        expect(ssrHero.length, "SSR hero h1 missing").toBeGreaterThan(10);

        await page.goto(path, { waitUntil: "domcontentloaded", timeout: LOAD_TIMEOUT_MS });
        const hydratedHero = (
          (await page.locator("#main-content h1").first().textContent()) ?? ""
        )
          .replace(/\s+/g, " ")
          .trim();

        const distance = levenshtein(ssrHero, hydratedHero);
        const maxDistance = Math.max(1, Math.floor(ssrHero.length * 0.005));
        expect(
          distance,
          `Hero h1 Levenshtein ${distance} > ${maxDistance} on ${path}\nSSR: ${ssrHero}\nHydrated: ${hydratedHero}`
        ).toBeLessThanOrEqual(maxDistance);
      });
    });
  }
});
