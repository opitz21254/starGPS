$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$pats = @('align-items-center', 'justify-content-center', 'flex-column', 'flex-shrink-0', '.flex-1', '.h-100', 'align-items-start')
$i = 0
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    $line = $_
    foreach ($pat in $pats) {
        $idx = $line.IndexOf($pat)
        # skip HTML lines (class attributes) - only report if followed soon by { or , within CSS context
        while ($idx -ge 0) {
            $after = $line.Substring($idx, [Math]::Min(160, $line.Length - $idx))
            if ($after -match '^[\.\w\-]*[\{,]') {
                '{0} [{1}] :: {2}' -f $i, $pat, $after
                break
            }
            $idx = $line.IndexOf($pat, $idx + 1)
        }
    }
}
