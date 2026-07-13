/**
 * One-shot: resize + recompress public marketing images for Lighthouse.
 * Photos as JPEG (PNG giants → .jpg + delete .png). Run: npx tsx scripts/optimize-public-images.ts
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images");
/** Max master width — ~2× mobile card / enough for full-bleed hero AVIF variants. */
const MAX_W = 1600;
const JPEG_QUALITY = 78;
const MIN_BYTES = 80 * 1024;

const convertedPngToJpg: string[] = [];

async function optimizeFile(file: string): Promise<void> {
  const abs = path.join(DIR, file);
  const before = fs.statSync(abs).size;
  if (before < MIN_BYTES) return;

  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const img = sharp(abs).rotate();
  const meta = await img.metadata();
  const width = meta.width ?? 0;
  const pipeline =
    width > MAX_W ? img.resize({ width: MAX_W, withoutEnlargement: true }) : img;

  if (ext === ".png") {
    const out = path.join(DIR, `${base}.jpg`);
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(out);
    const after = fs.statSync(out).size;
    fs.unlinkSync(abs);
    convertedPngToJpg.push(base);
    console.log(
      `PNG→JPG ${file} → ${base}.jpg  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`
    );
    return;
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    const tmp = path.join(DIR, `${base}.__opt__.jpg`);
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
    const after = fs.statSync(tmp).size;
    if (after < before * 0.98) {
      fs.renameSync(tmp, abs);
      console.log(
        `JPG  ${file}  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`
      );
    } else {
      fs.unlinkSync(tmp);
      console.log(`JPG  ${file}  skipped (no gain)`);
    }
    return;
  }

  if (ext === ".webp") {
    const tmp = path.join(DIR, `${base}.__opt__.webp`);
    await pipeline.webp({ quality: 78 }).toFile(tmp);
    const after = fs.statSync(tmp).size;
    if (after < before * 0.98) {
      fs.renameSync(tmp, abs);
      console.log(
        `WEBP ${file}  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`
      );
    } else {
      fs.unlinkSync(tmp);
    }
  }
}

function rewritePngRefs(): void {
  if (!convertedPngToJpg.length) return;
  const roots = [
    "app",
    "components",
    "lib",
    "data",
    "scripts",
    "docs",
  ];
  const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt", ".mjs", ".cjs"]);

  function walk(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const out: string[] = [];
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name === "node_modules" || ent.name === ".next" || ent.name === ".git") continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) out.push(...walk(p));
      else if (exts.has(path.extname(ent.name).toLowerCase())) out.push(p);
    }
    return out;
  }

  const files = roots.flatMap(walk);
  let hits = 0;
  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    let changed = false;
    for (const base of convertedPngToJpg) {
      const from = `${base}.png`;
      const to = `${base}.jpg`;
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, text);
      hits += 1;
      console.log(`refs → ${path.relative(process.cwd(), file)}`);
    }
  }
  console.log(`Updated ${hits} files for PNG→JPG renames (${convertedPngToJpg.length} assets).`);
}

async function main() {
  const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  for (const f of files.sort()) {
    await optimizeFile(f);
  }
  rewritePngRefs();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
