import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/compare-live", "/fr/compare-live"],
    },
    sitemap: "https://www.healtharchive.ca/sitemap.xml",
  };
}
