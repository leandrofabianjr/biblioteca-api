import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DB_CONFIG } from './db.config';
import { UsersModule } from './users/users.module';
import { CommonsModule } from './commons/commons.module';
import { ItemsModule } from './items/items.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(DB_CONFIG),
    UsersModule,
    CommonsModule,
    ItemsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
