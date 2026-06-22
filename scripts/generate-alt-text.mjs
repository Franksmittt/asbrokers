/**
 * Phase 7 alt-text compiler — scans image assets, hashes files, optionally calls a VLM.
 * Run: npm run alt:compile
 *
 * Env (optional — skips VLM when unset):
 *   GOOGLE_GENERATIVE_AI_API_KEY  — Gemini Flash
 *   OPENROUTER_API_KEY            — OpenRouter vision model
 *   OLLAMA_BASE_URL               — local Ollama (default http://127.0.0.1:11434)
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { basename, extname, join, relative } from "node:path";

const ROOT = process.cwd();
const DICT_PATH = join(ROOT, "data", "image-metadata.json");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);
const SCAN_DIRS = (process.env.ALT_SCAN_DIRS ?? "public/images,public/assets")
  .split(",")
  .map((d) => d.trim())
  .filter(Boolean);

const SYSTEM_PROMPT =
  "Functional, concise alt text for screen readers and AI. Describe subject, context, text in image. No 'image of'. Max 125 chars.";

function readDictionary() {
  if (!existsSync(DICT_PATH)) {
    return { version: 1, updatedAt: new Date(0).toISOString(), entries: {} };
  }
  return JSON.parse(readFileSync(DICT_PATH, "utf8"));
}

function writeDictionary(dict) {
  mkdirSync(join(ROOT, "data"), { recursive: true });
  dict.updatedAt = new Date().toISOString();
  writeFileSync(DICT_PATH, `${JSON.stringify(dict, null, 2)}\n`, "utf8");
}

function sha256File(filePath) {
  const buf = readFileSync(filePath);
  return createHash("sha256").update(buf).digest("hex");
}

function publicPath(absPath) {
  const rel = relative(join(ROOT, "public"), absPath).replace(/\\/g, "/");
  return `/${rel.startsWith("images/") || rel.startsWith("assets/") ? rel : `images/${rel}`}`;
}

function collectImageFiles() {
  const files = [];
  for (const dir of SCAN_DIRS) {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) continue;
    walk(abs, files);
  }
  return files;
}

function walk(dir, out) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (IMAGE_EXT.has(extname(entry).toLowerCase())) {
      out.push(full);
    }
  }
}

function clampAlt(text) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= 125) return clean;
  const slice = clean.slice(0, 125);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

function deriveAltFromFilename(filePath) {
  const name = basename(filePath, extname(filePath))
    .replace(/[_()]+/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\d+x\d+\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clampAlt(`${name || "AS Brokers site visual"} — AS Brokers CC`);
}

async function callGemini(base64, mimeType) {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return null;
  const model = process.env.ALT_GEMINI_MODEL ?? "gemini-2.0-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          {
            parts: [
              { text: "Write alt text for this asset." },
              { inlineData: { mimeType, data: base64 } },
            ],
          },
        ],
        generationConfig: { maxOutputTokens: 80, temperature: 0.2 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ? clampAlt(text) : null;
}

async function callOpenRouter(base64, mimeType) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;
  const model = process.env.ALT_OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001";
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Write alt text for this asset." },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
          ],
        },
      ],
      max_tokens: 80,
      temperature: 0.2,
    }),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text = json.choices?.[0]?.message?.content;
  return text ? clampAlt(text) : null;
}

async function callOllama(base64) {
  const base = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";
  const model = process.env.ALT_OLLAMA_MODEL ?? "llava";
  const res = await fetch(`${base}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: "Write alt text for this asset.",
          images: [base64],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text = json.message?.content;
  return text ? clampAlt(text) : null;
}

function mimeForExt(ext) {
  switch (ext.toLowerCase()) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".avif":
      return "image/avif";
    case ".gif":
      return "image/gif";
    default:
      return "image/jpeg";
  }
}

async function generateAlt(filePath) {
  const buf = readFileSync(filePath);
  const base64 = buf.toString("base64");
  const mime = mimeForExt(extname(filePath));
  const hasVlm =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    process.env.OLLAMA_BASE_URL;

  if (!hasVlm) return null;

  try {
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) return await callGemini(base64, mime);
    if (process.env.OPENROUTER_API_KEY) return await callOpenRouter(base64, mime);
    return await callOllama(base64);
  } catch (err) {
    console.warn(`VLM failed for ${filePath}:`, err.message ?? err);
    return null;
  }
}

async function main() {
  const dict = readDictionary();
  dict.entries ??= {};
  const files = collectImageFiles();
  let updated = 0;
  let skipped = 0;
  let manual = 0;

  const hasVlm =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    process.env.OLLAMA_BASE_URL;

  if (!hasVlm) {
    console.log("No VLM API key — updating hashes only; manual dictionary entries preserved.");
  }

  for (const filePath of files) {
    const key = publicPath(filePath);
    const hash = sha256File(filePath);
    const existing = dict.entries[key];
    if (existing?.hash === hash && existing.alt) {
      skipped += 1;
      continue;
    }

    let alt = existing?.alt;
    if (!alt || existing?.hash !== hash) {
      const generated = await generateAlt(filePath);
      if (generated) {
        alt = generated;
        updated += 1;
      } else if (alt) {
        manual += 1;
      } else {
        alt = deriveAltFromFilename(filePath);
        manual += 1;
        console.log(`Fallback alt for ${key}: ${alt}`);
      }
    }

    dict.entries[key] = { alt, hash };
  }

  writeDictionary(dict);
  console.log(
    `alt:compile done — ${files.length} files scanned, ${updated} VLM updates, ${manual} manual/fallback, ${skipped} unchanged.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
