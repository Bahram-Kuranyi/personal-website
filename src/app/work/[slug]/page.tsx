import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectPreview from "@/components/ProjectPreview";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const projectIndex = projects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <Link
          href="/#work"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to work
        </Link>

        <span className="text-sm text-zinc-600">Project</span>
      </header>

      <article className="mx-auto max-w-7xl px-6 pb-32 pt-20 md:px-12 lg:px-16">
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
          <ProjectPreview type={project.previewType} />
        </div>
        <div className="mt-24 flex flex-col justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              Next project
            </p>

            <Link
              href={`/work/${nextProject.slug}`}
              className="mt-3 block text-3xl font-medium tracking-tight transition hover:text-zinc-400 md:text-4xl"
            >
              {nextProject.title} →
            </Link>
          </div>

          <Link
            href="/work"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            View all work
          </Link>
        </div>
      </article>
    </main>
  );
}
