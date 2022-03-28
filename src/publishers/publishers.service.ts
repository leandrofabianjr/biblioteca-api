import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './create-publisher.dto';
import { Publisher } from './publisher.entity';

@Injectable()
export class PublishersService extends RepositoryService<
  Publisher,
  CreatePublisherDto
> {
  constructor(
    @InjectRepository(Publisher) protected repository: Repository<Publisher>,
    private userService: UsersService,
  ) {
    super(repository);
  }

  dtoConstructor = CreatePublisherDto;

  async buildPartial(dto: CreatePublisherDto): Promise<Publisher> {
    const publisher = new Publisher();
    publisher.name = dto.name;
    publisher.owner = await this.userService.get(dto.owner);
    return publisher;
  }
}
