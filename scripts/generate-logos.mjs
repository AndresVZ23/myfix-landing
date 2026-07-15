/**
 * Genera derivados optimizados de los logos oficiales de MyFix.
 *
 * Entradas (originales del equipo, NO se modifican):
 *   public/assets/logo_fondo_blanco.PNG  — para fondos claros
 *   public/assets/logo_fondo_oscuro.png  — para fondos oscuros
 *
 * Salidas:
 *   public/assets/logo-on-light.png — recortado al contenido, usado por el header
 *   public/assets/logo-on-dark.png  — recortado al contenido, usado por el footer
 *   public/assets/og.png            — imagen Open Graph 1200×630 con el logo real
 *
 * Uso: node scripts/generate-logos.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(ROOT, "public", "assets");

const trim = (file) =>
  sharp(path.join(ASSETS, file))
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
    .png({ compressionLevel: 9 });

// 1. Derivados recortados (el original "oscuro" trae mucho lienzo vacío).
const light = await trim("logo_fondo_blanco.PNG").toFile(
  path.join(ASSETS, "logo-on-light.png"),
);
const dark = await trim("logo_fondo_oscuro.png").toFile(
  path.join(ASSETS, "logo-on-dark.png"),
);
console.log(`✓ logo-on-light.png ${light.width}×${light.height}`);
console.log(`✓ logo-on-dark.png ${dark.width}×${dark.height}`);

// 2. Open Graph: logo real sobre fondo ink con resplandor de marca.
const OG_W = 1200;
const OG_H = 630;
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.65">
      <stop offset="0" stop-color="#6D4AFF" stop-opacity="0.35"/>
      <stop offset="0.6" stop-color="#D65AC3" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#0B0425" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="#0B0425"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#glow)"/>
</svg>`);

const logoWidth = 760;
const logoResized = await sharp(path.join(ASSETS, "logo-on-dark.png"))
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
  .resize({ width: logoWidth })
  .toBuffer({ resolveWithObject: true });

await sharp(background)
  .composite([
    {
      input: logoResized.data,
      left: Math.round((OG_W - logoResized.info.width) / 2),
      top: Math.round((OG_H - logoResized.info.height) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(ASSETS, "og.png"));
console.log("✓ og.png regenerado con el logo real");
