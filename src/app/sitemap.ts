import type { MetadataRoute } from "next";
import { getProjects } from "@/sanity/lib/content";
import { locales, routes } from "@/lib/site";
import { siteUrl } from "@/lib/site-origin";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("en");
  const pages = [routes.home, routes.work, ...projects.map((project) => (locale: (typeof locales)[number]) => routes.project(locale, project.slug))];
  return pages.flatMap((path) => locales.map((locale) => ({
    url: new URL(path(locale), siteUrl).href,
    alternates: { languages: Object.fromEntries(locales.map((language) => [language, new URL(path(language), siteUrl).href])) },
  })));
}
