# caelis.dev

The static homepage and installation scripts for Caelis.

## Features

- **Current Caelis Brand**: Uses the current transparent Caelis icon and wordmark.
- **Product-Accurate Homepage**: Presents Caelis as a terminal-first, local-first Agent Runtime with TUI, Headless, and ACP stdio surfaces.
- **Current Workflow**: Presents guided model/ACP connections, specialist delegation, guarded review, durable Sessions, Plugins, Skills, and MCP.
- **Recorded Terminal Demo**: `/demo/` replays genuine Caelis `v0.55.0` terminal captures with streamed assistant replies, participant views, seeking, and playback speed controls. User inputs and tool records appear as complete blocks. A 64-second H.264 video uses the same timeline.
- **Homepage Video**: The second section shows the recorded session in a wide video frame. It plays muted and loops while visible, pauses offscreen, and respects viewer pauses and reduced-motion preferences. Native video controls remain available.
- **Localized Content**: English and Simplified Chinese copy are selected from the browser language, with a manual language toggle.
- **Responsive and Accessible**: Includes desktop/mobile layouts, light/dark themes, reduced-motion support, keyboard focus states, and semantic controls.
- **Cross-Platform Installation Scripts**:
  - Unix (`install.sh`): Installs or updates to the latest release, auto-detects macOS/Linux and arm64/amd64 architectures, verifies `checksums.txt`, and installs to `~/.local/bin` (or custom `$CAELIS_INSTALL_DIR`).
  - Windows (`install.ps1`): Installs or updates to the latest release, then verifies and unpacks the matching Windows asset.
  - Historical/version-pinned installs remain available from GitHub Releases; the raw installers ignore legacy version arguments and `CAELIS_VERSION` and always resolve the latest release.
- **Cloudflare Pages Friendly**: Pre-configured `_headers` and `_redirects` files ready for deployment.

## Project Structure

```text
.
├── _headers       # Cloudflare headers (security, cache control)
├── _redirects     # Redirects for github, releases, and docs
├── icon.svg       # Transparent Caelis icon and favicon
├── wordmark.svg   # Caelis Relay mark and pixel wordmark
├── index.html     # Homepage content
├── site.js        # Theme, localization, install, copy, and interaction behavior
├── styles.css     # Responsive light/dark styling for the homepage
├── demo/          # Static terminal player, reviewed captures, generated timeline and video
├── tools/         # Offline demo generation scripts and dependencies
├── install.sh     # Shell install script (macOS/Linux)
└── install.ps1    # PowerShell install script (Windows)
```

## Local Development

You can run a simple local static server to preview the page.

### Python 3
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

The terminal demo is at `http://localhost:8000/demo/`. Serve it over HTTP rather than opening `index.html` directly: the player fetches its local recording file.

### Node.js (npx)
```bash
npx http-server -p 8000
```

## Terminal demo and video

The demo runs entirely in the browser. It needs no backend, WebSocket, account, or model credentials. The source captures in `demo/recordings/session.json` are reviewed and have local paths redacted. Do not replace them with an unreviewed local Store export.

`tools/generate-demo.py` owns the sequence and editorial timing. It decodes ANSI terminal captures into canvas cell patches and renders the same sequence into a 1920×1080, 30 fps MP4. Only assistant replies use reconstructed typing animation; commands, user messages, and tool records appear all at once. The demo does not preserve the original operation timings. Reduced-motion users can select complete chapter frames without animation, and a text view exposes the current terminal contents.

Regenerate the browser timeline:

```sh
python -m pip install -r tools/demo-requirements.txt
python tools/generate-demo.py
```

Regenerate the timeline, video, and poster on Windows:

```sh
python tools/generate-demo.py --video
```

On other systems, pass `--font /path/to/a/monospace.ttf`. The committed media files are ready to serve; deployment does not require Python or FFmpeg.

Cloudflare Pages can publish the repository as a static site without a build step. `demo/index.html` is served at `/demo/`, and all player assets use relative URLs. The player works with the existing Content Security Policy. Publish the `demo/` directory alongside the homepage; no new DNS record is required for `caelis.dev/demo/`.

For a homepage video, use `demo/media/caelis-demo.mp4` with `demo/media/caelis-demo-poster.png` as its poster. For a GitHub README, a linked poster provides a reliable entry point after deployment:

```md
[![Watch a real Caelis multi-agent session](https://caelis.dev/demo/media/caelis-demo-poster.png)](https://caelis.dev/demo/)
```

## Testing Installation Scripts

### Unix Script Dry-Run

You can run the script by targeting a temporary location to verify extraction and check compatibility:

```bash
mkdir -p /tmp/caelis-test
CAELIS_INSTALL_DIR=/tmp/caelis-test ./install.sh
```

Ensure it downloaded the archive, verified the checksum, extracted, and placed `caelis` into `/tmp/caelis-test`.
