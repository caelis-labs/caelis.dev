# caelis installation script for Windows.
# GitHub: https://github.com/caelis-labs/caelis

param(
    [Parameter(Position = 0)]
    [string]$Version
)

$ErrorActionPreference = "Stop"

# PS 5.1 defaults to TLS 1.0; GitHub requires TLS 1.2.
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

# PS 5.1's Invoke-WebRequest progress bar is extremely slow; disable it.
$ProgressPreference = 'SilentlyContinue'

# Accept version from environment variable (useful with irm | iex).
if (-not $Version -and $env:CAELIS_VERSION) {
    $Version = $env:CAELIS_VERSION
}

# Validate version format if specified
if ($Version -and $Version -notmatch '^v?\d+\.\d+\.\d+(-\S+)?$') {
    Write-Error "Invalid version format: $Version (expected [v]X.Y.Z or [v]X.Y.Z-suffix)"
    exit 1
}

# Configuration
$DefaultInstallDir = "$env:LOCALAPPDATA\Programs\caelis\bin"
$InstallDir = $env:CAELIS_INSTALL_DIR
if (-not $InstallDir) {
    $InstallDir = $DefaultInstallDir
}

# --- Helpers ---

function Download-String([string]$Url) {
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -UserAgent "Mozilla/5.0"
        return $response.Content
    } catch {
        return $null
    }
}

function Download-File([string]$Url, [string]$OutFile) {
    # Stream via HttpWebRequest — faster than Invoke-WebRequest on PS 5.1 and supports progress.
    $request = [System.Net.HttpWebRequest]::Create($Url)
    $request.Timeout = 300000  # 5 min
    $request.AutomaticDecompression = [System.Net.DecompressionMethods]::GZip -bor [System.Net.DecompressionMethods]::Deflate
    $request.UserAgent = "Mozilla/5.0"
    $response = $request.GetResponse()
    $totalBytes = $response.ContentLength
    $stream = $response.GetResponseStream()
    $fileStream = [System.IO.File]::Create($OutFile)
    $buffer = New-Object byte[] 65536
    $totalRead = 0
    $lastPercent = -1
    $lastMb = -1

    try {
        while (($read = $stream.Read($buffer, 0, $buffer.Length)) -gt 0) {
            $fileStream.Write($buffer, 0, $read)
            $totalRead += $read
            $mb = [math]::Round($totalRead / 1MB, 1)
            if ($totalBytes -gt 0) {
                $percent = [math]::Min(100, [math]::Floor(($totalRead / $totalBytes) * 100))
                if ($percent -ne $lastPercent) {
                    $totalMb = [math]::Round($totalBytes / 1MB, 1)
                    Write-Host "`r  Downloading... ${mb} MB / ${totalMb} MB (${percent}%)" -NoNewline
                    $lastPercent = $percent
                }
            } elseif ($mb -ne $lastMb) {
                Write-Host "`r  Downloading... ${mb} MB" -NoNewline
                $lastMb = $mb
            }
        }
        Write-Host ''
    } finally {
        $fileStream.Close()
        $stream.Close()
        $response.Close()
    }
}

# Resolve Version
$CaelisVersion = $Version
if (-not $CaelisVersion) {
    Write-Host "Checking the latest release version of caelis..."
    try {
        # Try getting version from GitHub redirects
        $Response = Invoke-WebRequest -Uri "https://github.com/caelis-labs/caelis/releases/latest" -MaximumRedirection 5 -UserAgent "Mozilla/5.0"
        $LatestUrl = $Response.BaseResponse.ResponseUri.AbsoluteUri
        $CaelisVersion = $LatestUrl.Substring($LatestUrl.LastIndexOf('/') + 1)
    } catch {
        # Fallback to GitHub API
        try {
            $ApiUrl = "https://api.github.com/repos/caelis-labs/caelis/releases/latest"
            $Json = Invoke-RestMethod -Uri $ApiUrl -UserAgent "Mozilla/5.0"
            $CaelisVersion = $Json.tag_name
        } catch {
            Write-Error "Could not retrieve the latest release version automatically."
            exit 1
        }
    }
}

# Ensure version format
if ($CaelisVersion.StartsWith("v")) {
    $VersionNum = $CaelisVersion.Substring(1)
} else {
    $VersionNum = $CaelisVersion
    $CaelisVersion = "v$CaelisVersion"
}

# Detect Arch
$ArchRaw = $env:PROCESSOR_ARCHITECTURE
$Arch = "amd64"
if ($env:PROCESSOR_ARCHITEW6432 -eq "ARM64" -or $ArchRaw -eq "ARM64") {
    $Arch = "arm64"
} elseif ($env:PROCESSOR_ARCHITEW6432 -eq "AMD64" -or $ArchRaw -eq "AMD64") {
    $Arch = "amd64"
}

Write-Host "Installing caelis $CaelisVersion for windows_$Arch..."

# Setup temporary directory
$TempDir = Join-Path $env:TEMP "caelis-install"
if (-not (Test-Path $TempDir)) {
    New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
}

$TarballName = "caelis_${VersionNum}_windows_${Arch}.tar.gz"
$DownloadUrl = "https://github.com/caelis-labs/caelis/releases/download/${CaelisVersion}/${TarballName}"
$ChecksumsUrl = "https://github.com/caelis-labs/caelis/releases/download/${CaelisVersion}/checksums.txt"

