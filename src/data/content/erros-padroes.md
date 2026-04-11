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
