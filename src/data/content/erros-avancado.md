## errors.Join (Go 1.20+)

Em operações batch e paralelas, a boa prática é não abortar no primeiro erro — processe tudo e reporte todos os erros no final.

```go
errs := []error{}
for _, item := range items {
    if err := process(item); err != nil {
        errs = append(errs, err)
    }
}
return errors.Join(errs...)  // retorna nil se todos os itens forem nil
```

`errors.Is` e `errors.As` atravessam a árvore de erros joinados.

## panic e recover

`panic(v)` para a execução normal e começa a desenrolar a call stack, executando funções deferridas em ordem LIFO. Se não for recuperado, o runtime imprime a stack trace e termina o programa. Apenas a goroutine que panicou é afetada no unwind — mas se chegar ao topo sem `recover`, **o programa todo termina**.

`recover()` captura o valor passado ao `panic` — mas **apenas se chamado diretamente dentro de uma função deferrida**. Fora de `defer`, `recover()` retorna `nil`.

O padrão idiomático em servidores HTTP: cada handler executa com um `recover` para evitar que um panic em um request derrube o servidor inteiro.

> **Go 1.21:** `panic(nil)` é equivalente a `panic(new(runtime.PanicNilError))` — código que checa `recover() != nil` precisa também tratar `*runtime.PanicNilError`.

## Erros em produção

- `github.com/rotisserie/eris` — wrapping com stack trace
- `go.uber.org/multierr` — multiple errors
- `log/slog` (stdlib Go 1.21+) — logging estruturado nativo

Use erros padrão para lógica de negócio; reserve `panic` para **invariantes violados** (bugs no código do programador, não erros de input).
