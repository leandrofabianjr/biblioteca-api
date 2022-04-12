import { Injectable } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { GenresService } from 'src/genres/genres.service';
import { ItemsService } from 'src/items/items.service';
import { LocationsService } from 'src/locations/locations.service';
import { PublishersService } from 'src/publishers/publishers.service';
import { User } from 'src/users/user.entity';
import { UserStats } from './user-stats.interface';

@Injectable()
export class MeService {
  constructor(
    private itemsService: ItemsService,
    private authorsService: AuthorsService,
    private genresService: GenresService,
    private publishersService: PublishersService,
    private locationsService: LocationsService,
  ) {}

  async getStats(user: User): Promise<UserStats> {
    const stats: UserStats = {
      items: await this.itemsService.countByOwner(user),
      authors: await this.authorsService.countByOwner(user),
      genres: await this.genresService.countByOwner(user),
      publishers: await this.publishersService.countByOwner(user),
      locations: await this.locationsService.countByOwner(user),
    };

    return stats;
  }
}
