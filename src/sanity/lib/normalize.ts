import type { Locale } from "@/lib/site";
import type { CaseStudySection, Project } from "@/data/projects";
import type { Experience } from "@/data/experience";
import type { Localized, RawExperience, RawProject } from "./types";

export function text(value: Localized<string> | undefined, locale: Locale): string {
  return value?.[locale]?.trim() || value?.en?.trim() || "";
}
export function list(value: Localized<string[]> | undefined, locale: Locale): string[] {
  return [...new Set((value?.[locale] ?? value?.en ?? []).filter((item) => typeof item === "string" && item.trim()))];
}
export function webUrl(value: string | undefined): string | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    if (["https:", "http:"].includes(url.protocol) && !url.username && !url.password) return url.href;
  } catch { /* Optional invalid URLs are omitted. */ }
}
export function assetUrl(value: string | undefined): string | undefined {
  const url = webUrl(value);
  return url && new URL(url).hostname === "cdn.sanity.io" && url.startsWith("https:") ? url : undefined;
}
export function projectFromDocument(raw: RawProject, locale: Locale): Project {
  const sections: CaseStudySection["id"][] = ["overview", "role", "challenge", "approach", "decisions", "features", "outcome"];
  const visualVariant = raw.visualVariant === "windows" ? "windows" : "components";
  const image = assetUrl(raw.image?.url);
  return {
    title: raw.title, slug: raw.slug, category: text(raw.category, locale), description: text(raw.description, locale),
    tech: list(raw.tech, locale), visualVariant,
    previewType: raw.previewType === "freelance" ? "freelance" : "portfolio",
    gradient: visualVariant === "components"
      ? "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.75), transparent 35%), radial-gradient(circle at 75% 65%, rgba(14,165,233,0.55), transparent 35%), #09090b"
      : "radial-gradient(circle at 70% 25%, rgba(168,85,247,0.6), transparent 35%), radial-gradient(circle at 30% 75%, rgba(244,63,94,0.4), transparent 35%), #09090b",
    sourceUrl: webUrl(raw.sourceUrl), liveUrl: webUrl(raw.liveUrl),
    image: image ? { url: image, alt: text(raw.image?.alt, locale) || raw.title } : undefined,
    assets: (raw.assets ?? []).flatMap((asset) => {
      const url = assetUrl(asset.url);
      return url ? [{ url, filename: asset.filename || "Download" }] : [];
    }),
    caseStudy: sections.flatMap((id) => {
      const section = raw[id]?.[locale] ?? raw[id]?.en;
      const body = section?.body?.trim();
      const items = section?.items?.filter((item) => typeof item === "string" && item.trim());
      return body || items?.length ? [{ id, body, items }] : [];
    }),
  };
}
export function experienceFromDocument(raw: RawExperience, locale: Locale): Experience {
  return { company: text(raw.company, locale), role: text(raw.role, locale), period: raw.period || "",
    location: text(raw.location, locale), description: text(raw.description, locale), technologies: list(raw.technologies, locale) };
}
