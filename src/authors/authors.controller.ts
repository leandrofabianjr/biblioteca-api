import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RestBaseController } from 'src/commons/rest-base-controller/rest-base.controller';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './create-author.dto';

@Controller('authors')
@UseGuards(JwtAuthGuard)
export class AuthorsController extends RestBaseController<
  Author,
  CreateAuthorDto
> {
  constructor(authorsService: AuthorsService) {
    super(authorsService);
  }
}
