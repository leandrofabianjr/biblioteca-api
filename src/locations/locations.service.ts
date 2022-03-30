import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';

@Injectable()
export class LocationsService extends RepositoryService<
  Location,
  CreateLocationDto
> {
  readonly searchFieldsStructure = {
    description: (term) => term,
  };

  constructor(@InjectRepository(Location) repository: Repository<Location>) {
    super(repository);
  }

  dtoConstructor = CreateLocationDto;

  async buildPartial(dto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.description = dto.description;
    location.ownerUuid = dto.ownerUuid;
    return location;
  }
}
