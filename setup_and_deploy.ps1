# =====================================================================
# SCRIPT TU DONG CAI DAT VA DEPLOY LEN GITHUB + CLOUDFLARE PAGES
# =====================================================================

$ErrorActionPreference = "Stop"

# --- CAU HINH (BAN CAN SUA DONG NAY) ---
$RepoName = "phong-trao-tay-son"
$GitHubUser = "carpupvn"  # <-- ĐÃ ĐIỀN USERNAME CỦA BẠN
$CloudflareProjectName = "phong-trao-tay-son"
# ---------------------------------------

Write-Host "=== BAT DAU QUA TRINH TU DONG HOA ===" -ForegroundColor Cyan

# 0. LÀM MỚI BIẾN MÔI TRƯỜNG
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 1. Kiem tra Git
Write-Host "`n[1/5] Kiem tra Git..." -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git chua duoc cai dat. Vui long tai Git tai: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}
Write-Host "Git da san sang." -ForegroundColor Green

# 2. Kiem tra va tai GitHub CLI (Ban Portable - Khong can cai dat)
Write-Host "`n[2/5] Kiem tra GitHub CLI..." -ForegroundColor Yellow
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "Dang tai GitHub CLI ban Portable..." -ForegroundColor Green
    $ghZip = "$env:TEMP\gh-cli.zip"
    $ghFolder = "$env:TEMP\gh-cli"
    
    Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.40.1/gh_2.40.1_windows_amd64.zip" -OutFile $ghZip
    Expand-Archive -Path $ghZip -DestinationPath $ghFolder -Force
    Remove-Item $ghZip
    
    $env:Path += ";$ghFolder\bin"
}
Write-Host "GitHub CLI da san sang." -ForegroundColor Green

# 3. Kiem tra Node.js + Wrangler
Write-Host "`n[3/5] Kiem tra Node.js va Wrangler..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js chua duoc cai dat. Vui long tai tai: https://nodejs.org/ (ban LTS)." -ForegroundColor Red
    exit 1
}
if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Host "Wrangler chua duoc cai dat. Dang cai dat..." -ForegroundColor Green
    npm install -g wrangler
}
Write-Host "Wrangler da san sang." -ForegroundColor Green

# 4. Dang nhap GitHub va khoi tao repo
Write-Host "`n[4/5] Dang nhap GitHub va khoi tao repository..." -ForegroundColor Yellow

# Tạm thời đổi ErrorActionPreference để không bị crash khi check auth
$ErrorActionPreference = "Continue"
gh auth status 2>$null
$isLoggedIn = ($LASTEXITCODE -eq 0)

if (-not $isLoggedIn) {
    Write-Host "Ban can dang nhap GitHub CLI. Lam theo huong dan tren man hinh..." -ForegroundColor Cyan
    gh auth login
}
# Đổi lại thành Stop
$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    git init -b main
    git add .
    git commit -m "Initial commit: Phong trao Tay Son slides"
} else {
    git add .
    git commit -m "Update: Fix map and add animations" 2>$null
}

# Kiểm tra repo tồn tại bằng cách khác để tránh lỗi
$ErrorActionPreference = "Continue"
gh repo view "$GitHubUser/$RepoName" 1>$null 2>$null
$repoExists = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = "Stop"

if (-not $repoExists) {
    Write-Host "Dang tao repository '$RepoName' tren GitHub..." -ForegroundColor Green
    gh repo create "$GitHubUser/$RepoName" --public --source=. --remote=origin --push
} else {
    Write-Host "Repository da ton tai. Dang push code..." -ForegroundColor Green
    git remote remove origin 2>$null
    git remote add origin "https://github.com/$GitHubUser/$RepoName.git"
    git push -u origin main
}
Write-Host "Code da duoc day len GitHub thanh cong!" -ForegroundColor Green

# 5. Deploy len Cloudflare Pages
Write-Host "`n[5/5] Deploy len Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "Dang deploy len Cloudflare Pages..." -ForegroundColor Green
wrangler pages deploy . --project-name=$CloudflareProjectName --branch=main

Write-Host "`n=== HOAN TAT! ===" -ForegroundColor Cyan
Write-Host "Trang web cua ban da duoc deploy len Cloudflare Pages." -ForegroundColor Green
Write-Host "Truy cap: https://$CloudflareProjectName.pages.dev" -ForegroundColor Cyan