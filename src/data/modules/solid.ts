import { Module } from '../../types';

export const solidModule: Module = {
  id: 'solid',
  title: 'SOLID em Go',
  description: 'PrincÃ­pios SOLID aplicados ao Go: composiÃ§Ã£o, interfaces e design.',
  icon: 'Shield',
  color: '#9B59B6',
  lessons: [
    {
      id: 'solid-principios',
      title: 'PrincÃ­pios SOLID em Go',
      description: 'SRP, OCP, LSP, ISP e DIP com exemplos idiomÃ¡ticos.',
      estimatedMinutes: 60,
      vesa: {
        visaoGeral: {
          codeExample: '// ISP â€” interfaces pequenas\ntype Reader interface { Read(p []byte) (int, error) }\ntype Writer interface { Write(p []byte) (int, error) }\ntype ReadWriter interface { Reader; Writer }\n\n// DIP â€” dependa de abstraÃ§Ãµes\ntype UserService struct {\n\trepo UserRepository // interface, nunca struct concreto\n}\n\ntype UserRepository interface {\n\tFindByID(ctx context.Context, id string) (*User, error)\n\tSave(ctx context.Context, user *User) error\n}',
          recursos: ['https://dave.cheney.net/2016/08/20/solid-go-design'],
        },
        experimentacao: {
          desafio: 'Refatore um cÃ³digo monolÃ­tico (handler que faz tudo: HTTP, validaÃ§Ã£o, banco) aplicando cada princÃ­pio SOLID.',
          dicas: [
            'SRP: separe handler, service, repository',
            'ISP: interface Repository com apenas os mÃ©todos usados',
            'DIP: service recebe interface, nÃ£o struct concreto',
          ],
        },
        socializacao: {
          discussao: 'SOLID foi criado para OOP com heranÃ§a. Faz sentido em Go que usa composiÃ§Ã£o?',
          pontos: [
            'Go nÃ£o tem heranÃ§a â€” composiÃ§Ã£o Ã© mais flexÃ­vel',
            'Interfaces implÃ­citas facilitam ISP e DIP naturalmente',
            'Pragmatismo > purismo â€” aplique onde faz diferenÃ§a',
          ],
          diasDesafio: 'Dias 77â€“82',
          sugestaoBlog: 'SOLID em Go: design com composiÃ§Ã£o e interfaces implÃ­citas',
          hashtagsExtras: '#golang #solid #cleancode',
        },
        aplicacao: {
          projeto: 'Refatore um "monolito" em Go aplicando os 5 princÃ­pios com before/after.',
          requisitos: [
            'Demonstrar cada princÃ­pio',
            'Testes para validar refatoraÃ§Ã£o',
            'Documentar decisÃµes de design',
          ],
          criterios: ['Cada princÃ­pio aplicado', 'CÃ³digo mais testÃ¡vel', 'Sem regressÃµes'],
        },
      },
    },
  ],
};
