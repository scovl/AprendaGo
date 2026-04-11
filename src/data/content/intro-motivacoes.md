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
