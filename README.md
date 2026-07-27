# caelis.dev

The static homepage and installation scripts for Caelis.

## Features

- **Current Caelis Brand**: Uses the Relay mark introduced by the responsive Caelis TUI welcome surface.
- **Product-Accurate Homepage**: Presents Caelis as a terminal-first, local-first Agent Runtime with TUI, Headless, and ACP stdio surfaces.
- **Current Workflow**: Presents guided model/ACP connections, specialist delegation, guarded review, durable Sessions, Plugins, Skills, and MCP.
- **Real TUI Shape**: Recreates the current `v0.31.0` Connect/Resume/Quit welcome experience and `/` command plus `@` file discovery.
- **Localized Content**: English and Simplified Chinese copy are selected from the browser language, with a manual language toggle.
- **Responsive and Accessible**: Includes desktop/mobile layouts, light/dark themes, reduced-motion support, keyboard focus states, and semantic controls.
- **Cross-Platform Installation Scripts**:
  - Unix (`install.sh`): Auto-detects macOS/Linux and arm64/amd64 architectures, verifies downloaded assets against official `checksums.txt` SHA256 hashes, and installs to `~/.local/bin` (or custom `$CAELIS_INSTALL_DIR`).
  - Windows (`install.ps1`): Powershell script designed for Windows systems to download, verify, and unpack release assets automatically.
- **Cloudflare Pages Friendly**: Pre-configured `_headers` and `_redirects` files ready for deployment.

## Project Structure

```text
.
├── _headers       # Cloudflare headers (security, cache control)
├── _redirects     # Redirects for github, releases, and docs
├── icon.svg       # Caelis Relay mark and favicon
├── mark.svg       # Transparent Relay mark for page lockups
├── wordmark.svg   # Caelis Relay mark and pixel wordmark
├── index.html     # Homepage content
├── site.js        # Theme, localization, install, copy, and interaction behavior
├── styles.css     # Responsive light/dark styling for the homepage
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

### Node.js (npx)
```bash
npx http-server -p 8000
```

## Testing Installation Scripts

### Unix Script Dry-Run

You can run the script by targeting a temporary location to verify extraction and check compatibility:

```bash
mkdir -p /tmp/caelis-test
CAELIS_INSTALL_DIR=/tmp/caelis-test ./install.sh
```

Ensure it downloaded the archive, verified the checksum, extracted, and placed `caelis` into `/tmp/caelis-test`.
