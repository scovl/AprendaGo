---
title: Motivações para Aprender Go
description: Entenda por que Go é relevante e quando escolhê-lo.
estimatedMinutes: 20
recursos:
  - https://go.dev/solutions/
  - https://go.dev/doc/faq
experimentacao:
  desafio: Compare Go com uma linguagem que você já conhece. Liste prós e contras de cada uma para APIs web, CLIs e processamento concorrente.
  dicas:
    - Use uma tabela comparativa
    - "Considere: performance, facilidade, ecossistema e comunidade"
    - Go é excelente para backend, CLIs e sistemas — menos para mobile e ML
socializacao:
  discussao: Em quais cenários Go NÃO seria a melhor escolha?
  pontos:
    - Aplicações mobile nativas
    - Machine Learning (comparado com Python)
    - Frontend web — Go é backend/infraestrutura
  diasDesafio: Dias 1–7
  sugestaoBlog: "Go vs outras linguagens: quando escolher e quando não escolher"
  hashtagsExtras: '#golang #beginner'
aplicacao:
  projeto: Escreva um pitch de 1 parágrafo explicando para um colega por que ele deveria aprender Go.
  requisitos:
    - Ser convincente
    - Usar dados reais
    - Mencionar mercado de trabalho
  criterios:
    - Argumentação clara
    - Informações verificáveis
---

Go foi projetado com princípios explícitos: **simplicidade radical sobre expressividade**. A linguagem tem exatamente **25 palavras-chave** (keywords) — menos que Python, Java ou C++. Não há herança, overloading de operadores, coerção implícita, ou assertions de tipo implícitas. Qualquer idiom que parecesse "muito esperto" foi deliberadamente excluído.

## Por que Go é popular em infraestrutura

1. **Compilação ultra-rápida** — projetos grandes compilam em segundos
2. **Binário estático auto-contido** — deploy é copiar um arquivo, sem dependências externas; Docker images minimalistas
3. **Garbage collector de baixa latência** — pausas `<1ms` desde Go 1.14
4. **Goroutines** — concorrência nativa sem lidar com threads OS
5. **Toolchain integrado** — `go fmt`, `go test`, `go vet`, `go build`, `go doc`, `go mod`, `pprof`

## Casos de uso

**Ideal para:** APIs REST/gRPC, microservices, CLIs, ferramentas DevOps (Kubernetes, Docker, Terraform, Hugo são escritos em Go), proxies reversos, sistemas de filas, parsers/compilers.

**Não ideal para:** frontend web (use JavaScript/WASM), ML/Data Science (use Python), mobile (use Swift/Kotlin/Flutter), jogos (use C++/Rust).

O mercado paga bem por Go: é consistentemente uma das linguagens mais bem-pagas em surveys do Stack Overflow.
