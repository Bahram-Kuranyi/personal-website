import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales, routes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [routes.home, routes.work, ...projects.map((project) => (locale: (typeof locales)[number]) => routes.project(locale, project.slug))];
  return pages.flatMap((path) => locales.map((locale) => ({
    url: new URL(path(locale), siteUrl).href,
    alternates: { languages: Object.fromEntries(locales.map((language) => [language, new URL(path(language), siteUrl).href])) },
  })));
}
