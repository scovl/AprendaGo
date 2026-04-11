import type { ModuleMeta } from '../../types';

export const stdlibModule: ModuleMeta = {
  id: 'pacotes-importantes',
  title: 'Standard Library',
  description: 'Domine os pacotes essenciais: I/O, HTTP, JSON, context, time, regexp e logging.',
  icon: 'Package',
  color: '#CE3262',
  lessons: ['pkg-io', 'pkg-http-json', 'pkg-http-server', 'pkg-context-time', 'pkg-logging'],
};
