export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const isLocale = (value: string): value is Locale => locales.some((locale) => locale === value);

export const routes = {
  home: (locale: Locale) => `/${locale}`,
  work: (locale: Locale) => `/${locale}/work`,
  project: (locale: Locale, slug: string) => `/${locale}/work/${slug}`,
};

export const navigation = ["work", "about", "contact"] as const;
