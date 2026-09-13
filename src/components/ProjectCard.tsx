import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={project.href} className="group block">
      <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 transition duration-500 hover:-translate-y-1 hover:border-white/20">
        
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: project.gradient }}
          />

          <div className="absolute inset-6 flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl sm:inset-10">
            
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>

            <div className="space-y-3">
              <div className="h-2 w-2/3 rounded-full bg-white/20" />
              <div className="h-2 w-1/2 rounded-full bg-white/10" />
              <div className="h-2 w-3/4 rounded-full bg-white/10" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-white/40">
              Preview
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
            {project.category}
          </p>

          <h3 className="mt-4 text-2xl font-medium tracking-tight">
            {project.title}
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mt-8 text-sm text-white transition-transform duration-300 group-hover:translate-x-1">
            View project →
          </p>
        </div>
      </article>
    </Link>
  );
}