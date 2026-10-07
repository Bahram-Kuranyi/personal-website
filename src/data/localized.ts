import { projects, type Project } from "./projects";
import { experiences, type Experience } from "./experience";
import type { Locale } from "@/lib/site";
import { caseStudies } from "./caseStudies";

const germanProjects: Record<(typeof projects)[number]["slug"], Pick<Project, "category" | "description" | "tech">> = {
  "personal-website": {
    category: "Entwicklung · Design",
    description: "Ein zweisprachiges Portfolio mit wiederverwendbaren React-Komponenten und einem individuellen, scrollreaktiven visuellen System.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  "freelance-web-archive": {
    category: "Webentwicklung · Kundenprojekte",
    description: "Ausgewählte Websites und digitale Erlebnisse aus früheren freiberuflichen Projekten.",
    tech: ["Web", "UI", "Kundenprojekte"],
  },
};

const germanExperience: Record<(typeof experiences)[number]["company"], Pick<Experience, "role" | "location" | "description" | "technologies">> = {
  Luxoft: {
    role: "Software Engineer", location: "Turin, Italien",
    description: "Entwicklung moderner Webanwendungen, wiederverwendbarer Oberflächen, APIs und produktiver Funktionen für Frontend- und Backend-Systeme.",
    technologies: ["React", "TypeScript", "Node.js", "Docker", "REST APIs"],
  },
  "Kanoon Farhangi Amoozesh": {
    role: "Front-End Engineer", location: "Teheran, Iran",
    description: "Entwicklung datengetriebener Oberflächen, Dashboards und Berichtsfunktionen für umfangreiche Bildungsplattformen.",
    technologies: ["React", "TypeScript", "JavaScript", "Datenvisualisierung"],
  },
  "Self-Employed": {
    role: "Webentwickler", location: "Remote",
    description: "Konzeption, Gestaltung und Umsetzung von Websites und digitalen Erlebnissen für Kunden.",
    technologies: ["Webentwicklung", "WordPress", "Frontend", "UI"],
  },
};

export function getProjects(locale: Locale): Project[] {
  return projects.map((project) => ({
    ...project,
    ...(locale === "de" ? germanProjects[project.slug] : {}),
    caseStudy: caseStudies[locale][project.slug],
  }));
}

export function getExperiences(locale: Locale): Experience[] {
  return experiences.map((experience) => locale === "de" ? {
    ...experience, ...germanExperience[experience.company],
    company: experience.company === "Self-Employed" ? "Selbstständig" : experience.company,
  } : experience);
}
