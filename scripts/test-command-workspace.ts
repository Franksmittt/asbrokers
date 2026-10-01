/**
 * Smoke tests for Command Workspace Phase 1:
 * insight quality / warm rewrite, Markdown→HTML, sanitizer dark-ban.
 *
 * Usage: npx tsx scripts/test-command-workspace.ts
 */

import assert from "node:assert/strict";

import {
  enforceWarmInsightHtml,
  findInsightQualityIssues,
  insightQualityGateMessage,
  prepareInsightHtmlForPublish,
} from "../lib/client-studio/insight-quality";
import {
  looksLikeMarkdownSource,
  markdownToWarmInsightHtml,
  normalizeStudioBodyInput,
} from "../lib/client-studio/markdown-body";
import { sanitizeInsightBody } from "../lib/client-studio/sanitize-body";

function section(title: string) {
  console.log(`\n→ ${title}`);
}

async function main() {
  section("Markdown detection + compile");
  const md = `# Retirement clarity\n\nKeep drawdown between **2.5%** and **17.5%**.\n\n- Liquidity warning\n- FAIS disclosure\n`;
  assert.equal(looksLikeMarkdownSource(md), true);
  assert.equal(looksLikeMarkdownSource('<section class="prose"><p>Hi</p></section>'), false);
  const mdHtml = markdownToWarmInsightHtml(md);
  assert.match(mdHtml, /<h1>Retirement clarity<\/h1>/);
  assert.match(mdHtml, /<strong>2\.5%<\/strong>/);
  assert.match(mdHtml, /<ul>/);
  assert.equal(normalizeStudioBodyInput(md).includes("<h1>"), true);
  console.log("  Markdown compile OK");

  section("Dark HTML is detected");
  const dark = `<section class="bg-black text-white"><p style="color:#fff;background:#0a0a0a">Night mode</p></section>`;
  const darkIssues = findInsightQualityIssues(dark);
  assert.ok(darkIssues.length > 0, "expected dark issues");
  console.log("  issues:", darkIssues.map((i) => i.code).join(", "));

  section("Warm rewrite + sanitize clears publish gate");
  const warmed = enforceWarmInsightHtml(dark);
  assert.doesNotMatch(warmed, /bg-black/);
  assert.doesNotMatch(warmed, /text-white/);
  const prepared = prepareInsightHtmlForPublish(dark);
  const sanitized = sanitizeInsightBody(prepared.html);
  const residual = findInsightQualityIssues(sanitized);
  assert.equal(residual.length, 0, `residual issues: ${JSON.stringify(residual)}`);
  assert.equal(insightQualityGateMessage(residual), null);
  assert.doesNotMatch(sanitized, /background\s*:\s*#0a0a0a/i);
  assert.doesNotMatch(sanitized, /color\s*:\s*#fff/i);
  console.log("  sanitized length:", sanitized.length);

  section("Brand ink text colour is allowed");
  const ink = `<p style="margin:1rem 0;color:#1D1D1F">Trusted advice</p>`;
  const inkPrepared = prepareInsightHtmlForPublish(ink);
  assert.equal(inkPrepared.issues.length, 0);
  const inkSanitized = sanitizeInsightBody(ink);
  // colour declarations are stripped; layout margin may remain
  assert.match(inkSanitized, /Trusted advice/);
  console.log("  ink OK");

  section("Warm sample publishable");
  const warmSample = `<section><h2>Paper & Ink</h2><p class="text-[#52525b]">Readable measure on #F7F6F3.</p></section>`;
  const warmGate = prepareInsightHtmlForPublish(warmSample);
  assert.equal(warmGate.issues.length, 0);
  assert.ok(sanitizeInsightBody(warmGate.html).includes("Paper"));
  console.log("  warm sample OK");

  console.log("\n✓ Command Workspace Phase 1 smoke passed");
}

main().catch((error) => {
  console.error("\n✗", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
