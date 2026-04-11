---
title: Introdução a Generics
description: Type parameters, any, comparable, funções e tipos genéricos.
estimatedMinutes: 45
recursos:
  - https://go.dev/doc/tutorial/generics
  - https://go.dev/blog/intro-generics
experimentacao:
  desafio: Implemente Map, Filter e Reduce genéricos. Depois, crie um Set[T comparable] com Add, Contains, Remove, Union e Intersection.
  dicas:
    - "Map[T, U any]([]T, func(T) U) []U"
    - "Set usa map[T]struct{} internamente (memoria mínima)"
    - "Reduce[T, U any]([]T, U, func(U, T) U) U"
socializacao:
  discussao: Generics resolvem quais problemas? Quando NÃO usar?
  pontos:
    - "Antes: sort.IntSlice, sort.StringSlice, sort.Float64Slice..."
    - "Agora: uma função Sort[T constraints.Ordered]"
    - Não use quando interface simples resolve o problema
  diasDesafio: Dias 69–76
  sugestaoBlog: "Generics em Go: Map, Filter, Reduce e coleções type-safe"
  hashtagsExtras: '#golang #generics'
aplicacao:
  projeto: Pacote de coleções genéricas com Set[T], Queue[T] e Cache[K, V] com TTL.
  requisitos:
    - "Set: Add, Remove, Contains, Union, Intersection"
    - "Queue: Enqueue, Dequeue, Peek, Len"
    - "Cache: Get, Set com TTL, Delete, cleanup automático"
  criterios:
    - Type safety em compilação
    - Testes unitários
    - Benchmark vs interface{}
---

Generics (Go 1.18+) permitem que funções e tipos sejam parametrizados por tipos, mantendo **type safety total** em compiletime. A sintaxe: `func F[T Constraint](args)` é instanciada pelo compilador para cada combinação de tipos concreta.

A **inferência de tipo** evita explicitar os type params na maioria das chamadas: `Filter(nums, fn)` — o compilador deduz `T=int`.

## Constraints básicas

| Constraint | Permite |
|---|---|
| `any` | Qualquer tipo — apenas atribui, passa, armazena |
| `comparable` | `==` e `!=` — necessário para chave de map ou sets |
| `~int` | `int` e qualquer tipo cujo underlying type é `int` |

## Obtendo zero value

```go
var zero T  // correto — funciona para qualquer tipo
```

Não é possível usar `nil` diretamente (a menos que `T` seja uma interface ou tipo nilável).

## Limitações do design

- Métodos **não podem ter** próprios type parameters — apenas o receiver da struct genérica
- Funções genéricas não podem ser atribuídas a variáveis sem especificar os type params
- Não há aplicação parcial de funções genéricas

## Casos de uso ideais

- Funções sobre coleções: `Map`, `Filter`, `Reduce`, `Contains`
- Tipos contêiner: `Stack`, `Queue`, `Set`, `Cache`
- Utilitários: `Must[T]`, `Ptr[T]`

> **Regra prática:** se você precisa trabalhar com a **estrutura do tipo** (índices, aritmética), use generics; se só precisa invocar métodos, use interfaces.
