/**
 * One-shot brand-casing normalizer:
 *   - "VexaLED" / "VexaLed" → "VEXALED"   (visible brand text)
 *   - "© 2025 VexaLed" → "© 2026 VEXALED" (founding year)
 *
 * Skips:
 *   - WhyChooseVexaLed.tsx — that's a JSX/React component name (code identifier),
 *     not user-facing brand text. We don't want to rename the function.
 *   - Index.tsx import + JSX usage of <WhyChooseVexaLed /> — same reason. The
 *     simple search-and-replace below would break those, so we explicitly
 *     un-replace the component name afterward.
 *
 * Run:  node scripts/normalize-brand.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";

const ROOT = path.join(process.cwd(), "src");
const files = globSync("**/*.{ts,tsx}", { cwd: ROOT, absolute: true });

// Files where "VexaLed" is a code identifier — never touch.
const PRESERVE_FILES = [
  /WhyChooseVexaLed\.tsx$/,
];

let totalFiles = 0;
let totalReplacements = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;

  const isPreserveFile = PRESERVE_FILES.some((re) => re.test(file));
  if (isPreserveFile) continue;

  // Replace brand text. /g for all occurrences.
  updated = updated.replace(/VexaLED/g, "VEXALED");
  updated = updated.replace(/VexaLed/g, "VEXALED");

  // Re-protect the component name when it appears in import / JSX usage.
  // After the blanket replace above, "WhyChooseVEXALED" would be wrong — we need
  // it back to "WhyChooseVexaLed" because that's the actual identifier.
  updated = updated.replace(/WhyChooseVEXALED/g, "WhyChooseVexaLed");

  // Founding year correction: brand was launched 2026, not 2025.
  updated = updated.replace(/©\s*2025\s*VEXALED/g, "© 2026 VEXALED");
  updated = updated.replace(/©\s*2025/g, "© 2026"); // catches localized variants

  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    const changes =
      (original.match(/VexaLED|VexaLed/g)?.length ?? 0) -
      (updated.match(/VexaLED|VexaLed/g)?.length ?? 0);
    totalFiles++;
    totalReplacements += changes;
    console.log(`  ✓ ${path.relative(process.cwd(), file)}  (${changes} replacement${changes === 1 ? "" : "s"})`);
  }
}

console.log(`\nNormalized ${totalReplacements} brand-casing occurrences across ${totalFiles} files.`);
