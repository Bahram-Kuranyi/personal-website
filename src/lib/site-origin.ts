import "server-only";

const configuredUrl = process.env.SITE_URL?.trim();
const production = process.env.NODE_ENV === "production";

if (production && !configuredUrl) {
  throw new Error("Set SITE_URL to the public HTTPS origin before building or starting production.");
}

export const siteUrl = new URL(configuredUrl || "http://localhost:3000");
if (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
  throw new Error("SITE_URL must be an HTTP(S) origin without a path, query or credentials.");
}

const hostname = siteUrl.hostname.replace(/\.$/, "");
const local = hostname === "localhost" || hostname.endsWith(".localhost") || /^127\./.test(hostname) || ["[::1]", "0.0.0.0"].includes(hostname);
if (production && (siteUrl.protocol !== "https:" || local)) {
  throw new Error("Production SITE_URL must be a non-local HTTPS origin.");
}

export const isIndexable = Boolean(configuredUrl) && !local;
