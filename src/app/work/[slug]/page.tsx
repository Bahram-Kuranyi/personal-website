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

  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

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
      </article>
    </main>
  );
}
