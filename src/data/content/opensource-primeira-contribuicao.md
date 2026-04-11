Fazer uma contribuição não é apenas escrever código — é um processo de **comunicação**. Projetos com centenas de contribuidores precisam de padrões para funcionar.

## O ciclo de uma contribuição

```
1. Fork  →  2. Clone  →  3. Branch  →  4. Código  →  5. Tests  →  6. PR
```

### 1. Fork e setup local

```bash
git clone https://github.com/SEU_USUARIO/PROJETO.git
cd PROJETO
git remote add upstream https://github.com/DONO/PROJETO.git
git fetch upstream
```

### 2. Branch descritivo

```bash
git checkout -b fix/json-decoder-nil-check
# Padrões comuns: fix/, feat/, docs/, refactor/, test/
```

### 3. Commits semânticos

```
feat: add timeout to HTTP client
fix: handle nil pointer in JSON decoder
docs: update contributing guide for Windows
test: add unit tests for rate limiter
```

### 4. Sync com upstream antes do PR

```bash
git fetch upstream
git rebase upstream/main
```

## Checklist antes de abrir o PR

- [ ] Leu o `CONTRIBUTING.md` do projeto?
- [ ] Rodou `go test ./...`?
- [ ] Rodou `go vet ./...` e `gofmt`?
- [ ] A descrição do PR explica *por que*, não só *o que*?
- [ ] Está linkado à issue com `Fixes #123`?
