import React from 'react';
import type { VesaContent } from '../../types';
import { GoCodeEditor } from './GoCodeEditor';

const URL_REGEX = /https?:\/\/[^\s)>\]]+/g;

function renderWithLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  URL_REGEX.lastIndex = 0;
  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const url = match[0];
    parts.push(
      <a key={match.index} href={url} target="_blank" rel="noopener noreferrer">
        {url.replace(/^https?:\/\//, '')}
      </a>
    );
    last = match.index + url.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? <>{parts}</> : text;
}

export function ExperimentacaoContent({ content, lessonId }: Readonly<{ content: VesaContent['experimentacao']; lessonId: string }>) {
  return (
    <div className="phase-content">
      <div className="challenge-block">
        <h4>Desafio</h4>
        <p>{renderWithLinks(content.desafio)}</p>
      </div>

      <div className="tips-block">
        <h4>Dicas</h4>
        <ul>
          {content.dicas.map((dica, i) => (
            <li key={i}>{renderWithLinks(dica)}</li>
          ))}
        </ul>
      </div>

      <GoCodeEditor
        referenceCode={content.codeTemplate}
        referenceLabel="Template — ponto de partida"
        lessonId={lessonId}
        downloadName={`${lessonId}-exercicio`}
      />
    </div>
  );
}
