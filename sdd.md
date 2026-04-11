# Introdução a linguagem
- Sobre a linguagem e seu histórico
- Motivações
- Instalação
- Configuração do ambiente no VSCode
 
## Desenvolvimento de APIs
- Retomando conceitos de HTTP Server e Mux
- Criando Endpoints
- Apresentando principais frameworks e roteadores
- Trabalhando com “chi”
- Middlewares
- Autenticação e tokens JWT
- Documentando API com Swagger
 
## Foundation
- Primeiros passos
- Trabalhando com tipagem forte
- Arrays, Slices, Maps
- Laços de repetição, condicionais
- Ponteiros
- Funções, Structs, Métodos, Interfaces e Generics
- Trabalhando com packages
- Módulos
- Módulos privados
- Instalação de pacotes
- Compilando projetos Go
- Workspaces
 
## Concorrência e Multithreading
- Entendendo conceitos de concorrência e paralelismo
- Como Go aborda concorrência e schedulers
- Iniciando com Go Routines
- Contadores atômicos
- Trabalhando com Channels e buffers
- Utilizando recurso de Select
- Wait Groups
- Mutex
- Prevenindo race conditions
- Desenvolvimento de workers utilizando channels
- Load Balancer
 
## Pacotes importantes
- Manipulação de arquivos
- Chamadas HTTP
- Trabalhando com objetos Json
- Defer
- Desenvolvendo um sistema Busca CEP
- Trabalhando com HTTP
- Criando servidores HTTP
- Entendendo Multiplexers
- Servidor de arquivos
- Trabalhando com templates dinâmicos
- Aprofundando em HTTP utilizando Context
 
## Implementações
- gRPC
- GraphQL
- Upload de arquivos na AWS S3
- Command line com cobra CLI
- Unit of Work
- Dependency Injection com Google Wire
- Manipulação de eventos (Event Dispatcher, Handlers, etc)
- Integração com RabbitMQ
- Gerenciamento de configuração com Viper
 
## Golang Internals (Novidade)
- Visão Geral da Arquitetura do Runtime do Go
- Goroutines
- M, P, G (Threads, Processadores Lógicos, Goroutines)
- Gerenciamento de Memória e Alocação
- Arrays e Slices e sua importância para linguagem
- Garbage Collector (GC) do Go
- Go Scheduler
- Interfaces e Tipos Dinâmicos
- Ferramentas de Diagnóstico e Performance
 
## Go e Clean Architecture
- Iniciando com Clean Architecture
- Pontos importantes sobre arquitetura
- Keep options opened
- Use Cases
- Limites arquiteturais
- Input vs Output
- DTOs
- Entities
- Desenvolvendo camada de domínio
- Criando Use Cases
- Criando adaptador para banco de dados
- Criando adaptador para o RabbitMQ
- Servindo endpoints HTTP
- Consumindo mensagens com RabbitMQ
- Criando CLI para iniciar a aplicação
- Documentando aplicação
- Go Doc
 
## Pacote Context
- Entendendo o conceito de um context
- Armazenando e recuperando valores
- Background, Timeout, Deadline e Cancelations
- Context na prática

## Testes automatizados
- Iniciando com testes no Go
- Formas de asserção
- Pacotes úteis
- Trabalhando com Mocks
- Fuzzes e testes de mutação
- Testes em batch
- Benchmarking
- Criando suite de testes com Testify
- Testes End-to-end
 
## Bancos de dados
- Entendendo como Go trabalha com banco de dados
- Estabelecendo conexão e realizando primeiras operações
- Boas práticas de segurança
- Realizando operações utilizando Context
- Go puro vs ORM
- Trabalhando com GORM
- Migrations
- SQLC: Geração automática de Queries
 
## SOLID
- O que acontece com o design ao longo do tempo
- Fragilidade e imobilidade do sistema
- Exemplo de limitações
- Perguntas e respostas
- Single responsability principle SRP
- The open closed principle OCP
- The Liskov substituition principle LSP e The interface segregation principle ISP
- The dependency inversion principle DIP
 
## Deploy
- Entendendo processo de compilação
- Gerando imagem Docker com multistage building
- Criando manifestos Kubernetes
- Realizando deploy no Kubernetes
