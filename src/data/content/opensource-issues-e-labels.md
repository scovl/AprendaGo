---
title: Issues, labels e good first issue
description: Entenda o sistema de labels, como ler issues e como escrever uma boa issue do zero.
estimatedMinutes: 30
recursos:
  - https://github.com/search?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+language%3AGo+no%3Aassignee&type=issues
  - https://goodfirstissue.dev/language/go
  - https://www.codetriage.com/?language=Go
experimentacao:
  desafio: "Use o checklist da lição para avaliar 3 issues da tabela do GopherLab (escolha você quais). Para cada uma, responda: ela tem contexto suficiente para você começar a trabalhar agora? O que está faltando, se algo estiver? Qual das 3 você escolheria — e por quê?"
  dicas:
    - "Abra cada issue no GitHub e leia o corpo inteiro — não só o título"
    - "Verifique se tem assignee (campo à direita na página da issue) — se tiver, já está sendo trabalhada"
    - "Aplique os 4 critérios do checklist um por um: atribuição, contexto, atividade recente, PR vinculado"
    - "Sua resposta não precisa ser perfeita — o objetivo é praticar o olhar crítico, não acertar tudo"
socializacao:
  discussao: "Você abriria uma issue reportando um bug mesmo sabendo que talvez não tenha tempo de corrigi-la? Por quê?"
  pontos:
    - Reportar um bug sem abrir PR já é uma contribuição válida e útil — reprodução documentada economiza horas de debug dos mantenedores
    - Uma issue mal escrita cria trabalho extra — mantenedores precisam voltar para pedir contexto, o que atrasa todos
    - Issues de documentação são frequentemente as mais impactantes e as mais ignoradas ao mesmo tempo
    - "Comentar 'Estou trabalhando nisso' antes de abrir PR é etiqueta básica — evita dois contribuidores fazendo a mesma coisa"
    - A qualidade das suas issues é um cartão de visitas tão importante quanto o código que você escreve
  diasDesafio: "Bônus – Semana Open Source"
  sugestaoBlog: "good first issue: como ler, escolher e não desperdiçar o tempo de ninguém"
  hashtagsExtras: '#opensource #golang #github #goodfirstissue'
aplicacao:
  projeto: "Escreva e publique 1 issue real em um projeto Go que você usa — seguindo os 5 elementos de uma issue bem escrita da lição."
  requisitos:
    - "Escolha um projeto Go que você usa ou conhece: pode ser um bug que já encontrou, uma dúvida sobre documentação, ou uma melhoria pequena"
    - "Antes de publicar: pesquise se já existe issue aberta ou fechada sobre o mesmo problema (use a busca do GitHub)"
    - "A issue deve ter: título semântico, descrição clara do problema, ambiente (versão Go, OS), comportamento esperado vs atual"
    - "Aplique ao menos 1 label relevante — se o projeto não permitir aplicar labels, mencione qual você usaria no corpo"
  criterios:
    - "A issue não duplica um problema já reportado (evidência: você buscou antes de publicar)"
    - "Contexto suficiente para outra pessoa entender e trabalhar sem precisar perguntar nada"
    - "Tom objetivo — foco no problema, não em julgamentos sobre o código ou os mantenedores"
---

O sistema de labels do GitHub é o **mapa de contribuição** de um projeto. Saber ler as labels certas economiza horas de busca.

## Labels essenciais para contribuidores novos

| Label | Significado |
|---|---|
| `good first issue` | Issue explicitamente marcada pelos mantenedores como acessível |
| `help wanted` | Mantenedores precisam de ajuda, mas pode exigir contexto |
| `bug` | Comportamento incorreto — geralmente bem descrito |
| `documentation` | Melhorias em docs — ótima entrada sem precisar de domínio do código |
| `beginner friendly` | Alias de `good first issue` em muitos projetos |

## Checklist: como avaliar uma issue antes de trabalhar nela

1. **Está atribuída?** Se sim, alguém já está trabalhando — pergunte antes de duplicar esforço
2. **Tem contexto suficiente?** Steps to reproduce, versão Go, OS — issues mal descritas rendem PRs errados
3. **Qual a última atividade?** Issues sem resposta há mais de 6 meses podem estar abandonadas
4. **Existe uma PR aberta?** Verifique "Linked pull requests" — não refaça o que já está em revisão

## Busca avançada de issues

```
is:open is:issue label:"good first issue" language:Go no:assignee
```

- `no:assignee` — sem responsável, disponível para você
- `updated:>2024-01-01` — ativa recentemente
- `comments:>2` — tem engajamento dos mantenedores

## Exemplo real: good first issues do GopherLab

O próprio GopherLab tem um conjunto de issues abertas com `good first issue` criadas a partir de uma auditoria real do código. Use-as como modelo de como uma boa issue se parece:

| # | Tipo | Área | Título |
|---|------|------|--------|
| [#13](https://github.com/scovl/GopherLab/issues/13) | `feat` | Go / runner | Tornar `maxConcurrent` configurável via variável de ambiente |
| [#14](https://github.com/scovl/GopherLab/issues/14) | `fix` | Acessibilidade | Adicionar `aria-live` no painel de output do editor |
| [#15](https://github.com/scovl/GopherLab/issues/15) | `feat` | UX | Adicionar atalho `Ctrl+Enter` para executar código |
| [#16](https://github.com/scovl/GopherLab/issues/16) | `perf` | React | Memoizar `findLesson` e `findModule` com `useCallback` |
| [#17](https://github.com/scovl/GopherLab/issues/17) | `fix` | Acessibilidade | Substituir `<div role=dialog>` por `<dialog>` em modais |
| [#18](https://github.com/scovl/GopherLab/issues/18) | `fix` | Acessibilidade | Corrigir `role=listbox` em `<ul>` no breadcrumb |
| [#19](https://github.com/scovl/GopherLab/issues/19) | `fix` | CSS / a11y | Corrigir contraste WCAG AA em `playground.css` |
| [#21](https://github.com/scovl/GopherLab/issues/21) | `feat` | Infra | Adicionar `robots.txt` em `public/` |
| [#22](https://github.com/scovl/GopherLab/issues/22) | `fix` | TypeScript | Adicionar `Readonly<Props>` ao `ProgressBar` |
| [#23](https://github.com/scovl/GopherLab/issues/23) | `fix` | React | Não usar índice de array como `key` no `PomodoroTimer` |

## Os 5 elementos de uma issue bem escrita

Toda issue bem escrita — seja bug report ou feature request — tem estes elementos:

1. **Título semântico** com prefixo `fix:` / `feat:` / `perf:` / `docs:` — igual à convenção de commits
2. **Arquivo e localização** quando possível (ex: `src/components/Foo.tsx:42`) — sem ambiguidade sobre onde mexer
3. **Passos para reproduzir** (nas de bug) — o contribuidor confirma o problema antes de codar
4. **Solução proposta** (nas de feat/perf) — reduz a ida-e-volta de "estou no caminho certo?"
5. **Labels consistentes** — `good first issue` + categoria (`accessibility`, `performance`, etc.)

> Na próxima lição você vai fazer o ciclo completo de contribuição: fork → branch → implementação → PR. A issue que você abriu aqui — ou uma das issues da tabela do GopherLab que analisou na experimentação — pode ser exatamente o seu ponto de partida.
