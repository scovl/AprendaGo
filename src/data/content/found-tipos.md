---
title: Sistema de Tipos e Variáveis
description: Tipos primitivos, var, :=, constantes, iota, zero values, conversão e escopo.
estimatedMinutes: 45
codeExample: |
  package main

  import (
  	"fmt"
  	"strconv"
  )

  type Permission uint

  const (
  	Readable   Permission = 1 << iota
  	Writable
  	Executable
  )

  func main() {
  	var nome string = "Go"
  	idade := 15
  	var x int
  	var s string
  	var b bool
  	var p *int
  	f := float64(idade)
  	n := int(f)
  	fmt.Println(string(65))
  	fmt.Println(strconv.Itoa(65))
  	perms := Readable | Writable
  	fmt.Println(perms&Executable != 0)
  	fmt.Println(nome, idade, x, s, b, p, f, n)
  }
recursos:
  - https://go.dev/tour/basics/8
  - https://gobyexample.com/variables
  - https://gobyexample.com/constants
experimentacao:
  desafio: Crie variáveis de todos os tipos básicos do Go, imprima seus zero values. Crie uma enumeração com iota para estados de um pedido (Pendente, Pago, Enviado, Entregue). Teste conversões entre int, float64 e string.
  dicas:
    - Use %T em fmt.Printf para ver o tipo de uma variável
    - "Conversão string ↔ int: strconv.Itoa(), strconv.Atoi()"
    - string(65) retorna "A" (converte rune), não "65"
    - Escopo variável declarada em if {} não existe fora dele
socializacao:
  discussao: Quais são as vantagens e desvantagens da tipagem forte do Go comparada com linguagens dinâmicas?
  pontos:
    - Segurança em tempo de compilação vs flexibilidade
    - var vs := — quando usar cada um?
    - Por que Go não tem conversão implícita como C?
  diasDesafio: Dias 8–18
  sugestaoBlog: "Sistema de tipos em Go: tipagem forte, zero values, iota e conversões"
  hashtagsExtras: '#golang #types #gobasics'
aplicacao:
  projeto: Crie uma calculadora de conversão de temperaturas (Celsius ↔ Fahrenheit ↔ Kelvin) com enum de unidade via iota.
  requisitos:
    - Enum de unidades com iota
    - Variáveis tipadas corretamente
    - Conversão com funções e fmt.Scan para entrada
  criterios:
    - Tipos corretos
    - Conversões precisas
    - Código limpo
---

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
