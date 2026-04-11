import { Module } from '../../types';

export const errosModule: Module = {
    id: 'erros',
    title: 'Tratamento de Erros',
    description: 'Erros idiomÃ¡ticos: wrapping, sentinel errors, errors.Is/As, multi-errors e boas prÃ¡ticas.',
    icon: 'AlertCircle',
    color: '#E74C3C',
    lessons: [
      {
        id: 'erros-padroes',
        title: 'PadrÃµes de Erro em Go',
        description: 'error interface, errors.New, fmt.Errorf, wrapping com %w, errors.Is e errors.As.',
        estimatedMinutes: 40,
        vesa: {
          visaoGeral: {
            recursos: [
              'https://go.dev/blog/error-handling-and-go',
              'https://go.dev/blog/go1.13-errors',
              'https://gobyexample.com/errors',
            ],
          },
          experimentacao: {
            desafio: 'Crie 3 tipos de erro: sentinela, customizado com campos e wrapped. Teste errors.Is e errors.As em cada caso.',
            dicas: [
              'Sentinela: var ErrNotFound = errors.New("...")',
              'Wrapping: fmt.Errorf("contexto: %w", err)',
              'errors.As: extrai struct de erro customizado',
            ],
          },
          socializacao: {
            discussao: 'Erros como valores vs exceÃ§Ãµes: qual abordagem preferem para projetos grandes?',
            pontos: [
              'Erros explÃ­citos forÃ§am tratamento imediato',
              'Exceptions podem ser esquecidas ou swallowed',
              'Go: "happy path" Ã  esquerda, error handling Ã  direita',
            ],
            diasDesafio: 'Dias 39â€“44',
            sugestaoBlog: 'Error handling em Go: wrapping, errors.Is, errors.As e boas prÃ¡ticas',
            hashtagsExtras: '#golang #errors #bestpractices',
          },
          aplicacao: {
            projeto: 'Parser de configuraÃ§Ã£o que retorna erros ricos: sentinela para tipo de falha, customizado para contexto, wrapping para causa raiz.',
            requisitos: [
              'Erros sentinela para tipos de falha',
              'Erros customizados com campos de contexto',
              'Testes cobrindo todos os caminhos de erro',
            ],
            criterios: ['errors.Is/As funcionando', 'Mensagens claras', 'Cobertura > 90%'],
          },
        },
      },
      {
        id: 'erros-avancado',
        title: 'Multi-erros e Erros Estruturados',
        description: 'errors.Join, go-multierror, eris e estratÃ©gias de produÃ§Ã£o.',
        estimatedMinutes: 40,
        vesa: {
          visaoGeral: {
            recursos: [
              'https://pkg.go.dev/errors#Join',
              'https://github.com/uber-go/multierr',
              'https://github.com/rotisserie/eris',
            ],
          },
          experimentacao: {
            desafio: 'Implemente um importador de CSV que processa todas as linhas e coleta todos os erros de validaÃ§Ã£o (com nÃºmero da linha) sem abortar na primeira falha.',
            dicas: [
              'errors.Join agrupa erros â€” nil se slice vazio',
              'Inclua nÃºmero da linha no contexto do erro',
              'Para output JSON dos erros, crie struct ErrorReport',
            ],
          },
          socializacao: {
            discussao: 'Quando usar stack traces em erros? HÃ¡ custo de performance?',
            pontos: [
              'Stack traces Ãºteis em dev, caros em prod',
              'Logging estruturado (slog/zap) como alternativa',
              'OpenTelemetry para rastreamento distribuÃ­do',
            ],
            diasDesafio: 'Dias 39â€“44',
            sugestaoBlog: 'Multi-erros em Go: errors.Join e estratÃ©gias para batch processing',
            hashtagsExtras: '#golang #errors #observability',
          },
          aplicacao: {
            projeto: 'Validador de JSON array: processe todos os itens e retorne relatÃ³rio completo de erros.',
            requisitos: [
              'Processar todos itens mesmo com erros',
              'Erros com contexto: Ã­ndice + campo + mensagem',
              'Output para humanos (texto) e mÃ¡quinas (JSON)',
            ],
            criterios: ['Nenhum erro perdido', 'RelatÃ³rio claro', 'Testes com inputs variados'],
          },
        },
      },
    ],
};
