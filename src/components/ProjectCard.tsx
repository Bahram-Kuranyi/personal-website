import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectPreview from "@/components/ProjectPreview";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 transition duration-500 hover:-translate-y-1 hover:border-white/20">
        <div className="aspect-[16/10] overflow-hidden">
          <ProjectPreview type={project.previewType} />
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
