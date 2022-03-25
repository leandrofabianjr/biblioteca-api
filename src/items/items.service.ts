import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService extends RepositoryService<Item, CreateItemDto> {
  constructor(
    @InjectRepository(Item) protected repository: Repository<Item>,
    private userService: UsersService,
  ) {
    super(repository);
  }

  dtoConstructor = CreateItemDto;

  async buildPartial(dto: CreateItemDto): Promise<Item> {
    const item = new Item();
    item.description = dto.description;
    item.owner = await this.userService.get(dto.owner);
    item.year = dto.year;
    item.description = dto.location;
    return item;
  }
}
