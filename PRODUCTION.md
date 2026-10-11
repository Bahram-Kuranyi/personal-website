# Portfolio architecture and launch setup

Next.js App Router, React, TypeScript and Tailwind. No localization or animation dependencies.

## Development

On Windows use `npm.cmd install` and `npm.cmd run dev`.

Validation: `npm.cmd run lint`, `npx.cmd tsc --noEmit --incremental false`, and `npm.cmd run build`.
Run the production preview with `npm.cmd run start`.

## Routes and content

- `/` permanently redirects to `/en`.
- `/en` and `/de`: homepage sections.
- `/{locale}/work`: Work overview.
- `/{locale}/work/{slug}`: data-driven project details.
- Legacy `/work` URLs redirect to English while preserving the suffix.
- Unknown locales, projects and routes return HTTP 404.

Existing content pages are prerendered with 60-second ISR. Newly published project slugs are generated on demand. The locale root layout validates the language while allowing new child routes. `src/sanity/lib` fetches and normalizes published Sanity documents; `src/data/locales` contains UI labels only. Shared JSX and visual components are used for both languages.

The server-rendered language switcher preserves the page path. Homepage section anchors remain local to the selected language. The CV uses the published Sanity asset, with the original public PDF as fallback. `/studio/[[...tool]]` has its own root layout so portfolio styles and navigation do not affect the editor.

The global 404 uses Next.js's documented experimental `globalNotFound` option because the root layout is a locale segment. The fallback is deliberately English and links to English Home and Work.

## Visual system

The approved homepage hand composition and morph are unchanged. Work and project details use server-rendered SVG scenes with a small shared `VisualSceneMotion` client wrapper. Scroll updates are coalesced with requestAnimationFrame, geometry is cached, and reduced-motion preferences remove transforms. No animation runs at rest.

## Production domain and SEO

Copy `.env.example` to `.env.local` for local configuration. Set `SITE_URL` to the final public HTTPS origin in the deployment environment **before building**, then rebuild. Use an origin only, without a subpath, query, or credentials.

No production domain has been assumed. Without `SITE_URL`, the single fallback is `http://localhost:3000`, all pages use `noindex,nofollow`, and robots disallows crawling. Do not launch without configuring this value. Leave it unset for private previews.

Metadata includes localized titles/descriptions, Open Graph basics, canonical URLs and English/German language alternates. Project metadata and the revalidated sitemap use published Sanity projects. `/robots.txt` permits crawling and advertises the sitemap only with a configured non-local origin; Studio is excluded from crawling and has noindex metadata. No fabricated last-modified dates are emitted.

## Confirmed contact information

Email and LinkedIn were migrated from the existing public CV. GitHub matches the repository owner. These links and the uploaded CV are now managed in Sanity Site Settings. See [Managing Website Content](./README.md#managing-website-content) for setup, publishing, cache behavior and future YouTube configuration.

Before launch, confirm the final domain and review the CV against the experience data: some employment dates differ. Existing page facts were preserved during localization. Confirm that the current CV is the version you want to publish. A dedicated social sharing image can be added later.
