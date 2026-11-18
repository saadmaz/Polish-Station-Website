// Build-time script - regenerates public/sitemap.xml from the static route
// list. Runs automatically as part of `bun run build` (see package.json).

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const OUTPUT_PATH = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));
const BASE_URL = "https://www.polishstation.lk";

const STATIC_ROUTES: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/gallery", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/book", changefreq: "monthly", priority: "0.9" },
  { path: "/services/paint-correction", changefreq: "monthly", priority: "0.8" },
  { path: "/services/cut-and-polish", changefreq: "monthly", priority: "0.8" },
  { path: "/services/ceramic-coating", changefreq: "monthly", priority: "0.8" },
  { path: "/services/graphene-coating", changefreq: "monthly", priority: "0.8" },
  { path: "/services/interior-detailing", changefreq: "monthly", priority: "0.8" },
  { path: "/services/exterior-detailing", changefreq: "monthly", priority: "0.8" },
  { path: "/services/engine-bay-cleaning", changefreq: "monthly", priority: "0.8" },
  { path: "/services/headlight-restoration", changefreq: "monthly", priority: "0.8" },
];

function toUrlEntry(loc: string, changefreq: string, priority: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function main() {
  const entries = STATIC_ROUTES.map((r) =>
    toUrlEntry(`${BASE_URL}${r.path}`, r.changefreq, r.priority),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

  writeFileSync(OUTPUT_PATH, xml);
  console.log(`Wrote sitemap with ${STATIC_ROUTES.length} routes to ${OUTPUT_PATH}`);
}

main();
