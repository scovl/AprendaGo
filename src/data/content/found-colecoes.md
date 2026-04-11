## Arrays

Arrays têm tamanho fixo que é **parte do tipo**: `[3]int` e `[4]int` são tipos distintos e incompatíveis. Arrays são **value types** — atribuir copia todos os elementos. Use arrays quando o tamanho é fixo e conhecido (ex: buffers SHA256 `[32]byte`). Para a maioria dos casos, use slices.

## Slices

Slices são referências dinâmicas a arrays subjacentes com **três campos internos**: ponteiro para o array, `len` (elementos usados) e `cap` (capacidade do array a partir do ponteiro). Modificar `s[i]` modifica o array subjacente — sub-slices compartilham memória.

`append()` sempre retorna um novo slice; quando `len == cap`, aloca novo array e copia:
- Para slices com menos de 256 elementos: **dobra** a capacidade
- Para slices maiores: cresce **~25%**

Sempre reatribua: `s = append(s, item)`. Use `make([]T, len, cap)` para pré-alocar capacidade e evitar realocações.

## Maps

Maps são hash tables `key→value`. Chaves devem ser comparáveis com `==` (int, string, structs sem campos slice/map/função). Passar map para função passa a **referência** — modificações são visíveis no caller.

```go
val, ok := m[key]  // comma-ok: distingue "chave ausente" de "chave com valor zero"
delete(m, key)     // seguro mesmo se a chave não existir
```

A ordem de iteração em maps é **intencionalmente aleatória** a cada execução.

## nil vs zero value

| Tipo | nil válido? | Operações seguras em nil |
|---|---|---|
| slice | ✅ | `len`, `cap`, `append` |
| map | ✅ | leitura (retorna zero value) |
| map | ❌ | **escrita causa panic** |

`make()` cria slices, maps e channels com estado inicial válido.
