---
title: Autenticação JWT
description: "JWT: geração, validação, middleware de autenticação e refresh tokens."
estimatedMinutes: 45
recursos:
  - https://github.com/golang-jwt/jwt
  - https://jwt.io/
experimentacao:
  desafio: "Crie middleware JWT que proteja rotas: extraia token do header, valide e injete user ID no context da request."
  dicas:
    - "Header: Authorization: Bearer <token>"
    - strings.TrimPrefix para extrair token
    - context.WithValue para passar claims adiante
socializacao:
  discussao: "JWT vs Sessions: quando usar cada abordagem?"
  pontos:
    - "JWT: stateless, escalável, mas revogação é difícil"
    - "Sessions: stateful, fácil revogar, mas precisa de storage"
    - "Refresh tokens: balance entre segurança e UX"
  diasDesafio: Dias 53–60
  sugestaoBlog: "Autenticação JWT em Go: do login ao middleware com segurança"
  hashtagsExtras: '#golang #jwt #auth #security'
aplicacao:
  projeto: "Sistema de autenticação: register, login, refresh token e rotas protegidas."
  requisitos:
    - bcrypt para hash de senha
    - JWT com expiração
    - Middleware de autenticação
    - Refresh token
  criterios:
    - Senhas hasheadas
    - Tokens com expiração
    - Rotas protegidas funcionais
---

**JWT (JSON Web Token)** é o padrão para autenticação stateless em APIs. Um token JWT tem 3 partes codificadas em base64, separadas por ponto: `header.payload.signature`.

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSJ9.HMAC_SHA256_assinatura
```

## Gerando e validando JWTs em Go

Use `github.com/golang-jwt/jwt/v5`:

```go
// Gerar token
claims := jwt.MapClaims{
    "sub": userID,
    "exp": time.Now().Add(24 * time.Hour).Unix(),
}
token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
signed, err := token.SignedString([]byte(secretKey))

// Validar token
token, err := jwt.Parse(signed, func(t *jwt.Token) (interface{}, error) {
    if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
        return nil, fmt.Errorf("método inesperado: %v", t.Header["alg"])
    }
    return []byte(secretKey), nil
})
```

## Middleware de autenticação

```go
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        // formato: "Bearer <token>"
        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        // valida token, extrai claims, passa no context
        next.ServeHTTP(w, r)
    })
}
```

## Refresh tokens

Refresh tokens permitem renovação sem re-login: emita um **access token** de curta duração (15min) e um **refresh token** de longa duração (7 dias) armazenado em cookie HttpOnly.

> **Segurança:** nunca armazene JWTs em `localStorage` — use cookies HttpOnly + SameSite=Strict para prevenir XSS e CSRF.
