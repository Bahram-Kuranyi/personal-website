import Image from "next/image";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/site";
import ProjectPreview from "./ProjectPreview";

export default function ProjectMedia({ project, locale }: { project: Project; locale: Locale }) {
  if (!project.image) return <ProjectPreview type={project.previewType} locale={locale} />;
  return <Image src={project.image.url} alt={project.image.alt} width={1440} height={900}
    sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" />;
}
