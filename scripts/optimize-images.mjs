/**
 * Image optimization script for VEXALED.
 *
 * Scans src/assets/ and public/images/ for PNG / JPEG / JPG files larger
 * than 200 KB and generates a sibling .webp (and .avif for hero shots).
 * Originals are left untouched — components import the new .webp instead.
 *
 * Run:  node scripts/optimize-images.mjs
 * Idempotent: skips files that already have a sibling .webp newer than the source.
 */
import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";
import sharp from "sharp";

const ROOT = process.cwd();
const ROOTS = ["src/assets", "public/images"].map((p) => path.join(ROOT, p));
const SIZE_THRESHOLD = 200 * 1024;       // skip files <= 200 KB
const MAX_WIDTH = 2000;                  // cap longest edge (most images are decorative photos)
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 55;

// Higher-fidelity profiles for hero / product PNGs (transparency, sharper viewing)
const HIGH_FIDELITY = /\/(hero|poster|products\/led-screen|products\/puck-lights|products\/wash-light)\//i;

function fmtSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  return Math.round(bytes / 1024) + " KB";
}

function shouldSkip(srcPath, outPath) {
  if (!fs.existsSync(outPath)) return false;
  return fs.statSync(outPath).mtimeMs > fs.statSync(srcPath).mtimeMs;
}

async function convert(srcPath, format /* 'webp' | 'avif' */, quality) {
  const outPath = srcPath.replace(/\.(png|jpe?g)$/i, "." + format);
  if (shouldSkip(srcPath, outPath)) return { srcPath, outPath, skipped: true };

  const image = sharp(srcPath, { animated: false });
  const meta = await image.metadata();
  const needsResize = meta.width && meta.width > MAX_WIDTH;

  let pipeline = needsResize
    ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : image;

  if (format === "webp") pipeline = pipeline.webp({ quality, effort: 4 });
  else if (format === "avif") pipeline = pipeline.avif({ quality, effort: 4 });

  await pipeline.toFile(outPath);

  const before = fs.statSync(srcPath).size;
  const after = fs.statSync(outPath).size;
  return { srcPath, outPath, before, after, skipped: false };
}

async function main() {
  const files = [];
  for (const root of ROOTS) {
    if (!fs.existsSync(root)) continue;
    const matches = globSync("**/*.{png,jpg,jpeg,PNG,JPG,JPEG}", { cwd: root, absolute: true });
    for (const f of matches) {
      if (fs.statSync(f).size >= SIZE_THRESHOLD) files.push(f);
    }
  }

  console.log(`Found ${files.length} images > ${fmtSize(SIZE_THRESHOLD)}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const isHigh = HIGH_FIDELITY.test(file.replace(/\\/g, "/"));
    const quality = isHigh ? 85 : WEBP_QUALITY;

    try {
      const webp = await convert(file, "webp", quality);
      if (webp.skipped) {
        skipped++;
        console.log(`  ⏭  ${rel}  (webp up-to-date)`);
        continue;
      }
      totalBefore += webp.before;
      totalAfter += webp.after;
      converted++;
      const saved = Math.round((1 - webp.after / webp.before) * 100);
      console.log(
        `  ✓  ${rel}  ${fmtSize(webp.before)} → ${fmtSize(webp.after)}  (-${saved}%)`,
      );

      // Hero-grade assets also get an AVIF for top-tier LCP.
      if (isHigh && /\/hero\//i.test(file.replace(/\\/g, "/"))) {
        const avif = await convert(file, "avif", AVIF_QUALITY);
        if (!avif.skipped) {
          const savedA = Math.round((1 - avif.after / avif.before) * 100);
          console.log(`     +avif  ${fmtSize(avif.before)} → ${fmtSize(avif.after)}  (-${savedA}%)`);
        }
      }
    } catch (err) {
      console.error(`  ✗  ${rel}  ${err.message}`);
    }
  }

  console.log("\n────────────────────────────────────────");
  console.log(
    `Converted ${converted}, skipped ${skipped}.  ` +
      `Saved ${fmtSize(totalBefore - totalAfter)} ` +
      `(${fmtSize(totalBefore)} → ${fmtSize(totalAfter)}, ${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
