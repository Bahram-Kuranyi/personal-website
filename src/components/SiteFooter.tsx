import Link from "next/link";
import { site, routes, type Locale } from "@/lib/site";
import { getDictionary } from "@/data/locales";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileLinks from "./ProfileLinks";

export default function SiteFooter({ locale, path = "" }: { locale: Locale; path?: string }) {
  const t = getDictionary(locale);
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div>
          <Link href={routes.home(locale)} className="inline-flex min-h-11 items-center text-sm font-medium" aria-label={`${site.name} — ${t.home}`}>{site.name}</Link>
          <p className="text-sm text-zinc-400">{site.title} · {site.location[locale]}</p>
        </div>
        <nav aria-label={t.navigation.footer}><ProfileLinks locale={locale} /></nav>
        <LanguageSwitcher locale={locale} path={path} />
      </div>
    </footer>
  );
}
