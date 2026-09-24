# Caelis Labs website

The bilingual project hub and documentation site at https://caelis.dev. Built with Astro and Starlight; pages are static HTML, CSS, JavaScript, and assets. A single Cloudflare Pages Function resolves the latest Caelis Bot download. No account is required.

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

`/download/caelis-bot/` reads the public R2 `latest.json`, validates its stable version and Apple Silicon filename, checks that the package is available, then redirects to the DMG. `?asset=checksum` resolves its SHA-256 file. Responses are not cached because R2 keeps only the latest release. Network, manifest or package failures fall back to GitHub's latest release page. The resolver uses public HTTPS reads and needs no credentials or R2 binding.

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
2. With the GitHub CLI installed and authorized for public reads, run `npm run docs:sync`. The command fetches every source successfully before replacing snapshots and recording new checksums. It never reads sibling working trees.
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

The Caelis Bot project page has one download action, project-specific GitHub navigation, a 60-second looping demonstration and three concrete use cases. Installation lives in the navigation guide; the compact footer avoids repeated entrances.

The Bot film is **scripted sample content, not a native recording, actual test output or performance benchmark**. It follows two connected paths: user input → Bot reply → two background Workers → terminal inspection → results in chat; then a conversational clue → Bot-generated callback → task completion → Bot nudge → user opens chat → typed feedback → Bot acknowledgement. Chat and two-line capsule geometry follow v0.2.0 frontend styles and the owner’s screenshots. The white Codex TUI omits startup help, private paths, delegation envelopes and usage warnings. Typing, send/click gestures and window transitions carry the flow. The character is rendered from the released `caelis-garden-outfit-v1.glb`; no character redesign or private authoring source is used. Its asset license permits Bot demonstrations; attribution and license are copied from pinned source snapshots to `public/assets/bot/` during the build.

**Proactive care is experimental and not available in v0.2.0.** Its current maturity is described in the use-case body; the film has no disclaimer overlays. Its event → CEL condition → queued prompt flow is based on `poc/eventbot`. The story insert shows a conversational clue, a context-specific callback planned while work is underway, and a later task-completion trigger; the generated callback is illustrative, not a native settings screen or a production tool invocation. This POC has no production registration tool or verified native lock/unlock integration. The film uses fixture events, not invented shipping calendar/mail integrations. Core work and the task-bubble terminal entry are grounded in v0.2.0 `docs/product.md` and `docs/task-delegation.md`. Results depend on the selected Runtime, models, tools and permissions. UI composition is illustrative.

`src/data/bot-demo.json` owns scenario copy and the timing map. Generated MP4s, posters and captions are committed in `assets/video/`; site builds only copy them. To regenerate with Blender, Pillow 11–12 and FFmpeg:

```sh
blender -b --python tools/render-bot-character.py -- \
  --model ../caelis-bot/frontend/public/models/caelis-garden-outfit-v1.glb \
  --out .artifacts/bot-redesign/character --fps 12
python tools/generate-bot-demo.py --font /path/to/a/Chinese-capable-font.ttf
```

The source model belongs to the sibling public Caelis Bot repository at v0.2.0. The film renderer accepts `--character-frames` to use another local rendering directory. It uses the released Bot’s `frontend/public/icons/caelis-avatar.png` as the chat avatar, with an optional `--avatar` override; the website brand logo is unchanged. The renderer uses Hiragino Sans GB, the macOS system font, and Menlo for the terminal; pass `--font`, `--latin-font`, and `--mono-font` to override them. `--stills-only` creates 16 QA frames per language. Blender renders the existing idle, working, attention, nod and celebrate clips, without changing the model. Output is 1600 × 900, 24 fps H.264/yuv420p, fast-start MP4, no audio. The silent video automatically loops while its page is visible and pauses on page hiding. Manual pause is respected; reduced-motion preference disables automatic playback while retaining explicit controls. The player exposes only a compact play/pause button, with no native timeline or chapter seeking; the film also has no progress graphics. Cursor travel takes at most 0.28 source seconds, with no slow drift during reading beats. Check both workflows, the callback origin, typography, character actions, autoplay/loop, hide/resume, captions and mobile overflow after changes.

The existing constellation/meteor canvas and the real Caelis collaboration recording are retained. Animations stop outside the visible area or while the tab is hidden. Reduced motion disables automatic animation/playback; users can still explicitly play the recording. The MP4 loads when the recording enters view. A smaller WebP poster is generated for the page while the original PNG URL remains compatible.

The 44-second 4K recording was reconstructed from reviewed Caelis v0.55.0 captures in `tools/recordings/session.json`. It is an illustrative recording, not a live demonstration of the current release. Local paths are redacted. To regenerate using the existing tooling:

```sh
python -m pip install -r tools/demo-requirements.txt
python tools/generate-demo.py
```

On non-Windows systems, provide `--font /absolute/path/to/a/monospace.ttf`. Do not replace reviewed captures with a local Store export.

The existing native Windows installer test remains separate: `powershell -NoProfile -File tests/install-windows.ps1`. Website changes do not alter the installer implementation.
