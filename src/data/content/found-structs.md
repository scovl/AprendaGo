---
title: Structs, Métodos e Composição
description: Structs, struct tags, métodos com receivers, embedding e composição.
estimatedMinutes: 45
codeExample: |
  package main

  import (
  	"encoding/json"
  	"fmt"
  )

  type Endereco struct {
  	Rua    string `json:"rua"`
  	Cidade string `json:"cidade"`
  }

  type Pessoa struct {
  	Nome     string   `json:"nome"`
  	Idade    int      `json:"idade"`
  	Endereco
  	Senha    string   `json:"-"`
  }

  func (p Pessoa) Saudacao() string {
  	return fmt.Sprintf("Olá, sou %s de %s!", p.Nome, p.Cidade)
  }

  func main() {
  	p := Pessoa{
  		Nome:     "Gopher",
  		Idade:    15,
  		Endereco: Endereco{Rua: "Av Go", Cidade: "São Paulo"},
  		Senha:    "secreta",
  	}
  	fmt.Println(p.Cidade)
  	fmt.Println(p.Saudacao())
  	data, _ := json.MarshalIndent(p, "", "  ")
  	fmt.Println(string(data))
  }
recursos:
  - https://go.dev/tour/moretypes/2
  - https://gobyexample.com/structs
  - https://gobyexample.com/struct-embedding
experimentacao:
  desafio: Modele um sistema de veículos com composição - struct base Veiculo, structs Carro e Moto que embeddam Veiculo. Adicione struct tags JSON e serialize/deserialize.
  dicas:
    - "Embedding: Carro struct { Veiculo; Portas int }"
    - "`json:\"nome,omitempty\"` omite se vazio"
    - json.Marshal/Unmarshal para serialização
socializacao:
  discussao: Composição vs herança - Go escolheu o caminho certo?
  pontos:
    - "Embedding não é herança — não há is-a, é has-a"
    - "Struct tags: metadados sem reflection pesada"
    - "Comparação: classes Java vs structs+embedding Go"
  diasDesafio: Dias 8–18
  sugestaoBlog: "Structs em Go: composição, embedding e struct tags"
  hashtagsExtras: '#golang #structs #composition'
aplicacao:
  projeto: API de dados com structs - modele Produto com categorias usando embedding e serialize para JSON.
  requisitos:
    - Struct tags JSON com omitempty e rename
    - Embedding para campos comuns (timestamps, metadata)
    - Funções de serialização/deserialização
  criterios:
    - Composição correta
    - JSON correto
    - Testes com edge cases
---

Structs agrupam campos nomeados de tipos possivelmente diferentes. Structs são **value types**: atribuição copia todos os campos. A comparação com `==` funciona se todos os campos forem comparáveis.

## Struct tags

Struct tags são literais de string entre backticks nos campos que fornecem metadados para bibliotecas via reflection:

```go
type User struct {
    Name  string `json:"name"`
    Email string `json:"email,omitempty"`
    Pass  string `json:"-"`             // excluído do JSON
}
```

- `json:"nome,omitempty"` — renomeia e omite se zero value
- `validate:"required,min=1"` — para validadores como `go-playground/validator`
- Acessados via `reflect.TypeOf(s).Field(i).Tag.Get("json")`

## Embedding (incorporação)

Embedding inclui um tipo dentro de outro sem nomeação — seus campos e métodos são **promovidos** ao tipo externo:

```go
type Carro struct {
    Veiculo         // embedding — acesso via c.Motor, c.Ligar()
    Portas int
}
```

Não é herança — não há relação is-a e o tipo embedded é acessível como campo normal `c.Veiculo`. Se dois tipos embedded têm campos com o mesmo nome, o acesso ambíguo é um **erro de compilação**.

## Composição sobre herança

Go favorece **composição** sobre hierarquia. Em vez de criar árvores de herança, combine comportamentos por embedding de interfaces e structs. Um struct pode implementar múltiplas interfaces implicitamente — basta ter os métodos requeridos.
