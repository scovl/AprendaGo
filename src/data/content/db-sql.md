---
title: database/sql e pgx
description: Interface database/sql, drivers, prepared statements, connection pool e pgx.
estimatedMinutes: 45
recursos:
  - https://go.dev/doc/database/
  - https://github.com/jackc/pgx
experimentacao:
  desafio: Crie um CRUD com database/sql e PostgreSQL (ou SQLite) com INSERT, SELECT, UPDATE, DELETE com prepared statements e context.
  dicas:
    - "NUNCA concatene valores em SQL – use $1, $2 (postgres) ou ? (mysql/sqlite)"
    - db.Ping() verifica conexão
    - rows.Close() é obrigatório – use defer
    - sql.ErrNoRows quando SELECT não encontra nada
socializacao:
  discussao: "SQL puro vs ORM: qual abordagem é melhor para Go?"
  pontos:
    - "SQL puro: máximo controle e performance"
    - "ORM: produtividade e abstração de banco"
    - "pgx nativo vs database/sql: performance vs portabilidade"
  diasDesafio: Dias 61–68
  sugestaoBlog: "database/sql em Go: prepared statements, pool e prevenção de SQL injection"
  hashtagsExtras: '#golang #database #sql #postgres'
aplicacao:
  projeto: Repositório de livros com database/sql com CRUD, paginação e busca.
  requisitos:
    - CRUD completo com prepared statements
    - Connection pooling configurado
    - Context com timeout em todas as queries
  criterios:
    - Sem SQL injection
    - Pool configurado
    - Erros tratados
---

O pacote `database/sql` é a interface genérica para SQL em Go. Drivers (pgx, pq, mysql) implementam a conexão registrando-se via `sql.Register`.

## Prepared statements — prevenção de SQL injection

**Nunca** concatene valores em SQL — use `$1`, `$2` (PostgreSQL) ou `?` (MySQL/SQLite):

```go
// ❌ Errado — SQL injection
db.QueryRow("SELECT nome FROM users WHERE id = " + id)

// ✅ Correto — prepared statement
db.QueryRowContext(ctx, "SELECT nome FROM users WHERE id = $1", id).Scan(&nome)
```

## Connection pool

```go
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(5)
db.SetConnMaxLifetime(5 * time.Minute)
```

`db.Ping()` verifica conexão. `rows.Close()` é obrigatório — use `defer`. `sql.ErrNoRows` é retornado quando `SELECT` não encontra nada.

## pgx

`pgx` é o driver PostgreSQL mais performático, com:
- Suporte nativo a arrays, JSON e tipos customizados PostgreSQL
- Connection pooling via `pgxpool`
- Melhor performance que `pq` por usar o protocolo binário do PostgreSQL

## Transações

```go
tx, err := db.BeginTx(ctx, nil)
if err != nil { return err }
defer tx.Rollback()  // no-op se Commit foi chamado

// operações com tx...
return tx.Commit()
```
