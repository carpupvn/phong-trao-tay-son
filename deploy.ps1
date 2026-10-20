param([string]$msg = "Update website")

Write-Host "Dang day code len GitHub..." -ForegroundColor Cyan
git add .
git commit -m "$msg"
git push

Write-Host "Hoan tat! Doi 1 phut de Cloudflare build lai web nhe." -ForegroundColor Green