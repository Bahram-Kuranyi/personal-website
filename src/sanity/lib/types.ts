import type { CaseStudySection } from "@/data/projects";
import type { Locale } from "@/lib/site";

export type Localized<T> = Partial<Record<Locale, T>>;
export type RawSection = { body?: string; items?: string[] };
export type RawProject = {
  _id: string; title: string; slug: string; featured?: boolean;
  category?: Localized<string>; description?: Localized<string>; tech?: Localized<string[]>;
  visualVariant?: string; previewType?: string; sourceUrl?: string; liveUrl?: string;
  image?: { url?: string; alt?: Localized<string> };
  assets?: { url: string; filename: string }[];
} & Partial<Record<CaseStudySection["id"], Localized<RawSection>>>;
export type RawExperience = {
  company?: Localized<string>; role?: Localized<string>; period?: string;
  location?: Localized<string>; description?: Localized<string>; technologies?: Localized<string[]>;
};
export type RawSettings = {
  name: string; title?: Localized<string>; location?: Localized<string>; heroLabel?: Localized<string>;
  heroText?: Localized<string>; aboutLead?: Localized<string>; aboutAccent?: Localized<string>; about?: Localized<string>;
  contactLead?: Localized<string>; contactAccent?: Localized<string>; contactText?: Localized<string>;
  github?: string; linkedin?: string; email?: string;
  focusLabel?: Localized<string>; focusEyebrow?: Localized<string>; focusHeadline?: Localized<string>; focusSecondary?: Localized<string>;
  focusProject?: { slug: string; title: string } | null;
  youtubeChannelId?: string; youtubeChannelUrl?: string;
};
export type RawFeaturedMedia = {
  enabled?: boolean; mode?: "manual" | "latestYouTube"; videoUrl?: string;
  title?: Localized<string>; description?: Localized<string>; thumbnail?: string; date?: string;
};
export type Focus = { label: string; eyebrow: string; headline: string; secondary: string; project?: { slug: string; title: string } };
