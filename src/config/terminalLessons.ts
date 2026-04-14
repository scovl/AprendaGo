/**
 * Lessons that require an interactive terminal instead of the sandbox playground.
 * These modules involve CLI tools, DevOps, profiling, or git workflows
 * that cannot run in the browser sandbox.
 */
export const TERMINAL_LESSONS = new Set([
  'tool-qualidade',
  'tool-performance',
  'deploy-docker-k8s',
  'impl-cli',
  'impl-grpc',
  'impl-graphql',
]);

/**
 * Lessons that have no code component — neither terminal nor editor
 * should be shown in the Experimentação phase.
 */
export const NO_EDITOR_LESSONS = new Set([
  'opensource-primeira-contribuicao',
  'opensource-encontrando-projetos',
  'opensource-issues-e-labels',
  'opensource-comunicacao',
]);
