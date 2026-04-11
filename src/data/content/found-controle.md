Go tem apenas **um construto de laço**: `for`. Ele substitui `for`, `while` e `do-while` de outras linguagens.

```go
for {}                          // loop infinito
for condition {}                // equivalente ao while
for init; cond; post {}         // forma clássica
for i, v := range slice {}      // range
```

## for-range

`range` itera sobre arrays, slices, maps, strings e channels:

- **Strings**: decodifica `rune`s (não bytes), retorna `(byteIndex, rune)` — avança o índice pelo tamanho em bytes do rune
- **Maps**: a ordem de iteração é **indefinida** e muda entre execuções
- **Channels**: bloqueia até receber um valor; termina quando o channel é fechado

## if com declaração de inicialização

```go
if v := calcular(); v > 0 {
    // v existe apenas dentro deste bloco
}
```

A variável `v` existe apenas dentro do `if` e seus blocos `else`.

## switch

- Cada `case` **não necessita de `break`** — fall-through é opt-in com a keyword `fallthrough`
- Cases podem agrupar múltiplos valores: `case "sol", "lua":`
- `switch` sem expressão equivale a `switch true {}` — ideal para encadear condições
- **Type switch**: `switch v := x.(type) {}` — despacho por tipo concreto de uma interface

## Labels e goto

Labels permitem `break` e `continue` saírem de loops aninhados:

```go
outer:
for {
    for {
        break outer
    }
}
```

`goto` existe mas é desaconselhado. Não há `do-while` em Go — use `for { ...; if !cond { break } }`.
