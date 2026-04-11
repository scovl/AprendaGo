---
title: Docker, Cross-compilation e Kubernetes
description: Multistage build, imagens mínimas, cross-comp e Kubernetes manifests.
estimatedMinutes: 55
codeExample: |
  # Dockerfile multistage
  FROM golang:1.22 AS builder
  WORKDIR /app
  COPY go.mod go.sum ./
  RUN go mod download
  COPY . .
  RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /server ./cmd/server

  FROM scratch
  COPY --from=builder /server /server
  EXPOSE 8080
  CMD ["/server"]

  # Cross-compilation:
  # GOOS=linux GOARCH=amd64 go build -o server-linux
  # GOOS=darwin GOARCH=arm64 go build -o server-mac
recursos:
  - https://docs.docker.com/build/building/multi-stage/
  - https://kubernetes.io/docs/home/
experimentacao:
  desafio: Crie Dockerfile multistage para uma API Go, compare tamanho (golang:alpine vs scratch). Depois, crie manifests K8s com Deployment + Service + Ingress.
  dicas:
    - "-ldflags=\"-s -w\" reduz tamanho do binário (~30%)"
    - "scratch: mínimo absoluto, sem shell nem ferramentas"
    - "distroless: sem shell mas com certificados TLS"
    - Kubernetes liveness e readiness probes no /health
socializacao:
  discussao: Por que Go é tão popular em cloud-native?
  pontos:
    - Binário estático = imagem Docker tiny
    - Cross-compilation simplifica CI multi-plataforma
    - "Kubernetes, Docker, Terraform, Prometheus – todos escritos em Go"
  diasDesafio: Dias 97–100
  sugestaoBlog: "Deploy Go: Docker multistage, cross-compilation e Kubernetes"
  hashtagsExtras: '#golang #docker #kubernetes #devops'
aplicacao:
  projeto: Deploy completo com Dockerfile otimizado + manifests Kubernetes + health checks.
  requisitos:
    - Dockerfile multistage com scratch/distroless
    - Deployment + Service + Ingress YAML
    - Health check endpoints (/health, /ready)
  criterios:
    - Imagem < 20MB
    - Deploy funcional
    - Health checks operacionais
---

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
