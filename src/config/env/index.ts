const path = process.env.NODE_ENV === 'database' ? 'src' : 'dist';

export const configEnvironment = (): unknown => ({
  port: Number(process.env.PORT) || 3333,
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '1d',
    },
  },
  database: {
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
  },
});
