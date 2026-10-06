# Bahram Kuranyi — Portfolio

A bilingual Next.js portfolio with shared English/German pages and a lightweight scroll-reactive visual system.

See [PRODUCTION.md](./PRODUCTION.md) for route architecture, content locations, validation, confirmed contact details, and required domain/SEO configuration before launch.

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

## Validation and production preview

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
npm.cmd run start
```

Configure `SITE_URL` before the production build. No final production domain has been assumed.
