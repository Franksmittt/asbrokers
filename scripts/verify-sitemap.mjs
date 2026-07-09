#!/usr/bin/env node
/**
 * Live sitemap verification — run: npm run sitemap:verify
 * Optional: SITEMAP_ORIGIN=https://www.asbrokers.co.za
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ORIGIN = (process.env.SITEMAP_ORIGIN ?? "https://www.asbrokers.co.za").replace(/\/$/, "");

const FORBIDDEN_PREFIXES = [
  "/crm",
  "/portal",
  "/studio",
  "/auth",
  "/login",
  "/internal",
  "/embed",
  "/api",
];

const FORBIDDEN_EXACT = new Set(["/sales-funnel-mockup", "/team"]);

const RETIRED_REDIRECTS = [
  "/retirement",
  "/everest-wealth",
  "/solutions",
  "/how-we-work",
  "/home4",
  "/home2",
  "/home3",
];

function extractStaticPaths() {
  const src = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
  return [...src.matchAll(/"(\/[^"?]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p.startsWith("/") && !p.includes("${"));
}

function parseSitemapXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { res, text: await res.text() };
}

async function main() {
  let failed = 0;
  const staticPaths = extractStaticPaths();

  console.log(`\n=== Sitemap verify (${ORIGIN}) ===\n`);

  const { res: smRes, text: smXml } = await fetchText(`${ORIGIN}/sitemap.xml`);
  if (!smRes.ok) {
    console.error(`FAIL: sitemap.xml HTTP ${smRes.status}`);
    process.exit(1);
  }
  if (!smXml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    console.error("FAIL: sitemap.xml missing xmlns");
    failed++;
  }

  const urls = parseSitemapXml(smXml);
  const paths = urls.map((u) => {
    try {
      return new URL(u).pathname;
    } catch {
      return u;
    }
  });

  console.log(`URLs in live sitemap: ${urls.length}`);

  if (new Set(urls).size !== urls.length) {
    console.error("FAIL: duplicate <loc> entries in sitemap");
    failed++;
  } else {
    console.log("PASS: no duplicate URLs");
  }

  for (const url of urls) {
    if (!url.startsWith(`${ORIGIN}/`) && url !== `${ORIGIN}/`) {
      console.error(`FAIL: non-canonical origin in sitemap: ${url}`);
      failed++;
    }
    if (url.includes("?")) {
      console.error(`FAIL: query string in sitemap URL (use canonical path): ${url}`);
      failed++;
    }
  }
  if (!failed) console.log("PASS: all URLs use https://www.asbrokers.co.za canonical origin");

  for (const path of staticPaths) {
    const expected = path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
    if (!urls.includes(expected)) {
      console.error(`FAIL: missing static path in sitemap: ${path}`);
      failed++;
    }
  }
  if (!failed) console.log(`PASS: all ${staticPaths.length} STATIC_PATHS present`);

  for (const path of paths) {
    if (FORBIDDEN_EXACT.has(path) || FORBIDDEN_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) {
      console.error(`FAIL: private route in sitemap: ${path}`);
      failed++;
    }
    if (RETIRED_REDIRECTS.includes(path)) {
      console.error(`FAIL: retired redirect URL in sitemap: ${path}`);
      failed++;
    }
  }
  if (!failed) console.log("PASS: no private or retired redirect URLs");

  const { text: insightsHtml } = await fetchText(`${ORIGIN}/insights`);
  const insightSlugs = [
    ...new Set([...insightsHtml.matchAll(/href="\/insights\/([^"?/]+)"/g)].map((m) => m[1])),
  ];

  for (const slug of insightSlugs) {
    const expected = `${ORIGIN}/insights/${slug}`;
    if (!urls.includes(expected)) {
      console.error(`FAIL: published insight missing from sitemap: /insights/${slug}`);
      failed++;
    }
  }
  if (insightSlugs.length === 0) {
    console.log("INFO: no dynamic insight slugs detected on /insights hub");
  } else if (!failed) {
    console.log(`PASS: ${insightSlugs.length} insight article(s) listed in sitemap`);
  }

  const sample = urls.slice(0, 12);
  for (const url of sample) {
    const head = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (head.status >= 400) {
      console.error(`FAIL: sitemap URL returns ${head.status}: ${url}`);
      failed++;
    }
  }
  console.log(`PASS: spot-checked ${sample.length} sitemap URLs (2xx)`);

  const { text: robots } = await fetchText(`${ORIGIN}/robots.txt`);
  if (!robots.includes(`${ORIGIN}/sitemap.xml`)) {
    console.error("FAIL: robots.txt missing sitemap declaration");
    failed++;
  } else {
    console.log("PASS: robots.txt advertises sitemap");
  }

  if (failed) {
    console.error(`\n${failed} sitemap check(s) failed.`);
    process.exit(1);
  }
  console.log("\nSitemap verification passed.");
  console.log(`\nSubmit in GSC: ${ORIGIN}/sitemap.xml`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
