import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Public, published content only. The Next.js cache owns freshness; no browser token or CDN cache layer.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });
