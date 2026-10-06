import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectPreview from "@/components/ProjectPreview";
import ProjectVisualScene from "@/components/ProjectVisualScene";
import { projects } from "@/data/projects";
import { getProjects } from "@/data/localized";
import { getDictionary } from "@/data/locales";
import { requireLocale } from "@/lib/locale";
import { routes, site } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { pageMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug, locale: code } = await params;
  const locale = requireLocale(code);
  const project = getProjects(locale).find((project) => project.slug === slug);
  if (!project) notFound();
  return pageMetadata(locale, `/work/${project.slug}`, `${project.title} — ${site.name}`, project.description);
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale: code } = await params;
  const locale = requireLocale(code);
  const t = getDictionary(locale);
  const projects = getProjects(locale);

  const projectIndex = projects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="relative isolate min-h-screen bg-black text-white">
      <ProjectVisualScene variant={project.visualVariant} />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <Link
          href={routes.work(locale)}
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← {t.detail.back}
        </Link>

        <LanguageSwitcher locale={locale} path={`/work/${project.slug}`} />
      </header>

      <article className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-20 md:px-12 lg:px-16">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          {project.category}
        </p>

        <h1 className="mt-6 max-w-5xl text-6xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
          {project.title}
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
          {project.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-20 overflow-hidden rounded-[2rem] border border-white/10">
          <ProjectPreview type={project.previewType} locale={locale} />
        </div>
        <div className="mt-24 flex flex-col justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              {t.detail.next}
            </p>

            <Link
              href={routes.project(locale, nextProject.slug)}
              className="mt-3 block text-3xl font-medium tracking-tight transition hover:text-zinc-400 md:text-4xl"
            >
              {nextProject.title} →
            </Link>
          </div>

          <Link
            href={routes.work(locale)}
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            {t.work.all}
          </Link>
        </div>
      </article>
    </main>
  );
}
