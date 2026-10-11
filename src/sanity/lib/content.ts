import "server-only";
import { cache } from "react";
import type { Locale } from "@/lib/site";
import { client } from "./client";
import { cvQuery, experienceQuery, featuredMediaQuery, projectsQuery, settingsQuery } from "./queries";
import { assetUrl, experienceFromDocument, projectFromDocument, text, webUrl } from "./normalize";
import type { RawExperience, RawFeaturedMedia, RawProject, RawSettings } from "./types";
import { resolveFeaturedMedia } from "./featuredMedia";

export const fallbackCv = "/Bahram-Kuranyi-CV.pdf";
const options = { next: { revalidate: 60 }, cache: "force-cache" as const };

export const getCvUrl = cache(async () => {
  try {
    const cv = await client.fetch<{ url?: string; mimeType?: string } | null>(cvQuery, {}, options);
    const url = assetUrl(cv?.url);
    if (url && cv?.mimeType === "application/pdf") return `${url}?dl=Bahram-Kuranyi-CV.pdf`;
  } catch { console.warn("Sanity CV unavailable; serving the original public PDF."); }
  return fallbackCv;
});

export const getSiteSettings = cache(async (locale: Locale) => {
  const [raw, cv] = await Promise.all([client.fetch<RawSettings | null>(settingsQuery, {}, options), getCvUrl()]);
  if (!raw?.name) throw new Error("Publish Site Settings in /studio or run the initial Sanity seed before building the website.");
  return {
    name: raw.name, title: text(raw.title, locale), location: text(raw.location, locale),
    heroLabel: text(raw.heroLabel, locale), heroText: text(raw.heroText, locale),
    aboutLead: text(raw.aboutLead, locale), aboutAccent: text(raw.aboutAccent, locale), about: text(raw.about, locale),
    contactLead: text(raw.contactLead, locale), contactAccent: text(raw.contactAccent, locale), contactText: text(raw.contactText, locale),
    github: webUrl(raw.github), linkedin: webUrl(raw.linkedin), email: raw.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email) ? raw.email : undefined, cv,
    focus: { label: text(raw.focusLabel, locale), eyebrow: text(raw.focusEyebrow, locale), headline: text(raw.focusHeadline, locale),
      secondary: text(raw.focusSecondary, locale), project: raw.focusProject?.slug ? raw.focusProject : undefined },
  };
});

const getProjectDocuments = cache(async () => client.fetch<RawProject[]>(projectsQuery, {}, options));
export const getProjects = cache(async (locale: Locale) => (await getProjectDocuments()).map((project) => projectFromDocument(project, locale)));
export const getFeaturedProjects = cache(async (locale: Locale) => (await getProjectDocuments()).filter((project) => project.featured).map((project) => projectFromDocument(project, locale)));
export const getProject = cache(async (locale: Locale, slug: string) => (await getProjects(locale)).find((project) => project.slug === slug));
export const getExperiences = cache(async (locale: Locale) => (await client.fetch<RawExperience[]>(experienceQuery, {}, options)).map((experience) => experienceFromDocument(experience, locale)));

export const getFeaturedMedia = cache(async (locale: Locale) => {
  try {
    const raw = await client.fetch<RawFeaturedMedia | null>(featuredMediaQuery, {}, options);
    return resolveFeaturedMedia(raw, locale);
  } catch {
    console.warn("Featured Media unavailable; optional section omitted.");
    return null;
  }
});
