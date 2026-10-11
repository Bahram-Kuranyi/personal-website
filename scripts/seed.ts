import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import content from "./seed/content.json";

// One-time migration snapshot, never imported by the website. Re-running preserves editor changes.
async function seed() {
  const client = getCliClient({ apiVersion: "2026-10-09" }).withConfig({ useCdn: false });
  const documents: Array<{ _id: string; _type: string; [key: string]: unknown }> = content;
  if (!await client.getDocument("siteSettings")) {
    const asset = await client.assets.upload("file", createReadStream(resolve("public/Bahram-Kuranyi-CV.pdf")), {
      filename: "Bahram-Kuranyi-CV.pdf", contentType: "application/pdf",
    });
    documents.find((document) => document._id === "siteSettings")!.cv = {
      _type: "file", asset: { _type: "reference", _ref: asset._id },
    };
  }
  let transaction = client.transaction();
  for (const document of documents) transaction = transaction.createIfNotExists(document);
  await transaction.commit();
  console.log(`Seed complete: ${documents.length} initial documents ensured; existing documents preserved.`);
}

seed().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
