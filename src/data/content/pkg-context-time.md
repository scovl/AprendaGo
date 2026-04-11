## context

O pacote `context` gerencia ciclo de vida de operações: **cancelamento**, **timeouts** e **deadlines** — fundamental em servidores HTTP e microsserviços.

```go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()  // sempre chamar cancel! evita goroutine leak

if err := operacaoLenta(ctx); err != nil {
    // context.DeadlineExceeded
}
```

| Função | Uso |
|---|---|
| `context.Background()` | Raiz — use em main, testes |
| `context.WithTimeout` | Cancelamento por tempo absoluto |
| `context.WithDeadline` | Cancelamento por deadline absoluta |
| `context.WithCancel` | Cancelamento manual |

> **Regra:** `context.Context` deve ser **o primeiro parâmetro** de toda função que faz I/O ou espera por goroutines.

## time

O pacote `time` manipula datas, durações, timers e tickers.

```go
agora := time.Now()
fmt.Println(agora.Format("2006-01-02 15:04:05"))  // layout de referência fixo do Go!
```

> O layout de referência de Go é `Mon Jan 2 15:04:05 MST 2006` — é a **data de referência** para todos os formatos.

## regexp

O pacote `regexp` implementa RE2 — **seguro e eficiente** (sem backtracking exponencial). Use `regexp.MustCompile` para expressões estáticas (panics em init se inválida), `regexp.Compile` para expressões dinâmicas (retorna erro).

```go
re := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
fmt.Println(re.MatchString("user@go.dev"))  // true
```
