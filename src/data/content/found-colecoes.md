---
title: Arrays, Slices e Maps
description: Estruturas de dados - arrays (fixos), slices (dinâmicos), maps (chave-valor) e make().
estimatedMinutes: 50
codeExample: |
  package main

  import "fmt"

  func main() {
  	var nums [3]int = [3]int{1, 2, 3}
  	frutas := []string{"maçã", "banana", "uva"}
  	frutas = append(frutas, "manga")
  	fmt.Println(len(frutas), cap(frutas))
  	buf := make([]byte, 0, 1024)
  	arr := [5]int{10, 20, 30, 40, 50}
  	sub := arr[1:4]
  	idades := map[string]int{"Alice": 30, "Bob": 25}
  	idades["Carol"] = 28
  	delete(idades, "Bob")
  	idade, ok := idades["Dave"]
  	if !ok {
  		fmt.Println("Dave não encontrado")
  	}
  	for i, f := range frutas {
  		fmt.Printf("%d: %s\n", i, f)
  	}
  	fmt.Println(nums, buf, sub, idade)
  }
recursos:
  - https://go.dev/tour/moretypes/6
  - https://gobyexample.com/slices
  - https://gobyexample.com/maps
experimentacao:
  desafio: Crie um todo list em memória com um slice de structs para tarefas e um map para categorias. Implemente adicionar, listar, marcar como feita e filtrar por categoria.
  dicas:
    - append retorna novo slice — reatribua s = append(s, item)
    - delete(map, key) remove entrada; não dá erro se key não existir
    - Iteração de map não tem ordem garantida
    - Teste len() e cap() antes e depois de append
socializacao:
  discussao: Quando usar array vs slice vs map? Como o Go gerencia a memória de slices?
  pontos:
    - "Arrays: tamanho parte do tipo — [3]int ≠ [4]int"
    - "Slices: grow strategy — dobra para < 256, cresce ~25% depois"
    - "Maps: referência interna — passar para função modifica original"
  diasDesafio: Dias 8–18
  sugestaoBlog: "Arrays, Slices e Maps em Go: o que o Go 101 não te conta"
  hashtagsExtras: '#golang #slices #maps'
aplicacao:
  projeto: Implemente um contador de palavras que leia texto e retorne frequência de cada palavra ordenada por contagem.
  requisitos:
    - Usar map[string]int para frequências
    - Usar strings.Fields para separar palavras
    - Ordenar resultado por frequência (sort.Slice)
  criterios:
    - Contagem correta
    - Tratamento de maiúsculas/minúsculas
    - Código idiomático
---

## Arrays

Arrays têm tamanho fixo que é **parte do tipo**: `[3]int` e `[4]int` são tipos distintos e incompatíveis. Arrays são **value types** — atribuir copia todos os elementos. Use arrays quando o tamanho é fixo e conhecido (ex: buffers SHA256 `[32]byte`). Para a maioria dos casos, use slices.

## Slices

Slices são referências dinâmicas a arrays subjacentes com **três campos internos**: ponteiro para o array, `len` (elementos usados) e `cap` (capacidade do array a partir do ponteiro). Modificar `s[i]` modifica o array subjacente — sub-slices compartilham memória.

`append()` sempre retorna um novo slice; quando `len == cap`, aloca novo array e copia:
- Para slices com menos de 256 elementos: **dobra** a capacidade
- Para slices maiores: cresce **~25%**

Sempre reatribua: `s = append(s, item)`. Use `make([]T, len, cap)` para pré-alocar capacidade e evitar realocações.

## Maps

Maps são hash tables `key→value`. Chaves devem ser comparáveis com `==` (int, string, structs sem campos slice/map/função). Passar map para função passa a **referência** — modificações são visíveis no caller.

```go
val, ok := m[key]  // comma-ok: distingue "chave ausente" de "chave com valor zero"
delete(m, key)     // seguro mesmo se a chave não existir
```

A ordem de iteração em maps é **intencionalmente aleatória** a cada execução.

## nil vs zero value

| Tipo | nil válido? | Operações seguras em nil |
|---|---|---|
| slice | ✅ | `len`, `cap`, `append` |
| map | ✅ | leitura (retorna zero value) |
| map | ❌ | **escrita causa panic** |

`make()` cria slices, maps e channels com estado inicial válido.
