$desktop = [System.Environment]::GetFolderPath('Desktop')
$src = Join-Path $desktop "araç resimleri"
$dst = Join-Path $PSScriptRoot "..\images"

Write-Host "Kaynak: $src"
Write-Host "Hedef: $dst"

if (-not (Test-Path $src)) {
    Write-Host "HATA: Kaynak klasör bulunamadı: $src"
    exit 1
}

New-Item -ItemType Directory -Force -Path $dst | Out-Null

$files = @(
    "BMW 520i.png",
    "Citroen C4.png",
    "Fiat Doblo.png",
    "Fiat egea cross.png",
    "Ford Focus.png",
    "Ford Tourneo.png",
    "Hyundai i20.png",
    "Mercedes Vito.png",
    "Peugeot 408.png",
    "Renault clio.png",
    "Renault Duster.png",
    "Renault Megane.png"
)

foreach ($file in $files) {
    $srcFile = Join-Path $src $file
    $dstFile = Join-Path $dst $file
    if (Test-Path $srcFile) {
        Copy-Item $srcFile $dstFile -Force
        Write-Host "Kopyalandı: $file"
    } else {
        Write-Host "BULUNAMADI: $file"
    }
}

Write-Host "Tamamlandı."
