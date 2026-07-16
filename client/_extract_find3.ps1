$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$pats = @('align-items-center', 'justify-content-center', 'flex-column', 'flex-shrink-0', 'flex-1', 'h-100')
$i = 0
$counts = @{}
foreach ($pat in $pats) { $counts[$pat] = 0 }
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    $line = $_
    foreach ($pat in $pats) {
        if ($line.Contains($pat)) {
            $counts[$pat]++
            if ($counts[$pat] -le 3) {
                $idx = $line.IndexOf($pat)
                $start = [Math]::Max(0, $idx - 40)
                '{0} [{1}] :: {2}' -f $i, $pat, $line.Substring($start, [Math]::Min(140, $line.Length - $start))
            }
        }
    }
}
''
'--- counts ---'
$counts.GetEnumerator() | ForEach-Object { '{0} = {1}' -f $_.Key, $_.Value }
