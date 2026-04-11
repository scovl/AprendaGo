/// <reference types="vite/client" />

const modules = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export function getLessonContent(lessonId: string): string {
  const key = `./${lessonId}.md`;
  return (modules[key] as string) ?? '';
}
