Go é estaticamente tipado com **17 tipos básicos embutidos**: 1 booleano (`bool`), 11 inteiros (`int8`, `uint8`/`byte`, `int16`, `uint16`, `int32`/`rune`, `uint32`, `int64`, `uint64`, `int`, `uint`, `uintptr`), 2 de ponto flutuante (`float32`, `float64`), 2 complexos (`complex64`, `complex128`) e 1 string. `byte` é alias de `uint8` e `rune` é alias de `int32`. Os tipos `int` e `uint` têm tamanho dependente da arquitetura: 4 bytes em sistemas 32-bit e 8 bytes em sistemas 64-bit.

## Variáveis e constantes

Variáveis são declaradas com `var` (qualquer escopo, zero value se não inicializada) ou `:=` (inferência de tipo, **apenas dentro de funções**). O compilador recusa variáveis locais declaradas mas não usadas. Constantes usam `const`; são substituídas pelo compilador em compiletime e não ocupam endereço de memória.

## iota

`iota` é um gerador predeclarado: começa em `0` na primeira especificação de cada bloco `const` e incrementa 1 a cada linha. O mecanismo de autocomplete replica a expressão da linha anterior — por isso `Readable = 1 << iota` em linhas subsequentes funciona sem repetir a expressão:

```go
const (
    Readable  = 1 << iota  // 1
    Writable               // 2
    Executable             // 4
)
```

## Zero values e conversões

Todo tipo tem **zero value**: `0` (numéricos), `""` (string), `false` (bool), `nil` (ponteiros, slices, maps, channels, funções). Conversões são sempre **explícitas**: `float64(i)`, `int(f)` (trunca a parte fracionária).

> **Armadilha:** `string(65)` retorna `"A"` (code point Unicode 65), não `"65"`. Para converter inteiro em string decimal, use `strconv.Itoa()` ou `fmt.Sprintf("%d", n)`.

Variáveis de escopo interno podem **sombrear** variáveis externas com mesmo nome — uma armadilha comum com `:=` em blocos `if`/`for`.
