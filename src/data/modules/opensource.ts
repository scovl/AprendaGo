import { Module } from '../../types';

export const opensourceModule: Module = {
  id: 'opensource',
  title: 'Colaborando com Open Source',
  description: 'Encontre projetos Go, faÃ§a sua primeira contribuiÃ§Ã£o e construa reputaÃ§Ã£o na comunidade.',
  icon: 'GitMerge',
  color: '#27AE60',
  lessons: [
    {
      id: 'opensource-encontrando-projetos',
      title: 'Encontrando projetos para contribuir',
      description: 'CodeTriage, GitHub Trending, busca por estrelas e atividade de repositÃ³rios.',
      estimatedMinutes: 35,
      vesa: {
        visaoGeral: {
          explicacao: `Contribuir com open source Ã© uma das formas mais eficazes de evoluir como desenvolvedor Go. O desafio inicial Ã© **encontrar o projeto certo** â€” nÃ£o muito complexo para comeÃ§ar, mas ativo o suficiente para valer a pena.

**CodeTriage (codetriage.com)**
Agrega issues de repositÃ³rios no GitHub e envia uma por dia por e-mail. VocÃª se inscreve em projetos Go e recebe issues curadas no ritmo que preferir. Ideal para quem quer comeÃ§ar devagar.

**GitHub Trending**  
Acesse \`github.com/trending/go\` para ver os repositÃ³rios Go mais populares da semana/mÃªs. Filtre por linguagem, perÃ­odo e veja quais projetos estÃ£o crescendo agora.

**Filtros Ãºteis na busca do GitHub**
Use a busca avanÃ§ada para encontrar projetos com o perfil certo:
\`\`\`
language:Go stars:>500 pushed:>2024-01-01
\`\`\`
- \`stars:>500\` â€” comunidade estabelecida  
- \`pushed:>2024-01-01\` â€” repositÃ³rio ativo recentemente  
- \`forks:>50\` â€” muitos colaboradores  
- \`good-first-issues:>3\` â€” curadoria de issues para iniciantes`,
          codeExample: `// Exemplo: usando a API do GitHub para listar repositÃ³rios Go populares
// (Ãºtil para criar sua prÃ³pria ferramenta de busca)

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
		fmt.Printf("%-40s â­ %d  ðŸ´ %d  ðŸ› %d\\n",
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
          desafio: 'Use a API do GitHub para criar um buscador de repositÃ³rios Go com boas issues para iniciantes. Exiba nome, estrelas, forks e nÃºmero de issues abertas. Filtre apenas repos com push nos Ãºltimos 3 meses.',
          dicas: [
            'Query: "good-first-issues:>3 language:Go pushed:>2024-01-01"',
            'Header "Accept: application/vnd.github.v3+json" para a API',
            'Rate limit: 60 req/h sem autenticaÃ§Ã£o; use GITHUB_TOKEN no header para 5000/h',
            'Campo "open_issues_count" inclui PRs abertos â€” considere isso',
          ],
        },
        socializacao: {
          discussao: 'Qual Ã© o critÃ©rio mais importante ao escolher um projeto para contribuir? Popularidade, atividade, linguagem ou impacto?',
          pontos: [
            'Projetos com > 100 estrelas geralmente tÃªm mais revisores disponÃ­veis',
            'Atividade recente (Ãºltimo push < 30 dias) indica mantenedores engajados',
            'Projetos menores aceitam contribuiÃ§Ãµes mais facilmente que os gigantes',
            'Verifique o CONTRIBUTING.md: indica maturidade do processo de contribuiÃ§Ã£o',
          ],
          diasDesafio: 'BÃ´nus â€” Semana de Open Source',
          sugestaoBlog: 'Como encontrei meu primeiro projeto Go para contribuir (e o que aprendi)',
          hashtagsExtras: '#golang #opensource #github #goodfirstissue',
        },
        aplicacao: {
          projeto: 'CLI de descoberta de projetos Go open source com filtros configurÃ¡veis.',
          requisitos: [
            'Busca por linguagem Go via GitHub API',
            'Filtros: mÃ­nimo de estrelas, data de Ãºltimo push, issues abertas',
            'SaÃ­da formatada com tabela (nome, â­, ðŸ´, issues)',
            'Flag --token para autenticaÃ§Ã£o e rate limit maior',
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
	minStars := flag.Int("stars", 100, "mÃ­nimo de estrelas")
	token := flag.String("token", "", "GitHub personal access token")
	flag.Parse()

	client := NewGitHubClient(*token)
	repos, err := client.SearchGoRepos(*minStars)
	if err != nil {
		fmt.Fprintf(os.Stderr, "erro: %v\\n", err)
		os.Exit(1)
	}

	fmt.Printf("%-45s %6s  %5s  %6s\\n", "REPOSITÃ“RIO", "â­", "ðŸ´", "ISSUES")
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
		return nil, fmt.Errorf("rate limit atingido â€” use --token para aumentar o limite")
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
		t.Error("http.Client nÃ£o inicializado")
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
          explicacao: `O sistema de labels do GitHub Ã© o mapa de contribuiÃ§Ã£o de um projeto. Saber ler as labels certas economiza horas de busca.

**Labels essenciais para contribuidores novos**

| Label | Significado |
|-------|-------------|
| \`good first issue\` | Issue explicitamente marcada pelos mantenedores como acessÃ­vel |
| \`help wanted\` | Mantenedores precisam de ajuda, mas pode exigir contexto |
| \`bug\` | Comportamento incorreto â€” geralmente bem descrito |
| \`documentation\` | Melhorias em docs â€” Ã³tima entrada sem precisar de domÃ­nio do cÃ³digo |
| \`beginner friendly\` | Alias de good first issue em muitos projetos |

**Como avaliar uma issue antes de trabalhar nela**
1. **EstÃ¡ atribuÃ­da?** Se sim, alguÃ©m jÃ¡ estÃ¡ trabalhando â€” pergunte antes de duplicar esforÃ§o
2. **Tem contexto suficiente?** Steps to reproduce, versÃ£o Go, OS â€” issues mal descritas rendem PRs errados
3. **Qual a Ãºltima atividade?** Issues sem resposta hÃ¡ > 6 meses podem estar abandonadas
4. **Existe uma PR aberta?** Verifique "Linked pull requests" â€” nÃ£o refaÃ§a o que jÃ¡ estÃ¡ em revisÃ£o

**Busca avanÃ§ada de issues no GitHub**
\`\`\`
is:open is:issue label:"good first issue" language:Go no:assignee
\`\`\`
- \`no:assignee\` â€” sem responsÃ¡vel, disponÃ­vel para vocÃª
- \`is:open\` â€” ainda nÃ£o resolvida
- \`updated:>2024-01-01\` â€” ativa recentemente`,
          codeExample: `// Ferramenta para listar "good first issues" de um repositÃ³rio
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
				assigned = "atribuÃ­da"
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
          desafio: 'Escreva um programa que recebe `owner/repo` como argumento e lista todas as issues abertas com label "good first issue" que ainda nÃ£o estÃ£o atribuÃ­das. Para cada issue mostre: nÃºmero, tÃ­tulo, dias sem atualizaÃ§Ã£o e link.',
          dicas: [
            'Use time.Since(issue.UpdatedAt).Hours()/24 para calcular dias',
            'issue.Assignee == nil indica que estÃ¡ livre',
            'Adicione flag --label para tornar a label configurÃ¡vel',
            'Trate paginaÃ§Ã£o: GitHub retorna mÃ¡ximo 100 por pÃ¡gina',
          ],
        },
        socializacao: {
          discussao: 'VocÃª abriria uma issue para reportar um bug mesmo sabendo que pode nÃ£o ter tempo de corrigi-la? Como a comunidade trata isso?',
          pontos: [
            'Reportar bugs sem PR jÃ¡ Ã© uma contribuiÃ§Ã£o vÃ¡lida',
            'Issues bem escritas (steps to reproduce + versÃ£o + OS) valem ouro',
            'Mantenedores agradecem mais uma issue clara do que um PR mal explicado',
            'Comentar "Estou trabalhando nisso" antes de abrir um PR Ã© etiqueta bÃ¡sica',
          ],
          diasDesafio: 'BÃ´nus â€” Semana de Open Source',
          sugestaoBlog: 'good first issue: como ler, escolher e nÃ£o desperdiÃ§ar o tempo de ninguÃ©m',
          hashtagsExtras: '#opensource #golang #github #goodfirstissue',
        },
        aplicacao: {
          projeto: 'Monitor de issues: acompanha mÃºltiplos repositÃ³rios e notifica novas good-first-issues.',
          requisitos: [
            'Lista configurÃ¡vel de repositÃ³rios (arquivo JSON ou flags)',
            'Detecta issues novas desde a Ãºltima execuÃ§Ã£o (persiste estado em arquivo)',
            'Filtra issues sem assignee',
            'Exibe resumo: repo, nÃºmero, tÃ­tulo, dias aberta',
          ],
          criterios: [
            'PersistÃªncia entre execuÃ§Ãµes funcionando',
            'Sem duplicatas na listagem',
            'Testes para a lÃ³gica de filtragem e deduplicaÃ§Ã£o',
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
				fmt.Printf("[NOVA] %s #%d (%.0fd) â€” %s\\n",
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
		t.Error("Seen deve ser mapa inicializado, nÃ£o nil")
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
      title: 'Sua primeira contribuiÃ§Ã£o',
      description: 'Fork, branch, commit semÃ¢ntico, PR e o ciclo completo de contribuiÃ§Ã£o.',
      estimatedMinutes: 40,
      vesa: {
        visaoGeral: {
          explicacao: `Fazer uma contribuiÃ§Ã£o nÃ£o Ã© apenas escrever cÃ³digo â€” Ã© um processo de comunicaÃ§Ã£o. Projetos com centenas de contribuidores precisam de padrÃµes para funcionar.

**O ciclo de uma contribuiÃ§Ã£o**
\`\`\`
1. Fork  â†’  2. Clone  â†’  3. Branch  â†’  4. CÃ³digo  â†’  5. Tests  â†’  6. PR
\`\`\`

**1. Fork e setup local**
\`\`\`bash
# Fork no GitHub (botÃ£o Fork na pÃ¡gina do repo)
git clone https://github.com/SEU_USUARIO/PROJETO.git
cd PROJETO
git remote add upstream https://github.com/DONO/PROJETO.git
git fetch upstream
\`\`\`

**2. Branch descritivo**
\`\`\`bash
git checkout -b fix/json-decoder-nil-check
# PadrÃµes comuns: fix/, feat/, docs/, refactor/, test/
\`\`\`

**3. Commit semÃ¢ntico**
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
- [ ] A descriÃ§Ã£o do PR explica *por que*, nÃ£o sÃ³ *o que*?
- [ ] EstÃ¡ linkado Ã  issue com "Fixes #123"?`,
          codeExample: `// Exemplo de um bom script de setup para contribuiÃ§Ã£o
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
		{"Entrar no diretÃ³rio", func() error {
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

	fmt.Println("\\nâœ“ Pronto para contribuir!")
	fmt.Println("PrÃ³ximo passo: git checkout -b fix/sua-correÃ§Ã£o")
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
          desafio: 'Simule o fluxo completo de contribuiÃ§Ã£o: crie um repositÃ³rio pÃºblico prÃ³prio no GitHub, abra uma issue, faÃ§a um fork (de outro usuÃ¡rio fictÃ­cio), implemente a correÃ§Ã£o num branch descritivo e abra um PR linkando Ã  issue com "Fixes #1".',
          dicas: [
            'git log --oneline para ver o histÃ³rico limpo',
            'git rebase -i HEAD~3 para squash de commits antes do PR',
            'gh pr create --fill se usar o GitHub CLI',
            'Teste com go test ./... antes de abrir o PR',
          ],
        },
        socializacao: {
          discussao: 'Qual Ã© a parte mais difÃ­cil de fazer um PR ser aprovado: o cÃ³digo, a comunicaÃ§Ã£o ou o timing?',
          pontos: [
            'PRs pequenos e focados tÃªm 3x mais chance de serem aceitos',
            'ComentÃ¡rios em cÃ³digo alheio devem ser perguntas, nÃ£o crÃ­ticas',
            'Nunca misture refactoring com feature em um Ãºnico PR',
            'Responda reviews em atÃ© 48h para nÃ£o perder momentum',
          ],
          diasDesafio: 'BÃ´nus â€” Semana de Open Source',
          sugestaoBlog: 'Meu primeiro PR aceito em um projeto Go: o que aprendi sobre comunicaÃ§Ã£o tÃ©cnica',
          hashtagsExtras: '#golang #opensource #github #pullrequest #commit',
        },
        aplicacao: {
          projeto: 'Ferramenta de checklist prÃ©-PR: verifica boas prÃ¡ticas antes de submeter contribuiÃ§Ã£o.',
          requisitos: [
            'Verifica se hÃ¡ CONTRIBUTING.md no repositÃ³rio atual',
            'Roda go test ./... e reporta falhas',
            'Roda go vet ./... e gofmt -l .',
            'Lista arquivos modificados e pede confirmaÃ§Ã£o antes de push',
          ],
          criterios: [
            'Checks executam em sequÃªncia com output claro',
            'SaÃ­da com âœ“/âœ— por verificaÃ§Ã£o',
            'Exit code nÃ£o-zero se algum check falhar',
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
					return "nÃ£o encontrado (nÃ£o Ã© bloqueante)", nil
				}
				return "encontrado âœ“", err
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
					return out, fmt.Errorf("arquivos nÃ£o formatados: %s", out)
				}
				return "todos formatados âœ“", err
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
			fmt.Printf("âœ—  %s\\n   %s\\n", c.Name, out)
			failed++
		} else {
			fmt.Printf("âœ“  %s\\n", c.Name)
			if out != "" && out != "todos formatados âœ“" && out != "encontrado âœ“" && out != "nÃ£o encontrado (nÃ£o Ã© bloqueante)" {
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
		t.Error("esperava output nÃ£o vazio de 'go version'")
	}
}

func TestRunCmd_Failure(t *testing.T) {
	_, err := runCmd("go", "build", "./nonexistent_package_xyz")
	if err == nil {
		t.Error("esperava erro ao compilar pacote inexistente")
	}
}

func TestContributingMdCheck(t *testing.T) {
	// Cria CONTRIBUTING.md temporÃ¡rio
	f, err := os.CreateTemp(".", "CONTRIBUTING-*.md")
	if err != nil {
		t.Skip("nÃ£o foi possÃ­vel criar arquivo temporÃ¡rio")
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
      title: 'ComunicaÃ§Ã£o e etiqueta em projetos',
      description: 'Como interagir com mantenedores, responder reviews e construir reputaÃ§Ã£o.',
      estimatedMinutes: 25,
      vesa: {
        visaoGeral: {
          explicacao: `Open source Ã© 50% cÃ³digo, 50% comunicaÃ§Ã£o. Mantenedores voluntÃ¡rios tÃªm tempo limitado â€” respeitar isso Ã© a diferenÃ§a entre um PR aceito e ignorado.

**Antes de abrir uma issue**
1. Pesquise issues fechadas â€” o problema pode jÃ¡ ter sido resolvido
2. Leia o CONTRIBUTING.md e o CODE_OF_CONDUCT.md
3. Reproduza o bug com a versÃ£o mais recente do projeto
4. Inclua: versÃ£o Go, OS, steps to reproduce, output esperado vs obtido

**Template de issue bem escrita**
\`\`\`markdown
## DescriÃ§Ã£o
Ao decodificar JSON com campo nulo, o decoder entra em panic.

## VersÃ£o
Go 1.22.1 / macOS 14.3 / lib v2.1.0

## Como reproduzir
\`\`\`go
// cÃ³digo mÃ­nimo que reproduz o problema
\`\`\`

## Comportamento esperado
Retornar error, nÃ£o panic.

## Comportamento atual
panic: runtime error: invalid memory address
\`\`\`

**Respondendo code review**
- "Faz sentido, vou corrigir" â€” nÃ£o discuta each comment como batalha
- "NÃ£o entendi â€” pode dar um exemplo?" â€” pedir clareza Ã© profissional
- Nunca force push apÃ³s alguÃ©m ter comentado â€” use novo commit e squash depois
- Marque cada comentÃ¡rio como "resolved" apÃ³s endereÃ§ar

**Construindo reputaÃ§Ã£o gradualmente**
1. Primeiro: corrija documentaÃ§Ã£o, typos, exemplos de cÃ³digo
2. Depois: pequenos bug fixes com testes
3. EntÃ£o: features pequenas discutidas antes na issue
4. Por fim: features maiores, refactoring com consensus`,
          codeExample: `// Ferramenta para gerar template de issue automaticamente
// com informaÃ§Ãµes do ambiente Go

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

const issueTemplate = \`## DescriÃ§Ã£o
<!-- Explique o problema em 1-2 frases -->

## Ambiente
- **Go**: {{.GoVersion}}
- **OS**: {{.GOOS}} / {{.GOARCH}}

## Como reproduzir
\\\`\\\`\\\`go
// CÃ³digo mÃ­nimo que reproduz o problema
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
<!-- VersÃ£o do pacote, links relevantes, etc -->
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
          desafio: 'Escreva um gerador de template de issue que lÃª o arquivo ISSUE_TEMPLATE do repositÃ³rio (se existir) ou usa um template padrÃ£o, e preenche automaticamente versÃ£o do Go, OS e GOARCH do ambiente atual.',
          dicas: [
            'exec.Command("go", "version").Output() retorna a versÃ£o completa',
            'runtime.GOOS e runtime.GOARCH tÃªm o sistema operacional e arquitetura',
            'text/template aceita qualquer struct como dado',
            'Busque .github/ISSUE_TEMPLATE/ no diretÃ³rio atual',
          ],
        },
        socializacao: {
          discussao: 'VocÃª jÃ¡ recusaria contribuir com um projeto por achar o processo de review muito rÃ­gido? Ou isso te forÃ§aria a melhorar?',
          pontos: [
            'Projetos grandes (K8s, Go stdlib) tÃªm processos rÃ­gidos â€” Ã© necessÃ¡rio, nÃ£o elitismo',
            'Um mantenedor que rejeita PRs com explicaÃ§Ã£o clara Ã© mais valioso que um que ignora',
            'ContribuiÃ§Ãµes de documentaÃ§Ã£o sÃ£o frequentemente mais impactantes que cÃ³digo',
            'ReputaÃ§Ã£o open source Ã© um ativo de carreira real â€” apareÃ§a no Google',
          ],
          diasDesafio: 'BÃ´nus â€” Semana de Open Source',
          sugestaoBlog: 'O que aprendi sobre comunicaÃ§Ã£o tÃ©cnica contribuindo para projetos Go',
          hashtagsExtras: '#opensource #golang #developer #community',
        },
        aplicacao: {
          projeto: 'Gerador de templates para contribuiÃ§Ã£o: issue, PR e CONTRIBUTING.md personalizados.',
          requisitos: [
            'Subcomando "issue" gera template com ambiente preenchido',
            'Subcomando "pr" gera template de Pull Request com checklist',
            'Subcomando "contributing" gera CONTRIBUTING.md bÃ¡sico para o projeto atual',
            'Flags para nome do projeto e linguagem',
          ],
          criterios: [
            'TrÃªs subcomandos funcionais',
            'Templates com variÃ¡veis corretamente substituÃ­das',
            'SaÃ­da para stdout ou arquivo via flag --output',
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

Fixes #<!-- nÃºmero da issue -->

## Tipo de mudanÃ§a
- [ ] Bug fix
- [ ] Nova feature
- [ ] DocumentaÃ§Ã£o
- [ ] Refactoring

## Checklist
- [ ] \\\`go test ./...\\\` passou
- [ ] \\\`go vet ./...\\\` sem erros
- [ ] \\\`gofmt\\\` aplicado
- [ ] CONTRIBUTING.md consultado
\`

const issueTemplate = \`## DescriÃ§Ã£o
<!-- Explique o problema -->

## Ambiente
- Go: {{.GoVersion}}
- OS: {{.GOOS}}/{{.GOARCH}}

## Como reproduzir
\\\`\\\`\\\`go
// cÃ³digo mÃ­nimo
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
	output := flag.String("output", "", "arquivo de saÃ­da (padrÃ£o: stdout)")
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
		t.Error("GOOS nÃ£o deve ser vazio")
	}
	if env.GOARCH == "" {
		t.Error("GOARCH nÃ£o deve ser vazio")
	}
	if env.GoVersion == "" {
		t.Error("GoVersion nÃ£o deve ser vazio")
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
		t.Error("PR template deve ter campo para nÃºmero da issue")
	}
}`,
            },
          ],
        },
      },
    },
  ],
};
