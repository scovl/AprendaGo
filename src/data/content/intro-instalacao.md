A instalação do Go é um arquivo único: baixe em [go.dev/dl](https://go.dev/dl) (instalador `.msi` no Windows, `.pkg` no macOS, tarball no Linux). O instalador configura automaticamente o PATH. Verifique com `go version` e `go env GOROOT`.

**GOROOT** é o diretório de instalação (ex: `/usr/local/go`). **GOPATH** (padrão `~/go`) era o workspace obrigatório antes de Go Modules — hoje, só é relevante para `go install` (binários vão para `$GOPATH/bin`).

## Estrutura de um programa Go

Todo programa Go pertence a um `package`. O `package main` com a função `main()` é o ponto de entrada de um executável. `import` lista os packages usados — **packages não usados causam erro de compilação** (o compilador é rigoroso).

```bash
go mod init github.com/user/repo  # cria go.mod com module path e versão Go
go run main.go                    # compila e executa em um passo
go build                          # compila para binário
go install                        # compila e instala em $GOPATH/bin
```

## Compilação e cross-compilation

O compilador Go é rápido por design: sem headers, sem macros, dependências implícitas proibidas. Um projeto de 100k linhas compila em segundos. Cross-compilation é nativa:

```bash
GOOS=linux GOARCH=amd64 go build   # compila para Linux x86-64 de qualquer plataforma
```

Arquiteturas suportadas: `amd64`, `arm64`, `arm`, `386`, `riscv64`, `ppc64`, `s390x`, `wasm`.
