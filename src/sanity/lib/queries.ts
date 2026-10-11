import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name, title, location, heroLabel, heroText, aboutLead, aboutAccent, about,
  contactLead, contactAccent, contactText, github, linkedin, email,
  focusLabel, focusEyebrow, focusHeadline, focusSecondary,
  "focusProject": focusProject->{title, "slug": slug.current}, youtubeChannelId, youtubeChannelUrl
}`);
export const cvQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0].cv.asset->{url, mimeType}`);
export const projectsQuery = defineQuery(`*[_type == "project" && defined(slug.current) && defined(title)] | order(sortOrder asc, title asc){
  _id, title, "slug": slug.current, featured, category, description, tech, visualVariant, previewType,
  sourceUrl, liveUrl, overview, role, challenge, approach, decisions, features, outcome,
  "image": image{alt, "url": asset->url}, "assets": assets[]{"url": asset->url, "filename": asset->originalFilename}
}`);
export const experienceQuery = defineQuery(`*[_type == "experience"] | order(sortOrder asc, _id asc){company, role, period, location, description, technologies}`);
export const featuredMediaQuery = defineQuery(`*[_type == "featuredMedia" && _id == "featuredMedia"][0]{
  enabled, mode, videoUrl, title, description, "thumbnail": thumbnail.asset->url, date
}`);
