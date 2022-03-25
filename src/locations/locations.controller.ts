import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExceptionFilter } from 'src/commons/filters/api-exception.filter';
import { RestBaseController } from 'src/commons/rest-base-controller/rest-base.controller';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';
import { LocationsService } from './locations.service';

@UseFilters(ApiExceptionFilter)
@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController extends RestBaseController<
  Location,
  CreateLocationDto
> {
  constructor(locationsService: LocationsService) {
    super(locationsService);
  }
}
