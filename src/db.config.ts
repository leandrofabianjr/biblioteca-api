import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function buildDbConfig(): TypeOrmModuleOptions {
  const generalConfig = {
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNC == 'true',
  };

  return process.env.DB_SQLITE == 'true'
    ? {
        type: 'sqlite',
        database: 'db.sqlite3',
        ...generalConfig,
      }
    : {
        type: 'postgres',
        url: process.env.DB_POSTGRES_URL,
        ssl: true,
        extra: { ssl: { rejectUnauthorized: false } },
        ...generalConfig,
      };
}

export const DB_CONFIG = buildDbConfig();
