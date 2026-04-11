Strings em Go são sequências **imutáveis de bytes** codificadas em UTF-8. A operação `len(s)` retorna o número de bytes, não de caracteres — um caractere ASCII ocupa 1 byte, mas caracteres Unicode como `"ã"` ou `"世"` ocupam 2–4 bytes. Indexar com `s[i]` retorna um `byte` (uint8), não um caractere — isso silenciosamente corrompe texto multibyte.

Para iterar por caracteres (Unicode code points), use `for i, r := range s`: o `range` decodifica cada `rune` (int32) e avança `i` pelo número correto de bytes. `utf8.RuneCountInString(s)` conta runes corretamente.

## Tipos de literais string

| Tipo | Delimitador | Processa escapes? |
|---|---|---|
| Interpretado | `"..."` | Sim (`\n`, `\t`, `\uXXXX`) |
| Raw | `` `...` `` | Não — preserva tudo, incluindo quebras de linha reais |

Raw strings são ideais para regex, JSON templates e queries SQL multilinha.

## Concatenação eficiente

Strings são imutáveis: o operador `+` cria uma nova alocação a cada uso. Em N concatenações em loop, isso gera **O(N²) cópias**.

`strings.Builder` mantém um buffer crescente interno — `WriteString` não aloca até o flush final com `b.String()`. Use-o sempre que concatenar em loop.

## Pacotes úteis

- `strconv.Itoa` / `Atoi` — conversão int↔string decimal
- `strconv.ParseFloat` / `FormatFloat` — conversão de floats
- `strings.Contains`, `HasPrefix`, `HasSuffix`, `Index`, `Split`, `Join`, `Fields`, `TrimSpace`, `ToLower`, `ToUpper`, `Replace`, `Repeat`
