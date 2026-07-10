// remove-bg.mjs — strips near-white background from figurine PNGs using sharp
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "public");
const tempDir = join(tmpdir(), "toonhub-bg-removal");

if (!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true });

const files = ["fig1.png", "fig2.png", "fig3.png", "fig4.png"];

// Threshold: pixels with min(R,G,B) above this are treated as background
const THRESHOLD = 235;
const FEATHER    = 25;

async function removeBg(filename) {
  const inputPath  = join(publicDir, filename);
  const tempOutput = join(tempDir, filename);

  const image = sharp(readFileSync(inputPath)).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Use minimum channel — catches warm white & cream tones
    const bright = Math.min(r, g, b);

    if (bright >= THRESHOLD) {
      pixels[i + 3] = 0;                                               // fully transparent
    } else if (bright >= THRESHOLD - FEATHER) {
      const alpha = Math.round(((THRESHOLD - bright) / FEATHER) * 255);
      pixels[i + 3] = Math.min(pixels[i + 3], alpha);                  // feathered edge
    }
  }

  // Write processed image to temp dir (outside OneDrive)
  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tempOutput);

  // Read back and write to public via Buffer (avoids OneDrive open lock)
  const finalBuf = readFileSync(tempOutput);
  writeFileSync(inputPath, finalBuf);

  console.log(`✅ ${filename} — ${width}×${height} bg removed`);
}

console.log("🎨 Removing backgrounds from figurine PNGs...\n");
for (const f of files) {
  await removeBg(f);
}
console.log("\n✨ Done! Clean transparent PNGs in /public/");
