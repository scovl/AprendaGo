Go tem servidor HTTP robusto na stdlib. A partir do **Go 1.22**, o `ServeMux` suporta métodos HTTP e path params nativamente:

```go
mux := http.NewServeMux()
mux.HandleFunc("GET /api/users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    json.NewEncoder(w).Encode(map[string]string{"id": id})
})
http.ListenAndServe(":8080", mux)
```

## Templates HTML

`html/template` renderiza HTML **seguro** — escape automático contra XSS. `text/template` é para texto puro sem preocupação com HTML. `template.Must` panics se o template tiver erros de parse — use para templates estáticos em init.

## Arquivos estáticos

```go
mux.Handle("GET /static/",
    http.StripPrefix("/static/", http.FileServer(http.Dir("./public"))))
```

## Middleware

Funções que wrappam `http.Handler`:

```go
func logMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
```

## Quando usar frameworks

A stdlib (Go 1.22+) é suficiente para muitos casos. Frameworks como Chi, Gin e Echo adicionam **conveniência** (middleware chain, binding automático, validação) — não performance.
