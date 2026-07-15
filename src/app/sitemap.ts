import type { MetadataRoute } from "next";
import { secteurs, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-15");
  const staticPaths = ["", "/soumission", "/secteurs", "/a-propos", "/contact"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const s of services) {
    entries.push({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const v of secteurs) {
    entries.push({
      url: `${site.url}/secteurs/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
