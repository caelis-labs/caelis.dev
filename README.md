# Caelis Labs website

The bilingual project hub and documentation site at https://caelis.dev. Built with Astro and Starlight; pages are static HTML, CSS, JavaScript, and assets. A single Cloudflare Pages Function resolves the latest Caelis Bot download. Reading the website needs no account. Using a model service requires its own connection and account where applicable.

The promotion order is **Caelis → Caelis Bot → ACP Go SDK → Memory → Caelis App**. `src/data/projects.json` owns this order and the shared product copy. Only those public projects are included. Product availability is described by release status and supported platforms. Public download links resolve the latest stable release, and module installation commands use `@latest`; landing pages and documentation headers do not display a manually maintained current version. Documentation source snapshots remain pinned to public revisions for review and reproducible builds. A new component release alone does not require a website edit.

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

### Caelis Bot downloads

`/download/caelis-bot/` reads the public R2 `latest.json`, validates its stable version and Apple Silicon filename, checks that the package is available, then redirects to the DMG. `?asset=checksum` resolves its SHA-256 file. Responses are not cached because the current download may change. Network, manifest or package failures fall back to GitHub's latest release page. The resolver uses public HTTPS reads and needs no credentials or R2 binding.

The Git-connected Pages deployment must include the root `functions/` directory alongside the `dist` build output. `public/_routes.json` restricts function execution to the download route; other requests stay static. For direct CLI deployments, run Wrangler from the repository root so it discovers `functions/`. Dashboard drag-and-drop of `dist` alone does not deploy this function.

`npm run preview` previews static pages only. To exercise download redirects locally, run `npx wrangler pages dev dist` from the repository root after building. Verify both download URLs return a `302` to the current R2 package/checksum and that a normal page still returns HTML. `npm run check` also covers release rollover, malformed manifests, missing assets and the GitHub fallback without network access. After deployment, verify these redirects on the production domain.

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

When documentation or product behavior needs an update (not for every new release):

1. Select a public release or exact public commit. Update that project's entries in `content-sources/manifest.json`, then its version/source reference in `src/data/projects.json` and the affected core guide frontmatter and examples.
2. With the GitHub CLI installed and authorized for public reads, run `npm run docs:sync -- --repo=caelis --repo=caelis-bot` for those two projects (omit the selectors to refresh all accessible sources). The command fetches every source successfully before replacing snapshots and recording new checksums. It never reads sibling working trees.
3. Review the snapshot diff and update both languages' guides. Do not manually edit pages marked `generated: true`; `npm run build` regenerates them from `scripts/import-references.mjs`.
4. Run `npm run build`, `npm run check`, and `npm run verify`; inspect the changed guides and social cards in the browser.

`npm run docs:check` is an offline integrity check. Catalog, manifest and frontmatter versions describe the reviewed source snapshots only; they are not a live release catalog. Keep version numbers where they define migration behavior, protocol compatibility or historical release notes. The SDK example checkout retains its reviewed commit independently of the `@latest` module installation command.

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

The Caelis Bot pages preserve the existing hero, film frame, scenario rows, typography, colors, themes and responsive behavior, with macOS/Windows downloads, setup, connections and FAQ content. `src/data/bot-content.json` owns bilingual product copy. `src/data/bot-media.json` owns the current recording integration.

The early v0.2.0 scripted video is no longer shown as a current product demo. Its original files remain for URL compatibility and historical reproduction. A separate video Worker is preparing native footage. Until reviewed assets arrive, `ready: false` displays an explicit recording-in-preparation state and loads no old or missing video. This is an integration dependency, not a completed video refresh.

To integrate approved footage, copy the English and Chinese MP4/WebP/VTT sets into `assets/video/` using new basenames. Update both language base paths, truthful descriptions, duration, source release and platform in `bot-media.json`, then set `ready: true`. Review the producer's exact app/source identity, scene list, redactions and file checksums first. Do not present generated UI or fixture outcomes as native footage. Verify both languages, captions, autoplay/pause, reduced motion, mobile playback and absence of private information. The existing player owns visibility and reduced-motion behavior.

The existing constellation/meteor canvas and the real Caelis collaboration recording are retained. Animations stop outside the visible area or while the tab is hidden. Reduced motion disables automatic animation/playback; users can still explicitly play the recording. The MP4 loads when the recording enters view. A smaller WebP poster is generated for the page while the original PNG URL remains compatible.

The 44-second 4K recording was reconstructed from reviewed Caelis v0.55.0 captures in `tools/recordings/session.json`. It is an illustrative recording, not a live demonstration of the current release. Local paths are redacted. To regenerate using the existing tooling:

```sh
python -m pip install -r tools/demo-requirements.txt
python tools/generate-demo.py
```

On non-Windows systems, provide `--font /absolute/path/to/a/monospace.ttf`. Do not replace reviewed captures with a local Store export.

The existing native Windows installer test remains separate: `powershell -NoProfile -File tests/install-windows.ps1`. Website changes do not alter the installer implementation.

## Reviewed content baseline

The 2026-10-18 refresh uses Caelis v0.72.2 (`fa598b00db7d6635086d3388f4d4c9c335642cfd`) and Caelis Bot v0.15.2 (`c6579eecb9da57a91090174b9a414750a3e3ef4f`). Core main was two commits ahead (test synchronization and Windows sandbox shutdown); those changes are not described as released. Bot main matched its release. Windows platform availability is supported by actual release assets and `docs/windows-release.md`, even where historical product documents still call it future work.

The separate official Bot website is `caelis-labs/ohmybot` at ohmybot.si; it shares this product copy and uses this site's guides. This repository's CI validates PRs and main. Cloudflare's live branch settings must be checked before pushing if an automatic production deployment is possible. No production configuration or domain changes are part of this refresh.

Caelis App's older public source revision was not accessible during this review; its existing checksummed snapshot is retained rather than replaced with unverified content. `docs:sync -- --repo=...` verifies retained snapshots while fetching only selected projects.
