import { Module } from '../../types';

export const opensourceModule: Module = {
  id: 'opensource',
  title: 'Colaborando com Open Source',
  description: 'Encontre projetos Go, faça sua primeira contribuição e construa reputação na comunidade.',
  icon: 'GitMerge',
  color: '#27AE60',
  lessons: [
    {
      id: 'opensource-encontrando-projetos',
      title: 'Encontrando projetos para contribuir',
      description: 'CodeTriage, GitHub Trending, busca por estrelas e atividade de repositórios.',
      estimatedMinutes: 35,
      vesa: {
        visaoGeral: {
          explicacao: `Contribuir com open source é uma das formas mais eficazes de evoluir como desenvolvedor Go. O desafio inicial é **encontrar o projeto certo** — não muito complexo para começar, mas ativo o suficiente para valer a pena.

**CodeTriage (codetriage.com)**
Agrega issues de repositórios no GitHub e envia uma por dia por e-mail. Você se inscreve em projetos Go e recebe issues curadas no ritmo que preferir. Ideal para quem quer começar devagar.

**GitHub Trending**  
Acesse \`github.com/trending/go\` para ver os repositórios Go mais populares da semana/mês. Filtre por linguagem, período e veja quais projetos estão crescendo agora.

**Filtros úteis na busca do GitHub**
Use a busca avançada para encontrar projetos com o perfil certo:
\`\`\`
language:Go stars:>500 pushed:>2024-01-01
\`\`\`
- \`stars:>500\` — comunidade estabelecida  
- \`pushed:>2024-01-01\` — repositório ativo recentemente  
- \`forks:>50\` — muitos colaboradores  
- \`good-first-issues:>3\` — curadoria de issues para iniciantes`,
          codeExample: `// Exemplo: usando a API do GitHub para listar repositórios Go populares
// (útil para criar sua própria ferramenta de busca)

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

type SearchResult struct {
	TotalCount int    \`json:"total_count"\`
	Items      []Repo \`json:"items"\`
}

type Repo struct {
	FullName        string \`json:"full_name"\`
	Description     string \`json:"description"\`
	StargazersCount int    \`json:"stargazers_count"\`
	ForksCount      int    \`json:"forks_count"\`
	OpenIssuesCount int    \`json:"open_issues_count"\`
	HTMLURL         string \`json:"html_url"\`
}

func searchGoRepos(query string) ([]Repo, error) {
	base := "https://api.github.com/search/repositories"
	params := url.Values{}
	params.Set("q", query+" language:Go")
	params.Set("sort", "stars")
	params.Set("order", "desc")
	params.Set("per_page", "5")

	resp, err := http.Get(base + "?" + params.Encode())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result SearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result.Items, nil
}

func main() {
	repos, err := searchGoRepos("good-first-issues:>5 stars:>200")
	if err != nil {
		fmt.Println("erro:", err)
		return
	}
	for _, r := range repos {
		fmt.Printf("%-40s ⭐ %d  🍴 %d  🐛 %d\\n",
			r.FullName, r.StargazersCount, r.ForksCount, r.OpenIssuesCount)
	}
}`,
          recursos: [
            'https://www.codetriage.com/?language=Go',
            'https://github.com/trending/go',
            'https://github.com/search?q=language%3AGo+good-first-issues%3A%3E3&type=repositories',
            'https://goodfirstissue.dev/language/go',
            'https://up-for-grabs.net/#/tags/go',
          ],
        },
        experimentacao: {
          desafio: 'Use a API do GitHub para criar um buscador de repositórios Go com boas issues para iniciantes. Exiba nome, estrelas, forks e número de issues abertas. Filtre apenas repos com push nos últimos 3 meses.',
          dicas: [
            'Query: "good-first-issues:>3 language:Go pushed:>2024-01-01"',
            'Header "Accept: application/vnd.github.v3+json" para a API',
            'Rate limit: 60 req/h sem autenticação; use GITHUB_TOKEN no header para 5000/h',
            'Campo "open_issues_count" inclui PRs abertos — considere isso',
          ],
        },
        socializacao: {
          discussao: 'Qual é o critério mais importante ao escolher um projeto para contribuir? Popularidade, atividade, linguagem ou impacto?',
          pontos: [
            'Projetos com > 100 estrelas geralmente têm mais revisores disponíveis',
            'Atividade recente (último push < 30 dias) indica mantenedores engajados',
            'Projetos menores aceitam contribuições mais facilmente que os gigantes',
            'Verifique o CONTRIBUTING.md: indica maturidade do processo de contribuição',
          ],
          diasDesafio: 'Bônus — Semana de Open Source',
          sugestaoBlog: 'Como encontrei meu primeiro projeto Go para contribuir (e o que aprendi)',
          hashtagsExtras: '#golang #opensource #github #goodfirstissue',
        },
        aplicacao: {
          projeto: 'CLI de descoberta de projetos Go open source com filtros configuráveis.',
          requisitos: [
            'Busca por linguagem Go via GitHub API',
            'Filtros: mínimo de estrelas, data de último push, issues abertas',
            'Saída formatada com tabela (nome, ⭐, 🍴, issues)',
            'Flag --token para autenticação e rate limit maior',
          ],
          criterios: [
            'Busca funcional e resultados relevantes',
            'Filtros aplicados corretamente',
            'Tratamento de erros de rede e rate limit',
          ],
          labFiles: [
            {
              name: 'main.go',
              body: `package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	minStars := flag.Int("stars", 100, "mínimo de estrelas")
	token := flag.String("token", "", "GitHub personal access token")
	flag.Parse()

	client := NewGitHubClient(*token)
	repos, err := client.SearchGoRepos(*minStars)
	if err != nil {
		fmt.Fprintf(os.Stderr, "erro: %v\\n", err)
		os.Exit(1)
	}

	fmt.Printf("%-45s %6s  %5s  %6s\\n", "REPOSITÓRIO", "⭐", "🍴", "ISSUES")
	fmt.Println(repeated("-", 70))
	for _, r := range repos {
		fmt.Printf("%-45s %6d  %5d  %6d\\n",
			r.FullName, r.StargazersCount, r.ForksCount, r.OpenIssuesCount)
	}
}

func repeated(s string, n int) string {
	result := ""
	for i := 0; i < n; i++ {
		result += s
	}
	return result
}`,
            },
            {
              name: 'github.go',
              body: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"
)

type GitHubClient struct {
	token  string
	client *http.Client
}

type SearchResult struct {
	TotalCount int    \`json:"total_count"\`
	Items      []Repo \`json:"items"\`
}

type Repo struct {
	FullName        string    \`json:"full_name"\`
	Description     string    \`json:"description"\`
	StargazersCount int       \`json:"stargazers_count"\`
	ForksCount      int       \`json:"forks_count"\`
	OpenIssuesCount int       \`json:"open_issues_count"\`
	PushedAt        time.Time \`json:"pushed_at"\`
	HTMLURL         string    \`json:"html_url"\`
}

func NewGitHubClient(token string) *GitHubClient {
	return &GitHubClient{
		token:  token,
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

func (c *GitHubClient) SearchGoRepos(minStars int) ([]Repo, error) {
	cutoff := time.Now().AddDate(0, -3, 0).Format("2006-01-02")
	query := fmt.Sprintf("language:Go good-first-issues:>3 stars:>%d pushed:>%s", minStars, cutoff)

	params := url.Values{}
	params.Set("q", query)
	params.Set("sort", "stars")
	params.Set("order", "desc")
	params.Set("per_page", "15")

	req, err := http.NewRequest(http.MethodGet,
		"https://api.github.com/search/repositories?"+params.Encode(), nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	if c.token != "" {
		req.Header.Set("Authorization", "Bearer "+c.token)
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusForbidden {
		return nil, fmt.Errorf("rate limit atingido — use --token para aumentar o limite")
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API respondeu %d", resp.StatusCode)
	}

	var result SearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result.Items, nil
}`,
            },
            {
              name: 'github_test.go',
              body: `package main

import (
	"testing"
)

func TestNewGitHubClient(t *testing.T) {
	c := NewGitHubClient("mytoken")
	if c == nil {
		t.Fatal("NewGitHubClient retornou nil")
	}
	if c.token != "mytoken" {
		t.Errorf("token incorreto: got %q, want %q", c.token, "mytoken")
	}
	if c.client == nil {
		t.Error("http.Client não inicializado")
	}
}

func TestRepeated(t *testing.T) {
	got := repeated("-", 5)
	if got != "-----" {
		t.Errorf("repeated('-', 5) = %q, want '-----'", got)
	}
	if repeated("x", 0) != "" {
		t.Error("repeated com n=0 deve retornar string vazia")
	}
}`,
            },
          ],
        },
      },
    },
    {
      id: 'opensource-issues-e-labels',
      title: 'Issues, labels e good first issue',
      description: 'Entenda o sistema de labels, como ler issues e como interpretar good-first-issue.',
      estimatedMinutes: 30,
      vesa: {
        visaoGeral: {
          explicacao: `O sistema de labels do GitHub é o mapa de contribuição de um projeto. Saber ler as labels certas economiza horas de busca.

**Labels essenciais para contribuidores novos**

| Label | Significado |
|-------|-------------|
| \`good first issue\` | Issue explicitamente marcada pelos mantenedores como acessível |
| \`help wanted\` | Mantenedores precisam de ajuda, mas pode exigir contexto |
| \`bug\` | Comportamento incorreto — geralmente bem descrito |
| \`documentation\` | Melhorias em docs — ótima entrada sem precisar de domínio do código |
| \`beginner friendly\` | Alias de good first issue em muitos projetos |

**Como avaliar uma issue antes de trabalhar nela**
1. **Está atribuída?** Se sim, alguém já está trabalhando — pergunte antes de duplicar esforço
2. **Tem contexto suficiente?** Steps to reproduce, versão Go, OS — issues mal descritas rendem PRs errados
3. **Qual a última atividade?** Issues sem resposta há > 6 meses podem estar abandonadas
4. **Existe uma PR aberta?** Verifique "Linked pull requests" — não refaça o que já está em revisão

**Busca avançada de issues no GitHub**
\`\`\`
is:open is:issue label:"good first issue" language:Go no:assignee
\`\`\`
- \`no:assignee\` — sem responsável, disponível para você
- \`is:open\` — ainda não resolvida
- \`updated:>2024-01-01\` — ativa recentemente`,
          codeExample: `// Ferramenta para listar "good first issues" de um repositório
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Issue struct {
	Number    int       \`json:"number"\`
	Title     string    \`json:"title"\`
	HTMLURL   string    \`json:"html_url"\`
	State     string    \`json:"state"\`
	Assignee  *struct{} \`json:"assignee"\`
	Comments  int       \`json:"comments"\`
	CreatedAt time.Time \`json:"created_at"\`
	UpdatedAt time.Time \`json:"updated_at"\`
	Labels    []Label   \`json:"labels"\`
}

type Label struct {
	Name  string \`json:"name"\`
	Color string \`json:"color"\`
}

func fetchGoodFirstIssues(owner, repo string) ([]Issue, error) {
	url := fmt.Sprintf(
		"https://api.github.com/repos/%s/%s/issues?labels=good+first+issue&state=open&per_page=10",
		owner, repo,
	)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var issues []Issue
	return issues, json.NewDecoder(resp.Body).Decode(&issues)
}

func main() {
	// Exemplos de projetos Go com boas issues
	projects := [][2]string{
		{"golang", "go"},
		{"cli", "cli"},
		{"grafana", "grafana"},
	}

	for _, p := range projects {
		issues, err := fetchGoodFirstIssues(p[0], p[1])
		if err != nil {
			continue
		}
		fmt.Printf("\\n== %s/%s ==\\n", p[0], p[1])
		for _, issue := range issues {
			assigned := "livre"
			if issue.Assignee != nil {
				assigned = "atribuída"
			}
			fmt.Printf("  #%d [%s] %s\\n", issue.Number, assigned, issue.Title)
		}
	}
}`,
          recursos: [
            'https://github.com/search?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+language%3AGo+no%3Aassignee&type=issues',
            'https://goodfirstissue.dev/language/go',
            'https://www.codetriage.com/?language=Go',
            'https://docs.github.com/en/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests',
          ],
        },
        experimentacao: {
          desafio: 'Escreva um programa que recebe `owner/repo` como argumento e lista todas as issues abertas com label "good first issue" que ainda não estão atribuídas. Para cada issue mostre: número, título, dias sem atualização e link.',
          dicas: [
            'Use time.Since(issue.UpdatedAt).Hours()/24 para calcular dias',
            'issue.Assignee == nil indica que está livre',
            'Adicione flag --label para tornar a label configurável',
            'Trate paginação: GitHub retorna máximo 100 por página',
          ],
        },
        socializacao: {
          discussao: 'Você abriria uma issue para reportar um bug mesmo sabendo que pode não ter tempo de corrigi-la? Como a comunidade trata isso?',
          pontos: [
            'Reportar bugs sem PR já é uma contribuição válida',
            'Issues bem escritas (steps to reproduce + versão + OS) valem ouro',
            'Mantenedores agradecem mais uma issue clara do que um PR mal explicado',
            'Comentar "Estou trabalhando nisso" antes de abrir um PR é etiqueta básica',
          ],
          diasDesafio: 'Bônus — Semana de Open Source',
          sugestaoBlog: 'good first issue: como ler, escolher e não desperdiçar o tempo de ninguém',
          hashtagsExtras: '#opensource #golang #github #goodfirstissue',
        },
        aplicacao: {
          projeto: 'Monitor de issues: acompanha múltiplos repositórios e notifica novas good-first-issues.',
          requisitos: [
            'Lista configurável de repositórios (arquivo JSON ou flags)',
            'Detecta issues novas desde a última execução (persiste estado em arquivo)',
            'Filtra issues sem assignee',
            'Exibe resumo: repo, número, título, dias aberta',
          ],
          criterios: [
            'Persistência entre execuções funcionando',
            'Sem duplicatas na listagem',
            'Testes para a lógica de filtragem e deduplicação',
          ],
          labFiles: [
            {
              name: 'main.go',
              body: `package main

import (
	"encoding/json"
	"fmt"
	"math"
	"os"
	"time"
)

const stateFile = "last_check.json"

type State struct {
	LastCheck time.Time      \`json:"last_check"\`
	Seen      map[string]bool \`json:"seen"\`
}

func loadState() State {
	f, err := os.ReadFile(stateFile)
	if err != nil {
		return State{Seen: make(map[string]bool)}
	}
	var s State
	json.Unmarshal(f, &s) //nolint:errcheck
	if s.Seen == nil {
		s.Seen = make(map[string]bool)
	}
	return s
}

func saveState(s State) {
	b, _ := json.Marshal(s)
	os.WriteFile(stateFile, b, 0600) //nolint:errcheck
}

func main() {
	repos := []string{
		"cli/cli",
		"golang/go",
	}

	state := loadState()
	newState := State{
		LastCheck: time.Now(),
		Seen:      make(map[string]bool),
	}

	client := NewGitHubClient(os.Getenv("GITHUB_TOKEN"))

	for _, repo := range repos {
		issues, err := client.FetchGoodFirstIssues(repo)
		if err != nil {
			fmt.Fprintf(os.Stderr, "erro em %s: %v\\n", repo, err)
			continue
		}
		for _, issue := range issues {
			key := fmt.Sprintf("%s#%d", repo, issue.Number)
			newState.Seen[key] = true
			if !state.Seen[key] {
				days := math.Round(time.Since(issue.UpdatedAt).Hours() / 24)
				fmt.Printf("[NOVA] %s #%d (%.0fd) — %s\\n",
					repo, issue.Number, days, issue.Title)
				fmt.Printf("       %s\\n\\n", issue.HTMLURL)
			}
		}
	}

	saveState(newState)
	fmt.Printf("\\nTotal visto: %d issues em %d repos\\n", len(newState.Seen), len(repos))
}`,
            },
            {
              name: 'github.go',
              body: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type GitHubClient struct {
	token  string
	client *http.Client
}

type Issue struct {
	Number    int       \`json:"number"\`
	Title     string    \`json:"title"\`
	HTMLURL   string    \`json:"html_url"\`
	Assignee  *struct{} \`json:"assignee"\`
	UpdatedAt time.Time \`json:"updated_at"\`
}

func NewGitHubClient(token string) *GitHubClient {
	return &GitHubClient{token: token, client: &http.Client{Timeout: 10 * time.Second}}
}

func (c *GitHubClient) FetchGoodFirstIssues(ownerRepo string) ([]Issue, error) {
	url := fmt.Sprintf(
		"https://api.github.com/repos/%s/issues?labels=good+first+issue&state=open&per_page=30",
		ownerRepo,
	)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	if c.token != "" {
		req.Header.Set("Authorization", "Bearer "+c.token)
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GitHub API: %d", resp.StatusCode)
	}

	var issues []Issue
	if err := json.NewDecoder(resp.Body).Decode(&issues); err != nil {
		return nil, err
	}

	// Filtrar apenas issues sem assignee
	var free []Issue
	for _, i := range issues {
		if i.Assignee == nil {
			free = append(free, i)
		}
	}
	return free, nil
}`,
            },
            {
              name: 'state_test.go',
              body: `package main

import (
	"os"
	"testing"
	"time"
)

func TestLoadState_Empty(t *testing.T) {
	os.Remove(stateFile)
	s := loadState()
	if s.Seen == nil {
		t.Error("Seen deve ser mapa inicializado, não nil")
	}
	if len(s.Seen) != 0 {
		t.Errorf("esperado mapa vazio, got %d entradas", len(s.Seen))
	}
}

func TestSaveAndLoadState(t *testing.T) {
	defer os.Remove(stateFile)

	original := State{
		LastCheck: time.Now().Truncate(time.Second),
		Seen:      map[string]bool{"cli/cli#42": true, "golang/go#100": true},
	}
	saveState(original)

	loaded := loadState()
	if !loaded.Seen["cli/cli#42"] {
		t.Error("esperava cli/cli#42 no estado carregado")
	}
	if !loaded.Seen["golang/go#100"] {
		t.Error("esperava golang/go#100 no estado carregado")
	}
	if len(loaded.Seen) != 2 {
		t.Errorf("esperado 2 entradas, got %d", len(loaded.Seen))
	}
}`,
            },
          ],
        },
      },
    },
    {
      id: 'opensource-primeira-contribuicao',
      title: 'Sua primeira contribuição',
      description: 'Fork, branch, commit semântico, PR e o ciclo completo de contribuição.',
      estimatedMinutes: 40,
      vesa: {
        visaoGeral: {
          explicacao: `Fazer uma contribuição não é apenas escrever código — é um processo de comunicação. Projetos com centenas de contribuidores precisam de padrões para funcionar.

**O ciclo de uma contribuição**
\`\`\`
1. Fork  →  2. Clone  →  3. Branch  →  4. Código  →  5. Tests  →  6. PR
\`\`\`

**1. Fork e setup local**
\`\`\`bash
# Fork no GitHub (botão Fork na página do repo)
git clone https://github.com/SEU_USUARIO/PROJETO.git
cd PROJETO
git remote add upstream https://github.com/DONO/PROJETO.git
git fetch upstream
\`\`\`

**2. Branch descritivo**
\`\`\`bash
git checkout -b fix/json-decoder-nil-check
# Padrões comuns: fix/, feat/, docs/, refactor/, test/
\`\`\`

**3. Commit semântico**
\`\`\`
feat: add timeout to HTTP client
fix: handle nil pointer in JSON decoder
docs: update contributing guide for Windows
test: add unit tests for rate limiter
refactor: extract sandbox env to function
\`\`\`

**4. Sync com upstream antes do PR**
\`\`\`bash
git fetch upstream
git rebase upstream/main
# Resolve conflitos se houver
\`\`\`

**5. Checklist antes de abrir o PR**
- [ ] Leu o CONTRIBUTING.md do projeto?
- [ ] Rodou \`go test ./...\`?
- [ ] Rodou \`go vet ./...\` e \`gofmt\`?
- [ ] A descrição do PR explica *por que*, não só *o que*?
- [ ] Está linkado à issue com "Fixes #123"?`,
          codeExample: `// Exemplo de um bom script de setup para contribuição
// Salve como setup-contrib.sh e execute: bash setup-contrib.sh owner/repo

package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func run(name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("uso: contrib-setup <seu-usuario> <owner/repo>")
		os.Exit(1)
	}

	yourUser := os.Args[1]
	upstream := os.Args[2]
	parts := strings.Split(upstream, "/")
	if len(parts) != 2 {
		fmt.Println("formato esperado: owner/repo")
		os.Exit(1)
	}
	repoName := parts[1]

	steps := []struct {
		desc string
		fn   func() error
	}{
		{"Clonar fork", func() error {
			url := fmt.Sprintf("https://github.com/%s/%s.git", yourUser, repoName)
			return run("git", "clone", url)
		}},
		{"Entrar no diretório", func() error {
			return os.Chdir(repoName)
		}},
		{"Adicionar upstream", func() error {
			url := fmt.Sprintf("https://github.com/%s.git", upstream)
			return run("git", "remote", "add", "upstream", url)
		}},
		{"Fetch upstream", func() error {
			return run("git", "fetch", "upstream")
		}},
		{"Verificar remotes", func() error {
			return run("git", "remote", "-v")
		}},
	}

	for i, step := range steps {
		fmt.Printf("\\n[%d/%d] %s...\\n", i+1, len(steps), step.desc)
		if err := step.fn(); err != nil {
			fmt.Printf("ERRO: %v\\n", err)
			os.Exit(1)
		}
	}

	fmt.Println("\\n✓ Pronto para contribuir!")
	fmt.Println("Próximo passo: git checkout -b fix/sua-correção")
}`,
          recursos: [
            'https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project',
            'https://www.conventionalcommits.org/en/v1.0.0/',
            'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork',
            'https://go.dev/doc/contribute',
            'https://www.youtube.com/watch?v=RGOj5yH7evk',
          ],
        },
        experimentacao: {
          desafio: 'Simule o fluxo completo de contribuição: crie um repositório público próprio no GitHub, abra uma issue, faça um fork (de outro usuário fictício), implemente a correção num branch descritivo e abra um PR linkando à issue com "Fixes #1".',
          dicas: [
            'git log --oneline para ver o histórico limpo',
            'git rebase -i HEAD~3 para squash de commits antes do PR',
            'gh pr create --fill se usar o GitHub CLI',
            'Teste com go test ./... antes de abrir o PR',
          ],
        },
        socializacao: {
          discussao: 'Qual é a parte mais difícil de fazer um PR ser aprovado: o código, a comunicação ou o timing?',
          pontos: [
            'PRs pequenos e focados têm 3x mais chance de serem aceitos',
            'Comentários em código alheio devem ser perguntas, não críticas',
            'Nunca misture refactoring com feature em um único PR',
            'Responda reviews em até 48h para não perder momentum',
          ],
          diasDesafio: 'Bônus — Semana de Open Source',
          sugestaoBlog: 'Meu primeiro PR aceito em um projeto Go: o que aprendi sobre comunicação técnica',
          hashtagsExtras: '#golang #opensource #github #pullrequest #commit',
        },
        aplicacao: {
          projeto: 'Ferramenta de checklist pré-PR: verifica boas práticas antes de submeter contribuição.',
          requisitos: [
            'Verifica se há CONTRIBUTING.md no repositório atual',
            'Roda go test ./... e reporta falhas',
            'Roda go vet ./... e gofmt -l .',
            'Lista arquivos modificados e pede confirmação antes de push',
          ],
          criterios: [
            'Checks executam em sequência com output claro',
            'Saída com ✓/✗ por verificação',
            'Exit code não-zero se algum check falhar',
          ],
          labFiles: [
            {
              name: 'main.go',
              body: `package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

type Check struct {
	Name string
	Run  func() (string, error)
}

func runCmd(name string, args ...string) (string, error) {
	out, err := exec.Command(name, args...).CombinedOutput()
	return string(out), err
}

func main() {
	checks := []Check{
		{
			Name: "CONTRIBUTING.md existe",
			Run: func() (string, error) {
				_, err := os.Stat(filepath.Join(".", "CONTRIBUTING.md"))
				if os.IsNotExist(err) {
					return "não encontrado (não é bloqueante)", nil
				}
				return "encontrado ✓", err
			},
		},
		{
			Name: "go vet",
			Run: func() (string, error) {
				return runCmd("go", "vet", "./...")
			},
		},
		{
			Name: "gofmt",
			Run: func() (string, error) {
				out, err := runCmd("gofmt", "-l", ".")
				if out != "" {
					return out, fmt.Errorf("arquivos não formatados: %s", out)
				}
				return "todos formatados ✓", err
			},
		},
		{
			Name: "go test",
			Run: func() (string, error) {
				return runCmd("go", "test", "./...")
			},
		},
	}

	passed, failed := 0, 0
	for _, c := range checks {
		out, err := c.Run()
		if err != nil {
			fmt.Printf("✗  %s\\n   %s\\n", c.Name, out)
			failed++
		} else {
			fmt.Printf("✓  %s\\n", c.Name)
			if out != "" && out != "todos formatados ✓" && out != "encontrado ✓" && out != "não encontrado (não é bloqueante)" {
				fmt.Printf("   %s\\n", out)
			}
			passed++
		}
	}

	fmt.Printf("\\nResultado: %d/%d checks passaram\\n", passed, passed+failed)
	if failed > 0 {
		os.Exit(1)
	}
}`,
            },
            {
              name: 'main_test.go',
              body: `package main

import (
	"os"
	"testing"
)

func TestRunCmd_Success(t *testing.T) {
	out, err := runCmd("go", "version")
	if err != nil {
		t.Fatalf("go version falhou: %v", err)
	}
	if out == "" {
		t.Error("esperava output não vazio de 'go version'")
	}
}

func TestRunCmd_Failure(t *testing.T) {
	_, err := runCmd("go", "build", "./nonexistent_package_xyz")
	if err == nil {
		t.Error("esperava erro ao compilar pacote inexistente")
	}
}

func TestContributingMdCheck(t *testing.T) {
	// Cria CONTRIBUTING.md temporário
	f, err := os.CreateTemp(".", "CONTRIBUTING-*.md")
	if err != nil {
		t.Skip("não foi possível criar arquivo temporário")
	}
	name := f.Name()
	f.Close()
	defer os.Remove(name)

	// Renomeia para CONTRIBUTING.md
	os.Rename(name, "CONTRIBUTING.md")
	defer os.Remove("CONTRIBUTING.md")

	_, statErr := os.Stat("CONTRIBUTING.md")
	if os.IsNotExist(statErr) {
		t.Error("CONTRIBUTING.md deveria existir")
	}
}`,
            },
          ],
        },
      },
    },
    {
      id: 'opensource-comunicacao',
      title: 'Comunicação e etiqueta em projetos',
      description: 'Como interagir com mantenedores, responder reviews e construir reputação.',
      estimatedMinutes: 25,
      vesa: {
        visaoGeral: {
          explicacao: `Open source é 50% código, 50% comunicação. Mantenedores voluntários têm tempo limitado — respeitar isso é a diferença entre um PR aceito e ignorado.

**Antes de abrir uma issue**
1. Pesquise issues fechadas — o problema pode já ter sido resolvido
2. Leia o CONTRIBUTING.md e o CODE_OF_CONDUCT.md
3. Reproduza o bug com a versão mais recente do projeto
4. Inclua: versão Go, OS, steps to reproduce, output esperado vs obtido

**Template de issue bem escrita**
\`\`\`markdown
## Descrição
Ao decodificar JSON com campo nulo, o decoder entra em panic.

## Versão
Go 1.22.1 / macOS 14.3 / lib v2.1.0

## Como reproduzir
\`\`\`go
// código mínimo que reproduz o problema
\`\`\`

## Comportamento esperado
Retornar error, não panic.

## Comportamento atual
panic: runtime error: invalid memory address
\`\`\`

**Respondendo code review**
- "Faz sentido, vou corrigir" — não discuta each comment como batalha
- "Não entendi — pode dar um exemplo?" — pedir clareza é profissional
- Nunca force push após alguém ter comentado — use novo commit e squash depois
- Marque cada comentário como "resolved" após endereçar

**Construindo reputação gradualmente**
1. Primeiro: corrija documentação, typos, exemplos de código
2. Depois: pequenos bug fixes com testes
3. Então: features pequenas discutidas antes na issue
4. Por fim: features maiores, refactoring com consensus`,
          codeExample: `// Ferramenta para gerar template de issue automaticamente
// com informações do ambiente Go

package main

import (
	"fmt"
	"os/exec"
	"runtime"
	"strings"
	"text/template"
	"os"
)

type IssueInfo struct {
	GoVersion string
	GOOS      string
	GOARCH    string
	GoPath    string
}

const issueTemplate = \`## Descrição
<!-- Explique o problema em 1-2 frases -->

## Ambiente
- **Go**: {{.GoVersion}}
- **OS**: {{.GOOS}} / {{.GOARCH}}

## Como reproduzir
\\\`\\\`\\\`go
// Código mínimo que reproduz o problema
package main

func main() {
    // ...
}
\\\`\\\`\\\`

## Comportamento esperado
<!-- O que deveria acontecer -->

## Comportamento atual
<!-- O que acontece de fato, incluindo mensagens de erro -->

## Contexto adicional
<!-- Versão do pacote, links relevantes, etc -->
\`

func goVersion() string {
	out, err := exec.Command("go", "version").Output()
	if err != nil {
		return runtime.Version()
	}
	return strings.TrimSpace(string(out))
}

func main() {
	info := IssueInfo{
		GoVersion: goVersion(),
		GOOS:      runtime.GOOS,
		GOARCH:    runtime.GOARCH,
	}

	tmpl := template.Must(template.New("issue").Parse(issueTemplate))
	fmt.Println("=== Template de Issue ===")
	fmt.Println()
	tmpl.Execute(os.Stdout, info)
}`,
          recursos: [
            'https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors',
            'https://www.contributor-covenant.org/',
            'https://go.dev/doc/contribute#review',
            'https://www.youtube.com/watch?v=hwDeeCbVTZE',
            'https://opensource.guide/how-to-contribute/',
          ],
        },
        experimentacao: {
          desafio: 'Escreva um gerador de template de issue que lê o arquivo ISSUE_TEMPLATE do repositório (se existir) ou usa um template padrão, e preenche automaticamente versão do Go, OS e GOARCH do ambiente atual.',
          dicas: [
            'exec.Command("go", "version").Output() retorna a versão completa',
            'runtime.GOOS e runtime.GOARCH têm o sistema operacional e arquitetura',
            'text/template aceita qualquer struct como dado',
            'Busque .github/ISSUE_TEMPLATE/ no diretório atual',
          ],
        },
        socializacao: {
          discussao: 'Você já recusaria contribuir com um projeto por achar o processo de review muito rígido? Ou isso te forçaria a melhorar?',
          pontos: [
            'Projetos grandes (K8s, Go stdlib) têm processos rígidos — é necessário, não elitismo',
            'Um mantenedor que rejeita PRs com explicação clara é mais valioso que um que ignora',
            'Contribuições de documentação são frequentemente mais impactantes que código',
            'Reputação open source é um ativo de carreira real — apareça no Google',
          ],
          diasDesafio: 'Bônus — Semana de Open Source',
          sugestaoBlog: 'O que aprendi sobre comunicação técnica contribuindo para projetos Go',
          hashtagsExtras: '#opensource #golang #developer #community',
        },
        aplicacao: {
          projeto: 'Gerador de templates para contribuição: issue, PR e CONTRIBUTING.md personalizados.',
          requisitos: [
            'Subcomando "issue" gera template com ambiente preenchido',
            'Subcomando "pr" gera template de Pull Request com checklist',
            'Subcomando "contributing" gera CONTRIBUTING.md básico para o projeto atual',
            'Flags para nome do projeto e linguagem',
          ],
          criterios: [
            'Três subcomandos funcionais',
            'Templates com variáveis corretamente substituídas',
            'Saída para stdout ou arquivo via flag --output',
          ],
          labFiles: [
            {
              name: 'main.go',
              body: `package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"
	"os/exec"
	"strings"
	"text/template"
)

const prTemplate = \`## O que muda
<!-- Descreva o que este PR faz em 1-3 frases -->

Fixes #<!-- número da issue -->

## Tipo de mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Documentação
- [ ] Refactoring

## Checklist
- [ ] \\\`go test ./...\\\` passou
- [ ] \\\`go vet ./...\\\` sem erros
- [ ] \\\`gofmt\\\` aplicado
- [ ] CONTRIBUTING.md consultado
\`

const issueTemplate = \`## Descrição
<!-- Explique o problema -->

## Ambiente
- Go: {{.GoVersion}}
- OS: {{.GOOS}}/{{.GOARCH}}

## Como reproduzir
\\\`\\\`\\\`go
// código mínimo
\\\`\\\`\\\`

## Esperado vs Atual
**Esperado**: 
**Atual**: 
\`

type Env struct {
	GoVersion string
	GOOS      string
	GOARCH    string
}

func currentEnv() Env {
	out, _ := exec.Command("go", "version").Output()
	return Env{
		GoVersion: strings.TrimSpace(string(out)),
		GOOS:      runtime.GOOS,
		GOARCH:    runtime.GOARCH,
	}
}

func main() {
	cmd := ""
	output := flag.String("output", "", "arquivo de saída (padrão: stdout)")
	flag.Parse()
	if flag.NArg() > 0 {
		cmd = flag.Arg(0)
	}

	var content string
	switch cmd {
	case "issue":
		var sb strings.Builder
		tmpl := template.Must(template.New("i").Parse(issueTemplate))
		tmpl.Execute(&sb, currentEnv())
		content = sb.String()
	case "pr":
		content = prTemplate
	default:
		fmt.Fprintln(os.Stderr, "uso: contrib-template [issue|pr] [--output=arquivo]")
		os.Exit(1)
	}

	if *output != "" {
		os.WriteFile(*output, []byte(content), 0644) //nolint:errcheck
		fmt.Printf("salvo em %s\\n", *output)
	} else {
		fmt.Print(content)
	}
}`,
            },
            {
              name: 'main_test.go',
              body: `package main

import (
	"strings"
	"testing"
)

func TestCurrentEnv(t *testing.T) {
	env := currentEnv()
	if env.GOOS == "" {
		t.Error("GOOS não deve ser vazio")
	}
	if env.GOARCH == "" {
		t.Error("GOARCH não deve ser vazio")
	}
	if env.GoVersion == "" {
		t.Error("GoVersion não deve ser vazio")
	}
}

func TestIssueTemplateRendering(t *testing.T) {
	import_text := issueTemplate
	if !strings.Contains(import_text, "{{.GoVersion}}") {
		t.Error("issueTemplate deve conter {{.GoVersion}}")
	}
	if !strings.Contains(import_text, "{{.GOOS}}") {
		t.Error("issueTemplate deve conter {{.GOOS}}")
	}
}

func TestPRTemplateHasChecklist(t *testing.T) {
	if !strings.Contains(prTemplate, "go test") {
		t.Error("PR template deve mencionar go test")
	}
	if !strings.Contains(prTemplate, "Fixes #") {
		t.Error("PR template deve ter campo para número da issue")
	}
}`,
            },
          ],
        },
      },
    },
  ],
};
