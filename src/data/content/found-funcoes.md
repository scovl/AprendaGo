---
title: Funções
description: Múltiplos retornos, named returns, variadic, funções anônimas, closures e defer.
estimatedMinutes: 45
codeExample: |
  package main

  import "fmt"

  func dividir(a, b float64) (float64, error) {
  	if b == 0 {
  		return 0, fmt.Errorf("divisão por zero")
  	}
  	return a / b, nil
  }

  func retangulo(l, a float64) (area, perimetro float64) {
  	area = l * a
  	perimetro = 2 * (l + a)
  	return
  }

  func soma(nums ...int) int {
  	total := 0
  	for _, n := range nums {
  		total += n
  	}
  	return total
  }

  func main() {
  	contador := func() func() int {
  		n := 0
  		return func() int { n++; return n }
  	}()
  	fmt.Println(contador(), contador())
  	fmt.Println("início")
  	defer fmt.Println("defer 1")
  	defer fmt.Println("defer 2")
  	fmt.Println("fim")
  	fmt.Println(soma(1, 2, 3, 4, 5))
  }
recursos:
  - https://go.dev/tour/moretypes/24
  - https://gobyexample.com/closures
  - https://gobyexample.com/defer
  - https://go.dev/blog/defer-panic-and-recover
experimentacao:
  desafio: "Crie: (1) uma função variádica que calcule média; (2) um acumulador com closure que mantém estado; (3) um leitor de arquivo que use defer para garantir Close()."
  dicas:
    - "Variadic: func media(nums ...float64) float64"
    - Closure captura a variável, não o valor
    - defer f.Close() logo após abrir o arquivo
    - "Cuidado: defer em loop pode acumular — use função interna"
socializacao:
  discussao: Closures são poderosas mas podem causar bugs sutis. Quais armadilhas você encontrou?
  pontos:
    - Closure capturando variável de loop (clássico bug com goroutines)
    - "Defer em loop: arquivos abertos não fecham até fim da função"
    - "Named returns: clareza vs confusão em funções longas"
  diasDesafio: Dias 8–18
  sugestaoBlog: "Funções em Go: closures, defer e o padrão (T, error)"
  hashtagsExtras: '#golang #functions #defer #closures'
aplicacao:
  projeto: Implemente um mini-logger que usa closures para manter estado (nível, prefixo) e defer para flush no final.
  requisitos:
    - Closure para factory de logger com nível
    - Funções variádicas para mensagens
    - Defer para flush/close
  criterios:
    - Closures corretas
    - Defer no lugar certo
    - Estado encapsulado
---

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
