# SDD-02 — Práticas de Segurança para AprendaGo

> Documento de design de segurança com vulnerabilidades identificadas, severidade e plano de implementação.

---

## 1. Visão geral

O AprendaGo executa código Go arbitrário enviado pelo usuário dentro de containers Docker. Isso coloca a aplicação na categoria **Remote Code Execution by design** — qualquer falha na camada de isolamento expõe o host. Este documento cataloga as práticas de segurança pendentes, priorizadas por severidade.

---

## 2. Inventário de superfície de ataque

| Componente | Exposição | Protege |
|------------|-----------|---------|
| nginx (porta 3000) | Internet | Frontend estático + proxy reverso para `/api/` |
| runner Go (porta 8081 interna) | Rede Docker | Executa código do usuário em `/run` e `/lab` |
| iframe KiwiIRC | Browser do usuário | Conexão IRC via WebSocket (domínio externo) |
| localStorage | Browser do usuário | Progresso do aluno |

---

## 3. Vulnerabilidades — Sandbox de Execução

### 3.1 CRÍTICA — Imports irrestrito da stdlib Go

**Problema**: O runner compila e executa qualquer código Go sem analisar os imports. O usuário pode fazer:

```go
import "os/exec"       // executa comandos no container
import "net/http"      // acessa rede, exfiltra dados
import "os"            // lê /etc/passwd, /proc/*, env vars
import "syscall"       // chamadas de sistema diretas
import "unsafe"        // acesso direto à memória
import "plugin"        // carrega .so em runtime
```

**Impacto**: Execução de comandos como root dentro do container. Leitura de qualquer arquivo. Scan de rede interna. Potencial escape do container via exploit de kernel.

**Correção**: Análise AST pré-compilação que rejeita imports perigosos.

```go
var blockedImports = map[string]bool{
    "os/exec": true, "syscall": true, "unsafe": true,
    "plugin": true, "runtime/cgo": true, "net": true,
    "net/http": true, "net/rpc": true, "net/smtp": true,
    "debug/elf": true, "debug/macho": true, "debug/pe": true,
    "crypto/x509": true, // previne TLS client para exfiltração
}

func validateImports(code string) error {
    fset := token.NewFileSet()
    f, err := parser.ParseFile(fset, "", code, parser.ImportsOnly)
    if err != nil {
        return nil // erro de parse será pego pelo compilador
    }
    for _, imp := range f.Imports {
        path := strings.Trim(imp.Path.Value, `"`)
        if blockedImports[path] {
            return fmt.Errorf("import %q não permitido no sandbox", path)
        }
        // bloquear qualquer sub-pacote de net/
        if strings.HasPrefix(path, "net/") {
            return fmt.Errorf("import %q não permitido no sandbox", path)
        }
    }
    return nil
}
```

Para `/lab` (multi-arquivo), validar cada arquivo `.go` submetido.

---

### 3.2 ALTA — Sobreescrita de go.mod no /lab

**Problema**: `filepath.Base("go.mod")` retorna `"go.mod"` — passa na validação e sobreescreve o `go.mod` gerado pelo handler. O atacante pode injetar diretivas `replace` apontando para caminhos arbitrários.

**Correção**:

```go
name := filepath.Base(f.Name)
if name == "go.mod" || name == "go.sum" {
    json.NewEncoder(w).Encode(runResponse{Errors: "não é permitido enviar go.mod ou go.sum"})
    return
}
```

---

### 3.3 MÉDIA — Filenames sem restrição de extensão

**Problema**: `/lab` aceita qualquer extensão de arquivo. Usuário pode escrever `.sh`, `.py`, binários.

**Correção**: Aceitar apenas `*.go`.

```go
if !strings.HasSuffix(name, ".go") {
    json.NewEncoder(w).Encode(runResponse{Errors: "apenas arquivos .go são aceitos"})
    return
}
```

---

### 3.4 MÉDIA — Visibilidade entre sandboxes

**Problema**: Todos os diretórios temporários ficam em `/tmp`. Um programa malicioso pode listar `gorun-*` e `golab-*` e ler código de outros usuários.

**Correção**: Definir `TMPDIR` para o diretório da execução:

```go
cmd.Env = append(sandboxEnv(), "TMPDIR="+dir)
```

---

## 4. Vulnerabilidades — Container Docker

### 4.1 CRÍTICA — Container roda como root

**Problema**: `runner/Dockerfile` não define `USER`. Código arbitrário executa como UID 0.

**Correção** em `runner/Dockerfile`:

```dockerfile
RUN adduser -D -u 1001 runner
USER runner
```

---

### 4.2 ALTA — Sem restrição de capabilities e privileges

**Problema**: Container retém capabilities padrão (NET_RAW, SYS_CHROOT, etc). `no-new-privileges` não está ativo.

**Correção** em `docker-compose.yml`:

```yaml
runner:
  security_opt:
    - no-new-privileges:true
  cap_drop:
    - ALL
