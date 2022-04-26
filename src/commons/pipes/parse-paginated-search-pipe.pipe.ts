import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginatedServiceFilters } from '../interfaces/paginated-service-filters';

@Injectable()
export class ParsePaginatedSearchPipePipe implements PipeTransform {
  readonly _possibleParams = ['search', 'limit', 'offset', 'sort'];

  transform(value: any, metadata: ArgumentMetadata): PaginatedServiceFilters {
    if (metadata?.type != 'query') return {};

    return {
      limit: value?.limit ? +value.limit : 10,
      offset: +value?.offset,
      search: !!value?.search ? JSON.parse(value.search) : undefined,
      sort: value?.sort,
    };
  }
}
