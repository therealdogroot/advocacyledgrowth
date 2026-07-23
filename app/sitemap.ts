import type { MetadataRoute } from "next";
import { getChapters } from "@/lib/content/chapters";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getChapters();
  const now = new Date("2026-07-01");

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/download`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/reference`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  for (const ch of chapters) {
    entries.push({
      url: `${SITE_URL}${ch.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${SITE_URL}${ch.mdHref}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
