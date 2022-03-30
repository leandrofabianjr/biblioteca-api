import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './create-publisher.dto';
import { Publisher } from './publisher.entity';

@Injectable()
export class PublishersService extends RepositoryService<
  Publisher,
  CreatePublisherDto
> {
  readonly searchFieldsStructure = {
    name: (term) => term,
  };

  constructor(@InjectRepository(Publisher) repository: Repository<Publisher>) {
    super(repository);
  }

  dtoConstructor = CreatePublisherDto;

  async buildPartial(dto: CreatePublisherDto): Promise<Publisher> {
    const publisher = new Publisher();
    publisher.name = dto.name;
    publisher.ownerUuid = dto.ownerUuid;
    return publisher;
  }
}
