Funções em Go são **first-class citizens**: podem ser atribuídas a variáveis, passadas como argumentos e retornadas de outras funções. O tipo de uma função inclui os tipos dos parâmetros e dos retornos: `func(int, string) (float64, error)`. Funções podem retornar múltiplos valores — o padrão idiomático é `(T, error)`.

## Parâmetros variádicos e closures

Parâmetros variádicos (`...T`) recebem zero ou mais argumentos como um slice `[]T`. Para passar um slice existente: `f(s...)`.

Funções anônimas (**closures**) capturam variáveis por **referência**, não por cópia.

> **Armadilha clássica:** em `for i := range s { go func() { use(i) }() }` todas as goroutines capturam a mesma variável `i`. Passe como argumento: `go func(v int) { use(v) }(i)`.

## defer

`defer` empurha uma chamada de função em uma pilha **LIFO** local à função corrente. Deferridos executam quando a função retorna, seja por `return` normal ou por `panic`.

- Os **argumentos de `defer` são avaliados imediatamente** (no momento do `defer`), não no momento da execução
- Ordem: `defer f(1); defer f(2); defer f(3)` → executa `f(3)`, `f(2)`, `f(1)`
- Use para garantir cleanup: `defer f.Close()`, `defer mu.Unlock()`

## panic e recover

`panic` interrompe a execução normal e começa a desenrolar a call stack, executando funções deferridas. Se chegar ao topo da goroutine sem ser recuperado, o programa termina.

`recover()` captura o valor passado ao panic — mas **apenas dentro de uma função deferrida diretamente**. `recover()` fora de `defer` retorna `nil`. Para re-panic: se a lógica de recover quiser propagar, chame `panic(v)` novamente.
