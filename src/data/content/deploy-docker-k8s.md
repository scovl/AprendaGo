Go compila em **binário estático** — perfeito para containers. A imagem final pode ser minimalista:

## Multistage build

```dockerfile
# Estágio 1: compilar
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

# Estágio 2: imagem final mínima
FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
```

`CGO_ENABLED=0` garante binário estático puro. Imagem final com `distroless` ou `scratch` fica **< 20MB**.

## Cross-compilation

```bash
GOOS=linux GOARCH=amd64 go build -o server-linux
GOOS=darwin GOARCH=arm64 go build -o server-mac
GOOS=windows GOARCH=amd64 go build -o server.exe
```

## Kubernetes

```yaml
# deployment.yaml básico
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: server
        image: myapp:latest
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
```

## Health checks

Implemente endpoints `/health` (liveness) e `/ready` (readiness):

```go
mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
})
```
