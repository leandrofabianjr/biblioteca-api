import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
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
    item.locationUuid = dto.location;
    item.authorsUuids = dto.authors;
    item.genresUuids = dto.genres;
    item.publishersUuids = dto.publishers;
    return item;
  }
}
