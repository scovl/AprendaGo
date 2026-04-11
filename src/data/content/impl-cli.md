---
title: CLIs com Cobra e go:embed
description: Cobra para CLIs profissionais, Viper para config e go:embed para assets.
estimatedMinutes: 45
recursos:
  - https://github.com/spf13/cobra
  - https://github.com/spf13/viper
  - https://pkg.go.dev/embed
experimentacao:
  desafio: "Crie uma CLI com Cobra: 3 subcomandos, flags, config via Viper (arquivo YAML + env vars) e assets embeddados com go:embed."
  dicas:
    - cobra-cli init && cobra-cli add serve
    - "Viper: viper.SetConfigFile(\"config.yaml\")"
    - "go:embed: //go:embed static/* acima de var"
socializacao:
  discussao: Por que tantas ferramentas DevOps são escritas em Go?
  pontos:
    - Binário único – sem runtime/dependências
    - "Cross-compilation: GOOS=linux go build"
    - go:embed elimina necessidade de bundler
  diasDesafio: Dias 83–90
  sugestaoBlog: "CLIs em Go com Cobra, Viper e go:embed: ferramentas profissionais"
  hashtagsExtras: '#golang #cli #cobra'
aplicacao:
  projeto: CLI de automação com Cobra, Viper config e templates embeddados.
  requisitos:
    - Múltiplos comandos e subcomandos
    - Config via YAML + env vars
    - Templates estáticos com go:embed
  criterios:
    - CLI usável
    - Config flexível
    - Binário auto-contido
---

**Cobra** é o framework CLI padrão em Go — usado por Docker, Kubernetes, Hugo e GitHub CLI. Oferece subcomandos, flags, autocompletação e help automático.

## Estrutura básica com Cobra

```go
var rootCmd = &cobra.Command{
    Use:   "mytool",
    Short: "Minha ferramenta CLI",
}

var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Inicia o servidor",
    RunE: func(cmd *cobra.Command, args []string) error {
        port, _ := cmd.Flags().GetInt("port")
        return startServer(port)
    },
}

func init() {
    serveCmd.Flags().Int("port", 8080, "Porta do servidor")
    rootCmd.AddCommand(serveCmd)
}
```

## Viper — configuração de múltiplas fontes

`Viper` gerencia configuração com precedência: flags > env vars > arquivo de config > defaults:

```go
viper.SetDefault("port", 8080)
viper.BindPFlag("port", cmd.Flags().Lookup("port"))
viper.AutomaticEnv()  // PORT, DATABASE_URL, etc.
viper.ReadInConfig()   // config.yaml, config.json, etc.

port := viper.GetInt("port")
```

## go:embed — assets estáticos no binário

`go:embed` (Go 1.16+) embute arquivos no binário — sem dependências em tempo de execução:

```go
//go:embed templates/*.html
var templates embed.FS

//go:embed data/seed.json
var seedData []byte
```

Ideal para templates, configs, dados de seed, certificados.
