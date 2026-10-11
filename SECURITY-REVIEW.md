# Dependency review — 2026-10-11

Reviewed the installed lockfile with `npm audit --json`, `npm explain`, package source and upstream advisories. Initial result: 23 affected packages (1 critical, 13 high, 9 moderate). After targeted updates: 19 (0 critical, 9 high, 10 moderate). These counts include parent packages inheriting the same underlying advisory; they are not counts of independent vulnerabilities.

## Compatible fixes applied

| Package | Before → after | Severity / exposure | Upgrade scope |
| --- | --- | --- | --- |
| Next.js | 16.3.5 → 16.3.8 | Critical through moderate: server/image processing, ISR cache and development endpoints | Patch; all reported Next.js advisories resolved |
| eslint-config-next | 16.3.5 → 16.3.8 | Development only; kept aligned with Next.js | Patch; inherited braces advisory remains |
| sharp | 0.35.4 → 0.35.5 | High: image processing dependency | Compatible patch in Next.js's existing range |
| brace-expansion | 1.1.18 → 1.1.21; 5.0.9 → 5.0.12 | High/moderate: tooling glob parsing | Patches within each existing range |
| js-yaml under @vercel/frameworks | 3.13.1 → 3.15.2 | High/moderate: Sanity CLI framework detection | Same-major minor; scoped override because parent pins 3.13.1. Direct YAML advisories resolved; inherited sprintf-js warning remains |
| smol-toml under @vercel/frameworks | 1.5.2 → 1.9.1 | High: CLI configuration parsing | Same-major minor; scoped override because parent pins 1.5.2 |

React and react-dom 19.2.8 have no reported advisories in this audit. Sanity 6.18.0 and next-sanity 13.3.4 remain on their existing releases; their warnings originate in the CLI dependency tree, not a direct Studio or content-fetch advisory.

The application does not use `next/og` ImageResponse, so the critical RCE path was not used. ISR and Next Image are used, making the other Next.js/image fixes relevant. See [Next.js RCE advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j), [ISR advisory](https://github.com/advisories/GHSA-mcj8-r9mp-w47p), and [sharp advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w).

## Remaining advisories and limits

| Root cause | Installed / fixed version | Exposure and disposition |
| --- | --- | --- |
| [braces nested-pattern stack exhaustion](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), high | 3.0.3 / no patched release reported | ESLint file globs and Sanity CLI code generation/watchers. No public request or CMS-content path supplies these glob patterns. Avoid running tooling on untrusted repositories/configuration; follow upstream patch availability. |
| [sprintf-js unbounded precision](https://github.com/advisories/GHSA-hp3w-g68c-fv3c), moderate | 1.0.3 / no patched release reported | argparse → js-yaml → framework detection in Sanity CLI. No public route accepts formatting strings for this code. Follow upstream removal/update. |
| [uuid buffer bounds](https://github.com/advisories/GHSA-w5hq-g745-h8pq), moderate | 10.0.0 / 11.1.1 | typeid-js 1.2.0 in Sanity CLI uses v7 and stringify, not the affected v3/v5/v6 functions. An override to the fixed release crosses a major boundary and was not applied. Prefer an upstream typeid-js update. |

Inherited affected packages: @next/eslint-plugin-next, eslint-config-next, fast-glob, micromatch, globby, chokidar, @sanity/codegen, @sanity/cli, @sanity/cli-build, @sanity/runtime-cli, @vercel/frameworks, argparse, js-yaml, typeid-js, sanity and next-sanity. Along with the three root causes above these account for all 19 audit entries.

Sanity is a production dependency because Studio is embedded. Its command-line packages are consequently installed in the production dependency tree, so `--omit=dev` alone does not establish runtime exposure. Inspection of the dependency paths and application imports found no reachable public-request path to the remaining vulnerable operations. This is a scoped review, not a claim that the dependency tree has zero vulnerabilities.

The audit's proposed blanket fixes include breaking downgrades to Sanity 5.14.1, next-sanity 11.6.13 and eslint-config-next 14.2.35. They were deliberately not applied. No forced audit fix, major override, new dependency or application redesign was used. Revisit these tooling warnings before enabling code generation over untrusted inputs and during routine dependency maintenance.
