import type { ModuleMeta } from '../../types';

export const concorrenciaModule: ModuleMeta = {
  id: 'concorrencia',
  title: 'Concorrência',
  description: 'Goroutines, channels, select, sync, padrões de concorrência e race detection.',
  icon: 'GitBranch',
  color: '#F6A623',
  lessons: ['conc-goroutines-channels', 'conc-sync', 'conc-patterns'],
};
