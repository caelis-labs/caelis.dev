$ErrorActionPreference = 'Stop'

# Load the production replacement function without downloads or PATH changes.
$scriptPath = Join-Path (Split-Path -Parent $PSScriptRoot) 'install.ps1'
$tokens = $null
$errors = $null
$ast = [Management.Automation.Language.Parser]::ParseFile($scriptPath, [ref]$tokens, [ref]$errors)
if ($errors.Count) { throw "Installer parse errors: $errors" }
$function = $ast.Find({
    param($node)
    $node -is [Management.Automation.Language.FunctionDefinitionAst] -and $node.Name -eq 'Install-Executable'
}, $true)
if (-not $function) { throw 'Missing production Install-Executable function' }
. ([scriptblock]::Create($function.Extent.Text))

$root = Join-Path ([IO.Path]::GetTempPath()) ('caelis-installer-test-' + [Guid]::NewGuid().ToString('N'))
$root = [IO.Path]::GetFullPath($root)
$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
if (-not $root.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) { throw 'Invalid test directory' }
New-Item -ItemType Directory -Path $root | Out-Null
$processes = @()
try {
    $installDir = Join-Path $root 'install [test] directory'
    New-Item -ItemType Directory -Path $installDir | Out-Null
    $dest = Join-Path $installDir 'caelis.exe'
    $source = Join-Path $root 'replacement.exe'
    Copy-Item -LiteralPath "$env:WINDIR\System32\ping.exe" -Destination $source
    $expectedHash = (Get-FileHash -LiteralPath $source).Hash

    # Model the fixed backup left by the previous installer, still in use.
    $legacy = "$dest.old"
    Copy-Item -LiteralPath $source -Destination $dest
    $processes += Start-Process -FilePath $dest -ArgumentList @('-t', '127.0.0.1') -WindowStyle Hidden -PassThru
    Rename-Item -LiteralPath $dest -NewName 'caelis.exe.old'

    foreach ($round in 1..3) {
        Install-Executable $source $dest
        if ((Get-FileHash -LiteralPath $dest).Hash -ne $expectedHash) { throw "Wrong artifact in round $round" }
        # Immediate execution of each replacement must work while every older
        # process remains alive, including the legacy fixed-name backup.
        $probe = Start-Process -FilePath $dest -ArgumentList @('-n', '1', '127.0.0.1') -WindowStyle Hidden -PassThru
        if (-not $probe.WaitForExit(5000)) { $probe.Kill(); throw 'Replacement did not finish' }
        if ($probe.ExitCode -ne 0) { throw "Replacement exited with $($probe.ExitCode)" }
        $processes += Start-Process -FilePath $dest -ArgumentList @('-t', '127.0.0.1') -WindowStyle Hidden -PassThru
        foreach ($process in $processes) {
            if ($process.HasExited) { throw 'Installer stopped an older process' }
        }
    }
    $backups = @(Get-ChildItem -LiteralPath $installDir -File | Where-Object { $_.Name -like 'caelis.exe.old*' })
    if ($backups.Count -ne 3) { throw "Expected 3 retained backups, got $($backups.Count)" }

    # A failed staging copy must preserve the installed artifact.
    $failed = $false
    try { Install-Executable (Join-Path $root 'missing.exe') $dest } catch { $failed = $true }
    if (-not $failed -or (Get-FileHash -LiteralPath $dest).Hash -ne $expectedHash) { throw 'Copy failure damaged the installation' }

    # Force publication to fail after the current image has been renamed.
    # All real file operations, including rollback, still use the native cmdlet.
    function Rename-Item {
        [CmdletBinding()]
        param([string]$LiteralPath, [string]$NewName)
        if ((Split-Path -Leaf $LiteralPath) -like '.caelis.exe.install-*') {
            throw 'Injected publication failure'
        }
        Microsoft.PowerShell.Management\Rename-Item @PSBoundParameters
    }
    try {
        $failed = $false
        try { Install-Executable $source $dest } catch { $failed = $true }
        if (-not $failed -or (Get-FileHash -LiteralPath $dest).Hash -ne $expectedHash) { throw 'Publication failure did not restore the installation' }
        $staging = @(Get-ChildItem -LiteralPath $installDir -File | Where-Object { $_.Name -like '.caelis.exe.install-*' })
        if ($staging.Count) { throw 'Publication failure left a staged executable' }
    } finally {
        Remove-Item -LiteralPath Function:\Rename-Item
    }

    # Closing the windows allows the next installation to reclaim old files.
    foreach ($process in $processes) { $process.Kill(); $process.WaitForExit() }
    Install-Executable $source $dest
    $leftovers = @(Get-ChildItem -LiteralPath $installDir -File | Where-Object { $_.Name -ne 'caelis.exe' })
    if ($leftovers.Count) { throw "Installer left unused files: $leftovers" }
    Write-Host 'PASS: repeated locked updates, legacy backup, immediate execution, failed staging, rollback, and cleanup'
} finally {
    foreach ($process in $processes) {
        if (-not $process.HasExited) { $process.Kill(); $process.WaitForExit() }
    }
    Remove-Item -LiteralPath $root -Recurse -Force
}
