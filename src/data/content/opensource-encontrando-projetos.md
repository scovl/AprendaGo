---
title: Encontrando projetos para contribuir
description: Como sair do zero e chegar numa good first issue concreta — sem ficar perdido no GitHub.
estimatedMinutes: 35
recursos:
  - https://www.codetriage.com/?language=Go
  - https://github.com/trending/go
  - https://goodfirstissue.dev/language/go
  - https://up-for-grabs.net/#/tags/go
  - https://github.com/explore
experimentacao:
  desafio: "Siga o Roteiro de 3 passos da lição e encontre 1 good-first-issue Go concreta que ainda não tem ninguém atribuído. Anote numa nota local: nome do projeto, link da issue, por que ela parece alcançável para você agora."
  dicas:
    - "Comece em goodfirstissue.dev/language/go — é um aggregator filtrado, mais fácil do que buscar no GitHub diretamente"
    - "Se a issue tem assignee, pule — não adianta competir com quem já está trabalhando nela"
    - "Verifique o último commit do projeto: se foi há mais de 6 meses, é sinal de projeto abandonado"
    - "Leia os últimos 5 comentários da issue antes de decidir — às vezes ela está bloqueada por um motivo que não aparece no título"
socializacao:
  discussao: "Qual é o critério mais importante ao escolher seu primeiro projeto: o quanto você usa ele no dia a dia, ou o quanto o processo de contribuição parece humano?"
  pontos:
    - Contribuir com algo que você usa tem vantagem óbvia — você já conhece o bug ou a limitação por dentro
    - Projetos com > 200 estrelas geralmente têm mais revisores disponíveis e processos documentados
    - Projetos menores aceitam contribuições mais facilmente — menos burocracia, mais aprendizado de processo
    - Um CONTRIBUTING.md bem escrito é sinal de que o projeto respeita o tempo dos contribuidores
  diasDesafio: "Bônus – Semana Open Source"
  sugestaoBlog: "Como encontrei meu primeiro projeto Go para contribuir (e o que aprendi no processo)"
  hashtagsExtras: '#golang #opensource #github #goodfirstissue'
aplicacao:
  projeto: "Escolha 1 projeto da sua lista e candidate-se formalmente a 1 good-first-issue: deixe um comentário na issue dizendo que você gostaria de trabalhar nela e pedindo confirmação ao mantenedor."
  requisitos:
    - "A issue precisa estar aberta, sem assignee e marcada como 'good first issue' ou 'help wanted'"
    - "Antes de comentar, leia o CONTRIBUTING.md do projeto inteiro — mencione no comentário que você leu"
    - "Seu comentário deve incluir: o que você entendeu sobre o problema e sua ideia inicial de abordagem"
    - "Se o mantenedor responder com perguntas ou orientações, responda dentro de 24h"
  criterios:
    - "O comentário demonstra que você leu e entendeu a issue — não é um simples 'posso trabalhar nisso?'"
    - "A abordagem proposta é realista para seu nível atual (não precisa ser perfeita, precisa ser honesta)"
    - "Linguagem respeitosa — inglês se o projeto for internacional"
---

Contribuir com open source começa com uma decisão que parece simples mas trava muita gente: **qual projeto escolher?** A resposta prática é: comece por algo que você já usa e que tenha `good first issue` aberta.

## Por que isso importa

Você poderia contribuir como hobbyist aleatório. Mas contribuir com projetos reais e ativos te dá algo muito mais valioso: **feedback técnico de pessoas que conhecem a codebase fundo**. É mentoria gratuita embutida no processo.

## Roteiro de 3 passos para sair do zero

### Passo 1 — Comece pelos aggregators, não pelo GitHub bruto

O GitHub tem milhões de repositórios. Buscar direto lá sem filtro é demorado e frustrante. Use estes atalhos:

| Site | O que faz |
|---|---|
| [goodfirstissue.dev/language/go](https://goodfirstissue.dev/language/go) | Lista issues marcadas como `good first issue` em projetos Go ativos |
| [codetriage.com/?language=Go](https://www.codetriage.com/?language=Go) | Inscreva-se e receba 1 issue por dia no e-mail |
| [up-for-grabs.net/#/tags/go](https://up-for-grabs.net/#/tags/go) | Issues curadas de projetos que **querem** contribuições externas |

Escolha um dos três e explore por 15 minutos antes de avançar.

### Passo 2 — Avalie o projeto antes da issue

Você encontrou um projeto interessante. Antes de ler qualquer issue, cheque:

1. **Último commit** — deve ser há menos de 3 meses. Se for mais antigo, o projeto pode estar morto.
2. **Issues abertas com `good first issue`** — se não tiver nenhuma, o projeto provavelmente não está preparado para iniciantes.
3. **CONTRIBUTING.md existente** — se não tiver, o processo de contribuição será nebuloso.
4. **PRs de pessoas externas recentemente merged** — confirma que mantenedores revisam o trabalho de quem é de fora.

No GitHub, a aba **Insights → Contributors** mostra exatamente isso.

### Passo 3 — Avalie a issue antes de se comprometer

Você achou uma `good first issue`. Agora leia com calma:

- **Tem assignee?** → Pule. Já tem alguém trabalhando.
- **Tem discussão ativa?** → Leia toda. Às vezes está bloqueada há meses por um motivo que não aparece no título.
- **Está clara o suficiente?** → Se você não entende o que precisa ser feito, não aceite ainda — comente pedindo mais detalhes.
- **O escopo parece realista?** → "Refatorar o sistema inteiro" não é good first issue, não importa o label.

## Projetos Go com histórico de boa recepção a iniciantes

| Projeto | Domínio | Por onde começar |
|---|---|---|
| [spf13/cobra](https://github.com/spf13/cobra) | CLI framework | Documentação, exemplos, pequenos bugs |
| [charmbracelet/bubbletea](https://github.com/charmbracelet/bubbletea) | TUI | Issues marcadas `good first issue` |
| [rs/zerolog](https://github.com/rs/zerolog) | Logging | Testes, edge cases |
| [go-chi/chi](https://github.com/go-chi/chi) | HTTP router | Documentação, exemplos de middleware |
| [spf13/viper](https://github.com/spf13/viper) | Configuração | Bug fixes com reprodução clara |

> Nenhum desses é obrigatório. O melhor projeto é aquele que você **já usa e entende para que serve**.

## Filtros úteis no GitHub Search (quando quiser explorar por conta)

```
language:Go good-first-issues:>3 pushed:>2024-01-01
```

- `good-first-issues:>3` — projeto com curadoria de issues para iniciantes
- `pushed:>2024-01-01` — commitado recentemente, não abandonado
- Adicione `stars:>200` para garantir comunidade estabelecida
- Adicione `forks:>30` para confirmar presença de contribuidores externos

---

Você encontrou um projeto e se candidatou a uma issue — esse é o primeiro contato real. A próxima lição ensina a entender o sistema de issues com mais profundidade: o que as labels significam, como avaliar se uma issue está pronta para ser trabalhada e como escrever uma você mesmo quando encontrar um bug. Isso é o que torna sua candidatura mais sólida.
