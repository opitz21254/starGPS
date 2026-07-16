$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$pats = @('--ws-4x:', '--ws-1x:', '--nav-v-skinny-height:', '--font-size-h4-lg:', '--bg-muted-light:', '--shadow-color-popup:', '--font-size-h2-rebrand:', '--font-family-rebrand:')
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
                '{0} :: {1}' -f $i, $line.Substring($idx, [Math]::Min(120, $line.Length - $idx))
            }
        }
    }
}