```

---

### 4.3 ALTA — Filesystem gravável + sem limite de PIDs

**Problema**: Código pode escrever em qualquer local do container e criar fork bombs ilimitados.

**Correção** em `docker-compose.yml`:

```yaml
runner:
  read_only: true
  tmpfs:
    - /tmp:size=100m,noexec,nosuid
  pids_limit: 64
```

---

### 4.4 MÉDIA — Go 1.22 (EOL)

**Problema**: Go 1.22 está fora do ciclo de suporte. Vulnerabilidades conhecidas não recebem patches.

**Correção**: Atualizar para `golang:1.23-alpine` (ou mais recente) em `runner/Dockerfile` e em todas as referências a `go 1.22` no `go.mod` e no `goModContent`.

---

## 5. Vulnerabilidades — Rede

### 5.1 CRÍTICA — Runner com acesso irrestrito à rede

**Problema**: Código Go pode abrir conexões TCP/UDP para qualquer destino, incluindo a rede interna do Docker, o host, e a internet.

**Correção**: Rede interna isolada no Docker Compose.

```yaml
networks:
  frontend:
  backend:
    internal: true  # sem acesso à internet

services:
  aprenda-go:
    networks:
      - frontend
      - backend
  runner:
    networks:
      - backend  # sem acesso à internet
```

Complementar com regra de iptables no host se necessário:

```bash
# Bloquear egress do runner exceto resposta DNS e tráfego interno
iptables -I DOCKER-USER -i br-<backend_id> -j DROP
iptables -I DOCKER-USER -i br-<backend_id> -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
```

---

## 6. Vulnerabilidades — HTTP e Headers

### 6.1 ALTA — Sem Content-Security-Policy

**Problema**: Sem CSP, scripts inline, resources externas e clickjacking não são controlados pelo browser.

**Correção** em `nginx.conf`:

```nginx
add_header Content-Security-Policy
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-src https://kiwiirc.com; connect-src 'self'; img-src 'self' data:; font-src 'self';"
  always;
```

---

### 6.2 ALTA — CORS `Access-Control-Allow-Origin: *`

**Problema**: Qualquer site pode enviar código para o runner via browser do visitante. Abuso como compute engine gratuito.

**Correção**: Remover CORS do runner (nginx same-origin não precisa). Se necessário, restringir ao domínio real:

```go
origin := r.Header.Get("Origin")
if origin == "https://aprendago.example.com" || origin == "http://localhost:3000" {
    w.Header().Set("Access-Control-Allow-Origin", origin)
}
```

---

### 6.3 MÉDIA — Headers de segurança ausentes no nginx

**Correção**:

```nginx
server_tokens off;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
# HSTS somente quando servindo via HTTPS:
# add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

## 7. Vulnerabilidades — Rate Limiting e DoS

### 7.1 ALTA — Sem rate limit por IP

**Problema**: O semáforo de 4 slots limita concorrência mas não frequência. Atacante pode saturar a fila com requisições sequenciais.

**Correção** em `nginx.conf`:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;
limit_conn_zone $binary_remote_addr zone=apiconn:10m;

