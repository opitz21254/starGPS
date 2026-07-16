$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$outDir = 'c:\Users\opitz\projects\starGPS\starGPS\client\_extract'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$targets = 5340..5362 + @(6883)
$i = 0
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    if ($targets -contains $i) {
        $out = Join-Path $outDir ("line$i.txt")
        # Break minified CSS at closing braces so the dump is readable
        $text = $_ -replace '\}', "}`n"
        Set-Content -LiteralPath $out -Value $text -Encoding UTF8
    }
    if ($i -gt 6883) { return }
}
'done'
