import fs from "node:fs";
import path from "node:path";

const docPath = path.resolve("scripts/new-calculators-doc-batch3.html");
const outDir = path.resolve("public/embed-calculators");

const html = fs.readFileSync(docPath, "utf8");

function decodeHtml(text) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractSectionSpans(sectionHtml) {
  const parts = [];
  const re = /<span class="c0">([\s\S]*?)<\/span>/g;
  let match;
  while ((match = re.exec(sectionHtml))) {
    const decoded = decodeHtml(match[1]);
    if (decoded.trim()) parts.push(decoded);
  }
  return parts.join("\n");
}

function normalizeCalculatorHtml(raw) {
  let out = raw.trim();

  // Drop accidental asset title lines pasted into body.
  out = out.replace(/^Asset \d{3}[^\n]*\n+/i, "");

  // Collapse excessive blank lines from doc export.
  out = out.replace(/\n{3,}/g, "\n\n");

  // Ensure style blocks are wrapped.
  if (out.includes("<style>") === false && out.match(/^#asb-[a-z0-9-]+\s*\{/m)) {
    const styleEnd = out.search(/\n\s*\n(?=<h2|<p class|<div class|<button|<section)/i);
    if (styleEnd > 0) {
      out = `<style>\n${out.slice(0, styleEnd).trim()}\n</style>\n\n${out.slice(styleEnd).trim()}`;
    }
  }

  if (out.includes("<style>") === false && out.match(/^\.asb-[a-z0-9-]+\s*\{/m)) {
    const styleEnd = out.search(/\n\s*\n(?=<\/style>|<script>|$)/i);
    const cssEnd = out.search(/\n\s*\n(?=<script>)/i);
    const cut = cssEnd > 0 ? cssEnd : out.length;
    const css = out.slice(0, cut).trim();
    const rest = out.slice(cut).trim();
    out = `<style>\n${css}\n</style>\n\n${rest}`;
  }

  // Move inline style block to top inside root div when exported after markup.
  const styleAfterMarkup = out.match(/^([\s\S]*?)<style>([\s\S]*?)<\/style>\s*([\s\S]*?<script>[\s\S]*)$/i);
  if (styleAfterMarkup) {
    const [, markup, css, scriptPart] = styleAfterMarkup;
    if (markup.trim() && !markup.includes("<style>")) {
      out = `<style>\n${css.trim()}\n</style>\n\n${markup.trim()}\n\n${scriptPart.trim()}`;
    }
  }

  return out.trim() + "\n";
}

const markers = [
  { file: "asset-013-everest-income-vs-growth.html", start: "Asset 013" },
  { file: "asset-014-living-annuity.html", start: "Asset 014" },
  { file: "asset-015-average-clause.html", start: "Asset 015" },
  { file: "asset-016-growth-comparison.html", start: "Asset 016" },
  { file: "asset-017-personal-goal.html", start: "Asset 017" },
];

for (let i = 0; i < markers.length; i++) {
  const { file, start } = markers[i];
  const startIdx = html.indexOf(start);
  const endIdx = i + 1 < markers.length ? html.indexOf(markers[i + 1].start) : html.length;
  if (startIdx < 0) throw new Error(`Missing marker: ${start}`);

  const section = html.slice(startIdx, endIdx);
  const raw = extractSectionSpans(section);
  const normalized = normalizeCalculatorHtml(raw);

  if (!normalized.includes("<script>")) {
    throw new Error(`Missing script block in ${file}`);
  }

  fs.writeFileSync(path.join(outDir, file), normalized, "utf8");
  console.log(`${file}: ${normalized.length} chars`);
}
