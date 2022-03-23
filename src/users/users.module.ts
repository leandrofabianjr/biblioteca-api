import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonsModule } from 'src/commons/commons.module';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonsModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
