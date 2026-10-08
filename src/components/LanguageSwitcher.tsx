import Link from "next/link";
import { locales, type Locale } from "@/lib/site";
import { getDictionary } from "@/data/locales";

export default function LanguageSwitcher({ locale, path = "" }: { locale: Locale; path?: string }) {
  return (
    <nav aria-label={getDictionary(locale).language} className="flex shrink-0 gap-2 text-xs">
      {locales.map((language) => (
        <Link key={language} href={`/${language}${path}`} hrefLang={language} lang={language}
          aria-label={language === "en" ? "Switch to English" : "Zu Deutsch wechseln"}
          aria-current={language === locale ? "page" : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded transition hover:text-white ${language === locale ? "text-white" : "text-zinc-400"}`}>
          {language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
