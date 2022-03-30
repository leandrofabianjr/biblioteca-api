import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService extends RepositoryService<Item, CreateItemDto> {
  searchFieldsStructure = {
    description: (term) => term,
  };

  constructor(@InjectRepository(Item) repository: Repository<Item>) {
    super(repository);
  }

  dtoConstructor = CreateItemDto;

  async buildPartial(dto: CreateItemDto): Promise<Item> {
    const item = new Item();
    item.description = dto.description;
    item.ownerUuid = dto.ownerUuid;
    item.year = dto.year;
    item.description = dto.location;
    return item;
  }
}
