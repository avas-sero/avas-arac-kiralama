param(
  [int]$Port = 3000,
  [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Output "Serving $Root at $prefix"

function Get-ContentType([string]$Path) {
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".svg" { "image/svg+xml" }
    ".ico" { "image/x-icon" }
    default { "application/octet-stream" }
  }
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))

    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    $localPath = Join-Path $Root $requestPath

    if ((Test-Path $localPath) -and -not (Get-Item $localPath).PSIsContainer) {
      $bytes = [System.IO.File]::ReadAllBytes($localPath)
      $context.Response.ContentType = Get-ContentType $localPath
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
      $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
      $context.Response.OutputStream.Write($buffer, 0, $buffer.Length)
    }

    $context.Response.OutputStream.Close()
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}
