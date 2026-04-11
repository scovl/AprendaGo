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
