import Image from "next/image";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/data/locales";
import type { FeaturedMedia } from "@/sanity/lib/featuredMedia";

export default function FeaturedContent({ media, locale }: { media: FeaturedMedia | null; locale: Locale }) {
  if (!media) return null;
  const copy = getDictionary(locale).featured;
  return (
    <section aria-labelledby="featured-content-title" className="mx-auto max-w-7xl px-6 pt-16 md:px-12 lg:px-16">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80">
        <div className={media.thumbnail ? "grid md:grid-cols-[1fr_1.15fr]" : ""}>
          {media.thumbnail && <div className="relative min-h-56 md:min-h-72">
            <Image src={media.thumbnail} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>}
          <div className="min-w-0 p-7 sm:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">{copy.label}</p>
            <h2 id="featured-content-title" className="mt-5 break-words text-3xl font-medium tracking-tight sm:text-4xl">{media.title}</h2>
            {media.description && <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">{media.description}</p>}
            {media.date && <time dateTime={media.date} className="mt-5 block text-xs text-zinc-500">{new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(media.date))}</time>}
            <a href={media.url} className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-sm text-zinc-200 transition hover:border-white/40 hover:text-white">
              <span aria-hidden="true">▷</span>{copy.watch}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
