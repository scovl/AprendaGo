import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';

// Snazzy theme — same palette as Witty
const theme = {
  foreground: '#eff0eb',
  background: '#282a36',
  cursor: '#f8f8f2',
  selectionBackground: '#97979b33',
  black: '#282a36',
  red: '#ff5c57',
  green: '#5af78e',
  yellow: '#f3f99d',
  blue: '#57c7ff',
  magenta: '#ff6ac1',
  cyan: '#9aedfe',
  white: '#f1f1f0',
  brightBlack: '#686868',
  brightRed: '#ff5c57',
  brightGreen: '#5af78e',
  brightYellow: '#f3f99d',
  brightBlue: '#57c7ff',
  brightMagenta: '#ff6ac1',
  brightCyan: '#9aedfe',
  brightWhite: '#eff0eb',
};

export function InteractiveTerminal({ lessonId }: Readonly<{ lessonId: string }>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
      fontSize: 14,
      theme,
      cursorBlink: true,
      convertEol: true,
    });

    term.open(containerRef.current);
    termRef.current = term;

    // Fit terminal to container
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    // Clickable links
    const webLinks = new WebLinksAddon();
    term.loadAddon(webLinks);

    // Connect WebSocket
    const proto = globalThis.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${proto}//${globalThis.location.host}/api/terminal/ws?lesson=${encodeURIComponent(lessonId)}`);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      // Send initial resize so PTY matches xterm cols/rows
      ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
    };

    ws.onmessage = (e) => {
      if (e.data instanceof ArrayBuffer) {
        term.write(new Uint8Array(e.data));
      } else {
        term.write(e.data);
      }
    };

    ws.onclose = () => {
      term.write('\r\n\x1b[33m[Sessão encerrada]\x1b[0m\r\n');
    };

    // Terminal input → server
    const dataDisposable = term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });

    // Handle container resize
    const onResize = () => {
      fitAddon.fit();
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
      }
    };
    globalThis.addEventListener('resize', onResize);

    // Also observe the container element for size changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      globalThis.removeEventListener('resize', onResize);
      resizeObserver?.disconnect();
      dataDisposable.dispose();
      ws.close();
      term.dispose();
    };
  }, []);

  return (
    <div className="interactive-terminal">
      <div className="interactive-terminal-header">
        <span className="terminal-guide-dots" aria-hidden="true">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
        </span>
        <span className="terminal-guide-title">Terminal Interativo</span>
      </div>
      <div ref={containerRef} className="interactive-terminal-view" />
    </div>
  );
}
