import Link from "next/link";
import WorkConstellation from "@/components/WorkConstellation";

import { getProjects } from "@/data/localized";
import { getDictionary } from "@/data/locales";
import { requireLocale } from "@/lib/locale";
import { routes } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const t = getDictionary(locale);
  const projects = getProjects(locale);
  return (
    <main className="relative isolate min-h-screen bg-black text-white">
      <WorkConstellation />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <Link
          href={routes.home(locale)}
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← Bahram Kuranyi
        </Link>

        <LanguageSwitcher locale={locale} path="/work" />
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-20 md:px-12 lg:px-16">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          {t.work.portfolio}
        </p>

        <h1 className="mt-6 max-w-4xl text-6xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
          {t.work.line1}
          <br />
          {t.work.line2}
        </h1>

        <div className="mt-28 space-y-32">
          {projects.map((project) => (
            <article
              id={project.slug}
              key={project.title}
              className="scroll-mt-20"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                {project.category}
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
                <Link href={routes.project(locale, project.slug)} className="transition hover:text-zinc-300">{project.title}</Link>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                {project.description}
              </p>

              <Link href={routes.project(locale, project.slug)} aria-label={`${t.work.project}: ${project.title}`}
                className="mt-10 block aspect-[16/8] rounded-[2rem] border border-white/10 focus-visible:outline focus-visible:outline-2"
                style={{ background: project.gradient }} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
