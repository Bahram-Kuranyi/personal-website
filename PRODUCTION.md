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

All eight content pages are statically generated. The locale root layout emits the correct HTML language. `src/data/locales` holds typed UI dictionaries; `src/data/localized.ts` supplies German project and experience content keyed to the canonical data. Product/company names, slugs and technology names remain stable. Shared JSX and visual components are used for both languages.

The server-rendered language switcher preserves the page path. Homepage section anchors remain local to the selected language. The CV uses its public root path in both languages.

The global 404 uses Next.js's documented experimental `globalNotFound` option because the root layout is a locale segment. The fallback is deliberately English and links to English Home and Work.

## Visual system

The approved homepage hand composition and morph are unchanged. Work and project details use server-rendered SVG scenes with a small shared `VisualSceneMotion` client wrapper. Scroll updates are coalesced with requestAnimationFrame, geometry is cached, and reduced-motion preferences remove transforms. No animation runs at rest.

## Production domain and SEO

Copy `.env.example` to `.env.local` for local configuration. Set `SITE_URL` to the final public HTTPS origin in the deployment environment **before building**, then rebuild. Use an origin only, without a subpath, query, or credentials.

No production domain has been assumed. Without `SITE_URL`, the single fallback is `http://localhost:3000`, all pages use `noindex,nofollow`, and robots disallows crawling. Do not launch without configuring this value. Leave it unset for private previews.

Metadata includes localized titles/descriptions, Open Graph basics, canonical URLs and English/German language alternates. `/sitemap.xml` is generated from the locale and project data; `/robots.txt` permits crawling and advertises the sitemap only with a configured non-local origin. No fabricated last-modified dates are emitted.

## Confirmed contact information

Email and LinkedIn come from the existing public CV. GitHub matches the repository owner. These links and the CV path are centralized in `src/lib/site.ts`.

Before launch, confirm the final domain and review the CV against the experience data: some employment dates differ. Existing page facts were preserved during localization. Confirm that the current CV is the version you want to publish. A dedicated social sharing image can be added later.
