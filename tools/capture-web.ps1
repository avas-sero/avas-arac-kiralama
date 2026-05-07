param(
  [Parameter(Mandatory = $true)][string]$Url,
  [Parameter(Mandatory = $true)][string]$OutputPath,
  [int]$Width = 1440,
  [int]$Height = 2200
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$script:done = $false
$form = New-Object System.Windows.Forms.Form
$form.ClientSize = New-Object System.Drawing.Size($Width, $Height)
$form.ShowInTaskbar = $false
$form.WindowState = [System.Windows.Forms.FormWindowState]::Minimized

$browser = New-Object System.Windows.Forms.WebBrowser
$browser.ScriptErrorsSuppressed = $true
$browser.ScrollBarsEnabled = $false
$browser.Dock = [System.Windows.Forms.DockStyle]::Fill
$browser.Width = $Width
$browser.Height = $Height

$browser.add_DocumentCompleted({
  if ($browser.ReadyState -ne [System.Windows.Forms.WebBrowserReadyState]::Complete) {
    return
  }

  Start-Sleep -Milliseconds 1200

  $bitmap = New-Object System.Drawing.Bitmap $Width, $Height
  $form.DrawToBitmap($bitmap, (New-Object System.Drawing.Rectangle 0, 0, $Width, $Height))
  $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
  $script:done = $true
  $form.Close()
})

$form.Controls.Add($browser)
$browser.Navigate($Url)
[void]$form.Show()

while (-not $script:done) {
  [System.Windows.Forms.Application]::DoEvents()
  Start-Sleep -Milliseconds 50
}
