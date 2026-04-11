O Go runtime usa o modelo **M:P:G**:

- **M** — OS threads (sistema operacional)
- **P** — Processadores lógicos (padrão: número de CPUs via `GOMAXPROCS`)
- **G** — Goroutines

O scheduler distribui goroutines (G) entre threads (M) através dos processadores (P). A stack de uma goroutine começa com **2KB** e cresce dinamicamente até o limite do sistema.

## GC — Garbage Collector

O GC do Go é **concurrent, tri-color mark-and-sweep**, otimizado para baixa latência (pausas `<1ms` na maioria dos casos). O GC é ajustado pelo `GOGC` (padrão 100 = GC quando heap dobra) e `GOMEMLIMIT` (Go 1.19+).

## pprof — profiling

```go
import _ "net/http/pprof"  // registra handlers /debug/pprof automaticamente

go func() {
    http.ListenAndServe(":6060", nil)
}()
```

```bash
# Coletar e visualizar CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
go tool pprof -http=:8081 profile.pb.gz  # web UI

# Heap profile
go tool pprof http://localhost:6060/debug/pprof/heap
```

## trace — execução detalhada

```bash
go test -trace=trace.out
go tool trace trace.out
```

Mostra goroutines, GC, scheduling, system calls — visão completa da execução.

## Diagnóstico em runtime

```go
runtime.NumGoroutine()   // goroutines ativas
runtime.NumCPU()         // CPUs disponíveis
runtime.GOMAXPROCS(0)    // P atual

var m runtime.MemStats
runtime.ReadMemStats(&m)
fmt.Printf("Heap: %d MB, GC cycles: %d\n", m.Alloc/1024/1024, m.NumGC)
```

`GODEBUG=gctrace=1` imprime atividade do GC em tempo real.
