"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const singletons = new Set(["siteSettings", "featuredMedia"]);

export default defineConfig({
  name: "portfolio",
  title: "Portfolio Content",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool({
    structure: (S) => S.list().title("Content").items([
      S.listItem().title("Site Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("experience").title("Experience"),
      S.listItem().title("Featured Media").id("featuredMedia").child(S.document().schemaType("featuredMedia").documentId("featuredMedia")),
    ]),
  })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    newDocumentOptions: (options) => options.filter(({ templateId }) => !singletons.has(templateId)),
    actions: (actions, { schemaType }) => singletons.has(schemaType)
      ? actions.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish")
      : actions,
  },
});
