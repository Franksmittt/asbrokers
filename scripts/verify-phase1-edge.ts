/**
 * Phase 1 verification — run: npx tsx scripts/verify-phase1-edge.ts
 */
import assert from "node:assert/strict";
import { normalizeRequestUrl } from "../lib/url-normalize";
import { isBlockedTrainingBot } from "../lib/crawler-policy";

// 1.1 Tracking param strip
{
  const r = normalizeRequestUrl(new URL("https://www.asbrokers.co.za/contact?utm_source=test&foo=bar"));
  assert.equal(r.action, "redirect");
  assert.equal(r.url.pathname, "/contact");
  assert.equal(r.url.search, "?foo=bar");
}

// 1.1 Trailing junk strip
{
  const r = normalizeRequestUrl(new URL("https://www.asbrokers.co.za/about."));
  assert.equal(r.action, "redirect");
  assert.equal(r.url.pathname, "/about");
}

// 1.1 Static /images/ untouched
{
  const r = normalizeRequestUrl(new URL("https://www.asbrokers.co.za/images/calculators-hub-16x9.jpg."));
  assert.equal(r.action, "next");
}

// 1.2 Crawl trap 410
{
  const r = normalizeRequestUrl(new URL("https://www.asbrokers.co.za/a/a/a/a/a"));
  assert.equal(r.action, "gone");
}

// 1.3 Bot policy
assert.equal(isBlockedTrainingBot("Mozilla/5.0 GPTBot/1.0"), true);
assert.equal(isBlockedTrainingBot("Mozilla/5.0 OAI-SearchBot/1.0"), false);
assert.equal(isBlockedTrainingBot("Mozilla/5.0 Googlebot/2.1"), false);

console.log("Phase 1 edge verification: all checks passed.");
