import { UseFilters } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isUUID, validate } from 'class-validator';
import { User } from 'src/users/user.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOperator,
  Raw,
  Repository,
} from 'typeorm';
import { ServiceException } from '../exceptions/service.exception';
import { ApiExceptionFilter } from '../filters/api-exception.filter';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { PaginatedServiceFilters } from '../interfaces/paginated-service-filters';
import { RepositoryEntity } from './repository-entity';

@UseFilters(ApiExceptionFilter)
export abstract class RepositoryService<
  T extends RepositoryEntity,
  T_DTO extends object,
> {
  abstract readonly searchFieldsStructure: {
    [name: string]: (term: FindOperator<T>) => any;
  };

  orderByColumns: string[] = [];

  constructor(public repository: Repository<T>) {}

  abstract dtoConstructor: ClassConstructor<T_DTO>;

  private async validateDto(json: T_DTO): Promise<T_DTO> {
    const dto = plainToInstance(this.dtoConstructor, json);
    const errors = await validate(dto);

    if (errors.length) {
      const message = 'Por favor, confira os dados preenchidos.';
      throw new ServiceException({ message, errors });
    }

    return dto;
  }

  protected caseInsensitiveSearchOperator(field: string): string {
    return `LOWER(${field}) Like LOWER(:value)`;
  }

  protected caseInsensitiveSearch(term: string): FindOperator<T> {
    return Raw((v) => this.caseInsensitiveSearchOperator(v), {
      value: `%${term}%`,
    });
  }

  protected getOrderByData(sort?: any): {
    sort: string;
    order: 'ASC' | 'DESC';
  } {
    if (!sort || !Object.keys(sort)?.length) return undefined;

    const isDesc = sort[0] == '-';
    const column = isDesc ? sort.substring(1) : sort;

    if (!this.orderByColumns.includes(column)) return undefined;

    return { sort: column, order: isDesc ? 'ASC' : 'DESC' };
  }

  protected buildOptionsToFilter(
    owner: User,
    filters?: PaginatedServiceFilters,
  ): FindManyOptions<any> {
    const where = { owner };

    Object.keys(filters?.search ?? {}).forEach((field) => {
      if (this.searchFieldsStructure.hasOwnProperty(field)) {
        where[field] = this.searchFieldsStructure[field](
          this.caseInsensitiveSearch(filters.search[field]),
        );
      }
    });

    const orderBy = this.getOrderByData(filters.sort);
    const order = orderBy ? { [orderBy.sort]: orderBy.order } : undefined;

    return {
      take: filters?.limit,
      skip: filters?.offset,
      order,
      where,
    };
  }

  abstract buildPartial(dto: T_DTO): Promise<DeepPartial<T>>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateBeforeCreate(dto: T_DTO) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateBeforeEdit(uuid: string, dto: T_DTO) {
    return;
  }

  get(uuid: string): Promise<T> {
    if (!isUUID(uuid)) {
      return new Promise((resolve) => resolve(null));
    }
    return this.repository.findOne(uuid);
  }

  async filter(
    owner: User,
    filters?: PaginatedServiceFilters,
  ): Promise<PaginatedResponse<T>> {
    const options = this.buildOptionsToFilter(owner, filters);

    const [data, total] = await this.repository.findAndCount(options);

    const res: PaginatedResponse<T> = {
      data,
      total,
      limit: options?.take,
      offset: options?.skip,
    };
    return res;
  }

  async save(model: DeepPartial<T>): Promise<T> {
    const { uuid } = await this.repository.save(model);
    return this.get(uuid);
  }

  async create(data: T_DTO): Promise<T> {
    const dto = await this.validateDto(data);
    await this.validateBeforeCreate(dto);
    const model = await this.buildPartial(dto);
    return await this.save(model);
  }

  async edit(uuid: string, data: T_DTO) {
    const dto = await this.validateDto(data);
    await this.validateBeforeEdit(uuid, dto);
    const model = await this.buildPartial(dto);
    model.uuid = uuid;
    return await this.save(model);
  }

  async remove(uuid: string): Promise<{ affected: number }> {
    const result = await this.repository.softDelete(uuid);
    return { affected: result.affected };
  }

  countByOwner(owner: User): Promise<number> {
    return this.repository.count({
      where: { ownerUuid: owner.uuid },
    });
  }
}
