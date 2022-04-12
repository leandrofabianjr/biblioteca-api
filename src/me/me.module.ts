import { Module } from '@nestjs/common';
import { AuthorsModule } from 'src/authors/authors.module';
import { GenresModule } from 'src/genres/genres.module';
import { ItemsModule } from 'src/items/items.module';
import { LocationsModule } from 'src/locations/locations.module';
import { PublishersModule } from 'src/publishers/publishers.module';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({
  imports: [
    ItemsModule,
    PublishersModule,
    AuthorsModule,
    GenresModule,
    LocationsModule,
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
