#!/bin/sh

# caelis installation script for macOS and Linux.
# GitHub: https://github.com/caelis-labs/caelis

set -e

# Configuration
DEFAULT_INSTALL_DIR="$HOME/.local/bin"
CAELIS_INSTALL_DIR="${CAELIS_INSTALL_DIR:-$DEFAULT_INSTALL_DIR}"

# Helper to download files using curl or wget
download_file() {
  download_url="$1"
  download_dest="$2"
  download_success=0

  if command -v curl >/dev/null 2>&1; then
    if curl -sSfL "$download_url" -o "$download_dest"; then
      download_success=1
    fi
  fi

  if [ "$download_success" -eq 0 ] && command -v wget >/dev/null 2>&1; then
    if wget -q -O "$download_dest" "$download_url"; then
      download_success=1
    fi
  fi

  if [ "$download_success" -eq 0 ]; then
    echo "Error: Failed to download ${download_url} using curl and wget." >&2
    exit 1
  fi
}

# Helper to get latest release tag from GitHub without hitting API rate limits
get_latest_version() {
  # 1. Check curl availability first
  if command -v curl >/dev/null 2>&1; then
    # Try getting the tag via GitHub redirect
    latest_redir_url=$(curl -sSfL -o /dev/null -w '%{url_effective}' https://github.com/caelis-labs/caelis/releases/latest 2>/dev/null || true)
    if [ -n "${latest_redir_url}" ] && [ "${latest_redir_url}" != "https://github.com/caelis-labs/caelis/releases/latest" ]; then
      printf '%s' "${latest_redir_url}" | sed 's|.*/||'
      return 0
    fi

    # Fallback to GitHub API
    api_response=$(curl -sSf https://api.github.com/repos/caelis-labs/caelis/releases/latest 2>/dev/null || true)
    if [ -n "${api_response}" ]; then
      printf '%s' "${api_response}" | grep '"tag_name":' | sed -E 's/.*"tag_name":\s*"(v[^"]+)".*/\1/'
      return 0
    fi
  fi

  # 2. Fallback to wget redirect capture
  if command -v wget >/dev/null 2>&1; then
    latest_redir_url=$(wget --max-redirect=0 https://github.com/caelis-labs/caelis/releases/latest 2>&1 | grep -Ei "Location:|位置:" | awk '{print $2}' || true)
    if [ -n "${latest_redir_url}" ]; then
      printf '%s' "${latest_redir_url}" | sed 's|.*/||'
      return 0
    fi
  fi

  return 1
}

# Helper to verify sha256 checksum
verify_checksum() {
  archive_file="$1"
  checksums_file="$2"
  
  expected_hash=$(grep "${archive_file}" "${checksums_file}" | awk '{print $1}')
  if [ -z "${expected_hash}" ]; then
    echo "Error: Checksum for ${archive_file} not found in checksums.txt" >&2
    exit 1
  fi
  
  actual_hash=""
  if command -v sha256sum >/dev/null 2>&1; then
    actual_hash=$(sha256sum "${archive_file}" | awk '{print $1}')
  elif command -v shasum >/dev/null 2>&1; then
    actual_hash=$(shasum -a 256 "${archive_file}" | awk '{print $1}')
  elif command -v openssl >/dev/null 2>&1; then
    actual_hash=$(openssl dgst -sha256 "${archive_file}" | sed 's/^.*= //')
  else
    echo "Warning: No command found to verify checksum (need sha256sum, shasum, or openssl). Skipping verification." >&2
    return 0
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

# Resolve Version
if [ -z "${CAELIS_VERSION}" ]; then
  echo "Checking the latest release version of caelis..."
  CAELIS_VERSION=$(get_latest_version)
  if [ -z "${CAELIS_VERSION}" ]; then
    echo "Error: Could not retrieve the latest release version." >&2
    exit 1
  fi
fi

# Ensure version format
if [ "${CAELIS_VERSION#v}" = "${CAELIS_VERSION}" ]; then
  VERSION_NUM="${CAELIS_VERSION}"
  CAELIS_VERSION="v${CAELIS_VERSION}"
else
  VERSION_NUM="${CAELIS_VERSION#v}"
fi

echo "Installing caelis ${CAELIS_VERSION} for ${OS}_${ARCH}..."

# Setup temporary directory
TMP_DIR=$(mktemp -d 2>/dev/null || echo "/tmp/caelis-install")
mkdir -p "${TMP_DIR}"

TARBALL_NAME="caelis_${VERSION_NUM}_${OS}_${ARCH}.tar.gz"
DOWNLOAD_URL="https://github.com/caelis-labs/caelis/releases/download/${CAELIS_VERSION}/${TARBALL_NAME}"
CHECKSUMS_URL="https://github.com/caelis-labs/caelis/releases/download/${CAELIS_VERSION}/checksums.txt"

# Perform download and verification
echo "Downloading ${TARBALL_NAME}..."
download_file "${DOWNLOAD_URL}" "${TMP_DIR}/${TARBALL_NAME}"
download_file "${CHECKSUMS_URL}" "${TMP_DIR}/checksums.txt"

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
mv caelis "${CAELIS_INSTALL_DIR}/caelis"
chmod +x "${CAELIS_INSTALL_DIR}/caelis"

# Clean up
cd - >/dev/null
rm -rf "${TMP_DIR}"

echo "caelis has been installed successfully!"

# Check PATH
case :$PATH: in
  *:"${CAELIS_INSTALL_DIR}":*) ;;
  *)
    echo ""
    echo "Warning: '${CAELIS_INSTALL_DIR}' is not in your PATH." >&2
    echo "You may need to add it to your shell profile (e.g., ~/.bashrc, ~/.zshrc, or ~/.profile):" >&2
    echo "  export PATH=\"\$PATH:${CAELIS_INSTALL_DIR}\"" >&2
    ;;
esac

echo ""
echo "Verifying installation:"
if [ -x "${CAELIS_INSTALL_DIR}/caelis" ]; then
  echo "caelis is executable."
  echo "Installed version: ${CAELIS_VERSION}"
  echo "Run '${CAELIS_INSTALL_DIR}/caelis --help' to get started."
else
  echo "Error: Installation verification failed. '${CAELIS_INSTALL_DIR}/caelis' is not executable." >&2
  exit 1
fi
