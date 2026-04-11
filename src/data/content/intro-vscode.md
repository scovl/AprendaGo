---
title: Configuração do Ambiente no VSCode
description: Configure o Visual Studio Code para desenvolvimento em Go.
estimatedMinutes: 20
recursos:
  - https://marketplace.visualstudio.com/items?itemName=golang.Go
  - https://github.com/golang/vscode-go
experimentacao:
  desafio: Instale a extensão Go no VS Code e configure as ferramentas. Teste criando um arquivo .go e verificando que o autocompletar funciona.
  dicas:
    - Instale a extensão "Go" (publisher: golang.go)
    - Execute "Go: Install/Update Tools" no Command Palette
    - Selecione todas as ferramentas sugeridas
    - Teste o debug com F5 em um programa simples
socializacao:
  discussao: Quais extensões adicionais do VS Code ajudam no desenvolvimento Go?
  pontos:
    - Error Lens para erros inline
    - GitLens para controle de versão
    - Thunder Client para testar APIs
  diasDesafio: Dias 1–7
  sugestaoBlog: "Meu ambiente Go no VS Code: extensões e configurações essenciais"
  hashtagsExtras: '#vscode #golang #devtools'
aplicacao:
  projeto: Configure seu ambiente completo com VS Code, extensões e ferramentas Go.
  requisitos:
    - Extensão Go instalada com todas as ferramentas
    - Debugger funcionando com breakpoints
    - Formatação ao salvar ativada
  criterios:
    - AutoComplete funcionando
    - Formatação automática
    - Debugger operacional
---

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
