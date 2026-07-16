$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$pats = @('air3-fullscreen-container', 'clearview-role-card', 'heading-container', '.text-muted{', 'a.link', '.link{', 'stroke-width-icon')
$i = 0
$counts = @{}
foreach ($pat in $pats) { $counts[$pat] = 0 }
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    $line = $_
    foreach ($pat in $pats) {
        if ($line.Contains($pat)) {
            $counts[$pat]++
            if ($counts[$pat] -le 4) {
                $idx = $line.IndexOf($pat)
                $start = [Math]::Max(0, $idx - 60)
                '{0} [{1}] :: {2}' -f $i, $pat, $line.Substring($start, [Math]::Min(180, $line.Length - $start))
            }
        }
    }
}
''
'--- counts ---'
$counts.GetEnumerator() | ForEach-Object { '{0} = {1}' -f $_.Key, $_.Value }
