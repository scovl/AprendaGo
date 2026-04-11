---
title: "Clean Architecture: Conceitos e Implementação"
description: Camadas, regras de dependência, entities, use cases e project layout.
estimatedMinutes: 55
codeExample: |
  # Layout Go com Clean Architecture
  cmd/
    server/main.go
  internal/
    entity/
      order.go
    usecase/
      create_order.go
    infra/
      handler/http.go
      repository/pg.go
  pkg/
recursos:
  - https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
experimentacao:
  desafio: "Crie um projeto com Clean Architecture: entity Order, use case CreateOrder, handler HTTP e repository (in-memory para começar)."
  dicas:
    - Entity não importa nenhum pacote externo
    - Use case depende de interface Repository, não implementação
    - Handler converte HTTP → use case
socializacao:
  discussao: Clean Architecture adiciona complexidade. Quando vale a pena?
  pontos:
    - "Projetos pequenos: overengineering"
    - "Projetos médios/grandes: testabilidade e manutenção"
    - "Pragmatismo: não precisa ser 100% puro"
  diasDesafio: Dias 77–82
  sugestaoBlog: "Clean Architecture em Go: do conceito ao código real"
  hashtagsExtras: '#golang #cleanarchitecture'
aplicacao:
  projeto: Sistema de pedidos com Clean Architecture completa.
  requisitos:
    - "Entities: Order, Product"
    - "Use Cases: CreateOrder, ListOrders"
    - "Adapters: HTTP handler, PostgreSQL repository"
    - "Testes: use cases testáveis sem infra"
  criterios:
    - Regra de dependência respeitada
    - Use cases testáveis isoladamente
    - Código organizado
---

Clean Architecture separa o código em **camadas concêntricas** com dependências apontando sempre para dentro (em direção ao domínio):

```
Entities → Use Cases → Adapters → Frameworks/Drivers
```

A regra de ouro: **camadas internas nunca importam camadas externas**.

## Estrutura em Go

```
cmd/
    server/main.go          # ponto de entrada
internal/
    entity/                 # Entities — regras de negócio puras
    usecase/                # Use Cases — lógica de aplicação
    infra/
        repository/         # Adapters — implementações de repositório
        http/               # Adapters — handlers HTTP
```

## Por que Go é natural para Clean Architecture

- Interfaces implícitas permitem que `usecase/` defina `UserRepository` sem importar `infra/`
- A implementação em `infra/repository/` satisfaz a interface automaticamente
- Inversão de dependência sem frameworks de injeção

## Exemplo de inversão de dependência

```go
// usecase/user.go — camada interna
type UserRepository interface {
    FindByID(ctx context.Context, id string) (*entity.User, error)
    Save(ctx context.Context, u *entity.User) error
}

type UserUseCase struct {
    repo UserRepository  // depende da interface, não da implementação
}

// infra/repository/user_pg.go — camada externa
type pgUserRepo struct{ db *pgxpool.Pool }

func (r *pgUserRepo) FindByID(...) (*entity.User, error) { ... } // satisfaz a interface
```

A camada `usecase/` nunca importa `infra/` — a dependência flui apenas para dentro.
