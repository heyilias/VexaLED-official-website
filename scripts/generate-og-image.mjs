/**
 * Generates the social share image (Open Graph + Twitter card) at 1200×630.
 *
 * Run:  node scripts/generate-og-image.mjs
 * Output: public/og-image.png
 *
 * Design:
 *  - Deep black background matching the site (#0a0a0f)
 *  - Two soft radial glows in the brand neon yellow (#ccff00) for depth
 *  - Subtle dot-grid texture for a "technical / engineered" feel
 *  - VEXALED wordmark, all-caps, letter-spaced (Syne-style geometric look)
 *  - Tagline: "Premium LED Display Technology"
 *  - Origin line: "Engineered in Foshan, Guangdong, China"
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const W = 1200;
const H = 630;
const OUT = path.join(process.cwd(), "public", "og-image.png");

// Build a small dot-grid pattern for the background texture.
const dots = [];
const step = 40;
for (let y = step; y < H; y += step) {
  for (let x = step; x < W; x += step) {
    dots.push(`<circle cx="${x}" cy="${y}" r="1" fill="#ffffff" opacity="0.05"/>`);
  }
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow1" cx="22%" cy="80%" r="55%">
      <stop offset="0%"  stop-color="#ccff00" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#ccff00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="20%" r="60%">
      <stop offset="0%"  stop-color="#ccff00" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ccff00" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#050507"/>
    </linearGradient>
  </defs>

  <!-- Base background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Dot grid texture -->
  ${dots.join("\n  ")}

  <!-- Soft brand glows -->
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- Thin neon accent line above the wordmark -->
  <rect x="100" y="232" width="64" height="2" fill="#ccff00"/>

  <!-- Eyebrow tagline -->
  <text x="100" y="220"
        font-family="Inter, -apple-system, system-ui, sans-serif"
        font-size="20"
        font-weight="500"
        letter-spacing="6"
        fill="#ccff00"
        opacity="0.9">
    PREMIUM LED DISPLAY TECHNOLOGY
  </text>

  <!-- Wordmark -->
  <text x="100" y="350"
        font-family="Inter, -apple-system, system-ui, sans-serif"
        font-size="124"
        font-weight="800"
        letter-spacing="6"
        fill="#ffffff">
    VEXALED
  </text>

  <!-- Tagline -->
  <text x="100" y="420"
        font-family="Inter, -apple-system, system-ui, sans-serif"
        font-size="34"
        font-weight="400"
        fill="#ffffff"
        opacity="0.78">
    Visual experiences, engineered to perform.
  </text>

  <!-- Origin line, bottom-left -->
  <text x="100" y="548"
        font-family="Inter, -apple-system, system-ui, sans-serif"
        font-size="18"
        font-weight="500"
        letter-spacing="3"
        fill="#ffffff"
        opacity="0.55">
    ENGINEERED IN FOSHAN, GUANGDONG · CHINA
  </text>

  <!-- URL, bottom-right -->
  <text x="${W - 100}" y="548" text-anchor="end"
        font-family="Inter, -apple-system, system-ui, sans-serif"
        font-size="18"
        font-weight="500"
        letter-spacing="3"
        fill="#ccff00"
        opacity="0.9">
    VEXALED.COM
  </text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, quality: 92 })
  .toFile(OUT);

const stats = fs.statSync(OUT);
console.log(`✓ Generated ${OUT}  ${(stats.size / 1024).toFixed(1)} KB  (${W}×${H})`);
