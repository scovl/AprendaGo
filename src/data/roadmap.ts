import type { Module, ModuleMeta } from '../types';
import { getLesson } from './content';
import {
  introModule,
  foundationModule,
  stdlibModule,
  concorrenciaModule,
  errosModule,
  testesModule,
  apisModule,
  bancoDadosModule,
  genericsModule,
  solidModule,
  cleanArchModule,
  implementacoesModule,
  toolingModule,
  deployModule,
  opensourceModule,
} from './modules';

function buildModule(meta: ModuleMeta): Module {
  return {
    id: meta.id,
    title: meta.title,
    description: meta.description,
    icon: meta.icon,
    color: meta.color,
    lessons: meta.lessons.map(id => {
      const lesson = getLesson(id);
      if (!lesson) {
        // Fallback for a lesson that has no .md file yet
        return {
          id,
          title: id,
          description: '',
          estimatedMinutes: 30,
          vesa: {
            visaoGeral: { recursos: [] },
            experimentacao: { desafio: '', dicas: [] },
            socializacao: {},
            aplicacao: { projeto: '', requisitos: [], criterios: [] },
          },
        };
      }
      return lesson;
    }),
  };
}

export const roadmapModules: Module[] = [
  introModule,
  foundationModule,
  stdlibModule,
  concorrenciaModule,
  errosModule,
  testesModule,
  apisModule,
  bancoDadosModule,
  genericsModule,
  solidModule,
  cleanArchModule,
  implementacoesModule,
  toolingModule,
  deployModule,
  opensourceModule,
].map(buildModule);
