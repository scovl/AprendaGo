---
title: Sobre a Linguagem e seu Histórico
description: A história do Go, criadores e filosofia da linguagem.
estimatedMinutes: 30
recursos:
  - https://go.dev/doc/
  - https://go.dev/blog/go-brand
  - https://www.youtube.com/watch?v=rKnDgT73v8s
experimentacao:
  desafio: Pesquise e liste 5 empresas que utilizam Go em produção e qual problema cada uma resolve com a linguagem.
  dicas:
    - Procure no site oficial go.dev/solutions
    - Pense em empresas como Google, Uber, Twitch, Docker, Kubernetes
    - Anote qual tipo de sistema cada empresa desenvolve com Go
socializacao:
  discussao: Por que Go se tornou tão popular para microsserviços e sistemas distribuídos?
  pontos:
    - Compare com sua experiência em outras linguagens
    - Discuta as vantagens da compilação estática e binário único
    - Pense no modelo de concorrência com goroutines vs threads OS
  diasDesafio: Dias 1–7
  sugestaoBlog: "Por que escolhi Go: história, motivações e meu setup inicial"
  hashtagsExtras: '#golang #beginner'
aplicacao:
  projeto: Crie um documento resumindo a história do Go e suas principais características.
  requisitos:
    - "Incluir linha do tempo: 2007 (criação), 2009 (anúncio), 2012 (v1.0), 2018 (módulos), 2022 (generics)"
    - Listar pelo menos 3 características únicas do Go
    - Mencionar casos de uso reais em produção
  criterios:
    - Clareza na escrita
    - Informações corretas e atualizadas
    - Organização lógica
---

Go (ou Golang) foi iniciado em setembro de 2007 por **Robert Griesemer**, **Rob Pike** e **Ken Thompson** enquanto aguardavam uma compilação C++ de 45 minutos no Google. O design começou em um documento interno de Pike e Thompson. A linguagem foi anunciada publicamente em novembro de 2009, com a versão 1.0 lançada em março de 2012. A promessa da v1.0 é mantida até hoje: **compatibilidade retroativa total** — qualquer código escrito para Go 1.x continua compilando e funcionando nas versões futuras.

## Marcos históricos

- **Go 1.5** (2015): compilador e runtime reescritos em Go (antes era C)
- **Go 1.11** (2018): Go Modules — resolveu o gerenciamento de dependências
- **Go 1.13** (2019): literais numéricos modernos (`0b`, `0o`, `_`)
- **Go 1.18** (2022): Generics — a feature mais requisitada em anos
- **Go 1.21** (2023): funções embutidas `min`/`max`, pacotes `slices`/`maps`/`cmp`, e `log/slog` para logging estruturado

## Os criadores

**Ken Thompson** criou Unix e C (Turing Award 1983) e co-criou UTF-8. **Rob Pike** trabalhou com Thompson em Unix e Plan 9, e criou o pacote `utf8`. Ambos são responsáveis diretos pelo fato de Go ser nativamente UTF-8.

Go é uma das poucas linguagens cujo compilador é escrito na própria linguagem depois de poucos anos de existência, demonstrando auto-suficiência.
