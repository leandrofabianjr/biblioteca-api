import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './create-genre.dto';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService extends RepositoryService<Genre, CreateGenreDto> {
  readonly searchFieldsStructure = {
    description: (term) => term,
  };

  constructor(@InjectRepository(Genre) repository: Repository<Genre>) {
    super(repository);
  }

  dtoConstructor = CreateGenreDto;

  async buildPartial(dto: CreateGenreDto): Promise<Genre> {
    const genre = new Genre();
    genre.description = dto.description;
    genre.ownerUuid = dto.ownerUuid;
    return genre;
  }
}
