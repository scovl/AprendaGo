---
title: Constraints Avançadas
description: constraints.Ordered, union types, ~T, limitações e design patterns.
estimatedMinutes: 40
recursos:
  - https://pkg.go.dev/golang.org/x/exp/constraints
  - https://go.dev/blog/intro-generics
experimentacao:
  desafio: Implemente BinarySearch e MergeSort genéricos usando constraints.Ordered. Compare performance com sort.Slice.
  dicas:
    - go get golang.org/x/exp para usar constraints
    - "Crie sua constraint: type Numeric interface { ~int | ~float64 }"
    - "~ é essencial para aceitar type aliases"
socializacao:
  discussao: Go acertou no design de generics? Quais limitações surpreenderam?
  pontos:
    - Métodos não podem ter type params próprios
    - Sem specialization (tratamento especial por tipo)
    - Comparado com C++ templates - muito mais simples
    - "Go priorizou simplicidade — trade-off válido"
  diasDesafio: Dias 69–76
  sugestaoBlog: "Constraints em Go: ~T, union types e limitações dos generics"
  hashtagsExtras: '#golang #generics #constraints'
aplicacao:
  projeto: Biblioteca de algoritmos genéricos com BinarySearch, MergeSort e MinHeap.
  requisitos:
    - BinarySearch[T constraints.Ordered]
    - MergeSort[T constraints.Ordered]
    - MinHeap[T constraints.Ordered] com Push/Pop/Peek
  criterios:
    - Corretos
    - Performance competitiva
    - Testes com edge cases
---

Constraints em Go generics são **interfaces** que definem o conjunto de tipos permitidos e as operações disponíveis:

1. Interface com métodos (como `io.Reader`) — habilita apenas esses métodos
2. Interface com union de tipos (`int | string`) — habilita operações comuns a todos
3. Combinação de ambos

## O operador ~ (tilde)

```go
type Minutes int  // underlying type é int

func Double[T ~int](v T) T {  // aceita int E Minutes
    return v * 2
}
```

`~int` significa "qualquer tipo cujo **underlying type** é `int`". Sem `~`, apenas o tipo exato `int` satisfaria a constraint.

Tipicamente as constraints customizadas usam `~` para aceitar tipos definidos:

```go
type Integer interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64
}
```

## Constraints da stdlib

- **`cmp.Ordered`** (Go 1.21, stdlib): todos os tipos com `>`, `<`, `>=`, `<=`
- `slices.Sort[S ~[]E, E cmp.Ordered](s S)` usa isso na prática

O pacote `golang.org/x/exp/constraints` (experimental) oferece: `Ordered`, `Integer`, `Float`, `Complex`, `Signed`, `Unsigned`.

## Limitações atuais

| Limitação | Detalhe |
|---|---|
| Type params em métodos | Não permitido — apenas no receiver da struct |
| Specialization | Não existe — mesmo código gerado para todos os tipos |
| Conversão `[]T` → `[]interface{}` | Não permitido |
| Variádicos genéricos | Não existem |

Essas limitações foram **escolhas deliberadas de simplicidade** e podem ser relaxadas em versões futuras.
