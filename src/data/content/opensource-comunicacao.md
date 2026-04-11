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
