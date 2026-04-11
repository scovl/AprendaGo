Structs agrupam campos nomeados de tipos possivelmente diferentes. São os building blocks de dados em Go — análogos a classes, mas **sem herança**. Structs são **value types**: atribuição copia todos os campos. A comparação com `==` funciona se todos os campos forem comparáveis.

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
