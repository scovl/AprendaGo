---
title: Encontrando projetos para contribuir
description: CodeTriage, GitHub Trending, busca por estrelas e atividade de repositórios.
estimatedMinutes: 35
recursos:
  - https://www.codetriage.com/?language=Go
  - https://github.com/trending/go
  - https://github.com/search?q=language%3AGo+good-first-issues%3A%3E3&type=repositories
  - https://goodfirstissue.dev/language/go
  - https://up-for-grabs.net/#/tags/go
experimentacao:
  desafio: Use a API do GitHub para criar um buscador de repositórios Go com boas issues para iniciantes. Exiba nome, estrelas, forks e número de issues abertas. Filtre apenas repos com push nos últimos 3 meses.
  dicas:
    - "Query: good-first-issues:>3 language:Go pushed:>2024-01-01"
    - "Header Accept: application/vnd.github.v3+json para a API"
    - "Rate limit: 60 req/h sem autenticação; use GITHUB_TOKEN no header para 5000/h"
    - Campo open_issues_count inclui PRs abertos – considere isso
socializacao:
  discussao: "Qual é o critério mais importante ao escolher um projeto para contribuir? Popularidade, atividade, linguagem ou impacto?"
  pontos:
    - Projetos com > 100 estrelas geralmente têm mais revisores disponíveis
    - Atividade recente (last push < 30 dias) indica mantenedores engajados
    - Projetos menores aceitam contribuições mais facilmente
    - "Verifique o CONTRIBUTING.md: indica maturidade do processo"
  diasDesafio: "Bônus – Semana de Open Source"
  sugestaoBlog: Como encontrei meu primeiro projeto Go para contribuir (e o que aprendi)
  hashtagsExtras: '#golang #opensource #github #goodfirstissue'
aplicacao:
  projeto: CLI de descoberta de projetos Go open source com filtros configuráveis.
  requisitos:
    - Busca por linguagem Go via GitHub API
    - "Filtros: mínimo de estrelas, data de último push, issues abertas"
    - "Saída formatada com tabela (nome, estrelas, forks, issues)"
    - Flag --token para autenticação
  criterios:
    - Busca funcional e resultados relevantes
    - Filtros aplicados corretamente
    - Tratamento de erros de rede e rate limit
---

Contribuir com open source é uma das formas mais eficazes de evoluir como desenvolvedor Go. O desafio inicial é encontrar o **projeto certo** — não muito complexo para começar, mas ativo o suficiente para valer a pena.

## CodeTriage

[codetriage.com](https://www.codetriage.com) agrega issues de repositórios no GitHub e envia uma por dia por e-mail. Você se inscreve em projetos Go e recebe issues curadas no ritmo que preferir. Ideal para quem quer começar devagar.

## GitHub Trending

Acesse `github.com/trending/go` para ver os repositórios Go mais populares da semana/mês. Filtre por linguagem, período e veja quais projetos estão crescendo agora.

## Filtros úteis na busca do GitHub

```
language:Go stars:>500 pushed:>2024-01-01
```

- `stars:>500` — comunidade estabelecida
- `pushed:>2024-01-01` — repositório ativo recentemente
- `forks:>50` — muitos colaboradores
- `good-first-issues:>3` — curadoria de issues para iniciantes

## Projetos Go conhecidos para começar

| Projeto | Domínio | Complexidade |
|---|---|---|
| `cli/cli` (GitHub CLI) | CLI, HTTP | Média |
| `gohugoio/hugo` | Templating, I/O | Alta |
| `charmbracelet/bubbletea` | TUI, concorrência | Média |
| `spf13/cobra` | CLI framework | Baixa |
| `dominikh/go-tools` | AST, análise | Alta |
