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
