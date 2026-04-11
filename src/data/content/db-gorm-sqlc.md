---
title: GORM, Migrations e SQLC
description: ORM com GORM, auto-migrations e geração de código type-safe com SQLC.
estimatedMinutes: 50
recursos:
  - https://gorm.io/
  - https://sqlc.dev/
experimentacao:
  desafio: Crie a mesma API com GORM e depois com SQLC. Compare linhas de código, type safety e performance.
  dicas:
    - "GORM: go get gorm.io/gorm gorm.io/driver/postgres"
    - "SQLC: defina queries em .sql, gere com sqlc generate"
    - "Compare: developer experience vs performance"
socializacao:
  discussao: "GORM vs SQLC vs database/sql puro: quando usar cada um?"
  pontos:
    - "GORM: prototipagem, CRUD simples, relações complexas"
    - "SQLC: produção, queries otimizadas, type safety"
    - "SQL puro: máximo controle, queries dinâmicas"
  diasDesafio: Dias 61–68
  sugestaoBlog: "GORM vs SQLC em Go: qual escolher para o seu projeto?"
  hashtagsExtras: '#golang #gorm #sqlc #orm'
aplicacao:
  projeto: E-commerce com GORM com produtos, categorias e pedidos com relacionamentos.
  requisitos:
    - Modelos com HasMany/BelongsTo
    - Auto-migrations
    - Queries com preload e joins
  criterios:
    - Relacionamentos corretos
    - Migrations funcionais
    - Queries eficientes
---

## GORM

O ORM mais popular em Go: models via structs, auto-migration, associations e hooks.

```go
type User struct {
    gorm.Model
    Name  string `gorm:"not null"`
    Email string `gorm:"uniqueIndex"`
}

db.AutoMigrate(&User{})   // cria/atualiza tabela

db.Create(&User{Name: "Alice", Email: "alice@go.dev"})
db.First(&user, "email = ?", email)
db.Save(&user)
db.Delete(&user)
```

**Quando usar GORM:** prototipagem rápida, projetos com muitas operações CRUD simples, quando auto-migration é desejável em desenvolvimento.

## SQLC

Gera código Go **type-safe** a partir de queries SQL anotadas:

```sql
-- name: GetUser :one
SELECT * FROM users WHERE id = $1 LIMIT 1;
```

Após `sqlc generate`, você obtém:
```go
user, err := queries.GetUser(ctx, id)  // totalmente type-safe
```

**Quando usar SQLC:** produção com queries otimizadas, quando você quer controle total do SQL, times que já conhecem SQL bem.

## Migrations

Ferramentas populares para migrations: `golang-migrate/migrate` (CLI + library), `pressly/goose` (Go native), `Atlas` (schema-as-code). Sempre versione suas migrations e execute-as em CI antes de deploy.

| Abordagem | Melhor para |
|---|---|
| GORM | Prototipagem, projetos simples |
| SQLC | Produção, performance, type-safety total |
| SQL puro + migrations | Máximo controle |
