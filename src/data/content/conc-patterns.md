## Worker Pool

Resolve o problema de limitar concorrência: crie N goroutines workers que consomem de um channel de jobs.

```go
jobs := make(chan Job, buffer)

for i := 0; i < numWorkers; i++ {
    go func() {
        for job := range jobs {  // range bloqueia até jobs ser fechado
            process(job)
        }
    }()
}

// Produtores enviam jobs...
close(jobs)  // sinal de encerramento para os workers
```

O número ideal de workers depende da natureza do trabalho:
- **CPU-bound**: `GOMAXPROCS` (número de CPUs)
- **I/O-bound** (rede, disco): muito mais (10x–100x)

## Fan-out e Fan-in

- **Fan-out**: distribui trabalho de um produtor para múltiplos consumers (workers)
- **Fan-in (merge)**: coleta resultados de múltiplos producers em um único channel de resultados

Para fan-in: use uma `WaitGroup` + goroutine de coleção — quando todos os producers terminam, `close` o channel de resultados.

## Pipeline e cancelamento

O padrão Pipeline conecta estágios por channels: cada estágio lê do channel anterior, processa e escreve no próximo. O cancelamento é propagado com `context.Context`:

```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

// workers verificam ctx.Done()
select {
case <-ctx.Done():
    return
case result <- process(input):
}
```

## Semáforo e goroutine leaks

**Semáforo com channel buffered:**

```go
sem := make(chan struct{}, maxConcurrent)
sem <- struct{}{}       // adquirir
defer func() { <-sem }() // liberar
```

**Goroutine leak** acontece quando uma goroutine fica bloqueada em um channel que nunca será lido/escrito — sempre garanta que channels terão consumers. Use `context.WithTimeout` para prevenir leaks em operações externas.

Para **graceful shutdown**: use `signal.NotifyContext(ctx, os.Interrupt)` para capturar Ctrl+C e cancelar o context global.
