# Switch the site's public address everywhere it appears
# (canonical links, social tags, structured data, sitemap, robots.txt).
#
# Usage, from the portfolio folder:
#   powershell -ExecutionPolicy Bypass -File tools\set-site-url.ps1 -NewUrl https://peterodongo.com/
param(
  [Parameter(Mandatory = $true)][string]$NewUrl,
  [string]$OldUrl = 'https://peteragakodongo.vercel.app/'
)
if (-not $NewUrl.EndsWith('/')) { $NewUrl += '/' }
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding $false
$count = 0
Get-ChildItem -Path $root -Recurse -Include *.html, *.xml, *.txt |
  Where-Object { $_.FullName -notmatch '\\(media|\.git|tools)\\' } |
  ForEach-Object {
    $text = [IO.File]::ReadAllText($_.FullName, $utf8)
    if ($text.Contains($OldUrl)) {
      [IO.File]::WriteAllText($_.FullName, $text.Replace($OldUrl, $NewUrl), $utf8)
      $count++
      Write-Host "updated $($_.Name)"
    }
  }
Write-Host "$count files now point to $NewUrl"
Write-Host "Next time, run with -OldUrl $NewUrl to switch again."
