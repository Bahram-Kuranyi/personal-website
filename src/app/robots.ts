import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexable ? { userAgent: "*", allow: "/", disallow: "/studio/" } : { userAgent: "*", disallow: "/" },
    ...(isIndexable ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
