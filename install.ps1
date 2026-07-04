# caelis installation script for Windows.
# GitHub: https://github.com/caelis-labs/caelis

$ErrorActionPreference = "Stop"

# Configuration
$DefaultInstallDir = "$env:LOCALAPPDATA\Programs\caelis\bin"
$InstallDir = $env:CAELIS_INSTALL_DIR
if (-not $InstallDir) {
    $InstallDir = $DefaultInstallDir
}

# Resolve Version
$CaelisVersion = $env:CAELIS_VERSION
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
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $TarballPath -UserAgent "Mozilla/5.0"
    Invoke-WebRequest -Uri $ChecksumsUrl -OutFile $ChecksumsPath -UserAgent "Mozilla/5.0"
} catch {
    Write-Error "Failed to download release assets. Please check your internet connection or if the version $CaelisVersion exists."
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

# Extract executable
$TarCommand = Get-Command "tar.exe" -ErrorAction SilentlyContinue
if ($TarCommand) {
    Write-Host "Extracting caelis..."
    try {
        tar.exe -xf $TarballPath -C $InstallDir
    } catch {
        Write-Error "Extraction failed using tar.exe: $_"
        exit 1
    }
} else {
    Write-Error "tar.exe is not available on this system (Windows 10 17063+ has it built-in)."
    Write-Error "Please install caelis via npm: npm i -g @caelis/caelis"
    exit 1
}

# Ensure caelis.exe is in the root of InstallDir
$ExePath = Join-Path $InstallDir "caelis.exe"
if (-not (Test-Path $ExePath)) {
    $FoundExe = Get-ChildItem -Path $InstallDir -Filter "caelis.exe" -Recurse | Select-Object -First 1
    if ($FoundExe) {
        if ($FoundExe.DirectoryName -ne $InstallDir) {
            Move-Item -Path $FoundExe.FullName -Destination $InstallDir -Force
        }
    } else {
        Write-Error "Could not find caelis.exe after extraction."
        exit 1
    }
}

# Cleanup temporary files
try {
    Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
} catch {}

Write-Host "caelis has been installed successfully!" -ForegroundColor Green

# Check PATH
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
$PathList = $UserPath -split ";"
$IsInPath = $false
foreach ($P in $PathList) {
    if ($P.TrimEnd('\') -eq $InstallDir.TrimEnd('\')) {
        $IsInPath = $true
        break
    }
}

if (-not $IsInPath) {
    Write-Host "`nWarning: The installation directory '$InstallDir' is not in your PATH." -ForegroundColor Yellow
    Write-Host "To execute 'caelis' from any command prompt, add it to your User PATH."
    Write-Host "You can do this by running the following command in PowerShell:" -ForegroundColor Cyan
    Write-Host "  [Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', 'User') + ';$InstallDir', 'User')" -ForegroundColor Cyan
    Write-Host "Note: You will need to restart your terminal for changes to take effect."
}

# Verify run
Write-Host "`nVerifying installation:"
$FinalExePath = Join-Path $InstallDir "caelis.exe"
if (Test-Path $FinalExePath) {
    Write-Host "caelis.exe is installed."
    Write-Host "Installed version: $CaelisVersion"
    Write-Host "Run '$FinalExePath --help' to get started."
} else {
    Write-Error "Installation verification failed: caelis.exe not found at $FinalExePath"
    exit 1
}