location /api/ {
    limit_req zone=api burst=10 nodelay;
    limit_conn apiconn 3;
    proxy_pass http://runner:8081/;
    # ... demais configs
}
```

---

### 7.2 MÉDIA — Compilação como vetor de DoS

**Problema**: Código Go com generics profundamente aninhados ou expressões constantes exponenciais pode consumir toda a CPU durante a compilação antes que o timeout de 10s dispare.

**Mitigação**: O `mem_limit: 512m` e `cpus: 1.0` no compose já contêm o impacto. Adicionar `pids_limit: 64` evita fork bombs durante compilação.

---

## 8. Vulnerabilidades — Frontend

### 8.1 BAIXA — iframe sandbox com allow-scripts + allow-same-origin

**Problema**: Em `IrcView.tsx`, a combinação `allow-scripts allow-same-origin` permite teoricamente que a página framed remova seu próprio sandbox. Aceitável porque `kiwiirc.com` é um serviço confiável e o IRC requer essa combinação para funcionar.

**Mitigação**: Já coberto pelo CSP `frame-src https://kiwiirc.com`. Monitorar se o domínio é comprometido.

---

### 8.2 INFO — Zero uso de dangerouslySetInnerHTML

A aplicação não utiliza `dangerouslySetInnerHTML` em nenhum componente. Todos os outputs do runner são exibidos via text nodes do React (auto-escaped). Não há vetores de XSS via DOM injection.

---

## 9. Vulnerabilidades — Build e Supply Chain

### 9.1 MÉDIA — `npm install` ao invés de `npm ci`

**Problema**: Builds não determinísticos — versões de dependência podem variar entre builds.

**Correção** no `Dockerfile`:

```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
```

Garantir que `package-lock.json` esteja comitado.

---

### 9.2 BAIXA — Tags Docker mutáveis

**Problema**: `golang:1.22-alpine`, `node:20-alpine`, `nginx:alpine` podem mudar sem aviso.

**Correção**: Pinnar por digest nos Dockerfiles:

```dockerfile
FROM golang:1.23-alpine@sha256:<digest> AS builder
```

---

## 10. Plano de implementação priorizado

| # | Ação | Severidade | Esforço | Arquivos afetados |
|---|------|------------|---------|-------------------|
| 1 | Validação AST de imports bloqueados | CRÍTICA | Médio | `runner/main.go` |
| 2 | `USER runner` no Dockerfile | CRÍTICA | Baixo | `runner/Dockerfile` |
| 3 | Rede interna isolada (backend) | CRÍTICA | Baixo | `docker-compose.yml` |
| 4 | Rejeitar `go.mod`/`go.sum` no `/lab` | ALTA | Baixo | `runner/main.go` |
| 5 | `cap_drop: ALL` + `no-new-privileges` + `read_only` + `pids_limit` | ALTA | Baixo | `docker-compose.yml` |
| 6 | Rate limit no nginx | ALTA | Baixo | `nginx.conf` |
| 7 | Corrigir CORS (remover `*`) | ALTA | Baixo | `runner/main.go` |
| 8 | Security headers no nginx (CSP, X-Frame-Options, etc.) | ALTA | Baixo | `nginx.conf` |
| 9 | Restringir extensão a `.go` no `/lab` | MÉDIA | Baixo | `runner/main.go` |
| 10 | Atualizar Go para 1.23+ | MÉDIA | Baixo | `runner/Dockerfile`, `runner/go.mod`, `runner/main.go` |
| 11 | Trocar `npm install` por `npm ci` | MÉDIA | Baixo | `Dockerfile` |
| 12 | Pinnar imagens Docker por digest | BAIXA | Baixo | `Dockerfile`, `runner/Dockerfile` |

---

## 11. O que já está bem feito

| Prática | Onde |
|---------|------|
| Semáforo de concorrência (4 slots) | `runner/main.go` |
| Timeout de 10s por execução | `runner/main.go` |
| Body size limit (64KB) via `MaxBytesReader` | `runner/main.go` |
| Output truncado (64KB) | `runner/main.go` |
| `GOPROXY=off` impede fetching remoto | `runner/main.go` |
| `filepath.Base()` previne path traversal | `runner/main.go` |
| Temp dir removido com `defer os.RemoveAll` | `runner/main.go` |
| Zero `dangerouslySetInnerHTML` no frontend | `src/components/*` |
| `rel="noopener noreferrer"` em links externos | `src/components/*` |
| `.gitignore` exclui `.env*` | `.gitignore` |
| Runner sem dependências externas Go | `runner/go.mod` |
| `client_max_body_size 64k` no nginx | `nginx.conf` |
| Multi-stage Docker build com gate de testes | `runner/Dockerfile` |
