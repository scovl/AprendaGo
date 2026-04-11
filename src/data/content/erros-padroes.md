---
title: Padrões de Erro em Go
description: error interface, errors.New, fmt.Errorf, wrapping com %w, errors.Is e errors.As.
estimatedMinutes: 40
recursos:
  - https://go.dev/blog/error-handling-and-go
  - https://go.dev/blog/go1.13-errors
  - https://gobyexample.com/errors
experimentacao:
  desafio: "Crie 3 tipos de erro: sentinela, customizado com campos e wrapped. Teste errors.Is e errors.As em cada caso."
  dicas:
    - "Sentinela: var ErrNotFound = errors.New(...)"
    - "Wrapping: fmt.Errorf(\"contexto: %w\", err)"
    - "errors.As: extrai struct de erro customizado"
socializacao:
  discussao: "Erros como valores vs exceções: qual abordagem preferem para projetos grandes?"
  pontos:
    - Erros explícitos forçam tratamento imediato
    - Exceptions podem ser esquecidas ou swallowed
    - "Go: happy path à esquerda, error handling à direita"
  diasDesafio: Dias 39–44
  sugestaoBlog: "Error handling em Go: wrapping, errors.Is, errors.As e boas práticas"
  hashtagsExtras: '#golang #errors #bestpractices'
aplicacao:
  projeto: Parser de configuração que retorna erros ricos - sentinela para tipo de falha, customizado para contexto, wrapping para causa raiz.
  requisitos:
    - Erros sentinela para tipos de falha
    - Erros customizados com campos de contexto
    - Testes cobrindo todos os caminhos de erro
  criterios:
    - errors.Is/As funcionando
    - Mensagens claras
    - Cobertura > 90%
---

Em Go, **erros são valores** — qualquer tipo que implemente a interface `error` (método `Error() string`). Essa escolha de design força o tratamento explícito: o compilador não deixa ignorar um valor de retorno. O padrão idiomático é retornar `(T, error)` e verificar `if err != nil` imediatamente.

## Criando e comparando erros

- `errors.New("mensagem")` — cria um valor de erro simples; cada chamada cria um **ponteiro distinto** (mesmo texto ≠ mesma referência)
- **Erros sentinela**: `var ErrNotFound = errors.New("not found")` — variáveis exportadas comparáveis com `errors.Is()`
- `fmt.Errorf("contexto: %w", err)` — cria um erro **wrapped** que encapsula o original e adiciona contexto

## Wrapping e cadeia de erros

```go
errors.Is(err, target)   // percorre a cadeia até encontrar erro igual a target
errors.As(err, &target)  // percorre a cadeia até encontrar tipo atribuível a target
```

Para participar da cadeia de wrapping, seu tipo de erro deve implementar `Unwrap() error`.

## Go 1.20: multi-wrapping

```go
fmt.Errorf("%w ... %w", err1, err2)  // cria erro que aponta para ambos
```

`errors.Is`/`errors.As` percorrem a **árvore completa** de erros.

> **Regra geral:** nunca perca um erro; adicione contexto mas preserve a causa raiz com wrapping.
