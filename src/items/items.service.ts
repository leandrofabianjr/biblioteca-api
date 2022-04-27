import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/author.entity';
import { PaginatedResponse } from 'src/commons/interfaces/paginated-response';
import { PaginatedServiceFilters } from 'src/commons/interfaces/paginated-service-filters';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Genre } from 'src/genres/genre.entity';
import { Location } from 'src/locations/location.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService extends RepositoryService<Item, CreateItemDto> {
  readonly searchFieldsStructure = {
    description: (term) => term,
    year: (term) => term,
    location: (term) => ({ description: term }),
    authors: (term) => ({ name: term }),
    genres: (term) => ({ description: term }),
    publishers: (term) => ({ name: term }),
  };

  readonly orderByColumns = ['description', 'createdAt', 'year'];

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

  async filter(
    owner: User,
    filters?: PaginatedServiceFilters,
  ): Promise<PaginatedResponse<Item>> {
    const query = this.repository
      .createQueryBuilder('i')
      .where({ owner })
      .skip(filters?.offset)
      .take(filters?.limit);

    const columns = [
      { name: 'location', alias: 'l', column: 'l.description' },
      { name: 'authors', alias: 'a', column: 'a.name' },
      { name: 'genres', alias: 'g', column: 'g.description' },
      { name: 'publishers', alias: 'p', column: 'p.name' },
    ];

    columns.forEach((c) => {
      query.leftJoinAndSelect('i.' + c.name, c.alias);
    });

    const orderBy = this.getOrderByData(filters.sort);
    if (orderBy?.sort) {
      query.orderBy('i.' + orderBy.sort, orderBy.order);
    }

    Object.keys(filters?.search ?? {}).forEach((field) => {
      if (this.searchFieldsStructure.hasOwnProperty(field)) {
        const column = columns
          .concat({ name: 'description', column: 'i.description', alias: '' })
          .find((c) => c.name == field)?.column;

        if (column) {
          query.andWhere(this.caseInsensitiveSearchOperator(column), {
            value: `%${filters?.search[field]}%`,
          });
        }
      }
    });

    const [data, total] = await query.getManyAndCount();
    const res: PaginatedResponse<Item> = {
      data,
      total,
      limit: filters?.limit,
      offset: filters?.offset,
    };
    return res;
  }
}
