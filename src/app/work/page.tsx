import Link from "next/link";

import { projects } from "@/data/projects";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <Link
          href="/"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← Bahram Kuranyi
        </Link>

        <span className="text-sm text-zinc-600">Selected Work</span>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-32 pt-20 md:px-12 lg:px-16">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          Portfolio
        </p>

        <h1 className="mt-6 max-w-4xl text-6xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
          Work that
          <br />
          tells the story.
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
                {project.title}
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                {project.description}
              </p>

              <div
                className="mt-10 aspect-[16/8] rounded-[2rem] border border-white/10"
                style={{ background: project.gradient }}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
