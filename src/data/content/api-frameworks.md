---
title: "Frameworks: Chi, Gin e Echo"
description: Middleware chain, subrouters, binding e validação com frameworks populares.
estimatedMinutes: 45
recursos:
  - https://github.com/go-chi/chi
  - https://github.com/gin-gonic/gin
  - https://github.com/labstack/echo
experimentacao:
  desafio: Migre a API CRUD da lição anterior para Chi e depois para Gin. Compare linhas de código, middleware e developer experience.
  dicas:
    - "Chi: chi.URLParam(r, \"id\") para path params"
    - "Gin: c.Param(\"id\"), c.ShouldBindJSON(&input)"
    - "Echo: c.Bind(&input), c.JSON(200, result)"
socializacao:
  discussao: "Chi vs Gin vs Echo vs Fiber – qual framework escolher?"
  pontos:
    - "Chi: stdlib-compatible, ideal para puristas"
    - "Gin: ecosystem grande, popular em empresas"
    - "Echo: DX similar ao Express"
    - "Fiber: fasthttp, max throughput mas não stdlib-compatible"
  diasDesafio: Dias 53–60
  sugestaoBlog: "Chi vs Gin vs Echo: comparando frameworks Go na prática"
  hashtagsExtras: '#golang #chi #gin #echo'
aplicacao:
  projeto: API RESTful com Chi ou Gin com versionamento, middleware de CORS e rate limiting.
  requisitos:
    - Subrouters para /api/v1
    - Middleware de CORS e rate limiting
    - Binding e validação de input
  criterios:
    - Rotas organizadas
    - Middleware funcional
    - Validação robusta
---

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
