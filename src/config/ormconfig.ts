import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const path = process.env.NODE_ENV === 'database' ? 'src' : 'dist';

console.log(path);

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`./${path}/modules/**/entities/*.{ts,js}`],
  migrations: [`./${path}/config/database/migrations/*.{ts,js}`],
  cli: {
    migrationsDir: `./${path}/config/database/migrations`,
  },
};
