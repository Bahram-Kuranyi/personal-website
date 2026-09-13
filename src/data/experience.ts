export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    company: "Luxoft",
    role: "Software Engineer",
    period: "2023 — 2025",
    location: "Turin, Italy",
    description:
      "Built modern web applications, reusable interfaces, APIs and production features across frontend and backend systems.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "REST APIs",
    ],
  },

  {
    company: "Kanoon Farhangi Amoozesh",
    role: "Front-End Engineer",
    period: "2018 — 2020",
    location: "Tehran, Iran",
    description:
      "Developed data-driven interfaces, dashboards and reporting experiences for large-scale educational products.",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Data Visualization",
    ],
  },

  {
    company: "Self-Employed",
    role: "Web Developer",
    period: "2017 — 2018",
    location: "Remote",
    description:
      "Designed and delivered websites and digital experiences for clients, from concept through implementation.",
    technologies: [
      "Web Development",
      "WordPress",
      "Frontend",
      "UI",
    ],
  },
];