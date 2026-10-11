import type { Locale } from "@/lib/site";
import { assetUrl, text, webUrl } from "./normalize";
import type { RawFeaturedMedia } from "./types";

export type FeaturedMedia = { url: string; title: string; description: string; thumbnail?: string; date?: string };

// Future automatic YouTube fetching belongs in the server data layer. Until then,
// both supported modes resolve verified manual content, or return null.
export function resolveFeaturedMedia(raw: RawFeaturedMedia | null, locale: Locale): FeaturedMedia | null {
  if (!raw?.enabled || !["manual", "latestYouTube"].includes(raw.mode || "")) return null;
  const url = webUrl(raw.videoUrl);
  const title = text(raw.title, locale);
  if (!url || !title) return null;
  const date = raw.date && /^\d{4}-\d{2}-\d{2}$/.test(raw.date) && !Number.isNaN(Date.parse(raw.date)) ? raw.date : undefined;
  return { url, title, description: text(raw.description, locale), thumbnail: assetUrl(raw.thumbnail), date };
}