$TarballPath = Join-Path $TempDir $TarballName
$ChecksumsPath = Join-Path $TempDir "checksums.txt"

# Download archive and checksums
try {
    Write-Host "Downloading $TarballName..."
    Download-File $DownloadUrl $TarballPath
    Download-File $ChecksumsUrl $ChecksumsPath
} catch {
    # Cleanup on failure
    if (Test-Path $TarballPath) { Remove-Item $TarballPath -Force }
    if (Test-Path $ChecksumsPath) { Remove-Item $ChecksumsPath -Force }
    
    # Check if release page exists, providing better context for 404s
    $headers = [System.Net.HttpWebRequest]::Create($DownloadUrl)
    $headers.Method = "HEAD"
    $headers.UserAgent = "Mozilla/5.0"
    try {
        $resp = $headers.GetResponse()
        $resp.Close()
        Write-Error "Failed to download release assets. Please check your internet connection."
    } catch {
        if ($_.Exception.InnerException -and $_.Exception.InnerException.Message -like "*404*") {
            Write-Error "Error: caelis $CaelisVersion is not yet available for windows_$Arch."
        } else {
            Write-Error "Failed to download release assets. URL: $DownloadUrl. Error: $_"
        }
    }
    exit 1
}

# Verify SHA256 checksum
try {
    $ChecksumsContent = Get-Content $ChecksumsPath
    $ExpectedLine = $ChecksumsContent | Where-Object { $_ -like "*$TarballName" }
    if (-not $ExpectedLine) {
        Write-Error "Checksum for $TarballName not found in checksums.txt"
        exit 1
    }
    $ExpectedHash = ($ExpectedLine -split "\s+")[0].ToLower()
    $ActualHash = (Get-FileHash -Path $TarballPath -Algorithm SHA256).Hash.ToLower()

    if ($ExpectedHash -ne $ActualHash) {
        Write-Error "Checksum verification failed for $TarballName!"
        Write-Error "Expected: $ExpectedHash"
        Write-Error "Actual:   $ActualHash"
        exit 1
    }
    Write-Host "Checksum verification passed."
} catch {
    Write-Error "Error verifying file checksum: $_"
    exit 1
}

# Create installation directory
if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
}

# Extract executable to temporary directory first, then copy safely
$TarCommand = Get-Command "tar.exe" -ErrorAction SilentlyContinue
if ($TarCommand) {
    Write-Host "Extracting caelis..."
    try {
        # Extract files to TempDir
        tar.exe -xf $TarballPath -C $TempDir
    } catch {
        Write-Error "Extraction failed using tar.exe: $_"
        exit 1
    }
} else {
    Write-Error "tar.exe is not available on this system (Windows 10 17063+ has it built-in)."
    Write-Error "Please install caelis via npm: npm i -g @caelis/caelis"
    exit 1
}

# Ensure we locate caelis.exe from TempDir
$ExtractedExe = Join-Path $TempDir "caelis.exe"
if (-not (Test-Path $ExtractedExe)) {
    $FoundExe = Get-ChildItem -Path $TempDir -Filter "caelis.exe" -Recurse | Select-Object -First 1
    if ($FoundExe) {
        $ExtractedExe = $FoundExe.FullName
    } else {
        Write-Error "Could not find caelis.exe after extraction."
        exit 1
    }
}

# Install executable (locked-file safe)
$dest = Join-Path $InstallDir "caelis.exe"
$old = "$dest.old"

if (Test-Path $old) { Remove-Item $old -Force -ErrorAction SilentlyContinue }

try {
    Copy-Item -Path $ExtractedExe -Destination $dest -Force
} catch {
    try {
        if (Test-Path $dest) { Rename-Item $dest $old -Force -ErrorAction SilentlyContinue }
        Copy-Item -Path $ExtractedExe -Destination $dest -Force
    } catch {
        if (Test-Path $old) { Rename-Item $old $dest -Force -ErrorAction SilentlyContinue }
        Write-Error "Failed to install caelis.exe. The executable might be locked by another running process."
        exit 1
    }
}

# Cleanup temporary files
try {
    Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
} catch {}

Write-Host "caelis has been installed successfully!" -ForegroundColor Green

# Check and update User PATH
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$PathList = if ($userPath) { $userPath -split ";" } else { @() }
$IsInPath = $false
foreach ($P in $PathList) {
    if ($P.TrimEnd('\') -eq $InstallDir.TrimEnd('\')) {
        $IsInPath = $true
        break
    }
}

if (-not $IsInPath) {
    $newPath = (@($InstallDir) + $PathList) -join ';'
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "  Added $InstallDir to your User PATH." -ForegroundColor DarkGray
    
    # Update current session so caelis works immediately.
    if ($env:Path -notlike "*$InstallDir*") {
        $env:Path = "$InstallDir;$env:Path"
    }
}

# Verify run
Write-Host "`nVerifying installation:"
$FinalExePath = Join-Path $InstallDir "caelis.exe"
if (Test-Path $FinalExePath) {
    Write-Host "caelis.exe is installed."
    Write-Host "Installed version: $CaelisVersion"
    Write-Host "Run 'caelis --help' to get started."
} else {
    Write-Error "Installation verification failed: caelis.exe not found at $FinalExePath"
    exit 1
}
