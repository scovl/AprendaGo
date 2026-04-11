import type { ModuleMeta } from '../../types';

export const deployModule: ModuleMeta = {
  id: 'deploy',
  title: 'Deploy',
  description: 'Docker multistage, cross-compilation, Kubernetes e deploy em produção.',
  icon: 'Cloud',
  color: '#3498DB',
  lessons: ['deploy-docker-k8s'],
};
