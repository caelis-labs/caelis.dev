# Website implementation validation — 2026-09-23

Implemented locally in `/Users/xueyongzhi/WorkDir/caelis-labs/caelis.dev`. No commit, push, hosting change, or deployment was performed.

## Automated results

- `npm run build`: passed, with no build warnings in the final run.
- `npm run check`: Astro reported 0 errors, 0 warnings, and 0 hints; both contract tests passed.
- `npm run docs:check`: all 20 public source snapshots match their checksums and catalog revisions.
- `npm run verify`: 83 pages, including 66 documentation pages; 3,499 internal links/assets/anchors checked; 164 social images generated and checked.
- `git diff --check`: passed.
- Standalone SVG icon: 433 bytes, with no embedded bitmap. Compressed English homepage HTML: 5,611 bytes. Largest generated social image: 116,611 bytes. These are build artifact sizes, not production network measurements.
- Root installation scripts are byte-identical to their copies in the build. This pass did not modify or execute the installers.

## Browser observations

Used the actual static build through Astro preview at `http://127.0.0.1:4322`, including its generated CSP, rather than relying only on the development server.

- Inspected the homepage in light and dark themes, at the normal desktop size, a 1440 × 1000 viewport override, and a 390 × 844 mobile viewport override. No horizontal document overflow was observed on the tested mobile homepage and installation guide.
- Verified constellation/meteor rendering, the existing recording entering playback when visible, and the Caelis/Bot/project hierarchy.
- Verified mobile navigation opens and Escape closes it. Installation tabs switch by mouse and arrow keys; copy reports success and displays the check mark.
- Verified documentation project selection navigates to the selected project and limits the sidebar to its guides. The documentation hub collapses project groups and preserves the five-project order.
- Verified mobile documentation navigation, light/dark selection, and language switching from the Chinese installation guide to the matching English guide.
- Chinese search for “安装” returned 16 results, with translated result counts and controls. No browser error or warning was recorded during the final inspected flows.
- Applied the owner-supplied transparent Caelis Bot logo to the homepage, project detail, catalog, and Bot social cards. The largest webpage derivative is 40,570 bytes; dimensions and alpha transparency are checked automatically.
- Visually inspected the generated English and Chinese homepage social cards and the updated Bot card. Automated checks cover the dimensions and metadata mapping of every other card.

## Boundaries and deployment handoff

- Reduced-motion behavior is implemented in CSS and the canvas/video controllers; an OS-level preference change was not exercised in this browser session.
- Browser checks are viewport simulations, not native iPhone/Android acceptance or a complete accessibility audit.
- Some Chinese reference pages intentionally retain the pinned English upstream text and clearly label that status. The website's core guides and product copy are bilingual.
- Cloudflare headers/redirects and live X/Twitter crawler fetching require deployment verification. Local preview does not emulate Cloudflare routing configuration.
- Cloudflare Pages must use build command `npm run build` and output directory `dist`. See `README.md` for the operational steps and documentation-update workflow.
