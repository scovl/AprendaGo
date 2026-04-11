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
