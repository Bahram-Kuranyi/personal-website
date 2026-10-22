# Post-launch portfolio polish

Validated 21–22 October 2026 on branch `feat/portfolio-polish-pass`, starting
from clean `origin/main` at `1316292`. No merge or release tag.

## Responsive layout

Selected Work already stacked on mobile, but its heading and CTA shared the
same unprotected background layer, the CTA lacked a consistent touch-height,
and the section used desktop-sized bottom spacing. The mobile heading group
now has a local, fading dark backdrop, intentional start alignment, a 44px CTA,
and a smaller heading-to-card gap. The desktop arrangement remains intact.

The project detail's unbroken domain title was the actual overflow source:
its H1 was 449px wide internally with 24px left padding, producing a 473px
document. The 730px decorative SVG was already clipped by its own absolute
scene wrapper and did not reserve a content column. No global overflow hiding
was added. The H1 uses `min-width: 0`, `overflow-wrap: anywhere`, and a
48–64px mobile clamp; desktop remains 96px. Card, Work-list and next-project
titles also wrap long CMS strings.

| Viewport / innerWidth | Before project scrollWidth | After project scrollWidth |
| --- | --- | --- |
| 320 | 473 | 320 |
| 375 | 473 | 375 |
| 390 | 473 | 390 |
| 428 | 473 | 428 |
| 768 | 768 | 768 |
| 1024 | 1024 | 1024 |
| 1440 | 1440 | 1440 |

The production build was browser-checked on EN/DE Home, Work, and
`/work/personal-website-v2` at all seven widths (42 cases). Every measured
scrollWidth equaled innerWidth; raw observations are in
`portfolio-polish-widths.json`. Studio was inspected at the same seven widths
using Chrome's responsive mode. Screenshots reviewed mobile Selected Work,
project detail, German About and closing line, and desktop Work. The existing
navigation and footer components were not changed.

About uses a 30–36px mobile clamp with 1.2 line height, language-aware hyphenation,
and safe wrapping. Measured sizes: 30px at 320/375, 30.7px at 390, 32.6px at 428,
and 48px at 768 and above. Owner text remains verbatim.

## CMS and routing

Published siteSettings, projects, experience and featuredMedia documents were
saved locally before changes and compared after publication. No seed or
migration was run. The only content mutation was filling the empty Personal
Website `liveUrl` with `https://bahramkuranyi.de`; publication metadata changed
as expected. Site Settings, existing descriptions, CV, experience, links,
slugs and archived project content were preserved.

The existing localized `aboutAccent.en/de` already held the independent closing
line. Its stored key/type remain compatible with production, avoiding a data
migration. Studio now labels it **About closing line** and explains its purpose.
The frontend exposes it as `aboutClosing` and renders it after the About body.
An absent/empty locale renders no closing block; no hardcoded closing copy or
cross-language fallback is used. The existing localized editor requires both
translations when the object is present; the whole optional field can be removed.

**Page address** is `slug.current`, controlling `/en/work/[slug]` and
`/de/work/[slug]`. It was already independent of the title: only the explicit
Generate button derives a slug from the title. Help text now explains that
changing a published slug breaks links. No routes or slugs were changed.

Both optional, validated URL fields already existed (`sourceUrl`, `liveUrl`),
so their schema was left intact. External links render only when present and
use a small decorative, monochrome `currentColor` SVG instead of the arrow
character. Link text remains accessible.

Signed-in Studio checks: Site Settings and Projects opened, EN/DE closing
values matched the backup, slug help and existing URLs appeared correctly,
and the live URL published successfully. No schema/validation errors appeared.
Chrome logged an unused-preload warning, not a schema warning.

## Visual system and motion

Homepage outlines/internal strokes, network paths and fragment visibility
were modestly increased. The amber project paths/fragments also gained a
small opacity/stroke increase; their absolute contained layout was preserved.

The homepage-only pulse starts at 47–53% overall scroll, including crossing
that range in one large scroll step, once per mounted page visit. Three
existing network paths carry a 720ms pulse; three fragments respond with a
2px displacement and opacity change. A short charge settles to the normal
scene. Mobile pulse opacity is 0.3 versus desktop 0.5. No dependencies,
perpetual frame loop or layout geometry changes were added.

Runtime observation: pulse was active at 52.6% progress; document width stayed
390px and About's document position stayed 3864px throughout the sampled
scroll/pulse sequence. It settled to `played` and stayed played on return
scrolling. Cleanup cancels the timeout; hiding the document settles the pulse.

Reduced motion disables the JS trigger and all pulse CSS animations. Chrome
reduced-motion emulation showed the static hand artwork at mid-page. Decorative
SVGs are hidden from assistive technology and do not receive focus. Keyboard
navigation exposed the existing solid 2px focus outline. Text remains above
the decorative layers; mobile Work has additional local contrast protection.

## Brand and metadata

The exact approved source is preserved at `assets/brand/bk-approved.png`.
An 800px square crop at (200,224) keeps the complete mark and dark background.
App Router assets: 512px `icon.png`, 180px `apple-icon.png`, and RGBA PNG frames
at 16/32/48/64px inside `favicon.ico`. The initial RGB ICO frame format was
rejected by the build and corrected to RGBA; the final build passes.

Browser DOM confirms favicon, 512px icon and 180px Apple icon links. Canonical
and Open Graph URLs use `https://bahramkuranyi.de` with locale and project
paths; site identity remains Bahram Kuranyi. Existing metadataBase/canonical/
language-alternate architecture is unchanged. No visible header logo added.

## Validation and limits

- `npm run lint`: passes.
- `npm run typecheck`: passes.
- `node --test tests/*.test.mjs`: 3 existing tests pass.
- `npm run build`: passes, including generated icon routes.
- Browser QA used the local optimized production build and current published CMS.
- No claim of physical iPhone/Safari testing: a final real-device visual review
  and review of the branch preview remain appropriate before merging.
- Production code is unchanged until this branch is merged; the authorized
  CMS live-link fill is already published.

## Follow-up from physical iPhone review

The owner found the initial mobile About scale too large, supplied a screenshot
of the Selected Work heading being covered, and requested a prominent horizontal
lightning shape instead of the subtle network pulse.

- About now uses an 18–22px mobile clamp with 1.65 line height; automatic
  hyphenation removed. Measured 18px at 320/375, 18.72px at 390 and 20.54px at
  428. Tablet/desktop remain 48px. All CMS wording is unchanged.
- Removed the negatively stacked pseudo-element behind the Work heading.
  Contrast now comes from the heading container's own background, which cannot
  paint over its text. The fixed decorative scene now sits at z-index -1 within
  the isolated main stacking context. The exact iPhone compositing defect was
  not reproduced locally; this removes the overlapping layer implicated by the
  screenshot. A repeat physical-device check remains necessary.
- Replaced three curved network pulse paths with a separate responsive SVG
  lightning bolt spanning the viewport, with a white core, cool-blue halo and
  small branches. A single 900ms draw-and-fade replaces the previous 720ms pulse;
  there is no strobe or screen flash. Once-per-visit and reduced-motion guards
  remain in place. Runtime observation confirmed activation at 52.9% scroll and
  unchanged 390px document width; the bolt was visually inspected mid-animation.
- EN/DE homepages checked at 320,375,390,428,768,1024,1440: no horizontal overflow.
  Mobile About and Selected Work screenshots reviewed after production build.
- Lint, TypeScript, all 3 existing tests and the production build passed again.
