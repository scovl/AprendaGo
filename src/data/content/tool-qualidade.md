---
title: "Qualidade de Código: vet, lint e segurança"
description: go vet, go fmt, goimports, golangci-lint, staticcheck e govulncheck.
estimatedMinutes: 40
codeExample: |
  # Formatação
  gofmt -w .
  goimports -w .

  # Análise estática
  go vet ./...

  # Linting completo
  golangci-lint run ./...

  # Vulnerabilidades
  govulncheck ./...

  # Build tags
  GOOS=linux GOARCH=amd64 go build -o server-linux
recursos:
  - https://pkg.go.dev/cmd/vet
  - https://golangci-lint.run/
  - https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck
experimentacao:
  desafio: Instale golangci-lint, configure um .golangci.yml e execute em um projeto real. Corrija todos os findings. Execute govulncheck para verificar vulnerabilidades.
  dicas:
    - "golangci-lint: go install github.com/golangci-lint/golangci-lint/cmd/golangci-lint@latest"
    - "govulncheck: go install golang.org/x/vuln/cmd/govulncheck@latest"
    - staticcheck detecta código morto e anti-patterns
socializacao:
  discussao: Qual o conjunto mínimo de ferramentas que todo projeto Go deveria ter no CI?
  pontos:
    - "go vet + go test -race: mínimo absoluto"
    - "golangci-lint: padrão de mercado para CI"
    - "govulncheck: segurança de dependências"
  diasDesafio: Dias 91–96
  sugestaoBlog: "Tooling Go: do gofmt ao golangci-lint – qualidade de código automatizada"
  hashtagsExtras: '#golang #tooling #lint #security'
aplicacao:
  projeto: Configure pipeline de qualidade com Makefile + golangci-lint + govulncheck + testes com race detector.
  requisitos:
    - Makefile com targets lint, test, vet
    - .golangci.yml configurado
    - govulncheck no pipeline
  criterios:
    - Zero warnings em vet/lint
    - Zero vulnerabilidades conhecidas
    - Testes sem race
---

`go fmt` formata código com o **padrão único do Go** — sem discussão sobre estilo. `go vet` detecta bugs sutis: printf errado, unreachable code, struct tags inválidos, mutex copiado.

## Ferramentas essenciais

```bash
gofmt -w .          # formatação
goimports -w .      # formatação + gerencia imports
go vet ./...        # análise estática básica
golangci-lint run   # 100+ linters em paralelo
govulncheck ./...   # vulnerabilidades em dependências
```

## golangci-lint

Executa 100+ linters em paralelo (staticcheck, revive, gosec, errcheck, etc.). Configure via `.golangci.yml`:

```yaml
linters:
  enable:
    - staticcheck
    - errcheck
    - gosec
    - revive
linters-settings:
  revive:
    rules:
      - name: exported
```

## govulncheck

Verifica vulnerabilidades **conhecidas nas dependências** usadas pelo seu código (não apenas no `go.mod`):

```bash
go install golang.org/x/vuln/cmd/govulncheck@latest
govulncheck ./...
```

## Escape analysis

```bash
go build -gcflags="-m" ./...
```

Mostra quais variáveis **escapam** para o heap — útil para otimização de alocações.

## Conjunto mínimo para CI

1. `go vet ./...` — mínimo absoluto
2. `go test -race ./...` — detecta data races
3. `golangci-lint run` — padrão de mercado
4. `govulncheck ./...` — segurança de dependências
