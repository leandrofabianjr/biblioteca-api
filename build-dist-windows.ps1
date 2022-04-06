# Build da API
nest build
Remove-Item "..\biblioteca-dist\" -Recurse -Force -Verbose
New-Item -Path ".." -Name "biblioteca-dist" -ItemType "directory"
Copy-Item -Path ".\dist\" -Destination "..\biblioteca-dist\" -PassThru -Recurse
Copy-Item -Path ".\package.json" -Destination "..\biblioteca-dist\" -PassThru

# Build do front-end
Set-Location "..\biblioteca-front\"
ng build
Copy-Item -Path ".\dist\biblioteca" -Destination "..\biblioteca-dist\front" -PassThru -Recurse
