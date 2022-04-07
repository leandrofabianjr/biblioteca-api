# Requisitos
# - PowerShell, NPM, NestJS, Angular e Git
# - biblioteca-front e biblioteca-api no mesmo diretório
#
# Será gerado o diretório biblioteca-dist no nível do diretório dos projetos

#
$DIST_DIR = "biblioteca-dist"
$DIST_DIR_PATH = "..\$($DIST_DIR)\"
$FRONT_DIR = "biblioteca-front"
$FRONT_DIR_PATH = "..\$($FRONT_DIR)\"
$API_DIR = "biblioteca-api"
$API_DIR_PATH = "..\$($API_DIR)\"

if (Test-Path $DIST_DIR_PATH) {
    Remove-Item $DIST_DIR_PATH -Recurse -Force
}
New-Item -Path ".." -Name $DIST_DIR -ItemType "directory"

# Build da API
npm install
nest build
Copy-Item -Path ".\dist\" -Destination "$($DIST_DIR_PATH)\api" -PassThru -Recurse
Copy-Item -Path ".\package.json" -Destination $DIST_DIR_PATH -PassThru

# Build do front-end
Set-Location $FRONT_DIR_PATH
npm install
ng build
Copy-Item -Path ".\dist\biblioteca" -Destination "$($DIST_DIR_PATH)\front" -PassThru -Recurse

# # Subindo para o github
Set-Location $DIST_DIR_PATH
# git init
# git add .
# git commit -m "Commit gerado por script"
# git remote add origin https://github.com/leandrofabianjr/biblioteca-dist.git
# git branch -M main
# git push -f origin main
