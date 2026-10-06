export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const isLocale = (value: string): value is Locale => locales.some((locale) => locale === value);

export const site = {
  name: "Bahram Kuranyi",
  cv: "/Bahram-Kuranyi-CV.pdf",
  email: "Bahramkuranyi@gmail.com",
  linkedin: "https://www.linkedin.com/in/bahramkuranyi/",
  github: "https://github.com/Bahram-Kuranyi",
} as const;

export const routes = {
  home: (locale: Locale) => `/${locale}`,
  work: (locale: Locale) => `/${locale}/work`,
  project: (locale: Locale, slug: string) => `/${locale}/work/${slug}`,
};

export const navigation = ["work", "about", "contact"] as const;

// Set SITE_URL before building for production. Local previews must not be indexed.
const configuredUrl = process.env.SITE_URL?.trim();
export const siteUrl = new URL(configuredUrl || "http://localhost:3000");
if (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
  throw new Error("SITE_URL must be an HTTP(S) origin without a path, query or credentials.");
}
export const isIndexable = Boolean(configuredUrl) && !["localhost", "127.0.0.1", "[::1]"].includes(siteUrl.hostname);
