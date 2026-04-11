import type { ModuleMeta } from '../../types';

export const bancoDadosModule: ModuleMeta = {
  id: 'banco-dados',
  title: 'Bancos de Dados',
  description: 'database/sql, prepared statements, GORM, migrations, SQLC e pgx.',
  icon: 'Database',
  color: '#E74C3C',
  lessons: ['db-sql', 'db-gorm-sqlc'],
};
