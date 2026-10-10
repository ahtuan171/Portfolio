import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder — a stray package-lock.json in
  // the parent directory otherwise gets picked up, which can lead
  // Turbopack to resolve node_modules/build output from the wrong place.
  turbopack: {
    root: __dirname,
  },
  // The Projects and Journey index pages were folded into Home (v3).
  // Case studies stay at /projects/[slug].
  async redirects() {
    return [
      { source: "/projects", destination: "/#projects", permanent: false },
      { source: "/journey", destination: "/#journey", permanent: false },
    ];
  },
};

export default nextConfig;
