import { readFileSync } from "node:fs";
import path from "node:path";

const ASSET_DIR = path.join(process.cwd(), "public", "assets");

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const dataUriCache = new Map<string, string>();

export function getAssetDataUri(filename: string): string {
  const cached = dataUriCache.get(filename);
  if (cached) return cached;

  const ext = path.extname(filename);
  const mime = MIME_TYPES[ext];
  if (!mime) {
    throw new Error(`Unsupported asset type: ${filename}`);
  }

  const filePath = path.join(ASSET_DIR, filename);
  const base64 = readFileSync(filePath).toString("base64");
  const dataUri = `data:${mime};base64,${base64}`;

  dataUriCache.set(filename, dataUri);
  return dataUri;
}
