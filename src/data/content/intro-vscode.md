O VS Code com a extensão oficial **"Go"** da Google (publisher: `golang`) é o editor mais popular para Go. O coração da experiência é o **gopls** (Go Language Server) — um servidor LSP que provê: autocompletar, go to definition, find references, renaming seguro, inlay hints de tipos inferidos e diagnósticos em tempo real.

## Ferramentas essenciais

Instaladas via **"Go: Install/Update Tools"** no Command Palette:

| Ferramenta | Função |
|---|---|
| `gopls` | Language server (LSP) |
| `dlv` | Delve debugger |
| `staticcheck` | Linter avançado |
| `gotests` | Geração de testes |
| `gomodifytags` | Editar struct tags |

Todas são instaladas como binários Go em `$GOPATH/bin`.

## Configuração recomendada (`settings.json`)

```json
{
  "go.useLanguageServer": true,
  "editor.formatOnSave": true,
  "[go]": {
    "editor.defaultFormatter": "golang.go"
  }
}
```

## Ferramentas de qualidade

- **`gofmt`**: formatador oficial e opinionado — sem opções de configuração (tabs, não espaços; sem trailing whitespace)
- **`goimports`**: faz o mesmo que `gofmt` e ainda gerencia imports automaticamente
- **`go vet`**: detecta erros comuns que compilam mas são incorretos (ex: string passada onde `*string` esperada, mutex copiado)

Integre `go vet` e `staticcheck` no CI para garantir qualidade consistente.
