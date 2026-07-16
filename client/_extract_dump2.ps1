$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$outDir = 'c:\Users\opitz\projects\starGPS\starGPS\client\_extract'
$targets = @(5317, 5319, 5515)
$i = 0
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    if ($targets -contains $i) {
        $out = Join-Path $outDir ("line$i.txt")
        $text = $_ -replace '\}', "}`n"
        Set-Content -LiteralPath $out -Value $text -Encoding UTF8
    }
    if ($i -gt 5515) { return }
}
'done'
