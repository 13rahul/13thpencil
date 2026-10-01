import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about/our-story", priority: 0.8 },
  { path: "/about/why-13th-pencil", priority: 0.8 },
  { path: "/about/our-approach", priority: 0.8 },
  { path: "/capabilities/brand-and-strategy", priority: 0.8 },
  { path: "/start-a-project", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();
  return PATHS.map(({ path, priority }) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
