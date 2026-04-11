Go usa **interfaces** para I/O: `io.Reader` (método `Read(p []byte) (n int, err error)`) e `io.Writer` (`Write(p []byte) (n int, err error)`) são a base de tudo — arquivos, conexões de rede, buffers de memória, tudo implementa essas interfaces. Lógica escrita para `io.Reader` funciona com qualquer fonte de dados.

`io.EOF` é o valor de erro especial retornado quando não há mais dados para ler — trate-o como **condição normal de fim de stream**, não como erro.

## os.File e defer

`os.File` implementa `io.Reader`, `io.Writer`, `io.Seeker` e `io.Closer`. `defer f.Close()` imediatamente após abrir/criar o arquivo é **obrigatório** para liberar o file descriptor.

Em operações de escrita com `bufio.Writer`, não esqueça de chamar `w.Flush()` — dados no buffer **não são escritos no disco** até o flush ou o close.

## bufio

`bufio` adiciona bufferização para reduzir syscalls:

- `bufio.NewReader`: envolve qualquer `io.Reader` com buffer interno (padrão 4096 bytes)
- `bufio.Scanner`: simplifica leitura linha a linha
  - `Scan()` retorna `false` no fim ou erro
  - `Text()` retorna a linha sem `\n`
  - `Err()` retorna qualquer erro (exceto `io.EOF`)

## Funções de conveniência

- `io.Copy(dst, src)` — usa buffer interno de 32KB, evita carregar tudo na memória
- `io.ReadAll` — lê tudo de um Reader; **use com cuidado** para dados de tamanho ilimitado
