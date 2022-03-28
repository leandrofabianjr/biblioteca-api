import { IsNotEmpty } from 'class-validator';
import { RepositoryDto } from 'src/commons/repository/repository.dto';

export class CreatePublisherDto extends RepositoryDto {
  @IsNotEmpty()
  name: string;
}
