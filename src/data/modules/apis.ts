import { Module } from '../../types';

export const apisModule: Module = {
    id: 'apis',
    title: 'APIs REST',
    description: 'APIs completas: stdlib, Chi, Gin, JWT, middleware e Swagger.',
    icon: 'Globe',
    color: '#7B68EE',
    lessons: [
      {
        id: 'api-crud',
        title: 'API CRUD com Standard Library',
        description: 'REST API completa com net/http, JSON e middleware bÃ¡sico.',
        estimatedMinutes: 40,
        vesa: {
          visaoGeral: {
            codeExample: 'package main\n\nimport (\n\t"encoding/json"\n\t"log"\n\t"net/http"\n\t"time"\n)\n\n// Middleware de logging\nfunc logMiddleware(next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tstart := time.Now()\n\t\tnext.ServeHTTP(w, r)\n\t\tlog.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))\n\t})\n}\n\nfunc main() {\n\tmux := http.NewServeMux()\n\n\tmux.HandleFunc("GET /api/products", listProducts)\n\tmux.HandleFunc("POST /api/products", createProduct)\n\tmux.HandleFunc("GET /api/products/{id}", getProduct)\n\tmux.HandleFunc("PUT /api/products/{id}", updateProduct)\n\tmux.HandleFunc("DELETE /api/products/{id}", deleteProduct)\n\n\tlog.Fatal(http.ListenAndServe(":8080", logMiddleware(mux)))\n}\n\n// Handlers usam r.PathValue("id"), json.NewDecoder(r.Body), json.NewEncoder(w)',
            recursos: ['https://pkg.go.dev/net/http'],
          },
          experimentacao: {
            desafio: 'Crie uma API CRUD para "livros" com a stdlib: GET (lista e por ID), POST, PUT, DELETE. Use map como banco em memÃ³ria. Adicione middleware de logging.',
            dicas: [
              'r.PathValue("id") para path params (Go 1.22+)',
              'w.WriteHeader(http.StatusCreated) para POST',
              'json.NewDecoder(r.Body).Decode(&struct) para parse',
            ],
          },
          socializacao: {
            discussao: 'Standard library Ã© suficiente para APIs em produÃ§Ã£o?',
            pontos: [
              'Go 1.22 melhorou muito â€” path params e mÃ©todos nativos',
              'Middleware Ã© manual mas funcional',
              'Frameworks adicionam conveniÃªncia, nÃ£o performance',
            ],
            diasDesafio: 'Dias 53â€“60',
            sugestaoBlog: 'REST API em Go com standard library: CRUD completo sem frameworks',
            hashtagsExtras: '#golang #api #rest',
          },
          aplicacao: {
            projeto: 'API CRUD de tarefas (todo) com standard library e testes com httptest.',
            requisitos: ['GET/POST/PUT/DELETE', 'JSON I/O', 'Status codes corretos', 'Testes httptest'],
            criterios: ['RESTful', 'Tratamento de erros', 'Testes cobrindo happy path e erros'],
          },
        },
      },
      {
        id: 'api-frameworks',
        title: 'Frameworks: Chi, Gin e Echo',
        description: 'Middleware chain, subrouters, binding e validaÃ§Ã£o com frameworks populares.',
        estimatedMinutes: 45,
        vesa: {
          visaoGeral: {
            codeExample: '// Chi â€” idiomÃ¡tico, compatÃ­vel net/http\nr := chi.NewRouter()\nr.Use(middleware.Logger, middleware.Recoverer)\nr.Route("/api/v1", func(r chi.Router) {\n\tr.Get("/users", listUsers)\n\tr.Post("/users", createUser)\n\tr.Route("/users/{id}", func(r chi.Router) {\n\t\tr.Get("/", getUser)\n\t\tr.Put("/", updateUser)\n\t\tr.Delete("/", deleteUser)\n\t})\n})\n\n// Gin â€” binding e validaÃ§Ã£o\ntype CreateUserInput struct {\n\tName  string `json:"name" binding:"required"`\n\tEmail string `json:"email" binding:"required,email"`\n}\nfunc createUser(c *gin.Context) {\n\tvar input CreateUserInput\n\tif err := c.ShouldBindJSON(&input); err != nil {\n\t\tc.JSON(400, gin.H{"error": err.Error()})\n\t\treturn\n\t}\n\tc.JSON(201, gin.H{"user": input})\n}',
            recursos: [
              'https://github.com/go-chi/chi',
              'https://github.com/gin-gonic/gin',
              'https://github.com/labstack/echo',
            ],
          },
          experimentacao: {
            desafio: 'Migre a API CRUD da liÃ§Ã£o anterior para Chi e depois para Gin. Compare: linhas de cÃ³digo, middleware e developer experience.',
            dicas: [
              'Chi: chi.URLParam(r, "id") para path params',
              'Gin: c.Param("id"), c.ShouldBindJSON(&input)',
              'Echo: c.Bind(&input), c.JSON(200, result)',
            ],
          },
          socializacao: {
            discussao: 'Chi vs Gin vs Echo vs Fiber â€” qual framework escolher?',
            pontos: [
              'Chi: stdlib-compatible, ideal para puristas',
              'Gin: ecosystem grande, popular em empresas',
              'Echo: DX similar ao Express',
              'Fiber: fasthttp, max throughput mas nÃ£o stdlib-compatible',
            ],
            diasDesafio: 'Dias 53â€“60',
            sugestaoBlog: 'Chi vs Gin vs Echo: comparando frameworks Go na prÃ¡tica',
            hashtagsExtras: '#golang #chi #gin #echo',
          },
          aplicacao: {
            projeto: 'API RESTful com Chi ou Gin: versionamento, middleware de CORS e rate limiting.',
            requisitos: [
              'Subrouters para /api/v1',
              'Middleware de CORS e rate limiting',
              'Binding e validaÃ§Ã£o de input',
            ],
            criterios: ['Rotas organizadas', 'Middleware funcional', 'ValidaÃ§Ã£o robusta'],
          },
        },
      },
      {
        id: 'api-jwt',
        title: 'AutenticaÃ§Ã£o JWT',
        description: 'JWT: geraÃ§Ã£o, validaÃ§Ã£o, middleware de autenticaÃ§Ã£o e refresh tokens.',
        estimatedMinutes: 45,
        vesa: {
          visaoGeral: {
            codeExample: 'package main\n\nimport (\n\t"time"\n\t"github.com/golang-jwt/jwt/v5"\n)\n\nvar jwtSecret = []byte("chave-secreta-use-env-var")\n\nfunc gerarToken(userID string) (string, error) {\n\tclaims := jwt.MapClaims{\n\t\t"sub": userID,\n\t\t"exp": time.Now().Add(24 * time.Hour).Unix(),\n\t\t"iat": time.Now().Unix(),\n\t}\n\ttoken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)\n\treturn token.SignedString(jwtSecret)\n}\n\nfunc validarToken(tokenStr string) (*jwt.MapClaims, error) {\n\ttoken, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {\n\t\treturn jwtSecret, nil\n\t})\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tclaims := token.Claims.(jwt.MapClaims)\n\treturn &claims, nil\n}',
            recursos: [
              'https://github.com/golang-jwt/jwt',
              'https://jwt.io/',
            ],
          },
          experimentacao: {
            desafio: 'Crie middleware JWT que proteja rotas: extraia token do header, valide e injete user ID no context da request.',
            dicas: [
              'Header: Authorization: Bearer <token>',
              'strings.TrimPrefix para extrair token',
              'context.WithValue para passar claims adiante',
            ],
          },
          socializacao: {
            discussao: 'JWT vs Sessions: quando usar cada abordagem?',
            pontos: [
              'JWT: stateless, escalÃ¡vel, mas revogaÃ§Ã£o Ã© difÃ­cil',
              'Sessions: stateful, fÃ¡cil revogar, mas precisa de storage',
              'Refresh tokens: balance entre seguranÃ§a e UX',
            ],
            diasDesafio: 'Dias 53â€“60',
            sugestaoBlog: 'AutenticaÃ§Ã£o JWT em Go: do login ao middleware com seguranÃ§a',
            hashtagsExtras: '#golang #jwt #auth #security',
          },
          aplicacao: {
            projeto: 'Sistema de autenticaÃ§Ã£o: register, login, refresh token e rotas protegidas.',
            requisitos: [
              'bcrypt para hash de senha',
              'JWT com expiraÃ§Ã£o',
              'Middleware de autenticaÃ§Ã£o',
              'Refresh token',
            ],
            criterios: ['Senhas hasheadas', 'Tokens com expiraÃ§Ã£o', 'Rotas protegidas funcionais'],
          },
        },
      },
    ],
};
