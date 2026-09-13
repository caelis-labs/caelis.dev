# caelis.dev

The static homepage and installation scripts for Caelis.

## Features

- **Current Caelis Brand**: Uses the current transparent Caelis icon and wordmark.
- **Product-Accurate Homepage**: Presents Caelis as a terminal-first, local-first Agent Runtime with TUI, Headless, and ACP stdio surfaces.
- **Current Workflow**: Presents guided model/ACP connections, specialist delegation, guarded review, durable Sessions, Plugins, Skills, and MCP.
- **Homepage Video**: A 64-second, 4K recording of a real Caelis multi-agent session follows installation. The 16:9 frame grows on scroll entry, remains larger around the viewport center, and shrinks on exit. It plays muted and loops while visible, with no visible text or playback controls. Reduced-motion users see a still frame.
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
├── home-video.js  # Visibility-aware homepage video playback
├── assets/video/  # Recorded MP4 and poster
├── tools/         # Offline video generator, reviewed captures, and dependencies
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

The homepage video is at `http://localhost:8000/#demo-video`.

### Node.js (npx)
```bash
npx http-server -p 8000
```

## Homepage recording

The homepage serves `assets/video/caelis-demo.mp4` and `assets/video/caelis-demo-poster.png`. It needs no backend, WebSocket, account, or model credentials. There is no separate interactive demo page.

`tools/generate-demo.py` renders reviewed Caelis v0.55.0 terminal captures from `tools/recordings/session.json` into a 3840×2160, 30 fps, 64-second H.264 video with no audio or added title bars. Local paths are redacted. Only assistant replies use reconstructed typing animation; commands, user inputs, and tool records appear at once. Timing is edited rather than real time. Do not replace the reviewed source with a local Store export.

Regenerate the video and poster on Windows:

```sh
python -m pip install -r tools/demo-requirements.txt
python tools/generate-demo.py
```

On other systems, pass `--font /path/to/a/monospace.ttf`. The committed media is ready to serve; Cloudflare Pages needs no build step, Python, or FFmpeg.

The presentation sits after installation. Its maximum width is 1360px, gently exceeding the surrounding 1200px content column only while in focus. CSS scroll-driven animation scales the frame from 88% on entry to 100% around the viewport center, then back to 88% on exit. Browsers without support display the full frame directly. Reduced-motion preferences disable the scroll animation and autoplay.

For a GitHub README, link the poster to the homepage video:

```md
[![Watch a real Caelis multi-agent session](https://caelis.dev/assets/video/caelis-demo-poster.png)](https://caelis.dev/#demo-video)
```

## Testing Installation Scripts

### Unix Script Dry-Run

You can run the script by targeting a temporary location to verify extraction and check compatibility:

```bash
mkdir -p /tmp/caelis-test
CAELIS_INSTALL_DIR=/tmp/caelis-test ./install.sh
```

Ensure it downloaded the archive, verified the checksum, extracted, and placed `caelis` into `/tmp/caelis-test`.
