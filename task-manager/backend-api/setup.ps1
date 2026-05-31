# setup.ps1 - Complete backend API setup for PowerShell

Write-Host "========================================" -ForegroundColor Green
Write-Host "   BACKEND API SETUP SCRIPT" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Create directories
Write-Host "`n[1/4] Creating folders..." -ForegroundColor Yellow
$folders = @("routes", "middleware", "controllers", "models", "utils")
foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    Write-Host "  [OK] Created $folder" -ForegroundColor Cyan
}

# Create files
Write-Host "`n[2/4] Creating files..." -ForegroundColor Yellow
$files = @(
    "server.js",
    ".env",
    "README.md",
    "routes\tasks.js",
    "routes\users.js",
    "middleware\validation.js",
    "middleware\errorHandler.js",
    "middleware\auth.js",
    "controllers\taskController.js",
    "controllers\userController.js",
    "models\Task.js",
    "models\User.js",
    "utils\helpers.js"
)

foreach ($file in $files) {
    New-Item -ItemType File -Path $file -Force | Out-Null
    Write-Host "  [OK] Created $file" -ForegroundColor Cyan
}

# Update package.json scripts
Write-Host "`n[3/4] Updating package.json..." -ForegroundColor Yellow

# Check if package.json exists
if (Test-Path "package.json") {
    # Read current package.json
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    
    # Update scripts
    $packageJson.scripts = @{
        start = "node server.js"
        dev = "nodemon server.js"
    }
    
    # Save back to file
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Host "  [OK] Updated package.json scripts" -ForegroundColor Cyan
} else {
    Write-Host "  [WARNING] package.json not found! Run 'npm init -y' first." -ForegroundColor Red
}

# Create .env file with default values
Write-Host "`n[4/4] Creating .env file..." -ForegroundColor Yellow
$envContent = @"
PORT=5000
NODE_ENV=development
JWT_SECRET=mysecretkey12345
JWT_EXPIRE=30d
"@
$envContent | Set-Content -Path ".env"
Write-Host "  [OK] Created .env file" -ForegroundColor Cyan

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "   SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`n[Next Steps]:" -ForegroundColor Yellow
Write-Host "1. Open each file and copy the code from my previous message" -ForegroundColor White
Write-Host "2. Then run: npm run dev" -ForegroundColor White
Write-Host "3. Test: curl http://localhost:5000" -ForegroundColor White

Write-Host "`n[Files Created]:" -ForegroundColor Yellow
Get-ChildItem -Recurse -File | Where-Object { $_.DirectoryName -ne $PWD.Path } | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Gray }