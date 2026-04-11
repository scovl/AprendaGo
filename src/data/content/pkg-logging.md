O pacote `log` básico é suficiente para scripts. Para produção, use **`log/slog`** (Go 1.21+) que fornece logging estruturado com níveis (`Debug`, `Info`, `Warn`, `Error`), output JSON e handlers customizáveis.

## log/slog

```go
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
    Level: slog.LevelDebug,
}))

logger.Info("servidor iniciado",
    slog.String("addr", ":8080"),
    slog.Int("workers", 4),
)
// Output: {"time":"...","level":"INFO","msg":"servidor iniciado","addr":":8080","workers":4}
```

## Alternativas populares

| Pacote | Característica |
|---|---|
| `log/slog` (stdlib) | Padrão moderno, sem dependências |
| `go.uber.org/zap` | Alta performance, zero allocation |
| `github.com/rs/zerolog` | Zero allocation, fluent API |

## Logging estruturado vs não-estruturado

**Logging estruturado** (campos key-value em JSON) facilita busca, filtro e análise em ferramentas como ELK, Grafana Loki e Datadog. `log.Printf("user %s logged in", name)` não é pesquisável por campo; `logger.Info("login", slog.String("user", name))` é.

## Níveis e filtragem

Use `slog.SetDefault(logger)` para definir o logger global. Configure o nível mínimo via `HandlerOptions.Level` ou via variável de ambiente com um handler customizado.
