$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$pats = @('--font-size-h2-rebrand:', '--text-outline:', '--letter-spacing-h2-rebrand:', '--font-weight-450:', '--font-weight-550:', '--radius-4x:', '--spacing-heading:', '--text-heading:', '--underline-link-offset:')
$i = 0
$counts = @{}
foreach ($pat in $pats) { $counts[$pat] = 0 }
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    $line = $_
    foreach ($pat in $pats) {
        $idx = $line.IndexOf($pat)
        if ($idx -ge 0) {
            $counts[$pat]++
            if ($counts[$pat] -le 2) {
                '{0} :: {1}' -f $i, $line.Substring($idx, [Math]::Min(110, $line.Length - $idx))
            }
        }
    }
    if ($i -gt 7000) { return }
}
