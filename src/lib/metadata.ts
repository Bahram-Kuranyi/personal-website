import type { Metadata } from "next";
import { isIndexable, locales, site, siteUrl, type Locale } from "./site";

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = new URL(`/${locale}${path}`, siteUrl).href;
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((language) => [language, new URL(`/${language}${path}`, siteUrl).href])),
        "x-default": new URL(`/en${path}`, siteUrl).href,
      },
    },
    robots: { index: isIndexable, follow: isIndexable },
    openGraph: {
      type: "website", title, description, url, siteName: site.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
    },
  };
}
