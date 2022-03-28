import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExceptionFilter } from 'src/commons/filters/api-exception.filter';
import { RestBaseController } from 'src/commons/rest-base-controller/rest-base.controller';
import { CreatePublisherDto } from './create-publisher.dto';
import { Publisher } from './publisher.entity';
import { PublishersService } from './publishers.service';

@Controller('publishers')
@UseFilters(ApiExceptionFilter)
@UseGuards(JwtAuthGuard)
export class PublishersController extends RestBaseController<
  Publisher,
  CreatePublisherDto
> {
  constructor(locationsService: PublishersService) {
    super(locationsService);
  }
}
