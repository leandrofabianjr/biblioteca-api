import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';

@Injectable()
export class LocationsService extends RepositoryService<
  Location,
  CreateLocationDto
> {
  constructor(
    @InjectRepository(Location) protected repository: Repository<Location>,
    private userService: UsersService,
  ) {
    super(repository);
  }

  dtoConstructor = CreateLocationDto;

  async buildPartial(dto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.description = dto.description;
    location.owner = await this.userService.get(dto.owner);
    return location;
  }
}
