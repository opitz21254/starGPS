$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$pats = @('.sr-only{', '.text-center{', '.h-100{', '.flex-1{', '.flex-column{', '.flex-shrink-0{', '.align-items-center{', '.align-items-start{', '.justify-content-center{', '.text-muted{', '.link{', '.link,', '.display-rebrand')
$i = 0
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    foreach ($pat in $pats) {
        $idx = $_.IndexOf($pat)
        if ($idx -ge 0) {
            $start = [Math]::Max(0, $idx - 60)
            $len = [Math]::Min(200, $_.Length - $start)
            '{0} [{1}] :: {2}' -f $i, $pat, $_.Substring($start, $len)
        }
    }
}
