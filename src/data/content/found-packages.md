---
title: Packages, Módulos e Dependências
description: Organização em packages, go mod, exportação por maiúscula, internal/ e dependências.
estimatedMinutes: 40
codeExample: |
  # Estrutura de projeto
  myapp/
  ├── go.mod
  ├── cmd/
  │   └── server/main.go
  ├── internal/
  │   ├── handler/handler.go
  │   └── service/service.go
  ├── pkg/
  │   └── validator/validator.go
  └── go.sum

  # Comandos essenciais
  go mod init github.com/user/myapp
  go get github.com/gin-gonic/gin@latest
  go mod tidy
  go mod vendor
recursos:
  - https://go.dev/ref/mod
  - https://go.dev/doc/modules/layout
experimentacao:
  desafio: Crie um projeto com 3 packages - cmd/main, internal/service e pkg/utils. Exporte e importe funções. Depois adicione uma dependência externa com go get.
  dicas:
    - Cada pasta = um package, mesmo nome do diretório
    - Apenas nomes com letra maiúscula são exportados
    - Use go mod init para inicializar
    - internal/ impede acesso de fora do módulo
socializacao:
  discussao: Como a convenção de exportação por maiúscula afeta o design de APIs em Go?
  pontos:
    - "Simplicidade: sem public/private/protected keywords"
    - Encapsulamento visual — visivelmente claro
    - internal/ para código que não é API pública
  diasDesafio: Dias 8–18
  sugestaoBlog: "Packages e módulos em Go: organizando projetos profissionais"
  hashtagsExtras: '#golang #modules #packages'
aplicacao:
  projeto: Crie um projeto Go com cmd/, internal/, pkg/ e publique como módulo em um repositório.
  requisitos:
    - Estrutura cmd/ + internal/ + pkg/
    - go.mod e go.sum configurados
    - README com instruções de uso e importação
  criterios:
    - Estrutura correta
    - Imports funcionais
    - Compilação sem erros
---

Packages organizam código — cada diretório é um package.; minúscula é privado ao package. Módulos (`go.mod`) gerenciam dependências com semantic versioning.

## Comandos essenciais

```bash
go mod init github.com/user/repo  # cria módulo
go mod tidy                       # remove deps não usadas, adiciona faltantes
go get github.com/pkg@v1.2.3      # adiciona/atualiza dependência
```

## Visibilidade

- `internal/` cria packages visíveis **apenas ao módulo pai** — útil para código que não deve ser importado por outros módulos
- Go **proíbe imports circulares** — o compilador recusa dois packages que se importam mutuamente

## Organização típica

```
cmd/          # pontos de entrada (main packages)
internal/     # código privado ao módulo
pkg/          # código reutilizável (opcional)
```

Cada diretório tem um único package name (exceto arquivos `_test.go` que podem usar `package foo_test`).
