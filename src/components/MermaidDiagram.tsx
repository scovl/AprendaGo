import React, { useEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e0f7ff',
    primaryTextColor: '#1e293b',
    primaryBorderColor: '#0090b8',
    lineColor: '#374151',
    secondaryColor: '#f0f9ff',
    background: 'transparent',
    mainBkg: '#e0f7ff',
    nodeBorder: '#0090b8',
    clusterBkg: '#f8fafc',
    titleColor: '#1e293b',
    edgeLabelBackground: '#f8fafc',
    fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive, system-ui',
    fontSize: '14px',
  },
  flowchart: { curve: 'basis', padding: 20 },
});

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: Readonly<MermaidDiagramProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, 'mermaid');

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    mermaid.render(id, chart).then(({ svg }) => {
      if (ref.current) ref.current.innerHTML = svg;
    }).catch(() => {
      if (ref.current) ref.current.textContent = chart;
    });
  }, [chart, id]);

  return <div className="mermaid-diagram" ref={ref} aria-hidden="true" />;
}
