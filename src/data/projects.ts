export type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  slug: string;
  gradient: string;
  previewType: "portfolio" | "freelance";
};

export const projects: Project[] = [
  {
    previewType: "portfolio",
    title: "Personal Website V2",
    slug: "personal-website",
    category: "Engineering · Design",
    description:
      "A bilingual, interaction-led portfolio designed and engineered from scratch.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    gradient:
      "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.75), transparent 35%), radial-gradient(circle at 75% 65%, rgba(14,165,233,0.55), transparent 35%), #09090b",
  },
  {
    previewType: "freelance",
    title: "Freelance Web Archive",
    slug: "freelance-web-archive",
    category: "Web Development · Client Work",
    description:
      "Selected websites and digital experiences from earlier freelance work.",
    tech: ["Web", "UI", "Client Work"],
    gradient:
      "radial-gradient(circle at 70% 25%, rgba(168,85,247,0.6), transparent 35%), radial-gradient(circle at 30% 75%, rgba(244,63,94,0.4), transparent 35%), #09090b",
  },
];