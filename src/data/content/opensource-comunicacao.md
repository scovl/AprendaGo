---
title: Comunicação e etiqueta em projetos
description: Como interagir com mantenedores, responder reviews e construir reputação — mesmo sendo iniciante.
estimatedMinutes: 30
recursos:
  - https://docs.github.com/pt/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors
  - https://www.contributor-covenant.org/
  - https://go.dev/doc/contribute#review
  - https://opensource.guide/pt/how-to-contribute/
experimentacao:
  desafio: "Acesse github.com/charmbracelet/bubbletea/pulls e filtre por PRs fechados. Escolha um que tenha ao menos 3 comentários de review. Leia toda a conversa do início ao fim. Depois, abra um editor de texto e escreva como você responderia a cada comentário de revisão — usando o tom da tabela 'Como responder a um review'."
  dicas:
    - "No GitHub, clique em 'Pull requests' → 'Closed'. Ordene por 'Most commented' para achar os mais ricos"
    - "Leia um comentário e pause: o mantenedor está fazendo uma pergunta, sugerindo uma mudança ou bloqueando o PR?"
    - "Repare nas caixas azuis de 'Suggest changes' — o autor pode aceitar com 1 clique, sem nem escrever código"
    - "Veja como cada comentário foi marcado como 'Resolved' — o autor confirmou a ação antes de fechar"
socializacao:
  discussao: "Se um mantenedor fechar seu primeiro PR sem explicação, qual seria sua reação honesta?"
  pontos:
    - Projetos grandes (Go stdlib, Kubernetes) têm processos rigorosos — é necessário para manter qualidade em escala
    - Um mantenedor que explica a rejeição é mais valioso do que um que ignora — mesmo que doa mais na hora
    - Contribuições de documentação costumam ser aceitas mais rápido e ensinam o processo sem pressão de código perfeito
    - Reputação open source é construída devagar — uma interação respeitosa vale mais do que dez PRs apressados
  diasDesafio: "Bônus – Semana Open Source"
  sugestaoBlog: "O que aprendi sobre comunicação técnica contribuindo para projetos Go"
  hashtagsExtras: '#opensource #golang #developer #community'
aplicacao:
  projeto: "Deixe 1 comentário real e bem estruturado em uma issue aberta de qualquer projeto Go que você usa — seguindo o checklist 'Antes de comentar' da lição."
  requisitos:
    - "Escolha um projeto Go que você já usou ou conhece (ex: gin, cobra, bubbletea, zerolog)"
    - "Encontre uma issue aberta: vá em Issues → filtre por 'Open'. Leia todos os comentários existentes antes de escrever"
    - "Antes de publicar: seu comentário traz informação nova? Reprodução do bug? Uma pergunta específica? Se a resposta for não, não publique"
    - "Escreva o comentário seguindo o modelo da seção 'O que escrever (e o que nunca escrever)' e publique"
  criterios:
    - "O comentário acrescenta algo concreto: reprodução, contexto, pergunta específica ou sugestão fundamentada"
    - "Linguagem respeitosa — em inglês se o projeto for internacional, em português só se o projeto for BR"
    - "Não é '+1', 'bump', 'quando sai?' nem elogio sem conteúdo"
---

Open source é **50% código, 50% comunicação**. Mantenedores são voluntários com tempo limitado — a forma como você se comunica decide se seu PR é aceito, ignorado ou fechado na hora.

## Checklist antes de qualquer comentário

Antes de abrir uma issue ou deixar um comentário, responda honestamente:

- O problema já existe em issues fechadas? (Search antes de tudo)
- Você leu o `CONTRIBUTING.md` e o `CODE_OF_CONDUCT.md`?
- Você está usando a versão mais recente do projeto?
- Seu comentário **acrescenta** algo — ou só faz barulho?

> **Regra prática:** se você não enviaria isso como e-mail para um dev que respeita, não publique como comentário.

## Abrindo uma issue do zero

Boas issues seguem um padrão. A maioria dos projetos sérios tem templates em `.github/ISSUE_TEMPLATE/` — use o template, não invente formato. Se não houver template, use este modelo:

```markdown
## Descrição do problema
Ao chamar `json.Unmarshal` com um campo `*int` nulo, o programa entra em panic.

## Ambiente
- Go: 1.22.1
- OS: macOS 14.3
- Versão da lib: v2.1.0

## Como reproduzir
```go
// código mínimo que reproduz — quanto menor, melhor
```

## O que eu esperava
Retornar `error`, não panic.

## O que aconteceu
panic: runtime error: invalid memory address or nil pointer dereference
```

**O que nunca fazer em uma issue:**
- Abrir com "tá quebrando" sem nenhum detalhe
- Pedir ETA de features: "quando vai sair a versão X?"
- Misturar dois problemas distintos na mesma issue

## O que escrever (e o que nunca escrever)

Comentar em issues é uma habilidade. Estes são os tipos de comentário que mantenedores valorizam:

| ✅ Acrescenta | ❌ Não publica |
|---|---|
| "Consigo reproduzir na versão 2.3.1 com este exemplo mínimo: ..." | "+1" |
| "Resolvi contornando o problema com X — pode ajudar até sair o fix" | "quando isso vai ser corrigido?" |
| "A issue #42 parece relacionada — podem ser o mesmo root cause" | "por favor me respondam" |
| "Testei no Windows e não reproduz, apenas no Linux" | "alguém ainda está trabalhando nisso?" |

## Como responder a um review

Você abriu um PR e chegou o review. A ansiedade é normal — veja o que responder em cada situação:

| Situação | Como responder |
|---|---|
| O mantenedor está certo | "Faz sentido! Corrigido no commit `abc1234`." |
| Você não entendeu | "Não tenho certeza de como aplicar isso aqui — pode dar um exemplo?" |
| Você discorda, com embasamento | "Considerei essa abordagem, mas escolhi X por causa de Y. Aberto a mudar se você preferir." |
| Você tem dados que contradizem | Apresente benchmark, referência ou código. Nunca emoção. |

**Nunca faça force push** depois que alguém comentou — você apaga o histórico dos comentários. Faça um novo commit e combine squash depois, com o OK do mantenedor. Marque cada thread como **Resolved** após endereçar — o mantenedor vê o progresso sem ter que reler tudo.

## Construindo reputação sem pressa

A maioria dos PRs rejeitados vêm de iniciantes que pulam etapas. A ordem que funciona:

1. **Corrija documentação, typos e exemplos** — ninguém rejeita isso, e você aprende o fluxo sem pressão
2. **Pequenos bug fixes com testes** — mostra que você sabe escrever Go que funciona
3. **Features discutidas numa issue antes de codar** — nunca abra PR de feature sem consenso prévio
4. **Features maiores e refatorações** — só depois de ter histórico no projeto

> Você percorreu o arco completo deste módulo: encontrou um projeto → avaliou e escreveu issues → abriu um PR com commits semânticos → aprendeu a responder reviews sem perder o fio da comunicação. Cada uma dessas habilidades se reforça com prática. A partir daqui, o processo vira hábito — e cada contribuição fica mais fácil do que a anterior.
