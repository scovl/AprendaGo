## Chi

Idiomático e **100% compatível com `net/http`**:

```go
r := chi.NewRouter()
r.Use(middleware.Logger, middleware.Recoverer)
r.Route("/api/v1", func(r chi.Router) {
    r.Get("/users", listUsers)
    r.Post("/users", createUser)
    r.Route("/users/{id}", func(r chi.Router) {
        r.Get("/", getUser)
        r.Put("/", updateUser)
        r.Delete("/", deleteUser)
    })
})
```

Path params: `chi.URLParam(r, "id")`

## Gin

O framework mais popular em Go, com binding e validação integradas:

```go
type CreateUserInput struct {
    Name  string `json:"name" binding:"required"`
    Email string `json:"email" binding:"required,email"`
}

func createUser(c *gin.Context) {
    var input CreateUserInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(201, gin.H{"user": input})
}
```

Path params: `c.Param("id")`

## Comparativo

| Framework | Filosofia | Compatibilidade `net/http` |
|---|---|---|
| Chi | Idiomático, minimal | ✅ Total |
| Gin | Produtividade, binding | ❌ Usa gin.Context |
| Echo | Similar ao Express.js | ❌ Usa echo.Context |
| Fiber | Throughput máximo (fasthttp) | ❌ API completamente diferente |

> **Regra:** Go já é rápido por si só — frameworks adicionam **conveniência**, não performance.
