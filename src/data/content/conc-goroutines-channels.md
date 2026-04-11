---
title: Goroutines e Channels
description: Goroutines, channels buffered/unbuffered, select e padrão produtor/consumidor.
estimatedMinutes: 50
recursos:
  - https://go.dev/tour/concurrency/1
  - https://gobyexample.com/goroutines
  - https://gobyexample.com/channels
  - https://gobyexample.com/select
experimentacao:
  desafio: "Implemente o padrão fan-out/fan-in: distribua URLs entre N workers que fazem HTTP GET concorrente e colete resultados em um channel único."
  dicas:
    - "Fan-out: um channel de jobs lido por N goroutines"
    - "Fan-in: N goroutines escrevem em um channel de resultados"
    - select com default para operação não-bloqueante
    - Sempre close(ch) quando não há mais dados a enviar
socializacao:
  discussao: "Rob Pike: 'Concorrência não é paralelismo.' O que isso significa?"
  pontos:
    - "Concorrência: design (lidar com muitas coisas)"
    - "Paralelismo: execução (fazer muitas coisas ao mesmo tempo)"
    - GOMAXPROCS controla quantos OS threads usam goroutines
    - CSP (Communicating Sequential Processes) model
  diasDesafio: Dias 29–38
  sugestaoBlog: "Goroutines e Channels: concorrência em Go sem locks"
  hashtagsExtras: '#golang #goroutines #channels #concurrency'
aplicacao:
  projeto: Pipeline de processamento com 3 estágios - gerar, transformar e agregar, usando goroutines e channels.
  requisitos:
    - Cada estágio em goroutine separada
    - Channels conectando estágios
    - Graceful shutdown com close(ch)
  criterios:
    - Pipeline funcional
    - Goroutines finalizadas
    - Channels fechados
---

Goroutines são threads cooperativas gerenciadas pelo runtime Go (modelo **M:N**). Cada goroutine começa com ~2KB de stack, que cresce e encolhe de forma elástica. O scheduler usa `GOMAXPROCS` threads OS (padrão: número de CPUs) para multiplexar goroutines. É viável criar **milhares de goroutines** — o custo marginal é ordens de grandeza menor que threads OS.

## Estrutura interna dos channels

Cada channel mantém internamente **três filas FIFO**:

1. Fila de goroutines bloqueadas esperando **enviar**
2. Fila de goroutines bloqueadas esperando **receber**
3. Buffer cíclico de valores

Um channel também possui um **mutex interno** que protege todas essas operações.

## Regras fundamentais de channels

| Operação | Channel nil | Channel aberto | Channel fechado |
|---|---|---|---|
| Enviar | bloqueia para sempre | envia (bloqueia se buffer cheio) | **panic** |
| Receber | bloqueia para sempre | recebe (bloqueia se vazio) | retorna valores do buffer, depois zero value + `ok=false` |
| Fechar | **panic** | fecha | **panic** |

O idiom `v, ok := <-ch` — `ok == false` significa fechado e sem mais valores.

## select

`select` avalia todos os cases em **ordem randômica** e executa um não-bloqueante. Se nenhum case for imediatamente executável, executa o `default` (se presente) ou bloqueia até um case estar pronto. O não-determinismo é intencional para evitar starvation.

```go
select {
case v := <-ch:   // recebe se disponível
    use(v)
case ch <- val:   // envia se possível
default:          // não bloqueia (try-send/try-receive)
}
```

`select{}` (sem cases) bloqueia para sempre — usado para manter goroutines vivas.
