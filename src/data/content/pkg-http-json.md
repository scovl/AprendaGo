`net/http` tem um cliente HTTP completo e configurável. `http.DefaultClient` tem **timeout zero (nunca expira!)** — em produção, sempre use um cliente customizado:

```go
client := &http.Client{Timeout: 30 * time.Second}
```

`http.Get`/`http.Post` são atalhos para o `DefaultClient` — evite-os em serviços de produção. Para controle total (headers, method, body), use `http.NewRequestWithContext(ctx, method, url, body)`.

## Responses e JSON

Responses HTTP retornam `resp.Body` como `io.ReadCloser` — deve ser fechado com `defer resp.Body.Close()` para liberar a conexão de volta ao pool.

Use `json.NewDecoder(resp.Body).Decode(&v)` para decodificar JSON **diretamente do stream**, sem carregar o body inteiro na memória.

> **Atenção:** um status 404 **não** retorna `err != nil` — o erro é `nil` porque a requisição HTTP foi bem-sucedida. Sempre verifique `resp.StatusCode`.

## Struct tags JSON

```go
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age,omitempty"`  // omite se zero value
    Pass string `json:"-"`             // excluído do JSON
}
```

Tipos não exportados (letra minúscula) são ignorados pelo encoder JSON.

## Tipos especiais

- `json.RawMessage` — armazena JSON bruto sem decodificar; útil para nested JSON dinâmico
- `json.Number` — preserva números como string, evitando perda de precisão em números grandes
- Para tipos customizados, implemente `json.Marshaler` / `json.Unmarshaler`
