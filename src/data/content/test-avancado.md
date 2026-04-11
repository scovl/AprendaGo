---
title: Mocks, Fuzzing e Benchmarks
description: Interfaces para mocking, testify, fuzzing (Go 1.18+), benchmarks e profiling.
estimatedMinutes: 45
recursos:
  - https://github.com/stretchr/testify
  - https://go.dev/doc/fuzz/
  - https://pkg.go.dev/testing#hdr-Benchmarks
experimentacao:
  desafio: Crie mock para uma interface Repository, escreva testes isolados do banco, adicione benchmark para uma função de sorting e fuzz para um parser.
  dicas:
    - "Mock manual: struct que implementa interface"
    - "Testify: assert.Equal(t, expected, got)"
    - go test -bench=. -benchmem -count=5
    - go test -fuzz=FuzzNome -fuzztime=30s
socializacao:
  discussao: "Mocks vs integration tests: qual o balanço ideal?"
  pontos:
    - "Mocks: rápidos, isolados, testam lógica"
    - "Integration: lentos, reais, testam conexão"
    - Fuzzing encontra bugs que testes manuais não acham
  diasDesafio: Dias 45–52
  sugestaoBlog: "Mocks, Fuzzing e Benchmarks: testando além do básico em Go"
  hashtagsExtras: '#golang #testing #fuzzing #benchmark'
aplicacao:
  projeto: Adicione testes completos a um projeto com unit (mock), fuzz (parser) e bench (hot path).
  requisitos:
    - Mocks para dependências externas
    - Fuzzing para funções que aceitam input do usuário
    - Benchmarks para funções críticas
  criterios:
    - Suite completa
    - Mocks isolam deps
    - Benchmarks documentados
---

## Mocking com interfaces

Mocking em Go é feito naturalmente com interfaces: define-se a dependência como interface, e o teste fornece uma implementação fake. **Não é necessário framework especial.**

```go
type UserRepo interface {
    FindByID(id string) (*User, error)
}

type mockRepo struct{ users map[string]*User }

func (m *mockRepo) FindByID(id string) (*User, error) {
    u, ok := m.users[id]
    if !ok { return nil, ErrNotFound }
    return u, nil
}
```

- **Testify** (`github.com/stretchr/testify`): `assert.Equal(t, expected, got)` com diff claro, `require` (fatal na primeira falha)
- **gomock** (`uber-go/mock`): gera código de mock a partir de interfaces via `mockgen`

## Benchmarks

```go
func BenchmarkSoma(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Soma(1, 2)
    }
}
```

```bash
go test -bench=. -benchmem -benchtime=5s -count=3
```

- `-benchmem`: mostra `allocs/op` e `B/op` — essencial para otimizar hot paths
- `b.ResetTimer()`: reinicia o contador após setup
- `b.ReportAllocs()`: equivalente a `-benchmem` para o benchmark específico

## Fuzzing (Go 1.18+)

```go
func FuzzSoma(f *testing.F) {
    f.Add(1, 2)  // seed corpus
    f.Fuzz(func(t *testing.T, a, b int) {
        result := Soma(a, b)
        if result != a+b {
            t.Errorf("Soma(%d, %d) = %d", a, b, result)
        }
    })
}
```

```bash
go test -fuzz=FuzzSoma -fuzztime=30s
```

Inputs que causam panic são salvos em `testdata/fuzz/FuzzNome/` e reproduzidos em execuções normais.

## Profiling

```bash
go test -cpuprofile=cpu.out -memprofile=mem.out
go tool pprof cpu.out
```
