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
