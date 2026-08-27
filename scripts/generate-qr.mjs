#!/usr/bin/env node
/**
 * Genera un QR imprimible en SVG (vectorial, para imprenta) y PNG (redes, Word, etc.).
 *
 * Uso:
 *   node scripts/generate-qr.mjs <url> [--name archivo] [--out carpeta] [--size 2048]
 *
 * Ejemplo:
 *   node scripts/generate-qr.mjs https://donate.stripe.com/xxxx --name donacion-presos-politicos
 *
 * Salida por defecto:  public/qr/<name>.svg  y  public/qr/<name>.png
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const args = process.argv.slice(2);
const flags = {};
const positionals = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) flags[args[i].slice(2)] = args[++i];
  else positionals.push(args[i]);
}

const url = positionals[0];
const name = flags.name ?? "donacion-presos-politicos";
const outDir = flags.out ?? "public/qr";
const size = Number(flags.size ?? 2048);

if (!url || !/^https?:\/\//.test(url)) {
  console.error(
    "Falta la URL.\n" +
      "Uso: node scripts/generate-qr.mjs https://donate.stripe.com/xxxx [--name archivo] [--out carpeta]"
  );
  process.exit(1);
}

// Nivel de corrección "Q" (25%): tolera manchas, dobleces y tinta corrida al imprimir.
const options = {
  errorCorrectionLevel: "Q",
  margin: 4,
  color: { dark: "#000000", light: "#FFFFFF" },
};

const outPath = path.resolve(outDir);
await mkdir(outPath, { recursive: true });

const svg = await QRCode.toString(url, { ...options, type: "svg" });
await writeFile(path.join(outPath, `${name}.svg`), svg, "utf8");

const png = await QRCode.toBuffer(url, { ...options, type: "png", width: size });
await writeFile(path.join(outPath, `${name}.png`), png);

console.log(`QR generado para: ${url}`);
console.log(`  ${path.join(outDir, `${name}.svg`)}  (vectorial, para imprenta)`);
console.log(`  ${path.join(outDir, `${name}.png`)}  (${size}px)`);
