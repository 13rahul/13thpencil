import { siteUrl } from "@/lib/site";

const PATHS: { path: string; priority: string }[] = [
  { path: "/", priority: "1.0" },
  { path: "/about/our-story", priority: "0.8" },
  { path: "/about/why-13th-pencil", priority: "0.8" },
  { path: "/about/our-approach", priority: "0.8" },
  { path: "/capabilities/brand-and-strategy", priority: "0.8" },
  { path: "/start-a-project", priority: "0.8" },
];

export function buildSitemapXml() {
  const base = siteUrl();
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = PATHS.map(({ path, priority }) => {
    const loc = path === "/" ? `${base}/` : `${base}${path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function sitemapResponse() {
  return new Response(buildSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
