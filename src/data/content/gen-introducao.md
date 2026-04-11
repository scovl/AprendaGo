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
