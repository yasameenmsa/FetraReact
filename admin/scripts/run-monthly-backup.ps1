$env:MONGODB_URI = (Select-String -Path 'C:\Users\yasam\Projects\FetraReact\admin\.env' -Pattern '^MONGODB_URI=').Line -replace '^MONGODB_URI=', ''
Set-Location 'C:\Users\yasam\AppData\Local\Temp\opencode\fitrah-backups-repo'
node scripts/backup-push.mjs