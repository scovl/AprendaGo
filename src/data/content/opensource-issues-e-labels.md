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
