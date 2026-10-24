import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MAX_DIMENSION = 1920;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.jpe', '.png', '.webp', '.avif']);

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectImages(path)));
    else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) files.push(path);
  }
  return files;
}

async function optimizeImage(path) {
  const original = await readFile(path);
  const image = sharp(original, { failOn: 'none' }).rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: 'inside',
    withoutEnlargement: true,
  });
  const format = (await sharp(original).metadata()).format;
  if (format === 'jpeg') image.jpeg({ quality: 78, mozjpeg: true });
  else if (format === 'png') image.png({ compressionLevel: 9 });
  else if (format === 'webp') image.webp({ quality: 80 });
  else if (format === 'avif') image.avif({ quality: 60 });
  else return 0;
  const optimized = await image.toBuffer();
  if (optimized.length >= original.length) return 0;
  await writeFile(path, optimized);
  return original.length - optimized.length;
}

export default function imageOptimizer() {
  return {
    name: 'herrhausen-image-optimizer',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        await stat(outDir);
        let saved = 0;
        let touched = 0;
        for (const path of await collectImages(outDir)) {
          try {
            const delta = await optimizeImage(path);
            if (delta > 0) {
              touched += 1;
              saved += delta;
              logger.debug(`${relative(outDir, path)} (−${Math.round(delta / 1024)} KB)`);
            }
          } catch (error) {
            logger.warn(`Bild übersprungen: ${relative(outDir, path)} (${error.message})`);
          }
        }
        logger.info(`${touched} Bilder optimiert, ${Math.round(saved / 1024)} KB gespart.`);
      },
    },
  };
}