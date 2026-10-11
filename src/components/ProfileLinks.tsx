import { getSiteSettings } from "@/sanity/lib/content";
import { type Locale } from "@/lib/site";
import { getDictionary } from "@/data/locales";

export default async function ProfileLinks({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const site = await getSiteSettings(locale);
  const linkClass = "inline-flex min-h-11 items-center py-2 text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline";
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {site.github && <a href={site.github} className={linkClass}>GitHub</a>}
      {site.linkedin && <a href={site.linkedin} className={linkClass}>LinkedIn</a>}
      <a href={site.cv} download className={linkClass}>{t.hero.cv} <span className="ml-1 text-xs">(PDF)</span></a>
    </div>
  );
}
