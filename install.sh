#!/bin/bash

# caelis installation script for macOS and Linux.
# GitHub: https://github.com/caelis-labs/caelis

set -e

# Configuration
DEFAULT_INSTALL_DIR="$HOME/.local/bin"
CAELIS_INSTALL_DIR="${CAELIS_INSTALL_DIR:-$DEFAULT_INSTALL_DIR}"
CAELIS_RELEASES_BASE_URL="${CAELIS_RELEASES_BASE_URL:-https://releases.caelis.dev}"
CAELIS_RELEASES_BASE_URL="${CAELIS_RELEASES_BASE_URL%/}"

if [ "$#" -ne 0 ] || [ -n "${CAELIS_VERSION:-}" ]; then
  echo "Warning: Version arguments and CAELIS_VERSION are ignored; installing the latest R2 release." >&2
fi

# Helper to download files using curl or wget
download_file() {
  local download_url="$1"
  local download_dest="$2"
  local download_success=0

  if command -v curl >/dev/null 2>&1; then
    if curl -sSfL --retry 3 --retry-delay 1 --retry-connrefused \
      --connect-timeout 10 --max-time 300 \
      "$download_url" -o "$download_dest" 2>/dev/null; then
      download_success=1
    fi
  elif command -v wget >/dev/null 2>&1; then
    if wget -q --tries=4 --timeout=30 -O "$download_dest" "$download_url" 2>/dev/null; then
      download_success=1
    fi
  fi

  if [ "$download_success" -eq 1 ]; then
    return 0
  else
    return 1
  fi
}

# Resolve the only supported target: R2's latest release pointer.
get_latest_version() {
  local latest=""
  if command -v curl >/dev/null 2>&1; then
    latest=$(curl -sSfL --retry 3 --retry-delay 1 --retry-connrefused \
      --connect-timeout 10 --max-time 30 \
      "${CAELIS_RELEASES_BASE_URL}/latest.txt" 2>/dev/null) || true
  elif command -v wget >/dev/null 2>&1; then
    latest=$(wget -q --tries=4 --timeout=30 -O - \
      "${CAELIS_RELEASES_BASE_URL}/latest.txt" 2>/dev/null) || true
  else
    echo "Error: curl or wget is required to install caelis." >&2
    return 1
  fi

  latest=$(printf '%s' "${latest}" | tr -d '\r\n')
  if [[ ! "${latest}" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[^/[:space:]]+)?$ ]]; then
    return 1
  fi
  printf '%s' "${latest}"
}

# Helper to verify sha256 checksum
verify_checksum() {
  local archive_file="$1"
  local checksums_file="$2"
  
  local expected_hash
  expected_hash=$(grep "${archive_file}" "${checksums_file}" | awk '{print $1}')
  if [ -z "${expected_hash}" ]; then
    echo "Error: Checksum for ${archive_file} not found in checksums.txt" >&2
    exit 1
  fi
  
  local actual_hash=""
  if command -v sha256sum >/dev/null 2>&1; then
    actual_hash=$(sha256sum "${archive_file}" | awk '{print $1}')
  elif command -v shasum >/dev/null 2>&1; then
    actual_hash=$(shasum -a 256 "${archive_file}" | awk '{print $1}')
  elif command -v openssl >/dev/null 2>&1; then
    actual_hash=$(openssl dgst -sha256 "${archive_file}" | sed 's/^.*= //')
  else
    echo "Error: No command found to verify checksum (need sha256sum, shasum, or openssl)." >&2
    exit 1
  fi
  
  if [ "${expected_hash}" != "${actual_hash}" ]; then
    echo "Error: Checksum verification failed for ${archive_file}!" >&2
    echo "Expected: ${expected_hash}" >&2
    echo "Actual:   ${actual_hash}" >&2
    exit 1
  fi
  echo "Checksum verification passed."
}

# Detect OS and Arch
OS_RAW=$(uname -s)
ARCH_RAW=$(uname -m)

case "${OS_RAW}" in
  Darwin) OS="darwin" ;;
  Linux)  OS="linux" ;;
  *)
    echo "Error: Unsupported operating system: ${OS_RAW}" >&2
    exit 1
    ;;
esac

case "${ARCH_RAW}" in
  x86_64|amd64) ARCH="amd64" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *)
    echo "Error: Unsupported architecture: ${ARCH_RAW}" >&2
    exit 1
    ;;
esac

echo "Checking the latest R2 release version of caelis..."
if ! CAELIS_VERSION=$(get_latest_version); then
  echo "Error: Could not retrieve a valid latest release from ${CAELIS_RELEASES_BASE_URL}/latest.txt" >&2
  exit 1
fi
VERSION_NUM="${CAELIS_VERSION#v}"

echo "Installing caelis ${CAELIS_VERSION} for ${OS}_${ARCH}..."

# Setup temporary directory and automatic cleanup
TMP_DIR=$(mktemp -d 2>/dev/null || echo "/tmp/caelis-install")
mkdir -p "${TMP_DIR}"
cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

TARBALL_NAME="caelis_${VERSION_NUM}_${OS}_${ARCH}.tar.gz"
DOWNLOAD_URL="${CAELIS_RELEASES_BASE_URL}/releases/${CAELIS_VERSION}/${TARBALL_NAME}"
CHECKSUMS_URL="${CAELIS_RELEASES_BASE_URL}/releases/${CAELIS_VERSION}/checksums.txt"

# Perform download and verification
echo "Downloading ${TARBALL_NAME}..."
if ! download_file "${DOWNLOAD_URL}" "${TMP_DIR}/${TARBALL_NAME}"; then
  echo "Error: Failed to download caelis ${CAELIS_VERSION} for ${OS}_${ARCH} from R2." >&2
  exit 1
