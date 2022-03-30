import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './create-author.dto';

@Injectable()
export class AuthorsService extends RepositoryService<Author, CreateAuthorDto> {
  readonly searchFieldsStructure = {
    name: (term) => term,
  };

  constructor(@InjectRepository(Author) repository: Repository<Author>) {
    super(repository);
  }

  dtoConstructor = CreateAuthorDto;

  async buildPartial(dto: CreateAuthorDto): Promise<Author> {
    const author = new Author();
    author.name = dto.name;
    author.ownerUuid = dto.ownerUuid;
    return author;
  }
}
