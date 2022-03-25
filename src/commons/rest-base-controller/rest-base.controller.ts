import {
  Body,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { PaginatedServiceFilters } from 'src/commons/interfaces/paginated-service-filters';
import { ParsePaginatedSearchPipePipe } from 'src/commons/pipes/parse-paginated-search-pipe.pipe';
import { User } from 'src/users/user.entity';
import { ApiExceptionFilter } from '../filters/api-exception.filter';
import { RepositoryEntity } from '../repository/repository-entity';
import { RepositoryDto } from '../repository/repository.dto';
import { RepositoryService } from '../repository/repository.service';

@UseFilters(ApiExceptionFilter)
export abstract class RestBaseController<
  T extends RepositoryEntity,
  T_DTO extends RepositoryDto,
> {
  constructor(protected service: RepositoryService<T, T_DTO>) {}

  @Get('')
  async fetch(
    @Query(new ParsePaginatedSearchPipePipe())
    params: PaginatedServiceFilters<T>,
  ) {
    return await this.service.filter(params);
  }

  @Post('')
  async create(
    @Body() dto: T_DTO,
    @Res() res: Response,
    @Req() req: { user?: User },
  ) {
    dto.owner = req.user.uuid;
    const item = await this.service.create(dto as any);
    res.status(HttpStatus.CREATED).json(item);
  }
}
