import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { news, services } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

const staticPaths = ["", "/services", "/booking", "/news", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      const url = `${SITE_URL}/${locale}${path}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
          ),
        },
      });
    }
  }

  for (const service of services) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}/services/${service.slug}`]),
          ),
        },
      });
    }
  }

  for (const post of news) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}/news/${post.slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
