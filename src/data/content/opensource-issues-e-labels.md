---
title: Issues, labels e good first issue
description: Entenda o sistema de labels, como ler issues e como interpretar good-first-issue.
estimatedMinutes: 30
recursos:
  - https://github.com/search?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+language%3AGo+no%3Aassignee&type=issues
  - https://goodfirstissue.dev/language/go
  - https://www.codetriage.com/?language=Go
experimentacao:
  desafio: Escreva um programa que recebe owner/repo como argumento e lista todas as issues abertas com label good first issue que ainda não estão atribuídas.
  dicas:
    - Use time.Since(issue.UpdatedAt).Hours()/24 para calcular dias
    - issue.Assignee == nil indica que está livre
    - "Adicione flag --label para tornar a label configurável"
    - "Trate paginação: GitHub retorna máximo 100 por página"
socializacao:
  discussao: Você abriria uma issue para reportar um bug mesmo sabendo que pode não ter tempo de corrigi-la? Como a comunidade trata isso?
  pontos:
    - Reportar bugs sem PR já é uma contribuição válida
    - Issues bem escritas valem ouro
    - "Comentar Estou trabalhando nisso antes de abrir um PR é etiqueta básica"
  diasDesafio: "Bônus – Semana de Open Source"
  sugestaoBlog: "good first issue: como ler, escolher e não desperdiçar o tempo de ninguém"
  hashtagsExtras: '#opensource #golang #github #goodfirstissue'
aplicacao:
  projeto: Monitor de issues que acompanha múltiplos repositórios e notifica novas good-first-issues.
  requisitos:
    - Lista configurável de repositórios
    - Detecta issues novas desde a última execução
    - Filtra issues sem assignee
    - Exibe resumo com repo, número, título, dias aberta
  criterios:
    - Persistência entre execuções funcionando
    - Sem duplicatas na listagem
    - Testes para a lógica de filtragem
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

## Como avaliar uma issue antes de trabalhar nela

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

O próprio GopherLab tem um conjunto de issues abertas com `good first issue` que foram criadas a partir de uma auditoria real do código. Observe os padrões:

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

Note o que cada issue bem escrita contém:

- **Título semântico** com prefixo `fix:` / `feat:` / `perf:` — igual à convenção de commits
- **Arquivo exato** e número de linha quando possível — sem ambiguidade sobre onde mexer
- **Passos para reproduzir** (nas de bug) — o contribuidor consegue confirmar antes de codar
- **Solução proposta** (nas de feat/perf) — reduz a ida-e-volta de "está no caminho certo?"
- **Labels consistentes** — `good first issue` + categoria (`accessibility`, `performance`, etc.)

> **Exercício:** Escolha uma das issues acima, faça o fork do GopherLab, implemente a correção e abra um PR seguindo o template em `.github/PULL_REQUEST_TEMPLATE.md`. É uma contribuição real num projeto real.
