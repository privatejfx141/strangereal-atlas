# zoom
Get-ChildItem -Directory . | ForEach-Object {
    # x
    Get-ChildItem -Directory $_.FullName | ForEach-Object {
        # y
        Get-ChildItem -Filter "*.png" $_.FullName | Sort-Object {[int]($_ -replace '(\d+).*', '$1')} -Descending |
        ForEach-Object {$i = 0} {
            Rename-Item -LiteralPath $_.FullName -NewName "temp.$i.png"
            $i++
        }

        Get-ChildItem -Filter "*.png" $_.FullName | Sort-Object |
        ForEach-Object {$i = 0} {
            $newName = $_.BaseName.Replace("temp.", "")
            Rename-Item -LiteralPath $_.FullName -NewName $newName
            $i++
        }
    }
}
