#Requires -Version 5.1
<#
  Clears your user TEMP folders and npm cache to free disk space.
  Files in use will be skipped (harmless). Run PowerShell as Administrator
  only if you also want to try clearing C:\Windows\Temp (optional block below).
#>
$ErrorActionPreference = 'SilentlyContinue'

function Get-FreeGB([char]$Drive = 'C') {
  $d = Get-PSDrive -Name $Drive -ErrorAction SilentlyContinue
  if (-not $d) { return $null }
  return [math]::Round($d.Free / 1GB, 2)
}

$before = Get-FreeGB 'C'
Write-Host "C: free before: $($before) GB"

$userTempPaths = @(
  $env:TEMP
  (Join-Path $env:LOCALAPPDATA 'Temp')
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -Unique

foreach ($p in $userTempPaths) {
  Write-Host "Cleaning: $p"
  Get-ChildItem -LiteralPath $p -Force -ErrorAction SilentlyContinue |
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
  Write-Host "npm cache clean --force"
  npm cache clean --force 2>$null
}

# Optional: Windows system temp (often needs Admin; many files stay locked)
$winTemp = Join-Path $env:SystemRoot 'Temp'
if ((Test-Path $winTemp) -and ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host "Cleaning (elevated): $winTemp"
  Get-ChildItem -LiteralPath $winTemp -Force -ErrorAction SilentlyContinue |
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

$after = Get-FreeGB 'C'
Write-Host "C: free after:  $($after) GB"
Write-Host "Done. Close browsers / dev servers and run again if you need more freed."
