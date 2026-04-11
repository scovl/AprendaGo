Packages organizam código — cada diretório é um package. Nomes exportados começam com **maiúscula**; minúscula é privado ao package. Módulos (`go.mod`) gerenciam dependências com semantic versioning.

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
