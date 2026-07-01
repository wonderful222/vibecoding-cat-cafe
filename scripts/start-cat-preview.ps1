param(
  [switch]$Open
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$LogDir = Join-Path $ProjectRoot ".tmp"
$OutLog = Join-Path $LogDir "next-start.out.log"
$ErrLog = Join-Path $LogDir "next-start.err.log"
$HealthUrl = "http://localhost:3000/cats"

function Test-PreviewReady {
  try {
    $response = Invoke-WebRequest -Uri $HealthUrl -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

Set-Location $ProjectRoot
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

if (-not (Test-Path (Join-Path $ProjectRoot ".next"))) {
  npm run build
}

if (-not (Test-PreviewReady)) {
  Start-Process -FilePath "npm.cmd" `
    -ArgumentList "start" `
    -WorkingDirectory $ProjectRoot `
    -RedirectStandardOutput $OutLog `
    -RedirectStandardError $ErrLog `
    -WindowStyle Hidden
}

$deadline = (Get-Date).AddSeconds(20)
while ((Get-Date) -lt $deadline) {
  if (Test-PreviewReady) {
    if ($Open) {
      Start-Process $HealthUrl
    }
    Write-Host "TanHaoMao preview is ready: $HealthUrl"
    exit 0
  }
  Start-Sleep -Milliseconds 500
}

Write-Host "TanHaoMao preview did not become ready. Check logs:"
Write-Host $OutLog
Write-Host $ErrLog
exit 1
