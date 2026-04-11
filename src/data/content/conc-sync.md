---
title: "Sync: WaitGroups, Mutex e Atomic"
description: sync.WaitGroup, sync.Mutex, sync.RWMutex, sync/atomic e race detection.
estimatedMinutes: 45
recursos:
  - https://gobyexample.com/mutexes
  - https://gobyexample.com/waitgroups
  - https://gobyexample.com/atomic-counters
experimentacao:
  desafio: "Crie um programa com data race (2 goroutines incrementando sem lock), detecte com `go run -race` e corrija com: (1) Mutex, (2) atomic, (3) channel."
  dicas:
    - go run -race main.go mostra exatamente onde está a race
    - "RWMutex: RLock para leitura concorrente, Lock para escrita exclusiva"
    - sync.Once para inicialização lazy (ex: pool de conexões)
socializacao:
  discussao: "Channels vs locks (mutex) – quando usar cada um?"
  pontos:
    - "Channels: coordenação e comunicação entre goroutines"
    - "Mutex: proteção de estado compartilhado"
    - Share memory by communicating vs communicate by sharing memory
    - "Armadilha: goroutine leak quando channel nunca é lido"
  diasDesafio: Dias 29–38
  sugestaoBlog: "WaitGroups, Mutex e Race Conditions: sincronização em Go"
  hashtagsExtras: '#golang #mutex #racecondition #sync'
aplicacao:
  projeto: Rate limiter thread-safe com limite N requests por segundo.
  requisitos:
    - Usar Mutex ou channels para controle
    - go test -race sem erros
    - Configurável (N por segundo)
  criterios:
    - Sem data races
    - Rate limiting preciso
    - Testes passando
---

## sync.WaitGroup

Coordena a espera por um conjunto fixo de goroutines.

```go
var wg sync.WaitGroup
wg.Add(n)    // incrementa ANTES de iniciar goroutines
go func() {
    defer wg.Done()  // decrementa ao terminar
    // trabalho...
}()
wg.Wait()    // bloqueia até contador chegar a 0
```

> **Armadilha:** nunca chame `Add` dentro da goroutine — `Wait` pode ser chamado antes do `Add`.

## sync.Mutex e sync.RWMutex

```go
var mu sync.Mutex
mu.Lock()
defer mu.Unlock()  // idiom obrigatório — garante desbloqueio mesmo em panic
// seção crítica
```

`sync.RWMutex` permite múltiplos leitores simultâneos (`RLock`/`RUnlock`) ou um escritor exclusivo (`Lock`/`Unlock`) — útil quando leituras >> escritas.

## sync/atomic

Operações atômicas sem lock para tipos primitivos (`int32`, `int64`, `uint64`, `Pointer`). `atomic.AddInt64(&n, 1)` é mais eficiente que `Mutex` para contadores simples — evita overhead de context-switch. `atomic.Value` armazena qualquer tipo atomicamente — útil para configuração imutável trocada atomicamente.

## sync.Once e sync.Map

- **`sync.Once`**: garante que uma função seja executada **exatamente uma vez**, mesmo com múltiplas goroutines — padrão para inicialização lazy
- **`sync.Map`**: map thread-safe para casos específicos (muita leitura, pouca escrita, chaves estáveis). Na maioria dos casos, `map + Mutex` é mais simples e performante

> O flag `-race` (`go run -race`, `go test -race`) detecta data races dinamicamente — **sempre use em CI**.
