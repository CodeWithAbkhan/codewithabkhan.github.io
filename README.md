# CodeWithABKhan portfolio

Production source for [codewithabkhan.github.io](https://codewithabkhan.github.io/).

The portfolio presents verified public work across .NET, Blazor, MAUI, business software, AI-assisted development, and procedural Three.js experiments. Project claims link directly to public repositories or live artifacts.

## Stack

- .NET 8 and Blazor WebAssembly
- Hand-authored responsive CSS
- GitHub Actions and GitHub Pages
- Optimized WebP project imagery

## Local development

```powershell
dotnet restore
dotnet run
```

For the same output produced in CI:

```powershell
npm ci
dotnet publish -c Release -f net8.0
```

The Pages workflow publishes `bin/Release/net8.0/publish/wwwroot` through GitHub's native Pages deployment flow.
