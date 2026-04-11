---
title: Multi-erros e Erros Estruturados
description: errors.Join, go-multierror, eris e estratégias de produção.
estimatedMinutes: 40
recursos:
  - https://pkg.go.dev/errors#Join
  - https://github.com/uber-go/multierr
  - https://github.com/rotisserie/eris
experimentacao:
  desafio: Implemente um importador de CSV que processa todas as linhas e coleta todos os erros de validação (com número da linha) sem abortar na primeira falha.
  dicas:
    - errors.Join agrupa erros – nil se slice vazio
    - Inclua número da linha no contexto do erro
    - Para output JSON dos erros, crie struct ErrorReport
socializacao:
  discussao: Quando usar stack traces em erros? Há custo de performance?
  pontos:
    - Stack traces úteis em dev, caros em prod
    - Logging estruturado (slog/zap) como alternativa
    - OpenTelemetry para rastreamento distribuído
  diasDesafio: Dias 39–44
  sugestaoBlog: "Multi-erros em Go: errors.Join e estratégias para batch processing"
  hashtagsExtras: '#golang #errors #observability'
aplicacao:
  projeto: Validador de JSON array que processa todos os itens e retorna relatório completo de erros.
  requisitos:
    - Processar todos itens mesmo com erros
    - "Erros com contexto: índice + campo + mensagem"
    - Output para humanos (texto) e máquinas (JSON)
  criterios:
    - Nenhum erro perdido
    - Relatório claro
    - Testes com inputs variados
---

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
