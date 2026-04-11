import { Module } from '../../types';

export const implementacoesModule: Module = {
    id: 'implementacoes',
    title: 'ImplementaÃ§Ãµes AvanÃ§adas',
    description: 'gRPC, GraphQL, CLIs com Cobra, Event Dispatcher e go:embed.',
    icon: 'Wrench',
    color: '#E67E22',
    lessons: [
      {
        id: 'impl-grpc',
        title: 'gRPC e Protocol Buffers',
        description: 'ComunicaÃ§Ã£o entre serviÃ§os com gRPC, protobuf e streaming.',
        estimatedMinutes: 50,
        vesa: {
          visaoGeral: {
            codeExample: '// user.proto\nsyntax = "proto3";\npackage user;\n\nservice UserService {\n  rpc GetUser(GetUserRequest) returns (User);\n  rpc ListUsers(ListRequest) returns (stream User); // server streaming\n}\n\nmessage GetUserRequest { string id = 1; }\nmessage User { string id = 1; string name = 2; string email = 3; }\nmessage ListRequest { int32 limit = 1; }\n\n// Gerar cÃ³digo:\n// protoc --go_out=. --go-grpc_out=. user.proto',
            recursos: [
              'https://grpc.io/docs/languages/go/',
              'https://protobuf.dev/',
            ],
          },
          experimentacao: {
            desafio: 'Crie um serviÃ§o gRPC de produtos: defina .proto, gere cÃ³digo, implemente server e client.',
            dicas: [
              'Instale protoc e plugins: protoc-gen-go, protoc-gen-go-grpc',
              'Use reflection para debugging: grpcurl',
              'Teste com grpcurl ou Evans (REPL gRPC)',
            ],
          },
          socializacao: {
            discussao: 'gRPC vs REST: quando usar cada um?',
            pontos: [
              'gRPC: microsserviÃ§os internos, streaming, performance',
              'REST: APIs pÃºblicas, browser, simplicidade',
              'gRPC-Gateway: expÃµe gRPC como REST automaticamente',
            ],
            diasDesafio: 'Dias 83â€“90',
            sugestaoBlog: 'gRPC com Go: do .proto ao servidor em produÃ§Ã£o',
            hashtagsExtras: '#golang #grpc #protobuf',
          },
          aplicacao: {
            projeto: 'MicrosserviÃ§o gRPC completo: server, client, streaming e testes.',
            requisitos: [
              'Proto definitions com mensagens e serviÃ§o',
              'Server e client implementation',
              'Server streaming',
            ],
            criterios: ['Proto compilando', 'ComunicaÃ§Ã£o funcional', 'Testes de integraÃ§Ã£o'],
          },
        },
      },
      {
        id: 'impl-cli',
        title: 'CLIs com Cobra e go:embed',
        description: 'Cobra para CLIs profissionais, Viper para config e go:embed para assets.',
        estimatedMinutes: 45,
        vesa: {
          visaoGeral: {
            codeExample: 'package main\n\nimport (\n\t"embed"\n\t"fmt"\n\t"github.com/spf13/cobra"\n)\n\n//go:embed templates/*\nvar templates embed.FS\n\nvar rootCmd = &cobra.Command{\n\tUse:   "myapp",\n\tShort: "Minha CLI em Go",\n}\n\nvar serveCmd = &cobra.Command{\n\tUse:   "serve",\n\tShort: "Iniciar servidor",\n\tRun: func(cmd *cobra.Command, args []string) {\n\t\tport, _ := cmd.Flags().GetInt("port")\n\t\tfmt.Printf("Servidor na porta %d\\n", port)\n\t},\n}\n\nfunc init() {\n\tserveCmd.Flags().IntP("port", "p", 8080, "Porta do servidor")\n\trootCmd.AddCommand(serveCmd)\n}\n\nfunc main() { rootCmd.Execute() }',
            recursos: [
              'https://github.com/spf13/cobra',
              'https://github.com/spf13/viper',
              'https://pkg.go.dev/embed',
            ],
          },
          experimentacao: {
            desafio: 'Crie uma CLI com Cobra: 3 subcomandos, flags, config via Viper (arquivo YAML + env vars) e assets embeddados com go:embed.',
            dicas: [
              'cobra-cli init && cobra-cli add serve',
              'Viper: viper.SetConfigFile("config.yaml")',
              'go:embed: //go:embed static/* acima de var',
            ],
          },
          socializacao: {
            discussao: 'Por que tantas ferramentas DevOps sÃ£o escritas em Go?',
            pontos: [
              'BinÃ¡rio Ãºnico â€” sem runtime/dependÃªncias',
              'Cross-compilation: GOOS=linux go build',
              'go:embed elimina necessidade de bundler',
            ],
            diasDesafio: 'Dias 83â€“90',
            sugestaoBlog: 'CLIs em Go com Cobra, Viper e go:embed: ferramentas profissionais',
            hashtagsExtras: '#golang #cli #cobra',
          },
          aplicacao: {
            projeto: 'CLI de automaÃ§Ã£o com Cobra, Viper config e templates embeddados.',
            requisitos: [
              'MÃºltiplos comandos e subcomandos',
              'Config via YAML + env vars',
              'Templates estÃ¡ticos com go:embed',
            ],
            criterios: ['CLI usÃ¡vel', 'Config flexÃ­vel', 'BinÃ¡rio auto-contido'],
          },
        },
      },
      {
        id: 'impl-graphql',
        title: 'GraphQL com gqlgen',
        description: 'API GraphQL type-safe com gqlgen: schema-first, resolvers e dataloader.',
        estimatedMinutes: 45,
        vesa: {
          visaoGeral: {
            recursos: [
              'https://gqlgen.com/',
              'https://graphql.org/',
            ],
          },
          experimentacao: {
            desafio: 'Crie schema GraphQL para livraria com queries (livros, autores) e mutations (criarLivro). Use gqlgen para gerar cÃ³digo.',
            dicas: [
              'gqlgen init gera scaffold completo',
              'Defina schema.graphqls primeiro',
              'Implemente resolvers nos arquivos gerados',
            ],
          },
          socializacao: {
            discussao: 'GraphQL vs REST: complexidade vs flexibilidade?',
            pontos: [
              'GraphQL: cliente controla dados, N+1 Ã© risco',
              'REST: simples, cacheÃ¡vel, previsÃ­vel',
              'Use GraphQL quando clientes tÃªm necessidades variadas',
            ],
            diasDesafio: 'Dias 83â€“90',
            sugestaoBlog: 'GraphQL com Go: schema-first com gqlgen e resolvers type-safe',
            hashtagsExtras: '#golang #graphql #gqlgen',
          },
          aplicacao: {
            projeto: 'API GraphQL completa com autenticaÃ§Ã£o e dataloader.',
            requisitos: [
              'Queries e Mutations',
              'Middleware de autenticaÃ§Ã£o',
              'Dataloader para evitar N+1',
            ],
            criterios: ['Schema bem definido', 'Performance com dataloader', 'Playground funcional'],
          },
        },
      },
    ],
};
