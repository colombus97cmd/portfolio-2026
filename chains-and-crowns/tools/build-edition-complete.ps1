# CHAINS & CROWNS — Fabrique le zip de l'édition complète, à publier sur BeamUp (format « Jeu vidéo », œuvre premium).
# Le zip est écrit HORS du portfolio (Documents\chains-and-crowns-builds) : sinon l'édition payante
# serait mise en ligne avec le portfolio et téléchargeable gratuitement.
#
# Utilisation (depuis n'importe quel dossier) :
#   powershell -ExecutionPolicy Bypass -File tools\build-edition-complete.ps1

$ErrorActionPreference = 'Stop'
$game = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path ([Environment]::GetFolderPath('MyDocuments')) 'chains-and-crowns-builds'
$stage = Join-Path ([IO.Path]::GetTempPath()) ("cc-complete-" + [guid]::NewGuid().ToString('N'))
$stamp = Get-Date -Format 'yyyy-MM-dd'
$zip = Join-Path $outDir "chains-and-crowns-edition-complete-$stamp.zip"

# Fichiers du jeu uniquement (pas d'outils, de sources des sprites, de règlement ni de service worker :
# la passerelle de jeux de BeamUp refuse les service workers).
$include = @('index.html', 'manifest.webmanifest', 'css', 'js', 'icons', 'sprites\sprites.js')

New-Item -ItemType Directory -Force -Path $stage, $outDir | Out-Null
foreach ($item in $include) {
    $src = Join-Path $game $item
    $dst = Join-Path $stage $item
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dst) | Out-Null
    Copy-Item -Recurse -Force $src $dst
}

# Édition complète : tous les niveaux et plateaux.
Set-Content -Encoding utf8 -Path (Join-Path $stage 'js\edition.js') -Value @"
/* CHAINS & CROWNS — Édition complète (BeamUp). Fichier généré par tools/build-edition-complete.ps1. */
window.CC_EDITION = 'complete';
"@
Remove-Item -Force (Join-Path $stage 'js\install.js')
(Get-Content -Raw -Encoding utf8 (Join-Path $stage 'index.html')) -replace '[ \t]*<script src="js/install\.js"></script>\r?\n', '' |
    Set-Content -Encoding utf8 -NoNewline (Join-Path $stage 'index.html')

# tar (inclus dans Windows 10 et 11) écrit des chemins avec « / », comme l'exige le vérificateur de BeamUp.
if (Test-Path $zip) { Remove-Item -Force $zip }
& tar.exe -a -c -f $zip -C $stage *
if ($LASTEXITCODE -ne 0) { throw "La création du zip a échoué." }
Remove-Item -Recurse -Force $stage

$size = [math]::Round((Get-Item $zip).Length / 1KB)
Write-Output "Édition complète prête : $zip ($size Ko)"
