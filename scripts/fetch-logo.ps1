$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$dir = 'c:\Users\nuke\Documents\ivorysilk\frontend\public'
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

$prompt = 'luxury minimalist monogram logo, intertwined letters I and S, thin gold foil line art, cream ivory background, high-end fashion house emblem, no text, vector clean lines, elegant serif strokes, square format'
$encoded = [uri]::EscapeDataString($prompt)
$sizes = @('square_hd', 'square', 'portrait_4_3', 'landscape_4_3')

# Known placeholder signature: the "still generating" page has these literal substrings
$placeholderMarkers = @('image is generating', 'refresh page', '__N_SSP')

$out = Join-Path $dir 'logo.png'
$success = $false

foreach ($size in $sizes) {
    $url = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=$encoded&image_size=$size"
    for ($i = 1; $i -le 3; $i++) {
        try {
            Write-Output "Attempt $i  size=$size ..."
            Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 60

            $info = Get-Item $out
            $isPlaceholder = $false
            $bytes = [IO.File]::ReadAllBytes($out)
            $head = [System.Text.Encoding]::ASCII.GetString($bytes, 0, [Math]::Min(4096, $bytes.Length))
            foreach ($m in $placeholderMarkers) {
                if ($head -like "*$m*") { $isPlaceholder = $true; break }
            }

            Write-Output ("  size=" + $info.Length + " bytes  isPlaceholder=" + $isPlaceholder)
            if (-not $isPlaceholder -and $info.Length -gt 5000) {
                $success = $true
                break
            }
        } catch {
            Write-Output ("  Error: " + $_.Exception.Message)
        }
        Start-Sleep -Seconds 2
    }
    if ($success) { break }
}

if ($success) {
    Write-Output ("FINAL SAVED: " + $out + " (" + (Get-Item $out).Length + " bytes)")
} else {
    Write-Output "FAILED to fetch logo"
}
