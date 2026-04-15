# Guia de Contribuição — GopherLab

---

## Requisitos

- Go 1.22+, Node.js 20+, Docker e Docker Compose
- Fork do repositório antes de qualquer PR

---

## Comandos Rápidos

```bash
make help          # lista todos os targets disponíveis

make up            # sobe em produção (porta 3000)
make dev           # hot reload (porta 3001)
make down          # derruba os containers
make logs          # acompanha logs em tempo real

make test          # roda todos os testes (Go + TypeScript)
make test-go       # testes Go via Docker (com race detector)
make test-go-local # testes Go sem Docker
make test-ts       # verifica tipos TypeScript
make test-e2e      # teste E2E do runner via nginx (containers devem estar rodando)

make lint          # go vet + tsc --noEmit
make fmt           # gofmt + goimports no runner/
make build         # build do frontend (tsc + vite)
```

---

## Estrutura

```
src/
  components/   # React — VesaPhases, LessonView, RoadmapView, RoadmapTree
  context/      # ProgressContext, AccessibilityContext
  data/
    roadmap.ts  # conteúdo: módulos, lições, fases VESA
  types/
    index.ts    # VesaPhase, VesaContent, Lesson, Module, UserProgress
runner/
  main.go       # HTTP API: POST /run, GET /health
  main_test.go  # testes unitários e de integração
```

---

## Ciclo VESA

Cada lição em `roadmap.ts` tem 4 fases obrigatórias:

| Chave | Conteúdo |
|-------|----------|
| `visaoGeral` | Explicação, exemplo de código, links |
| `experimentacao` | Desafio prático, dicas, template |
| `socializacao` | Discussão, pontos de reflexão, sugestão de blog |
| `aplicacao` | Projeto final, requisitos, critérios |

---

## Fluxo de Contribuição

```bash
git checkout main && git pull origin main
git checkout -b fix/descricao-curta   # ou feat/, content/, docs:

# desenvolva...

make lint          # obrigatório — sem erros
make test          # obrigatório — todos passando
make build         # obrigatório — sem erros TypeScript

git rebase origin/main
git push origin <branch>
# abra o PR
```

### Convenção de commits

```
fix: corrigir saída vazia no painel de execução
feat: adicionar módulo de WebSockets
content: adicionar lição sobre goroutines
docs: atualizar guia de contribuição
refactor: extrair componente de editor
```

---

## Estilo de Código

### Go (`runner/`)

- Erros tratados — nunca `_` para ignorar
- Constantes para strings literais repetidas
- Sem `panic` em produção — retorne `error`
- `context.Context` em operações com I/O ou timeout
- Funções exportadas com comentário de documentação

```go
// runCode executa o código do usuário em sandbox isolado.
func runCode(ctx context.Context, code string) (string, error) {
    if code == "" {
        return "", errors.New("código vazio")
    }
    return output, nil
}
```

### TypeScript/React (`src/`)

- Props como `Readonly<Props>`
- `useMemo` em valores de contexto
- HTML semântico (`<section>`, `<nav>`, `<button>`) — evite `<div role=...>`
- `key` em listas dinâmicas: use IDs únicos, nunca índices
- Sem `any` — tipos em `src/types/index.ts`
- `useCallback` para handlers passados como props

### CSS (`src/index.css`)

- Prefixos: `vesa-*` (ciclo VESA) e `rt-*` (RoadmapTree)
- Variáveis CSS em vez de valores hardcoded
- Contraste mínimo WCAG AA (4.5:1)
- `rem` em vez de `px` para fontes

---

## Adicionando Lições ao Roadmap

Edite `src/data/roadmap.ts` — todas as 4 fases são obrigatórias:

```typescript
{
  id: 'modulo-nome-da-licao',
  title: 'Título da Lição',
  description: 'Breve descrição.',
  estimatedMinutes: 40,
  vesa: {
    visaoGeral: {
      explicacao: 'Explicação do conceito.',
      codeExample: 'package main\n\nfunc main() {}', // opcional
      recursos: ['https://go.dev/doc/...'],
    },
    experimentacao: {
      desafio: 'Descrição do desafio.',
      dicas: ['Dica 1', 'Dica 2'],
      codeTemplate: '// código inicial',             // opcional
    },
    socializacao: {
      discussao: 'Pergunta para reflexão.',
      pontos: ['Ponto 1', 'Ponto 2'],
      diasDesafio: 'Dias X–Y',
      sugestaoBlog: 'Título sugerido',
      hashtagsExtras: '#golang #tema',
    },
    aplicacao: {
      projeto: 'Descrição do projeto.',
      requisitos: ['Requisito 1'],
      criterios: ['Critério 1'],
    },
  },
},
```

---

## Relatando Bugs

Inclua na issue: tela/URL, passos para reproduzir, comportamento esperado vs. atual, navegador/SO e logs/prints.

---

## Teste E2E do Runner

O arquivo `e2e-runner.mjs` simula o fluxo completo que o frontend executa ao rodar código Go:

1. **GET /api/challenge** — obtém nonce e dificuldade do sistema Proof-of-Work
2. **Resolve o PoW** — calcula SHA-256 até encontrar o número de zeros exigido
3. **POST /api/run** ou **POST /api/lab** — envia código Go via nginx com headers de PoW
4. **Valida a resposta** — verifica se o output contém o resultado esperado

### Por que existe

Os testes unitários em `runner/main_test.go` testam os handlers diretamente, sem passar pelo nginx. O teste E2E valida a cadeia completa: **frontend → nginx proxy → runner → compilação Go → resposta**. Isso cobre problemas de configuração do nginx (rewrite, timeouts, headers de PoW) que os testes unitários não conseguem detectar.

### Como usar

```bash
# Os containers devem estar rodando
make up

# Rodar o teste E2E
make test-e2e

# Ou diretamente
node e2e-runner.mjs

# Apontar para outro host
BASE_URL=http://meu-servidor:3000 node e2e-runner.mjs
```

### O que testa

| # | Cenário | Endpoint | Esperado |
|---|---------|----------|----------|
| 1 | Hello World | `/api/run` | Output contém `hello test` |
| 2 | Função com retorno | `/api/run` | Output contém `5` |
| 3 | Erro de compilação | `/api/run` | Campo `errors` preenchido |
| 4 | Lab single file | `/api/lab` | Output contém `lab ok` |
| 5 | Lab multi-file | `/api/lab` | Output contém `Hello, Go!` |
| 6 | Lab go test | `/api/lab` | Output contém `PASS` |

Requer Node.js 18+ (usa `fetch` e `crypto.subtle` nativos).

---

## Checklist do PR

- [ ] `make lint` sem erros
- [ ] `make test` passando
- [ ] `make build` sem erros
- [ ] Novas lições com todas as 4 fases VESA preenchidas
- [ ] PR resolve uma única issue ou feature
- [ ] Commit segue a convenção do projeto

---

## Código de Conduta

Este projeto adota um ambiente de respeito, diversidade e inclusão. Antes de contribuir, leia nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em respeitá-lo.

---

## Recursos Úteis

- [README.md](README.md) — Visão geral e como rodar
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — Código de conduta da comunidade
- [src/data/roadmap.ts](src/data/roadmap.ts) — Estrutura de conteúdo
- [src/types/index.ts](src/types/index.ts) — Tipos do projeto
- [runner/main.go](runner/main.go) — API de execução de código
- [e2e-runner.mjs](e2e-runner.mjs) — Teste E2E do runner (fluxo completo via nginx)
- [go.dev/doc](https://go.dev/doc/) — Documentação oficial do Go

