Go é inteiramente **call-by-value**: ao passar um argumento, o compilador copia o valor.

- Para `int`, `bool`, structs — a cópia é do valor completo
- Para slices, maps e channels — a cópia é do **descritor interno** (ponteiro + len/cap), e o array/hash subjacente não é copiado

Por isso modificar elementos de um slice passado para uma função é visível no caller, mas `append()` no slice interno não é (precisaria retornar o novo slice ou passar `*[]T`).

## Operadores & e *

`&` obtém o endereço de uma variável (addressable value); `*` derreferencia, acessando o valor no endereço. Go **não tem aritmética de ponteiro** — não é possível incrementar um ponteiro como em C.

`new(T)` aloca memória com zero value e retorna um `*T`; equivale a `var t T; return &t`. O compilador decide se aloca na pilha ou heap (**escape analysis**) — não há `new` vs `malloc` manual.

## Value receiver vs pointer receiver

| Receiver | Quando usar |
|---|---|
| `func (p Ponto) Area()` | Leitura, tipos pequenos |
| `func (p *Ponto) Mover()` | Modificação, tipos grandes, tipos com campos não-copiáveis (mutex) |

Go auto-derreferencia: se `p` é do tipo `Ponto`, `p.Mover()` é sugar para `(&p).Mover()`.

> **Regra:** todos os métodos de um tipo devem usar o mesmo kind de receiver (todos value **ou** todos pointer) para consistência.
