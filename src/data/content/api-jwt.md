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
