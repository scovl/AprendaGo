**GraphQL** permite ao cliente especificar **exatamente** quais dados precisa — resolve over-fetching (dados demais) e under-fetching (dados de menos) comuns em REST.

## gqlgen

Em Go, `gqlgen` gera código **type-safe** a partir do schema GraphQL:

```graphql
type Query {
    user(id: ID!): User
    users: [User!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
}
```

Após `go generate ./...`, o gqlgen gera interfaces de resolver que você implementa:

```go
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
    return r.db.GetUser(ctx, id)
}
```

## Dataloaders — prevenindo N+1 queries

O problema N+1: buscar 100 users e para cada um buscar seus posts = 101 queries. Dataloaders agrupam e batcham as queries:

```go
// Em vez de 100 queries individuais
// Posts são buscados em uma única query: WHERE user_id IN (1,2,...,100)
```

Use `github.com/graph-gophers/dataloader` para implementar o padrão.

## GraphQL vs REST

| Aspecto | REST | GraphQL |
|---|---|---|
| Dados | Server define o que retorna | Client define o que quer |
| Endpoints | Múltiplos por recurso | Um único endpoint |
| Over-fetching | Comum | Eliminado |
| Caching | HTTP caching nativo | Requer configuração |
| Melhor para | APIs públicas simples | Apps com queries complexas |
