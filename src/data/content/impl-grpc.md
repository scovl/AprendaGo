---
title: gRPC e Protocol Buffers
description: Comunicação entre serviços com gRPC, protobuf e streaming.
estimatedMinutes: 50
codeExample: |
  // user.proto
  syntax = "proto3";
  package user;

  service UserService {
    rpc GetUser(GetUserRequest) returns (User);
    rpc ListUsers(ListRequest) returns (stream User);
  }

  message GetUserRequest { string id = 1; }
  message User { string id = 1; string name = 2; string email = 3; }
  message ListRequest { int32 limit = 1; }

  // protoc --go_out=. --go-grpc_out=. user.proto
recursos:
  - https://grpc.io/docs/languages/go/
  - https://protobuf.dev/
experimentacao:
  desafio: Crie um serviço gRPC de produtos - defina .proto, gere código, implemente server e client.
  dicas:
    - "Instale protoc e plugins: protoc-gen-go, protoc-gen-go-grpc"
    - "Use reflection para debugging: grpcurl"
    - Teste com grpcurl ou Evans (REPL gRPC)
socializacao:
  discussao: "gRPC vs REST: quando usar cada um?"
  pontos:
    - "gRPC: microsserviços internos, streaming, performance"
    - "REST: APIs públicas, browser, simplicidade"
    - "gRPC-Gateway: expõe gRPC como REST automaticamente"
  diasDesafio: Dias 83–90
  sugestaoBlog: "gRPC com Go: do .proto ao servidor em produção"
  hashtagsExtras: '#golang #grpc #protobuf'
aplicacao:
  projeto: Microsserviço gRPC completo com server, client, streaming e testes.
  requisitos:
    - Proto definitions com mensagens e serviço
    - Server e client implementation
    - Server streaming
  criterios:
    - Proto compilando
    - Comunicação funcional
    - Testes de integração
---

**gRPC** usa **Protocol Buffers** para definir serviços e mensagens em um arquivo `.proto`. É mais eficiente que REST para microsserviços (binário vs JSON, schema tipado, geração de código automática).

## Tipos de comunicação gRPC

| Tipo | Descrição |
|---|---|
| Unary | Uma request, uma response (como REST) |
| Server streaming | Uma request, stream de responses |
| Client streaming | Stream de requests, uma response |
| Bidirecional | Stream nos dois sentidos |

## Definindo um serviço

```protobuf
syntax = "proto3";

service UserService {
    rpc GetUser(GetUserRequest) returns (UserResponse);
    rpc ListUsers(ListUsersRequest) returns (stream UserResponse);
}

message GetUserRequest { string id = 1; }
message UserResponse {
    string id   = 1;
    string name = 2;
}
```

## Gerando código Go

```bash
protoc --go_out=. --go-grpc_out=. user.proto
```

Isso gera structs Go fortemente tipadas e interfaces de server/client.

## Quando usar gRPC vs REST

- **gRPC**: microsserviços internos, streaming bidirecional, performance crítica, schema first
- **REST**: APIs públicas, simplicidade, compatibilidade com browsers, tooling universal
