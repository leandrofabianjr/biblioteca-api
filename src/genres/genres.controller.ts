import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RestBaseController } from 'src/commons/rest-base-controller/rest-base.controller';
import { CreateGenreDto } from './create-genre.dto';
import { Genre } from './genre.entity';
import { GenresService } from './genres.service';

@Controller('genres')
@UseGuards(JwtAuthGuard)
export class GenresController extends RestBaseController<
  Genre,
  CreateGenreDto
> {
  constructor(genresService: GenresService) {
    super(genresService);
  }
}
