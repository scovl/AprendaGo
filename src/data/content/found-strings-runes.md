---
title: Strings e Runes
description: Strings imutáveis, runes Unicode, raw strings, strings.Builder e o pacote strings.
estimatedMinutes: 35
codeExample: |
  package main

  import (
  	"fmt"
  	"strings"
  	"unicode/utf8"
  )

  func main() {
  	s := "Olá 世界"
  	fmt.Println(len(s))
  	fmt.Println(utf8.RuneCountInString(s))
  	for i, r := range s {
  		fmt.Printf("pos %d: %c (U+%04X)\n", i, r, r)
  	}
  	query := `SELECT * FROM users WHERE active = true`
  	fmt.Println(query)
  	var b strings.Builder
  	for i := 0; i < 100; i++ {
  		b.WriteString("Go ")
  	}
  	fmt.Println(b.Len())
  }
recursos:
  - https://go.dev/blog/strings
  - https://gobyexample.com/strings-and-runes
  - https://pkg.go.dev/strings
experimentacao:
  desafio: Crie um programa que conta quantos caracteres Unicode (runes), bytes e palavras existem em um texto informado pelo usuário. Teste com texto em português (acentos) e japonês/emoji.
  dicas:
    - len(s) conta bytes, utf8.RuneCountInString(s) conta runes
    - strings.Fields separa por whitespace
    - for _, r := range s itera por rune
socializacao:
  discussao: Por que Go diferencia bytes de runes? Como isso afeta aplicações internacionais?
  pontos:
    - UTF-8 foi co-criado por Ken Thompson (criador do Go)
    - Indexar string por byte pode quebrar caracteres multibyte
    - "Comparação: strings em Python (Unicode) vs Go (bytes)"
  diasDesafio: Dias 8–18
  sugestaoBlog: "Strings e Runes em Go: UTF-8, Unicode e armadilhas comuns"
  hashtagsExtras: '#golang #strings #unicode'
aplicacao:
  projeto: Implemente um analisador de texto que recebe texto via stdin e retorna contagem de caracteres, palavras, linhas, frequência de letras e as 5 palavras mais comuns.
  requisitos:
    - Contar runes (não bytes)
    - Usar strings.Fields e strings.ToLower
    - Map para frequência de palavras
  criterios:
    - Contagem Unicode correta
    - Tratamento de acentos
    - Código idiomático
---

Strings em Go são sequências **imutáveis de bytes** codificadas em UTF-8. A operação `len(s)` retorna o número de bytes, não de caracteres — um caractere ASCII ocupa 1 byte, mas caracteres Unicode como `"ã"` ou `"世"` ocupam 2–4 bytes. Indexar com `s[i]` retorna um `byte` (uint8), não um caractere — isso silenciosamente corrompe texto multibyte.

Para iterar por caracteres (Unicode code points), use `for i, r := range s`: o `range` decodifica cada `rune` (int32) e avança `i` pelo número correto de bytes. `utf8.RuneCountInString(s)` conta runes corretamente.

## Tipos de literais string

| Tipo | Delimitador | Processa escapes? |
|---|---|---|
| Interpretado | `"..."` | Sim (`\n`, `\t`, `\uXXXX`) |
| Raw | `` `...` `` | Não — preserva tudo, incluindo quebras de linha reais |

Raw strings são ideais para regex, JSON templates e queries SQL multilinha.

## Concatenação eficiente

Strings são imutáveis: o operador `+` cria uma nova alocação a cada uso. Em N concatenações em loop, isso gera **O(N²) cópias**.

`strings.Builder` mantém um buffer crescente interno — `WriteString` não aloca até o flush final com `b.String()`. Use-o sempre que concatenar em loop.

## Pacotes úteis

- `strconv.Itoa` / `Atoi` — conversão int↔string decimal
- `strconv.ParseFloat` / `FormatFloat` — conversão de floats
- `strings.Contains`, `HasPrefix`, `HasSuffix`, `Index`, `Split`, `Join`, `Fields`, `TrimSpace`, `ToLower`, `ToUpper`, `Replace`, `Repeat`
