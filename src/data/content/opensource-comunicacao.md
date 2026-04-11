---
title: Comunicação e etiqueta em projetos
description: Como interagir com mantenedores, responder reviews e construir reputação.
estimatedMinutes: 25
recursos:
  - https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors
  - https://www.contributor-covenant.org/
  - https://go.dev/doc/contribute#review
  - https://opensource.guide/how-to-contribute/
experimentacao:
  desafio: Escreva um gerador de template de issue que lê o arquivo ISSUE_TEMPLATE do repositório (se existir) ou usa um template padrão, e preenche automaticamente versão do Go, OS e GOARCH do ambiente atual.
  dicas:
    - exec.Command("go", "version").Output() retorna a versão completa
    - runtime.GOOS e runtime.GOARCH têm o sistema operacional e arquitetura
    - text/template aceita qualquer struct como dado
    - Busque .github/ISSUE_TEMPLATE/ no diretório atual
socializacao:
  discussao: Você já recusaria contribuir com um projeto por achar o processo de review muito rígido?
  pontos:
    - Projetos grandes (K8s, Go stdlib) têm processos rígidos – é necessário
    - Um mantenedor que rejeita PRs com explicação clara é mais valioso que um que ignora
    - Contribuições de documentação são frequentemente mais impactantes que código
    - Reputação open source é um ativo de carreira real
  diasDesafio: "Bônus – Semana de Open Source"
  sugestaoBlog: O que aprendi sobre comunicação técnica contribuindo para projetos Go
  hashtagsExtras: '#opensource #golang #developer #community'
aplicacao:
  projeto: "Gerador de templates para contribuição: issue, PR e CONTRIBUTING.md personalizados."
  requisitos:
    - Subcomando issue gera template com ambiente preenchido
    - Subcomando pr gera template de Pull Request com checklist
    - Subcomando contributing gera CONTRIBUTING.md básico
    - Flags para nome do projeto e linguagem
  criterios:
    - Três subcomandos funcionais
    - Templates com variáveis corretamente substituídas
    - Saída para stdout ou arquivo via flag --output
---

Open source é **50% código, 50% comunicação**. Mantenedores voluntários têm tempo limitado — respeitar isso é a diferença entre um PR aceito e ignorado.

## Antes de abrir uma issue

1. Pesquise issues fechadas — o problema pode já ter sido resolvido
2. Leia o `CONTRIBUTING.md` e o `CODE_OF_CONDUCT.md`
3. Reproduza o bug com a versão mais recente do projeto
4. Inclua: versão Go, OS, steps to reproduce, output esperado vs obtido

## Template de issue bem escrita

```markdown
## Descrição
Ao decodificar JSON com campo nulo, o decoder entra em panic.

## Versão
Go 1.22.1 / macOS 14.3 / lib v2.1.0

## Como reproduzir
// código mínimo que reproduz o problema

## Comportamento esperado
Retornar error, não panic.

## Comportamento atual
panic: runtime error: invalid memory address
```

## Respondendo code review

- "Faz sentido, vou corrigir" — não discuta cada comentário como batalha
- "Não entendi — pode dar um exemplo?" — pedir clareza é profissional
- Nunca force push após alguém ter comentado — use novo commit e squash depois
- Marque cada comentário como "resolved" após endereçar

## Construindo reputação gradualmente

1. **Primeiro:** corrija documentação, typos, exemplos de código
2. **Depois:** pequenos bug fixes com testes
3. **Então:** features pequenas discutidas antes na issue
4. **Por fim:** features maiores, refactoring com consensus dos mantenedores
