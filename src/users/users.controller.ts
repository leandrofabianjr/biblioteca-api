import { Controller, Get, Param, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { ApiExceptionFilter } from 'src/commons/filters/api-exception.filter';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(ApiExceptionFilter)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':uuid/photo')
  async photo(@Param('uuid') userUuid, @Res() res: Response) {
    const photo = await this.usersService.getPhotoById(userUuid);
    res.json(photo);
  }
}
