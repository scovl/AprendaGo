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
