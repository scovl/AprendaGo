---
title: Testes Unitários e Table-driven
description: testing.T, table-driven tests, subtests, cobertura e httptest.
estimatedMinutes: 45
recursos:
  - https://go.dev/doc/tutorial/add-a-test
  - https://gobyexample.com/testing
  - https://pkg.go.dev/net/http/httptest
experimentacao:
  desafio: Escreva testes table-driven com t.Run para uma função de validação de email. Depois, teste um HTTP handler usando httptest.NewRequest e httptest.NewRecorder.
  dicas:
    - t.Run("nome", func(t *testing.T) {...}) para subtests
    - go test -v para ver cada subtest
    - go test -cover para cobertura
    - httptest.NewRecorder() captura status e body
socializacao:
  discussao: "Table-driven tests: por que são o padrão em Go? Quanto de cobertura é suficiente?"
  pontos:
    - "Fáceis de estender — adicionar caso é adicionar linha"
    - Subtests com t.Run permitem rodar caso isolado
    - "80% cobertura é bom; 100% nem sempre vale o esforço"
  diasDesafio: Dias 45–52
  sugestaoBlog: "Table-driven tests em Go: o padrão que todo dev Go precisa conhecer"
  hashtagsExtras: '#golang #testing #tdd'
aplicacao:
  projeto: Suite de testes completa para um pacote de utilitários com table-driven + httptest.
  requisitos:
    - Table-driven tests com t.Run
    - Cobertura > 80% (go test -cover)
    - Testes HTTP com httptest
  criterios:
    - Testes passando
    - Edge cases cobertos
    - Boa cobertura
---

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
