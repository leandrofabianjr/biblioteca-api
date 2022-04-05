import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/author.entity';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Genre } from 'src/genres/genre.entity';
import { Location } from 'src/locations/location.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService extends RepositoryService<Item, CreateItemDto> {
  readonly searchFieldsStructure = {
    description: (term) => term,
    year: (term) => term,
    location: (term) => ({ description: term }),
    author: (term) => ({ name: term }),
    genre: (term) => ({ description: term }),
    publisher: (term) => ({ name: term }),
  };

  constructor(@InjectRepository(Item) repository: Repository<Item>) {
    super(repository);
  }

  dtoConstructor = CreateItemDto;

  async buildPartial(dto: CreateItemDto): Promise<Item> {
    const item = new Item();
    item.description = dto.description;
    item.year = dto.year;
    item.ownerUuid = dto.ownerUuid;
    item.location = { uuid: dto.location } as Location;
    item.authors = dto.authors?.map((uuid) => ({ uuid } as Author));
    item.genres = dto.genres?.map((uuid) => ({ uuid } as Genre));
    item.publishers = dto.publishers?.map((uuid) => ({ uuid } as Publisher));
    return item;
  }
}
