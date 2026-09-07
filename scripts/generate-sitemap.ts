// Build-time script - regenerates public/sitemap.xml from the static route
// list plus every published blog post slug from Sanity. Runs automatically
// as part of `bun run build` (see package.json) so the sitemap never goes
// stale as posts are published; no manual step required.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

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
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/services/paint-correction", changefreq: "monthly", priority: "0.8" },
  { path: "/services/cut-and-polish", changefreq: "monthly", priority: "0.8" },
  { path: "/services/ceramic-coating", changefreq: "monthly", priority: "0.8" },
  { path: "/services/graphene-coating", changefreq: "monthly", priority: "0.8" },
  { path: "/services/interior-detailing", changefreq: "monthly", priority: "0.8" },
  { path: "/services/exterior-detailing", changefreq: "monthly", priority: "0.8" },
  { path: "/services/engine-bay-cleaning", changefreq: "monthly", priority: "0.8" },
  { path: "/services/headlight-restoration", changefreq: "monthly", priority: "0.8" },
];

// Mirrors the validation in src/lib/data/blog.ts - a slug typed by hand
// instead of generated (e.g. containing spaces) must never break the build.
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function getBlogSlugs(): Promise<string[]> {
  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  if (!projectId) return [];

  const client = createClient({
    projectId,
    dataset: process.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });

  const slugs: string[] = await client.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()].slug.current`,
  );
  return slugs.filter((slug) => VALID_SLUG.test(slug));
}

function toUrlEntry(loc: string, changefreq: string, priority: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function main() {
  const blogSlugs = await getBlogSlugs();

  const entries = [
    ...STATIC_ROUTES.map((r) => toUrlEntry(`${BASE_URL}${r.path}`, r.changefreq, r.priority)),
    ...blogSlugs.map((slug) => toUrlEntry(`${BASE_URL}/blog/${slug}`, "monthly", "0.6")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

  writeFileSync(OUTPUT_PATH, xml);
  console.log(
    `Wrote sitemap with ${STATIC_ROUTES.length} static routes + ${blogSlugs.length} blog posts to ${OUTPUT_PATH}`,
  );
}

main();
