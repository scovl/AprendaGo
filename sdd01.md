# SDD01 — Enriquecimento do AprendaGo com awesome-go e Go 101

> Documento de especificação para incorporar conteúdo do [awesome-go](https://github.com/awesomelists/awesome-go) e da série [Go 101](https://go101.org) ao projeto AprendaGo.
> Instalação local: `go install go101.org/go101@latest` (executar `go101` para servidor local na porta 55555).

---

## 1. Novos Módulos Propostos

### 1.1 Módulo: Generics (Novo)
**Fonte**: Go 101 — Go Generics 101

| Lição | Conteúdo MESA | Referências |
|-------|---------------|-------------|
| Introdução a Custom Generics | Conceito, motivação, sintaxe básica | [go101.org/generics/333](https://go101.org/generics/333-about-go-generics.html) |
| Constraints e Type Parameters | Definindo constraints, ~tipo, comparable | [go101.org/generics/555](https://go101.org/generics/555-type-constraints-and-parameters.html) |
| Instanciação e Inferência de Tipos | Como o compilador resolve tipos genéricos | [go101.org/generics/666](https://go101.org/generics/666-generic-instantiations-and-type-argument-inferences.html) |
| Operações em Tipos Paramétricos | O que é permitido fazer com valores de tipo genérico | [go101.org/generics/777](https://go101.org/generics/777-operations-on-values-of-type-parameter-types.html) |
| Status Atual e Limitações | Limitações conhecidas da implementação atual | [go101.org/generics/888](https://go101.org/generics/888-the-status-quo-of-go-custom-generics.html) |

**Socialização MESA — #100DaysOfCode (Dias 41–48):**
- Postar diariamente: "Dia X — Explorando Generics em Go: [o que aprendi hoje]"
- Artigo sugerido para blog: *"Generics em Go: constraints, inferência e os limites da implementação atual"*
- Discutir no [Go Forum](https://forum.golangbridge.org) ou [Gopher Slack](https://invite.slack.golangbridge.org) sobre cases reais de uso de generics

---

### 1.2 Módulo: Otimizações e Performance (Novo)
**Fonte**: Go 101 — Go Optimizations 101 + awesome-go (Performance)

| Lição | Conteúdo MESA | Referências |
|-------|---------------|-------------|
| Value Parts e Tamanhos de Tipos | Tamanhos de valores, alinhamento de memória, padding em structs | [go101.org/optimizations](https://go101.org/optimizations/101.html) |
| Alocações de Memória e Escape Analysis | Heap vs Stack, como controlar onde valores são alocados | [go101.org/optimizations/0.3](https://go101.org/optimizations/0.3-memory-allocations.html) |
| Garbage Collector | GC pacer, como reduzir pressão do GC, frequência | Go 101 Optimizations |
| BCE (Bounds Check Elimination) | Casos onde BCE funciona e como dar dicas ao compilador | [go101.org/optimizations/5-bce](https://go101.org/optimizations/5-bce.html) |
| Benchmarking na Prática | Ferramentas e técnicas de benchmark | [go-benchmark-app](https://github.com/mrLSD/go-benchmark-app), [vizb](https://github.com/goptics/vizb) |
| Otimização de Funções | Inlining, parâmetros pointer vs non-pointer, named results | Go 101 Optimizations |
| Otimização de Slices, Maps e Strings | 10+ dicas para cada tipo | Go 101 Optimizations |

**Socialização MESA — #100DaysOfCode (Dias 91–96):**
- Postar benchmarks antes/depois: "Dia X — Otimizei [operação] em Go: de Yms para Zms"
- Artigo sugerido para blog: *"Otimizando Go: escape analysis, BCE e dicas práticas de performance"*
- Compartilhar resultados de `go test -bench` com screenshots

---

### 1.3 Módulo: Quizzes e Desafios (Novo)
**Fonte**: Go 101 — Go Quizzes 101

Módulo interativo para consolidação de conhecimento via questões de múltipla escolha.

| Categoria do Quiz | Quizzes Disponíveis | Mapeamento com Módulo Existente |
|-------------------|--------------------|---------------------------------|
| Slices | 3 quizzes | Foundation |
| Maps | 1 quiz | Foundation |
| Channels | 1 quiz | Concorrência |
| Loops | 4 quizzes | Foundation |
| Switch | 1 quiz | Foundation |
| Defer | 2 quizzes | Pacotes Importantes |
| Panic/Recover | 2 quizzes | Pacotes Importantes |
| Reflect | 2 quizzes | Golang Internals |
| Constants | 4 quizzes | Foundation |
| Operators | 3 quizzes | Foundation |
| Function Calls | 1 quiz | Foundation |
| Scope | 2 quizzes | Foundation |
| Nil | 1 quiz | Foundation |
| Embedding | 1 quiz | Foundation |

**Implementação**: Criar componente `QuizView` no AprendaGo com questões importadas do Go Quizzes 101, integrado à fase "Experimentação" da MESA.

**Socialização MESA — #100DaysOfCode:**
- Postar resultado dos quizzes: "Dia X — Acertei Y/Z no quiz de [tema] do Go 101! #100DaysOfCode"
- Compartilhar quizzes que erraram e o que aprenderam com a resposta — ensinar é aprender duas vezes
- Artigo sugerido para blog: *"Go Quizzes: as pegadinhas que todo Gopher deveria conhecer"*

---

### 1.4 Módulo: Tratamento de Erros (Novo)
**Fonte**: awesome-go (Error Handling)

| Lição | Conteúdo MESA | Bibliotecas Recomendadas |
|-------|---------------|------------------------|
| Padrões de Erro em Go | errors.New, fmt.Errorf, error wrapping | stdlib |
| Erros Estruturados | Stack traces, campos contextuais | [eris](https://github.com/rotisserie/eris), [tracerr](https://github.com/ztrue/tracerr) |
| Multi-erros | Coletar múltiplos erros em operações paralelas | [go-multierror](https://github.com/hashicorp/go-multierror), [multierr](https://github.com/uber-go/multierr) |
| Error Handling Avançado | Erros funcionais, retry patterns, error groups | [emperror](https://github.com/emperror/emperror), [errorx](https://github.com/joomcode/errorx) |
| Erros Agradáveis ao Usuário | Mensagens amigáveis, erros HTTP, oops | [oops](https://github.com/samber/oops) |

**Socialização MESA — #100DaysOfCode (Dias 35–40):**
- Postar exemplos de antes/depois: "Dia X — Refatorei error handling usando [biblioteca]"
- Artigo sugerido para blog: *"Error handling idiomático em Go: wrapping, multi-errors e boas práticas"*
- Responder no [Stack Overflow tag:go](https://stackoverflow.com/questions/tagged/go) perguntas sobre error handling

---

## 2. Enriquecimento de Módulos Existentes

### 2.1 Módulo: Introdução à Linguagem (Existente)
**Novos recursos do Go 101**:
- [Introduction of Source Code Elements](https://go101.org/article/basic-code-elements-introduction.html)
- [Keywords and Identifiers](https://go101.org/article/keywords-and-identifiers.html)
- [Basic Types and Value Literals](https://go101.org/article/basic-types-and-value-literals.html)
- [The Go Toolchain](https://go101.org/article/go-toolchain.html)

**Recursos adicionais**:
- [A Tour of Go](https://tour.golang.org/) — Tour interativo oficial
- [50 Shades of Go](https://golang50shades.github.io/) — Armadilhas comuns para iniciantes
- [Go By Example](https://gobyexample.com/) — Exemplos anotados
- [Go Cheat Sheet](https://github.com/a8m/go-lang-cheat-sheet)
- [Learn Go with 1000+ Exercises](https://github.com/inancgumus/learngo)

**Socialização MESA — #100DaysOfCode (Dias 1–7):**
- Começar o desafio! Primeiro post: "Dia 1/100 — Começando minha jornada com Go! #100DaysOfCode #100DaysOfGo"
- Configurar o blog (Hugo + GitHub Pages ou dev.to) e publicar: *"Por que escolhi Go e como configurei meu ambiente"*
- Escolher a rede social ([X](https://x.com), [Mastodon](https://mastodon.social/) ou [Bluesky](https://bsky.app/)) e seguir a hashtag `#100DaysOfCode`

---

### 2.2 Módulo: Foundation (Existente)
**Novos recursos do Go 101 — Go Type System**:
- [Go Type System Overview](https://go101.org/article/type-system-overview.html) — **leitura obrigatória**
- [Pointers](https://go101.org/article/pointer.html)
- [Structs](https://go101.org/article/struct.html)
- [Value Parts](https://go101.org/article/value-part.html) — entendimento profundo de valores
- [Arrays, Slices and Maps](https://go101.org/article/container.html)
- [Strings](https://go101.org/article/string.html)
- [Functions](https://go101.org/article/function.html) — inclui funções variádicas
- [Methods](https://go101.org/article/method.html)
- [Interfaces](https://go101.org/article/interface.html) — polimorfismo e reflexão
- [Type Embedding](https://go101.org/article/type-embedding.html)

**Go 101 — Special Topics para Foundation**:
- [Code Blocks and Identifier Scopes](https://go101.org/article/blocks-and-scopes.html)
- [Expression Evaluation Orders](https://go101.org/article/evaluation-orders.html)
- [Value Copy Costs](https://go101.org/article/value-copy-cost.html)

**Go 101 — Details & Tips**:
- Semicolon insertion automática
- Normalization de method selectors
- Comparação de arrays elemento por elemento
- `json.Unmarshal` aceita keys case-insensitive

**Socialização MESA — #100DaysOfCode (Dias 8–18):**
- Postar snippets de código: "Dia X — Hoje descobri que [detalhe surpreendente] sobre o type system de Go"
- Artigo sugerido para blog: *"Go Type System: o que me surpreendeu vindo de [sua linguagem anterior]"*
- Compartilhar resultados dos quizzes de slices, maps, constants no Go Quizzes 101

---

### 2.3 Módulo: Concorrência e Multithreading (Existente)
**Novos recursos do Go 101 — Concurrent Programming**:
- [Concurrency Synchronization Overview](https://go101.org/article/concurrent-synchronization-overview.html)
- [Channel Use Cases](https://go101.org/article/channel-use-cases.html)
- [How to Gracefully Close Channels](https://go101.org/article/channel-closing.html)
- [Sync Package Techniques](https://go101.org/article/concurrent-synchronization-more.html)
- [Atomic Operations](https://go101.org/article/concurrent-atomic-operation.html)
- [Memory Order Guarantees](https://go101.org/article/memory-model.html)
- [Common Concurrent Mistakes](https://go101.org/article/concurrent-common-mistakes.html)

**Bibliotecas do awesome-go — Goroutines**:
| Biblioteca | Uso | URL |
|------------|-----|-----|
| **ants** | Pool de goroutines de alta performance | [github.com/panjf2000/ants](https://github.com/panjf2000/ants) |
| **conc** | Concorrência estruturada (melhor error handling) | [github.com/sourcegraph/conc](https://github.com/sourcegraph/conc) |
| **pond** | Worker pool minimalista e performático | [github.com/alitto/pond](https://github.com/alitto/pond) |
| **tunny** | Pool de goroutines idiomática | [github.com/Jeffail/tunny](https://github.com/Jeffail/tunny) |
| **rill** | Toolkit para concorrência baseada em channels | [github.com/destel/rill](https://github.com/destel/rill) |
| **errgroup** | Grupos de goroutines com propagação de erro | [neilotoole/errgroup](https://github.com/neilotoole/errgroup) |
| **flowmatic** | Concorrência estruturada (type-safe) | [github.com/carlmjohnson/flowmatic](https://github.com/carlmjohnson/flowmatic) |

**Socialização MESA — #100DaysOfCode (Dias 25–34):**
- Postar diagramas ou animações de goroutines: "Dia X — Implementei um worker pool com [ants/pond/tunny]"
- Artigo sugerido para blog: *"Goroutines e Channels: concorrência sem medo em Go"*
- Compartilhar o mini-projeto de Load Balancer do módulo e pedir code review na comunidade

---

### 2.4 Módulo: Desenvolvimento de APIs (Existente)
**Web Frameworks do awesome-go — Top recomendados**:
| Framework | Descrição | Stars |
|-----------|-----------|-------|
| **Gin** | HTTP web framework com API Martini-like | [github.com/gin-gonic/gin](https://github.com/gin-gonic/gin) |
| **Echo** | Framework minimalista e performático | [github.com/labstack/echo](https://github.com/labstack/echo) |
| **Fiber** | Framework inspirado no Express.js, feito com Fasthttp | [github.com/gofiber/fiber](https://github.com/gofiber/fiber) |
| **chi** | Roteador HTTP leve e idiomático (já no sdd) | [github.com/go-chi/chi](https://github.com/go-chi/chi) |
| **Fuego** | Framework com OpenAPI 3 automático | [github.com/go-fuego/fuego](https://github.com/go-fuego/fuego) |
| **GoFr** | Framework opinado para microserviços | [github.com/gofr-dev/gofr](https://github.com/gofr-dev/gofr) |
| **Huma** | Framework para building REST/HTTP APIs com OpenAPI 3.1 | [github.com/danielgtaylor/huma](https://github.com/danielgtaylor/huma) |

**Middlewares**:
- [CORS](https://github.com/rs/cors) — Cross-Origin Resource Sharing
- [Limiter](https://github.com/ulule/limiter) — Rate limiting
- [Tollbooth](https://github.com/didip/tollbooth) — Rate limiter HTTP middleware
- [alice](https://github.com/justinas/alice) — Encadeamento de handlers
- [negroni](https://github.com/urfave/negroni) — Middleware HTTP idiomático

**Routers**:
- [httprouter](https://github.com/julienschmidt/httprouter) — Router de alta performance
- [mux](https://github.com/gorilla/mux) — Router e dispatcher poderoso
- [FastHTTPRouter](https://github.com/buaazp/fasthttprouter) — Router para fasthttp

**Socialização MESA — #100DaysOfCode (Dias 49–56):**
- Postar a API rodando: "Dia X — Minha primeira REST API em Go com [chi/Gin/Echo] + JWT!"
- Artigo sugerido para blog: *"Construindo uma REST API com chi, middleware e JWT em Go"*
- Documentar a API com Swagger e compartilhar o link público

---

### 2.5 Módulo: Testes Automatizados (Existente)
**Testing Frameworks do awesome-go**:
| Ferramenta | Uso | URL |
|------------|-----|-----|
| **testify** | Assertions, mocks e suites | [github.com/stretchr/testify](https://github.com/stretchr/testify) |
| **ginkgo** | BDD testing framework | [github.com/onsi/ginkgo](https://github.com/onsi/ginkgo) |
| **GoConvey** | BDD com interface web | [github.com/smartystreets/goconvey](https://github.com/smartystreets/goconvey) |
| **go-cmp** | Comparação avançada de valores | [github.com/google/go-cmp](https://github.com/google/go-cmp) |
| **gomock** | Mocking framework oficial | [github.com/golang/mock](https://github.com/golang/mock) |
| **mockery** | Geração automática de mocks | [github.com/vektra/mockery](https://github.com/vektra/mockery) |
| **dvyukov/go-fuzz** | Fuzz testing randomizado | [github.com/dvyukov/go-fuzz](https://github.com/dvyukov/go-fuzz) |
| **go-mutesting** | Testes de mutação | [github.com/zimmski/go-mutesting](https://github.com/zimmski/go-mutesting) |

**Selenium & Browser Testing**:
- [chromedp](https://github.com/chromedp/chromedp) — Chrome DevTools Protocol
- [playwright-go](https://github.com/playwright-community/playwright-go) — Playwright para Go

**Nova lição sugerida**: "Fuzz Testing Nativo" — Go 1.18+ inclui fuzz testing nativo com `go test -fuzz`.

**Socialização MESA — #100DaysOfCode (Dias 57–64):**
- Postar cobertura de testes: "Dia X — De 0% para Y% de cobertura no meu projeto Go! #100DaysOfCode"
- Artigo sugerido para blog: *"Testando Go: de unit tests a fuzzing — meu guia prático"*
- Contribuir com testes para um projeto open-source Go no GitHub (bom primeiro PR!)

---

### 2.6 Módulo: Bancos de Dados (Existente)
**Caches do awesome-go — Top recomendados**:
| Biblioteca | Uso | URL |
|------------|-----|-----|
| **BigCache** | Cache eficiente para gigabytes de dados | [github.com/allegro/bigcache](https://github.com/allegro/bigcache) |
| **ristretto** | Cache de alta performance (Dgraph) | [github.com/dgraph-io/ristretto](https://github.com/dgraph-io/ristretto) |
| **groupcache** | Cache de preenchimento distribuído (Google) | [github.com/golang/groupcache](https://github.com/golang/groupcache) |
| **otter** | Cache lock-free de alta performance | [github.com/mahouk86/otter](https://github.com/mahouk86/otter) |
| **ttlcache** | Cache in-memory com expiração automática | [github.com/jellydator/ttlcache](https://github.com/jellydator/ttlcache) |

**Schema Migration — Top recomendados**:
| Ferramenta | Descrição | URL |
|------------|-----------|-----|
| **migrate** | Migrações CLI e biblioteca | [github.com/golang-migrate/migrate](https://github.com/golang-migrate/migrate) |
| **goose** | Migrações com scripts incrementais | [github.com/pressly/goose](https://github.com/pressly/goose) |
| **atlas** | Database Toolkit & CLI moderno | [github.com/ariga/atlas](https://github.com/ariga/atlas) |
| **gormigrate** | Helper de migrações para GORM | [github.com/go-gormigrate/gormigrate](https://github.com/go-gormigrate/gormigrate) |

**SQL Query Builders — Top recomendados**:
| Biblioteca | Descrição | URL |
|------------|-----------|-----|
| **sqlc** | Gera código type-safe a partir de SQL | [github.com/kyleconroy/sqlc](https://github.com/kyleconroy/sqlc) |
| **Squirrel** | Builder de queries SQL fluente | [github.com/Masterminds/squirrel](https://github.com/Masterminds/squirrel) |
| **goqu** | Builder idiomático de SQL | [github.com/doug-martin/goqu](https://github.com/doug-martin/goqu) |
| **jet** | Queries SQL type-safe | [github.com/go-jet/jet](https://github.com/go-jet/jet) |

**ORMs — Nova lição "Comparação de ORMs"**:
| ORM | Destaque | URL |
|-----|----------|-----|
| **GORM** | ORM mais popular, full-featured | [github.com/go-gorm/gorm](https://github.com/go-gorm/gorm) |
| **ent** | Entity framework com code generation (Facebook) | [github.com/ent/ent](https://github.com/ent/ent) |
| **sqlx** | Extensões sobre database/sql (leve) | [github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx) |
| **upper/db** | Camada de acesso produtiva | [github.com/upper/db](https://github.com/upper/db) |

**Socialização MESA — #100DaysOfCode (Dias 65–72):**
- Postar comparativo: "Dia X — Testei GORM vs sqlx vs sqlc: aqui está o que descobri"
- Artigo sugerido para blog: *"GORM vs sqlx vs sqlc: qual ORM/query builder escolher em Go?"*
- Compartilhar benchmarks de queries e pedir opinião da comunidade

---

### 2.7 Módulo: Implementações (Existente)
**Novas lições com bibliotecas do awesome-go**:

| Lição Existente | Enriquecimento | Biblioteca |
|-----------------|----------------|------------|
| Viper (já presente) | Adicionar alternativas | [koanf](https://github.com/knadh/koanf), [env](https://github.com/caarlos0/env), [cleanenv](https://github.com/ilyakaznacheev/cleanenv) |
| Cobra CLI (já presente) | Adicionar alternativa | [kong](https://github.com/alecthomas/kong) |
| gRPC (já presente) | Adicionar tutorial complementar | [Microservices with Go - YouTube](https://www.youtube.com/playlist?list=PLmD8u-IFdreyh6EUfevBcbiuCKzFk0EW_) |

**Nova lição: "Logging Profissional"**:
| Biblioteca | Destaque | URL |
|------------|----------|-----|
| **zap** | Logging estruturado de alta performance (Uber) | [github.com/uber-go/zap](https://github.com/uber-go/zap) |
| **zerolog** | Zero-allocation JSON logger | [github.com/rs/zerolog](https://github.com/rs/zerolog) |
| **slog** | Logger padrão do Go 1.21+ | stdlib `log/slog` |
| **logrus** | Logger estruturado clássico | [github.com/sirupsen/logrus](https://github.com/sirupsen/logrus) |

**Socialização MESA — #100DaysOfCode (Dias 73–78):**
- Postar implementação: "Dia X — Implementei gRPC/GraphQL em Go pela primeira vez!"
- Artigo sugerido para blog: *"gRPC + Go: comunicação entre microserviços na prática"*
- Gravar um vídeo curto ou GIF demonstrando a comunicação gRPC e postar com a hashtag

---

### 2.8 Módulo: Golang Internals (Existente)
**Novos recursos do Go 101 — Memory Related**:
- [Memory Blocks](https://go101.org/article/memory-block.html)
- [Memory Layouts](https://go101.org/article/memory-layout.html)
- [Memory Leaking Scenarios](https://go101.org/article/memory-leaking.html)

**Go 101 — Special Topics**:
- [More About Deferred Function Calls](https://go101.org/article/defer-more.html)
- [Panic/Recover Use Cases](https://go101.org/article/panic-and-recover-use-cases.html)
- [Panic/Recover Mechanism in Detail](https://go101.org/article/panic-and-recover-more.html)
- [Type-Unsafe Pointers](https://go101.org/article/unsafe.html)
- [Reflections](https://go101.org/article/reflection.html)

**Go 101 — Summaries**:
- [nil in Go](https://go101.org/article/nil.html) — todos os sabores de nil
- [Value Conversion Rules](https://go101.org/article/value-conversions-assignments-and-comparisons.html)
- [Syntax/Semantics Exceptions](https://go101.org/article/exceptions.html)
- [Go FAQ 101](https://go101.org/article/unofficial-faq.html)

**Socialização MESA — #100DaysOfCode (Dias 85–90):**
- Postar descobertas: "Dia X — Hoje entendi como o Go Scheduler funciona por dentro!"
- Artigo sugerido para blog: *"Por dentro do Go: scheduler, GC e gerenciamento de memória"*
- Compartilhar output de `go tool pprof` e `go tool trace` com explicação

---

### 2.9 Módulo: SOLID e Clean Architecture (Existente)
**Project Layout do awesome-go — Referências essenciais**:
| Projeto | Descrição | URL |
|---------|-----------|-----|
| **golang-standards/project-layout** | Layout common de projetos Go | [github.com/golang-standards/project-layout](https://github.com/golang-standards/project-layout) |
| **go-blueprint** | Gera projetos com frameworks populares | [github.com/Melkeydev/go-blueprint](https://github.com/Melkeydev/go-blueprint) |
| **ardanlabs/service** | Starter kit para serviços production-grade | [github.com/ardanlabs/service](https://github.com/ardanlabs/service) |
| **modern-go-application** | Boilerplate com práticas modernas | [github.com/sagikazarmark/modern-go-application](https://github.com/sagikazarmark/modern-go-application) |
| **go-clean-template** | Template Clean Architecture | [github.com/evrone/go-clean-template](https://github.com/evrone/go-clean-template) |
| **go-todo-backend** | Layout modular com exemplo completo | [github.com/Fs02/go-todo-backend](https://github.com/Fs02/go-todo-backend) |

**E-book complementar**: [Go with the domain](https://threedots.tech/go-with-the-domain/) — DDD, Clean Architecture, CQRS em Go (gratuito)

**Socialização MESA — #100DaysOfCode (Dias 79–84):**
- Postar estrutura do projeto: "Dia X — Meu projeto Go seguindo Clean Architecture"
- Artigo sugerido para blog: *"Clean Architecture em Go na prática: estruturando um projeto real"*
- Abrir o repositório como público e convidar code reviews da comunidade

---

### 2.10 Módulo: Deploy (Existente)
**Tutorial complementar**: [How To Deploy a Go Web Application with Docker](https://semaphoreci.com/community/tutorials/how-to-deploy-a-go-web-application-with-docker)
**Tutorial avançado**: [Scaling Go Applications](https://betterstack.com/community/guides/scaling-go/) — Building & deploying em produção

**Socialização MESA — #100DaysOfCode (Dias 97–100):**
- Post final: "Dia 100/100 — Completei o #100DaysOfCode aprendendo Go! 🎉"
- Artigo retrospectivo para blog: *"Meus 100 dias aprendendo Go — do hello world ao deploy em Kubernetes"*
- Criar repositório consolidado no GitHub com todos os projetos e compartilhar
- Postar comparação "Dia 1 vs Dia 100" de código

---

## 3. Segurança — Nova Lição Transversal

Incorporar no módulo "Desenvolvimento de APIs" ou como módulo separado:

| Tópico | Bibliotecas/Recursos |
|--------|---------------------|
| Hashing de Senhas | [argon2-hashing](https://github.com/elithrar/argon2-hashing), [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt) |
| JWT (já no sdd) | [jwt-go](https://github.com/golang-jwt/jwt), [jwx](https://github.com/lestrrat-go/jwx) |
| Criptografia Moderna | [tink](https://github.com/google/tink) (Google) |
| OWASP Go | [owasp-go](https://github.com/guardrailsio/owasp-go) |
| Two-Factor Auth | [twofactor](https://github.com/aurelien-rainone/twofactor) |
| RBAC | [Tutorial RBAC em Go](https://www.permit.io/blog/role-based-access-control-rbac-authorization-in-golang) |
| Access Control | [keto](https://github.com/ory/keto) — Zanzibar-inspired |
| HTTP Security Headers | [sloth](https://github.com/shomali11/sloth) |

---

## 4. Recursos de Aprendizagem Complementares

### 4.1 E-Books Gratuitos (Adicionar ao componente de recursos)
| Livro | URL | Nível |
|-------|-----|-------|
| Go 101 (Fundamentals) | [go101.org](https://go101.org) | Intermediário-Avançado |
| Go Generics 101 | [go101.org/generics](https://go101.org/generics/101.html) | Intermediário |
| Go Quizzes 101 | [go101.org/quizzes](https://go101.org/quizzes/101.html) | Todos |
| An Introduction to Programming in Go | [golang-book.com](http://www.golang-book.com/) | Iniciante |
| Build Web Application with Golang | [astaxie.gitbooks.io](https://astaxie.gitbooks.io/build-web-application-with-golang/content/en/) | Intermediário |
| How To Code in Go (600 páginas) | [DigitalOcean](https://www.digitalocean.com/community/books/how-to-code-in-go-ebook) | Iniciante |
| Go with the Domain (DDD) | [threedots.tech](https://threedots.tech/go-with-the-domain/) | Avançado |
| Practical Go Lessons | [practical-go-lessons.com](https://www.practical-go-lessons.com/) | Todos |
| The Little Go Book | [github.com/karlseguin](https://github.com/karlseguin/the-little-go-book) | Iniciante |
| Network Programming With Go | [jan.newmarch.name](https://jan.newmarch.name/golang/) | Intermediário |

### 4.2 E-Books Pagos (Recomendações Top)
| Livro | Foco | URL |
|-------|------|-----|
| 100 Go Mistakes | Erros comuns e como evitar | [Manning](https://www.manning.com/books/100-go-mistakes-how-to-avoid-them) |
| Lets-Go | Web apps rápidas e seguras | [lets-go.alexedwards.net](https://lets-go.alexedwards.net) |
| Lets-Go-Further | APIs avançadas | [lets-go-further.alexedwards.net](https://lets-go-further.alexedwards.net) |
| The Power of Go: Tests | Testes em profundidade | [bitfieldconsulting.com](https://bitfieldconsulting.com/books/tests) |
| Writing An Interpreter In Go | Compiladores idiomáticos | [interpreterbook.com](https://interpreterbook.com) |
| Go Optimizations 101 | Performance | [Leanpub](https://leanpub.com/go-optimizations-101) |

### 4.3 Tutoriais Interativos (para fase Experimentação MESA)
| Tutorial | Formato | URL |
|----------|---------|-----|
| A Tour of Go | Interativo online | [tour.golang.org](https://tour.golang.org/) |
| Go By Example | Exemplos com código | [gobyexample.com](https://gobyexample.com/) |
| Learn Go with TDD | TDD progressivo | [github.com/quii](https://github.com/quii/learn-go-with-tests) |
| Learn Go with 1000+ Exercises | Exercícios práticos | [github.com/inancgumus](https://github.com/inancgumus/learngo) |
| CodeCrafters Golang Track | Projetos (Redis, Docker, Git) | [codecrafters.io](https://app.codecrafters.io/tracks/go) |
| Gophercises | Exercícios gratuitos | [gophercises.com](https://gophercises.com/) |
| Design Patterns in Go | Padrões de projeto | [github.com/shubhamzanwar](https://github.com/shubhamzanwar/design-patterns) |
| go-patterns | Receitas e idiomas | [github.com/tmrts/go-patterns](https://github.com/tmrts/go-patterns) |
| Games With Go | Desenvolvimento de jogos | [YouTube playlist](https://www.youtube.com/watch?v=9D4yH7e_ea8&list=PLDZujg-VgQlZUy1iCqBbe5faZLMkA3g2x) |

### 4.4 Style Guides (para fase Socialização MESA)
| Guia | Organização | URL |
|------|-------------|-----|
| Google Go Style Guide | Google | [google.github.io](https://google.github.io/styleguide/go/) |
| Uber Go Style Guide | Uber | [github.com/uber-go](https://github.com/uber-go/guide/blob/master/style.md) |
| Go Proverbs | Rob Pike | [go-proverbs.github.io](https://go-proverbs.github.io/) |
| Effective Go | Oficial | [go.dev/doc/effective_go](https://go.dev/doc/effective_go) |
| CockroachDB Style | CockroachDB | [github.com/cockroachdb](https://github.com/cockroachdb/cockroach/blob/master/docs/style.md) |

### 4.5 Desafio #100DaysOfCode — Socialização Contínua (fase Socialização MESA)

#### O que é o #100DaysOfCode?

O **#100DaysOfCode** é um desafio público de comprometimento onde o participante se compromete a programar no mínimo 1 hora por dia durante 100 dias consecutivos e **compartilhar seu progresso diariamente** nas redes sociais usando a hashtag `#100DaysOfCode`. O desafio foi criado por Alexander Kallaway e se tornou um dos maiores movimentos de aprendizado de programação do mundo.

**Regras:**
1. Programar no mínimo **1 hora por dia** durante 100 dias
2. **Postar o progresso diariamente** usando `#100DaysOfCode` (e `#100DaysOfGo` para especificar a linguagem)
3. Encorajar ao menos **2 outras pessoas** que também estão no desafio por dia
4. Se falhar um dia, continuar no dia seguinte (não recomeçar do zero — gentileza consigo mesmo)

**Por que funciona para quem está aprendendo Go:**
- Cria **rotina e consistência** — fundamental para neurodivergentes que se beneficiam de estrutura
- A **accountability pública** aumenta a motivação
- Conecta você com uma **comunidade global** de desenvolvedores aprendendo ao mesmo tempo
- Os posts servem como **diário de aprendizado** que documenta sua evolução
- Recrutadores e a comunidade tech acompanham a hashtag — **visibilidade profissional**

#### Onde postar seu progresso diário

| Plataforma | URL | Dica |
|------------|-----|------|
| **X (Twitter)** | [x.com](https://x.com) | A plataforma original do desafio. Use `#100DaysOfCode #100DaysOfGo #golang`. Siga [@ka11away](https://x.com/ka11away) (criador) |
| **Mastodon** | [mastodon.social](https://mastodon.social/) | Alternativa descentralizada e open-source. Use as mesmas hashtags. Comunidade tech forte em `#fediverse` |
| **Bluesky** | [bsky.app](https://bsky.app/) | Rede descentralizada crescente. Comunidade tech ativa. Use `#100DaysOfCode` e `#golang` |

> **Dica de acessibilidade**: Escolha **apenas uma plataforma** para não sobrecarregar. Pode-se usar ferramentas como o [Buffer](https://buffer.com) para cross-post se desejar estar em mais de uma.

#### Template de post diário

```
Dia [X]/100 do #100DaysOfCode #100DaysOfGo

📚 Hoje aprendi: [tópico da lição MESA]
💻 O que fiz: [breve descrição do código/exercício]
🔗 Repositório: [link do GitHub]

#golang #aprendago
```

#### Blog Pessoal — Escreva sobre sua jornada

Além dos posts curtos nas redes sociais, é **altamente recomendado** manter um blog onde você escreve artigos mais detalhados sobre o que está aprendendo. Escrever ensina: ao explicar um conceito, você consolida o aprendizado (técnica de Feynman).

**Plataformas recomendadas:**

| Plataforma | Tipo | Por que usar | URL |
|------------|------|-------------|-----|
| **dev.to** | Plataforma pronta | Zero configuração, comunidade enorme de devs, tags `#go` e `#100daysofcode` já populares, editor Markdown, analytics integrado | [dev.to](https://dev.to/) |
| **GitHub Pages + Hugo** | Blog estático (self-hosted) | Controle total, gratuito via GitHub Pages, temas profissionais, escrito em Go (!), excelente performance, Markdown nativo | [gohugo.io](https://gohugo.io/) |

**Começando com Hugo (recomendado para quem quer praticar Go):**
```bash
# Instalar Hugo
go install github.com/gohugoio/hugo@latest

# Criar novo blog
hugo new site meu-blog-go
cd meu-blog-go

# Adicionar um tema (ex: PaperMod, popular e acessível)
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
echo 'theme = "PaperMod"' >> hugo.toml

# Criar primeiro post
hugo new posts/dia-01-100daysofcode.md

# Servir localmente
hugo server -D
```

**Sugestão de artigos por módulo:**
Cada vez que completar um módulo do AprendaGo, escreva um artigo no formato:
- "O que aprendi sobre [tópico] em Go — Dia X do #100DaysOfCode"
- Inclua exemplos de código, dificuldades encontradas e links úteis
- Publique no dev.to E/OU no blog Hugo e compartilhe o link na rede social escolhida

### 4.6 Comunidades e Websites (para fase Socialização MESA)
| Recurso | Descrição | URL |
|---------|-----------|-----|
| Go Blog | Blog oficial | [blog.golang.org](https://blog.golang.org) |
| Go Forum | Fórum de discussão | [forum.golangbridge.org](https://forum.golangbridge.org) |
| Gopher Slack | Comunidade Slack | [invite.slack.golangbridge.org](https://invite.slack.golangbridge.org) |
| Golang Weekly | Newsletter semanal | [golangnugget.com](https://golangnugget.com) |
| pkg.go.dev | Documentação de pacotes | [pkg.go.dev](https://pkg.go.dev/) |
| Go Report Card | Qualidade de pacotes | [goreportcard.com](https://goreportcard.com) |

---

## 5. #100DaysOfCode por Módulo — Roadmap de Socialização

Cada módulo do AprendaGo se encaixa naturalmente numa faixa de dias do desafio. Abaixo está o mapeamento sugerido:

| Dias | Módulo AprendaGo | Post sugerido no blog | Hashtags extras |
|------|-------------------|----------------------|------------------|
| 1–7 | Introdução à Linguagem | "Por que escolhi Go e como configurei meu ambiente" | `#golang #beginner` |
| 8–18 | Foundation | "Go Type System: o que me surpreendeu" | `#types #gobasics` |
| 19–24 | Pacotes Importantes | "Manipulação de HTTP e JSON em Go" | `#http #json` |
| 25–34 | Concorrência e Multithreading | "Goroutines e Channels: concorrência sem medo" | `#concurrency #goroutines` |
| 35–40 | Tratamento de Erros (novo) | "Error handling idiomático em Go" | `#errors #bestpractices` |
| 41–48 | Generics (novo) | "Generics em Go: constraints, inferência e limites" | `#generics #go118` |
| 49–56 | Desenvolvimento de APIs | "Construindo uma REST API com chi e JWT" | `#api #webdev` |
| 57–64 | Testes Automatizados | "Testando Go: de unit tests a fuzzing" | `#testing #tdd` |
| 65–72 | Bancos de Dados | "GORM vs sqlx vs sqlc: qual escolher?" | `#database #orm` |
| 73–78 | Implementações (gRPC, GraphQL, etc.) | "gRPC + Go: comunicação entre microserviços" | `#grpc #microservices` |
| 79–84 | SOLID e Clean Architecture | "Clean Architecture em Go na prática" | `#cleanarchitecture #solid` |
| 85–90 | Golang Internals | "Por dentro do Go: scheduler, GC e memória" | `#internals #runtime` |
| 91–96 | Otimizações e Performance (novo) | "Otimizando Go: escape analysis e BCE" | `#performance #optimization` |
| 97–100 | Deploy + Revisão | "Do código ao Kubernetes: deploy de apps Go" | `#docker #kubernetes #devops` |

**Ao completar o dia 100:**
- Escreva um artigo retrospectivo: "Meus 100 dias aprendendo Go — o que mudou"
- Publique no [dev.to](https://dev.to/) com as tags `#100daysofcode`, `#go`, `#learning`
- Compartilhe no X/Mastodon/Bluesky com screenshot do primeiro vs último código
- Considere fazer um repositório GitHub consolidado com todos os projetos dos 100 dias

---

## 6. Série Go 101 Completa — Referência Local

Instalado via `go install go101.org/go101@latest`. Executar `go101` para servidor local.

| Livro | Páginas | Conteúdo | Gratuito? |
|-------|---------|----------|-----------|
| Go (Fundamentals) 101 | ~500 | Sintaxe, semântica, runtime | ✅ Online |
| Go Generics 101 | ~50 | Custom generics completo | ✅ Online |
| Go Details & Tips 101 | ~80 | 101 detalhes e dicas | Parcial |
| Go Optimizations 101 | ~150 | 101+ dicas de otimização | Parcial |
| Go Quizzes 101 | Variável | Quizzes interativos | ✅ Online |
| Go Q&A 101 | Variável | Perguntas e respostas | ✅ Online |
| Go Bugs 101 | Variável | Bugs e pegadinhas | ✅ Online |

---

## 7. Plano de Implementação no roadmap.ts

### Prioridade Alta (implementar primeiro)
1. **Enriquecer lições existentes** com links do Go 101 e awesome-go nas propriedades `recursos` e `explicacao` de cada lição no `roadmap.ts`
2. **Adicionar módulo "Tratamento de Erros"** — conteúdo essencial que falta no sdd original
3. **Adicionar módulo "Logging Profissional"** como lição no módulo Implementações
4. **Integrar quizzes do Go 101** na fase Experimentação de cada módulo existente
5. **Implementar seção #100DaysOfCode** — componente de Socialização com links para X/Mastodon/Bluesky, template de post diário, tracker de dias e integração com progresso do roadmap

### Prioridade Média
6. **Criar módulo "Generics"** — Go 1.18+ feature fundamental
7. **Criar componente QuizView** para quizzes interativos
8. **Adicionar lição "Comparação de ORMs"** (GORM vs ent vs sqlx)
9. **Adicionar seção de Segurança** ao módulo de APIs
10. **Criar seção "Meu Blog"** com guia de setup de Hugo + GitHub Pages e link para dev.to

### Prioridade Baixa
11. **Criar módulo "Otimizações e Performance"** — conteúdo avançado
12. **Adicionar E-Books e Recursos** como seção navegável no AprendaGo
13. **Integrar Style Guides** na fase Socialização
14. **Adicionar links de comunidades** para engajamento

---

## 8. Resumo de Impacto

| Métrica | Antes (sdd.md) | Depois (sdd + sdd01) |
|---------|-----------------|----------------------|
| Módulos | 12 | 16 (+4 novos) |
| Lições estimadas | ~30 | ~55 (+25 novas) |
| Bibliotecas referenciadas | ~15 | ~120+ |
| E-Books linkados | 0 | 26 |
| Tutoriais interativos | 0 | 9 |
| Style Guides | 0 | 5 |
| Quizzes integráveis | 0 | 28 |
| Recursos de comunidade | 0 | 6 |
| Desafio #100DaysOfCode | ❌ | ✅ Mapeado em 100 dias por módulo |
| Blog pessoal (Hugo/dev.to) | ❌ | ✅ 16+ artigos sugeridos |
| Redes sociais integradas | 0 | 3 (X, Mastodon, Bluesky) |
