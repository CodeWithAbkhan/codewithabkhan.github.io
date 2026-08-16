# CodeWithABKhan Verified Portfolio

Public portfolio source for `https://codewithabkhan.github.io/`.

## What changed in this rebuild

- Replaced stale generic portfolio copy with proof-led content tied to public evidence.
- Linked only to public GitHub, X, and Gumroad surfaces that can be checked directly.
- Labeled current focus areas separately from verified shipped proof.

## Stack

- .NET 8
- Blazor WebAssembly
- GitHub Pages
- Tailwind CLI pass-through for `Styles/app.css` during Release publish

## Local verification

```powershell
dotnet restore
dotnet publish -c Release -f net8.0
```

The GitHub Pages workflow publishes `bin/Release/net8.0/publish/wwwroot` to the `gh-pages` branch.
