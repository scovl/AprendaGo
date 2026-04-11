---
title: Padrões de Concorrência
description: Worker pool, fan-out/fan-in, pipeline, semáforo e graceful shutdown.
estimatedMinutes: 50
recursos:
  - https://gobyexample.com/worker-pools
  - https://go.dev/blog/pipelines
experimentacao:
  desafio: "Implemente um download concorrente: pool de N workers baixa uma lista de URLs, com semáforo limitando concorrência e context para timeout global."
  dicas:
    - "Semáforo: sem := make(chan struct{}, maxConcurrent)"
    - context.WithTimeout para timeout global
    - Fan-in com WaitGroup + goroutine para close(results)
socializacao:
  discussao: Como dimensionar o número de workers? E como fazer graceful shutdown?
  pontos:
    - "CPU-bound: GOMAXPROCS workers"
    - "I/O-bound: mais workers (10x a 100x)"
    - "Graceful shutdown: signal.NotifyContext + context cancellation"
  diasDesafio: Dias 29–38
  sugestaoBlog: "Padrões de concorrência em Go: worker pool, pipeline e graceful shutdown"
  hashtagsExtras: '#golang #patterns #concurrency'
aplicacao:
  projeto: Load balancer simples que distribui requests HTTP entre backends com health check.
  requisitos:
    - Worker pool com N goroutines
    - Round-robin ou least-connections
    - Graceful shutdown com signal + context
  criterios:
    - Distribuição equilibrada
    - Graceful shutdown
    - Sem goroutine leaks
---

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
