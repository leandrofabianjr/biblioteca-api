import { isUUID, validate } from 'class-validator';
import { DeepPartial, FindOptionsWhere, Raw, Repository } from 'typeorm';
import { ServiceException } from '../exceptions/service.exception';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { PaginatedServiceFilters } from '../interfaces/paginated-service-filters';
import { RepositoryEntity } from './repository-entity';

export abstract class RepositoryService<
  T extends RepositoryEntity,
  TDto extends object,
> {
  constructor(protected repository: Repository<T>) {}

  private async validateDto(dto: TDto): Promise<TDto> {
    const errors = await validate(dto);

    if (errors.length) {
      const message = 'Por favor, confira os dados preenchidos.';
      throw new ServiceException({ message, errors });
    }

    return dto;
  }

  private buildOptionsToFilter(
    options?: PaginatedServiceFilters<T>,
  ): PaginatedServiceFilters<T> {
    if (options?.searchFields?.length && options?.search?.length) {
      options.where = {};
      options.searchFields.forEach((field) => {
        options.where[field] = Raw((v) => `LOWER(${v}) Like LOWER(:value)`, {
          value: `%${options.search}%`,
        });
      });
      delete options.search;
    }
    console.log(options);
    return options;
  }

  abstract buildPartial(dto: TDto): Promise<DeepPartial<T>>;

  async validateBeforeCreate(dto: TDto): Promise<string> {
    return null;
  }

  async validateBeforeEdit(uuid: string, dto: TDto): Promise<string> {
    return null;
  }

  get(uuid: string): Promise<T> {
    if (!isUUID(uuid)) {
      return new Promise((resolve) => resolve(null));
    }
    return this.repository.findOneBy({ uuid } as FindOptionsWhere<T>);
  }

  filter(options?: PaginatedServiceFilters<T>): Promise<T[]> {
    console.log(options);
    options = this.buildOptionsToFilter(options);
    console.log(options);
    return this.repository.find(options);
  }

  async filterPaginated(
    options?: PaginatedServiceFilters<T>,
  ): Promise<PaginatedResponse<T>> {
    options = this.buildOptionsToFilter(options);
    const [data, total] = await this.repository.findAndCount(options);
    const res: PaginatedResponse<T> = {
      data,
      total,
      limit: options?.take,
      offset: options?.skip,
    };
    return res;
  }

  save(model: T): Promise<T> {
    return this.repository.save(model as DeepPartial<T>)[0];
  }

  async create(data: TDto): Promise<T> {
    const dto = await this.validateDto(data);

    const message = await this.validateBeforeCreate(dto);
    if (message) {
      throw new ServiceException({ message });
    }

    const model = await this.buildPartial(dto);

    const entity = this.repository.create(model);
    return this.repository.save(entity as DeepPartial<T>)[0];
  }

  async edit(uuid: string, data: TDto) {
    const customer = await this.get(uuid);

    if (!customer) {
      const message =
        'O registro não existe. Ao invés de editar, crie um novo.';
      throw new ServiceException({ message });
    }

    const dto = await this.validateDto(data);

    const message = await this.validateBeforeEdit(uuid, dto);
    if (message) {
      throw new ServiceException({ message });
    }

    const model = await this.buildPartial(dto);

    const entity = this.repository.create({ uuid, ...model });
    return this.repository.save(entity as DeepPartial<T>);
  }

  async remove(uuid: string): Promise<void> {
    await this.repository.delete(uuid);
  }
}
