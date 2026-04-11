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
