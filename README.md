# caelis.dev

The static homepage and installation scripts for Caelis.

## Features

- **Sleek Homepage**: Minimalist, developer-tool-styled page highlighting ACP fusion, shared sessions, and install paths.
- **ACP-Focused Positioning**: Homepage copy explains Caelis as an ACP-native shared terminal workspace for multiple agent clients.
- **Localized Content**: English and Simplified Chinese copy are selected from the browser language, with a manual language toggle.
- **Cross-Platform Installation Scripts**:
  - Unix (`install.sh`): Auto-detects macOS/Linux and arm64/amd64 architectures, verifies downloaded assets against official `checksums.txt` SHA256 hashes, and installs to `~/.local/bin` (or custom `$CAELIS_INSTALL_DIR`).
  - Windows (`install.ps1`): Powershell script designed for Windows systems to download, verify, and unpack release assets automatically.
- **Cloudflare Pages Friendly**: Pre-configured `_headers` and `_redirects` files ready for deployment.

## Project Structure

```text
.
├── _headers       # Cloudflare headers (security, cache control)
├── _redirects     # Redirects for github, releases, and docs
├── icon.svg       # Caelis brand mark and favicon
├── wordmark.svg   # Pixel-style Caelis header wordmark
├── index.html     # Homepage content
├── site.js        # Install tab, copy action, and localization behavior
├── styles.css     # Dark-mode styling for the homepage
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
