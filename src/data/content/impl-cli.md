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
