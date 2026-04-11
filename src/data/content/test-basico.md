Go tem testes nativos: arquivos `_test.go` no mesmo diretório do código; funções `TestNome(t *testing.T)` são detectadas automaticamente por `go test`.

| Função | Comportamento |
|---|---|
| `t.Error` / `t.Errorf` | Marca falha, mas **continua** executando o teste |
| `t.Fatal` / `t.Fatalf` | Marca falha e **para** imediatamente |
| `t.Helper()` | Faz o reporter apontar para o **caller**, não para a função auxiliar |

## Table-driven tests

O idioma padrão em Go: define-se um slice de structs com campos `nome`, `input` e `expected`:

```go
cases := []struct {
    nome     string
    a, b     int
    expected int
}{
    {"positivos", 1, 2, 3},
    {"zeros", 0, 0, 0},
}
for _, tc := range cases {
    t.Run(tc.nome, func(t *testing.T) {
        got := Soma(tc.a, tc.b)
        if got != tc.expected {
            t.Errorf("got %d; want %d", got, tc.expected)
        }
    })
}
```

`go test -run TestSoma/positivos` roda somente o subtest `"positivos"`. Subtests podem chamar `t.Parallel()` — mas cuidado com captura de variável de loop (**Go 1.22+ corrigiu isso**).

## Cobertura

```bash
go test -cover                         # porcentagem na saída
go test -coverprofile=c.out            # gera arquivo
go tool cover -html=c.out              # visão interativa no browser
```

> **Cobertura não é métrica de qualidade por si só** — 80% com casos bem escolhidos vale mais que 100% com asserts triviais.

## HTTP testing

- `httptest.NewRecorder()` — captura status, headers e body sem bind em porta real
- `httptest.NewServer(handler)` — sobe servidor real em porta aleatória para testes de integração
