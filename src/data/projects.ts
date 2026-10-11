export type CaseStudySection = {
  id: "overview" | "role" | "challenge" | "approach" | "decisions" | "features" | "outcome";
  body?: string;
  items?: readonly string[];
};

export type Project = {
  title: string;
  category: string;
  description: string;
  tech: readonly string[];
  slug: string;
  gradient: string;
  previewType: "portfolio" | "freelance";
  visualVariant: "components" | "windows";
  caseStudy?: readonly CaseStudySection[];
  sourceUrl?: string;
  liveUrl?: string;
  image?: { url: string; alt: string };
  assets?: { url: string; filename: string }[];
};
