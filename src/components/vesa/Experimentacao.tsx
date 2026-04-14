import ReactMarkdown from 'react-markdown';
import type { VesaContent } from '../../types';
import { GoCodeEditor } from './GoCodeEditor';
import { InteractiveTerminal } from './InteractiveTerminal';
import { mdComponents } from './mdComponents';
import { TERMINAL_LESSONS, NO_EDITOR_LESSONS } from '../../config/terminalLessons';

export function ExperimentacaoContent({ content, lessonId }: Readonly<{ content: VesaContent['experimentacao']; lessonId: string }>) {
  const isTerminal = TERMINAL_LESSONS.has(lessonId);
  const hasEditor = !NO_EDITOR_LESSONS.has(lessonId);

  return (
    <div className="phase-content">
      <div className="challenge-block">
        <h4>Desafio</h4>
        <ReactMarkdown components={mdComponents}>{content.desafio}</ReactMarkdown>
      </div>

      <div className="tips-block">
        <h4>Dicas</h4>
        <ul>
          {content.dicas.map((dica, i) => (
            <li key={i}><ReactMarkdown components={mdComponents}>{dica}</ReactMarkdown></li>
          ))}
        </ul>
      </div>

      {hasEditor && (
        isTerminal ? (
          <InteractiveTerminal lessonId={lessonId} />
        ) : (
          <GoCodeEditor
            referenceCode={content.codeTemplate}
            referenceLabel="Template — ponto de partida"
            lessonId={lessonId}
            downloadName={`${lessonId}-exercicio`}
            notaPos={content.notaPos}
          />
        )
      )}
    </div>
  );
}
