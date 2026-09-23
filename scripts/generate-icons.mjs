import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brand = join(root, "public", "assets", "brand");
const img = join(root, "public", "assets", "img");
mkdirSync(img, { recursive: true });

const symbol = join(brand, "13thpencil-symbol-graphite.svg");
const ogSource = join(img, "og-image.svg");

async function png(from, to, size, background) {
  await sharp(from, { density: 320 })
    .resize(size, size, { fit: "contain", background })
    .png()
    .toFile(to);
  console.log("wrote", to);
}

const paper = { r: 237, g: 229, b: 214, alpha: 1 };

await png(symbol, join(brand, "favicon-32.png"), 32, paper);
await png(symbol, join(brand, "apple-touch-icon.png"), 180, paper);
await png(symbol, join(brand, "icon-512.png"), 512, paper);
await sharp(ogSource).resize(1200, 630, { fit: "cover" }).png().toFile(join(img, "og-image.png"));
console.log("wrote", join(img, "og-image.png"));
