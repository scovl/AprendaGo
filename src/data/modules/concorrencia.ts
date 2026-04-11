import { Module } from '../../types';

export const concorrenciaModule: Module = {
  id: 'concorrencia',
  title: 'ConcorrÃªncia',
  description: 'Goroutines, channels, select, sync, padrÃµes de concorrÃªncia e race detection.',
  icon: 'GitBranch',
  color: '#F6A623',
  lessons: [
    {
      id: 'conc-goroutines-channels',
      title: 'Goroutines e Channels',
      description: 'Goroutines, channels buffered/unbuffered, select e padrÃ£o produtor/consumidor.',
      estimatedMinutes: 50,
      vesa: {
        visaoGeral: {
          codeExample: 'package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\n// Produtor com channel tipado send-only\nfunc produtor(ch chan<- int, n int) {\n\tfor i := 0; i < n; i++ {\n\t\tch <- i\n\t}\n\tclose(ch) // sinaliza fim; recepÃ§Ã£o retorna ok=false\n}\n\nfunc main() {\n\t// Channel unbuffered: senderbloqueia atÃ© receiver ler\n\tc := make(chan int)\n\tgo func(ch chan<- int) {\n\t\ttime.Sleep(time.Millisecond)\n\t\tch <- 42\n\t}(c)\n\tv := <-c\n\tfmt.Println("recebido:", v)\n\n\t// Channel buffered: assÃ­ncrono atÃ© cap\n\tbuf := make(chan int, 2)\n\tbuf <- 10\n\tbuf <- 20\n\t// buf <- 30 // bloquearia: buffer cheio\n\tfmt.Println(len(buf), cap(buf)) // 2 2\n\n\t// for-range em channel: lÃª atÃ© close()\n\tch := make(chan int, 10)\n\tgo produtor(ch, 5)\n\tfor v := range ch {\n\t\tfmt.Println(v) // 0 1 2 3 4\n\t}\n\n\t// select com default (try-receive nÃ£o-bloqueante)\n\tch2 := make(chan string, 1)\n\tselect {\n\tcase msg := <-ch2:\n\t\tfmt.Println(msg)\n\tdefault:\n\t\tfmt.Println("nada para receber")\n\t}\n\n\t// ARMADILHA: receber de closed channel\n\tclose(ch)                // jÃ¡ fechado acima via produtor...\n\t// use outro para demo:\n\tdemoCh := make(chan int, 1)\n\tdemoCh <- 99\n\tclose(demoCh)\n\tx, ok := <-demoCh\n\tfmt.Println(x, ok) // 99 true (valor no buffer)\n\tx, ok = <-demoCh\n\tfmt.Println(x, ok) // 0 false (fechado, zero value)\n}',
          recursos: [
            'https://go.dev/tour/concurrency/1',
            'https://gobyexample.com/goroutines',
            'https://gobyexample.com/channels',
            'https://gobyexample.com/select',
          ],
        },
        experimentacao: {
          desafio: 'Implemente o padrÃ£o fan-out/fan-in: distribua URLs entre N workers que fazem HTTP GET concorrente e colete resultados em um channel Ãºnico.',
          dicas: [
            'Fan-out: um channel de jobs lido por N goroutines',
            'Fan-in: N goroutines escrevem em um channel de resultados',
            'select com default para operaÃ§Ã£o nÃ£o-bloqueante',
            'Sempre close(ch) quando nÃ£o hÃ¡ mais dados a enviar',
          ],
        },
        socializacao: {
          discussao: 'Rob Pike: "ConcorrÃªncia nÃ£o Ã© paralelismo." O que isso significa?',
          pontos: [
            'ConcorrÃªncia: design (lidar com muitas coisas)',
            'Paralelismo: execuÃ§Ã£o (fazer muitas coisas ao mesmo tempo)',
            'GOMAXPROCS controla quantos OS threads usam goroutines',
            'CSP (Communicating Sequential Processes) model',
          ],
          diasDesafio: 'Dias 29â€“38',
          sugestaoBlog: 'Goroutines e Channels: concorrÃªncia em Go sem locks',
          hashtagsExtras: '#golang #goroutines #channels #concurrency',
        },
        aplicacao: {
          projeto: 'Pipeline de processamento com 3 estÃ¡gios: gerar â†’ transformar â†’ agregar, usando goroutines e channels.',
          requisitos: [
            'Cada estÃ¡gio em goroutine separada',
            'Channels conectando estÃ¡gios',
            'Graceful shutdown com close(ch)',
          ],
          criterios: ['Pipeline funcional', 'Goroutines finalizadas', 'Channels fechados'],
        },
      },
    },
    {
      id: 'conc-sync',
      title: 'Sync: WaitGroups, Mutex e Atomic',
      description: 'sync.WaitGroup, sync.Mutex, sync.RWMutex, sync/atomic e race detection.',
      estimatedMinutes: 45,
      vesa: {
        visaoGeral: {
          codeExample: 'package main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"sync/atomic"\n)\n\nfunc main() {\n\t// WaitGroup\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 5; i++ {\n\t\twg.Add(1)\n\t\tgo func(id int) {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Printf("Worker %d\\n", id)\n\t\t}(i)\n\t}\n\twg.Wait()\n\n\t// Mutex â€” protege estado compartilhado\n\tvar mu sync.Mutex\n\tcontador := 0\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tmu.Lock()\n\t\t\tcontador++\n\t\t\tmu.Unlock()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println("Mutex:", contador) // 1000\n\n\t// Atomic â€” alternativa leve\n\tvar atomico int64\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tatomic.AddInt64(&atomico, 1)\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println("Atomic:", atomico) // 1000\n}\n\n// Detectar race: go run -race main.go',
          recursos: [
            'https://gobyexample.com/mutexes',
            'https://gobyexample.com/waitgroups',
            'https://gobyexample.com/atomic-counters',
          ],
        },
        experimentacao: {
          desafio: 'Crie um programa com data race (2 goroutines incrementando sem lock), detecte com `go run -race` e corrija com: (1) Mutex, (2) atomic, (3) channel.',
          dicas: [
            'go run -race main.go mostra exatamente onde estÃ¡ a race',
            'RWMutex: RLock para leitura concorrente, Lock para escrita exclusiva',
            'sync.Once para inicializaÃ§Ã£o lazy (ex: pool de conexÃµes)',
          ],
        },
        socializacao: {
          discussao: 'Channels vs locks (mutex) â€” quando usar cada um?',
          pontos: [
            'Channels: coordenaÃ§Ã£o e comunicaÃ§Ã£o entre goroutines',
            'Mutex: proteÃ§Ã£o de estado compartilhado',
            '"Share memory by communicating" vs "communicate by sharing memory"',
            'Armadilha: goroutine leak quando channel nunca Ã© lido',
          ],
          diasDesafio: 'Dias 29â€“38',
          sugestaoBlog: 'WaitGroups, Mutex e Race Conditions: sincronizaÃ§Ã£o em Go',
          hashtagsExtras: '#golang #mutex #racecondition #sync',
        },
        aplicacao: {
          projeto: 'Rate limiter thread-safe: limite N requests por segundo.',
          requisitos: [
            'Usar Mutex ou channels para controle',
            'go test -race sem erros',
            'ConfigurÃ¡vel (N por segundo)',
          ],
          criterios: ['Sem data races', 'Rate limiting preciso', 'Testes passando'],
        },
      },
    },
    {
      id: 'conc-patterns',
      title: 'PadrÃµes de ConcorrÃªncia',
      description: 'Worker pool, fan-out/fan-in, pipeline, semÃ¡foro e graceful shutdown.',
      estimatedMinutes: 50,
      vesa: {
        visaoGeral: {
          codeExample: 'package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\n// Worker Pool\nfunc worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n\tdefer wg.Done()\n\tfor j := range jobs {\n\t\tfmt.Printf("Worker %d processando job %d\\n", id, j)\n\t\tresults <- j * 2\n\t}\n}\n\nfunc main() {\n\tjobs := make(chan int, 100)\n\tresults := make(chan int, 100)\n\n\t// Iniciar 3 workers\n\tvar wg sync.WaitGroup\n\tfor w := 1; w <= 3; w++ {\n\t\twg.Add(1)\n\t\tgo worker(w, jobs, results, &wg)\n\t}\n\n\t// Enviar 9 jobs\n\tfor j := 1; j <= 9; j++ {\n\t\tjobs <- j\n\t}\n\tclose(jobs)\n\n\t// Esperar workers e fechar results\n\tgo func() {\n\t\twg.Wait()\n\t\tclose(results)\n\t}()\n\n\t// Coletar resultados\n\tfor r := range results {\n\t\tfmt.Println("Resultado:", r)\n\t}\n}',
          recursos: [
            'https://gobyexample.com/worker-pools',
            'https://go.dev/blog/pipelines',
          ],
        },
        experimentacao: {
          desafio: 'Implemente um download concorrente: pool de N workers baixa uma lista de URLs, com semÃ¡foro limitando concorrÃªncia e context para timeout global.',
          dicas: [
            'SemÃ¡foro: sem := make(chan struct{}, maxConcurrent)',
            'context.WithTimeout para timeout global',
            'Fan-in com WaitGroup + goroutine para close(results)',
          ],
        },
        socializacao: {
          discussao: 'Como dimensionar o nÃºmero de workers? E como fazer graceful shutdown?',
          pontos: [
            'CPU-bound: GOMAXPROCS workers',
            'I/O-bound: mais workers (10x a 100x)',
            'Graceful shutdown: signal.NotifyContext + context cancellation',
          ],
          diasDesafio: 'Dias 29â€“38',
          sugestaoBlog: 'PadrÃµes de concorrÃªncia em Go: worker pool, pipeline e graceful shutdown',
          hashtagsExtras: '#golang #patterns #concurrency',
        },
        aplicacao: {
          projeto: 'Load balancer simples: distribui requests HTTP entre backends com health check.',
          requisitos: [
            'Worker pool com N goroutines',
            'Round-robin ou least-connections',
            'Graceful shutdown com signal + context',
          ],
          criterios: ['DistribuiÃ§Ã£o equilibrada', 'Graceful shutdown', 'Sem goroutine leaks'],
        },
      },
    },
  ],
};
