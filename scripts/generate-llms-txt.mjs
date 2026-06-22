/**
 * Phase 3 B2A compiler — writes public/llms.txt and public/llms-full.txt
 * Run: npm run b2a:compile
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { B2A_MANIFEST } from "./b2a-manifest.mjs";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const TOKEN_CEILING = 128_000;

/** BPE-like estimate (~4 chars per token for English prose). */
function estimateBpeTokens(text) {
  return Math.ceil(text.length / 4);
}

function absoluteUrl(path) {
  const origin = B2A_MANIFEST.origin.replace(/\/$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildLlmsTxt() {
  const lines = [
    `# ${B2A_MANIFEST.brand}`,
    "",
    `> ${B2A_MANIFEST.summary}`,
    "",
    "## Core Services",
    ...B2A_MANIFEST.llmsLinks.map(({ url, description }) => `- [${absoluteUrl(url)}]: ${description}`),
    "",
    "## Discovery",
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
    "## Full briefing",
    `- [${absoluteUrl("/llms-full.txt")}]: Extended markdown briefing for answer engines (token-capped).`,
    "",
    "## Crawler notes",
    "- Use public HTML, sitemap.xml, and these files as orientation only.",
    "- Calculator outputs are illustrative, not personalised advice.",
    "- Do not crawl /login, /crm, /studio, /internal, /portal, or /api routes.",
  ];
  return `${lines.join("\n")}\n`;
}

function sectionToMarkdown(section) {
  return [`## ${section.title}`, "", ...section.body.map((line) => `- ${line}`), ""].join("\n");
}

function buildLlmsFullTxt(sections) {
  const header = [
    `# ${B2A_MANIFEST.brand} — AI Search Briefing`,
    "",
    B2A_MANIFEST.summary,
    "",
    "## Key URLs",
    ...B2A_MANIFEST.llmsLinks.slice(0, 12).map(({ url, description }) => `- ${absoluteUrl(url)} — ${description}`),
    "",
    "## Discovery",
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");

  const body = sections.map(sectionToMarkdown).join("\n");
  return `${header}\n${body}`;
}

function trimToTokenCeiling(text, sections) {
  let current = text;
  let tokens = estimateBpeTokens(current);
  if (tokens <= TOKEN_CEILING) return { text: current, tokens, trimmed: [] };

  const trimmed = [];
  const optional = sections.filter((s) => !s.required);
  let kept = sections.filter((s) => s.required);

  for (const drop of optional) {
    trimmed.push(drop.id);
    kept = kept.filter((s) => s.id !== drop.id);
    current = buildLlmsFullTxt(kept);
    tokens = estimateBpeTokens(current);
    if (tokens <= TOKEN_CEILING) break;
  }

  return { text: current, tokens, trimmed };
}

function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true });

  const llmsTxt = buildLlmsTxt();
  writeFileSync(join(PUBLIC_DIR, "llms.txt"), llmsTxt, "utf8");

  const fullDraft = buildLlmsFullTxt(B2A_MANIFEST.fullSections);
  const { text: llmsFullTxt, tokens, trimmed } = trimToTokenCeiling(fullDraft, B2A_MANIFEST.fullSections);
  writeFileSync(join(PUBLIC_DIR, "llms-full.txt"), llmsFullTxt, "utf8");

  console.log(`Wrote public/llms.txt (${estimateBpeTokens(llmsTxt).toLocaleString()} est. tokens)`);
  console.log(`Wrote public/llms-full.txt (${tokens.toLocaleString()} est. tokens, ceiling ${TOKEN_CEILING.toLocaleString()})`);
  if (trimmed.length) {
    console.log(`Trimmed optional sections: ${trimmed.join(", ")}`);
  }
  if (tokens > TOKEN_CEILING) {
    console.error(`FAIL: llms-full.txt exceeds ${TOKEN_CEILING} token ceiling`);
    process.exit(1);
  }
  console.log("B2A compile OK.");
}

main();
