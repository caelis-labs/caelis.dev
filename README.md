# Caelis Labs website

The bilingual project hub and documentation site at https://caelis.dev. Built with Astro and Starlight; the output is static HTML, CSS, JavaScript, and assets. There is no application server or account requirement.

The promotion order is **Caelis → Caelis Bot → ACP Go SDK → Memory → Caelis App**. `src/data/projects.json` owns this order and the shared product copy. Only those public projects are included. Product availability and documentation are pinned to public source revisions rather than local development branches.

## Develop and validate

Use Node.js **22.12 or later** and npm:

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. English is at `/`; Simplified Chinese is at `/zh-cn/`. The language switch keeps the equivalent page. Theme preference is shared between the marketing site and documentation.

Before publishing:

```sh
npm run build
npm run check
npm run verify
npm run preview
```

Build verifies pinned source checksums, imports reference pages, prepares assets, creates the static pages and Pagefind index, then generates social images and page-specific CSP hashes. It does not download documentation or fonts. `check` runs Astro diagnostics and contract tests against the completed build. `verify` checks internal links and anchors, language counterparts, canonical URLs, social metadata and dimensions, installation-script byte equality, project order, and size budgets. Its report is written to `.artifacts/verification.json`.

Browser acceptance covers desktop and mobile layouts, both themes, language and project navigation, search, installation tabs/copy feedback, video playback, and browser console errors. Automated output checks do not prove production crawler behavior or native device behavior.

## Deploy to Cloudflare Pages

The site now needs a build step; **do not continue publishing the repository root**.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (at least 22.12) |

Deploy the complete `dist` directory. `public/_headers` and `public/_redirects` are copied into it. `/docs/` is a real documentation route. `/github` and `/releases` retain their existing Caelis destinations. The root installer files are copied without modifications; `/install.sh`, `/install.ps1`, `/#cli`, `/#demo-video`, and existing video/poster URLs remain available. `404.html` prevents unknown routes from becoming a homepage fallback.

Keep `public/theme.js` synchronous in the head to avoid a theme flash. CSP is written into each HTML head with hashes for generated inline content; Pagefind's WebAssembly allowance applies only to documentation routes. Do not add an incompatible second CSP in the hosting dashboard. The Cloudflare header file adds frame protection and cache policies; local Astro preview does not emulate Cloudflare headers or redirects.

After deployment, check the homepage, both installers' content types, `/docs/`, a deep documentation link, and a missing URL. Fetch page HTML as a crawler to verify absolute `og:image` and `twitter:image` URLs, then verify those images return 200. External X/Twitter and other social crawlers can cache an older card until they re-fetch the page.

## Content and documentation

```text
src/data/projects.json        Ordered project catalog and bilingual product copy
src/components/              Marketing pages, shared components, docs overrides
src/content/docs/docs/       English guides and generated references
src/content/docs/zh-cn/docs/  Chinese guides and generated references
src/styles/                  Shared tokens, typography, marketing and docs styles
content-sources/manifest.json Public source revisions and SHA-256 checksums
content-sources/snapshots/    Reviewed upstream sources for offline builds
scripts/                     Source import, asset preparation, social cards, checks
icon.svg / wordmark.svg      Lightweight vector brand resources
public/                      Hosting config, robots.txt, theme bootstrap
install.sh / install.ps1     Existing standalone Caelis installers
assets/video/                Original reviewed demo and poster
tools/                      Existing offline video-generation tools
```

Core guides are written for the website. Longer reference pages are imported deterministically from committed snapshots and carry their source revision. Chinese reference pages explicitly identify untranslated English material; they do not silently claim to be translations. Imported relative links resolve either to another imported page or to a fixed upstream GitHub revision.

To update a project:

1. Select a public release or exact public commit. Update that project's entries in `content-sources/manifest.json`, then its version/source reference in `src/data/projects.json` and the affected core guide frontmatter and examples.
2. With the GitHub CLI installed and authorized for public reads, run `npm run docs:sync`. The command fetches every source successfully before replacing snapshots and recording new checksums. It never reads sibling working trees.
3. Review the snapshot diff and update both languages' guides. Do not manually edit pages marked `generated: true`; `npm run build` regenerates them from `scripts/import-references.mjs`.
4. Run `npm run build`, `npm run check`, and `npm run verify`; inspect the changed guides and social cards in the browser.

`npm run docs:check` is an offline integrity check. SDK v1.4.0 installation is intentionally distinct from its example documentation revision: the Client example was added after the release, so the example instructions check out their exact later public commit.

## Brand and social images

Navigation uses an inline geometric SVG mark and live text; it does not request a bitmap logo. The favicon, Apple touch icon, light/dark branding page, and downloadable wordmark share the same identity. `/brand/` documents usage.

Every indexable page gets a **1200 × 630 OG image** and a **1200 × 600 Twitter large-image card**. Satori and resvg render them during build using the committed, licensed Noto Sans SC subset. Filenames include content hashes. `dist/social/manifest.json` maps page URLs to their images. Social images are metadata assets and are not loaded as homepage content.

If a new title includes an unsupported character, the build fails with the missing characters instead of publishing missing glyphs. Download the official font listed in `assets/fonts/source.json`, then explicitly regenerate the subset:

```sh
uv run --with fonttools --with brotli python scripts/update-social-font.py /absolute/path/to/NotoSansSC.ttf
npm run build
```

Commit the changed subset, character list, and provenance file together. Python and the full source font are not needed for normal builds. Font licensing is in `assets/fonts/OFL.txt`. The Caelis Bot logo is the transparent artwork supplied by the project owner, preserved in `assets/bot/` with lightweight WebP derivatives generated at build time. The public Bot project’s character-asset license and attribution are also available alongside the website assets.

## Motion and media

The existing constellation/meteor canvas and the real Caelis collaboration recording are retained. Animations stop outside the visible area or while the tab is hidden. Reduced motion disables automatic animation/playback; users can still explicitly play the recording. The MP4 loads when the recording enters view. A smaller WebP poster is generated for the page while the original PNG URL remains compatible.

The 44-second 4K recording was reconstructed from reviewed Caelis v0.55.0 captures in `tools/recordings/session.json`. It is an illustrative recording, not a live demonstration of the current release. Local paths are redacted. To regenerate using the existing tooling:

```sh
python -m pip install -r tools/demo-requirements.txt
python tools/generate-demo.py
```

On non-Windows systems, provide `--font /absolute/path/to/a/monospace.ttf`. Do not replace reviewed captures with a local Store export.

The existing native Windows installer test remains separate: `powershell -NoProfile -File tests/install-windows.ps1`. Website changes do not alter the installer implementation.
