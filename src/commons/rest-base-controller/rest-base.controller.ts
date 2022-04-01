import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaginatedServiceFilters } from 'src/commons/interfaces/paginated-service-filters';
import { ParsePaginatedSearchPipePipe } from 'src/commons/pipes/parse-paginated-search-pipe.pipe';
import { User } from 'src/users/user.entity';
import { FindOptionsWhere } from 'typeorm';
import { ServiceException } from '../exceptions/service.exception';
import { RepositoryDto } from '../repository/repository.dto';
import { RepositoryService } from '../repository/repository.service';
import { RestEntity } from './rest-entity';

export abstract class RestBaseController<
  T extends RestEntity,
  T_DTO extends RepositoryDto,
> {
  constructor(protected service: RepositoryService<T, T_DTO>) {}

  private async checkIfExists(uuid: string, ownerUuid: string) {
    const obj = await this.service.repository.findOneBy({
      uuid,
      ownerUuid,
    } as FindOptionsWhere<T>);

    if (!obj) {
      const message = 'Este objeto não existe.';
      throw new ServiceException({ message, status: HttpStatus.NOT_FOUND });
    }
  }

  @Get('')
  async fetch(
    @Query(new ParsePaginatedSearchPipePipe())
    params: PaginatedServiceFilters<T>,
    @Res() res: Response,
  ) {
    const data = await this.service.filter(params);
    res.status(HttpStatus.OK).json(data);
  }

  @Post('')
  async create(
    @Body() dto: T_DTO,
    @Res() res: Response,
    @Req() req: { user?: User },
  ) {
    dto.ownerUuid = req.user?.uuid;
    const obj = await this.service.create(dto as any);
    res.status(HttpStatus.CREATED).json(obj);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() body: T_DTO,
    @Res() res: Response,
    @Req() req,
  ) {
    await this.checkIfExists(uuid, req.user.uuid);
    const obj = await this.service.edit(uuid, body);
    res.status(HttpStatus.OK).json(obj);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response, @Req() req) {
    await this.checkIfExists(uuid, req.user.uuid);
    const result = await this.service.remove(uuid);
    res.status(HttpStatus.OK).json(result);
  }
}
