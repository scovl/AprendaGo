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
