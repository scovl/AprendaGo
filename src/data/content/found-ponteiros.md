---
title: Ponteiros e Call by Value
description: Ponteiros, &, *, new(), call by value vs referência e nil safety.
estimatedMinutes: 40
codeExample: |
  package main

  import "fmt"

  type Ponto struct {
  	X, Y float64
  }

  func (p Ponto) Distancia() float64 {
  	return p.X*p.X + p.Y*p.Y
  }

  func (p *Ponto) Mover(dx, dy float64) {
  	p.X += dx
  	p.Y += dy
  }

  func duplicar(n *int) {
  	*n = *n * 2
  }

  func main() {
  	x := 10
  	duplicar(&x)
  	fmt.Println(x)
  	p := Ponto{3, 4}
  	p.Mover(1, 1)
  	fmt.Println(p)
  	y := new(int)
  	*y = 42
  	var ptr *int
  	if ptr != nil {
  		fmt.Println(*ptr)
  	}
  }
recursos:
  - https://go.dev/tour/moretypes/1
  - https://gobyexample.com/pointers
experimentacao:
  desafio: Crie uma struct Config e funções com value receiver (leitura) e pointer receiver (modificação). Compare tamanho em memória com unsafe.Sizeof. Monte uma linked list com ponteiros.
  dicas:
    - "Structs grandes (>64 bytes): use ponteiro"
    - Slices já são referências — ponteiro para slice é raro
    - unsafe.Sizeof mostra tamanho do tipo, não do conteúdo
socializacao:
  discussao: Quando usar ponteiro vs valor em Go? Qual a regra de ouro?
  pontos:
    - Se o método modifica → pointer receiver
    - "Se struct é grande (>64 bytes) → ponteiro para evitar cópia"
    - "Consistência: se um método é pointer, todos devem ser"
  diasDesafio: Dias 8–18
  sugestaoBlog: "Ponteiros em Go: value vs pointer receiver e when to use each"
  hashtagsExtras: '#golang #pointers #memory'
aplicacao:
  projeto: Implemente uma linked list com ponteiros - inserir, buscar, remover e imprimir.
  requisitos:
    - Struct Node com valor e ponteiro para próximo
    - "Funções: InsertEnd, Find, Remove, Print"
    - Tratamento de lista vazia e elemento não encontrado
  criterios:
    - Ponteiros corretos
    - Sem nil dereference
    - Testes básicos
---

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
