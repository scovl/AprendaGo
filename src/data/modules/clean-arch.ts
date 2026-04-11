import { Module } from '../../types';

export const cleanArchModule: Module = {
  id: 'clean-arch',
  title: 'Clean Architecture',
  description: 'Clean Architecture em Go: entities, use cases, adapters e frameworks.',
  icon: 'Layers',
  color: '#1ABC9C',
  lessons: [
    {
      id: 'clean-conceitos',
      title: 'Clean Architecture: Conceitos e ImplementaÃ§Ã£o',
      description: 'Camadas, regras de dependÃªncia, entities, use cases e project layout.',
      estimatedMinutes: 55,
      vesa: {
        visaoGeral: {
          codeExample: '# Layout Go com Clean Architecture\ncmd/\n  server/main.go         # entry point, DI\ninternal/\n  entity/                # domÃ­nio puro (structs, regras)\n    order.go\n  usecase/               # lÃ³gica de aplicaÃ§Ã£o\n    create_order.go\n  infra/                 # adapters\n    handler/http.go      # HTTP handler\n    repository/pg.go     # PostgreSQL repo\npkg/                     # libs pÃºblicas reutilizÃ¡veis',
          recursos: [
            'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html',
          ],
        },
        experimentacao: {
          desafio: 'Crie um projeto com Clean Architecture: entity Order, use case CreateOrder, handler HTTP e repository (in-memory para comeÃ§ar).',
          dicas: [
            'Entity nÃ£o importa nenhum pacote externo',
            'Use case depende de interface Repository, nÃ£o implementaÃ§Ã£o',
            'Handler converte HTTP â†” use case',
          ],
        },
        socializacao: {
          discussao: 'Clean Architecture adiciona complexidade. Quando vale a pena?',
          pontos: [
            'Projetos pequenos: overengineering',
            'Projetos mÃ©dios/grandes: testabilidade e manutenÃ§Ã£o',
            'Pragmatismo: nÃ£o precisa ser 100% puro',
          ],
          diasDesafio: 'Dias 77â€“82',
          sugestaoBlog: 'Clean Architecture em Go: do conceito ao cÃ³digo real',
          hashtagsExtras: '#golang #cleanarchitecture',
        },
        aplicacao: {
          projeto: 'Sistema de pedidos com Clean Architecture completa.',
          requisitos: [
            'Entities: Order, Product',
            'Use Cases: CreateOrder, ListOrders',
            'Adapters: HTTP handler, PostgreSQL repository',
            'Testes: use cases testÃ¡veis sem infra',
          ],
          criterios: ['Regra de dependÃªncia respeitada', 'Use cases testÃ¡veis isoladamente', 'CÃ³digo organizado'],
        },
      },
    },
  ],
};
