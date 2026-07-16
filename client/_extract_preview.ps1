$p = 'C:\Users\opitz\Downloads\Sign up for Upwork _ Client & Freelancer Accounts.html'
$targets = @(5347,5348,5355,5356,5358,5360,6883,6884,6885)
$i = 0
Get-Content -LiteralPath $p -Encoding UTF8 | ForEach-Object {
    $i++
    if ($targets -contains $i) {
        '{0} len={1} :: {2}' -f $i, $_.Length, $_.Substring(0, [Math]::Min(200, $_.Length))
    }
}
