# Bahram Kuranyi — Portfolio

A bilingual Next.js portfolio with shared English/German pages and a lightweight scroll-reactive visual system.

See [PRODUCTION.md](./PRODUCTION.md) for route architecture, content locations, validation, confirmed contact details, and required domain/SEO configuration before launch.

## Local development

```powershell
npm.cmd install
# Copy .env.example to .env.local and fill the Sanity values below.
npm.cmd run dev
```

## Validation and production preview

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start
```

Configure `SITE_URL` before the production build and keep the same value at runtime. Missing or non-HTTPS/local production origins fail explicitly. No final production domain has been assumed. Run `node --test tests/site-origin.test.mjs` to check origin validation.

# Managing Website Content

Open `/studio` on the website (locally: <http://localhost:3000/studio>). Sign in with the **GitHub account used to create this Sanity project**. Studio uses Sanity authentication and is deliberately absent from public navigation and the sitemap. A different Sanity login provider can represent a different account, even when the email looks the same.

| Change | Where to edit |
| --- | --- |
| CV | Site Settings → Links & CV → CV → Upload a PDF → Publish |
| Current Focus | Site Settings → Current Focus → Edit English/German text and optional project → Publish |
| Hero, About, identity, contact | Site Settings → corresponding tab → Publish |
| Add a project | Projects → New Project → fill both languages, generate its page address, choose a scene → Publish |
| Project order / homepage selection | Projects → Display order / Show in Selected Work → Publish |
| Experience | Experience → edit or create an entry → set Display order → Publish |
| Featured video | Featured Media → Manual → add URL and both titles → enable Show featured content → Publish |
| Hide featured content | Featured Media → switch off Show featured content → Publish |

Keep published project addresses stable. Publishing a new project automatically makes `/en/work/<address>` and `/de/work/<address>` available. Lower display-order numbers appear first. Optional project stories, links, images and files may be left empty. Image descriptions are required when uploading a project image.

The CV buttons use the published Sanity PDF. If no PDF is uploaded or the CV lookup fails, the original `public/Bahram-Kuranyi-CV.pdf` is the fallback. The original file remains in Git for this purpose.

**Content change:** Studio → Publish. No Git commit, GitHub push or deployment is required.

**Code/design change:** Codex / VS Code → Git → GitHub → deployment.

The website reads published content on the server, with a **60-second cache revalidation interval**. After that interval, a visit triggers a background refresh; that visit may still see the previous version. Reload after a few seconds. An already open page does not update itself. On an upstream failure, Next.js retains the last successful cached page and retries later. First-time builds still need a reachable, configured Sanity project and published Site Settings.

## Sanity setup and initial migration

The current project is **Bahram Kuranyi Portfolio**, project ID `ksebxybv`, dataset `production`, in organization `o1gm5shss`. The public dataset contains website content only. Public reads require **no API token**. Browser Studio writes require the owner's Sanity login. Do not put private information or secrets in public content.

Set these in local `.env.local` and the deployment environment:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=ksebxybv
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-09
SITE_URL=https://your-actual-domain.example
```

`SITE_URL` above is an example: replace it with the real domain. It may be empty only for `npm.cmd run dev`, which uses a non-indexable localhost fallback. The three `NEXT_PUBLIC_SANITY_*` values are public configuration, not credentials, and must be provided at build and runtime. Missing essential Sanity configuration produces an explicit setup error. No `SANITY_API_READ_TOKEN` is required. Never commit `.env.local` or login tokens.

In [Sanity Manage](https://www.sanity.io/manage/project/ksebxybv), add the final website origin under API → CORS origins with credentials enabled, so Studio can sign in on that domain. `http://localhost:3000` is already configured. Do not enable a wildcard origin. Host this app with the Next.js server/ISR runtime, not a static export.

The existing verified content and PDF have already been migrated. `scripts/seed/content.json` is an immutable **initial migration snapshot**, not a live content source. Public pages never import it. Original project and experience arrays were removed; UI labels remain in `src/data/locales`.

For a fresh project only, an authorized developer can run:

```powershell
npx.cmd sanity login
npm.cmd run cms:seed
```

The seed creates missing documents and uploads the original CV when Site Settings is missing. It never replaces existing documents, so rerunning it preserves editor changes. Do not edit the seed to make future content updates.

## Future YouTube Setup

Automatic latest-video mode is prepared but **not implemented or configured**. No channel ID or API key is needed now. When selected, it uses valid manual content as a fallback; without that content, the section stays hidden.

A future implementation can use Site Settings → Future YouTube → channel ID/URL and, if the YouTube API is enabled, a server-only `YOUTUBE_API_KEY`. The extension point is `src/sanity/lib/featuredMedia.ts`. Adding those values alone does not activate automatic fetching. Never prefix the API key with `NEXT_PUBLIC_`.
