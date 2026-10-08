import { site, type Locale } from "@/lib/site";
import { getDictionary } from "@/data/locales";

export default function ProfileLinks({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const linkClass = "inline-flex min-h-11 items-center py-2 text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline";
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <a href={site.github} className={linkClass}>GitHub</a>
      <a href={site.linkedin} className={linkClass}>LinkedIn</a>
      <a href={site.cv} download className={linkClass}>{t.hero.cv} <span className="ml-1 text-xs">(PDF)</span></a>
    </div>
  );
}
