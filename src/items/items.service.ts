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
import { OrderByCondition, Repository } from 'typeorm';
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
    const options = this.buildOptionsToFilter(owner, filters);

    const query = this.repository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.location', 'l')
      .leftJoinAndSelect('i.authors', 'a')
      .leftJoinAndSelect('i.genres', 'g')
      .leftJoinAndSelect('i.publishers', 'p')
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.order as OrderByCondition)
      .where({ owner: options.where.owner });

    Object.keys(filters?.search ?? {}).forEach((field) => {
      if (this.searchFieldsStructure.hasOwnProperty(field)) {
        const column = {
          location: 'l.description',
          authors: 'a.name',
          genres: 'g.description',
          publishers: 'p.name',
        }[field];

        query.andWhere(this.caseInsensitiveSearchOperator(column), {
          value: `%${filters?.search[field]}%`,
        });
      }
    });

    const [data, total] = await query.getManyAndCount();
    const res: PaginatedResponse<Item> = {
      data,
      total,
      limit: options?.take,
      offset: options?.skip,
    };
    return res;
  }
}
