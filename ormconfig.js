var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      // run only on js
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      // use ts in test
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    console.log(process.env.DATABASE_URL);
    Object.assign(dbConfig, {
      type: 'postgres',
      database: process.env.DATABASE_URL,
      // in production, run in js file
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      user: 'username',
      database: 'database name',
      password: 'some pass word',
      host: 'host name',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown Environment');
}

module.exports = dbConfig;
