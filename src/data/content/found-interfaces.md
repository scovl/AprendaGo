Interfaces em Go definem **conjuntos de métodos**. Um tipo satisfaz uma interface automaticamente (**implicit satisfaction**) se implementar todos os métodos — sem declaração explícita de `implements`. Isso é duck typing com verificação em compiletime.

## A armadilha do nil-interface

Uma interface tem valor não-nil somente se o **tipo concreto** e o **valor concreto** forem ambos não-nil.

```go
var p *Pessoa        // p é nil
var i Stringer = p   // i é NÃO-nil! (tem tipo concreto *Pessoa, mas valor nil)
fmt.Println(i == nil) // false — armadilha!
```

Para comparar com nil corretamente, compare o tipo concreto diretamente, ou use `reflect.ValueOf(i).IsNil()`.

## Type assertion

```go
val.(Type)         // panics se o tipo não bater
s, ok := val.(string)  // forma segura: ok=false sem pânico
```

**Type switch:**
```go
switch v := x.(type) {
case int:    // v é int
case string: // v é string
}
```

`any` é alias de `interface{}` (Go 1.18+) e aceita qualquer valor.

## Composição de interfaces

Interfaces são compostas por embedding:

```go
type ReadWriter interface {
    io.Reader
    io.Writer
}
```

Siga o princípio de **interfaces pequenas e focadas** (ISP do SOLID): `io.Reader` tem apenas `Read()`, `io.Writer` tem apenas `Write()`. Use interfaces para desacoplar no **ponto de uso**, não no ponto de definição.
