import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite3',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
