import type React from 'react';

/**
 * Returns a keydown handler compatible with react-simple-code-editor's onKeyDown prop
 * (HTMLDivElement & HTMLTextAreaElement) that adds auto-indentation on Enter.
 */
export function makeAutoIndentHandler(
  onChange: (value: string) => void,
): React.KeyboardEventHandler<HTMLElement> {
  return function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key !== 'Enter') return;

    const ta = e.currentTarget as HTMLTextAreaElement;
    if (typeof ta.selectionStart !== 'number') return;

    const { selectionStart, selectionEnd } = ta;
    const value = ta.value;

    // Leading tabs of the current line
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const currentLine = value.slice(lineStart, selectionStart);
    const indent = /^(\t*)/.exec(currentLine)?.[1] ?? '';

    // Extra level when line ends with `{`
    const extraIndent = currentLine.trimEnd().endsWith('{') ? '\t' : '';

    // Smart wrap: Enter pressed right before `}` → place cursor between the braces
    const nextChar = value[selectionEnd];
    let insertion: string;
    let cursorOffset: number;

    if (extraIndent && nextChar === '}') {
      insertion = '\n' + indent + extraIndent + '\n' + indent;
      cursorOffset = 1 + indent.length + extraIndent.length;
    } else {
      insertion = '\n' + indent + extraIndent;
      cursorOffset = insertion.length;
    }

    e.preventDefault();

    const newValue = value.slice(0, selectionStart) + insertion + value.slice(selectionEnd);
    onChange(newValue);

    const newCursor = selectionStart + cursorOffset;
    requestAnimationFrame(() => {
      ta.selectionStart = newCursor;
      ta.selectionEnd = newCursor;
    });
  };
}