fi

if ! download_file "${CHECKSUMS_URL}" "${TMP_DIR}/checksums.txt"; then
  echo "Error: Failed to download checksums from ${CHECKSUMS_URL}" >&2
  exit 1
fi

# Move to temp directory for extraction and verification
cd "${TMP_DIR}"
verify_checksum "${TARBALL_NAME}" "checksums.txt"

# Extract archive
echo "Extracting caelis..."
tar -xzf "${TARBALL_NAME}"

# Ensure target directory exists and is writable
if [ ! -d "${CAELIS_INSTALL_DIR}" ]; then
  mkdir -p "${CAELIS_INSTALL_DIR}" 2>/dev/null || true
fi

if [ ! -w "${CAELIS_INSTALL_DIR}" ]; then
  echo "Error: Installation directory '${CAELIS_INSTALL_DIR}' is not writable." >&2
  echo "Please choose a directory where you have write permissions by setting CAELIS_INSTALL_DIR," >&2
  echo "or run this script with elevated permissions (e.g. using sudo)." >&2
  exit 1
fi

# Install executable
echo "Installing to ${CAELIS_INSTALL_DIR}/caelis..."
# Use .old backup strategy if binary is currently locked (especially on Windows MSYS environments)
if [ -f "${CAELIS_INSTALL_DIR}/caelis" ]; then
  rm -f "${CAELIS_INSTALL_DIR}/caelis.old" 2>/dev/null || true
  if ! mv -f caelis "${CAELIS_INSTALL_DIR}/caelis" 2>/dev/null; then
    mv -f "${CAELIS_INSTALL_DIR}/caelis" "${CAELIS_INSTALL_DIR}/caelis.old" 2>/dev/null || true
    if ! mv -f caelis "${CAELIS_INSTALL_DIR}/caelis" 2>/dev/null; then
      # Rollback
      mv -f "${CAELIS_INSTALL_DIR}/caelis.old" "${CAELIS_INSTALL_DIR}/caelis" 2>/dev/null || true
      echo "Error: Failed to install caelis executable to ${CAELIS_INSTALL_DIR}" >&2
      exit 1
    fi
  fi
else
  mv -f caelis "${CAELIS_INSTALL_DIR}/caelis"
fi

chmod +x "${CAELIS_INSTALL_DIR}/caelis"

# Clean up
cd - >/dev/null

echo "caelis has been installed successfully!"

# Check and update PATH
path_has_dir() {
  case ":$PATH:" in *":$1:"*) return 0 ;; *) return 1 ;; esac
}

if path_has_dir "${CAELIS_INSTALL_DIR}"; then
  PATH_OK=true
else
  PATH_OK=false
fi

if [ "$PATH_OK" = "false" ]; then
  user_shell="$(basename "${SHELL:-}")"
  config_file=""

  case "$user_shell" in
    bash) config_file="$HOME/.bashrc" ;;
    zsh)  config_file="$HOME/.zshrc" ;;
    fish) config_file="$HOME/.config/fish/config.fish" ;;
  esac

  if [ -n "$config_file" ]; then
    mkdir -p "$(dirname "$config_file")" 2>/dev/null || true

    if [ "$user_shell" = "fish" ]; then
      new_block="# >>> caelis installer >>>
fish_add_path $CAELIS_INSTALL_DIR
# <<< caelis installer <<<"
    else
      new_block="# >>> caelis installer >>>
export PATH=\"$CAELIS_INSTALL_DIR:\$PATH\"
# <<< caelis installer <<<"
    fi

    # Replace existing block if it already exists
    if grep -qs "caelis installer" "$config_file" 2>/dev/null; then
      tmp="$config_file.tmp.$$"
      awk -v skip=0 '
        /# >>> caelis installer >>>/ { skip=1; next }
        /# <<< caelis installer <<</ { skip=0; next }
        !skip { print }
      ' "$config_file" > "$tmp" && mv "$tmp" "$config_file"
    else
      # Backup original config
      [ -f "$config_file" ] && cp "$config_file" "$config_file.bak.$(date +%s)"

      # macOS bash: ensure bash_profile sources bashrc
      if [ "$user_shell" = "bash" ] && [ "$(uname -s)" = "Darwin" ]; then
        if [ -f "$HOME/.bash_profile" ] && ! grep -qs "source ~/.bashrc" "$HOME/.bash_profile"; then
          printf '\n[[ -r ~/.bashrc ]] && source ~/.bashrc\n' >> "$HOME/.bash_profile"
        fi
      fi
    fi

    printf '\n%s\n' "$new_block" >> "$config_file"
    echo "  Added ${CAELIS_INSTALL_DIR} to PATH in ${config_file}."
    echo "  Please run 'source ${config_file}' or restart your terminal to apply changes."
  else
    echo ""
    echo "Warning: '${CAELIS_INSTALL_DIR}' is not in your PATH." >&2
    echo "You may need to add it manually to your shell profile (e.g., ~/.bashrc, ~/.zshrc, or ~/.profile):" >&2
    echo "  export PATH=\"\$PATH:${CAELIS_INSTALL_DIR}\"" >&2
  fi
fi

echo ""
echo "Verifying installation:"
if [ -x "${CAELIS_INSTALL_DIR}/caelis" ]; then
  echo "caelis is executable."
  echo "Installed version: ${CAELIS_VERSION}"
  echo "Run 'caelis --help' to get started."
else
  echo "Error: Installation verification failed. '${CAELIS_INSTALL_DIR}/caelis' is not executable." >&2
  exit 1
fi
