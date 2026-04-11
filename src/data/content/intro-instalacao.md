---
title: Instalação e Primeiro Programa
description: Instale Go, configure o ambiente e escreva seu Hello World.
estimatedMinutes: 30
codeExample: |
  package main

  import "fmt"

  func main() {
  	fmt.Println("Olá, Go!")
  }

  // Executar:
  // go mod init meuprojeto
  // go run main.go
recursos:
  - https://go.dev/dl/
  - https://go.dev/doc/install
  - https://go.dev/tour/welcome/1
experimentacao:
  desafio: Instale Go, crie um módulo com go mod init e escreva um programa que imprima seu nome usando fmt.Printf com verbos de formatação (%s, %d, %v).
  dicas:
    - "No Windows: instalador .msi, no macOS: .pkg ou brew, no Linux: tarball em /usr/local"
    - "Verifique: go version && go env"
    - go mod init inicializa um módulo — necessário para qualquer projeto
    - fmt.Printf não adiciona newline automaticamente -- use a sequencia de nova linha no formato
socializacao:
  discussao: Compartilhe dificuldades encontradas na instalação e como as resolveu.
  pontos:
    - Problemas com PATH
    - Diferença entre GOPATH e GOROOT
    - Versões do Go e compatibilidade
  diasDesafio: Dias 1–7
  sugestaoBlog: "Instalando Go e rodando Hello World: guia passo a passo"
  hashtagsExtras: '#golang #setup'
aplicacao:
  projeto: Configure o Go e crie um módulo com Hello World funcional.
  requisitos:
    - Go instalado e funcionando (go version)
    - Módulo inicializado com go mod init
    - Programa usando fmt.Println e fmt.Printf
  criterios:
    - Go instalado corretamente
    - Hello World compilando e executando
---

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
