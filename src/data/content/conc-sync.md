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
