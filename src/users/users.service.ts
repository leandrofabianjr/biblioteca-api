import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/commons/repository/repository.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService extends RepositoryService<User, CreateUserDto> {
  searchFieldsStructure = {
    name: (term) => term,
  };

  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  dtoConstructor = CreateUserDto;

  buildPartial(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.google_uid = dto.google_uid;
    user.name = dto.name;
    user.profile_picture_url = dto.profile_picture_url;
    return Promise.resolve(user);
  }

  findOneByEmail(email: any): Promise<User> {
    return this.repository.findOne({ email });
  }

  async getPhotoById(userUuid: number): Promise<string> {
    const user = await this.repository.findOne(userUuid);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user.profile_picture_url ?? '';
  }
}
