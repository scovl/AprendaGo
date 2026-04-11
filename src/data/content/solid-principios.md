---
title: Princípios SOLID em Go
description: "SRP, OCP, LSP, ISP e DIP com exemplos idiomáticos."
estimatedMinutes: 60
recursos:
  - https://dave.cheney.net/2016/08/20/solid-go-design
experimentacao:
  desafio: Refatore um código monolítico (handler que faz tudo - HTTP, validação, banco) aplicando cada princípio SOLID.
  dicas:
    - "SRP: separe handler, service, repository"
    - "ISP: interface Repository com apenas os métodos usados"
    - "DIP: service recebe interface, não struct concreto"
socializacao:
  discussao: SOLID foi criado para OOP com herança. Faz sentido em Go que usa composição?
  pontos:
    - "Go não tem herança – composição é mais flexível"
    - Interfaces implícitas facilitam ISP e DIP naturalmente
    - Pragmatismo > purismo – aplique onde faz diferença
  diasDesafio: Dias 77–82
  sugestaoBlog: "SOLID em Go: design com composição e interfaces implícitas"
  hashtagsExtras: '#golang #solid #cleancode'
aplicacao:
  projeto: Refatore um monolito em Go aplicando os 5 princípios com before/after.
  requisitos:
    - Demonstrar cada princípio
    - Testes para validar refatoração
    - Documentar decisões de design
  criterios:
    - Cada princípio aplicado
    - Código mais testável
    - Sem regressões
---

SOLID é um conjunto de princípios de design de software. Go os aplica naturalmente através de interfaces implícitas, composição e pacotes.

## S — Single Responsibility Principle

Cada struct/package tem **uma responsabilidade**. Não misture lógica de negócio com I/O, validação com persistência.

## O — Open/Closed Principle

Aberto para extensão, fechado para modificação. Interfaces permitem estender comportamento **sem modificar código existente**:

```go
type Notifier interface{ Notify(msg string) error }
// Adicione EmailNotifier, SMSNotifier, SlackNotifier sem modificar o UseCase
```

## L — Liskov Substitution Principle

Tipos que implementam uma interface devem ser **substituíveis** sem alterar o comportamento esperado. Em Go, qualquer tipo que implementa a interface pode ser usado no lugar de outro.

## I — Interface Segregation Principle

Interfaces **pequenas e focadas**:

```go
type Reader interface{ Read(p []byte) (n int, err error) }   // 1 método
type Writer interface{ Write(p []byte) (n int, err error) }  // 1 método
type ReadWriter interface{ Reader; Writer }                  // composição
```

Não force clientes a depender de métodos que não usam.

## D — Dependency Inversion Principle

Dependa de **interfaces**, não de implementações concretas:

```go
// ❌ Concreto
type Service struct{ db *sql.DB }

// ✅ Abstrato (testável, extensível)
type Storage interface { Save(item Item) error }
type Service struct{ storage Storage }
```

Isso facilita testes (mock da interface) e troca de implementação (PostgreSQL → Redis) sem alterar o `Service`.
