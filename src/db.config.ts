import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DB_CONFIG: TypeOrmModuleOptions = {
  // type: 'sqlite',
  // database: 'db.sqlite3',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
