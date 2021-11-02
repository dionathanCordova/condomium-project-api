const connection = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.PG_DB_PORT),
  entities: ['./dist/modules/**/entities/*.entity.js'],
  migrations: ['./dist/providers/database/migrations/*.js'],
  cli: { migrationsDir: './src/providers/database/migrations' },
  synchronize: false,
  migrationsRun: true,
  options: {
    enableArithAbort: true,
    useUTC: false,
  },
};

connection.database =
  process.env.NODE_ENV === 'test'
    ? './src/database/database.test.sqlite'
    : process.env.DB_DATABASE;

module.exports = connection;
