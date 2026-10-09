import { defineArrayMember, defineField, defineType } from "sanity";

const languages = [{ name: "en", title: "English" }, { name: "de", title: "Deutsch" }];
const localized = (name: string, title: string, type: string) => defineType({
  name, title, type: "object",
  fields: languages.map((language) => defineField({ ...language, type, validation: (rule) => rule.required() })),
});
const copy = (name: string, title: string, group?: string, required = false) => defineField({
  name, title, type: "localizedText", group,
  validation: (rule) => required ? rule.required() : rule,
});
const url = (name: string, title: string, group?: string) => defineField({
  name, title, type: "url", group,
  validation: (rule) => rule.uri({ scheme: ["https", "http"] }),
});
const section = (name: string, title: string) => defineField({
  name, title, type: "localizedSection", group: "story",
  description: "Optional. Leave empty to omit this section. Use a paragraph, a short list, or both.",
});

export const schemaTypes = [
  localized("localizedString", "Text in both languages", "string"),
  localized("localizedText", "Text in both languages", "text"),
  defineType({ name: "textList", title: "Short list", type: "array", of: [defineArrayMember({ type: "string" })] }),
  localized("localizedList", "List in both languages", "textList"),
  defineType({ name: "storySection", title: "Section", type: "object", fields: [
    defineField({ name: "body", title: "Paragraph", type: "text" }),
    defineField({ name: "items", title: "Key points", type: "textList" }),
  ] }),
  localized("localizedSection", "Project section", "storySection"),
  defineType({
    name: "siteSettings", title: "Site Settings", type: "document",
    groups: [
      { name: "identity", title: "Identity", default: true }, { name: "hero", title: "Hero" },
      { name: "about", title: "About" }, { name: "links", title: "Links & CV" },
      { name: "focus", title: "Current Focus" }, { name: "youtube", title: "Future YouTube" },
    ],
    fields: [
      defineField({ name: "name", title: "Name", type: "string", group: "identity", validation: (r) => r.required() }),
      copy("title", "Professional title", "identity", true),
      copy("location", "Location", "identity"),
      copy("heroLabel", "Hero label", "hero"), copy("heroText", "Hero introduction", "hero", true),
      copy("aboutLead", "About headline", "about"), copy("aboutAccent", "About headline ending", "about"),
      copy("about", "About paragraph", "about", true),
      url("github", "GitHub profile", "links"), url("linkedin", "LinkedIn profile", "links"),
      defineField({ name: "email", title: "Contact email", type: "string", group: "links", validation: (r) => r.email() }),
      defineField({ name: "cv", title: "CV (PDF)", type: "file", group: "links", options: { accept: "application/pdf" },
        description: "Upload your PDF, then Publish. All CV buttons update automatically. Without a file the original CV remains available.",
        validation: (r) => r.custom(async (value, context) => {
          if (!value?.asset?._ref) return true;
          const asset = await context.getClient({ apiVersion: "2026-10-09" }).getDocument<{ mimeType?: string }>(value.asset._ref);
          return asset?.mimeType === "application/pdf" || "Please upload a PDF document.";
        }),
      }),
      copy("contactLead", "Contact headline", "links"), copy("contactAccent", "Contact headline ending", "links"),
      copy("contactText", "Contact introduction", "links"),
      copy("focusLabel", "Card label", "focus"), copy("focusEyebrow", "Short introduction", "focus"),
      defineField({ name: "focusHeadline", title: "Headline", type: "localizedText", group: "focus", description: "Use a new line for each short line of the headline." }),
      copy("focusSecondary", "Secondary text", "focus"),
      defineField({ name: "focusProject", title: "Linked project (optional)", type: "reference", to: [{ type: "project" }], group: "focus",
        description: "Choose a published project to link from the card." }),
      defineField({ name: "youtubeChannelId", title: "YouTube channel ID (optional)", type: "string", group: "youtube", description: "Leave empty for now. Automatic latest-video support is prepared for a future stage." }),
      url("youtubeChannelUrl", "YouTube channel URL (optional)", "youtube"),
    ],
    preview: { prepare: () => ({ title: "Site Settings" }) },
  }),
  defineType({
    name: "project", title: "Project", type: "document",
    groups: [{ name: "summary", title: "Overview", default: true }, { name: "story", title: "Project story" }, { name: "technical", title: "Links & technology" }, { name: "visual", title: "Appearance" }],
    initialValue: { featured: false, sortOrder: 100, visualVariant: "components", previewType: "portfolio" },
    orderings: [{ title: "Website order", name: "websiteOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
    fields: [
      defineField({ name: "title", title: "Title", type: "string", group: "summary", validation: (r) => r.required() }),
      defineField({ name: "slug", title: "Page address", type: "slug", group: "summary", options: { source: "title", maxLength: 96 },
        description: "Generate once, then keep this address stable so existing links continue working.",
        validation: (r) => r.required().custom((value) => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) || "Use lowercase letters, numbers and hyphens."),
      }),
      defineField({ name: "featured", title: "Show in Selected Work on the homepage", type: "boolean", group: "summary" }),
      defineField({ name: "sortOrder", title: "Display order", type: "number", group: "summary", description: "Lower numbers appear first.", validation: (r) => r.required().integer() }),
      copy("category", "Category", "summary"), copy("description", "Short description", "summary", true),
      section("overview", "Overview"), section("role", "My role"), section("challenge", "Challenge"), section("approach", "Approach"),
      section("decisions", "Technical decisions"), section("features", "Key features"), section("outcome", "Learnings / outcome"),
      defineField({ name: "tech", title: "Technology stack", type: "localizedList", group: "technical" }),
      url("sourceUrl", "GitHub / source URL", "technical"), url("liveUrl", "Live website URL", "technical"),
      defineField({ name: "visualVariant", title: "Background scene", type: "string", group: "visual", options: { list: [{ title: "Components — warm system nodes", value: "components" }, { title: "Windows — layered interfaces", value: "windows" }] }, validation: (r) => r.required() }),
      defineField({ name: "previewType", title: "Illustrated preview", type: "string", group: "visual", options: { list: [{ title: "Portfolio interface", value: "portfolio" }, { title: "Client website", value: "freelance" }] }, description: "Used when no project image is uploaded." }),
      defineField({ name: "image", title: "Project image (optional)", type: "image", group: "visual", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Image description", type: "localizedString", validation: (r) => r.required() })] }),
      defineField({ name: "assets", title: "Supporting files (optional)", type: "array", group: "visual", of: [defineArrayMember({ type: "file" })] }),
    ],
    preview: { select: { title: "title", subtitle: "slug.current", media: "image" } },
  }),
  defineType({
    name: "experience", title: "Experience", type: "document", initialValue: { sortOrder: 100 },
    orderings: [{ title: "Website order", name: "websiteOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
    fields: [
      defineField({ name: "company", title: "Company", type: "localizedString", validation: (r) => r.required() }),
      copy("role", "Role", undefined, true),
      defineField({ name: "period", title: "Period", type: "string", validation: (r) => r.required(), description: "For example: 2023 — 2025. Use verified dates only." }),
      copy("location", "Location"), copy("description", "Description", undefined, true),
      defineField({ name: "technologies", title: "Technologies", type: "localizedList" }),
      defineField({ name: "sortOrder", title: "Display order", type: "number", validation: (r) => r.required().integer(), description: "Lower numbers appear first." }),
    ],
    preview: { select: { title: "company.en", subtitle: "period" } },
  }),
  defineType({
    name: "featuredMedia", title: "Featured Media", type: "document", initialValue: { enabled: false, mode: "manual" },
    fields: [
      defineField({ name: "enabled", title: "Show featured content", type: "boolean", description: "Enable and Publish to show a compact section below the homepage Hero. A valid manual URL and title are also needed." }),
      defineField({ name: "mode", title: "Content source", type: "string", options: { list: [{ title: "Manual — choose a video", value: "manual" }, { title: "Latest YouTube — future integration", value: "latestYouTube" }], layout: "radio" }, description: "Automatic mode is not connected yet. It uses valid manual content as a fallback, or hides the section. No API key is needed.", validation: (r) => r.required() }),
      url("videoUrl", "Video URL"), copy("title", "Title"), copy("description", "Short description"),
      defineField({ name: "thumbnail", title: "Thumbnail (optional)", type: "image", options: { hotspot: true } }),
      defineField({ name: "date", title: "Publication date (optional)", type: "date" }),
    ],
    preview: { prepare: () => ({ title: "Featured Media" }) },
  }),
];
