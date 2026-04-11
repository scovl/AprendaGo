---
title: API CRUD com Standard Library
description: REST API completa com net/http, JSON e middleware básico.
estimatedMinutes: 40
recursos:
  - https://pkg.go.dev/net/http
experimentacao:
  desafio: "Crie uma API CRUD para livros com a stdlib: GET (lista e por ID), POST, PUT, DELETE. Use map como banco em memória. Adicione middleware de logging."
  dicas:
    - r.PathValue("id") para path params (Go 1.22+)
    - w.WriteHeader(http.StatusCreated) para POST
    - json.NewDecoder(r.Body).Decode(&struct) para parse
socializacao:
  discussao: Standard library é suficiente para APIs em produção?
  pontos:
    - Go 1.22 melhorou muito – path params e métodos nativos
    - Middleware é manual mas funcional
    - Frameworks adicionam conveniência, não performance
  diasDesafio: Dias 53–60
  sugestaoBlog: "REST API em Go com standard library: CRUD completo sem frameworks"
  hashtagsExtras: '#golang #api #rest'
aplicacao:
  projeto: API CRUD de tarefas (todo) com standard library e testes com httptest.
  requisitos:
    - GET/POST/PUT/DELETE
    - JSON I/O
    - Status codes corretos
    - Testes httptest
  criterios:
    - RESTful
    - Tratamento de erros
    - Testes cobrindo happy path e erros
---

Com **Go 1.22+**, o `ServeMux` suporta métodos HTTP e path params nativamente:

```go
mux.HandleFunc("GET /api/users/{id}", getUser)
mux.HandleFunc("POST /api/users", createUser)
mux.HandleFunc("PUT /api/users/{id}", updateUser)
mux.HandleFunc("DELETE /api/users/{id}", deleteUser)
```

Combine com `json.NewDecoder`/`Encoder` para I/O JSON, status codes corretos (`http.StatusCreated`, `http.StatusNotFound`) e middleware como funções que wrappam handlers:

```go
func logMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
```

## Pattern: handler struct

Ao compartilhar dependências (DB, logger, cache) entre handlers, use uma struct:

```go
type API struct {
    db     *sql.DB
    logger *slog.Logger
}

func (a *API) getUser(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    // usa a.db e a.logger
}
```

## Melhores práticas REST

- Use os status codes corretos: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
- Retorne `Content-Type: application/json` explicitamente
- Valide input antes de processar — nunca confie em dados do cliente
